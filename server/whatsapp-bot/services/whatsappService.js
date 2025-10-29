import axios from 'axios';
import config from '../config/whatsapp.config.js';

/**
 * WhatsApp Service
 * Handles all communication with Meta WhatsApp Business API
 */

class WhatsAppService {
  constructor() {
    this.config = config;
    this.apiUrl = config.endpoints.sendMessage();
    this.accessToken = config.accessToken;
  }

  /**
   * Send a simple text message
   * @param {string} to - Recipient phone number (format: 916375591682)
   * @param {string} message - Text message to send
   * @returns {Promise<Object>} API response
   */
  async sendTextMessage(to, message) {
    try {
      const payload = {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: to,
        type: 'text',
        text: {
          preview_url: false,
          body: message
        }
      };

      const response = await this._makeRequest(payload);
      
      console.log(`✅ Text message sent to ${to}`);
      return response;
    } catch (error) {
      console.error(`❌ Failed to send text message to ${to}:`, error.message);
      throw error;
    }
  }

  /**
   * Send interactive message with buttons (up to 3 buttons)
   * @param {string} to - Recipient phone number
   * @param {string} bodyText - Main message text
   * @param {Array} buttons - Array of button objects [{id, title}]
   * @param {string} headerText - Optional header text
   * @param {string} footerText - Optional footer text
   * @returns {Promise<Object>} API response
   */
  async sendInteractiveButtons(to, bodyText, buttons, headerText = null, footerText = null) {
    try {
      if (buttons.length > 3) {
        throw new Error('WhatsApp only supports up to 3 buttons');
      }

      const interactive = {
        type: 'button',
        body: {
          text: bodyText
        },
        action: {
          buttons: buttons.map((btn, index) => ({
            type: 'reply',
            reply: {
              id: btn.id || `btn_${index}`,
              title: btn.title.substring(0, 20) // Max 20 chars
            }
          }))
        }
      };

      // Add optional header
      if (headerText) {
        interactive.header = {
          type: 'text',
          text: headerText
        };
      }

      // Add optional footer
      if (footerText) {
        interactive.footer = {
          text: footerText
        };
      }

      const payload = {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: to,
        type: 'interactive',
        interactive: interactive
      };

      const response = await this._makeRequest(payload);
      
      console.log(`✅ Interactive message sent to ${to} with ${buttons.length} buttons`);
      return response;
    } catch (error) {
      console.error(`❌ Failed to send interactive message to ${to}:`, error.message);
      throw error;
    }
  }

  /**
   * Send interactive list message (up to 10 sections with multiple rows)
   * @param {string} to - Recipient phone number
   * @param {string} bodyText - Main message text
   * @param {string} buttonText - Text on the list button
   * @param {Array} sections - Array of sections with rows
   * @param {string} headerText - Optional header text
   * @param {string} footerText - Optional footer text
   * @returns {Promise<Object>} API response
   */
  async sendInteractiveList(to, bodyText, buttonText, sections, headerText = null, footerText = null) {
    try {
      const interactive = {
        type: 'list',
        body: {
          text: bodyText
        },
        action: {
          button: buttonText,
          sections: sections
        }
      };

      if (headerText) {
        interactive.header = {
          type: 'text',
          text: headerText
        };
      }

      if (footerText) {
        interactive.footer = {
          text: footerText
        };
      }

      const payload = {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: to,
        type: 'interactive',
        interactive: interactive
      };

      const response = await this._makeRequest(payload);
      
      console.log(`✅ Interactive list sent to ${to}`);
      return response;
    } catch (error) {
      console.error(`❌ Failed to send interactive list to ${to}:`, error.message);
      throw error;
    }
  }

  /**
   * Send template message (pre-approved by Meta)
   * @param {string} to - Recipient phone number
   * @param {string} templateName - Name of approved template
   * @param {string} languageCode - Language code (e.g., 'en_US')
   * @param {Array} components - Optional template components/parameters
   * @returns {Promise<Object>} API response
   */
  async sendTemplateMessage(to, templateName, languageCode = 'en_US', components = []) {
    try {
      const payload = {
        messaging_product: 'whatsapp',
        to: to,
        type: 'template',
        template: {
          name: templateName,
          language: {
            code: languageCode
          }
        }
      };

      // Add components if provided (for templates with variables)
      if (components.length > 0) {
        payload.template.components = components;
      }

      const response = await this._makeRequest(payload);
      
      console.log(`✅ Template message '${templateName}' sent to ${to}`);
      return response;
    } catch (error) {
      console.error(`❌ Failed to send template message to ${to}:`, error.message);
      throw error;
    }
  }

  /**
   * Send image message
   * @param {string} to - Recipient phone number
   * @param {string} imageUrl - URL of the image or media ID
   * @param {string} caption - Optional image caption
   * @returns {Promise<Object>} API response
   */
  async sendImageMessage(to, imageUrl, caption = null) {
    try {
      const payload = {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: to,
        type: 'image',
        image: {
          link: imageUrl
        }
      };

      if (caption) {
        payload.image.caption = caption;
      }

      const response = await this._makeRequest(payload);
      
      console.log(`✅ Image message sent to ${to}`);
      return response;
    } catch (error) {
      console.error(`❌ Failed to send image to ${to}:`, error.message);
      throw error;
    }
  }

  /**
   * Send document/PDF message
   * @param {string} to - Recipient phone number
   * @param {string} documentUrl - URL of the document
   * @param {string} filename - Display filename
   * @param {string} caption - Optional caption
   * @returns {Promise<Object>} API response
   */
  async sendDocumentMessage(to, documentUrl, filename, caption = null) {
    try {
      const payload = {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: to,
        type: 'document',
        document: {
          link: documentUrl,
          filename: filename
        }
      };

      if (caption) {
        payload.document.caption = caption;
      }

      const response = await this._makeRequest(payload);
      
      console.log(`✅ Document sent to ${to}`);
      return response;
    } catch (error) {
      console.error(`❌ Failed to send document to ${to}:`, error.message);
      throw error;
    }
  }

  /**
   * Mark a message as read
   * @param {string} messageId - WhatsApp message ID
   * @returns {Promise<Object>} API response
   */
  async markAsRead(messageId) {
    try {
      const payload = {
        messaging_product: 'whatsapp',
        status: 'read',
        message_id: messageId
      };

      const response = await this._makeRequest(payload);
      
      console.log(`✅ Message ${messageId} marked as read`);
      return response;
    } catch (error) {
      console.error(`❌ Failed to mark message as read:`, error.message);
      throw error;
    }
  }

  /**
   * Send reaction to a message
   * @param {string} to - Recipient phone number
   * @param {string} messageId - Message ID to react to
   * @param {string} emoji - Emoji to react with
   * @returns {Promise<Object>} API response
   */
  async sendReaction(to, messageId, emoji) {
    try {
      const payload = {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: to,
        type: 'reaction',
        reaction: {
          message_id: messageId,
          emoji: emoji
        }
      };

      const response = await this._makeRequest(payload);
      
      console.log(`✅ Reaction sent to message ${messageId}`);
      return response;
    } catch (error) {
      console.error(`❌ Failed to send reaction:`, error.message);
      throw error;
    }
  }

  /**
   * Private method to make API requests to WhatsApp
   * @private
   */
  async _makeRequest(payload) {
    try {
      const response = await axios({
        method: 'POST',
        url: this.apiUrl,
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json'
        },
        data: payload,
        timeout: this.config.messageSettings.timeout
      });

      return response.data;
    } catch (error) {
      // Enhanced error handling
      if (error.response) {
        // WhatsApp API returned an error
        const apiError = error.response.data?.error || error.response.data;
        throw new Error(
          `WhatsApp API Error: ${apiError.message || apiError.error_data?.details || 'Unknown error'} ` +
          `(Code: ${apiError.code || error.response.status})`
        );
      } else if (error.request) {
        // Request was made but no response
        throw new Error('No response from WhatsApp API. Check your internet connection.');
      } else {
        // Something else happened
        throw new Error(`Request setup error: ${error.message}`);
      }
    }
  }

  /**
   * Verify webhook signature (for security)
   * @param {string} signature - X-Hub-Signature-256 header
   * @param {string} payload - Request body
   * @returns {boolean} True if signature is valid
   */
  verifyWebhookSignature(signature, payload) {
    // Implementation would use crypto to verify signature
    // For now, return true (implement later for production)
    return true;
  }

  /**
   * Format phone number to WhatsApp format
   * @param {string} phone - Phone number in any format
   * @returns {string} Formatted phone number (e.g., 916375591682)
   */
  formatPhoneNumber(phone) {
    // Remove all non-numeric characters
    let cleaned = phone.replace(/\D/g, '');
    
    // Remove leading + if present
    if (cleaned.startsWith('+')) {
      cleaned = cleaned.substring(1);
    }
    
    // If number doesn't start with country code, assume India (91)
    if (!cleaned.startsWith('91') && cleaned.length === 10) {
      cleaned = '91' + cleaned;
    }
    
    return cleaned;
  }

  /**
   * Check if phone number is valid for WhatsApp
   * @param {string} phone - Phone number to validate
   * @returns {boolean} True if valid
   */
  isValidPhoneNumber(phone) {
    const formatted = this.formatPhoneNumber(phone);
    // Basic validation: should be numeric and reasonable length
    return /^\d{10,15}$/.test(formatted);
  }
}

// Export singleton instance
const whatsappService = new WhatsAppService();
export default whatsappService;
