/**
 * Simple Webhook Test - Direct POST to webhook endpoint
 * This will help diagnose if the webhook is receiving and processing requests
 */

import axios from 'axios';

const SERVER_URL = 'http://localhost:5174';
const WEBHOOK_URL = `${SERVER_URL}/webhooks/whatsapp`;

console.log('🧪 Simple Webhook Test\n');
console.log('Target URL:', WEBHOOK_URL);
console.log('\n' + '='.repeat(60) + '\n');

// Create a minimal webhook payload for category selection
const webhookData = {
  object: 'whatsapp_business_account',
  entry: [{
    changes: [{
      value: {
        messaging_product: 'whatsapp',
        metadata: {
          phone_number_id: '802882382905359'
        },
        contacts: [{
          profile: {
            name: 'Test User'
          },
          wa_id: '916375591682'
        }],
        messages: [{
          from: '916375591682',
          id: 'wamid.test_' + Date.now(),
          timestamp: Math.floor(Date.now() / 1000).toString(),
          type: 'interactive',
          interactive: {
            type: 'list_reply',
            list_reply: {
              id: 'cat_mixing',
              title: 'Mixing Equipment'
            }
          }
        }]
      }
    }]
  }]
};

console.log('📤 Sending webhook request...');
console.log('Payload:', JSON.stringify(webhookData, null, 2));
console.log('\n' + '='.repeat(60) + '\n');

try {
  const response = await axios.post(WEBHOOK_URL, webhookData, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  
  console.log('✅ Success!');
  console.log('Status:', response.status);
  console.log('Response:', response.data);
  
} catch (error) {
  console.error('❌ Error!');
  console.error('Message:', error.message);
  
  if (error.response) {
    console.error('Status:', error.response.status);
    console.error('Data:', error.response.data);
  }
  
  if (error.code === 'ECONNREFUSED') {
    console.error('\n⚠️  Server is not running! Start it with: node index.js');
  }
}

console.log('\n' + '='.repeat(60));
console.log('📊 Check the server logs to see if webhook was processed');
console.log('='.repeat(60) + '\n');
