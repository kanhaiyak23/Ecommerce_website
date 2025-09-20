import React, { useState } from 'react';
import axios from 'axios';
import './PaymentForm.css';

const PaymentForm = () => {
  const [amount, setAmount] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  // PhonePe configuration - Replace with your actual credentials
  const PHONEPE_CONFIG = {
    merchantId: 'YOUR_MERCHANT_ID', // Replace with your PhonePe merchant ID
    saltKey: 'YOUR_SALT_KEY', // Replace with your PhonePe salt key
    saltIndex: 1, // Replace with your salt index
    environment: 'SANDBOX', // Change to 'PRODUCTION' for live environment
    redirectUrl: 'http://localhost:3000/payment-success',
    cancelUrl: 'http://localhost:3000/payment-cancel'
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!amount || !customerName || !customerEmail || !customerPhone) {
      setMessage('Please fill in all fields');
      setMessageType('error');
      return;
    }

    if (parseFloat(amount) <= 0) {
      setMessage('Amount must be greater than 0');
      setMessageType('error');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      // Send payment request to backend
      const response = await axios.post('http://localhost:5001/api/payment/initiate', {
        amount: parseFloat(amount),
        customerName,
        customerEmail,
        customerPhone
      });

      if (response.data.success) {
        setMessage('Redirecting to PhonePe payment page...');
        setMessageType('success');
        
        // Redirect to PhonePe payment page
        window.location.href = response.data.data.paymentUrl;
      } else {
        setMessage(response.data.message || 'Payment initiation failed');
        setMessageType('error');
      }
      
    } catch (error) {
      console.error('Payment error:', error);
      if (error.response && error.response.data) {
        setMessage(error.response.data.message || 'Payment failed. Please try again.');
      } else {
        setMessage('Payment failed. Please try again.');
      }
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };


  const handleAmountChange = (e) => {
    const value = e.target.value;
    // Allow only numbers and one decimal point
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  return (
    <div className="payment-form-container">
      <div className="payment-form-card">
        <h2>Make Payment</h2>
        <form onSubmit={handleSubmit} className="payment-form">
          <div className="form-group">
            <label htmlFor="amount">Amount (₹)</label>
            <input
              type="text"
              id="amount"
              value={amount}
              onChange={handleAmountChange}
              placeholder="Enter amount"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="customerName">Full Name</label>
            <input
              type="text"
              id="customerName"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="customerEmail">Email</label>
            <input
              type="email"
              id="customerEmail"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="customerPhone">Phone Number</label>
            <input
              type="tel"
              id="customerPhone"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              placeholder="Enter your phone number"
              required
            />
          </div>

          {message && (
            <div className={`message ${messageType}`}>
              {message}
            </div>
          )}

          <button 
            type="submit" 
            className="pay-button"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Pay with PhonePe'}
          </button>
        </form>

        <div className="payment-info">
          <h3>Payment Methods Accepted</h3>
          <div className="payment-methods">
            <div className="method">💳 Credit/Debit Cards</div>
            <div className="method">📱 UPI</div>
            <div className="method">🏦 Net Banking</div>
            <div className="method">💰 Wallets</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
