import 'dotenv/config';
import axios from 'axios';

/**
 * Check WhatsApp Business API Account Status
 * This will show you:
 * - Account tier (test/production)
 * - Messaging limits
 * - Quality rating
 * - Business verification status
 */

const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
const ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;
const API_VERSION = process.env.WHATSAPP_API_VERSION || 'v22.0';

async function checkAccountStatus() {
  try {
    console.log('🔍 Checking WhatsApp Business API Account Status...\n');

    // Get phone number info
    const phoneInfoUrl = `https://graph.facebook.com/${API_VERSION}/${PHONE_NUMBER_ID}`;
    
    const response = await axios.get(phoneInfoUrl, {
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`
      },
      params: {
        fields: 'verified_name,code_verification_status,display_phone_number,quality_rating,messaging_limit_tier,account_mode,is_official_business_account'
      }
    });

    const data = response.data;

    console.log('═══════════════════════════════════════════════════════');
    console.log('         📱 WHATSAPP BUSINESS API STATUS');
    console.log('═══════════════════════════════════════════════════════\n');

    console.log('📞 Phone Number Information:');
    console.log(`   Display Name: ${data.verified_name || 'Not set'}`);
    console.log(`   Phone Number: ${data.display_phone_number || 'Not available'}`);
    console.log(`   Phone ID: ${PHONE_NUMBER_ID}\n`);

    console.log('🏢 Account Status:');
    console.log(`   Verification: ${data.code_verification_status || 'VERIFIED'}`);
    console.log(`   Official Business: ${data.is_official_business_account ? 'Yes ✅' : 'No ❌'}`);
    console.log(`   Quality Rating: ${data.quality_rating || 'UNKNOWN'}`);
    
    // Check messaging tier
    const tier = data.messaging_limit_tier || 'TIER_NOT_SET';
    console.log(`   Messaging Tier: ${tier}\n`);

    console.log('📊 Messaging Limits:');
    if (tier === 'TIER_NOT_SET' || tier === 'NOT_SET') {
      console.log('   🔴 TEST MODE - Limited to registered test numbers only');
      console.log('   📱 Can send to: 5-10 phone numbers (must be added in dashboard)');
      console.log('   ⚠️  Cannot send to customer phone numbers yet!\n');
      
      console.log('   💡 TO FIX:');
      console.log('   1. Add test numbers at: https://developers.facebook.com/');
      console.log('   2. OR request production access to send to any number\n');
      
    } else if (tier === 'TIER_50') {
      console.log('   🟡 LIMITED ACCESS - 50 unique customers/24 hours');
    } else if (tier === 'TIER_250') {
      console.log('   🟡 LIMITED ACCESS - 250 unique customers/24 hours');
    } else if (tier === 'TIER_1K') {
      console.log('   🟢 TIER 1 - 1,000 unique customers/24 hours');
    } else if (tier === 'TIER_10K') {
      console.log('   🟢 TIER 2 - 10,000 unique customers/24 hours');
    } else if (tier === 'TIER_100K') {
      console.log('   🟢 TIER 3 - 100,000 unique customers/24 hours');
    } else if (tier === 'TIER_UNLIMITED') {
      console.log('   🟢 TIER 4 - UNLIMITED customers/24 hours');
    }

    console.log('\n📋 Quality Rating Explanation:');
    const quality = data.quality_rating || 'UNKNOWN';
    if (quality === 'GREEN') {
      console.log('   🟢 GREEN - Excellent quality, high limits');
    } else if (quality === 'YELLOW') {
      console.log('   🟡 YELLOW - Medium quality, moderate limits');
    } else if (quality === 'RED') {
      console.log('   🔴 RED - Poor quality, low limits or restricted');
    } else {
      console.log('   ⚪ UNKNOWN - New account or not yet rated');
    }

    console.log('\n═══════════════════════════════════════════════════════');
    
    // Recommendations
    console.log('\n🎯 RECOMMENDATIONS:\n');
    
    if (tier === 'TIER_NOT_SET' || tier === 'NOT_SET') {
      console.log('   ⚠️  Your account is in TEST MODE');
      console.log('\n   📝 TO GO LIVE:');
      console.log('   1. Go to https://business.facebook.com/');
      console.log('   2. Complete business verification');
      console.log('   3. Fill out WhatsApp business profile');
      console.log('   4. Create & approve message templates');
      console.log('   5. Request production access');
      console.log('\n   📖 See: whatsapp-bot/PRODUCTION_APPROVAL_GUIDE.md');
    } else {
      console.log('   ✅ Your account has production access!');
      console.log('   📈 Keep quality rating high to increase limits');
      console.log('   🎯 Current tier will auto-upgrade with good usage');
    }

    console.log('\n═══════════════════════════════════════════════════════\n');

  } catch (error) {
    console.error('\n❌ Error checking account status:\n');
    
    if (error.response) {
      const errData = error.response.data?.error;
      console.error(`   Error: ${errData?.message || 'Unknown error'}`);
      console.error(`   Code: ${errData?.code || error.response.status}`);
      
      if (errData?.code === 190) {
        console.error('\n   🔑 ACCESS TOKEN EXPIRED!');
        console.error('   → Go to https://developers.facebook.com/');
        console.error('   → Generate new token');
        console.error('   → Update .env file');
      } else if (errData?.code === 100) {
        console.error('\n   ⚠️  Invalid Phone Number ID');
        console.error('   → Check WHATSAPP_PHONE_NUMBER_ID in .env');
      }
    } else {
      console.error(`   ${error.message}`);
    }
    
    console.log('\n   📋 Current Configuration:');
    console.log(`   Phone ID: ${PHONE_NUMBER_ID}`);
    console.log(`   Token: ${ACCESS_TOKEN ? ACCESS_TOKEN.substring(0, 20) + '...' : 'NOT SET'}`);
    console.log(`   API Version: ${API_VERSION}`);
  }
}

// Run the check
checkAccountStatus();
