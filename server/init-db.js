import mongoose from 'mongoose'
import 'dotenv/config'

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017'
const dbName = process.env.MONGODB_DB || 'nikul_pharma'

async function initDatabase() {
  try {
    await mongoose.connect(mongoUri, { dbName })
    console.log('Connected to MongoDB')
    
    // Create collections
    const db = mongoose.connection.db
    
    // Create inquiries collection
    await db.createCollection('inquiries')
    console.log('Created inquiries collection')
    
    console.log('Database initialization complete')
    process.exit(0)
  } catch (error) {
    console.error('Database initialization failed:', error)
    process.exit(1)
  }
}

initDatabase()