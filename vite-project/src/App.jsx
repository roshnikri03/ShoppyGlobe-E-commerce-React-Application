import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  return (
    <>
      {/* Global Navigation Header */}
      <Header />
      
      {/* Main View Area with Suspense boundary for page level code-splitting */}
      <main className="main-content">
        <Suspense fallback={<LoadingSpinner />}>
          <Outlet />
        </Suspense>
      </main>

      {/* Premium Footer */}
      <footer style={{
        marginTop: 'auto',
        padding: '2rem 1.5rem',
        borderTop: '1px solid var(--border-color)',
        backgroundColor: 'var(--bg-secondary)',
        textAlign: 'center',
        fontSize: '0.9rem',
        color: 'var(--text-muted)',
        fontWeight: 500
      }}>
        <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <p>© {new Date().getFullYear()} ShoppyGlobe E-commerce Inc. All rights reserved.</p>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>
            Built with React, Redux Toolkit, and React Router v6.
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
