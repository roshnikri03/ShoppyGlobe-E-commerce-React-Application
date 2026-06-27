import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { updateQuantity, removeFromCart } from '../redux/cartSlice';
import { Link } from 'react-router-dom';
import './CartItem.css';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const { id, title, price, thumbnail, quantity } = item;

  const handleIncrement = () => {
    dispatch(updateQuantity({ id, quantity: quantity + 1 }));
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      dispatch(updateQuantity({ id, quantity: quantity - 1 }));
    }
  };

  const handleRemove = () => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className="cart-item-row glass-card fade-in">
      <Link to={`/product/${id}`} className="cart-item-image-link">
        <img
          src={thumbnail}
          alt={title}
          loading="lazy"
          className="cart-item-thumb"
        />
      </Link>

      <div className="cart-item-details">
        <Link to={`/product/${id}`} className="cart-item-title-link">
          <h4 className="cart-item-title">{title}</h4>
        </Link>
        <span className="cart-item-unit-price">${price} each</span>
      </div>

      <div className="cart-item-quantity-control">
        <button
          className="quantity-btn decrement"
          onClick={handleDecrement}
          disabled={quantity <= 1}
          aria-label="Decrease quantity"
        >
          −
        </button>
        <span className="quantity-value">{quantity}</span>
        <button
          className="quantity-btn increment"
          onClick={handleIncrement}
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>

      <div className="cart-item-total">
        <span className="cart-item-subtotal-price">${(price * quantity).toFixed(2)}</span>
      </div>

      <button
        className="cart-item-remove-btn"
        onClick={handleRemove}
        aria-label={`Remove ${title} from cart`}
        title="Remove item"
      >
        ✕
      </button>
    </div>
  );
};

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
};

export default CartItem;
