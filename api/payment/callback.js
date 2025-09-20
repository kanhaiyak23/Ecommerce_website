const crypto = require('crypto');

// PhonePe Configuration
const PHONEPE_CONFIG = {
  merchantId: process.env.PHONEPE_MERCHANT_ID || 'YOUR_MERCHANT_ID',
  saltKey: process.env.PHONEPE_SALT_KEY || 'YOUR_SALT_KEY',
  saltIndex: parseInt(process.env.PHONEPE_SALT_INDEX) || 1,
  environment: process.env.PHONEPE_ENVIRONMENT || 'SANDBOX'
};

// Function to verify checksum
const verifyChecksum = (payload, checksum, saltKey) => {
  const generatedChecksum = crypto.createHash('sha256')
    .update(payload + saltKey)
    .digest('hex');
  return generatedChecksum === checksum;
};

module.exports = async function handler(req, res)  {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed'
    });
  }

  try {
    const { response } = req.body;
    
    if (!response) {
      return res.status(400).json({
        success: false,
        message: 'Response data is required'
      });
    }
    
    // Decode the response
    const decodedResponse = Buffer.from(response, 'base64').toString('utf-8');
    const paymentResponse = JSON.parse(decodedResponse);
    
    // Verify checksum
    const checksum = req.headers['x-verify'];
    if (!checksum) {
      return res.status(400).json({
        success: false,
        message: 'Checksum is required'
      });
    }
    
    const isValidChecksum = verifyChecksum(response, checksum.split('###')[0], PHONEPE_CONFIG.saltKey);
    
    if (!isValidChecksum) {
      return res.status(400).json({
        success: false,
        message: 'Invalid checksum'
      });
    }
    
    // Process payment response
    if (paymentResponse.code === 'PAYMENT_SUCCESS') {
      // Payment successful
      res.status(200).json({
        success: true,
        message: 'Payment successful',
        data: paymentResponse.data
      });
    } else {
      // Payment failed
      res.status(200).json({
        success: false,
        message: 'Payment failed',
        data: paymentResponse.data
      });
    }
    
  } catch (error) {
    console.error('Payment callback error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}
