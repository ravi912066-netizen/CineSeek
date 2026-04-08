import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import MovieCard from './components/MovieCard';
import Loader from './components/Loader';
import { Film, AlertCircle, Bookmark } from 'lucide-react';
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
    return localStorage.getItem('cineTheme') || 'light'; // Default to light for a cleaner student look
  });

  // --- Effects ---
  useEffect(() => {
    localStorage.setItem('cineTheme', theme);
  }, [theme]);

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Could not connect to the API server.');
      const data = await response.json();
      setAllMovies(data.slice(0, 100)); // Limit for performance
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

  // --- HOF Logic (Milestone 3 Core Requirement) ---

  // 1. Dynamic Genre Extraction using reduce()
  const genres = useMemo(() => {
    return allMovies.reduce((acc, movie) => {
      movie.genres?.forEach(g => {
        if (!acc.includes(g)) acc.push(g);
      });
      return acc;
    }, []).sort();
  }, [allMovies]);

  // 2. Filtering & Sorting using filter() and sort()
  const displayMovies = useMemo(() => {
    // Stage 1: Filter
    let result = allMovies.filter(movie => {
      const matchesSearch = movie.name.toLowerCase().includes(searchQuery.toLowerCase().trim());
      const matchesGenre = selectedGenre === '' || movie.genres?.includes(selectedGenre);
      return matchesSearch && matchesGenre;
    });

    // Stage 2: Sort
    if (sortBy !== 'default') {
      result.sort((a, b) => {
        if (sortBy === 'rating-desc') return (b.rating?.average || 0) - (a.rating?.average || 0);
        if (sortBy === 'year-desc') {
          const yearA = a.premiered ? parseInt(a.premiered.substring(0, 4)) : 0;
          const yearB = b.premiered ? parseInt(b.premiered.substring(0, 4)) : 0;
          return yearB - yearA;
        }
        if (sortBy === 'title-asc') return a.name.localeCompare(b.name);
        return 0;
      });
    }

    return result;
  }, [allMovies, searchQuery, selectedGenre, sortBy]);

  // --- Interactions ---
  const toggleFavorite = (id) => {
    const updated = favorites.includes(id)
      ? favorites.filter(favId => favId !== id)
      : [...favorites, id];
    setFavorites(updated);
    localStorage.setItem('cineFavorites', JSON.stringify(updated));
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="app-container" data-theme={theme}>
      <Navbar 
        theme={theme}
        toggleTheme={toggleTheme}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
        sortBy={sortBy}
        setSortBy={setSortBy}
        genres={genres}
        favoritesCount={favorites.length}
      />

      <main className="main-content">
        <div className="wrapper" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
          {loading ? (
            <Loader />
          ) : error ? (
            <div className="error-state animate-fade-in shadow-sm">
              <AlertCircle size={48} color="#ef4444" style={{ marginBottom: '1rem' }} />
              <h2 style={{ marginBottom: '0.5rem' }}>Connection Problem</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>{error}</p>
              <button className="btn btn-primary" onClick={fetchMovies}>Try Reconnecting</button>
            </div>
          ) : (
            <>
              <div className="section-header">
                <div>
                  <h2>{selectedGenre ? `${selectedGenre} Shows` : searchQuery ? 'Search Results' : 'Explore Movies'}</h2>
                  <p className="results-text">Showing {displayMovies.length} movies based on your filters</p>
                </div>
                <div className="stats-badge">
                  <Bookmark size={16} />
                  <span>{allMovies.length} Total</span>
                </div>
              </div>

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
                  <Film size={64} style={{ opacity: 0.1, marginBottom: '1rem' }} />
                  <h3>No matches found</h3>
                  <p>Try changing your filters or searching for something else.</p>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <footer className="footer">
        <div className="wrapper" style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1.5rem', textAlign: 'center' }}>
          <p>&copy; 2024 CineSeek - Milestone 3 Project submission</p>
          <p style={{ fontSize: '0.8rem', opacity: 0.6, marginTop: '0.5rem' }}>Built with React & TVMaze API</p>
        </div>
      </footer>

      <style jsx>{`
        .main-content {
          padding-top: 2rem;
          padding-bottom: 4rem;
          min-height: calc(100vh - 72px - 140px);
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid var(--border);
        }

        .section-header h2 {
          font-size: 1.75rem;
          font-weight: 700;
        }

        .results-text {
          font-size: 0.95rem;
          color: var(--text-muted);
          margin-top: 0.25rem;
        }

        .stats-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          background: var(--bg-card);
          padding: 8px 16px;
          border-radius: 100px;
          border: 1px solid var(--border);
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-muted);
        }

        .footer {
          background: var(--bg-card);
          border-top: 1px solid var(--border);
          color: var(--text-muted);
          font-size: 0.9rem;
        }

        @media (max-width: 640px) {
          .section-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
        }
      `}</style>
    </div>
  );
}

export default App;
