import botLogic from './botLogic.js';
import Conversation from '../models/Conversation.js';

/**
 * Message Handler
 * Processes incoming WhatsApp messages and routes to appropriate handlers
 */

class MessageHandler {
  /**
   * Process incoming webhook message
   * @param {Object} webhookData - Webhook data from WhatsApp
   */
  async processIncomingMessage(webhookData) {
    try {
      console.log('📥 Processing incoming WhatsApp message...');

      // Extract message data
      const entry = webhookData.entry?.[0];
      const changes = entry?.changes?.[0];
      const value = changes?.value;
      const messages = value?.messages;
      const contacts = value?.contacts;

      if (!messages || messages.length === 0) {
        console.log('ℹ️ No messages in webhook data');
        return { success: true, reason: 'no_messages' };
      }

      const message = messages[0];
      const contact = contacts?.[0];

      // Extract customer info
      const phone = message.from;
      const messageId = message.id;
      const messageType = message.type;
      const timestamp = new Date(parseInt(message.timestamp) * 1000);
      const customerName = contact?.profile?.name || null;

      console.log(`📱 Message from: ${phone} (${customerName})`);
      console.log(`📝 Type: ${messageType}`);

      // Find or create conversation
      const conversation = await Conversation.findOrCreateByPhone(phone, {
        customer_name: customerName,
        whatsapp_id: contact?.wa_id
      });

      // Route based on message type
      let result;

      switch (messageType) {
        case 'interactive':
          result = await this.handleInteractiveMessage(message, conversation);
          break;

        case 'text':
          result = await this.handleTextMessage(message, conversation);
          break;

        case 'button':
          result = await this.handleButtonReply(message, conversation);
          break;

        default:
          console.log(`⚠️ Unsupported message type: ${messageType}`);
          result = { success: false, reason: 'unsupported_type' };
      }

      return result;

    } catch (error) {
      console.error('❌ Failed to process incoming message:', error.message);
      return { success: false, error: error.message };
    }
  }

  /**
   * Handle interactive message (list/button reply)
   */
  async handleInteractiveMessage(message, conversation) {
    try {
      const interactive = message.interactive;
      const interactiveType = interactive.type; // 'list_reply' or 'button_reply'

      let selectedId, selectedTitle;

      if (interactiveType === 'list_reply') {
        selectedId = interactive.list_reply.id;
        selectedTitle = interactive.list_reply.title;
      } else if (interactiveType === 'button_reply') {
        selectedId = interactive.button_reply.id;
        selectedTitle = interactive.button_reply.title;
      }

      console.log(`🔘 Interactive selection: ${selectedId} (${selectedTitle})`);

      // Route based on selection ID prefix
      if (selectedId.startsWith('cat_')) {
        // Category selected
        return await botLogic.handleCategorySelection(conversation.phone, selectedId);
      } else if (selectedId.startsWith('machine_')) {
        // Machine selected
        return await botLogic.handleMachineSelection(conversation.phone, selectedId);
      } else if (selectedId.startsWith('interest_')) {
        // Purchase interest response
        const result = await botLogic.handlePurchaseInterest(conversation.phone, selectedId);
        
        // Send thank you if interested or not interested
        if (selectedId === 'interest_yes' || selectedId === 'interest_no') {
          await botLogic.sendThankYou(conversation.phone);
        }
        
        return result;
      } else {
        console.warn(`⚠️ Unknown selection ID: ${selectedId}`);
        return { success: false, reason: 'unknown_selection' };
      }

    } catch (error) {
      console.error('❌ Failed to handle interactive message:', error.message);
      return { success: false, error: error.message };
    }
  }

  /**
   * Handle text message
   */
  async handleTextMessage(message, conversation) {
    try {
      const textContent = message.text.body.toLowerCase().trim();
      console.log(`💬 Text message: "${textContent}"`);

      // Simple keyword detection
      if (textContent.includes('yes') || textContent.includes('interested')) {
        return await botLogic.handlePurchaseInterest(conversation.phone, 'interest_yes');
      } else if (textContent.includes('no') || textContent.includes('not interested')) {
        return await botLogic.handlePurchaseInterest(conversation.phone, 'interest_no');
      } else if (textContent.includes('info') || textContent.includes('details')) {
        return await botLogic.handlePurchaseInterest(conversation.phone, 'interest_info');
      } else if (textContent.includes('hi') || textContent.includes('hello') || textContent.includes('start')) {
        // Restart conversation
        return await botLogic.startConversation(
          conversation.phone,
          conversation.customer_name,
          conversation.inquiry_id
        );
      } else {
        // Default response for unrecognized text
        console.log(`ℹ️ Unrecognized text message, no action taken`);
        return { success: true, reason: 'unrecognized_text' };
      }

    } catch (error) {
      console.error('❌ Failed to handle text message:', error.message);
      return { success: false, error: error.message };
    }
  }

  /**
   * Handle button reply
   */
  async handleButtonReply(message, conversation) {
    try {
      const buttonId = message.button?.payload || message.button?.id;
      const buttonText = message.button?.text;

      console.log(`🔘 Button clicked: ${buttonId} (${buttonText})`);

      // Handle based on button ID
      if (buttonId.startsWith('interest_')) {
        const result = await botLogic.handlePurchaseInterest(conversation.phone, buttonId);
        
        // Send thank you after interest response
        if (buttonId === 'interest_yes' || buttonId === 'interest_no') {
          await botLogic.sendThankYou(conversation.phone);
        }
        
        return result;
      } else {
        return { success: true, reason: 'button_processed' };
      }

    } catch (error) {
      console.error('❌ Failed to handle button reply:', error.message);
      return { success: false, error: error.message };
    }
  }
}

// Export singleton instance
const messageHandler = new MessageHandler();
export default messageHandler;
