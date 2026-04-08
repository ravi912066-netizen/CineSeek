import React from 'react';
import { Search, Filter, SortAsc } from 'lucide-react';
import './FilterBar.css';

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
    </div>
  );
};

export default FilterBar;
