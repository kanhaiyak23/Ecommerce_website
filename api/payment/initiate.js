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
    : 'https://api-preprod.phonepe.com/apis/pg-sandbox',
  redirectUrl: process.env.FRONTEND_URL 
    ? `${process.env.FRONTEND_URL}/payment-success`
    : 'http://localhost:3000/payment-success',
  cancelUrl: process.env.FRONTEND_URL 
    ? `${process.env.FRONTEND_URL}/payment-cancel`
    : 'http://localhost:3000/payment-cancel'
};

// Function to generate checksum
const generateChecksum = (payload, saltKey) => {
  const hash = crypto.createHash('sha256');
  hash.update(payload + saltKey);
  return hash.digest('hex');
};

module.exports = async function handler(req, res) {
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
    const { amount, customerName, customerEmail, customerPhone, orderData } = req.body;

    // Validate input
    if (!amount || !customerName || !customerEmail || !customerPhone) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    if (parseFloat(amount) <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Amount must be greater than 0'
      });
    }

    // Generate unique transaction ID
    const merchantTransactionId = `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const merchantUserId = `USER_${Date.now()}`;

    // Prepare payment request payload
    const paymentRequest = {
      merchantId: PHONEPE_CONFIG.merchantId,
      merchantTransactionId: merchantTransactionId,
      merchantUserId: merchantUserId,
      amount: parseFloat(amount) * 100, // Amount in paise
      redirectUrl: PHONEPE_CONFIG.redirectUrl,
      redirectMode: 'POST',
      callbackUrl: PHONEPE_CONFIG.redirectUrl,
      mobileNumber: customerPhone,
      paymentInstrument: {
        type: 'PAY_PAGE'
      }
    };

    // Convert to base64
    const payload = Buffer.from(JSON.stringify(paymentRequest)).toString('base64');
    
    // Generate checksum
    const checksum = generateChecksum(payload, PHONEPE_CONFIG.saltKey);

    // Prepare request for PhonePe API
    const phonePeRequest = {
      request: payload
    };

    // Make request to PhonePe API
    const response = await axios.post(
      `${PHONEPE_CONFIG.baseUrl}/pg/v1/pay`,
      phonePeRequest,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-VERIFY': checksum + '###' + PHONEPE_CONFIG.saltIndex,
          'accept': 'application/json'
        }
      }
    );

    if (response.data.success) {
      // Log order data for reference (in production, save to database)
      console.log('Order Data:', {
        orderId: orderData?.orderId,
        items: orderData?.items,
        customerInfo: { customerName, customerEmail, customerPhone },
        totalAmount: amount,
        transactionId: merchantTransactionId
      });

      res.status(200).json({
        success: true,
        data: {
          paymentUrl: response.data.data.instrumentResponse.redirectInfo.url,
          transactionId: merchantTransactionId,
          orderId: orderData?.orderId
        }
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Payment initiation failed'
      });
    }

  } catch (error) {
    console.error('Payment initiation error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}
