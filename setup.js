#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 PhonePe Payment Gateway Setup');
console.log('================================\n');

// Check if package.json exists
if (!fs.existsSync('package.json')) {
  console.error('❌ package.json not found. Please run this script from the project root directory.');
  process.exit(1);
}

console.log('✅ Project structure found');
console.log('📦 Installing dependencies...\n');

// Instructions for manual setup
console.log('📋 Manual Setup Instructions:');
console.log('=============================\n');

console.log('1. Install dependencies:');
console.log('   npm install\n');

console.log('2. Get PhonePe credentials:');
console.log('   - Sign up at https://business.phonepe.com/');
console.log('   - Get your Merchant ID, Salt Key, and Salt Index\n');

console.log('3. Update configuration files:');
console.log('   - src/components/PaymentForm.js (frontend config)');
console.log('   - server.js (backend config)\n');

console.log('4. Replace the following placeholders:');
console.log('   - YOUR_MERCHANT_ID');
console.log('   - YOUR_SALT_KEY');
console.log('   - YOUR_SALT_INDEX\n');

console.log('5. Start the application:');
console.log('   Terminal 1: node server.js');
console.log('   Terminal 2: npm start\n');

console.log('6. Open http://localhost:3000 in your browser\n');

console.log('🔧 Configuration Files to Update:');
console.log('==================================\n');

console.log('Frontend (src/components/PaymentForm.js):');
console.log('```javascript');
console.log('const PHONEPE_CONFIG = {');
console.log('  merchantId: "YOUR_MERCHANT_ID",');
console.log('  saltKey: "YOUR_SALT_KEY",');
console.log('  saltIndex: 1,');
console.log('  environment: "SANDBOX",');
console.log('  redirectUrl: "http://localhost:3000/payment-success",');
console.log('  cancelUrl: "http://localhost:3000/payment-cancel"');
console.log('};');
console.log('```\n');

console.log('Backend (server.js):');
console.log('```javascript');
console.log('const PHONEPE_CONFIG = {');
console.log('  merchantId: "YOUR_MERCHANT_ID",');
console.log('  saltKey: "YOUR_SALT_KEY",');
console.log('  saltIndex: 1,');
console.log('  environment: "SANDBOX",');
console.log('  baseUrl: "https://api-preprod.phonepe.com/apis/pg-sandbox",');
console.log('  redirectUrl: "http://localhost:3000/payment-success",');
console.log('  cancelUrl: "http://localhost:3000/payment-cancel"');
console.log('};');
console.log('```\n');

console.log('🎯 For Production:');
console.log('==================\n');
console.log('- Change environment to "PRODUCTION"');
console.log('- Update baseUrl to production PhonePe API');
console.log('- Use HTTPS URLs for redirectUrl and cancelUrl');
console.log('- Store credentials in environment variables\n');

console.log('📚 For more details, see README.md');
console.log('✨ Happy coding!');
