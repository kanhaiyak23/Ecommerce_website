import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';
import './Checkout.css';

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const { name, email, phone, address, city, pincode } = customerInfo;
    
    if (!name.trim()) {
      setMessage('Please enter your full name');
      setMessageType('error');
      return false;
    }
    
    if (!email.trim() || !email.includes('@')) {
      setMessage('Please enter a valid email address');
      setMessageType('error');
      return false;
    }
    
    if (!phone.trim() || phone.length < 10) {
      setMessage('Please enter a valid phone number');
      setMessageType('error');
      return false;
    }
    
    if (!address.trim()) {
      setMessage('Please enter your address');
      setMessageType('error');
      return false;
    }
    
    if (!city.trim()) {
      setMessage('Please enter your city');
      setMessageType('error');
      return false;
    }
    
    if (!pincode.trim() || pincode.length !== 6) {
      setMessage('Please enter a valid 6-digit pincode');
      setMessageType('error');
      return false;
    }
    
    return true;
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      // Prepare order data
      const orderData = {
        items: items,
        totalAmount: totalPrice,
        customerInfo: customerInfo,
        orderId: `ORD_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      };

      // Send payment request to backend
      const response = await axios.post(API_ENDPOINTS.PAYMENT_INITIATE, {
        amount: totalPrice,
        customerName: customerInfo.name,
        customerEmail: customerInfo.email,
        customerPhone: customerInfo.phone,
        orderData: orderData
      });

      if (response.data.success) {
        setMessage('Redirecting to PhonePe payment page...');
        setMessageType('success');
        
        // Clear cart and redirect to payment
        clearCart();
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

  if (items.length === 0) {
    return (
      <div className="checkout-container">
        <div className="empty-cart-message">
          <h2>Your cart is empty</h2>
          <p>Add some t-shirts to your cart before checkout</p>
          <button 
            className="continue-shopping-btn"
            onClick={() => navigate('/')}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <h1>Checkout</h1>
        <p>Complete your order</p>
      </div>

      <div className="checkout-content">
        <div className="checkout-form-section">
          <h2>Shipping Information</h2>
          <form onSubmit={handlePayment} className="checkout-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={customerInfo.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={customerInfo.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={customerInfo.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="city">City *</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={customerInfo.city}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="address">Address *</label>
              <textarea
                id="address"
                name="address"
                value={customerInfo.address}
                onChange={handleInputChange}
                rows="3"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="pincode">Pincode *</label>
              <input
                type="text"
                id="pincode"
                name="pincode"
                value={customerInfo.pincode}
                onChange={handleInputChange}
                maxLength="6"
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
              className="pay-now-btn"
              disabled={loading}
            >
              {loading ? 'Processing...' : `Pay ₹${totalPrice} with PhonePe`}
            </button>
          </form>
        </div>

        <div className="order-summary">
          <h2>Order Summary</h2>
          <div className="order-items">
            {items.map((item) => (
              <div key={item.cartId} className="order-item">
                <img src={item.image} alt={item.name} className="order-item-image" />
                <div className="order-item-details">
                  <h4>{item.name}</h4>
                  <p>Size: {item.size} | Color: {item.color}</p>
                  <p>Qty: {item.quantity} × ₹{item.price}</p>
                </div>
                <div className="order-item-total">
                  ₹{item.price * item.quantity}
                </div>
              </div>
            ))}
          </div>

          <div className="order-totals">
            <div className="total-row">
              <span>Subtotal:</span>
              <span>₹{totalPrice}</span>
            </div>
            <div className="total-row">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div className="total-row total">
              <span>Total:</span>
              <span>₹{totalPrice}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
