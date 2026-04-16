import React from 'react';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import Home from './Pages.jsx/Home';
import About from './Pages.jsx/About';
import Contact from './Pages.jsx/Contact';
import Translation from './Pages.jsx/Translation';
import Nav from './Pages.jsx/Nav';

function App() {
  return (
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/translation" element={<Translation />} />
        </Routes>
      </Router>
  );
}

export default App;
