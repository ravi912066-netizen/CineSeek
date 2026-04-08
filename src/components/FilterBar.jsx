import React from 'react';
import { Search, Filter, SortAsc } from 'lucide-react';

const FilterBar = ({ 
  searchQuery, 
  setSearchQuery, 
  selectedGenre, 
  setSelectedGenre, 
  sortBy, 
  setSortBy, 
  genres 
}) => {
  return (
    <div className="filter-bar glass">
      <div className="search-box">
        <Search className="search-icon" size={20} />
        <input 
          type="text" 
          placeholder="Search movies, tv shows..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="controls">
        <div className="select-wrapper">
          <Filter size={18} className="select-icon" />
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

        <div className="select-wrapper">
          <SortAsc size={18} className="select-icon" />
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

      <style jsx>{`
        .filter-bar {
          display: flex;
          flex-wrap: wrap;
          gap: 1.5rem;
          padding: 1.5rem;
          border-radius: 20px;
          margin-bottom: 3rem;
          align-items: center;
          justify-content: space-between;
        }

        .search-box {
          position: relative;
          flex: 1;
          min-width: 280px;
        }

        .search-icon {
          position: absolute;
          left: 1.2rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
        }

        .search-box input {
          width: 100%;
          padding: 1rem 1rem 1rem 3.5rem;
          border-radius: 12px;
          border: 1px solid var(--glass-border);
          background: rgba(0, 0, 0, 0.2);
          color: white;
          font-family: inherit;
          font-size: 1rem;
          transition: var(--transition);
        }

        .search-box input:focus {
          outline: none;
          border-color: var(--primary);
          background: rgba(0, 0, 0, 0.4);
          box-shadow: 0 0 0 4px rgba(229, 9, 20, 0.1);
        }

        .controls {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .select-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .select-icon {
          position: absolute;
          left: 1rem;
          color: var(--text-muted);
          pointer-events: none;
        }

        select {
          padding: 0.8rem 1rem 0.8rem 3rem;
          border-radius: 12px;
          border: 1px solid var(--glass-border);
          background: rgba(0, 0, 0, 0.2);
          color: white;
          font-family: inherit;
          cursor: pointer;
          appearance: none;
          min-width: 160px;
          transition: var(--transition);
        }

        select:focus {
          outline: none;
          border-color: var(--primary);
        }

        @media (max-width: 768px) {
          .filter-bar {
            flex-direction: column;
            align-items: stretch;
          }
          .controls {
            justify-content: space-between;
          }
          .select-wrapper {
            flex: 1;
          }
          select {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default FilterBar;
