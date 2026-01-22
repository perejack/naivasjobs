// This function securely provides the Paystack public key from environment variables
exports.handler = async function(event, context) {
  try {
    // Get Paystack public key from environment variable
    const PAYSTACK_PUBLIC_KEY = process.env.PAYSTACK_PUBLIC_KEY;
    
    if (!PAYSTACK_PUBLIC_KEY) {
      return {
        statusCode: 500,
        body: JSON.stringify({
          status: false,
          message: 'Server configuration error: Public key not available'
        })
      };
    }

    // Return the public key
    return {
      statusCode: 200,
      body: JSON.stringify({
        status: true,
        message: 'Public key retrieved',
        data: {
          publicKey: PAYSTACK_PUBLIC_KEY
        }
      })
    };
  } catch (error) {
    console.error('Error retrieving public key:', error.message);
    
    // Return error response
    return {
      statusCode: 500,
      body: JSON.stringify({
        status: false,
        message: 'Could not retrieve public key',
        error: error.message
      })
    };
  }
};
