const crypto = require('crypto');
const axios = require('axios');

// PhonePe Configuration
const PHONEPE_CONFIG = {
  merchantId: process.env.PHONEPE_MERCHANT_ID || 'YOUR_MERCHANT_ID',
  saltKey: process.env.PHONEPE_SALT_KEY || 'YOUR_SALT_KEY',
  saltIndex: parseInt(process.env.PHONEPE_SALT_INDEX) || 1,
  environment: process.env.PHONEPE_ENVIRONMENT || 'SANDBOX',
  baseUrl: process.env.PHONEPE_ENVIRONMENT === 'PRODUCTION' 
    ? 'https://api.phonepe.com/apis/pg-sandbox' 
    : 'https://api-preprod.phonepe.com/apis/pg-sandbox'
};

// Function to generate checksum
const generateChecksum = (payload, saltKey) => {
  const hash = crypto.createHash('sha256');
  hash.update(payload + saltKey);
  return hash.digest('hex');
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
    const { merchantId, merchantTransactionId } = req.body;
    
    if (!merchantId || !merchantTransactionId) {
      return res.status(400).json({
        success: false,
        message: 'Merchant ID and Transaction ID are required'
      });
    }
    
    // Prepare status check payload
    const statusRequest = {
      merchantId: merchantId,
      merchantTransactionId: merchantTransactionId
    };
    
    const payload = Buffer.from(JSON.stringify(statusRequest)).toString('base64');
    const checksum = generateChecksum(payload, PHONEPE_CONFIG.saltKey);
    
    // Make request to PhonePe API
    const response = await axios.get(
      `${PHONEPE_CONFIG.baseUrl}/pg/v1/status/${PHONEPE_CONFIG.merchantId}/${merchantTransactionId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-VERIFY': checksum + '###' + PHONEPE_CONFIG.saltIndex,
          'X-MERCHANT-ID': PHONEPE_CONFIG.merchantId,
          'accept': 'application/json'
        }
      }
    );
    
    res.status(200).json({
      success: true,
      data: response.data
    });
    
  } catch (error) {
    console.error('Payment status check error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}
