import mongoose from "mongoose";

// Counter for generating unique lead IDs
const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  sequence_value: { type: Number, default: 0 }
});

const Counter = mongoose.model('Counter', counterSchema);

// Activity/Comment schema for lead history
const activitySchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['comment', 'status_change', 'quotation_sent', 'follow_up', 'assignment'],
    required: true
  },
  description: String,
  comment: String,
  oldValue: String,
  newValue: String,
  staff: {
    username: String,
    fullName: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Quotation schema
const quotationSchema = new mongoose.Schema({
  quotation_id: String,
  amount: {
    type: Number,
    required: true
  },
  description: String,
  items: String, // Simple string description instead of array
  validUntil: Date,
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'expired'],
    default: 'pending'
  },
  sentBy: {
    username: String,
    fullName: String
  },
  sentAt: {
    type: Date,
    default: Date.now
  }
});

const leadSchema = new mongoose.Schema(
  {
    // Unique Lead ID (e.g., NIKUL-2025-001)
    leadId: {
      type: String,
      unique: true,
      sparse: true
    },
    
    // Customer Information
    customer_name: { 
      type: String,
      required: true
    },
    phone: { 
      type: String, 
      required: true
    },
    email: {
      type: String,
      trim: true,
      lowercase: true
    },
    company: {
      type: String
    },
    location: {
      city: String,
      state: String,
      country: String
    },
    
    // Product/Requirement Information
    category: { 
      type: String 
    },
    product: { 
      type: String 
    },
    machine_id: {
      type: String
    },
    requirement_details: {
      type: String
    },
    
    // Sales Pipeline Status
    pipeline_stage: {
      type: String,
      enum: ['new', 'contacted', 'quoted', 'negotiation', 'won', 'lost'],
      default: 'new',
      index: true
    },
    
    // Lead Interest State (from WhatsApp bot)
    interest_state: {
      type: String,
      enum: ['interested', 'not_interested'],
      default: 'interested'
    },
    
    // Administrative Status
    admin_status: {
      type: String,
      enum: ['pending', 'completed'],
      default: 'pending'
    },
    
    // Staff Assignment
    assigned_to: {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AdminUser'
      },
      username: String,
      fullName: String,
      assignedAt: Date
    },
    
    // Quotations
    quotations: [quotationSchema],
    
    // Latest/Active Quotation Amount (for Open Opportunity calculation)
    active_quotation_amount: {
      type: Number,
      default: 0
    },
    
    // Follow-up Information
    next_follow_up: {
      date: Date,
      note: String,
      reminder_sent: {
        type: Boolean,
        default: false
      }
    },
    
    // Priority
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'urgent'],
      default: 'medium'
    },
    
    // Lead Score (for prioritization)
    lead_score: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    
    // Deal Value & Win/Loss
    deal_value: {
      type: Number,
      default: 0
    },
    won_amount: {
      type: Number,
      default: 0
    },
    lost_reason: {
      type: String
    },
    closed_date: {
      type: Date
    },
    
    // Activity History
    activities: [activitySchema],
    
    // Source tracking
    source: { 
      type: String, 
      default: "whatsapp_bot",
      enum: ['whatsapp_bot', 'contact_form', 'manual', 'referral', 'website']
    },
    
    // Additional metadata
    conversation_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Conversation'
    },
    tags: [String],
    notes: String,
    
    // Timestamps
    createdAt: { 
      type: Date, 
      default: Date.now 
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  },
  { 
    collection: "leads",
    timestamps: true
  }
);

// Indexes for better query performance (unique fields already have indexes)
leadSchema.index({ pipeline_stage: 1, assigned_to: 1 });
leadSchema.index({ createdAt: -1 });
leadSchema.index({ 'assigned_to.username': 1 });

// Pre-save hook to generate unique Lead ID
leadSchema.pre('save', async function(next) {
  if (this.isNew && !this.leadId) {
    try {
      const counter = await Counter.findByIdAndUpdate(
        { _id: 'leadId' },
        { $inc: { sequence_value: 1 } },
        { new: true, upsert: true }
      );
      
      const year = new Date().getFullYear();
      const sequenceNumber = String(counter.sequence_value).padStart(4, '0');
      this.leadId = `NIKUL-${year}-${sequenceNumber}`;
    } catch (error) {
      return next(error);
    }
  }
  
  // Update the updatedAt timestamp
  this.updatedAt = new Date();
  next();
});

// Method to add activity
leadSchema.methods.addActivity = function(type, data) {
  this.activities.push({
    type,
    ...data,
    createdAt: new Date()
  });
};

// Method to calculate open opportunity
leadSchema.statics.calculateOpenOpportunity = async function(staffUsername = null) {
  const query = {
    pipeline_stage: { $in: ['quoted', 'negotiation'] },
    active_quotation_amount: { $gt: 0 }
  };
  
  if (staffUsername) {
    query['assigned_to.username'] = staffUsername;
  }
  
  const result = await this.aggregate([
    { $match: query },
    {
      $group: {
        _id: null,
        totalAmount: { $sum: '$active_quotation_amount' },
        leadCount: { $sum: 1 }
      }
    }
  ]);
  
  return result.length > 0 ? result[0] : { totalAmount: 0, leadCount: 0 };
};

// Method to get staff-wise open opportunities
leadSchema.statics.getStaffOpenOpportunities = async function() {
  return await this.aggregate([
    {
      $match: {
        pipeline_stage: { $in: ['quoted', 'negotiation'] },
        active_quotation_amount: { $gt: 0 },
        'assigned_to.username': { $exists: true }
      }
    },
    {
      $group: {
        _id: '$assigned_to.username',
        fullName: { $first: '$assigned_to.fullName' },
        totalAmount: { $sum: '$active_quotation_amount' },
        leadCount: { $sum: 1 }
      }
    },
    { $sort: { totalAmount: -1 } }
  ]);
};

const Lead = mongoose.model("Lead", leadSchema);

export { Lead, Counter };
