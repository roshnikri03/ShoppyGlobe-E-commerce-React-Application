import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorDisplay from '../components/ErrorDisplay';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error(`Product with ID ${id} not found.`);
          }
          throw new Error(`Failed to fetch product details: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        if (isMounted) {
          setProduct(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Something went wrong while fetching product details.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProductDetails();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
      })
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <ErrorDisplay 
        message={error} 
        onRetry={() => navigate('/')} 
      />
    );
  }

  if (!product) return null;

  const inStock = product.stock > 0;

  return (
    <div className="product-detail-container fade-in">
      <button className="btn btn-secondary back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="product-detail-layout glass-card">
        <div className="detail-image-section">
          <img
            src={product.thumbnail}
            alt={product.title}
            loading="lazy"
            className="detail-main-img"
          />
          {product.images && product.images.length > 1 && (
            <div className="thumbnail-strip">
              {product.images.slice(0, 4).map((imgUrl, index) => (
                <img
                  key={index}
                  src={imgUrl}
                  alt={`${product.title} gallery ${index}`}
                  loading="lazy"
                  className="gallery-thumb"
                  onClick={() => setProduct(prev => ({ ...prev, thumbnail: imgUrl }))}
                />
              ))}
            </div>
          )}
        </div>

        <div className="detail-info-section">
          <div className="detail-meta">
            <span className="detail-category">{product.category}</span>
            {product.brand && <span className="detail-brand">{product.brand}</span>}
          </div>

          <h1 className="detail-title">{product.title}</h1>

          <div className="detail-ratings">
            <div className="stars-wrapper">
              <span className="star-icon">★</span>
              <span className="rating-num">{product.rating.toFixed(1)}</span>
            </div>
            <span className="reviews-count">({product.reviews ? product.reviews.length : 12} reviews)</span>
          </div>

          <div className="detail-price-box">
            <div className="price-tag">
              <span className="currency">$</span>
              <span className="price-amount">{product.price}</span>
            </div>
            {product.discountPercentage && (
              <span className="discount-tag">
                {product.discountPercentage}% OFF
              </span>
            )}
          </div>

          <p className="detail-description">{product.description}</p>

          <div className="detail-features">
            <div className="feature-item">
              <strong>Availability: </strong>
              <span className={`status-badge ${inStock ? 'in-stock' : 'out-of-stock'}`}>
                {inStock ? `In Stock (${product.stock} left)` : 'Out of Stock'}
              </span>
            </div>
            {product.warrantyInformation && (
              <div className="feature-item">
                <strong>Warranty: </strong>
                <span>{product.warrantyInformation}</span>
              </div>
            )}
            {product.shippingInformation && (
              <div className="feature-item">
                <strong>Shipping: </strong>
                <span>{product.shippingInformation}</span>
              </div>
            )}
          </div>

          <div className="detail-actions">
            <button
              className={`btn add-to-cart-btn-large ${added ? 'added' : 'btn-primary'}`}
              onClick={handleAddToCart}
              disabled={!inStock || added}
              style={{ flex: 1, padding: '1rem' }}
            >
              {added ? (
                <>✓ Added to Cart</>
              ) : inStock ? (
                'Add to Shopping Cart'
              ) : (
                'Temporarily Out of Stock'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
