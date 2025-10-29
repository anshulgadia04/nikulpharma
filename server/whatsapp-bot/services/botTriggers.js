import whatsappService from './whatsappService.js';
import messageTemplates from '../templates/messageTemplates.js';
import botLogic from './botLogic.js';

/**
 * Bot Triggers Service
 * Handles automated WhatsApp messages triggered by system events
 */

class BotTriggers {
  /**
   * Send acknowledgment message when new inquiry is created
   * @param {Object} inquiry - The inquiry document from MongoDB
   * @returns {Promise<Object>} WhatsApp API response
   */
  async onInquiryCreated(inquiry) {
    try {
      console.log('🤖 Bot Trigger: New inquiry created, sending WhatsApp message...');

      // Extract customer information
      const { 
        first_name, 
        last_name, 
        phone, 
        email,
        _id, 
        product, 
        inquiry_type 
      } = inquiry;

      // Validate phone number
      if (!phone) {
        console.warn(`⚠️ No phone number provided for inquiry ${_id}`);
        return { success: false, reason: 'no_phone_number' };
      }

      // Format phone number for WhatsApp
      const whatsappPhone = whatsappService.formatPhoneNumber(phone);
      
      if (!whatsappService.isValidPhoneNumber(whatsappPhone)) {
        console.warn(`⚠️ Invalid phone number: ${phone} for inquiry ${_id}`);
        return { success: false, reason: 'invalid_phone_number' };
      }

      // Get customer name
      const customerName = [first_name, last_name].filter(Boolean).join(' ') || 'Customer';
      const inquiryId = _id.toString().slice(-8).toUpperCase(); // Last 8 chars of ID

      // Send inquiry acknowledgment first
      let acknowledgmentTemplate;
      
      if (product) {
        acknowledgmentTemplate = messageTemplates.productInquiryReceived(
          customerName,
          product,
          inquiryId
        );
      } else if (inquiry_type === 'quote') {
        acknowledgmentTemplate = messageTemplates.quoteRequestReceived(
          customerName,
          inquiryId
        );
      } else {
        acknowledgmentTemplate = messageTemplates.inquiryReceived(
          customerName,
          inquiryId
        );
      }

      // Send acknowledgment message
      await whatsappService.sendTextMessage(
        whatsappPhone,
        acknowledgmentTemplate.text
      );

      console.log(`✅ Acknowledgment message sent to ${whatsappPhone}`);

      // Wait 2 seconds before sending category menu
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Start interactive conversation flow
      const conversationResult = await botLogic.startConversation(
        whatsappPhone,
        customerName,
        _id
      );

      console.log(`✅ Interactive conversation started for ${whatsappPhone}`);
      
      return {
        success: true,
        whatsapp_message_sent: true,
        conversation_started: conversationResult.success,
        phone: whatsappPhone,
        inquiry_id: _id
      };

    } catch (error) {
      console.error('❌ Failed to send WhatsApp message for inquiry:', error.message);
      
      // Try to get phone number safely
      const phoneForError = inquiry?.phone || 'unknown';
      let formattedPhone = 'unknown';
      try {
        formattedPhone = whatsappService.formatPhoneNumber(phoneForError);
      } catch (e) {
        // Ignore formatting error
      }
      
      // Check for specific error codes
      if (error.message.includes('Code: 190')) {
        console.error('🔑 ACCESS TOKEN EXPIRED - Please refresh your WhatsApp token');
        console.error('   → Go to: https://developers.facebook.com/');
        console.error('   → Generate new token and update .env file');
      } else if (error.message.includes('131031') || error.message.includes('recipient phone number not in allowed list')) {
        console.error('🔒 TEST MODE RESTRICTION - This phone number is not registered as a test recipient');
        console.error(`   → Phone: ${formattedPhone}`);
        console.error('   → Add this number at: https://developers.facebook.com/');
        console.error('   → OR request production access to send to any number');
        console.error('   → See: whatsapp-bot/PRODUCTION_APPROVAL_GUIDE.md');
      } else {
        console.error('Error details:', error);
      }
      
      // Don't throw error - inquiry should still be created even if WhatsApp fails
      return {
        success: false,
        error: error.message,
        inquiry_id: inquiry._id,
        phone: formattedPhone
      };
    }
  }

  /**
   * Send follow-up message for old inquiries
   * @param {Object} inquiry - The inquiry document
   * @param {Number} daysSince - Days since inquiry was created
   * @returns {Promise<Object>} WhatsApp API response
   */
  async sendFollowUp(inquiry, daysSince = 3) {
    try {
      const { first_name, last_name, phone, _id } = inquiry;

      if (!phone) {
        console.warn(`⚠️ No phone number for follow-up on inquiry ${_id}`);
        return { success: false, reason: 'no_phone_number' };
      }

      const whatsappPhone = whatsappService.formatPhoneNumber(phone);
      const customerName = [first_name, last_name].filter(Boolean).join(' ') || 'Customer';
      const inquiryId = _id.toString().slice(-8).toUpperCase();

      const template = messageTemplates.followUpReminder(
        customerName,
        inquiryId,
        daysSince
      );

      const response = await whatsappService.sendTextMessage(
        whatsappPhone,
        template.text
      );

      console.log(`✅ Follow-up message sent for inquiry ${_id}`);

      return {
        success: true,
        whatsapp_message_id: response.messages?.[0]?.id,
        inquiry_id: _id
      };

    } catch (error) {
      console.error('❌ Failed to send follow-up message:', error.message);
      return {
        success: false,
        error: error.message,
        inquiry_id: inquiry._id
      };
    }
  }

  /**
   * Send out-of-hours acknowledgment
   * @param {String} phone - Customer phone number
   * @param {String} customerName - Customer name
   * @returns {Promise<Object>} WhatsApp API response
   */
  async sendOutOfHoursMessage(phone, customerName = null) {
    try {
      const whatsappPhone = whatsappService.formatPhoneNumber(phone);
      const template = messageTemplates.outOfHours(customerName);

      const response = await whatsappService.sendTextMessage(
        whatsappPhone,
        template.text
      );

      console.log(`✅ Out-of-hours message sent to ${whatsappPhone}`);

      return {
        success: true,
        whatsapp_message_id: response.messages?.[0]?.id
      };

    } catch (error) {
      console.error('❌ Failed to send out-of-hours message:', error.message);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Send contact information
   * @param {String} phone - Customer phone number
   * @returns {Promise<Object>} WhatsApp API response
   */
  async sendContactInfo(phone) {
    try {
      const whatsappPhone = whatsappService.formatPhoneNumber(phone);
      const template = messageTemplates.contactInfo();

      const response = await whatsappService.sendTextMessage(
        whatsappPhone,
        template.text
      );

      console.log(`✅ Contact info sent to ${whatsappPhone}`);

      return {
        success: true,
        whatsapp_message_id: response.messages?.[0]?.id
      };

    } catch (error) {
      console.error('❌ Failed to send contact info:', error.message);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Check if currently within business hours
   * @returns {Boolean} True if within business hours
   */
  isBusinessHours() {
    const now = new Date();
    const hours = now.getHours();
    const day = now.getDay(); // 0 = Sunday, 6 = Saturday

    // Closed on Sunday
    if (day === 0) return false;

    // Business hours: 9 AM - 6 PM
    return hours >= 9 && hours < 18;
  }
}

// Export singleton instance
const botTriggers = new BotTriggers();
export default botTriggers;
