import React from 'react';
import './Loader.css';

const Loader = () => (
  <div className="loader-container">
    <div className="spinner"></div>
    <p className="loader-text">Fetching Blockbusters...</p>
  </div>
);

export default Loader;
