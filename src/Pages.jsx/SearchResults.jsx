import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./SearchResults.css";

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { query, results: initialResults } = location.state || { query: "", results: [] };
  
  const [results, setResults] = useState(initialResults);
  const [filter, setFilter] = useState("a-z");

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
            <div key={result.id} className="result-card">
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
    </div>
  );
};

export default SearchResults;
