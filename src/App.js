import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Home from './Pages.jsx/Home';
import About from './Pages.jsx/About';
import Contact from './Pages.jsx/Contact';
import Translation from './Pages.jsx/Translation';
function App() {
  return (
   <div>
      <Router>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/translation" target="_blank">Translations</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/translation" element={<Translation />} />
        </Routes>
      </Router>

   </div>
  );
}

export default App;
