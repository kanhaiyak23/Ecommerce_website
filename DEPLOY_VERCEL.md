# Deploy to Vercel - Quick Guide

## 🚀 One-Click Deployment

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/payment_gateway)

## 📋 Manual Deployment Steps

### 1. Install Vercel CLI
```bash
npm install -g vercel
```

### 2. Login to Vercel
```bash
vercel login
```

### 3. Deploy
```bash
vercel
```

### 4. Set Environment Variables
```bash
vercel env add PHONEPE_MERCHANT_ID
vercel env add PHONEPE_SALT_KEY
vercel env add PHONEPE_SALT_INDEX
vercel env add PHONEPE_ENVIRONMENT
vercel env add FRONTEND_URL
```

### 5. Deploy to Production
```bash
vercel --prod
```

## 🔑 Environment Variables

Set these in Vercel dashboard or via CLI:

```
PHONEPE_MERCHANT_ID=your_merchant_id
PHONEPE_SALT_KEY=your_salt_key
PHONEPE_SALT_INDEX=1
PHONEPE_ENVIRONMENT=SANDBOX
FRONTEND_URL=https://your-app.vercel.app
```

## 📱 Update PhonePe Dashboard

- **Redirect URL**: `https://your-app.vercel.app/payment-success`
- **Cancel URL**: `https://your-app.vercel.app/payment-cancel`

## ✅ That's It!

Your t-shirt store is now live with serverless functions!
