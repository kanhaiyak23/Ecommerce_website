// const express = require('express');
// const cors = require('cors');
// const crypto = require('crypto');
// const axios = require('axios');
// const path = require('path');

// const app = express();
// const PORT = process.env.PORT || 5001;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Serve static files from React build directory in production
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, 'build')));
// }

// // PhonePe Configuration
// const PHONEPE_CONFIG = {
//   merchantId: process.env.PHONEPE_MERCHANT_ID || 'YOUR_MERCHANT_ID',
//   saltKey: process.env.PHONEPE_SALT_KEY || 'YOUR_SALT_KEY',
//   saltIndex: parseInt(process.env.PHONEPE_SALT_INDEX) || 1,
//   environment: process.env.PHONEPE_ENVIRONMENT || 'SANDBOX',
//   baseUrl: process.env.PHONEPE_ENVIRONMENT === 'PRODUCTION' 
//     ? 'https://api.phonepe.com/apis/pg-sandbox' 
//     : 'https://api-preprod.phonepe.com/apis/pg-sandbox',
//   redirectUrl: process.env.FRONTEND_URL 
//     ? `${process.env.FRONTEND_URL}/payment-success`
//     : 'http://localhost:3000/payment-success',
//   cancelUrl: process.env.FRONTEND_URL 
//     ? `${process.env.FRONTEND_URL}/payment-cancel`
//     : 'http://localhost:3000/payment-cancel'
// };

// // Function to generate checksum
// const generateChecksum = (payload, saltKey) => {
//   const hash = crypto.createHash('sha256');
//   hash.update(payload + saltKey);
//   return hash.digest('hex');
// };

// // Function to verify checksum
// const verifyChecksum = (payload, checksum, saltKey) => {
//   const generatedChecksum = generateChecksum(payload, saltKey);
//   return generatedChecksum === checksum;
// };

// // Route to initiate payment
// app.post('/api/payment/initiate', async (req, res) => {
//   try {
//     const { amount, customerName, customerEmail, customerPhone, orderData } = req.body;

//     // Validate input
//     if (!amount || !customerName || !customerEmail || !customerPhone) {
//       return res.status(400).json({
//         success: false,
//         message: 'All fields are required'
//       });
//     }

//     if (parseFloat(amount) <= 0) {
//       return res.status(400).json({
//         success: false,
//         message: 'Amount must be greater than 0'
//       });
//     }

//     // Generate unique transaction ID
//     const merchantTransactionId = `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
//     const merchantUserId = `USER_${Date.now()}`;

//     // Prepare payment request payload
//     const paymentRequest = {
//       merchantId: PHONEPE_CONFIG.merchantId,
//       merchantTransactionId: merchantTransactionId,
//       merchantUserId: merchantUserId,
//       amount: parseFloat(amount) * 100, // Amount in paise
//       redirectUrl: PHONEPE_CONFIG.redirectUrl,
//       redirectMode: 'POST',
//       callbackUrl: PHONEPE_CONFIG.redirectUrl,
//       mobileNumber: customerPhone,
//       paymentInstrument: {
//         type: 'PAY_PAGE'
//       }
//     };

//     // Convert to base64
//     const payload = Buffer.from(JSON.stringify(paymentRequest)).toString('base64');
    
//     // Generate checksum
//     const checksum = generateChecksum(payload, PHONEPE_CONFIG.saltKey);

//     // Prepare request for PhonePe API
//     const phonePeRequest = {
//       request: payload
//     };

//     // Make request to PhonePe API
//     const response = await axios.post(
//       `${PHONEPE_CONFIG.baseUrl}/pg/v1/pay`,
//       phonePeRequest,
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           'X-VERIFY': checksum + '###' + PHONEPE_CONFIG.saltIndex,
//           'accept': 'application/json'
//         }
//       }
//     );

//     if (response.data.success) {
//       // Log order data for reference (in production, save to database)
//       console.log('Order Data:', {
//         orderId: orderData?.orderId,
//         items: orderData?.items,
//         customerInfo: { customerName, customerEmail, customerPhone },
//         totalAmount: amount,
//         transactionId: merchantTransactionId
//       });

//       res.json({
//         success: true,
//         data: {
//           paymentUrl: response.data.data.instrumentResponse.redirectInfo.url,
//           transactionId: merchantTransactionId,
//           orderId: orderData?.orderId
//         }
//       });
//     } else {
//       res.status(400).json({
//         success: false,
//         message: 'Payment initiation failed'
//       });
//     }

//   } catch (error) {
//     console.error('Payment initiation error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Internal server error'
//     });
//   }
// });

// // Route to handle payment callback
// app.post('/api/payment/callback', (req, res) => {
//   try {
//     const { response } = req.body;
    
//     // Decode the response
//     const decodedResponse = Buffer.from(response, 'base64').toString('utf-8');
//     const paymentResponse = JSON.parse(decodedResponse);
    
//     // Verify checksum
//     const checksum = req.headers['x-verify'];
//     const isValidChecksum = verifyChecksum(response, checksum.split('###')[0], PHONEPE_CONFIG.saltKey);
    
//     if (!isValidChecksum) {
//       return res.status(400).json({
//         success: false,
//         message: 'Invalid checksum'
//       });
//     }
    
//     // Process payment response
//     if (paymentResponse.code === 'PAYMENT_SUCCESS') {
//       // Payment successful
//       res.json({
//         success: true,
//         message: 'Payment successful',
//         data: paymentResponse.data
//       });
//     } else {
//       // Payment failed
//       res.json({
//         success: false,
//         message: 'Payment failed',
//         data: paymentResponse.data
//       });
//     }
    
//   } catch (error) {
//     console.error('Payment callback error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Internal server error'
//     });
//   }
// });

// // Route to check payment status
// app.post('/api/payment/status', async (req, res) => {
//   try {
//     const { merchantId, merchantTransactionId } = req.body;
    
//     // Prepare status check payload
//     const statusRequest = {
//       merchantId: merchantId,
//       merchantTransactionId: merchantTransactionId
//     };
    
//     const payload = Buffer.from(JSON.stringify(statusRequest)).toString('base64');
//     const checksum = generateChecksum(payload, PHONEPE_CONFIG.saltKey);
    
//     // Make request to PhonePe API
//     const response = await axios.get(
//       `${PHONEPE_CONFIG.baseUrl}/pg/v1/status/${PHONEPE_CONFIG.merchantId}/${merchantTransactionId}`,
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           'X-VERIFY': checksum + '###' + PHONEPE_CONFIG.saltIndex,
//           'X-MERCHANT-ID': PHONEPE_CONFIG.merchantId,
//           'accept': 'application/json'
//         }
//       }
//     );
    
//     res.json({
//       success: true,
//       data: response.data
//     });
    
//   } catch (error) {
//     console.error('Payment status check error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Internal server error'
//     });
//   }
// });

// // Health check route
// app.get('/api/health', (req, res) => {
//   res.json({
//     success: true,
//     message: 'Server is running',
//     timestamp: new Date().toISOString()
//   });
// });

// // Serve React app for all non-API routes in production
// if (process.env.NODE_ENV === 'production') {
//   app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
//   });
// }

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
//   console.log(`Health check: http://localhost:${PORT}/api/health`);
//   if (process.env.NODE_ENV === 'production') {
//     console.log('Production mode: Serving React app from build directory');
//   }
// });
