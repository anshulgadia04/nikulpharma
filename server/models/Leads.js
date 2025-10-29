import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    phone: { 
      type: String, 
      required: true,
      index: true 
    },
    customer_name: { 
      type: String 
    },
    email: {
      type: String,
      trim: true,
      lowercase: true
    },
    category: { 
      type: String 
    },
    product: { 
      type: String 
    },
    machine_id: {
      type: String
    },
    state: {
      type: String,
      enum: ['interested', 'not_interested'],
      required: true
    },
    source: { 
      type: String, 
      default: "whatsapp_bot" 
    },
    conversation_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Conversation'
    },
    needs_followup: {
      type: Boolean,
      default: false
    },
    followup_date: {
      type: Date
    },
    createdAt: { 
      type: Date, 
      default: Date.now 
    },
  },
  { collection: "leads" }
);

const Lead = mongoose.model("Lead", leadSchema);

export { Lead };
