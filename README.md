# T-Shirt E-Commerce Store with PhonePe Payment Integration

A complete React.js e-commerce application for selling t-shirts with PhonePe payment gateway integration. Users can browse products, add items to cart, and complete purchases with secure payment processing.

## Features

- 🛍️ **E-Commerce Store**: Browse and purchase premium t-shirts
- 🎨 **Modern UI Design**: Beautiful, responsive interface with product galleries
- 🛒 **Shopping Cart**: Add/remove items, quantity management, persistent cart
- 💳 **PhonePe Integration**: Secure payment processing with checksum verification
- 🔍 **Product Search & Filter**: Find products by category, price, rating
- 📱 **Mobile-Friendly**: Optimized for all device sizes
- ✅ **Order Management**: Complete checkout flow with order tracking
- 🚀 **Real-time Updates**: Live cart updates and payment status

## Prerequisites

Before running this application, make sure you have:

- Node.js (v14 or higher)
- npm or yarn
- PhonePe merchant account and credentials

## PhonePe Setup

1. **Register with PhonePe**: Sign up for a PhonePe merchant account at [PhonePe Business](https://business.phonepe.com/)

2. **Get Credentials**: Obtain the following from your PhonePe dashboard:
   - Merchant ID
   - Salt Key
   - Salt Index

3. **Configure Environment**: Update the configuration in both frontend and backend files:
   - `src/components/PaymentForm.js` (frontend config)
   - `server.js` (backend config)

## Installation

1. **Clone or download the project**:
   ```bash
   cd /Users/kk/payment_gateway
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure PhonePe credentials**:
   
   Update `src/components/PaymentForm.js`:
   ```javascript
   const PHONEPE_CONFIG = {
     merchantId: 'YOUR_MERCHANT_ID', // Replace with your actual merchant ID
     saltKey: 'YOUR_SALT_KEY', // Replace with your actual salt key
     saltIndex: 1, // Replace with your actual salt index
     environment: 'SANDBOX', // Change to 'PRODUCTION' for live environment
     redirectUrl: 'http://localhost:3000/payment-success',
     cancelUrl: 'http://localhost:3000/payment-cancel'
   };
   ```

   Update `server.js`:
   ```javascript
   const PHONEPE_CONFIG = {
     merchantId: 'YOUR_MERCHANT_ID', // Replace with your actual merchant ID
     saltKey: 'YOUR_SALT_KEY', // Replace with your actual salt key
     saltIndex: 1, // Replace with your actual salt index
     environment: 'SANDBOX', // Change to 'PRODUCTION' for live environment
     baseUrl: 'https://api-preprod.phonepe.com/apis/pg-sandbox', // Change for production
     redirectUrl: 'http://localhost:3000/payment-success',
     cancelUrl: 'http://localhost:3000/payment-cancel'
   };
   ```

## Running the Application

### Development Mode

1. **Start the backend server** (Terminal 1):
   ```bash
   node server.js
   ```
   The server will run on `http://localhost:5000`

2. **Start the React frontend** (Terminal 2):
   ```bash
   npm start
   ```
   The frontend will run on `http://localhost:3000`

3. **Open your browser** and navigate to `http://localhost:3000`

### Production Mode

1. **Build the React app**:
   ```bash
   npm run build
   ```

2. **Start the production server**:
   ```bash
   node server.js
   ```

## Project Structure

```
payment_gateway/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── ProductCard.js          # Individual product card component
│   │   ├── ProductCard.css         # Product card styles
│   │   ├── ProductCatalog.js       # Product catalog with filters
│   │   ├── ProductCatalog.css      # Catalog styles
│   │   ├── ShoppingCart.js         # Shopping cart component
│   │   ├── ShoppingCart.css        # Cart styles
│   │   ├── Checkout.js             # Checkout form component
│   │   ├── Checkout.css            # Checkout styles
│   │   ├── PaymentSuccess.js       # Payment success page
│   │   ├── PaymentSuccess.css      # Success page styles
│   │   ├── PaymentCancel.js        # Payment cancel page
│   │   └── PaymentCancel.css       # Cancel page styles
│   ├── context/
│   │   └── CartContext.js          # Shopping cart state management
│   ├── data/
│   │   └── products.js             # Product data and utilities
│   ├── App.js                      # Main app component with routing
│   ├── App.css                     # App styles
│   ├── index.js                    # React entry point
│   └── index.css                   # Global styles
├── server.js                       # Backend server with PhonePe integration
├── package.json                    # Dependencies and scripts
└── README.md                       # This file
```

## API Endpoints

### Backend API Routes

- `POST /api/payment/initiate` - Initiate payment with PhonePe
- `POST /api/payment/callback` - Handle payment callback from PhonePe
- `POST /api/payment/status` - Check payment status
- `GET /api/health` - Health check endpoint

### Frontend Routes

- `/` - Product catalog and shopping
- `/checkout` - Checkout and payment form
- `/payment-success` - Payment success page
- `/payment-cancel` - Payment cancel page

## Usage

1. **Browse Products**:
   - View t-shirt catalog with categories and filters
   - Search for specific products
   - See product details, sizes, colors, and pricing

2. **Add to Cart**:
   - Select size and color options
   - Add items to shopping cart
   - Manage quantities and remove items

3. **Checkout Process**:
   - Review cart items and total
   - Enter shipping information
   - Proceed to payment

4. **Complete Payment**:
   - Click "Pay with PhonePe"
   - Redirect to PhonePe payment page
   - Choose payment method and complete transaction
   - Get redirected back to success/cancel page

## Security Features

- ✅ Checksum verification for all API calls
- ✅ Secure payment data handling
- ✅ Input validation and sanitization
- ✅ HTTPS support for production
- ✅ Environment-based configuration

## Customization

### Styling
- Modify CSS files in `src/components/` to change the appearance
- Update color schemes in the CSS variables
- Adjust responsive breakpoints as needed

### Functionality
- Add more payment methods
- Implement user authentication
- Add payment history
- Integrate with your database

## Environment Configuration

### Development
- Use PhonePe sandbox environment
- Set `environment: 'SANDBOX'`
- Use sandbox API URLs

### Production
- Use PhonePe production environment
- Set `environment: 'PRODUCTION'`
- Update API URLs to production endpoints
- Use HTTPS for all URLs

## Troubleshooting

### Common Issues

1. **Payment not initiating**:
   - Check PhonePe credentials
   - Verify merchant ID and salt key
   - Ensure backend server is running

2. **CORS errors**:
   - Make sure backend server is running on port 5000
   - Check if CORS is properly configured

3. **Redirect issues**:
   - Verify redirect URLs in PhonePe configuration
   - Ensure URLs are accessible

### Debug Mode

Enable debug logging by adding console.log statements in:
- `server.js` for backend debugging
- `PaymentForm.js` for frontend debugging

## Support

For PhonePe integration support:
- [PhonePe Developer Documentation](https://developer.phonepe.com/)
- [PhonePe Business Support](https://business.phonepe.com/support)

## License

This project is for educational and development purposes. Please ensure you comply with PhonePe's terms of service when using their payment gateway.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

**Note**: This is a demo application. For production use, ensure you:
- Use proper environment variables for sensitive data
- Implement proper error handling and logging
- Add comprehensive testing
- Follow security best practices
- Comply with PCI DSS requirements if handling card data
