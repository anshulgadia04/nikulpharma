# WhatsApp Bot Flow Documentation

## Overview
This document describes the WhatsApp bot conversation flows for Nikul Pharma.

## Two Types of Inquiries

### 1. Product-Specific Inquiry (Get Quote from Machine Page)
**Trigger:** User clicks "Get Quote" from a specific machine/product page
**Form Pre-fills:** Product name, subject, message
**User Fills:** Name, email, phone, company

**Bot Flow:**
```
1. Send Welcome Message
   ↓
2. Match product name to machine ID
   ↓
   ├─ If Match Found:
   │  └─ Send Purchase Interest Confirmation
   │     ├─ ✅ Yes, Interested → Send Interest Confirmation → Transfer to Leads
   │     ├─ ❌ Not Now → Send Not Interested Message → Send "Explore More Products" Menu
   │     └─ ℹ️ More Info → Send Product Details
   │
   └─ If No Match:
      └─ Send Generic Product Message → Send Category Menu
```

### 2. General Inquiry (Get Quote from Navbar)
**Trigger:** User clicks "Get Quote" from navbar
**Form:** Empty - user fills all fields
**User Fills:** Name, email, phone, company, subject, message, optional product

**Bot Flow:**
```
1. Send Welcome Message
   ↓
2. Send Product Categories Menu
   ↓
3. User Selects Category
   ↓
4. Send Machines List for Category
   ↓
5. User Selects Machine
   ↓
6. Send Purchase Interest Confirmation
   ├─ ✅ Yes, Interested → Send Interest Confirmation → Transfer to Leads
   ├─ ❌ Not Now → Send Not Interested Message → Send "Explore More Products" Menu
   └─ ℹ️ More Info → Send Product Details
```

## Key Features

### Smart Product Matching
- Automatically matches product names to machine IDs
- Keywords: "Planetary Mixer", "RMG", "FBD", "Centrifuge", etc.
- Falls back to category menu if no match found

### "Not Interested" Flow Enhancement
When user selects "Not Interested":
1. Send acknowledgment message
2. Wait 2 seconds
3. Send "Explore More Products" interactive menu
4. User can browse other categories
5. Conversation stays active (NOT transferred to leads yet)

### Lead Management
**Transfer to Leads when:**
- User selects "Yes, Interested" → State: `interested`
- User completes full flow and shows purchase intent

**NOT transferred to Leads when:**
- User selects "Not Interested" initially (they can still browse)
- User is still browsing categories/machines

## Message Templates

### New Templates Added:
1. **exploreMoreProducts()** - Interactive list shown after "Not Interested"
2. **startProductConversation()** - Handles product-specific inquiries

### Updated Templates:
1. **purchaseInterestNo()** - Simplified message (removed category prompt)
2. **Product matching system** - Maps product names to machine IDs

## Database Schema

### Conversation Collection
```javascript
{
  phone: String,
  customer_name: String,
  email: String,
  state: String, // browsing_categories, viewing_machines, confirming_interest, interested, not_interested
  current_category: String,
  current_machine: String,
  inquiry_id: ObjectId,
  needs_followup: Boolean,
  followup_date: Date
}
```

### Leads Collection
```javascript
{
  phone: String,
  customer_name: String,
  email: String,
  product: String,
  machine_id: String,
  state: String, // interested, not_interested
  source: String, // whatsapp_bot
  conversation_id: ObjectId,
  needs_followup: Boolean,
  followup_date: Date
}
```

## Testing

### Test Product-Specific Flow:
1. Go to any machine page (e.g., Planetary Mixer)
2. Click "Get Quote"
3. Fill the form (product is pre-filled)
4. Submit with WhatsApp opt-in
5. Check WhatsApp for purchase interest confirmation

### Test General Flow:
1. Click "Get Quote" from navbar
2. Fill all fields (no product)
3. Submit with WhatsApp opt-in
4. Check WhatsApp for category menu

### Test "Not Interested" Flow:
1. Complete either flow above
2. When asked about purchase interest, select "Not Interested"
3. Should receive "Explore More Products" menu
4. Can browse other categories

## File Structure

```
server/whatsapp-bot/
├── templates/
│   └── messageTemplates.js      # All message templates
├── services/
│   ├── botLogic.js              # Conversation flow logic
│   ├── botTriggers.js           # Event-triggered messages
│   ├── messageHandler.js        # Incoming message processing
│   └── whatsappService.js       # WhatsApp API wrapper
├── models/
│   └── Conversation.js          # Conversation schema
└── webhooks/
    └── whatsappWebhook.js       # Webhook endpoints
```

## Next Steps (Navbar Get Quote)

For the navbar "Get Quote" flow, we can add additional logic if needed:
- Custom welcome message for navbar inquiries
- Different conversation flow based on inquiry source
- Priority handling for quote requests

Let me know what additional features you'd like for the navbar flow!
