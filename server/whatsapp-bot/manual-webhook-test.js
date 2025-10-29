import 'dotenv/config';
import readline from 'readline';
import axios from 'axios';

/**
 * Interactive Manual Webhook Tester
 * Allows you to manually trigger each step of the conversation
 * Simulates what WhatsApp would send when customer clicks buttons
 */

const SERVER_URL = 'http://localhost:5174';
const WEBHOOK_URL = `${SERVER_URL}/webhooks/whatsapp`;
const TEST_PHONE = '916375591682';
const TEST_NAME = 'Anshul Gadia';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function sendWebhook(webhookData) {
  try {
    const response = await axios.post(WEBHOOK_URL, webhookData);
    return { success: true, status: response.status };
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.code === 'ECONNREFUSED') {
      console.error('⚠️  Server is not running! Start it with: node index.js');
    }
    return { success: false, error: error.message };
  }
}

function createWebhookData(messageType, payload) {
  return {
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
              name: TEST_NAME
            },
            wa_id: TEST_PHONE
          }],
          messages: [{
            from: TEST_PHONE,
            id: 'wamid.test_' + Date.now(),
            timestamp: Math.floor(Date.now() / 1000).toString(),
            type: messageType,
            ...payload
          }]
        },
        field: 'messages'
      }]
    }]
  };
}

async function main() {
  console.clear();
  console.log('╔════════════════════════════════════════════════════════════════╗');
  console.log('║                                                                ║');
  console.log('║          🤖 Interactive WhatsApp Webhook Tester                ║');
  console.log('║                                                                ║');
  console.log('╚════════════════════════════════════════════════════════════════╝\n');

  console.log('This tool simulates what WhatsApp sends when customer clicks buttons.\n');
  console.log('📱 Phone: ' + TEST_PHONE);
  console.log('🌐 Server: ' + SERVER_URL);
  console.log('🔗 Webhook: ' + WEBHOOK_URL);
  console.log('\n' + '='.repeat(60) + '\n');

  // Check if server is running
  try {
    await axios.get(`${SERVER_URL}/health`);
    console.log('✅ Server is running!\n');
  } catch (error) {
    console.log('❌ Server is NOT running!');
    console.log('⚠️  Please start the server first: node index.js\n');
    rl.close();
    return;
  }

  let continueLoop = true;

  while (continueLoop) {
    console.log('\n' + '='.repeat(60));
    console.log('📋 MENU - Choose an action:\n');
    console.log('1. Simulate Category Selection');
    console.log('2. Simulate Machine Selection');
    console.log('3. Simulate "Yes, Interested" Button');
    console.log('4. Simulate "No, Not Now" Button');
    console.log('5. Simulate "More Info" Button');
    console.log('6. Simulate Text Message');
    console.log('7. View Available Categories');
    console.log('8. View Available Machines');
    console.log('0. Exit');
    console.log('='.repeat(60));

    const choice = await question('\n👉 Enter your choice (0-8): ');

    switch (choice.trim()) {
      case '1': {
        console.log('\n📋 Available Categories:\n');
        console.log('1. cat_mixing          - Mixing Equipment');
        console.log('2. cat_granulation     - Granulation Systems');
        console.log('3. cat_milling         - Milling Equipment');
        console.log('4. cat_drying          - Drying Systems');
        console.log('5. cat_reactors        - Reactors');
        console.log('6. cat_centrifuge      - Centrifuges');
        console.log('7. cat_sifter          - Sifters & Screens\n');

        const catChoice = await question('👉 Enter category ID (e.g., cat_mixing): ');
        const categoryId = catChoice.trim();

        console.log(`\n🔄 Sending webhook for category: ${categoryId}...`);

        const webhookData = createWebhookData('interactive', {
          interactive: {
            type: 'list_reply',
            list_reply: {
              id: categoryId,
              title: 'Selected Category'
            }
          }
        });

        const result = await sendWebhook(webhookData);
        if (result.success) {
          console.log('✅ Webhook sent successfully!');
          console.log('📱 Check your WhatsApp - you should receive machines list');
        }
        break;
      }

      case '2': {
        console.log('\n⚙️ Available Machines:\n');
        console.log('Mixing Equipment:');
        console.log('  - machine_planetary_mixer');
        console.log('  - machine_ribbon_blender');
        console.log('  - machine_v_blender');
        console.log('  - machine_double_cone\n');
        console.log('Granulation:');
        console.log('  - machine_rmg');
        console.log('  - machine_fbd');
        console.log('  - machine_granulation_line\n');
        console.log('(... and more, see messageTemplates.js for full list)\n');

        const machChoice = await question('👉 Enter machine ID (e.g., machine_planetary_mixer): ');
        const machineId = machChoice.trim();

        console.log(`\n🔄 Sending webhook for machine: ${machineId}...`);

        const webhookData = createWebhookData('interactive', {
          interactive: {
            type: 'list_reply',
            list_reply: {
              id: machineId,
              title: 'Selected Machine'
            }
          }
        });

        const result = await sendWebhook(webhookData);
        if (result.success) {
          console.log('✅ Webhook sent successfully!');
          console.log('📱 Check your WhatsApp - you should receive purchase interest buttons');
        }
        break;
      }

      case '3': {
        console.log('\n💚 Sending "Yes, Interested" button click...');

        const webhookData = createWebhookData('interactive', {
          interactive: {
            type: 'button_reply',
            button_reply: {
              id: 'interest_yes',
              title: '✅ Yes, Interested'
            }
          }
        });

        const result = await sendWebhook(webhookData);
        if (result.success) {
          console.log('✅ Webhook sent successfully!');
          console.log('📱 Check your WhatsApp - you should receive confirmation + thank you');
        }
        break;
      }

      case '4': {
        console.log('\n❌ Sending "No, Not Now" button click...');

        const webhookData = createWebhookData('interactive', {
          interactive: {
            type: 'button_reply',
            button_reply: {
              id: 'interest_no',
              title: '❌ Not Now'
            }
          }
        });

        const result = await sendWebhook(webhookData);
        if (result.success) {
          console.log('✅ Webhook sent successfully!');
          console.log('📱 Check your WhatsApp - you should receive response');
        }
        break;
      }

      case '5': {
        console.log('\nℹ️ Sending "More Info" button click...');

        const webhookData = createWebhookData('interactive', {
          interactive: {
            type: 'button_reply',
            button_reply: {
              id: 'interest_info',
              title: 'ℹ️ More Info'
            }
          }
        });

        const result = await sendWebhook(webhookData);
        if (result.success) {
          console.log('✅ Webhook sent successfully!');
          console.log('📱 Check your WhatsApp - you should receive more information');
        }
        break;
      }

      case '6': {
        const text = await question('\n👉 Enter text message: ');

        console.log(`\n🔄 Sending text message: "${text}"...`);

        const webhookData = createWebhookData('text', {
          text: {
            body: text
          }
        });

        const result = await sendWebhook(webhookData);
        if (result.success) {
          console.log('✅ Webhook sent successfully!');
          console.log('📱 Check your WhatsApp for response');
        }
        break;
      }

      case '7': {
        console.log('\n📋 All Available Categories:\n');
        console.log('ID                  | Name');
        console.log('-'.repeat(50));
        console.log('cat_mixing          | Mixing Equipment');
        console.log('cat_granulation     | Granulation Systems');
        console.log('cat_milling         | Milling Equipment');
        console.log('cat_drying          | Drying Systems');
        console.log('cat_reactors        | Reactors');
        console.log('cat_centrifuge      | Centrifuges');
        console.log('cat_sifter          | Sifters & Screens');
        break;
      }

      case '8': {
        console.log('\n⚙️ All Available Machines:\n');
        console.log('Mixing Equipment:');
        console.log('  - machine_planetary_mixer      | Planetary Mixer');
        console.log('  - machine_ribbon_blender       | Ribbon Blender');
        console.log('  - machine_v_blender            | V Blender');
        console.log('  - machine_double_cone          | Double Cone Blender\n');
        console.log('Granulation:');
        console.log('  - machine_rmg                  | Rapid Mixer Granulator');
        console.log('  - machine_fbd                  | Fluid Bed Dryer');
        console.log('  - machine_granulation_line     | Complete Granulation Line\n');
        console.log('Milling:');
        console.log('  - machine_multi_mill           | Multi Mill');
        console.log('  - machine_hammer_mill          | Hammer Mill\n');
        console.log('Drying:');
        console.log('  - machine_fbd_dryer            | Fluid Bed Dryer');
        console.log('  - machine_tray_dryer           | Tray Dryer');
        console.log('  - machine_vacuum_dryer         | Vacuum Dryer');
        console.log('  - machine_rcvd                 | Rotary Cone Vacuum Dryer\n');
        console.log('Reactors:');
        console.log('  - machine_reactor              | Chemical Reactor');
        console.log('  - machine_pressure_vessel      | Pressure Vessel\n');
        console.log('Centrifuges:');
        console.log('  - machine_centrifuge           | Centrifuge');
        console.log('  - machine_basket_centrifuge    | Basket Centrifuge\n');
        console.log('Sifters:');
        console.log('  - machine_vibro_sifter         | Vibro Sifter');
        console.log('  - machine_octagonal_sifter     | Octagonal Sifter');
        break;
      }

      case '0': {
        console.log('\n👋 Exiting... Goodbye!\n');
        continueLoop = false;
        break;
      }

      default: {
        console.log('\n❌ Invalid choice. Please enter 0-8.');
      }
    }
  }

  rl.close();
}

main();
