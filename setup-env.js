// #!/usr/bin/env node

// const fs = require('fs');
// const path = require('path');

// console.log('🔧 Setting up environment variables...\n');

// // Check if .env already exists
// const envPath = path.join(__dirname, '.env');
// const envLocalPath = path.join(__dirname, '.env.local');

// if (fs.existsSync(envPath)) {
//   console.log('⚠️  .env file already exists!');
//   console.log('   If you want to update it, please delete the existing .env file first.\n');
// } else if (fs.existsSync(envLocalPath)) {
//   console.log('⚠️  .env.local file already exists!');
//   console.log('   If you want to update it, please delete the existing .env.local file first.\n');
// } else {
//   // Create .env file with dummy values
//   const envContent = `# Environment Variables for Local Development
// # Replace these dummy values with your actual PhonePe credentials

// # Node Environment
// NODE_ENV=development

// # PhonePe Configuration (DUMMY VALUES - REPLACE WITH REAL ONES)
// PHONEPE_MERCHANT_ID=PGTESTPAYUAT
// PHONEPE_SALT_KEY=099eb0cd-02cf-4e2a-8aca-3e6c6aff0399
// PHONEPE_SALT_INDEX=1
// PHONEPE_ENVIRONMENT=SANDBOX

// # Application URLs
// FRONTEND_URL=http://localhost:3000
// REACT_APP_API_URL=http://localhost:5001

// # Server Configuration
// PORT=5001

// # Note: These are dummy/test values for PhonePe sandbox
// # For production, you need to get real credentials from PhonePe Business dashboard
// # Sign up at: https://business.phonepe.com/
// `;

//   try {
//     fs.writeFileSync(envPath, envContent);
//     console.log('✅ Created .env file with dummy values!');
//     console.log('📝 Please update the PhonePe credentials with your real values.\n');
//   } catch (error) {
//     console.log('❌ Error creating .env file:', error.message);
//     console.log('📋 Please manually copy the content from env-template.txt to .env\n');
//   }
// }

// console.log('📋 Environment Variables Setup:');
// console.log('================================\n');

// console.log('Required PhonePe Credentials:');
// console.log('- PHONEPE_MERCHANT_ID: Your PhonePe merchant ID');
// console.log('- PHONEPE_SALT_KEY: Your PhonePe salt key');
// console.log('- PHONEPE_SALT_INDEX: Your PhonePe salt index (usually 1)');
// console.log('- PHONEPE_ENVIRONMENT: SANDBOX (for testing) or PRODUCTION\n');

// console.log('How to get PhonePe credentials:');
// console.log('1. Sign up at https://business.phonepe.com/');
// console.log('2. Complete the merchant onboarding process');
// console.log('3. Get your credentials from the dashboard');
// console.log('4. Update the .env file with real values\n');

// console.log('Testing with dummy values:');
// console.log('- The dummy values are for PhonePe sandbox testing');
// console.log('- They may not work for actual payments');
// console.log('- Use them only for development and testing\n');

// console.log('Security Notes:');
// console.log('- Never commit .env files to version control');
// console.log('- Use different credentials for development and production');
// console.log('- Keep your salt key secure and private\n');

// console.log('Next Steps:');
// console.log('1. Update .env with your real PhonePe credentials');
// console.log('2. Run: npm run dev');
// console.log('3. Test the payment flow');
// console.log('4. Deploy to Vercel with environment variables\n');

// console.log('🎉 Environment setup complete!');
