# Deployment Guide - T-Shirt E-Commerce Store

This guide covers multiple deployment options for your t-shirt e-commerce store with PhonePe payment integration.

## 🚀 Deployment Options

### Option 1: Railway (Recommended - Free & Easy)

Railway is the easiest option for full-stack deployment with a generous free tier.

#### Steps:

1. **Create Railway Account**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Deploy from GitHub**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository
   - Railway will automatically detect it's a Node.js app

3. **Set Environment Variables**
   In Railway dashboard, go to Variables tab and add:
   ```
   NODE_ENV=production
   PHONEPE_MERCHANT_ID=your_merchant_id
   PHONEPE_SALT_KEY=your_salt_key
   PHONEPE_SALT_INDEX=1
   PHONEPE_ENVIRONMENT=SANDBOX
   FRONTEND_URL=https://your-app.railway.app
   ```

4. **Deploy**
   - Railway will automatically build and deploy
   - Your app will be available at `https://your-app.railway.app`

---

### Option 2: Render (Free Tier Available)

#### Steps:

1. **Create Render Account**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub

2. **Create Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Use these settings:
     - **Build Command**: `npm install && npm run build`
     - **Start Command**: `npm run start:prod`
     - **Environment**: `Node`

3. **Set Environment Variables**
   ```
   NODE_ENV=production
   PHONEPE_MERCHANT_ID=your_merchant_id
   PHONEPE_SALT_KEY=your_salt_key
   PHONEPE_SALT_INDEX=1
   PHONEPE_ENVIRONMENT=SANDBOX
   FRONTEND_URL=https://your-app.onrender.com
   ```

4. **Deploy**
   - Click "Create Web Service"
   - Render will build and deploy automatically

---

### Option 3: Vercel (Frontend) + Railway (Backend)

#### Frontend on Vercel:

1. **Create Vercel Account**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub

2. **Deploy Frontend**
   - Import your GitHub repository
   - Vercel will auto-detect React app
   - Set environment variable:
     ```
     REACT_APP_API_URL=https://your-backend.railway.app
     ```

#### Backend on Railway:
   - Follow Option 1 steps for backend
   - Update `FRONTEND_URL` to your Vercel URL

---

### Option 4: Netlify (Frontend) + Railway (Backend)

#### Frontend on Netlify:

1. **Create Netlify Account**
   - Go to [netlify.com](https://netlify.com)
   - Sign up with GitHub

2. **Deploy Frontend**
   - Click "New site from Git"
   - Connect your repository
   - Build settings:
     - **Build command**: `npm run build`
     - **Publish directory**: `build`
   - Set environment variable:
     ```
     REACT_APP_API_URL=https://your-backend.railway.app
     ```

---

## 🔧 Pre-Deployment Setup

### 1. Update PhonePe Configuration

Before deploying, update your PhonePe configuration:

```javascript
// In server.js - these will be set via environment variables
const PHONEPE_CONFIG = {
  merchantId: process.env.PHONEPE_MERCHANT_ID,
  saltKey: process.env.PHONEPE_SALT_KEY,
  saltIndex: parseInt(process.env.PHONEPE_SALT_INDEX),
  environment: process.env.PHONEPE_ENVIRONMENT,
  // URLs will be automatically set based on your deployment
};
```

### 2. Update PhonePe Dashboard

In your PhonePe merchant dashboard, update:
- **Redirect URL**: `https://your-domain.com/payment-success`
- **Cancel URL**: `https://your-domain.com/payment-cancel`

### 3. Test Locally

```bash
# Build the project
npm run build

# Test production build locally
NODE_ENV=production npm run start:prod
```

---

## 🌐 Domain Setup (Optional)

### Custom Domain on Railway:
1. Go to your Railway project
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Update DNS records as instructed

### Custom Domain on Vercel:
1. Go to your Vercel project
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Update DNS records

---

## 🔒 Environment Variables Reference

### Required Variables:
```
NODE_ENV=production
PHONEPE_MERCHANT_ID=your_merchant_id
PHONEPE_SALT_KEY=your_salt_key
PHONEPE_SALT_INDEX=1
PHONEPE_ENVIRONMENT=SANDBOX (or PRODUCTION)
FRONTEND_URL=https://your-domain.com
```

### For Frontend (if using separate hosting):
```
REACT_APP_API_URL=https://your-backend-domain.com
```

---

## 🚨 Important Notes

### Security:
- Never commit `.env` files to Git
- Use environment variables for all sensitive data
- Enable HTTPS in production

### PhonePe Configuration:
- Update redirect URLs in PhonePe dashboard
- Test with sandbox environment first
- Switch to production only after thorough testing

### Performance:
- Railway and Render have cold starts on free tier
- Consider upgrading for better performance
- Use CDN for static assets

---

## 🐛 Troubleshooting

### Common Issues:

1. **Build Fails**
   - Check Node.js version compatibility
   - Ensure all dependencies are in package.json
   - Check build logs for specific errors

2. **API Calls Fail**
   - Verify environment variables are set
   - Check CORS configuration
   - Ensure backend URL is correct

3. **PhonePe Integration Issues**
   - Verify merchant credentials
   - Check redirect URLs match exactly
   - Test with sandbox environment first

4. **Static Files Not Loading**
   - Ensure build directory exists
   - Check static file serving configuration
   - Verify file paths are correct

---

## 📊 Monitoring

### Railway:
- Built-in metrics and logs
- Automatic deployments from Git
- Easy rollback options

### Render:
- Application logs
- Performance metrics
- Health checks

### Vercel:
- Analytics dashboard
- Performance insights
- Function logs

---

## 💰 Cost Comparison

| Platform | Free Tier | Paid Plans | Best For |
|----------|-----------|------------|----------|
| Railway | 500 hours/month | $5/month | Full-stack apps |
| Render | 750 hours/month | $7/month | Web services |
| Vercel | 100GB bandwidth | $20/month | Frontend apps |
| Netlify | 100GB bandwidth | $19/month | Static sites |

---

## 🎯 Recommended Setup

For beginners: **Railway (Full-stack)**
- Easiest setup
- Generous free tier
- Automatic deployments
- Built-in monitoring

For production: **Railway + Custom Domain**
- Professional setup
- Better performance
- Custom branding
- SSL certificates included

---

## 📞 Support

If you encounter issues:
1. Check the platform's documentation
2. Review build logs
3. Test locally first
4. Check environment variables
5. Verify PhonePe configuration

Happy deploying! 🚀
