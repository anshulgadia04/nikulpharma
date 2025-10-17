import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import mongoose from 'mongoose'
import { upload, getImageUrl } from './utils/imageHandler.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

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

// Product API Routes

// Get all products with filtering and pagination
app.get('/api/products', async (req, res) => {
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

const port = process.env.PORT || 3001
app.listen(port, () => {
  console.log(`API server listening on http://localhost:${port}`)
})


