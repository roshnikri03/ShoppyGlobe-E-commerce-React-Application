import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import './ProductItem.css';

const ProductItem = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [added, setAdded] = useState(false);

  const { id, title, price, thumbnail, rating, brand, category } = product;

  const handleAddToCart = (e) => {
    // Prevent navigating to the details page
    e.stopPropagation();
    
    // Dispatch action to Redux store
    dispatch(
      addToCart({
        id,
        title,
        price,
        thumbnail,
      })
    );
    
    // Trigger temporary UI indicator
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  const handleCardClick = () => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="product-card glass-card fade-in" onClick={handleCardClick}>
      <div className="product-img-wrapper">
        <img
          src={thumbnail}
          alt={title}
          loading="lazy"
          className="product-thumbnail"
        />
        <span className="product-category">{category}</span>
      </div>

      <div className="product-info">
        <span className="product-brand">{brand || 'Generic'}</span>
        <h3 className="product-title" title={title}>
          {title}
        </h3>
        
        <div className="product-rating">
          <span className="star-icon">★</span>
          <span className="rating-value">{rating ? rating.toFixed(1) : 'N/A'}</span>
        </div>

        <div className="product-footer">
          <div className="price-tag">
            <span className="currency">$</span>
            <span className="price-amount">{price}</span>
          </div>
          
          <button
            className={`btn add-to-cart-btn ${added ? 'added' : 'btn-primary'}`}
            onClick={handleAddToCart}
            disabled={added}
          >
            {added ? (
              <>
                <span className="check-icon">✓</span> Added
              </>
            ) : (
              'Add to Cart'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

ProductItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
    rating: PropTypes.number,
    brand: PropTypes.string,
    category: PropTypes.string,
  }).isRequired,
};

export default ProductItem;
