import express from 'express';
import messageHandler from '../services/messageHandler.js';

const router = express.Router();

/**
 * WhatsApp Webhook Routes
 * Receives and processes incoming WhatsApp messages in real-time
 */

/**
 * GET /webhooks/whatsapp
 * Webhook verification endpoint (required by Meta)
 * Meta will call this to verify your webhook URL
 */
router.get('/whatsapp', (req, res) => {
  try {
    console.log('📞 Webhook verification request received');
    console.log('🔑 Expected token from env:', process.env.WHATSAPP_VERIFY_TOKEN);

    // Parse params from the webhook verification request
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    console.log('Mode:', mode);
    console.log('Token received:', token);
    console.log('Challenge:', challenge);

    // Check if a token and mode were sent
    if (mode && token) {
      // Check the mode and token sent are correct
      if (mode === 'subscribe' && token === process.env.WHATSAPP_VERIFY_TOKEN) {
        // Respond with 200 OK and challenge token from the request
        console.log('✅ Webhook verified successfully!');
        res.status(200).send(challenge);
      } else {
        // Responds with '403 Forbidden' if verify tokens do not match
        console.error('❌ Verification failed: Invalid verify token');
        console.error('❌ Expected:', process.env.WHATSAPP_VERIFY_TOKEN);
        console.error('❌ Received:', token);
        res.sendStatus(403);
      }
    } else {
      console.error('❌ Verification failed: Missing mode or token');
      res.sendStatus(400);
    }
  } catch (error) {
    console.error('❌ Webhook verification error:', error.message);
    res.sendStatus(500);
  }
});

/**
 * POST /webhooks/whatsapp
 * Receives incoming WhatsApp messages and events
 * This is called every time a customer sends a message or interacts with your bot
 */
router.post('/whatsapp', async (req, res) => {
  try {
    console.log('\n' + '='.repeat(60));
    console.log('📥 Incoming WhatsApp webhook');
    console.log('='.repeat(60));

    const body = req.body;

    // Log the incoming webhook data
    console.log('Webhook data:', JSON.stringify(body, null, 2));

    // Check if this is a WhatsApp webhook event
    if (body.object !== 'whatsapp_business_account') {
      console.log('⚠️ Not a WhatsApp business account webhook');
      return res.sendStatus(404);
    }

    // Process the webhook data
    const entry = body.entry?.[0];
    const changes = entry?.changes?.[0];
    const value = changes?.value;

    // Check if there are messages
    if (value?.messages && value.messages.length > 0) {
      console.log('📨 Processing incoming message...');

      // Process the message asynchronously (don't block the webhook response)
      messageHandler.processIncomingMessage(body)
        .then(result => {
          if (result.success) {
            console.log('✅ Message processed successfully');
          } else {
            console.log('⚠️ Message processing completed with warnings:', result.reason);
          }
        })
        .catch(error => {
          console.error('❌ Error processing message:', error.message);
        });

      // Respond to WhatsApp immediately (within 20 seconds required)
      res.sendStatus(200);
    } 
    // Check if there are status updates (message delivered, read, etc.)
    else if (value?.statuses && value.statuses.length > 0) {
      console.log('📊 Status update received');
      
      const status = value.statuses[0];
      console.log(`Status: ${status.status} for message ${status.id}`);
      
      // You can handle status updates here (optional)
      // For now, just acknowledge
      res.sendStatus(200);
    }
    // No messages or statuses
    else {
      console.log('ℹ️ No messages or statuses in webhook');
      res.sendStatus(200);
    }

    console.log('='.repeat(60) + '\n');

  } catch (error) {
    console.error('❌ Webhook processing error:', error.message);
    console.error('Full error:', error);
    
    // Still respond with 200 to acknowledge receipt
    // (Failing webhooks can cause WhatsApp to disable your webhook)
    res.sendStatus(200);
  }
});

/**
 * Test endpoint to simulate webhook (for development/testing)
 */
router.post('/whatsapp/test', async (req, res) => {
  try {
    console.log('🧪 Test webhook called');
    
    const testData = req.body || {
      object: 'whatsapp_business_account',
      entry: [{
        changes: [{
          value: {
            messages: [{
              from: '916375591682',
              id: 'test_' + Date.now(),
              timestamp: Math.floor(Date.now() / 1000),
              type: 'interactive',
              interactive: {
                type: 'list_reply',
                list_reply: {
                  id: req.body.selection || 'cat_mixing',
                  title: 'Test Selection'
                }
              }
            }],
            contacts: [{
              profile: {
                name: 'Test User'
              },
              wa_id: '916375591682'
            }]
          }
        }]
      }]
    };

    const result = await messageHandler.processIncomingMessage(testData);

    res.json({
      success: true,
      message: 'Test webhook processed',
      result: result
    });

  } catch (error) {
    console.error('❌ Test webhook error:', error.message);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

export default router;
