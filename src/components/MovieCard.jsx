import React from 'react';
import { Star, Heart, ExternalLink } from 'lucide-react';

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

      <style jsx>{`
        .movie-card {
          background: var(--bg-card);
          border-radius: 16px;
          overflow: hidden;
          transition: var(--transition);
          border: 1px solid var(--glass-border);
          position: relative;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .movie-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 12px 40px rgba(0,0,0,0.5);
          border-color: var(--primary);
        }

        .poster-container {
          position: relative;
          aspect-ratio: 2/3;
          overflow: hidden;
        }

        .movie-poster {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .movie-card:hover .movie-poster {
          transform: scale(1.1);
        }

        .overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.9), transparent);
          opacity: 0;
          transition: var(--transition);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 1.5rem;
        }

        .movie-card:hover .overlay {
          opacity: 1;
        }

        .btn-favorite {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: rgba(0,0,0,0.5);
          backdrop-filter: blur(4px);
          border: 1px solid rgba(255,255,255,0.2);
          color: white;
          padding: 0.5rem;
          border-radius: 50%;
          cursor: pointer;
          transition: var(--transition);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
        }

        .btn-favorite:hover {
          background: var(--primary);
          border-color: var(--primary);
          transform: scale(1.1);
        }

        .btn-favorite.active {
          color: var(--primary);
          background: white;
        }

        .movie-summary {
          font-size: 0.85rem;
          color: #ddd;
          margin-bottom: 1rem;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .movie-info {
          padding: 1.2rem;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }

        .movie-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 0.5rem;
        }

        .movie-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--text-main);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .movie-rating {
          display: flex;
          align-items: center;
          gap: 4px;
          background: rgba(255, 193, 7, 0.1);
          color: #ffc107;
          padding: 2px 8px;
          border-radius: 8px;
          font-size: 0.85rem;
          font-weight: 600;
        }

        .movie-meta {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .movie-year {
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .movie-genres {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
        }

        .genre-tag {
          font-size: 0.7rem;
          background: var(--bg-card);
          padding: 2px 8px;
          border-radius: 4px;
          color: var(--text-muted);
          border: 1px solid var(--glass-border);
        }
      `}</style>
    </article>
  );
};

export default MovieCard;
