// API Endpoint
const API_URL = 'https://api.tvmaze.com/shows';

// Global State
let allMovies = []; // Original fetched data
let filteredMovies = []; // Data currently displayed
let favorites = JSON.parse(localStorage.getItem('cineFavorites')) || [];

// DOM Elements
const elements = {
    grid: document.getElementById('movie-grid'),
    loader: document.getElementById('loader'),
    noResults: document.getElementById('no-results'),
    searchInput: document.getElementById('search-input'),
    genreFilter: document.getElementById('genre-filter'),
    sortSelect: document.getElementById('sort-select'),
    themeToggle: document.getElementById('theme-toggle')
};

// Initialize App
async function init() {
    initTheme();
    setupEventListeners();
    await fetchMovies();
}

// 1. API Integration (fetch) & Loading State
async function fetchMovies() {
    showLoader(true);
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Failed to fetch data');
        
        const data = await response.json();
        // TVMaze gives a huge list, take only top 100 for better performance.
        allMovies = data.slice(0, 100);
        filteredMovies = [...allMovies];
        
        // Extract unique genres for dropdown dynamically
        populateGenres(allMovies);
        
        renderMovies(filteredMovies);
    } catch (error) {
        console.error("Error connecting to API:", error);
        elements.noResults.innerHTML = `<h2>Error fetching data</h2><p>${error.message}</p>`;
        elements.noResults.classList.remove('hidden');
    } finally {
        showLoader(false);
    }
}

// Extract genres from JSON using reduce Higher Order Function
function populateGenres(movies) {
    const genres = movies.reduce((acc, movie) => {
        if (movie.genres) {
            movie.genres.forEach(g => {
                if (!acc.includes(g)) acc.push(g);
            });
        }
        return acc;
    }, []).sort(); // Sort alphabetically

    elements.genreFilter.innerHTML = '<option value="">All Genres</option>';
    genres.forEach(genre => {
        const option = document.createElement('option');
        option.value = genre;
        option.textContent = genre;
        elements.genreFilter.appendChild(option);
    });
}

// 2. Render UI using map (HOF)
function renderMovies(movies) {
    elements.grid.innerHTML = '';
    
    if (movies.length === 0) {
        elements.grid.classList.add('hidden');
        elements.noResults.classList.remove('hidden');
        return;
    }

    elements.grid.classList.remove('hidden');
    elements.noResults.classList.add('hidden');

    // Create cards using map
    const cardsHTML = movies.map(movie => createMovieCard(movie)).join('');
    elements.grid.innerHTML = cardsHTML;
}

// Generating HTML string for a single movie
function createMovieCard(movie) {
    const isFav = favorites.includes(movie.id);
    const posterUrl = movie.image?.medium || `https://via.placeholder.com/300x450?text=No+Poster`;
    const rating = movie.rating?.average || 'N/A';
    const year = movie.premiered ? movie.premiered.substring(0, 4) : 'N/A';
    const network = movie.network?.name || 'Web';
    
    // Using map (HOF) to render tags
    const genresHtml = movie.genres ? movie.genres.map(g => `<span class="genre-tag">${g}</span>`).join('') : '';
    const plotText = movie.summary ? movie.summary.replace(/<[^>]*>?/gm, '').substring(0, 100) : 'No description available.';
    
    return `
        <article class="movie-card" data-id="${movie.id}">
            <img src="${posterUrl}" alt="${movie.name} poster" class="movie-poster" loading="lazy" onerror="this.src='https://via.placeholder.com/300x450?text=No+Poster'">
            <div class="movie-info">
                <div class="movie-header">
                    <h3 class="movie-title">${movie.name}</h3>
                    <div class="movie-rating"><i class="fas fa-star"></i> ${rating}</div>
                </div>
                <div class="movie-year">${year} • ${network}</div>
                <div class="movie-genres">${genresHtml}</div>
                <p class="movie-plot">${plotText}...</p>
                
                <div class="card-actions">
                    <button class="btn-primary" onclick="alert('Viewing details for ${movie.name.replace(/'/g, "\\'")}!')">View Details</button>
                    <button class="btn-favorite ${isFav ? 'active' : ''}" onclick="toggleFavorite(${movie.id}, this)" aria-label="Favorite">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
            </div>
        </article>
    `;
}

// 3. Core Features: Filtering, Searching, Sorting (Using HOFs)
function applyFilters() {
    const searchTerm = elements.searchInput.value.toLowerCase().trim();
    const genre = elements.genreFilter.value;
    const sortBy = elements.sortSelect.value;

    // Search & Genre Filtering (using filter HOF)
    filteredMovies = allMovies.filter(movie => {
        const titleMatch = movie.name.toLowerCase().includes(searchTerm);
        const matchesGenre = genre === "" || (movie.genres && movie.genres.includes(genre));
        return titleMatch && matchesGenre;
    });

    // Sorting (using sort HOF)
    filteredMovies.sort((a, b) => {
        const ratingA = a.rating?.average || 0;
        const ratingB = b.rating?.average || 0;
        const yearA = a.premiered ? parseInt(a.premiered.substring(0,4)) : 0;
        const yearB = b.premiered ? parseInt(b.premiered.substring(0,4)) : 0;

        switch (sortBy) {
            case 'rating-desc':
                return ratingB - ratingA;
            case 'year-desc':
                return yearB - yearA;
            case 'title-asc':
                return a.name.localeCompare(b.name);
            default:
                return 0; // Default order from API
        }
    });

    renderMovies(filteredMovies);
}

// 4. Bonus Feature: Debouncing for Search
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

// Event Listeners Setup
function setupEventListeners() {
    // Debounced search
    const debouncedSearch = debounce(() => {
        applyFilters();
    }, 400); // 400ms delay

    elements.searchInput.addEventListener('input', debouncedSearch);
    elements.genreFilter.addEventListener('change', applyFilters);
    elements.sortSelect.addEventListener('change', applyFilters);
    elements.themeToggle.addEventListener('click', toggleTheme);
}

// 5. Button Interactions & Local Storage
window.toggleFavorite = function(movieId, btnElement) {
    if (favorites.includes(movieId)) {
        favorites = favorites.filter(id => id !== movieId); // Remove
        btnElement.classList.remove('active');
    } else {
        favorites.push(movieId); // Add
        btnElement.classList.add('active');
    }
    // Save to local storage
    localStorage.setItem('cineFavorites', JSON.stringify(favorites));
};

// Dark Mode Toggle using Local Storage
function initTheme() {
    const savedTheme = localStorage.getItem('cineTheme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        elements.themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'dark') {
        document.documentElement.removeAttribute('data-theme');
        elements.themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('cineTheme', 'light');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        elements.themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('cineTheme', 'dark');
    }
}

// Helper: Loader State
function showLoader(show) {
    if (show) {
        elements.loader.classList.remove('hidden');
        elements.grid.classList.add('hidden');
    } else {
        elements.loader.classList.add('hidden');
    }
}

// Boot up
document.addEventListener('DOMContentLoaded', init);
