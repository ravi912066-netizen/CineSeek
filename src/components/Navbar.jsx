import React, { useState, useEffect } from 'react';
import { Play, Search, Filter, SortAsc, Moon, Sun, Heart } from 'lucide-react';
import './Navbar.css';

const Navbar = ({ 
  theme, 
  toggleTheme, 
  searchQuery, 
  setSearchQuery, 
  selectedGenre, 
  setSelectedGenre, 
  sortBy, 
  setSortBy, 
  genres,
  favoritesCount
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        {/* Logo */}
        <div className="nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="nav-logo-icon">
            <Play fill="currentColor" size={20} />
          </div>
          <h1>Cine<span>Seek</span></h1>
        </div>

        {/* Search */}
        <div className="nav-search">
          <Search className="nav-search-icon" size={18} />
          <input 
            type="text" 
            placeholder="Search movies, tv shows..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Actions & Filters */}
        <div className="nav-actions">
          <div className="filter-group">
            <div className="nav-select-wrapper">
              <Filter size={16} className="nav-select-icon" />
              <select 
                value={selectedGenre} 
                onChange={(e) => setSelectedGenre(e.target.value)}
              >
                <option value="">All Genres</option>
                {genres.map(genre => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>
            </div>

            <div className="nav-select-wrapper">
              <SortAsc size={16} className="nav-select-icon" />
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="default">Sort By</option>
                <option value="rating-desc">Highest Rated</option>
                <option value="year-desc">Newest First</option>
                <option value="title-asc">A - Z</option>
              </select>
            </div>
          </div>

          <div className="fav-badge">
            <button className="nav-theme-btn" aria-label="Favorites">
              <Heart size={20} fill={favoritesCount > 0 ? "var(--primary)" : "none"} color={favoritesCount > 0 ? "var(--primary)" : "currentColor"} />
              {favoritesCount > 0 && <span className="fav-count">{favoritesCount}</span>}
            </button>
          </div>

          <button onClick={toggleTheme} className="nav-theme-btn" aria-label="Toggle Theme">
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
