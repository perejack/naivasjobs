const axios = require('axios');

// This function securely verifies a Paystack payment
exports.handler = async function(event, context) {
  // Get reference from path parameter
  const reference = event.path.split('/').pop();
  
  if (!reference) {
    return {
      statusCode: 400,
      body: JSON.stringify({ 
        status: false, 
        message: 'Reference is required' 
      })
    };
  }

  try {
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

    // Verify the transaction with Paystack
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
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
    console.error('Error verifying payment:', error.response?.data || error.message);
    
    // Return error response
    return {
      statusCode: 500,
      body: JSON.stringify({
        status: false,
        message: 'Could not verify payment',
        error: error.response?.data || error.message
      })
    };
  }
};
