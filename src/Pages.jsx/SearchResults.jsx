import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./SearchResults.css";

const MovieDetailModal = ({ movie, isOpen, onClose }) => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen && movie) {
      fetchMovieDetails(movie.id);
    }
  }, [isOpen, movie]);

  const fetchMovieDetails = async (imdbId) => {
    setLoading(true);
    setError(null);
    try {
      const url = `https://www.omdbapi.com/?apikey=67c5f77b&i=${imdbId}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.Response === "True") {
        setMovieDetails(data);
      } else {
        setError("Failed to load movie details.");
      }
    } catch (e) {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        {loading && <p className="modal-loading">Loading...</p>}
        {error && <p className="modal-error">{error}</p>}
        {movieDetails && (
          <div className="movie-details">
            <div className="details-container">
              <div className="details-poster">
                {movieDetails.Poster && movieDetails.Poster !== "N/A" ? (
                  <img src={movieDetails.Poster} alt={movieDetails.Title} />
                ) : (
                  <div className="no-poster-large">No Image</div>
                )}
              </div>
              <div className="details-info">
                <h2>{movieDetails.Title}</h2>
                <p className="details-year">{movieDetails.Year}</p>
                
                <div className="details-section">
                  <h3>Plot</h3>
                  <p>{movieDetails.Plot}</p>
                </div>
                
                <div className="details-section">
                  <h3>Cast</h3>
                  <p>{movieDetails.Actors && movieDetails.Actors !== "N/A" ? movieDetails.Actors : "Cast information not available"}</p>
                </div>
                
                <div className="details-section">
                  <h3>Budget</h3>
                  <p>{movieDetails.Budget && movieDetails.Budget !== "N/A" ? movieDetails.Budget : "Budget information not available"}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { query, results: initialResults } = location.state || { query: "", results: [] };
  
  const [results, setResults] = useState(initialResults);
  const [filter, setFilter] = useState("a-z");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    applyFilter(results, filter);
  }, [filter]);

  const applyFilter = (movies, filterMode) => {
    let sorted = [...movies];
    if (filterMode === "a-z") {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else if (filterMode === "z-a") {
      sorted.sort((a, b) => b.title.localeCompare(a.title));
    } else if (filterMode === "newest") {
      sorted.sort((a, b) => (parseInt(b.year || 0, 10)) - (parseInt(a.year || 0, 10)));
    } else if (filterMode === "oldest") {
      sorted.sort((a, b) => (parseInt(a.year || 0, 10)) - (parseInt(b.year || 0, 10)));
    }
    setResults(sorted);
  };

  const handleFilterChange = (e) => {
    const newFilter = e.target.value;
    setFilter(newFilter);
  };

  const handlePosterClick = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  return (
    <div className="search-results">
      <button onClick={() => navigate("/")} className="back-button">
        ← Back to Search
      </button>

      <h2>Search Results for "{query}"</h2>
      
      <div className="results-header">
        <p className="result-count">{results.length} results found</p>
        
        <select id="filter-select" value={filter} onChange={handleFilterChange}>
          <option value="a-z">Sort A-Z</option>
          <option value="z-a">Sort Z-A</option>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>

      {results.length === 0 ? (
        <p className="no-results">No movies found. Try a different search.</p>
      ) : (
        <div className="results-grid">
          {results.map((result) => (
            <div key={result.id} className="result-card" onClick={() => handlePosterClick(result)}>
              <div className="result-poster">
                {result.poster ? (
                  <img src={result.poster} alt={result.title} loading="lazy" />
                ) : (
                  <div className="no-poster">No Image</div>
                )}
              </div>
              <div className="result-info">
                <h3>{result.title}</h3>
                <p className="result-year">{result.year || "N/A"}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <MovieDetailModal movie={selectedMovie} isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default SearchResults;
