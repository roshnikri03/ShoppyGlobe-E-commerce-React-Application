import React from 'react';
import { useSelector } from 'react-redux';
import { useFetchProducts } from '../hooks/useFetchProducts';
import { selectSearchQuery } from '../redux/searchSlice';
import ProductItem from './ProductItem';
import LoadingSpinner from './LoadingSpinner';
import ErrorDisplay from './ErrorDisplay';

const ProductList = () => {
  const { products, loading, error } = useFetchProducts();
  const searchQuery = useSelector(selectSearchQuery);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <ErrorDisplay 
        message={error} 
        onRetry={() => window.location.reload()} 
      />
    );
  }

  // Filter products by search query (checks title, brand, and category)
  const filteredProducts = products.filter((product) => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return true;
    
    const titleMatch = product.title?.toLowerCase().includes(query);
    const brandMatch = product.brand?.toLowerCase().includes(query);
    const categoryMatch = product.category?.toLowerCase().includes(query);
    
    return titleMatch || brandMatch || categoryMatch;
  });

  return (
    <div style={{ width: '100%' }}>
      {searchQuery && (
        <div style={{ marginBottom: '1.5rem', color: 'var(--text-muted)' }}>
          Found {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} for &ldquo;<strong>{searchQuery}</strong>&rdquo;
        </div>
      )}

      {filteredProducts.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '4rem 1rem',
          backgroundColor: 'var(--bg-secondary)',
          borderRadius: 'var(--border-radius-md)',
          border: '1px dashed var(--border-color)',
          color: 'var(--text-muted)'
        }}>
          <h3>No products found</h3>
          <p style={{ marginTop: '0.5rem' }}>We couldn&apos;t find any matches for your search. Try checking your spelling or using different terms.</p>
        </div>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
