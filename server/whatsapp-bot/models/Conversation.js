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
    email: {
      type: String,
      trim: true,
      lowercase: true
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
    
    // Flags
    needs_followup: { 
      type: Boolean, 
      default: false 
    },
    followup_date: { 
      type: Date 
    }
  },
  { 
    timestamps: true,
    collection: 'conversations',
    versionKey: false  // Disable __v field
  }
);

// Indexes for better performance
conversationSchema.index({ phone: 1 });
conversationSchema.index({ state: 1, updatedAt: -1 });
conversationSchema.index({ createdAt: -1 });

// Methods
conversationSchema.methods.updateState = function(newState, context = {}) {
  this.state = newState;
  if (context.category) this.current_category = context.category;
  if (context.machine) this.current_machine = context.machine;
  return this.save();
};

// Static methods
conversationSchema.statics.findActiveByPhone = function(phone) {
  return this.findOne({ phone })
    .sort({ updatedAt: -1 });
};

conversationSchema.statics.findOrCreateByPhone = async function(phone, initialData = {}) {
  let conversation = await this.findActiveByPhone(phone);
  
  if (!conversation) {
    conversation = await this.create({
      phone,
      customer_name: initialData.customer_name,
      whatsapp_id: initialData.whatsapp_id,
      email: initialData.email,
      state: 'new'
    });
  }
  
  return conversation;
};

const Conversation = mongoose.model('Conversation', conversationSchema);

export default Conversation;
