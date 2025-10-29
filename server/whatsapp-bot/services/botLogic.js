import whatsappService from './whatsappService.js';
import messageTemplates from '../templates/messageTemplates.js';
import Conversation from '../models/Conversation.js';

/**
 * Bot Logic - Interactive Conversation Flows
 * Handles all bot interactions and state management
 */

class BotLogic {
  /**
   * Start conversation flow - Send welcome and category menu
   * @param {String} phone - Customer phone number
   * @param {String} customerName - Customer name
   * @param {ObjectId} inquiryId - Optional linked inquiry ID
   */
  async startConversation(phone, customerName = null, inquiryId = null) {
    try {
      console.log(`🤖 Starting conversation flow for ${phone}`);

      // Find or create conversation
      const conversation = await Conversation.findOrCreateByPhone(phone, {
        customer_name: customerName,
        inquiry_id: inquiryId
      });

      // Send category menu
      const menuTemplate = messageTemplates.productCategoriesMenu();
      
      const response = await whatsappService.sendInteractiveList(
        phone,
        menuTemplate.bodyText,
        menuTemplate.buttonText,
        menuTemplate.sections,
        menuTemplate.headerText,
        menuTemplate.footerText
      );

      // Save message to conversation
      await conversation.addMessage({
        message_id: response.messages?.[0]?.id,
        direction: 'outgoing',
        type: 'interactive',
        content: 'Category menu sent',
        status: 'sent'
      });

      // Update state
      await conversation.updateState('browsing_categories');

      console.log(`✅ Category menu sent to ${phone}`);
      return { success: true, conversation_id: conversation._id };

    } catch (error) {
      console.error(`❌ Failed to start conversation:`, error.message);
      return { success: false, error: error.message };
    }
  }

  /**
   * Handle category selection
   * @param {String} phone - Customer phone number
   * @param {String} categoryId - Selected category ID (e.g., 'cat_mixing')
   */
  async handleCategorySelection(phone, categoryId) {
    try {
      console.log(`🏭 Category selected: ${categoryId} by ${phone}`);

      const conversation = await Conversation.findActiveByPhone(phone);
      if (!conversation) {
        console.warn(`⚠️ No active conversation found for ${phone}`);
        return { success: false, reason: 'no_conversation' };
      }

      // Get machines for this category
      const machinesTemplate = messageTemplates.machinesByCategory[categoryId];
      
      if (!machinesTemplate) {
        console.error(`❌ No machines template found for category: ${categoryId}`);
        return { success: false, reason: 'invalid_category' };
      }

      const template = machinesTemplate();

      // Send machines list
      const response = await whatsappService.sendInteractiveList(
        phone,
        template.bodyText,
        template.buttonText,
        template.sections,
        template.headerText,
        template.footerText
      );

      // Save message
      await conversation.addMessage({
        message_id: response.messages?.[0]?.id,
        direction: 'outgoing',
        type: 'interactive',
        content: `Machines for ${categoryId}`,
        status: 'sent'
      });

      // Update state with category context
      await conversation.updateState('viewing_machines', { category: categoryId });

      console.log(`✅ Machines list sent for ${categoryId}`);
      return { success: true, conversation_id: conversation._id };

    } catch (error) {
      console.error(`❌ Failed to handle category selection:`, error.message);
      return { success: false, error: error.message };
    }
  }

  /**
   * Handle machine selection
   * @param {String} phone - Customer phone number
   * @param {String} machineId - Selected machine ID (e.g., 'machine_rmg')
   */
  async handleMachineSelection(phone, machineId) {
    try {
      console.log(`⚙️ Machine selected: ${machineId} by ${phone}`);

      const conversation = await Conversation.findActiveByPhone(phone);
      if (!conversation) {
        return { success: false, reason: 'no_conversation' };
      }

      // Get machine name
      const machineName = messageTemplates.getMachineName(machineId);

      // Send purchase interest confirmation
      const interestTemplate = messageTemplates.purchaseInterest(machineName);

      const response = await whatsappService.sendInteractiveButtons(
        phone,
        interestTemplate.bodyText,
        interestTemplate.buttons,
        interestTemplate.headerText,
        interestTemplate.footerText
      );

      // Save message
      await conversation.addMessage({
        message_id: response.messages?.[0]?.id,
        direction: 'outgoing',
        type: 'interactive',
        content: `Purchase interest for ${machineName}`,
        status: 'sent'
      });

      // Add to selected machines
      if (!conversation.selected_machines.includes(machineId)) {
        conversation.selected_machines.push(machineId);
      }

      // Update state with machine context
      await conversation.updateState('confirming_interest', { machine: machineId });

      console.log(`✅ Purchase interest confirmation sent for ${machineName}`);
      return { success: true, conversation_id: conversation._id };

    } catch (error) {
      console.error(`❌ Failed to handle machine selection:`, error.message);
      return { success: false, error: error.message };
    }
  }

  /**
   * Handle purchase interest response
   * @param {String} phone - Customer phone number
   * @param {String} interestType - Response type ('interest_yes', 'interest_no', 'interest_info')
   */
  async handlePurchaseInterest(phone, interestType) {
    try {
      console.log(`💼 Purchase interest response: ${interestType} from ${phone}`);

      const conversation = await Conversation.findActiveByPhone(phone);
      if (!conversation) {
        return { success: false, reason: 'no_conversation' };
      }

      const customerName = conversation.customer_name || 'Customer';
      const machineName = messageTemplates.getMachineName(conversation.current_machine);

      let messageTemplate;
      let newState;

      switch (interestType) {
        case 'interest_yes':
          messageTemplate = messageTemplates.purchaseInterestYes(customerName, machineName);
          newState = 'interested';
          conversation.needs_followup = true;
          conversation.followup_date = new Date(Date.now() + 4 * 60 * 60 * 1000); // 4 hours
          break;

        case 'interest_no':
          messageTemplate = messageTemplates.purchaseInterestNo(customerName);
          newState = 'not_interested';
          break;

        case 'interest_info':
          messageTemplate = messageTemplates.purchaseInterestMoreInfo(machineName);
          newState = 'confirming_interest'; // Stay in same state
          break;

        default:
          messageTemplate = messageTemplates.defaultResponse();
          newState = conversation.state;
      }

      // Send response message
      const response = await whatsappService.sendTextMessage(
        phone,
        messageTemplate.text
      );

      // Save message
      await conversation.addMessage({
        message_id: response.messages?.[0]?.id,
        direction: 'outgoing',
        type: 'text',
        content: `Interest response: ${interestType}`,
        status: 'sent'
      });

      // Update state
      await conversation.updateState(newState);

      console.log(`✅ Purchase interest response sent: ${interestType}`);
      return { success: true, conversation_id: conversation._id, state: newState };

    } catch (error) {
      console.error(`❌ Failed to handle purchase interest:`, error.message);
      return { success: false, error: error.message };
    }
  }

  /**
   * Send thank you message and complete conversation
   * @param {String} phone - Customer phone number
   */
  async sendThankYou(phone) {
    try {
      const conversation = await Conversation.findActiveByPhone(phone);
      if (!conversation) {
        return { success: false, reason: 'no_conversation' };
      }

      const customerName = conversation.customer_name || 'valued customer';
      const thankYouTemplate = messageTemplates.thankYou(customerName);

      const response = await whatsappService.sendTextMessage(
        phone,
        thankYouTemplate.text
      );

      await conversation.addMessage({
        message_id: response.messages?.[0]?.id,
        direction: 'outgoing',
        type: 'text',
        content: 'Thank you message',
        status: 'sent'
      });

      await conversation.updateState('completed');

      console.log(`✅ Thank you message sent to ${phone}`);
      return { success: true };

    } catch (error) {
      console.error(`❌ Failed to send thank you:`, error.message);
      return { success: false, error: error.message };
    }
  }
}

// Export singleton instance
const botLogic = new BotLogic();
export default botLogic;
