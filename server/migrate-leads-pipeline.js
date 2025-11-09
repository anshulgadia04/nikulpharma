import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Lead, Counter } from './models/Leads.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017';
const DB_NAME = process.env.MONGO_DB || 'nikul_pharma';

async function generateLeadId() {
  const counter = await Counter.findByIdAndUpdate(
    { _id: 'leadId' },
    { $inc: { sequence_value: 1 } },
    { new: true, upsert: true }
  );
  
  const year = new Date().getFullYear();
  const sequenceNumber = String(counter.sequence_value).padStart(4, '0');
  return `NIKUL-${year}-${sequenceNumber}`;
}

async function migrateLeads() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI, {
      dbName: DB_NAME,
      serverSelectionTimeoutMS: 5000
    });
    console.log('✅ Connected to MongoDB');

    // Find all leads without pipeline_stage or leadId
    const leadsToUpdate = await Lead.find({
      $or: [
        { pipeline_stage: { $exists: false } },
        { leadId: { $exists: false } }
      ]
    });

    console.log(`Found ${leadsToUpdate.length} leads to migrate`);

    for (const lead of leadsToUpdate) {
      console.log(`\nMigrating lead: ${lead.customer_name} (${lead._id})`);

      // Generate leadId if doesn't exist
      if (!lead.leadId) {
        lead.leadId = await generateLeadId();
        console.log(`  - Generated leadId: ${lead.leadId}`);
      }

      // Set pipeline_stage based on state field
      if (!lead.pipeline_stage) {
        if (lead.state === 'interested' || lead.interest_state === 'interested') {
          lead.pipeline_stage = 'new';
        } else if (lead.state === 'not_interested' || lead.interest_state === 'not_interested') {
          lead.pipeline_stage = 'lost';
        } else {
          lead.pipeline_stage = 'new'; // Default
        }
        console.log(`  - Set pipeline_stage: ${lead.pipeline_stage}`);
      }

      // Set interest_state from old state field if exists
      if (lead.state && !lead.interest_state) {
        lead.interest_state = lead.state;
        console.log(`  - Set interest_state: ${lead.interest_state}`);
      }

      // Initialize activities array if doesn't exist
      if (!lead.activities || lead.activities.length === 0) {
        lead.activities = [{
          type: 'comment',
          description: 'Lead created from WhatsApp',
          comment: 'Initial lead from WhatsApp bot conversation',
          createdAt: lead.createdAt || new Date()
        }];
        console.log(`  - Added initial activity`);
      }

      // Initialize quotations array if doesn't exist
      if (!lead.quotations) {
        lead.quotations = [];
      }

      // Set priority if not exists
      if (!lead.priority) {
        lead.priority = lead.state === 'interested' ? 'medium' : 'low';
        console.log(`  - Set priority: ${lead.priority}`);
      }

      // Save the lead (this will trigger pre-save hook to generate leadId if needed)
      await lead.save();
      console.log(`  ✅ Migrated successfully - Lead ID: ${lead.leadId}`);
    }

    console.log(`\n✅ Migration complete! Updated ${leadsToUpdate.length} leads`);

    // Show summary
    const summary = await Lead.aggregate([
      {
        $group: {
          _id: '$pipeline_stage',
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    console.log('\n📊 Leads by Pipeline Stage:');
    summary.forEach(item => {
      console.log(`   ${item._id}: ${item.count}`);
    });

    mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    mongoose.connection.close();
    process.exit(1);
  }
}

migrateLeads();
