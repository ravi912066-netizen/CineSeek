import React from 'react';
import { Heart, Calendar, Star } from 'lucide-react';
import './MovieCard.css';

const MovieCard = ({ movie, isFavorite, onToggleFavorite }) => {
  return (
    <div className="movie-card animate-fade-in shadow-sm">
      <div className="card-poster-wrapper">
        <img 
          src={movie.image?.medium || 'https://via.placeholder.com/210x295?text=No+Poster'} 
          alt={movie.name} 
          className="card-poster"
          loading="lazy"
        />
        <div className="card-rating">
          <Star size={14} fill="currentColor" />
          <span>{movie.rating?.average || '0.0'}</span>
        </div>
        <button 
          className={`fav-btn ${isFavorite ? 'is-favorite' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(movie.id);
          }}
          title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        >
          <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="card-info">
        <h3>{movie.name}</h3>
        
        <div className="card-meta">
          <Calendar size={14} />
          <span>{movie.premiered ? movie.premiered.substring(0, 4) : 'N/A'}</span>
          <span className="dot">•</span>
          <span>{movie.language}</span>
        </div>

        <div className="card-genres">
          {movie.genres && movie.genres.slice(0, 3).map(genre => (
            <span key={genre} className="genre-tag">{genre}</span>
          ))}
        </div>

        <div className="card-btn">
          <button className="btn btn-details">View Details</button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
