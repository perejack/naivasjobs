import crypto from 'crypto';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');

  // Handle OPTIONS request for CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
    
    if (!PAYSTACK_SECRET_KEY) {
      return res.status(500).json({ 
        status: false, 
        message: 'Server configuration error: Missing API key' 
      });
    }

    // Verify that the request is from Paystack
    const hash = crypto.createHmac('sha512', PAYSTACK_SECRET_KEY)
                       .update(JSON.stringify(req.body))
                       .digest('hex');

    if (hash !== req.headers['x-paystack-signature']) {
      console.error('Invalid Paystack signature');
      return res.status(400).send('Invalid signature');
    }

    // Process the webhook event
    const event = req.body;
    console.log('Received Paystack webhook event:', event.event);

    // Handle different event types
    switch(event.event) {
      case 'charge.success':
        console.log('Payment successful for reference:', event.data.reference);
        // Here you can update your database or perform other actions
        break;
        
      default:
        console.log('Unhandled event type:', event.event);
    }

    // Return success response
    return res.status(200).send('Webhook received');
  } catch (error) {
    console.error('Webhook error:', error);
    return res.status(500).send('Webhook processing failed');
  }
}
