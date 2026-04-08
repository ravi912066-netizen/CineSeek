import React from 'react';
import { Star, Heart, ExternalLink } from 'lucide-react';
import './MovieCard.css';

const MovieCard = ({ movie, isFavorite, onToggleFavorite }) => {
  const posterUrl = movie.image?.medium || `https://via.placeholder.com/300x450?text=No+Poster`;
  const rating = movie.rating?.average || 'N/A';
  const year = movie.premiered ? movie.premiered.substring(0, 4) : 'N/A';
  
  // Using map HOF for genre tags
  const genreTags = movie.genres ? movie.genres.map(g => (
    <span key={g} className="genre-tag">{g}</span>
  )) : null;

  return (
    <article className="movie-card animate-fade-in">
      <div className="poster-container">
        <img 
          src={posterUrl} 
          alt={movie.name} 
          className="movie-poster" 
          loading="lazy" 
        />
        <div className="overlay">
          <button 
            className={`btn-favorite ${isFavorite ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(movie.id);
            }}
          >
            <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
          </button>
          
          <div className="overlay-content">
            <p className="movie-summary">
              {movie.summary ? movie.summary.replace(/<[^>]*>?/gm, '').substring(0, 120) + '...' : 'No description available.'}
            </p>
            <a 
              href={movie.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-primary btn-sm"
              style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', width: 'fit-content' }}
            >
              <ExternalLink size={14} /> Full Info
            </a>
          </div>
        </div>
      </div>
      
      <div className="movie-info">
        <div className="movie-header">
          <h3 className="movie-title">{movie.name}</h3>
          <div className="movie-rating">
            <Star size={14} fill="#ffc107" color="#ffc107" />
            <span>{rating}</span>
          </div>
        </div>
        <div className="movie-meta">
          <span className="movie-year">{year}</span>
          <div className="movie-genres">
            {genreTags}
          </div>
        </div>
      </div>
    </article>
  );
};

export default MovieCard;
