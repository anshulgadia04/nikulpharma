import whatsappService from './whatsappService.js';
import messageTemplates from '../templates/messageTemplates.js';
import Conversation from '../models/Conversation.js';
import { Lead } from '../../models/Leads.js';

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
      
      await whatsappService.sendInteractiveList(
        phone,
        menuTemplate.bodyText,
        menuTemplate.buttonText,
        menuTemplate.sections,
        menuTemplate.headerText,
        menuTemplate.footerText
      );

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
   * Start product-specific conversation (when inquiry already has product)
   * Note: Welcome message is already sent by botTriggers, this only sends purchase interest
   * @param {String} phone - Customer phone number
   * @param {String} customerName - Customer name
   * @param {String} productName - Product name from inquiry
   * @param {String} machineId - Machine ID (if matched)
   * @param {ObjectId} inquiryId - Linked inquiry ID
   */
  async startProductConversation(phone, customerName = null, productName, machineId = null, inquiryId = null) {
    try {
      console.log(`🤖 Starting product-specific conversation for ${phone} - Product: ${productName}`);

      // Find or create conversation
      const conversation = await Conversation.findOrCreateByPhone(phone, {
        customer_name: customerName,
        inquiry_id: inquiryId
      });

      // If we have a machine ID, send purchase interest directly
      if (machineId) {
        await conversation.updateState('confirming_interest', { machine: machineId });
        
        const machineName = messageTemplates.getMachineName(machineId);
        const interestTemplate = messageTemplates.purchaseInterest(machineName);

        await whatsappService.sendInteractiveButtons(
          phone,
          interestTemplate.bodyText,
          interestTemplate.buttons,
          interestTemplate.headerText,
          interestTemplate.footerText
        );

        console.log(`✅ Purchase interest confirmation sent for ${machineName}`);
      } else {
        // Product name doesn't match our machine IDs
        // Don't send any message - welcome already sent by botTriggers
        // Just send category menu for exploration
        console.log(`⚠️ Product "${productName}" not matched to any machine, showing category menu`);
        
        const menuTemplate = messageTemplates.productCategoriesMenu();
        await whatsappService.sendInteractiveList(
          phone,
          menuTemplate.bodyText,
          menuTemplate.buttonText,
          menuTemplate.sections,
          menuTemplate.headerText,
          menuTemplate.footerText
        );
        
        await conversation.updateState('browsing_categories');
      }

      return { success: true, conversation_id: conversation._id };

    } catch (error) {
      console.error(`❌ Failed to start product conversation:`, error.message);
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
      let shouldTransferToLeads = false;

      switch (interestType) {
        case 'interest_yes':
          messageTemplate = messageTemplates.purchaseInterestYes(customerName, machineName);
          newState = 'interested';
          conversation.needs_followup = true;
          conversation.followup_date = new Date(Date.now() + 4 * 60 * 60 * 1000); // 4 hours
          shouldTransferToLeads = true;
          break;

        case 'interest_no':
          messageTemplate = messageTemplates.purchaseInterestNo(customerName);
          newState = 'not_interested';
          shouldTransferToLeads = true;
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
      await whatsappService.sendTextMessage(
        phone,
        messageTemplate.text
      );

      // If customer is not interested, offer to explore more products
      if (interestType === 'interest_no') {
        // Wait 2 seconds before sending explore more template
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const exploreTemplate = messageTemplates.exploreMoreProducts();
        await whatsappService.sendInteractiveList(
          phone,
          exploreTemplate.bodyText,
          exploreTemplate.buttonText,
          exploreTemplate.sections,
          exploreTemplate.headerText,
          exploreTemplate.footerText
        );
        
        // Update state to browsing categories
        await conversation.updateState('browsing_categories');
        console.log(`✅ Explore more products menu sent to ${phone}`);
        
        // Don't transfer to leads yet, let them browse
        shouldTransferToLeads = false;
      } else {
        // Update state for yes/info responses
        await conversation.updateState(newState);
      }

      // Transfer to Leads collection if interested
      if (shouldTransferToLeads) {
        await this.transferToLeads(conversation, newState);
      }

      console.log(`✅ Purchase interest response sent: ${interestType}`);
      return { success: true, conversation_id: conversation._id, state: newState };

    } catch (error) {
      console.error(`❌ Failed to handle purchase interest:`, error.message);
      return { success: false, error: error.message };
    }
  }

  /**
   * Transfer conversation data to Leads collection and delete conversation
   * @param {Object} conversation - Conversation document
   * @param {String} state - Final state ('interested' or 'not_interested')
   */
  async transferToLeads(conversation, state) {
    try {
      console.log(`📋 Transferring conversation ${conversation._id} to Leads collection`);

      // Create lead record
      const leadData = {
        phone: conversation.phone,
        customer_name: conversation.customer_name,
        email: conversation.email,
        category: conversation.current_category,
        product: messageTemplates.getMachineName(conversation.current_machine),
        machine_id: conversation.current_machine,
        state: state,
        source: 'whatsapp_bot',
        conversation_id: conversation._id,
        needs_followup: conversation.needs_followup || false,
        followup_date: conversation.followup_date,
        createdAt: new Date()
      };

      // Save to Leads collection
      const lead = await Lead.create(leadData);
      console.log(`✅ Lead created with ID: ${lead._id}`);

      // Delete conversation from Conversation collection
      await Conversation.deleteOne({ _id: conversation._id });
      console.log(`✅ Conversation ${conversation._id} deleted from Conversations collection`);

      return { success: true, lead_id: lead._id };

    } catch (error) {
      console.error(`❌ Failed to transfer to leads:`, error.message);
      throw error; // Re-throw so caller knows it failed
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
