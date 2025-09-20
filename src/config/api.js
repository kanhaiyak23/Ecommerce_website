// API Configuration
// For Vercel deployment, API calls will be relative to the same domain
// For local development, use the local server
const API_BASE_URL = process.env.REACT_APP_API_URL || 
  (process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5001');

export const API_ENDPOINTS = {
  PAYMENT_INITIATE: `${API_BASE_URL}/api/payment/initiate`,
  PAYMENT_CALLBACK: `${API_BASE_URL}/api/payment/callback`,
  PAYMENT_STATUS: `${API_BASE_URL}/api/payment/status`,
  HEALTH: `${API_BASE_URL}/api/health`
};

export default API_BASE_URL;
