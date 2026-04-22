import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FontAwesomeComponent from "../Components/FontAwesomeComponent";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("a-z");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState([]);

  const searchChange = async () => {
    const q = query.trim();
    if (!q) {
      setResults([]);
      return;
    }
    
    setLoading(true);
    setError(null);
    try {
      const url = `https://www.omdbapi.com/?apikey=67c5f77b&s=${encodeURIComponent(q)}`;
      const res = await fetch(url);
      const data = await res.json();
      
      if (data.Response === "True") {
        const list = data.Search || [];
        const movies = list.map((r) => ({
          id: r.imdbID,
          title: r.Title,
          year: r.Year ? parseInt(r.Year, 10) : "",
          poster: r.Poster && r.Poster !== "N/A" ? r.Poster : "",
        }));
        const sortedMovies = applyFilter(movies, filter);
        // Navigate to SearchResults page with results
        navigate("/search-results", { state: { query: q, results: sortedMovies } });
      } else {
        setError(data.Error || "No results found.");
      }
    } catch (e) {
      setError("Something went wrong. Please try again.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

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
    return sorted;
  };



  return (
    <div>
      <h2>Movie App</h2>
      <input
        id="home__input"
        className="home__input"
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search for a movie (e.g., 'Inception')"
        onKeyPress={(event) => event.key === "Enter" && searchChange()}
      />
      <button className="home__button" onClick={searchChange}>
        Search
      </button>

      {error && <p className="error">{error}</p>}

      <section className="Description">
        <h2>Welcome to the Movie App</h2>
        <p className="description__para">
          This app provides access to a vast collection of movies and TV shows. You can search, browse, and discover your next favorite entertainment.
        </p>
        <p className="description__para">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </section>
      <section>
        <div className="Features">
          <div>
            <h2>Features</h2>
            <ul className="features__list">
              <li className="features__list--items">Movie database</li>
              <li className="features__list--items">Search and filtering</li>
              <li className="features__list--items">User reviews and ratings</li>
            </ul>
          </div>
        </div>
      </section>
      <section>
        <div className="Testimonials">
          <h2>Testimonials</h2>
          <p className="testimonial__para">
            "This app has transformed my movie-watching experience!" - John D.
          </p>
          <p className="testimonial__para">
            "I love the variety of movies available." - Sarah K.
          </p>
        </div>
      </section>
      <footer className="footer">
        <FontAwesomeComponent />
        <p className="footer__para">
          &copy; 2024 Movie App. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Home;
