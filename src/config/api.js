// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

export const API_ENDPOINTS = {
  PAYMENT_INITIATE: `${API_BASE_URL}/api/payment/initiate`,
  PAYMENT_CALLBACK: `${API_BASE_URL}/api/payment/callback`,
  PAYMENT_STATUS: `${API_BASE_URL}/api/payment/status`,
  HEALTH: `${API_BASE_URL}/api/health`
};

export default API_BASE_URL;
