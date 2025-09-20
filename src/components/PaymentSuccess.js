import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './PaymentSuccess.css';

const PaymentSuccess = () => {
  const location = useLocation();
  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real application, you would extract payment data from URL params
    // or make an API call to verify the payment status
    const urlParams = new URLSearchParams(location.search);
    const transactionId = urlParams.get('transactionId');
    
    if (transactionId) {
      // Simulate API call to verify payment
      setTimeout(() => {
        setPaymentData({
          transactionId,
          amount: '100.00',
          status: 'SUCCESS',
          timestamp: new Date().toISOString()
        });
        setLoading(false);
      }, 2000);
    } else {
      setLoading(false);
    }
  }, [location]);

  if (loading) {
    return (
      <div className="payment-result">
        <div className="result-card">
          <div className="loading-spinner"></div>
          <h2>Verifying Payment...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-result">
      <div className="result-card success">
        <div className="success-icon">✅</div>
        <h2>Payment Successful!</h2>
        <p>Your payment has been processed successfully.</p>
        
        {paymentData && (
          <div className="payment-details">
            <h3>Payment Details</h3>
            <div className="detail-row">
              <span>Transaction ID:</span>
              <span>{paymentData.transactionId}</span>
            </div>
            <div className="detail-row">
              <span>Amount:</span>
              <span>₹{paymentData.amount}</span>
            </div>
            <div className="detail-row">
              <span>Status:</span>
              <span className="status success">{paymentData.status}</span>
            </div>
            <div className="detail-row">
              <span>Date:</span>
              <span>{new Date(paymentData.timestamp).toLocaleString()}</span>
            </div>
          </div>
        )}
        
        <button 
          className="home-button"
          onClick={() => window.location.href = '/'}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
