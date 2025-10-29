import mongoose from 'mongoose';

/**
 * Conversation Model
 * Stores all WhatsApp conversations and user interactions
 */

const conversationSchema = new mongoose.Schema(
  {
    // Customer Information
    phone: { 
      type: String, 
      required: true, 
      index: true,
      trim: true 
    },
    whatsapp_id: { 
      type: String, 
      index: true 
    },
    customer_name: { 
      type: String, 
      trim: true 
    },
    
    // Conversation State
    state: {
      type: String,
      enum: [
        'new',                    // New conversation
        'welcomed',               // Welcome message sent
        'browsing_categories',    // Viewing categories
        'viewing_machines',       // Viewing machines in category
        'confirming_interest',    // Asked about purchase interest
        'interested',             // Customer interested
        'not_interested',         // Customer not interested
        'completed',              // Conversation completed
        'idle'                    // No recent activity
      ],
      default: 'new'
    },
    
    // Current Context
    current_category: { 
      type: String,
      trim: true
    },
    current_machine: { 
      type: String,
      trim: true
    },
    selected_machines: [{ 
      type: String 
    }],
    
    // Messages
    messages: [
      {
        message_id: { type: String },
        direction: { 
          type: String, 
          enum: ['incoming', 'outgoing'],
          required: true 
        },
        type: { 
          type: String,
          enum: ['text', 'interactive', 'template', 'button', 'list', 'image', 'document'],
          default: 'text'
        },
        content: { 
          type: String 
        },
        timestamp: { 
          type: Date, 
          default: Date.now 
        },
        status: {
          type: String,
          enum: ['sent', 'delivered', 'read', 'failed'],
          default: 'sent'
        },
        metadata: { 
          type: mongoose.Schema.Types.Mixed 
        }
      }
    ],
    
    // User Actions
    button_clicks: [
      {
        button_id: { type: String },
        button_title: { type: String },
        timestamp: { type: Date, default: Date.now }
      }
    ],
    
    // Linked Inquiry
    inquiry_id: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Inquiry',
      index: true
    },
    
    // Conversation Metadata
    last_message_at: { 
      type: Date, 
      default: Date.now,
      index: true
    },
    last_interaction_type: { 
      type: String 
    },
    
    // Flags
    is_active: { 
      type: Boolean, 
      default: true,
      index: true
    },
    needs_followup: { 
      type: Boolean, 
      default: false 
    },
    followup_date: { 
      type: Date 
    },
    
    // Analytics
    total_messages: { 
      type: Number, 
      default: 0 
    },
    response_time_avg: { 
      type: Number 
    }, // in seconds
    
    // Notes
    notes: { 
      type: String 
    },
    tags: [{ 
      type: String 
    }]
  },
  { 
    timestamps: true,
    collection: 'conversations'
  }
);

// Indexes for better performance
conversationSchema.index({ phone: 1, is_active: 1 });
conversationSchema.index({ state: 1, last_message_at: -1 });
conversationSchema.index({ inquiry_id: 1 });
conversationSchema.index({ createdAt: -1 });

// Methods
conversationSchema.methods.addMessage = function(messageData) {
  this.messages.push(messageData);
  this.total_messages = this.messages.length;
  this.last_message_at = new Date();
  return this.save();
};

conversationSchema.methods.updateState = function(newState, context = {}) {
  this.state = newState;
  if (context.category) this.current_category = context.category;
  if (context.machine) this.current_machine = context.machine;
  this.last_message_at = new Date();
  return this.save();
};

conversationSchema.methods.addButtonClick = function(buttonId, buttonTitle) {
  this.button_clicks.push({
    button_id: buttonId,
    button_title: buttonTitle,
    timestamp: new Date()
  });
  return this.save();
};

// Static methods
conversationSchema.statics.findActiveByPhone = function(phone) {
  return this.findOne({ phone, is_active: true })
    .sort({ last_message_at: -1 });
};

conversationSchema.statics.findOrCreateByPhone = async function(phone, initialData = {}) {
  let conversation = await this.findActiveByPhone(phone);
  
  if (!conversation) {
    conversation = await this.create({
      phone,
      customer_name: initialData.customer_name,
      whatsapp_id: initialData.whatsapp_id,
      inquiry_id: initialData.inquiry_id,
      state: 'new'
    });
  }
  
  return conversation;
};

const Conversation = mongoose.model('Conversation', conversationSchema);

export default Conversation;
