import React, { StrictMode, Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { store } from './redux/store';
import App from './App.jsx';
import LoadingSpinner from './components/LoadingSpinner.jsx';
import './index.css';

// Lazy loading all route pages for performance optimization (code-splitting)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
