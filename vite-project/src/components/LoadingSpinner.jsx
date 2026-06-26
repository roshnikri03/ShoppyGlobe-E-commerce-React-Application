import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p style={{ color: 'var(--text-muted)', fontWeight: 500 }}>Loading ShoppyGlobe...</p>
    </div>
  );
};

export default LoadingSpinner;
