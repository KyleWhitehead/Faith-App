import './App.css';
import React from 'react';
import FontAwesomeComponent from './Components/FontAwesomeComponent';
import { BrowserRouter as Router, Link} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className='body'>
        <div className='navbar'>
        <div className='nav__links'>
          <div className='nav__link' onClick={() => {}}>
            Home
          </div>
          <div className='nav__link' onClick={() => {}}>
            About
          </div>
          <div className='nav__link' onClick={() => {}}>
            Contact
          </div>
          <Link to="/translations" 
          className='nav__link'
          target='blank'>
            Translations
          </Link>
        </div>
      </div>
      <h1>Bible App</h1>
      <section className='Description'>
        <h2>Welcome to the Bible App</h2>
        <p className='description__para'>
          This app provides access to the Bible in various translations and
          languages. You can read, search, and explore the scriptures with ease.
        </p>
        <p className='description__para'>
          Lorem 
          ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </section>
      <section>
        <div className='Features'>
          <div>
        <h2>Features</h2>
        <ul className='features__list'>
          <li className='features__list--items'>Bible translations</li>
          <li className='features__list--items'>Bookmarking and notes</li>
          <li className='features__list--items'>Many languages</li>
        </ul>
          </div>
        </div>
      </section>
      <section>
        <div className='Testimonials'>
        <h2>Testimonials</h2>
        <p className='testimonial__para'>"This app has transformed my Bible study experience!" - John D.</p>
        <p className='testimonial__para'>"I love the variety of translations available." - Sarah K.</p>
        </div>
      </section>
      <footer>
        <FontAwesomeComponent />
        <p className='footer__para'>&copy; 2024 Bible App. All rights reserved.</p>
      </footer>
      </div>
    </Router>
  );
}

export default App;
