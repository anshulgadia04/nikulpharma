# Geolocation Tracking Feature

## Overview
Added IP-based geolocation tracking to analytics system. Now admin can see **where traffic is coming from** (country, city, region) while maintaining user privacy through IP hashing.

---

## 🚀 What Was Added

### 1. **geoip-lite Package**
```bash
npm install geoip-lite
```
- Free, offline IP geolocation library
- No API keys needed
- Works with IPv4 and IPv6
- Database auto-updates

### 2. **TrafficLog Model Updates**
**File:** `server/models/TrafficLog.js`

Added 4 new fields:
```javascript
country: String,    // e.g., "US", "IN"
region: String,     // e.g., "California", "Maharashtra"  
city: String,       // e.g., "San Francisco", "Mumbai"
timezone: String,   // e.g., "America/Los_Angeles"
```

Added index for fast geographic queries:
```javascript
trafficLogSchema.index({ country: 1, timestamp: -1 });
```

### 3. **Traffic Logger Middleware Updates**
**File:** `server/utils/trafficLogger.js`

#### Geolocation Extraction Logic:
```javascript
// Extract location BEFORE hashing IP
const ip = req.ip || req.headers['x-forwarded-for'];
let cleanIp = ip;

// Handle IPv6-mapped IPv4 (::ffff:192.168.1.1 -> 192.168.1.1)
if (cleanIp && cleanIp.startsWith('::ffff:')) {
  cleanIp = cleanIp.substring(7);
}

// Skip localhost/private IPs
if (!['127.0.0.1', '::1', 'localhost'].includes(cleanIp) 
    && !cleanIp.startsWith('192.168.') 
    && !cleanIp.startsWith('10.')) {
  geo = geoip.lookup(cleanIp);
}

// Then hash IP for privacy
const ipHash = hashString(ip);
```

#### What Gets Logged:
```javascript
{
  country: geo?.country || null,
  region: geo?.region || null,
  city: geo?.city || null,
  timezone: geo?.timezone || null,
  ipHash: "abc123...", // Hashed AFTER geolocation
}
```

### 4. **New Analytics Endpoint**
**File:** `server/index.js`

```javascript
GET /api/admin/analytics/geography?days=30
```

**Response:**
```json
{
  "byCountry": [
    { "country": "US", "views": 450 },
    { "country": "IN", "views": 320 },
    { "country": "GB", "views": 180 }
  ],
  "byCity": [
    { "location": "Mumbai, Maharashtra, IN", "views": 145 },
    { "location": "New York, New York, US", "views": 98 },
    { "location": "London, England, GB", "views": 76 }
  ]
}
```

**Query Logic:**
- Top 10 countries by views
- Top 10 cities by views (formatted as "City, Region, Country")
- Null values excluded (localhost/private IPs)

### 5. **Dashboard UI Updates**
**File:** `src/components/admin/AdminAnalytics.jsx`

Added new section: **"Traffic by Location"**

#### Features:
- 🌍 **Country flags** for visual appeal
- 📍 **Top 10 countries** with view counts
- 🏙️ **Top 10 cities** with formatted locations
- 📊 Side-by-side comparison (countries vs cities)

#### Helper Functions:
```javascript
const getCountryName = (code) => countryNames[code] || code;
const getCountryFlag = (code) => countryFlags[code] || '🌍';
```

Supports 17 major countries with flags (US, IN, GB, CA, AU, DE, FR, JP, CN, BR, MX, ES, IT, NL, SE, SG, AE)

---

## 🔒 Privacy & Security

### IP Hashing Still Maintained
1. **Extract geolocation** from raw IP
2. **Hash IP** with SHA-256
3. **Store both** (location + hash, but NOT raw IP)
4. **Result:** Admin sees location, but cannot identify individual users

### Localhost Handling
Private IPs are excluded from geolocation:
- `127.0.0.1`, `::1`, `localhost`
- `192.168.x.x` (local networks)
- `10.x.x.x` (private networks)

These will show as **null** in the database and won't appear in geographic analytics.

---

## 🎯 Use Cases

### For Admin:
1. **Geographic Reach:** See which countries/cities visit your site
2. **Market Analysis:** Identify top regions for targeted marketing
3. **Regional Trends:** Compare product interest by location
4. **Time Zone Planning:** Schedule announcements based on user timezones

### Example Insights:
- "80% of traffic from India and US"
- "Mumbai and Delhi are top cities - focus ads there"
- "UK traffic growing 25% - consider regional pricing"

---

## 📊 Dashboard View

```
┌─────────────────────────────────────────────┐
│       Traffic by Location (Last 30 Days)   │
├──────────────────────┬──────────────────────┤
│   Top Countries      │   Top Cities         │
├──────────────────────┼──────────────────────┤
│ 🇺🇸 United States 450│ Mumbai, IN       145 │
│ 🇮🇳 India         320│ New York, US      98 │
│ 🇬🇧 United Kingdom 180│ London, GB        76 │
│ 🇨🇦 Canada        120│ Toronto, CA       54 │
│ 🇦🇺 Australia      95│ Sydney, AU        42 │
└──────────────────────┴──────────────────────┘
```

---

## 🧪 Testing

### 1. Local Development
- Visits from `localhost` will **NOT** show in geography analytics
- This is expected (private IPs excluded)

### 2. Production Testing
- Deploy to public server
- Visit from different devices/networks
- Check admin dashboard → "Traffic by Location"

### 3. MongoDB Verification
```javascript
db.traffic_logs.find({ country: { $ne: null } }).limit(5)
```

Should show documents with `country`, `city`, `region`, `timezone` fields populated.

---

## 🔧 Configuration

### Adjust Debounce Window
**File:** `server/utils/trafficLogger.js`
```javascript
const DEBOUNCE_WINDOW = 5 * 60 * 1000; // 5 minutes (default)
// Change to: 10 * 60 * 1000 for 10 minutes
```

### Add More Country Names/Flags
**File:** `src/components/admin/AdminAnalytics.jsx`
```javascript
const countryNames = {
  'US': 'United States',
  'YOUR_CODE': 'Your Country Name', // Add here
};

const countryFlags = {
  'US': '🇺🇸',
  'YOUR_CODE': '🏁', // Add flag emoji
};
```

---

## 📝 Summary

✅ **Session-based debouncing** - No duplicate counts when switching pages  
✅ **Geolocation tracking** - Country, city, region, timezone captured  
✅ **Privacy preserved** - IPs hashed after location extraction  
✅ **New analytics endpoint** - `/api/admin/analytics/geography`  
✅ **Dashboard visualization** - Flags, top countries, top cities  
✅ **Localhost excluded** - Only public IP traffic tracked  

**Result:** Admin now has full geographic visibility while maintaining user privacy! 🌍🔒
