import mongoose from 'mongoose';

const trafficLogSchema = new mongoose.Schema({
  // Timestamp
  timestamp: { type: Date, default: Date.now }, // Removed index: true to avoid duplicate
  
  // Request info
  path: { type: String, required: true, index: true },
  method: { type: String, required: true },
  statusCode: { type: Number },
  responseTimeMs: { type: Number },
  
  // User context (privacy-safe)
  ipHash: { type: String, index: true }, // SHA-256 hashed IP
  userAgent: String,
  referrer: String,
  
  // Request metadata
  category: String,       // Extracted from query params
  productSlug: String,    // Extracted from URL params
  source: String,         // UTM source or referrer domain
  utmCampaign: String,
  utmMedium: String,
  
  // Conversion tracking
  isConversion: { type: Boolean, default: false },  // POST /inquiries
  isProductView: { type: Boolean, default: false }, // GET /api/products/:slug
  isListView: { type: Boolean, default: false },    // GET /api/products
  
  // Route classification
  routeType: { 
    type: String, 
    enum: ['api', 'page', 'asset', 'webhook', 'admin'],
    default: 'api'
  },
}, { 
  collection: 'traffic_logs',
  timestamps: false // We use timestamp field instead
});

// Indexes for fast queries
trafficLogSchema.index({ timestamp: -1 });
trafficLogSchema.index({ path: 1, timestamp: -1 });
trafficLogSchema.index({ productSlug: 1, timestamp: -1 });
trafficLogSchema.index({ category: 1, timestamp: -1 });
trafficLogSchema.index({ isConversion: 1, timestamp: -1 });

// TTL index - auto-delete logs older than 90 days (7776000 seconds)
trafficLogSchema.index({ timestamp: 1 }, { expireAfterSeconds: 7776000 });

export const TrafficLog = mongoose.model('TrafficLog', trafficLogSchema);
