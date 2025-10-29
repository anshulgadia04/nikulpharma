import 'dotenv/config';

/**
 * WhatsApp Business API Configuration
 * Centralized configuration for all WhatsApp-related settings
 */

const config = {
  // Meta WhatsApp Business API credentials
  phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID,
  accessToken: process.env.WHATSAPP_ACCESS_TOKEN,
  apiVersion: process.env.WHATSAPP_API_VERSION || 'v22.0',
  apiUrl: process.env.WHATSAPP_API_URL || 'https://graph.facebook.com',
  
  // Webhook verification token (used when setting up webhook)
  verifyToken: process.env.WHATSAPP_VERIFY_TOKEN,
  
  // Business information
  business: {
    phone: process.env.BUSINESS_PHONE,
    email: process.env.BUSINESS_EMAIL,
    name: process.env.BUSINESS_NAME || 'Nikul Pharma',
    supportHours: {
      start: '09:00',
      end: '18:00',
      timezone: 'Asia/Kolkata'
    }
  },
  
  // API endpoints
  endpoints: {
    sendMessage() {
      return `${config.apiUrl}/${config.apiVersion}/${config.phoneNumberId}/messages`;
    },
    
    mediaUpload() {
      return `${config.apiUrl}/${config.apiVersion}/${config.phoneNumberId}/media`;
    }
  },
  
  // Message settings
  messageSettings: {
    maxRetries: 3,
    retryDelay: 1000, // milliseconds
    timeout: 30000, // 30 seconds
  },
  
  // Conversation timeouts
  conversationTimeout: {
    inactivity: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
    sessionExpiry: 7 * 24 * 60 * 60 * 1000, // 7 days
  },
  
  // Feature flags
  features: {
    enableButtons: true,
    enableImages: true,
    enableDocuments: true,
    enableTemplates: true,
    enableAnalytics: true,
  },
  
  // Validate configuration
  validate() {
    const required = [
      'phoneNumberId',
      'accessToken',
      'apiVersion',
      'verifyToken'
    ];
    
    const missing = required.filter(key => !this[key]);
    
    if (missing.length > 0) {
      throw new Error(
        `Missing required WhatsApp configuration: ${missing.join(', ')}\n` +
        'Please check your .env file and ensure all required variables are set.'
      );
    }
    
    return true;
  },
  
  // Check if within business hours
  isBusinessHours() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentTime = hours * 60 + minutes;
    
    const [startHour, startMin] = this.business.supportHours.start.split(':').map(Number);
    const [endHour, endMin] = this.business.supportHours.end.split(':').map(Number);
    
    const startTime = startHour * 60 + startMin;
    const endTime = endHour * 60 + endMin;
    
    return currentTime >= startTime && currentTime <= endTime;
  }
};

// Validate configuration on load
try {
  config.validate();
  console.log('✅ WhatsApp configuration loaded successfully');
} catch (error) {
  console.error('❌ WhatsApp configuration error:', error.message);
  // Don't throw in development, just warn
  if (process.env.NODE_ENV === 'production') {
    throw error;
  }
}

export default config;
