import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import mongoose from 'mongoose'
import rateLimit from 'express-rate-limit'
import { upload, getImageUrl } from './utils/imageHandler.js'
import adminAuthRoutes from "./routes/adminAuth.js"
import session from "express-session";
import botTriggers from './whatsapp-bot/services/botTriggers.js'
import whatsappWebhook from './whatsapp-bot/webhooks/whatsappWebhook.js'
import { Lead, Counter } from './models/Leads.js'
import { trafficLogger } from './utils/trafficLogger.js';
import { TrafficLog } from './models/TrafficLog.js';
import { isAuthenticated, isAdmin, canViewAnalytics, canDelete } from './middleware/rbac.js';

// Rate limiting for login attempts
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per window
  message: { error: 'Too many login attempts. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});


const app = express()

// CORS Configuration - Allow frontend from .env or localhost
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (same-origin, mobile apps, Postman)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        // In production, allow all origins (or log and allow)
        console.log('CORS request from:', origin);
        callback(null, true);
      }
    },
    credentials: true, 
  })
);
app.use(express.json())
app.use(morgan('dev'))

// Traffic logging middleware - mount after body parsers, before routes
app.use(trafficLogger({
  sampleRate: 1, // Log everything; increase to 10 for 10% sampling if traffic grows
  excludePaths: [
    /^\/uploads\//,
    /^\/health$/,
    /^\/api\/admin\/analytics/, // Don't log analytics endpoint calls
    /^\/api\/upload\//,
  ]
}))

app.use(
  session({
    secret: process.env.SESSION_SECRET || "mysecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // true only if using HTTPS
      sameSite: "lax", // or "none" if HTTPS + cross-origin
      maxAge: 1000 * 60 * 60 * 2, // 2 hours
    },
  })
);



// Serve static files
app.use('/uploads', express.static('public/uploads'))

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017'
const dbName = process.env.MONGODB_DB || 'nikul_pharma'

console.log('Connecting to MongoDB:', mongoUri)
console.log('Database:', dbName)

mongoose
  .connect(mongoUri, { dbName: dbName })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err.message))

const inquirySchema = new mongoose.Schema(
  {
    // Personal Information
    first_name: { type: String, trim: true },
    last_name: { type: String, trim: true },
    email: { type: String, trim: true, required: true },
    phone: { type: String, trim: true },
    
    // Company Information
    company: { type: String, trim: true },
    job_title: { type: String, trim: true },
    industry: { type: String, trim: true },
    
    // Inquiry Details
    subject: { type: String, trim: true, required: true },
    message: { type: String, trim: true, required: true },
    product: { type: String, trim: true },
    
    // Additional Fields
    inquiry_type: { 
      type: String, 
      enum: ['general', 'product', 'quote', 'support', 'partnership'],
      default: 'general'
    },
    budget_range: { type: String, trim: true },
    timeline: { type: String, trim: true },
    country: { type: String, trim: true },
    state: { type: String, trim: true },
    city: { type: String, trim: true },
    
    // Status Tracking
    status: { 
      type: String, 
      enum: ['new', 'contacted', 'in_progress', 'quoted', 'closed'],
      default: 'new'
    },
    priority: { 
      type: String, 
      enum: ['low', 'medium', 'high', 'urgent'],
      default: 'medium'
    },
    
    // Response Tracking
    assigned_to: { type: String, trim: true },
    response_sent: { type: Boolean, default: false },
    response_date: { type: Date },
    follow_up_date: { type: Date },
    
    // Source Information
    source: { type: String, default: 'website' },
    referrer: { type: String },
    utm_source: { type: String },
    utm_medium: { type: String },
    utm_campaign: { type: String },
    
    // Additional Data
    ip_address: { type: String },
    user_agent: { type: String },
    notes: { type: String },
    attachments: [{ type: String }], // File paths for attachments
    
    // Metadata
    tags: [{ type: String }],
    custom_fields: { type: mongoose.Schema.Types.Mixed }
  },
  { 
    timestamps: true,
    collection: 'inquiries' // Explicitly set collection name
  }
)

const Inquiry = mongoose.model('Inquiry', inquirySchema)

// Product Schema
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    category: { type: String, required: true, trim: true },
    subcategory: { type: String, trim: true },
    description: { type: String, required: true },
    features: [{ type: String }],
    applications: [{ type: String }],
    specs: { type: mongoose.Schema.Types.Mixed }, // Object for flexible specifications
    image: { type: String, required: true },
    images: [{ type: String }], // Additional images array
    pdf: { type: String },
    accuracy: { type: String },
    price: { type: String, default: 'Contact for pricing' },
    availability: { type: String, default: 'In stock' },
    certifications: [{ type: String }],
    isActive: { type: Boolean, default: true },
    featured: { type: Boolean, default: false },
    tags: [{ type: String }],
    meta: {
      title: { type: String },
      description: { type: String },
      keywords: [{ type: String }]
    }
  },
  { timestamps: true }
)

// Create indexes for better performance
productSchema.index({ category: 1 })
productSchema.index({ isActive: 1, featured: 1 })
productSchema.index({ name: 'text', description: 'text', applications: 'text' })

const Product = mongoose.model('Product', productSchema)

// Category Schema
const categorySchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String },
    icon: { type: String },
    color: { type: String },
    isActive: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 }
  },
  { timestamps: true }
)

const Category = mongoose.model('Category', categorySchema)

app.get('/health', (_req, res) => {
  res.json({ ok: true })
})

app.post('/inquiries', async (req, res) => {
  try {
    const {
      // Personal Information
      first_name,
      last_name,
      email,
      phone,
      
      // Company Information
      company,
      job_title,
      industry,
      
      // Inquiry Details
      subject,
      message,
      product,
      
      // Additional Fields
      inquiry_type,
      budget_range,
      timeline,
      country,
      state,
      city,
      
      // Source Information
      source,
      referrer,
      utm_source,
      utm_medium,
      utm_campaign,
      
      // Additional Data
      notes,
      tags,
      custom_fields
    } = req.body || {}

    // Required fields validation
    if (!email || !subject || !message) {
      return res.status(400).json({ 
        error: 'Email, subject, and message are required' 
      })
    }

    // Get client information
    const ip_address = req.ip || req.connection.remoteAddress
    const user_agent = req.get('User-Agent')

    const inquiryData = {
      // Personal Information
      first_name: first_name?.trim(),
      last_name: last_name?.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim(),
      
      // Company Information
      company: company?.trim(),
      job_title: job_title?.trim(),
      industry: industry?.trim(),
      
      // Inquiry Details
      subject: subject.trim(),
      message: message.trim(),
      product: product?.trim(),
      
      // Additional Fields
      inquiry_type: inquiry_type || 'general',
      budget_range: budget_range?.trim(),
      timeline: timeline?.trim(),
      country: country?.trim(),
      state: state?.trim(),
      city: city?.trim(),
      
      // Source Information
      source: source || 'website',
      referrer: referrer?.trim(),
      utm_source: utm_source?.trim(),
      utm_medium: utm_medium?.trim(),
      utm_campaign: utm_campaign?.trim(),
      
      // Additional Data
      ip_address,
      user_agent,
      notes: notes?.trim(),
      tags: Array.isArray(tags) ? tags : [],
      custom_fields: custom_fields || {},
      
      // Default status
      status: 'new',
      priority: 'medium'
    }

    const inquiry = await Inquiry.create(inquiryData)

    console.log(`New inquiry created: ${inquiry._id} from ${email}`)

    // 🤖 Trigger WhatsApp Bot (async, non-blocking)
    botTriggers.onInquiryCreated(inquiry)
      .then(result => {
        if (result.success) {
          console.log(`✅ WhatsApp notification sent for inquiry ${inquiry._id}`)
        } else {
          console.warn(`⚠️ WhatsApp notification failed for inquiry ${inquiry._id}:`, result.reason || result.error)
        }
      })
      .catch(err => {
        console.error(`❌ WhatsApp notification error for inquiry ${inquiry._id}:`, err.message)
      })

    res.status(201).json({ 
      success: true,
      id: inquiry._id,
      message: 'Inquiry submitted successfully'
    })
  } catch (err) {
    console.error('Failed to create inquiry:', err)
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Failed to submit inquiry. Please try again.'
    })
  }
})

// Inquiry Management Routes

// Get all inquiries (admin)
app.get('/api/admin/inquiries', async (req, res) => {
  try {
    const {
      status,
      priority,
      page = 1,
      limit = 20,
      sort = 'createdAt',
      order = 'desc'
    } = req.query

    const query = {}
    if (status) query.status = status
    if (priority) query.priority = priority

    const sortObj = {}
    sortObj[sort] = order === 'desc' ? -1 : 1

    const skip = (parseInt(page) - 1) * parseInt(limit)

    const [inquiries, total] = await Promise.all([
      Inquiry.find(query)
        .sort(sortObj)
        .skip(skip)
        .limit(parseInt(limit))
        .lean(),
      Inquiry.countDocuments(query)
    ])

    res.json({
      inquiries,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    })
  } catch (err) {
    console.error('Failed to fetch inquiries:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get single inquiry (admin)
app.get('/api/admin/inquiries/:id', async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id).lean()
    
    if (!inquiry) {
      return res.status(404).json({ error: 'Inquiry not found' })
    }

    res.json(inquiry)
  } catch (err) {
    console.error('Failed to fetch inquiry:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Update inquiry status (admin)
app.put('/api/admin/inquiries/:id', async (req, res) => {
  try {
    const { status, priority, assigned_to, notes, response_sent } = req.body
    
    const updateData = {}
    if (status) updateData.status = status
    if (priority) updateData.priority = priority
    if (assigned_to !== undefined) updateData.assigned_to = assigned_to
    if (notes !== undefined) updateData.notes = notes
    if (response_sent !== undefined) {
      updateData.response_sent = response_sent
      if (response_sent) updateData.response_date = new Date()
    }

    const inquiry = await Inquiry.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    )
    
    if (!inquiry) {
      return res.status(404).json({ error: 'Inquiry not found' })
    }

    res.json(inquiry)
  } catch (err) {
    console.error('Failed to update inquiry:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Delete single inquiry (admin only - subadmins cannot delete)
app.delete('/api/admin/inquiries/:id', isAdmin, async (req, res) => {
  try {
    const inquiry = await Inquiry.findByIdAndDelete(req.params.id)
    
    if (!inquiry) {
      return res.status(404).json({ error: 'Inquiry not found' })
    }

    res.json({ success: true, message: 'Inquiry deleted successfully' })
  } catch (err) {
    console.error('Failed to delete inquiry:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Delete multiple inquiries (admin only - subadmins cannot delete)
app.post('/api/admin/inquiries/delete-multiple', isAdmin, async (req, res) => {
  try {
    const { ids } = req.body
    
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ error: 'Invalid inquiry IDs' })
    }

    const result = await Inquiry.deleteMany({ _id: { $in: ids } })
    
    res.json({ 
      success: true, 
      message: `${result.deletedCount} inquiries deleted successfully`,
      deletedCount: result.deletedCount
    })
  } catch (err) {
    console.error('Failed to delete inquiries:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get inquiry statistics (admin)
app.get('/api/admin/inquiries/stats', async (req, res) => {
  try {
    const stats = await Inquiry.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          byStatus: {
            $push: {
              status: '$status',
              createdAt: '$createdAt'
            }
          },
          byPriority: {
            $push: {
              priority: '$priority'
            }
          },
          byMonth: {
            $push: {
              month: { $month: '$createdAt' },
              year: { $year: '$createdAt' }
            }
          }
        }
      }
    ])

    // Process statistics
    const result = {
      total: stats[0]?.total || 0,
      byStatus: {},
      byPriority: {},
      byMonth: {},
      recentCount: 0
    }

    if (stats[0]) {
      // Status breakdown
      stats[0].byStatus.forEach(item => {
        result.byStatus[item.status] = (result.byStatus[item.status] || 0) + 1
      })

      // Priority breakdown
      stats[0].byPriority.forEach(item => {
        result.byPriority[item.priority] = (result.byPriority[item.priority] || 0) + 1
      })

      // Monthly breakdown
      stats[0].byMonth.forEach(item => {
        const key = `${item.year}-${item.month}`
        result.byMonth[key] = (result.byMonth[key] || 0) + 1
      })

      // Recent inquiries (last 7 days)
      const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      result.recentCount = stats[0].byStatus.filter(item => 
        new Date(item.createdAt) >= sevenDaysAgo
      ).length
    }

    res.json(result)
  } catch (err) {
    console.error('Failed to fetch inquiry statistics:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get all leads (admin)
app.get('/api/admin/leads', async (req, res) => {
  try {
    const {
      status,
      source,
      page = 1,
      limit = 50,
      sort = 'createdAt',
      order = 'desc'
    } = req.query

    const query = {}
    if (status) query.status = status
    if (source) query.source = source

    const sortObj = {}
    sortObj[sort] = order === 'desc' ? -1 : 1

    const skip = (parseInt(page) - 1) * parseInt(limit)

    const [leads, total] = await Promise.all([
      Lead.find(query)
        .sort(sortObj)
        .skip(skip)
        .limit(parseInt(limit))
        .lean(),
      Lead.countDocuments(query)
    ])

    res.json({
      leads,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    })
  } catch (err) {
    console.error('Failed to fetch leads:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Update lead status (mark as completed)
app.patch('/api/admin/leads/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { status, state } = req.body

    const updateData = {}
    if (status) updateData.status = status
    if (state) updateData.state = state

    const lead = await Lead.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    )

    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' })
    }

    res.json({ success: true, lead })
  } catch (err) {
    console.error('Failed to update lead:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Delete lead (admin only - subadmins cannot delete)
app.delete('/api/admin/leads/:id', isAdmin, async (req, res) => {
  try {
    const { id } = req.params

    const lead = await Lead.findByIdAndDelete(id)

    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' })
    }

    res.json({ success: true, message: 'Lead deleted successfully' })
  } catch (err) {
    console.error('Failed to delete lead:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// ============================================================
// CRM LEAD MANAGEMENT ENDPOINTS
// ============================================================

// Get lead by Lead ID (e.g., NIKUL-2025-001)
app.get('/api/admin/leads/by-id/:leadId', isAuthenticated, async (req, res) => {
  try {
    const { leadId } = req.params;
    const lead = await Lead.findOne({ leadId });
    
    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }
    
    res.json({ success: true, lead });
  } catch (err) {
    console.error('Failed to fetch lead:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update lead pipeline stage
app.patch('/api/admin/leads/:id/pipeline', isAuthenticated, async (req, res) => {
  try {
    const { id } = req.params;
    const { pipeline_stage, comment } = req.body;
    const currentUser = req.session.admin;
    
    const lead = await Lead.findById(id);
    
    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }
    
  const oldStage = lead.pipeline_stage;
  lead.pipeline_stage = pipeline_stage;
    
    // Add activity
    lead.addActivity('status_change', {
      description: `Pipeline stage changed from ${oldStage} to ${pipeline_stage}`,
      oldValue: oldStage,
      newValue: pipeline_stage,
      comment,
      staff: {
        username: currentUser.username,
        fullName: currentUser.fullName
      }
    });
    
    // If moved to won, set closed date and deal value and mark last quotation accepted
    if (pipeline_stage === 'won' && lead.active_quotation_amount > 0) {
      if (Array.isArray(lead.quotations) && lead.quotations.length > 0) {
        const lastIdx = lead.quotations.length - 1;
        lead.quotations[lastIdx].status = 'accepted';
      }
      lead.won_amount = lead.active_quotation_amount;
      lead.deal_value = lead.active_quotation_amount;
      lead.closed_date = new Date();
      lead.admin_status = 'completed';
    }
    
    // If moved to lost, clear active quotation and set closed date and mark last quotation rejected
    if (pipeline_stage === 'lost') {
      if (Array.isArray(lead.quotations) && lead.quotations.length > 0) {
        const lastIdx = lead.quotations.length - 1;
        lead.quotations[lastIdx].status = 'rejected';
      }
      lead.active_quotation_amount = 0;
      lead.closed_date = new Date();
      lead.admin_status = 'completed';
    }
    
    await lead.save();
    
    res.json({ success: true, lead });
  } catch (err) {
    console.error('Failed to update pipeline:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Send quotation
app.post('/api/admin/leads/:id/quotation', isAuthenticated, async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, items } = req.body; // simplified payload
    const currentUser = req.session.admin;

    const lead = await Lead.findById(id);
    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }

    // Ensure authenticated user exists (session could have expired)
    if (!currentUser) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    // Ensure lead has a leadId for proper quotation numbering
    if (!lead.leadId) {
      try {
        const counter = await Counter.findByIdAndUpdate(
          { _id: 'leadId' },
          { $inc: { sequence_value: 1 } },
          { new: true, upsert: true }
        );
        const year = new Date().getFullYear();
        const sequenceNumber = String(counter.sequence_value).padStart(4, '0');
        lead.leadId = `NIKUL-${year}-${sequenceNumber}`;
        console.log('[LeadId Generated On-The-Fly]', lead.leadId);
      } catch (e) {
        console.warn('Failed to generate leadId on the fly:', e?.message);
      }
    }

    // Normalize amount (may arrive as formatted string)
    const rawAmount = typeof amount === 'string' ? amount.replace(/[,\s]/g, '') : amount;
    const numericAmount = Number(rawAmount);
    const itemsValue = Array.isArray(items) ? items.join(', ') : items; // allow accidental array submission

    console.log('[Quotation Attempt]', {
      leadMongoId: id,
      leadId: lead.leadId,
      originalAmount: amount,
      rawAmount,
      numericAmount,
      amountType: typeof amount,
      isNumeric: !isNaN(numericAmount),
      itemsType: Array.isArray(items) ? 'array' : typeof items,
      itemsLength: typeof itemsValue === 'string' ? itemsValue.length : null,
      itemsPreview: typeof itemsValue === 'string' ? itemsValue.substring(0, 50) : itemsValue,
      user: currentUser?.username
    });

    // Allow multiple quotations; no restriction on sending again

    if (rawAmount === undefined || rawAmount === null || rawAmount === '' || isNaN(numericAmount) || numericAmount <= 0) {
      console.warn('[Quotation Validation Failed] Invalid amount', { rawAmount, numericAmount });
      return res.status(400).json({ 
        error: 'Valid amount required (positive number)',
        debug: process.env.NODE_ENV !== 'production' ? { rawAmount, numericAmount } : undefined
      });
    }
    if (!itemsValue || typeof itemsValue !== 'string' || itemsValue.trim().length === 0) {
      console.warn('[Quotation Validation Failed] Items description missing or invalid', { itemsValue });
      return res.status(400).json({ 
        error: 'Items description required',
        debug: process.env.NODE_ENV !== 'production' ? { receivedType: typeof items, length: itemsValue?.length } : undefined
      });
    }

  const quotationId = `QT-${lead.leadId}-${(lead.quotations?.length || 0) + 1}`;

    lead.quotations.push({
      quotation_id: quotationId,
      amount: numericAmount,
      items: itemsValue.trim(),
      status: 'pending',
      sentBy: {
        username: currentUser.username,
        fullName: currentUser.fullName
      }
    });

    // Set active quotation amount
  lead.active_quotation_amount = numericAmount;

    // Auto move to quoted stage if earlier
    if (['new', 'contacted'].includes(lead.pipeline_stage)) {
      lead.pipeline_stage = 'quoted';
    }

    // Auto-assign to staff who sent quotation if not assigned yet
    if (!lead.assigned_to || !lead.assigned_to.username) {
      lead.assigned_to = {
        username: currentUser.username,
        fullName: currentUser.fullName,
        assignedAt: new Date()
      };
    }

    lead.addActivity('quotation_sent', {
      description: `Quotation sent: ₹${Number(amount).toLocaleString('en-IN')}`,
      staff: {
        username: currentUser.username,
        fullName: currentUser.fullName
      }
    });

    await lead.save();
    console.log('[Quotation Success]', { quotationId, leadId: lead.leadId, activeAmount: lead.active_quotation_amount });
    res.json({ success: true, lead, quotationId });
  } catch (err) {
    console.error('Failed to send quotation:', err);
    // Surface more specific error when possible
    const message = err.message?.includes('Cannot read') ? 'Session expired. Please log in again.' : 'Internal server error';
    res.status(500).json({ error: message });
  }
});

// Add comment/note to lead
app.post('/api/admin/leads/:id/comment', isAuthenticated, async (req, res) => {
  try {
    const { id } = req.params;
    const { comment } = req.body;
    const currentUser = req.session.admin;
    
    const lead = await Lead.findById(id);
    
    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }
    
    lead.addActivity('comment', {
      comment,
      description: 'Comment added',
      staff: {
        username: currentUser.username,
        fullName: currentUser.fullName
      }
    });
    
    await lead.save();
    
    res.json({ success: true, lead });
  } catch (err) {
    console.error('Failed to add comment:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Assign lead to staff
app.patch('/api/admin/leads/:id/assign', isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { staffUsername, staffFullName } = req.body;
    const currentUser = req.session.admin;
    
    const lead = await Lead.findById(id);
    
    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }
    
    const oldAssignment = lead.assigned_to?.fullName || 'Unassigned';
    
    lead.assigned_to = {
      username: staffUsername,
      fullName: staffFullName,
      assignedAt: new Date()
    };
    
    lead.addActivity('assignment', {
      description: `Lead assigned to ${staffFullName}`,
      oldValue: oldAssignment,
      newValue: staffFullName,
      staff: {
        username: currentUser.username,
        fullName: currentUser.fullName
      }
    });
    
    await lead.save();
    
    res.json({ success: true, lead });
  } catch (err) {
    console.error('Failed to assign lead:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Set follow-up date
app.patch('/api/admin/leads/:id/follow-up', isAuthenticated, async (req, res) => {
  try {
    const { id } = req.params;
    const { date, note } = req.body;
    const currentUser = req.session.admin;
    
    const lead = await Lead.findById(id);
    
    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }
    
    lead.next_follow_up = {
      date: new Date(date),
      note,
      reminder_sent: false
    };
    
    lead.addActivity('follow_up', {
      description: `Follow-up scheduled for ${new Date(date).toLocaleDateString()}`,
      comment: note,
      staff: {
        username: currentUser.username,
        fullName: currentUser.fullName
      }
    });
    
    await lead.save();
    
    res.json({ success: true, lead });
  } catch (err) {
    console.error('Failed to set follow-up:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get Open Opportunities Dashboard
app.get('/api/admin/leads/dashboard/opportunities', isAuthenticated, async (req, res) => {
  try {
    const currentUser = req.session.admin;
    const isAdmin = currentUser.role === 'admin';
    
    // Get total open opportunities
    const totalOpp = await Lead.calculateOpenOpportunity();
    
    // Get staff-wise breakdown (only for admin)
    let staffOpportunities = [];
    if (isAdmin) {
      staffOpportunities = await Lead.getStaffOpenOpportunities();
    }
    
    // Get user's own opportunities (for staff)
    let myOpportunities = { totalAmount: 0, leadCount: 0 };
    if (!isAdmin) {
      myOpportunities = await Lead.calculateOpenOpportunity(currentUser.username);
    }
    
    // Get pipeline counts
    const pipelineCounts = await Lead.aggregate([
      {
        $group: {
          _id: '$pipeline_stage',
          count: { $sum: 1 },
          totalValue: { $sum: '$active_quotation_amount' }
        }
      }
    ]);
    
    // Get recent won deals
    const recentWins = await Lead.find({ pipeline_stage: 'won' })
      .sort({ closed_date: -1 })
      .limit(5)
      .lean();
    
    res.json({
      success: true,
      totalOpenOpportunity: totalOpp.totalAmount,
      totalLeadsInPipeline: totalOpp.leadCount,
      staffOpportunities: isAdmin ? staffOpportunities : undefined,
      myOpportunities: !isAdmin ? myOpportunities : undefined,
      pipelineCounts,
      recentWins
    });
  } catch (err) {
    console.error('Failed to fetch opportunities:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get leads by pipeline stage (with filters)
app.get('/api/admin/leads/pipeline/:stage', isAuthenticated, async (req, res) => {
  try {
    const { stage } = req.params;
    const currentUser = req.session.admin;
    const isAdmin = currentUser.role === 'admin';
    
    const query = { pipeline_stage: stage };
    
    // Staff can only see their assigned leads
    if (!isAdmin) {
      query['assigned_to.username'] = currentUser.username;
    }
    
    const leads = await Lead.find(query)
      .sort({ updatedAt: -1 })
      .lean();
    
    res.json({ success: true, leads, count: leads.length });
  } catch (err) {
    console.error('Failed to fetch pipeline leads:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Analytics Endpoints (Admin Only - Sub-admins cannot access)

// Get analytics overview
app.get('/api/admin/analytics/overview', canViewAnalytics, async (req, res) => {
  try {
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const [
      totalTraffic,
      traffic7d,
      traffic30d,
      totalConversions,
      conversions7d,
      totalProducts,
      totalInquiries,
      totalLeads,
    ] = await Promise.all([
      TrafficLog.countDocuments({}),
      TrafficLog.countDocuments({ timestamp: { $gte: sevenDaysAgo } }),
      TrafficLog.countDocuments({ timestamp: { $gte: thirtyDaysAgo } }),
      TrafficLog.countDocuments({ isConversion: true }),
      TrafficLog.countDocuments({ isConversion: true, timestamp: { $gte: sevenDaysAgo } }),
      mongoose.model('Product').countDocuments({ isActive: true }),
      mongoose.model('Inquiry').countDocuments({}),
      Lead.countDocuments({}),
    ]);

    // Calculate Open Opportunity
    // Primary: sum of active_quotation_amount for leads in quoted/negotiation stages
    const openFromActive = await Lead.calculateOpenOpportunity();
    let totalOpenOpportunity = (openFromActive && openFromActive.totalAmount) || 0;

    // Fallback: if zero (e.g., legacy data), sum the latest quotation.amount per lead in quoted/negotiation
    if (!totalOpenOpportunity) {
      const fallbackAgg = await Lead.aggregate([
        { $match: { 'quotations.0': { $exists: true } } },
        { $project: { quotations: 1 } },
        { $addFields: { lastIndex: { $subtract: [ { $size: '$quotations' }, 1 ] } } },
        { $addFields: { lastQuotation: { $arrayElemAt: ['$quotations', '$lastIndex'] } } },
        { $group: { _id: null, total: { $sum: { $ifNull: ['$lastQuotation.amount', 0] } } } }
      ]);
      totalOpenOpportunity = (fallbackAgg && fallbackAgg[0] && fallbackAgg[0].total) || 0;
    }

    const conversionRate = traffic30d > 0 ? ((conversions7d / traffic7d) * 100).toFixed(2) : 0;

    res.json({
      traffic: {
        total: totalTraffic,
        last7Days: traffic7d,
        last30Days: traffic30d,
      },
      conversions: {
        total: totalConversions,
        last7Days: conversions7d,
        conversionRate: parseFloat(conversionRate),
      },
      counts: {
        products: totalProducts,
        inquiries: totalInquiries,
        leads: totalLeads,
        openOpportunity: totalOpenOpportunity,
      },
    });
  } catch (err) {
    console.error('Analytics overview error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get traffic by day (last N days)
app.get('/api/admin/analytics/traffic', canViewAnalytics, async (req, res) => {
  try {
    const days = parseInt(req.query.days || '30', 10);
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

    const pipeline = [
      { $match: { timestamp: { $gte: since }, routeType: { $nin: ['admin', 'asset'] } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$timestamp' } },
          views: { $sum: 1 },
          conversions: {
            $sum: { $cond: [{ $eq: ['$isConversion', true] }, 1, 0] }
          },
        }
      },
      { $sort: { _id: 1 } },
    ];

    const results = await TrafficLog.aggregate(pipeline);
    res.json(results);
  } catch (err) {
    console.error('Traffic analytics error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get top products and categories
app.get('/api/admin/analytics/products', canViewAnalytics, async (req, res) => {
  try {
    const days = parseInt(req.query.days || '30', 10);
    const limit = parseInt(req.query.limit || '10', 10);
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

    const [topProducts, topCategories] = await Promise.all([
      // Top products by views
      TrafficLog.aggregate([
        { 
          $match: { 
            timestamp: { $gte: since }, 
            isProductView: true,
            productSlug: { $exists: true, $ne: null }
          } 
        },
        { $group: { _id: '$productSlug', views: { $sum: 1 } } },
        { $sort: { views: -1 } },
        { $limit: limit },
        { 
          $lookup: {
            from: 'products',
            localField: '_id',
            foreignField: 'slug',
            as: 'product'
          }
        },
        { 
          $project: {
            slug: '$_id',
            views: 1,
            name: { $arrayElemAt: ['$product.name', 0] },
            category: { $arrayElemAt: ['$product.category', 0] },
          }
        },
      ]),
      
      // Top categories by views
      TrafficLog.aggregate([
        { 
          $match: { 
            timestamp: { $gte: since }, 
            category: { $exists: true, $ne: null }
          } 
        },
        { $group: { _id: '$category', views: { $sum: 1 } } },
        { $sort: { views: -1 } },
        { $limit: limit },
        { $project: { category: '$_id', views: 1, _id: 0 } },
      ]),
    ]);

    res.json({ topProducts, topCategories });
  } catch (err) {
    console.error('Product analytics error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get conversion funnel data
app.get('/api/admin/analytics/conversions', canViewAnalytics, async (req, res) => {
  try {
    const days = parseInt(req.query.days || '30', 10);
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

    const [
      productListViews,
      productDetailViews,
      inquiries,
      leads,
    ] = await Promise.all([
      TrafficLog.countDocuments({ timestamp: { $gte: since }, isListView: true }),
      TrafficLog.countDocuments({ timestamp: { $gte: since }, isProductView: true }),
      TrafficLog.countDocuments({ timestamp: { $gte: since }, isConversion: true }),
      Lead.countDocuments({ createdAt: { $gte: since } }),
    ]);

    // Calculate conversion rates
    const listToDetail = productListViews > 0 ? ((productDetailViews / productListViews) * 100).toFixed(2) : 0;
    const detailToInquiry = productDetailViews > 0 ? ((inquiries / productDetailViews) * 100).toFixed(2) : 0;
    const inquiryToLead = inquiries > 0 ? ((leads / inquiries) * 100).toFixed(2) : 0;

    res.json({
      funnel: {
        productListViews,
        productDetailViews,
        inquiries,
        leads,
      },
      rates: {
        listToDetail: parseFloat(listToDetail),
        detailToInquiry: parseFloat(detailToInquiry),
        inquiryToLead: parseFloat(inquiryToLead),
      },
    });
  } catch (err) {
    console.error('Conversion analytics error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Product API Routes

// Get all products with filtering and pagination
// Get all products (no pagination limit)
app.get('/api/products', async (req, res) => {
  console.log("Query received:", req.query);

  try {
    const {
      category,
      search,
      featured,
      page = 1,
      limit = 12,
      sort = 'name',
      order = 'asc'
    } = req.query

    const query = { isActive: true }
    
    if (category) query.category = category
    if (featured === 'true') query.featured = true
    if (search) {
      query.$text = { $search: search }
    }

    const sortObj = {}
    sortObj[sort] = order === 'desc' ? -1 : 1

    const skip = (parseInt(page) - 1) * parseInt(limit)

    const [products, total] = await Promise.all([
      Product.find(query)
        .sort(sortObj)
        .skip(skip)
        .limit(parseInt(limit))
        .lean(),
      Product.countDocuments(query)
    ])

    res.json({
      products,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    })
  } catch (err) {
    console.error('Failed to fetch products:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})


// Get single product by slug
app.get('/api/products/:slug', async (req, res) => {
  try {
    const product = await Product.findOne({ 
      slug: req.params.slug, 
      isActive: true 
    }).lean()
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }

    // Attach category to res.locals for traffic logger
    if (product.category) {
      res.locals.productCategory = product.category;
      console.log(`[Product Route] Set category: ${product.category} for slug: ${req.params.slug}`);
    } else {
      console.log(`[Product Route] No category for slug: ${req.params.slug}`);
    }

    res.json(product)
  } catch (err) {
    console.error('Failed to fetch product:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get all categories
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true })
      .sort({ sortOrder: 1, name: 1 })
      .lean()
    
    res.json(categories)
  } catch (err) {
    console.error('Failed to fetch categories:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Admin routes for product management
app.post('/api/admin/products', async (req, res) => {
  try {
    const productData = req.body
    
    // Validate required fields
    if (!productData.name || !productData.slug || !productData.category) {
      return res.status(400).json({ 
        error: 'Name, slug, and category are required' 
      })
    }

    const product = await Product.create(productData)
    res.status(201).json(product)
  } catch (err) {
    console.error('Failed to create product:', err)
    if (err.code === 11000) {
      res.status(400).json({ error: 'Product slug already exists' })
    } else {
      res.status(500).json({ error: 'Internal server error' })
    }
  }
})

app.put('/api/admin/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }

    res.json(product)
  } catch (err) {
    console.error('Failed to update product:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

app.delete('/api/admin/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }

    res.json({ message: 'Product deleted successfully' })
  } catch (err) {
    console.error('Failed to delete product:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Image upload endpoint
app.post('/api/upload/image', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' })
    }

    const imageUrl = getImageUrl(req.file.filename)
    res.json({ 
      success: true, 
      imageUrl,
      filename: req.file.filename 
    })
  } catch (error) {
    console.error('Image upload error:', error)
    res.status(500).json({ error: 'Failed to upload image' })
  }
})

// Multiple images upload endpoint
app.post('/api/upload/images', upload.array('images', 10), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No image files provided' })
    }

    const imageUrls = req.files.map(file => getImageUrl(file.filename))
    res.json({ 
      success: true, 
      imageUrls,
      filenames: req.files.map(file => file.filename)
    })
  } catch (error) {
    console.error('Images upload error:', error)
    res.status(500).json({ error: 'Failed to upload images' })
  }
})

export { Category, Product, Inquiry };

app.use("/api/admin", adminAuthRoutes);

// WhatsApp Webhook Routes
app.use("/webhooks", whatsappWebhook);

const port = process.env.PORT || 3001
app.listen(port, () => {
  console.log(`API server listening on http://localhost:${port}`)
  console.log(`📱 WhatsApp webhook ready at http://localhost:${port}/webhooks/whatsapp`)
})


