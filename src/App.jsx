import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import MovieCard from './components/MovieCard';
import Loader from './components/Loader';
import { Film, AlertCircle } from 'lucide-react';
import './App.css';

const API_URL = 'https://api.tvmaze.com/shows';

function App() {
  // --- States ---
  const [allMovies, setAllMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem('cineFavorites')) || [];
  });
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('cineTheme') || 'dark';
  });

  // --- Theme Effect (Persistence only) ---
  useEffect(() => {
    localStorage.setItem('cineTheme', theme);
  }, [theme]);

  // --- Fetch Data ---
  const fetchMovies = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('API connection failed');
      const data = await response.json();
      setAllMovies(data.slice(0, 100));
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  // ... (HOFs and toggleFavorite/toggleTheme remain same)

  return (
    <div className="app-container" data-theme={theme}>
      <div className="wrapper" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem' }}>
        <Header theme={theme} toggleTheme={toggleTheme} />
        
        <FilterBar 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedGenre={selectedGenre}
          setSelectedGenre={setSelectedGenre}
          sortBy={sortBy}
          setSortBy={setSortBy}
          genres={genres}
        />

        {loading ? (
          <Loader />
        ) : error ? (
          <div className="error-state animate-fade-in">
            <AlertCircle size={48} color="var(--primary)" />
            <h2>Oops! Something went wrong</h2>
            <p>{error}</p>
            <button className="btn btn-primary" onClick={fetchMovies}>Try Again</button>
          </div>
        ) : (
          <main>
            {/* ... rest of the main content */}
            {displayMovies.length > 0 ? (
              <div className="grid-container">
                {displayMovies.map(movie => (
                  <MovieCard 
                    key={movie.id} 
                    movie={movie} 
                    isFavorite={favorites.includes(movie.id)}
                    onToggleFavorite={toggleFavorite}
                  />
                ))}
              </div>
            ) : (
              <div className="no-results animate-fade-in">
                <Film size={64} style={{ opacity: 0.2, marginBottom: '1rem' }} />
                <h3>No movies found</h3>
                <p>Try adjusting your search or filters.</p>
              </div>
            )}
          </main>
        )}
      </div>
    </div>
  );
}

export default App;
