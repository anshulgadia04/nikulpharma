# 🌐 WhatsApp Webhook Setup Guide

## ✅ What's Been Implemented

Your WhatsApp webhook handler is now ready! Here's what it does:

### Webhook Endpoints Created:

1. **GET `/webhooks/whatsapp`** - Webhook verification (for Meta)
2. **POST `/webhooks/whatsapp`** - Receives real WhatsApp messages
3. **POST `/webhooks/whatsapp/test`** - Local testing endpoint

### Real-Time Message Processing:

When a customer interacts with your bot:
```
Customer clicks button on WhatsApp →
WhatsApp sends webhook to your server →
Webhook handler processes the click →
Bot sends appropriate response →
Everything saved to database
```

---

## 🧪 Step 1: Test Locally (Right Now)

### Start Your Server:
```bash
npm start
# or
node index.js
```

You should see:
```
API server listening on http://localhost:5174
📱 WhatsApp webhook ready at http://localhost:5174/webhooks/whatsapp
```

### Test the Webhook:

In a new terminal:
```bash
node whatsapp-bot/test-webhook-local.js
```

This will simulate:
1. Customer selecting a category
2. Customer selecting a machine
3. Customer clicking "Yes, Interested"

**Check your WhatsApp** - you'll receive all the messages!

---

## 🌍 Step 2: Expose Webhook to Internet (For Production)

WhatsApp needs to send webhooks to a **publicly accessible URL**. You have 3 options:

### Option A: Use ngrok (Quick - For Testing)

**Install ngrok:**
```bash
# Download from: https://ngrok.com/download
# Or use npm:
npm install -g ngrok
```

**Expose your local server:**
```bash
# In a new terminal:
ngrok http 5174
```

You'll get a URL like:
```
https://abc123.ngrok.io
```

Your webhook URL will be:
```
https://abc123.ngrok.io/webhooks/whatsapp
```

### Option B: Deploy to Production Server

Deploy your app to:
- **Heroku**: `https://your-app.herokuapp.com/webhooks/whatsapp`
- **Railway**: `https://your-app.railway.app/webhooks/whatsapp`
- **DigitalOcean**: `https://your-domain.com/webhooks/whatsapp`
- **AWS/Azure**: Your server URL + `/webhooks/whatsapp`

### Option C: Use VPS with Domain

If you have a domain:
```
https://api.nikulpharma.com/webhooks/whatsapp
```

---

## 📋 Step 3: Configure Webhook in Meta Developer Console

### 1. Go to Meta Developer Console
https://developers.facebook.com/apps/

### 2. Select Your App → WhatsApp → Configuration

### 3. Find "Webhook" Section

### 4. Click "Edit" or "Configure Webhooks"

### 5. Enter Your Webhook Details:

**Callback URL:**
```
https://your-public-url.com/webhooks/whatsapp
```

**Verify Token:**
```
nikul_pharma_secure_token_2025
```
(This is from your `.env` file: `WHATSAPP_VERIFY_TOKEN`)

### 6. Click "Verify and Save"

Meta will send a GET request to verify your webhook. Your server will respond automatically!

### 7. Subscribe to Webhook Fields

Check these fields:
- ✅ **messages** (required - to receive customer messages)
- ✅ **message_status** (optional - to track delivery status)

### 8. Click "Save"

---

## 🎯 Step 4: Test with Real WhatsApp

### 1. Send a test message to your WhatsApp number

From your phone (or test number), send a message to your WhatsApp Business number.

### 2. Check your server logs

You should see:
```
📥 Incoming WhatsApp webhook
📨 Processing incoming message...
✅ Message processed successfully
```

### 3. Customer journey test:

1. Customer sends "Hi" → Gets category menu
2. Clicks "Mixing Equipment" → Gets machines list
3. Clicks "Planetary Mixer" → Gets purchase interest
4. Clicks "Yes" → Gets confirmation + thank you

---

## 🔍 Troubleshooting

### Webhook Not Receiving Messages?

**Check 1: Server is running**
```bash
curl http://localhost:5174/health
# Should return: {"ok":true}
```

**Check 2: Webhook is accessible**
```bash
curl https://your-public-url.com/webhooks/whatsapp
# Should return: 400 or 403 (that's OK - it's checking for verification params)
```

**Check 3: Verify token matches**
In your `.env`:
```
WHATSAPP_VERIFY_TOKEN=nikul_pharma_secure_token_2025
```

In Meta console: Same value

**Check 4: Check server logs**
```bash
# Watch for incoming webhooks:
npm start
# Look for: "📥 Incoming WhatsApp webhook"
```

### Webhook Returns Errors?

**Error 403:** Verify token mismatch
- Check `.env` file
- Check Meta console settings

**Error 500:** Server error
- Check server logs
- Check MongoDB connection
- Check all imports are correct

**Error 404:** Route not found
- Make sure server restarted after adding webhook routes
- Check URL is: `/webhooks/whatsapp` (not `/webhook` or `/whatsapp`)

---

## 📊 Monitor Webhooks

### View Incoming Webhooks:
Watch your server console - every webhook is logged with full details.

### View in Database:
```javascript
// All conversations with messages
const conversations = await Conversation.find()
  .sort({ last_message_at: -1 })
  .limit(10);
```

### Check Webhook Health in Meta:
Meta Developer Console → WhatsApp → Configuration → Webhooks

Shows:
- ✅ Status (active/inactive)
- Last successful delivery
- Error rate

---

## 🎉 Success Criteria

You'll know it's working when:

1. ✅ Server shows: "📱 WhatsApp webhook ready at..."
2. ✅ ngrok/public URL is accessible
3. ✅ Meta webhook verification succeeds
4. ✅ Customer sends message → Server logs show webhook received
5. ✅ Bot responds automatically
6. ✅ Database shows conversation with messages

---

## 🚀 Quick Start Commands

```bash
# Terminal 1: Start server
npm start

# Terminal 2: Expose to internet (if using ngrok)
ngrok http 5174

# Terminal 3: Test locally first
node whatsapp-bot/test-webhook-local.js
```

---

## 📞 Need Help?

- **Webhook not verifying?** Check verify token matches
- **Not receiving messages?** Check webhook subscriptions in Meta
- **Server errors?** Check logs for detailed error messages
- **Database issues?** Make sure MongoDB is running

---

## ✅ Next Steps

1. [ ] Start your server
2. [ ] Test locally with test-webhook-local.js
3. [ ] Expose server with ngrok (or deploy)
4. [ ] Configure webhook in Meta console
5. [ ] Test with real WhatsApp message
6. [ ] Monitor logs and database
7. [ ] Go live! 🎉

Your webhook is ready to receive real customer interactions! 🚀
