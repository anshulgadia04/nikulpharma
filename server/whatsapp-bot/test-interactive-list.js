/**
 * Test Interactive List Sending
 */

import whatsappService from './services/whatsappService.js';

async function testInteractiveList() {
  try {
    console.log('🧪 Testing Interactive List...\n');

    const sections = [
      {
        title: 'Test Section',
        rows: [
          {
            id: 'test_option_1',
            title: 'Option 1',
            description: 'First test option'
          },
          {
            id: 'test_option_2',
            title: 'Option 2',
            description: 'Second test option'
          }
        ]
      }
    ];

    console.log('📤 Sending interactive list to 916375591682...');
    
    const response = await whatsappService.sendInteractiveList(
      '916375591682',
      'Please select an option from the list below:',
      'View Options',
      sections,
      '📋 Test Menu',
      'This is a test message'
    );

    console.log('\n✅ Interactive list sent successfully!');
    console.log('Response:', JSON.stringify(response, null, 2));

  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    console.error('Stack:', error.stack);
  }
}

testInteractiveList();
