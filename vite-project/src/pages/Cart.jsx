import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectCartItems, selectCartTotalPrice, clearCart } from '../redux/cartSlice';
import CartItem from '../components/CartItem';
import './Cart.css';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const totalPrice = useSelector(selectCartTotalPrice);

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to empty your shopping cart?')) {
      dispatch(clearCart());
    }
  };

  const isEmpty = cartItems.length === 0;

  return (
    <div className="cart-page fade-in">
      <h1 className="cart-title">Your Shopping Cart</h1>

      {isEmpty ? (
        <div className="empty-cart-container glass-card">
          <div className="empty-cart-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>You haven&apos;t added any products to your cart yet. Browse our store to discover great deals!</p>
          <Link to="/" className="btn btn-primary go-shopping-btn">
            Go Shopping
          </Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items-section">
            <div className="cart-items-header">
              <span>Product Details</span>
              <span>Quantity</span>
              <span>Subtotal</span>
            </div>
            
            <div className="cart-items-list">
              {cartItems.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            <div className="cart-actions-row">
              <Link to="/" className="btn btn-secondary">
                ← Continue Shopping
              </Link>
              <button className="btn btn-outline btn-danger-hover" onClick={handleClearCart}>
                Clear Cart
              </button>
            </div>
          </div>

          <div className="cart-summary-section">
            <div className="summary-card glass-card">
              <h3>Order Summary</h3>
              
              <div className="summary-row">
                <span>Subtotal</span>
                <span className="summary-val">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span className="summary-val success-text">FREE</span>
              </div>
              <div className="summary-row">
                <span>Tax</span>
                <span className="summary-val">$0.00</span>
              </div>
              
              <div className="summary-total-divider"></div>
              
              <div className="summary-row total-row">
                <span>Total Amount</span>
                <span className="summary-val total-amount">${totalPrice.toFixed(2)}</span>
              </div>

              <Link to="/checkout" className="btn btn-primary checkout-btn-large">
                Proceed to Checkout
              </Link>
              
              <div className="secure-badge">
                🔒 256-bit SSL Secure Checkout
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
