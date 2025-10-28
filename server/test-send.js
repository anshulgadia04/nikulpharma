import 'dotenv/config';
import { startBotConversation } from './utils/whatsappBot.js';
import { normalizePhone } from './utils/phone.js';

const phoneArg = process.argv[2];
if (!phoneArg) {
  console.error('Usage: node test-send.js <recipient-phone>');
  console.error('Example: node test-send.js 919876543210  (country code + number, no leading +)');
  process.exit(1);
}

const normalized = normalizePhone(phoneArg);
if (!normalized) {
  console.error('Phone number could not be normalized:', phoneArg);
  process.exit(1);
}

(async () => {
  try {
    console.log('Invoking startBotConversation for', normalized);
    await startBotConversation(normalized);
    console.log('Done - startBotConversation returned (check server logs for send details)');
    process.exit(0);
  } catch (err) {
    console.error('Error calling startBotConversation:', err?.response?.data || err?.message || err);
    process.exit(1);
  }
})();
