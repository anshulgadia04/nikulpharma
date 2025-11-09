# Permanent WhatsApp Access Token Setup Guide

## 🔑 Setting Up Permanent Access Token

Your current temporary token expires every 24 hours. For production, you need a **System User Token** that never expires.

---

## 📋 Step-by-Step Guide

### Step 1: Create a System User

1. Go to **Meta Business Settings**:
   ```
   https://business.facebook.com/settings/
   ```

2. In the left sidebar, click **"Users"** → **"System Users"**

3. Click **"Add"** button (top right)

4. Fill in the details:
   - **Name:** `WhatsApp Bot System User` (or any name)
   - **Role:** Select **"Admin"**
   
5. Click **"Create System User"**

---

### Step 2: Assign WhatsApp App to System User

1. Find your newly created System User in the list

2. Click **"Add Assets"** button

3. Select **"Apps"**

4. Find your WhatsApp app in the list

5. Toggle **"Full Control"** (or "Manage App")

6. Click **"Save Changes"**

---

### Step 3: Generate Permanent Token

1. Click on your System User name

2. Click **"Generate New Token"** button

3. In the popup:
   - **App:** Select your WhatsApp Business app
   - **Token Expiration:** Select **"Never"** (60 days is also an option)
   - **Permissions:** Check these boxes:
     - ✅ `whatsapp_business_management`
     - ✅ `whatsapp_business_messaging`
   
4. Click **"Generate Token"**

5. **IMPORTANT:** Copy the token immediately and save it securely
   - You won't be able to see it again!
   - It will look like: `EAAxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` (200+ characters)

---

### Step 4: Update Your .env File

Replace your temporary token with the new permanent token:

```bash
# OLD (temporary - expires in 24 hours)
WHATSAPP_ACCESS_TOKEN=EAAUFWdz0s7gBP2i1RvrFpNJ...

# NEW (permanent - never expires)
WHATSAPP_ACCESS_TOKEN=<paste_your_new_permanent_token_here>
```

---

### Step 5: Test the New Token

Run the token test:

```bash
cd server
node whatsapp-bot/test-token.js
```

Expected output:
```
✅ SUCCESS! Token is valid!
Quality Rating: GREEN
```

---

### Step 6: Restart Your Server

```bash
# Stop the current server (Ctrl+C)
npm start
```

---

## 🔒 Security Best Practices

### 1. Store Token Securely

**For Production:**
- Use environment variables (never commit .env to git)
- Use secret managers:
  - AWS Secrets Manager
  - Azure Key Vault
  - Google Cloud Secret Manager
  - HashiCorp Vault

### 2. Rotate Tokens Periodically

Even permanent tokens should be rotated:
- Every 90 days for high security
- Generate new token
- Update .env
- Restart server

### 3. Monitor Token Usage

Check for unauthorized usage:
- Go to Meta Business Settings
- System Users → Your System User
- View **"Token Activity"**

---

## 💰 WhatsApp API Pricing

### Free Tier
- **First 1,000 conversations/month: FREE** ✅
- Perfect for startups and testing

### Paid Tier (After 1,000 conversations)

**India Pricing:**

| Type | Price per Conversation |
|------|----------------------|
| User-Initiated | ₹0.40 - ₹0.50 ($0.005 USD) |
| Business-Initiated | ₹4.50 - ₹6.00 ($0.06-0.08 USD) |
| Marketing | ₹9.00 - ₹12.00 ($0.12-0.15 USD) |

### What is a Conversation?

- A **24-hour session** with a customer
- Multiple messages in 24 hours = 1 conversation
- After 24 hours idle = new conversation

### Cost Examples

**Your Bot Flow:**
1. User fills form → Inquiry created
2. Bot sends acknowledgment + menu
3. User selects category → Bot replies
4. User selects machine → Bot replies
5. User shows interest → Bot replies

**All of this = 1 conversation** (if within 24 hours)

**Monthly Cost Estimates:**

| Inquiries/Month | Free | Paid | Total Cost |
|----------------|------|------|------------|
| 500 | 500 | 0 | ₹0 (FREE) |
| 1,500 | 1,000 | 500 | ₹2,250 (~$27) |
| 5,000 | 1,000 | 4,000 | ₹18,000 (~$218) |
| 10,000 | 1,000 | 9,000 | ₹40,500 (~$490) |

---

## 📊 Token Types Comparison

| Feature | Temporary Token | System User Token |
|---------|----------------|-------------------|
| Expiration | 24 hours | Never (or 60 days) |
| Manual Refresh | Required daily | Not needed |
| Production Ready | ❌ No | ✅ Yes |
| Security | Medium | High |
| Setup Complexity | Easy | Moderate |
| Cost | Free | Free |

---

## 🚨 Important Notes

### 1. Meta Business Verification

For production (sending to any phone number):
- Your business must be **verified** by Meta
- Requires business documents
- Takes 1-3 business days
- See: `PRODUCTION_APPROVAL_GUIDE.md`

### 2. Phone Number Quality Rating

Maintain **GREEN** rating:
- ✅ Quick response times
- ✅ Low block rates
- ✅ High customer satisfaction
- ❌ Avoid spam behavior

Poor quality = higher costs or account suspension

### 3. Message Templates

For business-initiated messages (after 24 hours):
- Must use **approved templates**
- Submit templates for Meta approval
- Takes 1-2 days for approval

---

## 🔧 Troubleshooting

### Token Not Working After Setup?

1. **Check permissions:**
   - System User has app access
   - Permissions include `whatsapp_business_messaging`

2. **Restart server:**
   ```bash
   npm start
   ```

3. **Clear cache:**
   - Sometimes requires server restart
   - Check .env file is being read correctly

4. **Test token:**
   ```bash
   node whatsapp-bot/test-token.js
   ```

### Error: "Invalid Access Token"

- Token expired (if 60-day token)
- Generate new token
- Update .env file
- Restart server

---

## 📞 Support Resources

- **WhatsApp Business API Docs:** https://developers.facebook.com/docs/whatsapp
- **Pricing:** https://developers.facebook.com/docs/whatsapp/pricing
- **Business Manager:** https://business.facebook.com/
- **Developer Console:** https://developers.facebook.com/apps/

---

## ✅ Production Checklist

Before going live:

- [ ] System User created with permanent token
- [ ] Token tested and working
- [ ] Business verified by Meta (for unrestricted messaging)
- [ ] Phone number quality rating is GREEN
- [ ] Message templates approved (if needed)
- [ ] .env file secured (not in git)
- [ ] Error monitoring setup
- [ ] Cost alerts configured
- [ ] Backup token generated and stored

---

**Status:** Ready for production once permanent token is set up! 🚀
