const axios = require('axios');

// This function securely initializes a Paystack payment
exports.handler = async function(event, context) {
  // Allow only POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' })
    };
  }

  try {
    // Get request body
    const data = JSON.parse(event.body);
    const { email, amount, currency = 'KES', callback_url, metadata } = data;
    
    if (!email || !amount) {
      return {
        statusCode: 400,
        body: JSON.stringify({ 
          status: false, 
          message: 'Email and amount are required' 
        })
      };
    }

    // Get Paystack API key from environment variable
    const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
    
    if (!PAYSTACK_SECRET_KEY) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          status: false,
          message: 'Server configuration error'
        })
      };
    }

    // Make request to Paystack API
    const response = await axios.post(
      'https://api.paystack.co/transaction/initialize',
      {
        email,
        amount: amount * 100, // Paystack expects amount in kobo, pesewas, cents, etc.
        currency,
        callback_url,
        metadata
      },
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    // Return success response
    return {
      statusCode: 200,
      body: JSON.stringify(response.data)
    };
  } catch (error) {
    console.error('Error initializing payment:', error.response?.data || error.message);
    
    // Return error response
    return {
      statusCode: 500,
      body: JSON.stringify({
        status: false,
        message: 'Could not initialize payment',
        error: error.response?.data || error.message
      })
    };
  }
};
