import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    phone: { type: String, required: true },
    customer_name: { type: String, default: null },
    email: { type: String, default: null },
    category: { type: String, default: null },
    product: { type: String, default: null },
    machine_id: { type: String, default: null },
    state: { 
      type: String, 
      enum: ['interested', 'not_interested'],
      required: true 
    },
    source: { type: String, default: "whatsapp_bot" },
    createdAt: { type: Date, default: Date.now },
  },
  { collection: "leads" }
);

const Lead = mongoose.model("Lead", leadSchema);

export { Lead };
