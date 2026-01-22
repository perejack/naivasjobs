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
    const { phone } = req.body;
    
    if (!phone) {
      return res.status(400).json({
        status: false,
        message: 'Phone number is required'
      });
    }
    
    console.log('Checking M-PESA status for phone:', phone);
    
    // In a production environment, this would check with the M-PESA API
    // For now, we'll return a fixed response to trigger the activation flow
    
    return res.status(200).json({
      status: true,
      message: "M-PESA status retrieved successfully",
      data: {
        activated: false, // This will trigger the activation flow in the UI
        phone: phone
      }
    });
  } catch (error) {
    console.error('Error checking M-PESA status:', error);
    
    return res.status(500).json({
      status: false,
      message: 'Failed to check M-PESA status',
      error: error.message
    });
  }
}
