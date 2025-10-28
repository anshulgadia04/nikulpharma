# Admin Panel Structure

## Overview
The admin panel has been reorganized into a clean, modular structure with separate pages for different functionalities.

## Navigation

After logging in at `/admin`, you'll be redirected to `/admin/dashboard`.

The admin panel includes a persistent top navigation bar with the following sections:

### 1. **Analytics** (`/admin/dashboard`)
- **Purpose**: View business metrics and analytics
- **Current Features**:
  - Placeholder dashboard showing key stats (products, inquiries, leads)
  - Ready for traffic tracking implementation
- **Future**: Will display:
  - Daily/monthly page views
  - Conversion funnels
  - Traffic sources
  - Response times

### 2. **Products** (`/admin/products`)
- **Purpose**: Manage product catalog
- **Features**:
  - View all products in a grid layout
  - Add new products with full details (name, slug, category, description, features, applications)
  - Upload product images (main + additional images)
  - Edit existing products
  - Delete products
  - Mark products as featured
- **Moved from**: Previously in `AdminDashboard.jsx`

### 3. **Inquiries** (`/admin/inquiries`)
- **Purpose**: View customer inquiries from the contact form
- **Features**:
  - Table view with contact info, company, subject, inquiry type, source, date
  - Refresh button to reload data
  - Shows total inquiry count
- **Moved from**: Previously a modal in `AdminDashboard.jsx`
- **Backend**: Uses `GET /api/admin/inquiries`

### 4. **Leads** (`/admin/leads`)
- **Purpose**: View WhatsApp bot-generated leads
- **Features**:
  - Table view with phone, category, product, source, status, date
  - Refresh button
  - Shows total lead count
- **Backend**: Uses `GET /api/admin/leads` (newly added)

### 5. **Logout**
- Logs out admin user and redirects to login page

## File Structure

### Frontend Components
```
src/components/admin/
├── AdminLayout.jsx         # Shared layout with navbar (wraps all admin pages)
├── AdminAnalytics.jsx      # Dashboard/Analytics page
├── AdminProducts.jsx       # Product management page
├── AdminInquiries.jsx      # Inquiries page
├── AdminLeads.jsx          # Leads page
├── AdminLogin.jsx          # Login page (unchanged)
└── Inquiries.jsx           # (Deprecated - functionality moved to AdminInquiries.jsx)
```

### Backend Endpoints
```
server/index.js:
├── GET  /api/admin/inquiries        # Fetch all inquiries
├── GET  /api/admin/inquiries/:id    # Fetch single inquiry
├── PUT  /api/admin/inquiries/:id    # Update inquiry
├── GET  /api/admin/inquiries/stats  # Get inquiry statistics
└── GET  /api/admin/leads            # Fetch all leads (NEW)
```

### Routing
```
/admin                    → AdminLogin (public)
/admin/dashboard          → AdminAnalytics (protected)
/admin/products           → AdminProducts (protected)
/admin/inquiries          → AdminInquiries (protected)
/admin/leads              → AdminLeads (protected)
```

All admin routes except `/admin` are wrapped by:
1. `AdminRoute` - checks authentication
2. `AdminLayout` - provides shared navbar

## Protection
- All admin pages are protected by `AdminRoute` component
- Checks session via `GET /api/admin/check`
- Redirects to `/admin` login if not authenticated

## Usage

### Starting the server
```bash
cd server
npm run dev
```

### Accessing admin panel
1. Navigate to `http://localhost:3000/admin`
2. Login with credentials (default: `admin@example.com` / `admin`)
3. You'll be redirected to `/admin/dashboard`
4. Use the navbar to switch between sections

## Next Steps

### To implement traffic tracking (Analytics page):
1. Create `server/models/TrafficLog.js` (Mongoose model)
2. Add `server/utils/trafficLogger.js` (Express middleware)
3. Mount middleware in `server/index.js`
4. Add analytics aggregation endpoints
5. Update `AdminAnalytics.jsx` to fetch and display charts

### To add WhatsApp opt-in to contact form:
1. Edit `src/app/contact/page.jsx`
2. Add checkbox for `whatsappOptIn`
3. Include `whatsapp_opt_in` in inquiry submission
4. Server will automatically trigger bot if opt-in is true

## Notes
- The old `AdminDashboard.jsx` component is no longer used (can be deleted)
- The `Inquiries.jsx` modal component is deprecated (functionality moved to `AdminInquiries.jsx`)
- All components use Lucide React icons for consistency
- Styling uses Tailwind CSS with consistent color scheme (blue for primary actions)
