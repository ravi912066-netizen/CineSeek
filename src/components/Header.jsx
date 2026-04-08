import React from 'react';
import { Play, Moon, Sun } from 'lucide-react';
import './Header.css';

const Header = ({ theme, toggleTheme }) => {
  return (
    <header className="header animate-fade-in">
      <div className="logo">
        <div className="logo-icon">
          <Play fill="currentColor" size={24} />
        </div>
        <h1>Cine<span>Seek</span></h1>
      </div>

      <nav>
        <button onClick={toggleTheme} className="theme-btn btn-icon" aria-label="Toggle Theme">
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </nav>
    </header>
  );
};

export default Header;
