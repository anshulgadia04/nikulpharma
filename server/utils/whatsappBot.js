// bot/whatsappBot.js
import axios from "axios";

const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
const WHATSAPP_PHONE_ID = process.env.WHATSAPP_PHONE_ID;
const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN;

// temporary in-memory sessions
const userSessions = new Map();

/**
 * Setup webhook endpoints on the provided Express `app`.
 * models: { Category, Product, Lead }
 */
export function setupWhatsAppBot(app, models) {
  const { Category, Product, Lead } = models;

  // verification endpoint for Meta (GET)
  app.get("/webhook", (req, res) => {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];
    if (mode && token && mode === "subscribe" && token === VERIFY_TOKEN) {
      console.log("✅ WhatsApp Webhook Verified");
      return res.status(200).send(challenge);
    }
    return res.sendStatus(403);
  });

  // webhook receiver for incoming messages and interactive replies (POST)
  app.post("/webhook", async (req, res) => {
    try {
      const data = req.body;
      if (!data.object) return res.sendStatus(200);

      const entry = data.entry?.[0];
      const changes = entry?.changes?.[0];
      const message = changes?.value?.messages?.[0];

      if (!message) return res.sendStatus(200);

      const from = message.from; // whatsapp phone number (string)
      // For button replies the payload is in message.button.payload or message?.interactive?.button_reply
      const buttonPayload =
        message?.button?.payload ||
        message?.interactive?.button_reply?.id ||
        message?.interactive?.list_reply?.id;
      // fallback to free text
      const text = message.text?.body?.trim()?.toLowerCase();

      // If no session, create and immediately send category buttons
      if (!userSessions.has(from)) {
        userSessions.set(from, { step: 1, phone: from });
        await sendCategoryButtons(from, Category);
        return res.sendStatus(200);
      }

      const session = userSessions.get(from);

      // Step 1: user selects category (via button payload)
      if (session.step === 1) {
        const chosenCat = buttonPayload || text;
        if (!chosenCat) {
          await sendText(from, "Please choose a category from the buttons.");
          return res.sendStatus(200);
        }
        session.category = chosenCat;
        session.step = 2;
        userSessions.set(from, session);

        // fetch products for category (limit 3)
        const products = await Product.find({ category: session.category, isActive: true }).limit(3).lean();
        await sendProductButtons(from, products);
        return res.sendStatus(200);
      }

      // Step 2: user selects product
      if (session.step === 2) {
        const chosenProd = buttonPayload || text;
        if (!chosenProd) {
          await sendText(from, "Please pick a product using the buttons.");
          return res.sendStatus(200);
        }
        session.product = chosenProd;
        session.step = 3;
        userSessions.set(from, session);

        await sendInterestButtons(from, session.product);
        return res.sendStatus(200);
      }

      // Step 3: interest yes/no
      if (session.step === 3) {
        const reply = (buttonPayload || text || "").toLowerCase();
        if (reply === "yes" || reply === "interest_yes" || reply === "✅ yes") {
          // create lead
          const leadDoc = await Lead.create({
            phone: session.phone,
            category: session.category,
            product: session.product,
            source: "whatsapp_bot",
            status: "new",
          });
          await sendText(from, "✅ Thanks! We've saved your interest. Our team will contact you soon.");
          console.log("Lead saved:", leadDoc._id);
        } else {
          // not interested
          await sendText(from, "Thanks for checking. If you need anything later, just message us!");
        }
        userSessions.delete(from);
        return res.sendStatus(200);
      }

      res.sendStatus(200);
    } catch (err) {
      console.error("WhatsApp webhook error:", err.response?.data || err.message || err);
      res.sendStatus(500);
    }
  });
}

/**
 * Proactive starter function — call this after you create an inquiry.
 * It will send the initial category buttons to begin the flow.
 */
export async function startBotConversation(phone, CategoryModel = null) {
  if (!phone) return;
  // create a session and attempt to send category buttons
  userSessions.set(phone, { step: 1, phone });
  if (CategoryModel) {
    try {
      // Try to proactively send category buttons for a better UX
      await sendCategoryButtons(phone, CategoryModel);
      return;
    } catch (err) {
      console.error('startBotConversation: sendCategoryButtons failed', err?.response?.data || err?.message || err);
      // fallback to text
    }
  }
  // fallback simple text
  await sendText(phone, "👋 Hi! Thanks for contacting Nikul Pharma. Please choose a category below.");
}

/* -------------------------
   Helper message senders
   ------------------------- */

async function sendText(to, text) {
  try {
    await axios.post(
      `https://graph.facebook.com/v22.0/${WHATSAPP_PHONE_ID}/messages`,
      {
        messaging_product: "whatsapp",
        to,
        type: "text",
        text: { body: text }
      },
      { headers: { Authorization: `Bearer ${WHATSAPP_TOKEN}` } }
    );
  } catch (err) {
    console.error("sendText error:", err.response?.data || err.message);
  }
}

/**
 * Sends category buttons. `CategoryModel` is a Mongoose model
 */
async function sendCategoryButtons(to, CategoryModel) {
  try {
    const categories = await CategoryModel.find({ isActive: true }).sort({ sortOrder: 1 }).lean();
    const buttons = categories.slice(0, 3).map(c => ({
      type: "reply",
      reply: { id: `cat_${c.id || c.name}`, title: c.name }
    }));
    if (buttons.length === 0) {
      // fallback to text
      return sendText(to, "Sorry — no categories available right now.");
    }

    await axios.post(
      `https://graph.facebook.com/v22.0/${WHATSAPP_PHONE_ID}/messages`,
      {
        messaging_product: "whatsapp",
        to,
        type: "interactive",
        interactive: {
          type: "button",
          body: { text: "Please choose a category:" },
          action: { buttons }
        }
      },
      { headers: { Authorization: `Bearer ${WHATSAPP_TOKEN}` } }
    );
  } catch (err) {
    console.error("sendCategoryButtons error:", err.response?.data || err.message);
  }
}

/**
 * Send product buttons. products is an array of product docs
 */
async function sendProductButtons(to, products) {
  try {
    const buttons = products.slice(0, 3).map(p => ({
      type: "reply",
      reply: { id: `prod_${p.slug || p.name}`, title: p.name }
    }));
    if (buttons.length === 0) {
      return sendText(to, "No products found for this category.");
    }
    await axios.post(
      `https://graph.facebook.com/v22.0/${WHATSAPP_PHONE_ID}/messages`,
      {
        messaging_product: "whatsapp",
        to,
        type: "interactive",
        interactive: {
          type: "button",
          body: { text: "Here are some products you might like:" },
          action: { buttons }
        }
      },
      { headers: { Authorization: `Bearer ${WHATSAPP_TOKEN}` } }
    );
  } catch (err) {
    console.error("sendProductButtons error:", err.response?.data || err.message);
  }
}

/**
 * Ask final yes/no interest with buttons
 */
async function sendInterestButtons(to, productName) {
  try {
    const buttons = [
      { type: "reply", reply: { id: "interest_yes", title: "✅ Yes" } },
      { type: "reply", reply: { id: "interest_no", title: "❌ No" } }
    ];
    await axios.post(
      `https://graph.facebook.com/v22.0/${WHATSAPP_PHONE_ID}/messages`,
      {
        messaging_product: "whatsapp",
        to,
        type: "interactive",
        interactive: {
          type: "button",
          body: { text: `Would you like our team to contact you about ${productName}?` },
          action: { buttons }
        }
      },
      { headers: { Authorization: `Bearer ${WHATSAPP_TOKEN}` } }
    );
  } catch (err) {
    console.error("sendInterestButtons error:", err.response?.data || err.message);
  }
}
