import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Lead } from './models/Leads.js';

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = process.env.MONGODB_DB || 'nikul_pharma';

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function makePhone(base, inc) {
  // Simple 10-digit Indian-style numbers starting with 9
  return String(9000000000 + base + inc);
}

async function seed() {
  try {
    console.log('Connecting to MongoDB...', MONGO_URI, DB_NAME);
    await mongoose.connect(MONGO_URI, { dbName: DB_NAME, serverSelectionTimeoutMS: 5000 });
    console.log('✅ Connected');

    // Create a small set of realistic dummy leads
    const now = new Date();
    const leads = [
      {
        customer_name: 'Ravi Kumar',
        phone: makePhone(1000, 1),
        email: 'ravi.kumar@example.com',
        company: 'Kumar Pharma',
        location: { city: 'Ahmedabad', state: 'Gujarat', country: 'India' },
        category: 'Granulation',
        product: 'Rapid Mixer Granulator',
        requirement_details: 'RMG 250L with 30 kW motor, SS316',
        pipeline_stage: 'new',
        interest_state: 'interested',
        priority: 'medium',
        activities: [{
          type: 'comment',
          description: 'Lead created (seed)',
          comment: 'Initial seed lead',
          createdAt: now
        }]
      },
      {
        customer_name: 'Priya Sharma',
        phone: makePhone(1000, 2),
        email: 'priya.sharma@example.com',
        company: 'Sharma Labs',
        location: { city: 'Mumbai', state: 'Maharashtra', country: 'India' },
        category: 'Mixers',
        product: 'Planetary Mixer',
        requirement_details: '100L, vacuum capable, jacketed',
        pipeline_stage: 'contacted',
        interest_state: 'interested',
        priority: 'high',
        activities: [{
          type: 'status_change',
          description: 'Pipeline stage changed from NEW to CONTACTED',
          oldValue: 'new',
          newValue: 'contacted',
          staff: { username: 'admin', fullName: 'Admin User' },
          createdAt: now
        }]
      },
      {
        customer_name: 'Aarav Singh',
        phone: makePhone(1000, 3),
        email: 'aarav.singh@example.com',
        company: 'Singh Pharmaceuticals',
        location: { city: 'Delhi', state: 'Delhi', country: 'India' },
        category: 'Dryers',
        product: 'Fluid Bed Dryer',
        requirement_details: '60 kg batch, CIP, ATEX',
        pipeline_stage: 'quoted',
        interest_state: 'interested',
        priority: 'medium',
        quotations: [{
          quotation_id: 'QT-DUMMY-001',
          amount: 500000,
          items: 'FBD 60kg, blower, filters, control panel',
          status: 'pending',
          sentBy: { username: 'sales1', fullName: 'Sales One' },
          sentAt: now
        }],
        active_quotation_amount: 500000,
        activities: [{
          type: 'quotation_sent',
          description: 'Quotation sent: ₹500,000',
          staff: { username: 'sales1', fullName: 'Sales One' },
          createdAt: now
        }]
      },
      {
        customer_name: 'Neha Patel',
        phone: makePhone(1000, 4),
        email: 'neha.patel@example.com',
        company: 'Patel Remedies',
        location: { city: 'Vadodara', state: 'Gujarat', country: 'India' },
        category: 'Reactors',
        product: 'SS316 Reactor',
        requirement_details: '2 KL, limpet coil, mechanical seal',
        pipeline_stage: 'negotiation',
        interest_state: 'interested',
        priority: 'high',
        quotations: [{
          quotation_id: 'QT-DUMMY-002',
          amount: 1200000,
          items: '2KL reactor, accessories, installation',
          status: 'pending',
          sentBy: { username: 'sales2', fullName: 'Sales Two' },
          sentAt: now
        }],
        active_quotation_amount: 1200000,
        activities: [{
          type: 'quotation_sent',
          description: 'Quotation sent: ₹1,200,000',
          staff: { username: 'sales2', fullName: 'Sales Two' },
          createdAt: now
        }]
      },
      {
        customer_name: 'Vikram Desai',
        phone: makePhone(1000, 5),
        email: 'vikram.desai@example.com',
        company: 'Desai Chemicals',
        location: { city: 'Surat', state: 'Gujarat', country: 'India' },
        category: 'Blenders',
        product: 'Ribbon Blender',
        requirement_details: '500 kg, SS304, top cover',
        pipeline_stage: 'lost',
        interest_state: 'not_interested',
        priority: 'low',
        lost_reason: 'Budget constraints',
        activities: [{
          type: 'status_change',
          description: 'Pipeline stage changed from NEGOTIATION to LOST',
          oldValue: 'negotiation',
          newValue: 'lost',
          staff: { username: 'admin', fullName: 'Admin User' },
          createdAt: now
        }]
      }
    ];

    const result = await Lead.insertMany(leads);
    console.log(`✅ Inserted ${result.length} dummy leads.`);

    // Show quick summary
    const counts = await Lead.aggregate([
      { $group: { _id: '$pipeline_stage', count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);
    console.log('\n📊 Leads by Pipeline Stage after seeding:');
    counts.forEach((c) => console.log(`  ${c._id}: ${c.count}`));

    await mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    await mongoose.connection.close();
    process.exit(1);
  }
}

seed();
