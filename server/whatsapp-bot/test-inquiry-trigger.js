import 'dotenv/config';
import mongoose from 'mongoose';

/**
 * Test Bot Trigger with Real Inquiry Creation
 * This script simulates creating an inquiry in the database
 * and triggers the WhatsApp bot automatically
 */

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = process.env.MONGODB_DB || 'nikul_pharma';

// Define the same schema as in index.js
const inquirySchema = new mongoose.Schema(
  {
    first_name: { type: String, trim: true },
    last_name: { type: String, trim: true },
    email: { type: String, trim: true, required: true },
    phone: { type: String, trim: true },
    company: { type: String, trim: true },
    job_title: { type: String, trim: true },
    industry: { type: String, trim: true },
    subject: { type: String, trim: true, required: true },
    message: { type: String, trim: true, required: true },
    product: { type: String, trim: true },
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
    assigned_to: { type: String, trim: true },
    response_sent: { type: Boolean, default: false },
    response_date: { type: Date },
    follow_up_date: { type: Date },
    source: { type: String, default: 'website' },
    referrer: { type: String },
    utm_source: { type: String },
    utm_medium: { type: String },
    utm_campaign: { type: String },
    ip_address: { type: String },
    user_agent: { type: String },
    notes: { type: String },
    attachments: [{ type: String }],
    tags: [{ type: String }],
    custom_fields: { type: mongoose.Schema.Types.Mixed }
  },
  { 
    timestamps: true,
    collection: 'inquiries'
  }
);

const Inquiry = mongoose.model('Inquiry', inquirySchema);

// Import bot triggers
import botTriggers from './services/botTriggers.js';

async function testInquiryWithBot() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(mongoUri, { dbName: dbName });
    console.log('✅ MongoDB connected\n');

    // Test Case 1: General Inquiry with Interactive Buttons
    console.log('📝 Test 1: Creating GENERAL INQUIRY...\n');
    const generalInquiry = await Inquiry.create({
      first_name: 'Anshul',
      last_name: 'Gadia',
      email: 'anshul@example.com',
      phone: '6375591682', // Will be auto-formatted to 916375591682
      company: 'Test Pharmaceuticals Ltd',
      job_title: 'Purchase Manager',
      industry: 'Pharmaceutical Manufacturing',
      subject: 'Inquiry about pharmaceutical equipment',
      message: 'Hello, I am interested in learning more about your mixing and granulation equipment. Could you provide details and pricing?',
      inquiry_type: 'general',
      country: 'India',
      state: 'Gujarat',
      city: 'Ahmedabad',
      source: 'website',
      ip_address: '127.0.0.1',
      user_agent: 'Test Bot Script'
    });

    console.log(`✅ General inquiry created: ${generalInquiry._id}`);

    // Trigger WhatsApp bot
    console.log('🤖 Triggering WhatsApp bot...\n');
    const result1 = await botTriggers.onInquiryCreated(generalInquiry);
    console.log('Bot Response:', result1);
    console.log('\n' + '='.repeat(60) + '\n');

    // Wait 3 seconds
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Test Case 2: Product-Specific Inquiry
    console.log('📝 Test 2: Creating PRODUCT INQUIRY...\n');
    const productInquiry = await Inquiry.create({
      first_name: 'Rajesh',
      last_name: 'Patel',
      email: 'rajesh@pharmatech.com',
      phone: '+91 6375591682', // With country code format
      company: 'PharmaLabs India',
      subject: 'RMG Inquiry',
      message: 'Need quotation for Rapid Mixer Granulator with 100L capacity',
      product: 'Rapid Mixer Granulator (RMG)',
      inquiry_type: 'product',
      country: 'India',
      source: 'website'
    });

    console.log(`✅ Product inquiry created: ${productInquiry._id}`);

    // Trigger WhatsApp bot
    console.log('🤖 Triggering WhatsApp bot...\n');
    const result2 = await botTriggers.onInquiryCreated(productInquiry);
    console.log('Bot Response:', result2);
    console.log('\n' + '='.repeat(60) + '\n');

    // Wait 3 seconds
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Test Case 3: Quote Request
    console.log('📝 Test 3: Creating QUOTE REQUEST...\n');
    const quoteInquiry = await Inquiry.create({
      first_name: 'Priya',
      last_name: 'Shah',
      email: 'priya@medequip.com',
      phone: '916375591682', // Already formatted
      company: 'MedEquip Solutions',
      subject: 'Quote for FBD System',
      message: 'Please provide detailed quotation for Fluid Bed Dryer',
      inquiry_type: 'quote',
      budget_range: '10-15 lakhs',
      timeline: '3 months',
      country: 'India',
      source: 'website'
    });

    console.log(`✅ Quote inquiry created: ${quoteInquiry._id}`);

    // Trigger WhatsApp bot
    console.log('🤖 Triggering WhatsApp bot...\n');
    const result3 = await botTriggers.onInquiryCreated(quoteInquiry);
    console.log('Bot Response:', result3);
    console.log('\n' + '='.repeat(60) + '\n');

    console.log('🎉 All test inquiries created and WhatsApp notifications sent!');
    console.log('\n📱 Check WhatsApp at +91 6375591682 for 3 messages\n');

    console.log('📊 Summary:');
    console.log(`1. General Inquiry: ${result1.success ? '✅ Sent' : '❌ Failed'}`);
    console.log(`2. Product Inquiry: ${result2.success ? '✅ Sent' : '❌ Failed'}`);
    console.log(`3. Quote Request: ${result3.success ? '✅ Sent' : '❌ Failed'}`);

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('Full error:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\n🔌 MongoDB connection closed');
  }
}

// Run the test
console.log('🧪 Testing Inquiry Creation with WhatsApp Bot Trigger\n');
testInquiryWithBot();
