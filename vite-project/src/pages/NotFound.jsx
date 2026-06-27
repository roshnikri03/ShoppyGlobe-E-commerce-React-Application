import React from 'react';
import { useLocation, Link, useRouteError } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  const location = useLocation();
  const routeError = useRouteError(); // React Router error details (if routed via errorElement)

  // Determine what error details to show on the UI
  const errorDetails = routeError 
    ? (routeError.statusText || routeError.message) 
    : `The route path "${location.pathname}" could not be resolved by our routing system.`;

  const statusCode = routeError?.status || 404;

  return (
    <div className="not-found-page fade-in">
      <div className="not-found-card glass-card">
        <div className="not-found-icon">🔍⚠️</div>
        <h1 className="not-found-code">{statusCode}</h1>
        <h2>Page Not Found</h2>
        
        <div className="error-details-box">
          <p className="error-label">Technical Error Details:</p>
          <code className="error-code-block">{errorDetails}</code>
        </div>

        <p className="not-found-message">
          We looked everywhere but couldn&apos;t find the page you were searching for. It might have been moved, deleted, or never existed.
        </p>

        <Link to="/" className="btn btn-primary back-home-btn">
          Back to Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
