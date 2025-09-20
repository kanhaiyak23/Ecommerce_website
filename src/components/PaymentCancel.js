import React from 'react';
import './PaymentCancel.css';

const PaymentCancel = () => {
  return (
    <div className="payment-result">
      <div className="result-card error">
        <div className="error-icon">❌</div>
        <h2>Payment Cancelled</h2>
        <p>Your payment was cancelled. No charges have been made to your account.</p>
        
        <div className="cancel-info">
          <h3>What happened?</h3>
          <ul>
            <li>You chose to cancel the payment</li>
            <li>The payment session has expired</li>
            <li>There was an issue with the payment gateway</li>
          </ul>
        </div>
        
        <div className="action-buttons">
          <button 
            className="retry-button"
            onClick={() => window.location.href = '/'}
          >
            Try Again
          </button>
          <button 
            className="home-button"
            onClick={() => window.location.href = '/'}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;
