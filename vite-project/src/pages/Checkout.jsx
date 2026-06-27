import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { selectCartItems, selectCartTotalPrice, clearCart } from '../redux/cartSlice';
import './Checkout.css';

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const cartItems = useSelector(selectCartItems);
  const totalPrice = useSelector(selectCartTotalPrice);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'credit_card',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate network processing delay
    setTimeout(() => {
      setIsSubmitting(false);
      setOrderPlaced(true);
      
      // Clear cart items from Redux state
      dispatch(clearCart());

      // Automatically redirect to Home page after 2.5 seconds
      setTimeout(() => {
        navigate('/');
      }, 2500);
    }, 1500);
  };

  const isEmpty = cartItems.length === 0;

  if (orderPlaced) {
    return (
      <div className="order-success-overlay">
        <div className="order-success-card glass-card fade-in">
          <div className="success-check-icon">🎉</div>
          <h2>Order Placed Successfully!</h2>
          <p>Thank you for shopping with <strong>ShoppyGlobe</strong>.</p>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Your order has been recorded. Redirecting you to the Home page in a few seconds...
          </p>
          <div className="redirect-loader">
            <div className="loader-bar"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page fade-in">
      <h1 className="checkout-title">Checkout</h1>

      {isEmpty ? (
        <div className="empty-checkout glass-card">
          <div className="empty-cart-icon">🛍️</div>
          <h2>Your cart is empty</h2>
          <p>You cannot checkout with an empty cart. Please add some products first!</p>
          <Link to="/" className="btn btn-primary go-shopping-btn">
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="checkout-layout">
          <div className="checkout-form-section">
            <form onSubmit={handleSubmit} className="checkout-form glass-card">
              <h3>Shipping Information</h3>
              
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-input"
                  required
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-input"
                    required
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="form-input"
                    required
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="address">Street Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  className="form-input"
                  required
                  placeholder="123 Main St, Apt 4B"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    className="form-input"
                    required
                    placeholder="New York"
                    value={formData.city}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="postalCode">Postal Code</label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    className="form-input"
                    required
                    placeholder="10001"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <h3 style={{ marginTop: '1.5rem' }}>Payment Method</h3>
              
              <div className="payment-options">
                <label className="payment-label">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="credit_card"
                    checked={formData.paymentMethod === 'credit_card'}
                    onChange={handleInputChange}
                  />
                  <span>Credit / Debit Card</span>
                </label>
                <label className="payment-label">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="paypal"
                    checked={formData.paymentMethod === 'paypal'}
                    onChange={handleInputChange}
                  />
                  <span>PayPal</span>
                </label>
                <label className="payment-label">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={handleInputChange}
                  />
                  <span>Cash on Delivery (COD)</span>
                </label>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary place-order-btn" 
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Processing Order...' : `Place Order • $${totalPrice.toFixed(2)}`}
              </button>
            </form>
          </div>

          <div className="checkout-summary-section">
            <div className="checkout-summary-card glass-card">
              <h3>Order Summary</h3>
              <div className="checkout-summary-list">
                {cartItems.map((item) => (
                  <div key={item.id} className="checkout-summary-item">
                    <img src={item.thumbnail} alt={item.title} className="summary-item-thumb" />
                    <div className="summary-item-details">
                      <span className="summary-item-title">{item.title}</span>
                      <span className="summary-item-qty">Qty: {item.quantity}</span>
                    </div>
                    <span className="summary-item-price">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="summary-totals">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span className="success-text">FREE</span>
                </div>
                <div className="summary-total-divider"></div>
                <div className="summary-row total-row">
                  <span>Total</span>
                  <span className="total-amount">${totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
