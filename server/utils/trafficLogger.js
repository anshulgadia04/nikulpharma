import crypto from 'crypto';
import { TrafficLog } from '../models/TrafficLog.js';

function hashString(str) {
  if (!str) return null;
  return crypto.createHash('sha256').update(String(str)).digest('hex').substring(0, 16);
}

function extractDomain(url) {
  if (!url) return null;
  try {
    const urlObj = new URL(url);
    return urlObj.hostname;
  } catch {
    return null;
  }
}

// In-memory cache to track recent visits (session-based debouncing)
// Structure: { 'ipHash:path': timestamp }
const visitCache = new Map();
const DEBOUNCE_WINDOW = 5 * 60 * 1000; // 5 minutes - don't count same page view within this window

// Clean up old cache entries every 10 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, timestamp] of visitCache.entries()) {
    if (now - timestamp > DEBOUNCE_WINDOW) {
      visitCache.delete(key);
    }
  }
}, 10 * 60 * 1000);

export function trafficLogger(options = {}) {
  const { 
    excludePaths = [
      /^\/uploads\//,
      /^\/static\//,
      /^\/health$/,
      /^\/api\/admin\//,
      /^\/api\/upload\//,
    ],
    sampleRate = 1 // 1 = log everything, 10 = log 1 in 10
  } = options;

  return async (req, res, next) => {
    // Sampling
    if (sampleRate > 1 && Math.random() > 1 / sampleRate) {
      return next();
    }

    const start = Date.now();
    const originalEnd = res.end;

    // Wrap res.end to capture response
    res.end = function(...args) {
      res.end = originalEnd;
      res.end.apply(res, args);

      // Capture res.locals NOW before async execution
      const productCategory = res.locals?.productCategory || null;

      // Log asynchronously (fire-and-forget)
      setImmediate(() => {
        try {
          const path = req.path || req.url.split('?')[0];
          
          // Check exclusions
          if (excludePaths.some(rx => rx.test(path))) return;

          const responseTimeMs = Date.now() - start;
          const ip = req.ip || req.headers['x-forwarded-for'] || req.connection?.remoteAddress;
          const ipHash = hashString(ip);

          // Session-based debouncing: Check if this user visited this path recently
          const cacheKey = `${ipHash}:${path}`;
          const now = Date.now();
          const lastVisit = visitCache.get(cacheKey);

          // Skip if same user visited same path within debounce window
          if (lastVisit && (now - lastVisit) < DEBOUNCE_WINDOW) {
            return; // Don't log duplicate visit
          }

          // Update visit cache
          visitCache.set(cacheKey, now);

          // Extract metadata
          const productSlugMatch = path.match(/^\/api\/products\/([^\/]+)$/);
          const productSlug = productSlugMatch ? productSlugMatch[1] : null;
          
          // Determine route type and flags
          const isConversion = path === '/inquiries' && req.method === 'POST';
          const isProductView = /^\/api\/products\/[^\/]+$/.test(path) && req.method === 'GET';
          const isListView = path === '/api/products' && req.method === 'GET';
          
          // Extract category from query params or product lookup
          let category = req.query?.category || null;
          
          // If this is a product view and we don't have category from query, use captured value
          if (isProductView && productSlug && !category && productCategory) {
            category = productCategory;
          }
          
          const utmSource = req.query?.utm_source || extractDomain(req.get('Referer'));
          const utmCampaign = req.query?.utm_campaign || null;
          const utmMedium = req.query?.utm_medium || null;
          
          let routeType = 'api';
          if (path.startsWith('/api/admin')) routeType = 'admin';
          else if (path.startsWith('/webhook')) routeType = 'webhook';
          else if (path.startsWith('/uploads') || path.startsWith('/static')) routeType = 'asset';
          else if (!path.startsWith('/api')) routeType = 'page';

          const logEntry = {
            timestamp: new Date(),
            path,
            method: req.method,
            statusCode: res.statusCode,
            responseTimeMs,
            ipHash,
            userAgent: req.get('User-Agent'),
            referrer: req.get('Referer') || req.get('Referrer'),
            category,
            productSlug,
            source: utmSource,
            utmCampaign,
            utmMedium,
            isConversion,
            isProductView,
            isListView,
            routeType,
          };

          // Fire-and-forget insert
          TrafficLog.create(logEntry).catch(err => {
            console.error('TrafficLog insert failed:', err.message);
          });
        } catch (err) {
          console.error('trafficLogger error:', err.message);
        }
      });
    };

    next();
  };
}
