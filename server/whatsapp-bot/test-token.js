import 'dotenv/config';
import axios from 'axios';

const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
const ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;
const API_VERSION = process.env.WHATSAPP_API_VERSION || 'v22.0';

console.log('\n🔍 Testing WhatsApp Access Token...\n');
console.log('Phone Number ID:', PHONE_NUMBER_ID);
console.log('Token (first 30 chars):', ACCESS_TOKEN?.substring(0, 30) + '...');
console.log('Token length:', ACCESS_TOKEN?.length);
console.log('API Version:', API_VERSION);
console.log('\n' + '='.repeat(60) + '\n');

async function testToken() {
  try {
    // Test 1: Check if we can access phone number info
    console.log('📞 Test 1: Checking phone number access...');
    const url = `https://graph.facebook.com/${API_VERSION}/${PHONE_NUMBER_ID}`;
    
    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`
      },
      params: {
        fields: 'verified_name,display_phone_number,quality_rating'
      }
    });

    console.log('✅ SUCCESS! Token is valid!\n');
    console.log('Response:', JSON.stringify(response.data, null, 2));
    console.log('\n' + '='.repeat(60));
    console.log('✅ Your token is working correctly!');
    console.log('You can now proceed with testing the bot.');
    console.log('='.repeat(60) + '\n');

  } catch (error) {
    console.log('❌ FAILED! Token is not working.\n');
    
    if (error.response) {
      const errData = error.response.data?.error;
      console.log('Error Code:', errData?.code);
      console.log('Error Message:', errData?.message);
      console.log('Error Type:', errData?.type);
      
      if (errData?.code === 190) {
        console.log('\n' + '='.repeat(60));
        console.log('🔴 ERROR 190: Access Token Invalid or Expired');
        console.log('='.repeat(60));
        console.log('\n📋 SOLUTION:\n');
        console.log('1. Go to: https://developers.facebook.com/apps/');
        console.log('2. Select your app');
        console.log('3. Left sidebar → WhatsApp → API Setup');
        console.log('4. Find "Temporary access token" section');
        console.log('5. Click "Generate token" button');
        console.log('6. Copy the FULL token (200+ characters)');
        console.log('7. Paste it below:\n');
        console.log('   WHATSAPP_ACCESS_TOKEN=<paste_your_token_here>');
        console.log('\n8. Update server/.env file');
        console.log('9. Restart server: npm start');
        console.log('\n' + '='.repeat(60) + '\n');
      } else if (errData?.code === 100) {
        console.log('\n🔴 ERROR: Invalid Phone Number ID');
        console.log('Your WHATSAPP_PHONE_NUMBER_ID is incorrect.');
        console.log('Check the Phone Number ID in Meta Developer Dashboard.\n');
      }
    } else {
      console.log('Error:', error.message);
    }
  }
}

testToken();
