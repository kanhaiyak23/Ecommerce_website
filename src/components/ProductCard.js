import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert('Please select size and color');
      return;
    }
    
    addToCart(product, selectedSize, selectedColor, 1);
    setShowOptions(false);
    setSelectedSize('');
    setSelectedColor('');
  };

  const handleQuickAdd = () => {
    if (product.sizes.length === 1 && product.colors.length === 1) {
      addToCart(product, product.sizes[0], product.colors[0], 1);
    } else {
      setShowOptions(true);
    }
  };

  const discountPercentage = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={product.image} alt={product.name} className="product-image" />
        {product.featured && <div className="featured-badge">Featured</div>}
        {discountPercentage > 0 && (
          <div className="discount-badge">-{discountPercentage}%</div>
        )}
        <div className="product-overlay">
          <button 
            className="quick-view-btn"
            onClick={() => setShowOptions(true)}
          >
            Quick View
          </button>
        </div>
      </div>
      
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <div className="product-rating">
          <span className="stars">★★★★★</span>
          <span className="rating-text">({product.reviews})</span>
        </div>
        
        <div className="product-price">
          <span className="current-price">₹{product.price}</span>
          {product.originalPrice > product.price && (
            <span className="original-price">₹{product.originalPrice}</span>
          )}
        </div>
        
        <div className="product-colors">
          {product.colors.slice(0, 3).map((color, index) => (
            <div 
              key={index}
              className={`color-option ${selectedColor === color ? 'selected' : ''}`}
              style={{ backgroundColor: getColorValue(color) }}
              onClick={() => setSelectedColor(color)}
              title={color}
            />
          ))}
          {product.colors.length > 3 && (
            <span className="more-colors">+{product.colors.length - 3}</span>
          )}
        </div>
      </div>

      {showOptions && (
        <div className="product-options-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Select Options</h3>
              <button 
                className="close-btn"
                onClick={() => setShowOptions(false)}
              >
                ×
              </button>
            </div>
            
            <div className="options-section">
              <div className="size-options">
                <h4>Size:</h4>
                <div className="size-buttons">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      className={`size-btn ${selectedSize === size ? 'selected' : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="color-options">
                <h4>Color:</h4>
                <div className="color-buttons">
                  {product.colors.map((color, index) => (
                    <button
                      key={index}
                      className={`color-btn ${selectedColor === color ? 'selected' : ''}`}
                      style={{ backgroundColor: getColorValue(color) }}
                      onClick={() => setSelectedColor(color)}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            <button 
              className="add-to-cart-btn"
              onClick={handleAddToCart}
              disabled={!selectedSize || !selectedColor}
            >
              Add to Cart - ₹{product.price}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper function to get color values
const getColorValue = (colorName) => {
  const colorMap = {
    'White': '#ffffff',
    'Black': '#000000',
    'Navy Blue': '#1e3a8a',
    'Gray': '#6b7280',
    'Red': '#dc2626',
    'Green': '#16a34a',
    'Beige': '#f5f5dc'
  };
  return colorMap[colorName] || '#cccccc';
};

export default ProductCard;
