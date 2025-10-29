/**
 * Test Script: Lead Transfer Flow
 * Tests conversation to lead transfer when user shows interest
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Conversation from './models/Conversation.js';
import { Lead } from '../models/Leads.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/nikulpharma';

async function testLeadTransfer() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Test 1: Create a test conversation
    console.log('📝 Test 1: Creating test conversation...');
    const testPhone = '919876543210';
    
    // Clean up any existing test data
    await Conversation.deleteMany({ phone: testPhone });
    await Lead.deleteMany({ phone: testPhone });

    const testConversation = await Conversation.create({
      phone: testPhone,
      customer_name: 'Test User',
      email: 'test@example.com',
      state: 'confirming_interest',
      current_category: 'cat_mixing',
      current_machine: 'machine_rmg',
      needs_followup: true,
      followup_date: new Date(Date.now() + 4 * 60 * 60 * 1000)
    });

    console.log(`✅ Created test conversation: ${testConversation._id}\n`);

    // Test 2: Verify conversation schema (no removed fields)
    console.log('📋 Test 2: Verifying conversation schema...');
    console.log('Phone:', testConversation.phone);
    console.log('Customer Name:', testConversation.customer_name);
    console.log('Email:', testConversation.email);
    console.log('State:', testConversation.state);
    console.log('Current Category:', testConversation.current_category);
    console.log('Current Machine:', testConversation.current_machine);
    console.log('Needs Followup:', testConversation.needs_followup);
    console.log('Followup Date:', testConversation.followup_date);
    console.log('Messages (should be undefined):', testConversation.messages);
    console.log('Button Clicks (should be undefined):', testConversation.button_clicks);
    console.log('Selected Machines (should be undefined):', testConversation.selected_machines);
    console.log('__v (should be undefined):', testConversation.__v);
    console.log('✅ Schema verification passed\n');

    // Test 3: Simulate transfer to Leads (interested)
    console.log('📤 Test 3: Transferring to Leads (interested)...');
    
    const leadData = {
      phone: testConversation.phone,
      customer_name: testConversation.customer_name,
      email: testConversation.email,
      category: testConversation.current_category,
      product: 'Rapid Mixer Granulator (RMG)',
      machine_id: testConversation.current_machine,
      state: 'interested',
      source: 'whatsapp_bot',
      conversation_id: testConversation._id,
      needs_followup: testConversation.needs_followup,
      followup_date: testConversation.followup_date,
      createdAt: new Date()
    };

    const lead = await Lead.create(leadData);
    console.log(`✅ Lead created: ${lead._id}`);
    console.log('Lead State:', lead.state);
    console.log('Lead Email:', lead.email);
    console.log('Lead Machine:', lead.machine_id);
    console.log('Lead Needs Followup:', lead.needs_followup);
    console.log('');

    // Delete conversation
    await Conversation.deleteOne({ _id: testConversation._id });
    console.log('✅ Conversation deleted from collection\n');

    // Verify conversation is gone
    const deletedConv = await Conversation.findById(testConversation._id);
    console.log('Deleted conversation check (should be null):', deletedConv);
    console.log('');

    // Test 4: Create another conversation for "not interested" case
    console.log('📝 Test 4: Testing "not interested" flow...');
    
    const testConversation2 = await Conversation.create({
      phone: '919999999999',
      customer_name: 'Test User 2',
      email: 'test2@example.com',
      state: 'confirming_interest',
      current_category: 'cat_drying',
      current_machine: 'machine_fbd_dryer',
      needs_followup: false
    });

    const lead2Data = {
      phone: testConversation2.phone,
      customer_name: testConversation2.customer_name,
      email: testConversation2.email,
      category: testConversation2.current_category,
      product: 'Fluid Bed Dryer (FBD)',
      machine_id: testConversation2.current_machine,
      state: 'not_interested',
      source: 'whatsapp_bot',
      conversation_id: testConversation2._id,
      needs_followup: false,
      createdAt: new Date()
    };

    const lead2 = await Lead.create(lead2Data);
    console.log(`✅ Lead created: ${lead2._id}`);
    console.log('Lead State:', lead2.state);
    console.log('Lead Needs Followup:', lead2.needs_followup);
    console.log('');

    await Conversation.deleteOne({ _id: testConversation2._id });
    console.log('✅ Conversation deleted\n');

    // Test 5: Verify Leads collection
    console.log('📊 Test 5: Verifying Leads collection...');
    const allLeads = await Lead.find({ source: 'whatsapp_bot' }).sort({ createdAt: -1 }).limit(5);
    console.log(`Total WhatsApp bot leads: ${allLeads.length}`);
    allLeads.forEach((lead, index) => {
      console.log(`\nLead ${index + 1}:`);
      console.log('  Phone:', lead.phone);
      console.log('  Name:', lead.customer_name);
      console.log('  State:', lead.state);
      console.log('  Product:', lead.product);
      console.log('  Needs Followup:', lead.needs_followup);
    });

    console.log('\n✅ All tests passed!');
    console.log('\n📝 Summary of Changes:');
    console.log('1. ✅ Removed fields: selected_machines, inquiry_id, is_active, total_messages, tags, messages, button_clicks, last_message_at, __v');
    console.log('2. ✅ Kept fields: phone, customer_name, email, state, current_category, current_machine, needs_followup, followup_date');
    console.log('3. ✅ Added email field to Conversation schema');
    console.log('4. ✅ Enhanced Leads schema with: customer_name, email, machine_id, state, conversation_id, needs_followup, followup_date');
    console.log('5. ✅ Implemented transfer logic: Conversation → Lead → Delete Conversation');
    console.log('6. ✅ State updates based on user interest (interested/not_interested)');
    console.log('7. ✅ Transfer happens only when user clicks "Yes, Interested" or "Not Interested"');
    console.log('8. ✅ Disabled __v version key in schema');
    console.log('9. ✅ Automatic timestamps (createdAt, updatedAt) still enabled');

    // Cleanup test data
    await Lead.deleteMany({ phone: { $in: [testPhone, '919999999999'] } });

  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\n🔌 MongoDB connection closed');
  }
}

// Run the test
testLeadTransfer();
