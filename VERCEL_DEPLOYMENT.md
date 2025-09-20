# Vercel Deployment Guide - T-Shirt E-Commerce Store

This guide covers deploying your t-shirt e-commerce store with PhonePe payment integration to Vercel using serverless functions.

## 🚀 What's Changed

Your Express server has been converted to Vercel serverless functions:
- ✅ No more `app.listen()` - functions are called on-demand
- ✅ Each API endpoint is now a separate serverless function
- ✅ Automatic scaling and cold start optimization
- ✅ Built-in CORS handling
- ✅ Environment variable support

## 📁 New File Structure

```
payment_gateway/
├── api/                          # Vercel serverless functions
│   ├── payment/
│   │   ├── initiate.js          # Payment initiation function
│   │   ├── callback.js          # Payment callback function
│   │   └── status.js            # Payment status check function
│   ├── health.js                # Health check function
│   └── dev-server.js            # Local development server
├── src/                         # React frontend
├── vercel.json                  # Vercel configuration
└── package.json                 # Updated scripts
```

## 🔧 Pre-Deployment Setup

### 1. Install Vercel CLI (Optional but Recommended)

```bash
npm install -g vercel
```

### 2. Test Locally

```bash
# Install dependencies
npm install

# Test serverless functions locally
npm run dev:server

# Test full application
npm run dev
```

### 3. Build for Production

```bash
npm run build
```

## 🚀 Deployment Steps

### Option 1: Deploy via Vercel CLI

1. **Login to Vercel**
   ```bash
   vercel login
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Set Environment Variables**
   ```bash
   vercel env add PHONEPE_MERCHANT_ID
   vercel env add PHONEPE_SALT_KEY
   vercel env add PHONEPE_SALT_INDEX
   vercel env add PHONEPE_ENVIRONMENT
   vercel env add FRONTEND_URL
   ```

4. **Redeploy with Environment Variables**
   ```bash
   vercel --prod
   ```

### Option 2: Deploy via Vercel Dashboard

1. **Connect GitHub Repository**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/Login with GitHub
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Project**
   - Framework Preset: `Create React App`
   - Build Command: `npm run vercel-build`
   - Output Directory: `build`
   - Install Command: `npm install`

3. **Set Environment Variables**
   In the Vercel dashboard, go to Settings → Environment Variables:
   ```
   PHONEPE_MERCHANT_ID=your_merchant_id
   PHONEPE_SALT_KEY=your_salt_key
   PHONEPE_SALT_INDEX=1
   PHONEPE_ENVIRONMENT=SANDBOX
   FRONTEND_URL=https://your-app.vercel.app
   ```

4. **Deploy**
   - Click "Deploy"
   - Vercel will automatically build and deploy

## 🔑 Environment Variables

### Required Variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `PHONEPE_MERCHANT_ID` | Your PhonePe merchant ID | `MERCHANT123` |
| `PHONEPE_SALT_KEY` | Your PhonePe salt key | `your_salt_key_here` |
| `PHONEPE_SALT_INDEX` | Your PhonePe salt index | `1` |
| `PHONEPE_ENVIRONMENT` | Environment (SANDBOX/PRODUCTION) | `SANDBOX` |
| `FRONTEND_URL` | Your Vercel app URL | `https://your-app.vercel.app` |

### Optional Variables:

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Node environment | `production` |

## 📱 API Endpoints

Your serverless functions will be available at:

- `https://your-app.vercel.app/api/payment/initiate` (POST)
- `https://your-app.vercel.app/api/payment/callback` (POST)
- `https://your-app.vercel.app/api/payment/status` (POST)
- `https://your-app.vercel.app/api/health` (GET)

## 🔄 PhonePe Configuration

### Update PhonePe Dashboard:

1. **Redirect URL**: `https://your-app.vercel.app/payment-success`
2. **Cancel URL**: `https://your-app.vercel.app/payment-cancel`

### Test with Sandbox:

- Use `PHONEPE_ENVIRONMENT=SANDBOX` for testing
- Switch to `PHONEPE_ENVIRONMENT=PRODUCTION` for live payments

## 🧪 Testing

### Local Testing:

```bash
# Test individual functions
curl -X POST http://localhost:5001/api/health

# Test payment initiation
curl -X POST http://localhost:5001/api/payment/initiate \
  -H "Content-Type: application/json" \
  -d '{"amount":100,"customerName":"Test","customerEmail":"test@test.com","customerPhone":"1234567890"}'
```

### Production Testing:

```bash
# Test health endpoint
curl https://your-app.vercel.app/api/health

# Test payment initiation
curl -X POST https://your-app.vercel.app/api/payment/initiate \
  -H "Content-Type: application/json" \
  -d '{"amount":100,"customerName":"Test","customerEmail":"test@test.com","customerPhone":"1234567890"}'
```

## 🐛 Troubleshooting

### Common Issues:

1. **Function Timeout**
   - Vercel functions have a 10-second timeout on free tier
   - Upgrade to Pro for longer timeouts
   - Optimize your PhonePe API calls

2. **Environment Variables Not Working**
   - Ensure variables are set in Vercel dashboard
   - Redeploy after adding environment variables
   - Check variable names match exactly

3. **CORS Issues**
   - CORS is handled automatically in serverless functions
   - If issues persist, check your frontend API calls

4. **Build Failures**
   - Check Node.js version (requires 18+)
   - Ensure all dependencies are in package.json
   - Check build logs in Vercel dashboard

### Debug Mode:

```bash
# Enable debug logging
vercel logs your-app-name

# Check function logs
vercel logs your-app-name --follow
```

## 📊 Monitoring

### Vercel Dashboard:
- Function execution metrics
- Response times
- Error rates
- Cold start statistics

### Analytics:
- Page views
- Function invocations
- Performance insights

## 💰 Vercel Pricing

### Free Tier:
- 100GB bandwidth
- 100GB-hours function execution
- 10-second function timeout
- Custom domains

### Pro Tier ($20/month):
- 1TB bandwidth
- 1000GB-hours function execution
- 60-second function timeout
- Advanced analytics

## 🔒 Security

### Best Practices:
- Never commit environment variables
- Use HTTPS in production
- Validate all inputs
- Implement rate limiting (if needed)

### PhonePe Security:
- Verify checksums on all callbacks
- Use secure redirect URLs
- Test with sandbox first

## 🚀 Performance Optimization

### Tips:
- Minimize cold starts by keeping functions warm
- Optimize PhonePe API calls
- Use CDN for static assets
- Implement caching where appropriate

## 📞 Support

### Vercel Support:
- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Community](https://github.com/vercel/vercel/discussions)

### PhonePe Support:
- [PhonePe Developer Docs](https://developer.phonepe.com/)
- [PhonePe Business Support](https://business.phonepe.com/support)

---

## 🎉 You're Ready!

Your t-shirt e-commerce store is now ready for Vercel deployment with serverless functions. The app will automatically scale based on demand and you won't need to manage any servers!

**Next Steps:**
1. Set up your PhonePe merchant account
2. Deploy to Vercel
3. Configure environment variables
4. Update PhonePe redirect URLs
5. Test the complete flow

Happy deploying! 🚀
