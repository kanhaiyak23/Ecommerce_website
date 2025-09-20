import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import './ShoppingCart.css';

const ShoppingCart = () => {
  const { items, totalItems, totalPrice, updateQuantity, removeFromCart, clearCart } = useCart();
  const [showCart, setShowCart] = useState(false);

  if (items.length === 0) {
    return (
      <div className="cart-container">
        <button 
          className="cart-toggle"
          onClick={() => setShowCart(!showCart)}
        >
          🛒 Cart ({totalItems})
        </button>
        
        {showCart && (
          <div className="cart-dropdown">
            <div className="empty-cart">
              <div className="empty-cart-icon">🛒</div>
              <h3>Your cart is empty</h3>
              <p>Add some t-shirts to get started!</p>
              <Link to="/" className="shop-now-btn">
                Shop Now
              </Link>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="cart-container">
      <button 
        className="cart-toggle"
        onClick={() => setShowCart(!showCart)}
      >
        🛒 Cart ({totalItems})
      </button>
      
      {showCart && (
        <div className="cart-dropdown">
          <div className="cart-header">
            <h3>Shopping Cart</h3>
            <button 
              className="close-cart"
              onClick={() => setShowCart(false)}
            >
              ×
            </button>
          </div>
          
          <div className="cart-items">
            {items.map((item) => (
              <div key={item.cartId} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                
                <div className="cart-item-details">
                  <h4 className="cart-item-name">{item.name}</h4>
                  <p className="cart-item-options">
                    Size: {item.size} | Color: {item.color}
                  </p>
                  
                  <div className="cart-item-controls">
                    <div className="quantity-controls">
                      <button 
                        className="quantity-btn"
                        onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                      >
                        -
                      </button>
                      <span className="quantity">{item.quantity}</span>
                      <button 
                        className="quantity-btn"
                        onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    
                    <div className="cart-item-price">
                      ₹{item.price * item.quantity}
                    </div>
                  </div>
                </div>
                
                <button 
                  className="remove-item"
                  onClick={() => removeFromCart(item.cartId)}
                  title="Remove item"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          
          <div className="cart-footer">
            <div className="cart-total">
              <div className="total-row">
                <span>Subtotal ({totalItems} items):</span>
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
            
            <div className="cart-actions">
              <button 
                className="clear-cart-btn"
                onClick={clearCart}
              >
                Clear Cart
              </button>
              <Link 
                to="/checkout" 
                className="checkout-btn"
                onClick={() => setShowCart(false)}
              >
                Checkout
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
