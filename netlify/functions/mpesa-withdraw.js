const axios = require('axios');

// This function handles M-PESA withdrawals via Paystack
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
    const { phone, amount, currency = 'KES', reference } = data;
    
    if (!phone || !amount) {
      return {
        statusCode: 400,
        body: JSON.stringify({ 
          status: false, 
          message: 'Phone number and amount are required' 
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

    // Format phone number to expected format if needed
    let formattedPhone = phone;
    if (phone.startsWith('0')) {
      formattedPhone = '254' + phone.substring(1);
    } else if (!phone.startsWith('254')) {
      formattedPhone = '254' + phone;
    }

    // In a production environment, you would:
    // 1. Initiate a payout to the user's M-PESA account using Paystack's API
    // 2. Update your database to record the transaction
    
    // For Paystack integration with M-PESA, you might use something like:
    // Note: This is a hypothetical API endpoint - check Paystack docs for actual endpoint
    /*
    const response = await axios.post(
      'https://api.paystack.co/transfer',
      {
        source: 'balance',
        amount: amount * 100,
        recipient: formattedPhone,
        reason: `Withdrawal to M-PESA ${formattedPhone}`,
        reference: reference || `withdraw_${Date.now()}`
      },
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    */
    
    // For now, we'll simulate a successful withdrawal
    // Replace this with actual Paystack API call in production
    const transactionId = 'MPESA' + Date.now();
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        status: true,
        message: 'Withdrawal successful',
        data: {
          transaction_id: transactionId,
          amount: amount,
          phone: formattedPhone,
          currency: currency,
          status: 'completed',
          timestamp: new Date().toISOString()
        }
      })
    };
  } catch (error) {
    console.error('Error processing withdrawal:', error.message);
    
    // Return error response
    return {
      statusCode: 500,
      body: JSON.stringify({
        status: false,
        message: 'Could not process withdrawal',
        error: error.message
      })
    };
  }
};
