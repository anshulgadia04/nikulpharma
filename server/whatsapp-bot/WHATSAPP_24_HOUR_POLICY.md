# WhatsApp 24-Hour Messaging Policy

## Overview
WhatsApp Business API has a **24-hour conversation window** policy to prevent spam and ensure quality customer conversations.

## The Rules

### ✅ Within 24 Hours (Customer Initiated)
After a customer sends you a message, you have **24 hours** to send:
- ✅ Any text messages
- ✅ Images, videos, documents
- ✅ Interactive messages (buttons, lists)
- ✅ Location messages
- ✅ Any type of response

### ❌ After 24 Hours (Business Initiated)
Once 24 hours pass without customer reply, you can ONLY send:
- ✅ Pre-approved **Message Templates** (reviewed by Meta)
- ❌ Regular text messages → Will fail with error **131047**
- ❌ Interactive buttons/lists → Will fail with error **131047**

## Error Code 131047
```
"Re-engagement message"
Message failed to send because more than 24 hours have passed 
since the customer last replied to this number.
```

## Solution Implemented

### Automatic Fallback
Our system now automatically handles the 24-hour window:

```javascript
// Try to send regular message
try {
  await sendTextMessage(phone, message);
} catch (error) {
  // If 24-hour window expired, use template
  if (error.code === 131047) {
    await sendTemplateMessage(phone, 'hello_world');
  }
}
```

### What Happens:
1. **Within 24 hours**: Sends personalized inquiry acknowledgment + interactive menu
2. **After 24 hours**: Sends approved template message (hello_world)
3. **Customer replies**: 24-hour window resets, full conversation resumes

## Message Templates

### Current Approved Templates:
1. **hello_world** (Default Meta template)
   - Always approved for new accounts
   - Generic greeting message

### Creating Custom Templates:

1. Go to [Meta Business Manager](https://business.facebook.com)
2. Navigate to: **WhatsApp Manager → Message Templates**
3. Click **Create Template**
4. Choose template category:
   - **UTILITY**: Order updates, account notifications
   - **MARKETING**: Promotions, offers (requires opt-in)
   - **AUTHENTICATION**: OTPs, verification codes

### Example: Inquiry Acknowledgment Template

**Template Name:** `inquiry_received`
**Category:** UTILITY
**Language:** English

**Message:**
```
Hello {{1}},

Thank you for your inquiry about {{2}}!

We've received your request (ID: {{3}}) and our team will contact you within 24 hours.

For immediate assistance, reply to this message.

- Nikul Pharma
```

**Variables:**
- {{1}} = Customer name
- {{2}} = Product/Service
- {{3}} = Inquiry ID

### Sending Custom Template:
```javascript
await whatsappService.sendTemplateMessage(
  phone,
  'inquiry_received',
  'en_US',
  [
    {
      type: 'body',
      parameters: [
        { type: 'text', text: customerName },
        { type: 'text', text: productName },
        { type: 'text', text: inquiryId }
      ]
    }
  ]
);
```

## Best Practices

### 1. Respond Quickly
- Reply within 24 hours to maintain conversation window
- Use automation for immediate acknowledgment

### 2. Use Templates Strategically
- Create templates for common scenarios:
  - Order confirmations
  - Appointment reminders
  - Follow-up messages
  - Re-engagement campaigns

### 3. Track Conversation Windows
- Store `last_customer_reply` timestamp in database
- Check before sending messages
- Use template if > 24 hours

### 4. Encourage Customer Replies
- Ask open-ended questions
- Use interactive buttons (within 24h)
- Provide value to keep conversation active

## Testing

### Test 24-Hour Behavior:

```bash
# 1. Send initial inquiry
curl -X POST http://localhost:5174/inquiries \
  -H "Content-Type: application/json" \
  -d '{"phone":"919602021473","email":"test@test.com"}'

# 2. Wait for messages to be sent

# 3. Don't reply for 24+ hours

# 4. Send another inquiry
# → System will automatically use template message
```

## Monitoring

### Log Messages:
```
✅ Acknowledgment message sent to 919602021473
   → Regular message (within 24h)

⏰ 24-hour window expired for 919602021473, using template message...
✅ Template message sent to 919602021473
   → Template fallback (after 24h)
```

### Database Tracking:
```javascript
conversation: {
  last_customer_message: Date,
  window_expired: Boolean,
  template_used: Boolean
}
```

## Production Checklist

- [ ] Create custom templates for common scenarios
- [ ] Submit templates for Meta approval (2-3 days)
- [ ] Test template messages with your number
- [ ] Implement conversation window tracking
- [ ] Set up automated template fallback (✅ Already done!)
- [ ] Monitor error codes 131047
- [ ] Document approved templates

## Resources

- [WhatsApp Business Policy](https://developers.facebook.com/docs/whatsapp/pricing#conversations)
- [Message Templates Guide](https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates)
- [Error Codes Reference](https://developers.facebook.com/docs/whatsapp/cloud-api/support/error-codes)

## Need Help?

If you see error 131047:
1. ✅ It's expected after 24 hours
2. ✅ System automatically uses template
3. ✅ Customer just needs to reply once
4. ✅ Then full conversation resumes
