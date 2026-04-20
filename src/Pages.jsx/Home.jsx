import React, { useState } from "react";
import FontAwesomeComponent from "../Components/FontAwesomeComponent";
import "./Home.css";

const Home = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("chapter");

  async function searchChange() {
    const q = query.trim();
    setError("");
    setResults([]);

    if (!q) {
      return;
    }

    setLoading(true);
    try {
      const url = `https://bible-api.com/${encodeURIComponent(q)}`;
      const res = await fetch(url);
      const data = await res.json();
      const verses = (data.verses || []).slice(0, 10); // Limit to 10 results

      if (!verses.length) {
        setError("No verses found for that search term.");
        return;
      }

      setResults(
        verses.map((verse) => ({
          text: verse.text,
          reference: `${verse.book_name} ${verse.chapter}:${verse.verse}`,
          chapter: verse.chapter,
          verse: verse.verse,
        })),
      );
    } catch (fetchError) {
      console.error("Error fetching Bible verses:", fetchError);
      setError("Error fetching verses. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleFilterChange(event) {
    const selectedFilter = event.target.value;
    setFilter(selectedFilter);

    setResults((prevResults) => {
      const sortedResults = [...prevResults];

      if (selectedFilter === "chapter") {
        return sortedResults.slice().sort((a, b) => a.chapter - b.chapter || b.chapter - a.chapter);
      }

      if (selectedFilter === "verse") {
        return sortedResults.slice().sort((a, b) => a.verse - b.verse || b.verse - a.verse);
      }

      return sortedResults;
    });
  }

  return (
    <div>
      <h2>Bible App</h2>
      <input
        id="home__input"
        className="home__input"
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search for a verse (e.g., John 3:16, JHN 3:16, John 3:16-18)"
        onKeyPress={(event) => event.key === "Enter" && searchChange()}
      />
      <button className="home__button" onClick={searchChange}>
        Search
      </button>
      <select id="filter-select" value={filter} onChange={handleFilterChange}>
        <option value="chapter">Chapter</option>
        <option value="verse">Verse</option>
      </select>

      <section id="results" className="results">
        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}
        {results.length > 0 && (
          <ul className="results__list">
            {results.map((result, index) => (
              <li key={index} className="results__item card">
                <strong>{result.reference}</strong>
                <p className="results__para">{result.text}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="Description">
        <h2>Welcome to the Bible App</h2>
        <p className="description__para">
          This app provides access to the Bible in various translations and
          languages. You can read, search, and explore the scriptures with ease.
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
              <li className="features__list--items">Bible translations</li>
              <li className="features__list--items">Bookmarking and notes</li>
              <li className="features__list--items">Many languages</li>
            </ul>
          </div>
        </div>
      </section>
      <section>
        <div className="Testimonials">
          <h2>Testimonials</h2>
          <p className="testimonial__para">
            "This app has transformed my Bible study experience!" - John D.
          </p>
          <p className="testimonial__para">
            "I love the variety of translations available." - Sarah K.
          </p>
        </div>
      </section>
      <footer className="footer">
        <FontAwesomeComponent />
        <p className="footer__para">
          &copy; 2024 Bible App. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Home;
