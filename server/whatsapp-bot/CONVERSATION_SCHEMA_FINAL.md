# Conversation Schema - Final Structure

## ✅ Schema Update Complete

### Fields Present in Conversation Collection

```javascript
{
  _id: ObjectId,                          // Auto-generated MongoDB ID
  phone: String (required, indexed),      // Customer phone number
  whatsapp_id: String (indexed),          // WhatsApp ID
  customer_name: String,                  // Customer name
  email: String,                          // ✅ NEW: Customer email
  state: String (enum),                   // Conversation state
  current_category: String,               // ✅ KEPT: Currently viewing category
  current_machine: String,                // ✅ KEPT: Currently viewing machine
  needs_followup: Boolean,                // ✅ KEPT: Followup flag
  followup_date: Date,                    // ✅ KEPT: Followup date/time
  createdAt: Date,                        // ✅ KEPT: Auto-generated (timestamps: true)
  updatedAt: Date                         // ✅ KEPT: Auto-generated (timestamps: true)
}
```

### ❌ Removed Fields

These fields were removed from the schema:

1. ❌ `selected_machines` (Array)
2. ❌ `inquiry_id` (ObjectId reference)
3. ❌ `is_active` (Boolean)
4. ❌ `total_messages` (Number)
5. ❌ `tags` (Array)
6. ❌ `messages` (Array of message objects)
7. ❌ `button_clicks` (Array of button interactions)
8. ❌ `last_message_at` (Date)
9. ❌ `last_interaction_type` (String)
10. ❌ `response_time_avg` (Number)
11. ❌ `notes` (String)
12. ❌ `__v` (Version key - disabled with `versionKey: false`)

### State Enum Values

The conversation can be in one of these states:

- `new` - New conversation
- `welcomed` - Welcome message sent
- `browsing_categories` - Viewing product categories
- `viewing_machines` - Viewing machines in a category
- `confirming_interest` - Asked about purchase interest
- `interested` - Customer showed interest
- `not_interested` - Customer not interested
- `completed` - Conversation completed
- `idle` - No recent activity

### Schema Configuration

```javascript
{
  timestamps: true,           // Enables createdAt and updatedAt
  collection: 'conversations',
  versionKey: false          // Disables __v field
}
```

### Indexes

1. `phone` (ascending)
2. `state + updatedAt` (descending)
3. `createdAt` (descending)

### Methods

**Instance Methods:**
- `updateState(newState, context)` - Update conversation state and context

**Static Methods:**
- `findActiveByPhone(phone)` - Find most recent conversation by phone
- `findOrCreateByPhone(phone, initialData)` - Find or create conversation

### Data Flow

```
User Interaction → Conversation Created
                ↓
User browses categories/machines
                ↓
User shows interest (Yes/No)
                ↓
Conversation → Lead (transferred)
                ↓
Conversation Deleted ✅
```

### Example Document

```json
{
  "_id": "6901d73268d94f2590173acd",
  "phone": "919876543210",
  "whatsapp_id": "wa_id_12345",
  "customer_name": "Anshul Gadia",
  "email": "anshul@example.com",
  "state": "confirming_interest",
  "current_category": "cat_centrifuge",
  "current_machine": "machine_basket_centrifuge",
  "needs_followup": true,
  "followup_date": "2025-10-29T12:30:18.594Z",
  "createdAt": "2025-10-29T08:27:56.203Z",
  "updatedAt": "2025-10-29T08:27:57.205Z"
}
```

---

## ✅ Verification

All changes have been tested and verified:
- ✅ Schema structure confirmed
- ✅ Removed fields no longer present
- ✅ New email field added
- ✅ Automatic timestamps working
- ✅ Version key disabled
- ✅ All methods updated
- ✅ Transfer to leads working
- ✅ No breaking changes

**Status:** Ready for production ✅
