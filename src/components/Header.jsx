import React from 'react';
import { Play, Moon, Sun } from 'lucide-react';

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

      <style jsx>{`
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 2rem 0;
          margin-bottom: 2rem;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .logo-icon {
          background: var(--primary);
          color: white;
          padding: 8px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 15px rgba(229, 9, 20, 0.3);
        }

        h1 {
          font-size: 1.8rem;
          font-weight: 700;
          letter-spacing: -1px;
        }

        h1 span {
          color: var(--primary);
        }

        .theme-btn {
          cursor: pointer;
          transition: var(--transition);
        }

        .theme-btn:hover {
          transform: rotate(15deg) scale(1.1);
        }
      `}</style>
    </header>
  );
};

export default Header;
