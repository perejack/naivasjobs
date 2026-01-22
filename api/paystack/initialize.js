import axios from 'axios';

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

    // Get request body
    const paymentData = req.body;
    
    // Add a reference if not provided
    if (!paymentData.reference) {
      paymentData.reference = `SWIFTLOAN_${Date.now()}`;
    }
    
    // Ensure amount is in the correct format (in cents)
    if (paymentData.amount && !Number.isInteger(paymentData.amount)) {
      paymentData.amount = Math.round(paymentData.amount * 100);
    }
    
    // If amount is still too small, multiply by 100
    if (paymentData.amount < 1000 && paymentData.currency === 'KES') {
      paymentData.amount = paymentData.amount * 100;
      console.log('Adjusted amount to cents:', paymentData.amount);
    }
    
    console.log('Initializing Paystack payment with:', {
      email: paymentData.email,
      amount: paymentData.amount,
      currency: paymentData.currency,
      reference: paymentData.reference
    });

    // Make API request to Paystack
    const paystackResponse = await axios.post(
      'https://api.paystack.co/transaction/initialize',
      paymentData,
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    // Return Paystack response
    return res.status(200).json(paystackResponse.data);
  } catch (error) {
    console.error('Paystack API error:', error.response?.data || error.message);
    
    return res.status(500).json({
      status: false,
      message: 'Failed to initialize payment',
      error: error.response?.data || error.message
    });
  }
}
