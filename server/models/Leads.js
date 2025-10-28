import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    phone: String,
    category: String,
    product: String,
    source: { type: String, default: "whatsapp_bot" },
    createdAt: { type: Date, default: Date.now },
  },
  { collection: "leads" }
);

const Lead = mongoose.model("Lead", leadSchema);

export { Lead };
