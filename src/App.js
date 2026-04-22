import React from 'react';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import Home from './Pages.jsx/Home';
import About from './Pages.jsx/About';
import Contact from './Pages.jsx/Contact';
import SearchResults from './Pages.jsx/SearchResults';
import Nav from './Pages.jsx/Nav';

function App() {
  return (
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/search-results" element={<SearchResults />} />
        </Routes>
      </Router>
  );
}

export default App;
