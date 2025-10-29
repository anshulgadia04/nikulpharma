import whatsappService from './services/whatsappService.js';

/**
 * Test script for WhatsApp Service
 * Run this to verify WhatsApp API integration
 */

const TEST_PHONE = '916375591682'; // Your test number

async function testWhatsAppService() {
  console.log('🧪 Testing WhatsApp Service...\n');

  try {
    // Test 1: Send simple text message
    console.log('📝 Test 1: Sending text message...');
    const textResponse = await whatsappService.sendTextMessage(
      TEST_PHONE,
      '🏭 Hello from Nikul Pharma! This is a test message from our WhatsApp bot. 🤖'
    );
    console.log('Response:', textResponse);
    console.log('✅ Text message test passed!\n');

    // Wait 2 seconds between messages
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Test 2: Send interactive buttons
    console.log('📝 Test 2: Sending interactive buttons...');
    const buttonsResponse = await whatsappService.sendInteractiveButtons(
      TEST_PHONE,
      'Welcome to Nikul Pharma! How can we assist you today?',
      [
        { id: 'browse_products', title: '🏭 Browse Products' },
        { id: 'get_quote', title: '💰 Get Quote' },
        { id: 'contact_us', title: '📞 Contact Us' }
      ],
      'Nikul Pharma',
      'Reply with your choice'
    );
    console.log('Response:', buttonsResponse);
    console.log('✅ Interactive buttons test passed!\n');

    // Wait 2 seconds
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Test 3: Send template message (hello_world)
    console.log('📝 Test 3: Sending template message...');
    const templateResponse = await whatsappService.sendTemplateMessage(
      TEST_PHONE,
      'hello_world',
      'en_US'
    );
    console.log('Response:', templateResponse);
    console.log('✅ Template message test passed!\n');

    console.log('🎉 All tests passed successfully!');
    console.log('\n✅ WhatsApp Service is working correctly!');
    console.log('📱 Check your WhatsApp at', TEST_PHONE);

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('\nFull error:', error);
    process.exit(1);
  }
}

// Run tests
testWhatsAppService();
