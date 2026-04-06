import React from 'react'
import './Translation.css'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

//https://bible-api.com/data//

const Translation = () => {
  return (
    <Router>
      <Routes>
        <Route path="/translations" element={<h1>Translations Page</h1>} />
        <input type="text" placeholder='Search for a translation' className='search__input' />
        <button className='search__button' >Search</button>
      </Routes>
    </Router>
  )
}

export default Translation