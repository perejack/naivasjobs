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

  // Only allow GET requests
  if (req.method !== 'GET') {
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

    // Get reference from query parameters
    const { reference } = req.query;
    
    if (!reference) {
      return res.status(400).json({
        status: false,
        message: 'Reference is required'
      });
    }
    
    console.log('Verifying Paystack transaction:', reference);

    // Make API request to Paystack verify endpoint
    const verifyResponse = await axios.get(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    // Return Paystack verification response
    return res.status(200).json(verifyResponse.data);
  } catch (error) {
    console.error('Paystack verification error:', error.response?.data || error.message);
    
    return res.status(500).json({
      status: false,
      message: 'Failed to verify transaction',
      error: error.response?.data || error.message
    });
  }
}
