import React from 'react';
import PropTypes from 'prop-types';

const ErrorDisplay = ({ message, onRetry }) => {
  return (
    <div className="error-container">
      <h3>Oops! Something went wrong</h3>
      <p>{message || 'We could not fetch the requested data.'}</p>
      {onRetry && (
        <button className="btn btn-primary" onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
};

ErrorDisplay.propTypes = {
  message: PropTypes.string,
  onRetry: PropTypes.func,
};

export default ErrorDisplay;
