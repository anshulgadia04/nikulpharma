import 'dotenv/config';
import axios from 'axios';

/**
 * Test Webhook Handler Locally
 * Simulates WhatsApp sending webhook messages to your server
 */

const SERVER_URL = 'http://localhost:5174';
const WEBHOOK_URL = `${SERVER_URL}/webhooks/whatsapp`;

async function testWebhook() {
  try {
    console.log('🧪 Testing WhatsApp Webhook Handler\n');
    console.log('='.repeat(60));

    // Test 1: Category Selection
    console.log('\n📋 Test 1: Simulating category selection (Mixing Equipment)...\n');

    const categoryWebhook = {
      object: 'whatsapp_business_account',
      entry: [{
        id: 'WHATSAPP_BUSINESS_ACCOUNT_ID',
        changes: [{
          value: {
            messaging_product: 'whatsapp',
            metadata: {
              display_phone_number: '15551842835',
              phone_number_id: '802882382905359'
            },
            contacts: [{
              profile: {
                name: 'Anshul Gadia'
              },
              wa_id: '916375591682'
            }],
            messages: [{
              from: '916375591682',
              id: 'wamid.test_category_' + Date.now(),
              timestamp: Math.floor(Date.now() / 1000).toString(),
              type: 'interactive',
              interactive: {
                type: 'list_reply',
                list_reply: {
                  id: 'cat_mixing',
                  title: 'Mixing Equipment',
                  description: 'Blenders, Mixers & More'
                }
              }
            }]
          },
          field: 'messages'
        }]
      }]
    };

    const response1 = await axios.post(WEBHOOK_URL, categoryWebhook);
    console.log('✅ Category selection webhook sent');
    console.log('Response:', response1.status, response1.statusText);
    console.log('📱 Check WhatsApp - You should receive machines list\n');

    // Wait 5 seconds
    console.log('⏳ Waiting 5 seconds before next test...\n');
    await new Promise(resolve => setTimeout(resolve, 5000));

    // Test 2: Machine Selection
    console.log('⚙️ Test 2: Simulating machine selection (Planetary Mixer)...\n');

    const machineWebhook = {
      object: 'whatsapp_business_account',
      entry: [{
        id: 'WHATSAPP_BUSINESS_ACCOUNT_ID',
        changes: [{
          value: {
            messaging_product: 'whatsapp',
            metadata: {
              display_phone_number: '15551842835',
              phone_number_id: '802882382905359'
            },
            contacts: [{
              profile: {
                name: 'Anshul Gadia'
              },
              wa_id: '916375591682'
            }],
            messages: [{
              from: '916375591682',
              id: 'wamid.test_machine_' + Date.now(),
              timestamp: Math.floor(Date.now() / 1000).toString(),
              type: 'interactive',
              interactive: {
                type: 'list_reply',
                list_reply: {
                  id: 'machine_planetary_mixer',
                  title: 'Planetary Mixer',
                  description: 'High-speed mixing'
                }
              }
            }]
          },
          field: 'messages'
        }]
      }]
    };

    const response2 = await axios.post(WEBHOOK_URL, machineWebhook);
    console.log('✅ Machine selection webhook sent');
    console.log('Response:', response2.status, response2.statusText);
    console.log('📱 Check WhatsApp - You should receive purchase interest buttons\n');

    // Wait 5 seconds
    console.log('⏳ Waiting 5 seconds before next test...\n');
    await new Promise(resolve => setTimeout(resolve, 5000));

    // Test 3: Button Click (Yes, Interested)
    console.log('💚 Test 3: Simulating "Yes, Interested" button click...\n');

    const buttonWebhook = {
      object: 'whatsapp_business_account',
      entry: [{
        id: 'WHATSAPP_BUSINESS_ACCOUNT_ID',
        changes: [{
          value: {
            messaging_product: 'whatsapp',
            metadata: {
              display_phone_number: '15551842835',
              phone_number_id: '802882382905359'
            },
            contacts: [{
              profile: {
                name: 'Anshul Gadia'
              },
              wa_id: '916375591682'
            }],
            messages: [{
              from: '916375591682',
              id: 'wamid.test_button_' + Date.now(),
              timestamp: Math.floor(Date.now() / 1000).toString(),
              type: 'interactive',
              interactive: {
                type: 'button_reply',
                button_reply: {
                  id: 'interest_yes',
                  title: '✅ Yes, Interested'
                }
              }
            }]
          },
          field: 'messages'
        }]
      }]
    };

    const response3 = await axios.post(WEBHOOK_URL, buttonWebhook);
    console.log('✅ Button click webhook sent');
    console.log('Response:', response3.status, response3.statusText);
    console.log('📱 Check WhatsApp - You should receive confirmation + thank you\n');

    console.log('='.repeat(60));
    console.log('\n🎉 All webhook tests completed!\n');
    console.log('📊 Summary:');
    console.log('1. ✅ Category selected → Machines sent');
    console.log('2. ✅ Machine selected → Purchase interest sent');
    console.log('3. ✅ "Yes" clicked → Confirmation + Thank you sent\n');
    console.log('📱 Check your WhatsApp at 916375591682\n');

  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
    
    console.error('\n💡 Make sure your server is running:');
    console.error('   npm start (or node index.js)\n');
  }
}

// Run tests
console.log('\n🧪 Testing Webhook Handler with Simulated WhatsApp Messages\n');
console.log('📌 Make sure your server is running on port 5174\n');
testWebhook();
