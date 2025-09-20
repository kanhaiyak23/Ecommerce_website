import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import ProductCatalog from './components/ProductCatalog';
import Checkout from './components/Checkout';
import PaymentSuccess from './components/PaymentSuccess';
import PaymentCancel from './components/PaymentCancel';
import ShoppingCart from './components/ShoppingCart';
import './App.css';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <header className="App-header">
            <div className="header-content">
              <div className="logo">
                <h1>👕 T-Shirt Store</h1>
                <p>Premium Quality T-Shirts</p>
              </div>
              <ShoppingCart />
            </div>
          </header>
          <main className="App-main">
            <Routes>
              <Route path="/" element={<ProductCatalog />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/payment-success" element={<PaymentSuccess />} />
              <Route path="/payment-cancel" element={<PaymentCancel />} />
            </Routes>
          </main>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
