import 'dotenv/config';
import botLogic from './services/botLogic.js';
import mongoose from 'mongoose';

/**
 * Test Interactive Bot Flow
 * Tests the complete conversation flow:
 * 1. Send category menu
 * 2. Simulate category selection
 * 3. Show machines
 * 4. Simulate machine selection  
 * 5. Ask purchase interest
 * 6. Send thank you
 */

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = process.env.MONGODB_DB || 'nikul_pharma';

const TEST_PHONE = '916375591682';
const TEST_NAME = 'Anshul Gadia';

async function testBotFlow() {
  try {
    console.log('🤖 Testing Interactive Bot Flow\n');
    console.log('='.repeat(60));

    // Connect to MongoDB
    console.log('\n🔌 Connecting to MongoDB...');
    await mongoose.connect(mongoUri, { dbName: dbName });
    console.log('✅ MongoDB connected\n');

    // Step 1: Start conversation and send category menu
    console.log('📋 Step 1: Starting conversation and sending category menu...\n');
    const startResult = await botLogic.startConversation(
      TEST_PHONE,
      TEST_NAME,
      null
    );

    if (!startResult.success) {
      throw new Error('Failed to start conversation');
    }

    console.log('✅ Category menu sent!');
    console.log('📱 Check WhatsApp - You should see category list\n');
    console.log('='.repeat(60));

    // Wait for user interaction simulation
    console.log('\n⏳ Waiting 5 seconds before simulating category selection...\n');
    await new Promise(resolve => setTimeout(resolve, 5000));

    // Step 2: Simulate category selection (Mixing Equipment)
    console.log('🏭 Step 2: Simulating category selection - "Mixing Equipment"...\n');
    const categoryResult = await botLogic.handleCategorySelection(
      TEST_PHONE,
      'cat_mixing'
    );

    if (!categoryResult.success) {
      throw new Error('Failed to handle category selection');
    }

    console.log('✅ Mixing machines list sent!');
    console.log('📱 Check WhatsApp - You should see mixing machines\n');
    console.log('='.repeat(60));

    // Wait
    console.log('\n⏳ Waiting 5 seconds before simulating machine selection...\n');
    await new Promise(resolve => setTimeout(resolve, 5000));

    // Step 3: Simulate machine selection (Planetary Mixer)
    console.log('⚙️ Step 3: Simulating machine selection - "Planetary Mixer"...\n');
    const machineResult = await botLogic.handleMachineSelection(
      TEST_PHONE,
      'machine_planetary_mixer'
    );

    if (!machineResult.success) {
      throw new Error('Failed to handle machine selection');
    }

    console.log('✅ Purchase interest confirmation sent!');
    console.log('📱 Check WhatsApp - You should see Yes/No buttons\n');
    console.log('='.repeat(60));

    // Wait
    console.log('\n⏳ Waiting 5 seconds before simulating "Yes" response...\n');
    await new Promise(resolve => setTimeout(resolve, 5000));

    // Step 4: Simulate YES response
    console.log('💚 Step 4: Simulating "Yes, Interested" response...\n');
    const interestResult = await botLogic.handlePurchaseInterest(
      TEST_PHONE,
      'interest_yes'
    );

    if (!interestResult.success) {
      throw new Error('Failed to handle purchase interest');
    }

    console.log('✅ Interest confirmation sent!');
    console.log('📱 Check WhatsApp - You should see confirmation message\n');
    console.log('='.repeat(60));

    // Wait
    console.log('\n⏳ Waiting 3 seconds before sending thank you...\n');
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Step 5: Send thank you
    console.log('🙏 Step 5: Sending thank you message...\n');
    const thankYouResult = await botLogic.sendThankYou(TEST_PHONE);

    if (!thankYouResult.success) {
      throw new Error('Failed to send thank you');
    }

    console.log('✅ Thank you message sent!');
    console.log('📱 Check WhatsApp - You should see thank you message\n');
    console.log('='.repeat(60));

    // Summary
    console.log('\n🎉 SUCCESS! Complete bot flow tested!\n');
    console.log('📊 Summary:');
    console.log('1. ✅ Category menu sent');
    console.log('2. ✅ Category selected → Machines list sent');
    console.log('3. ✅ Machine selected → Purchase interest asked');
    console.log('4. ✅ Interest confirmed → Confirmation sent');
    console.log('5. ✅ Thank you message sent\n');

    console.log('📱 Check your WhatsApp at', TEST_PHONE);
    console.log('You should have received 5 messages showing the complete flow!\n');
    console.log('='.repeat(60) + '\n');

  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    console.error('Full error:', error);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 MongoDB connection closed\n');
  }
}

// Run the test
console.log('\n🧪 Testing Complete Interactive Bot Flow\n');
testBotFlow();
