import React from 'react';

const Loader = () => (
  <div className="loader-container" style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '50vh',
    gap: '1rem'
  }}>
    <div className="spinner" style={{
      width: '50px',
      height: '50px',
      border: '5px solid var(--bg-card)',
      borderTop: '5px solid var(--primary)',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }}></div>
    <p style={{ color: 'var(--text-muted)', fontWeight: 500 }}>Fetching Blockbusters...</p>
    <style jsx>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

export default Loader;
