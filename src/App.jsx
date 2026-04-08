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

  // --- Theme Effect ---
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('cineTheme', theme);
  }, [theme]);

  // --- Fetch Data ---
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('API connection failed');
        const data = await response.json();
        // Limit to 100 for better performance
        setAllMovies(data.slice(0, 100));
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  // --- Extract Genres (using reduce HOF) ---
  const genres = useMemo(() => {
    const allGenres = allMovies.reduce((acc, movie) => {
      if (movie.genres) {
        movie.genres.forEach(g => {
          if (!acc.includes(g)) acc.push(g);
        });
      }
      return acc;
    }, []);
    return allGenres.sort(); // Sort alphabetically
  }, [allMovies]);

  // --- Filtering & Sorting (using HOFs) ---
  const displayMovies = useMemo(() => {
    // 1. Filter by Search & Genre
    let result = allMovies.filter(movie => {
      const matchesSearch = movie.name.toLowerCase().includes(searchQuery.toLowerCase().trim());
      const matchesGenre = selectedGenre === '' || (movie.genres && movie.genres.includes(selectedGenre));
      return matchesSearch && matchesGenre;
    });

    // 2. Sort results
    result.sort((a, b) => {
      const ratingA = a.rating?.average || 0;
      const ratingB = b.rating?.average || 0;
      const yearA = a.premiered ? parseInt(a.premiered.substring(0, 4)) : 0;
      const yearB = b.premiered ? parseInt(b.premiered.substring(0, 4)) : 0;

      switch (sortBy) {
        case 'rating-desc':
          return ratingB - ratingA;
        case 'year-desc':
          return yearB - yearA;
        case 'title-asc':
          return a.name.localeCompare(b.name);
        default:
          return 0; // Maintain original order
      }
    });

    return result;
  }, [allMovies, searchQuery, selectedGenre, sortBy]);

  // --- Interactions ---
  const toggleFavorite = (id) => {
    const newFavorites = favorites.includes(id)
      ? favorites.filter(favId => favId !== id)
      : [...favorites, id];
    
    setFavorites(newFavorites);
    localStorage.setItem('cineFavorites', JSON.stringify(newFavorites));
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="app-container">
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
            <button className="btn btn-primary" onClick={() => window.location.reload()}>Try Again</button>
          </div>
        ) : (
          <main>
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
