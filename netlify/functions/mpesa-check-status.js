const axios = require('axios');

// This function checks if M-PESA is activated for a user
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
    const { phone } = data;
    
    if (!phone) {
      return {
        statusCode: 400,
        body: JSON.stringify({ 
          status: false, 
          message: 'Phone number is required' 
        })
      };
    }

    // In a production environment, you would:
    // 1. Query your database to check if this user has activated M-PESA
    // 2. Or make an API call to a service that tracks M-PESA activation
    
    // For now, we'll simulate M-PESA activation status
    // In real implementation, replace this with actual database/API check
    const isActivated = await checkMpesaActivation(phone);
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        status: true,
        data: {
          phone: phone,
          activated: isActivated,
          activation_required: !isActivated
        }
      })
    };
  } catch (error) {
    console.error('Error checking M-PESA status:', error.message);
    
    // Return error response
    return {
      statusCode: 500,
      body: JSON.stringify({
        status: false,
        message: 'Could not check M-PESA status',
        error: error.message
      })
    };
  }
};

// Mock function to check M-PESA activation
// Replace this with actual database or API call in production
async function checkMpesaActivation(phone) {
  // For demo purposes: 
  // - Users with phone numbers ending in even digits are considered activated
  // - Users with phone numbers ending in odd digits need activation
  const lastDigit = phone.slice(-1);
  return parseInt(lastDigit) % 2 === 0;
}
