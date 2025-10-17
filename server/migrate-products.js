import 'dotenv/config'
import mongoose from 'mongoose'

// Import product data
import { products, productCategories } from '../src/utils/products.js'

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017'
const dbName = process.env.MONGODB_DB || 'nikul_pharma'

console.log('MongoDB URI:', mongoUri)
console.log('Database name:', dbName)

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
    specs: { type: mongoose.Schema.Types.Mixed },
    image: { type: String, required: true },
    images: [{ type: String }],
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

const Product = mongoose.model('Product', productSchema)
const Category = mongoose.model('Category', categorySchema)

async function migrateData() {
  try {
    console.log('Connecting to MongoDB...')
    await mongoose.connect(mongoUri, { dbName })
    console.log('Connected to MongoDB')

    // Clear existing data
    console.log('Clearing existing data...')
    await Product.deleteMany({})
    await Category.deleteMany({})

    // Migrate categories
    console.log('Migrating categories...')
    const categories = productCategories.map((cat, index) => ({
      id: cat.id,
      name: cat.name,
      description: cat.description,
      icon: cat.icon,
      color: cat.color,
      sortOrder: index
    }))
    
    await Category.insertMany(categories)
    console.log(`Migrated ${categories.length} categories`)

    // Migrate products
    console.log('Migrating products...')
    const productsToMigrate = products.map(product => ({
      name: product.name,
      slug: product.slug,
      category: product.category,
      subcategory: product.subcategory,
      description: product.description,
      features: product.features || [],
      applications: product.applications || [],
      specs: product.specs || {},
      image: product.image,
      images: product.images || [],
      pdf: product.pdf,
      accuracy: product.accuracy,
      price: product.price || 'Contact for pricing',
      availability: product.availability || 'In stock',
      certifications: product.certifications || [],
      tags: [product.category, product.subcategory].filter(Boolean),
      meta: {
        title: product.name,
        description: product.description,
        keywords: [
          product.name,
          product.category,
          product.subcategory,
          ...(product.applications || [])
        ].filter(Boolean)
      }
    }))

    await Product.insertMany(productsToMigrate)
    console.log(`Migrated ${productsToMigrate.length} products`)

    console.log('Migration completed successfully!')
    
    // Display summary
    const productCount = await Product.countDocuments()
    const categoryCount = await Category.countDocuments()
    
    console.log(`\nSummary:`)
    console.log(`- Products: ${productCount}`)
    console.log(`- Categories: ${categoryCount}`)
    
  } catch (error) {
    console.error('Migration failed:', error)
  } finally {
    await mongoose.disconnect()
    console.log('Disconnected from MongoDB')
  }
}

// Run migration
migrateData()
