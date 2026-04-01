import React from 'react'
import './Translation.css'
import { BrowserRouter as Router, Route,} from 'react-router-dom';

//https://bible-api.com/BOOK+CHAPTER:VERSE//
//https://bible-api.com/data//

const Translation = () => {
  return (
    <Router>
      <Route path="/translations" component={() => <h1>Translations Page</h1>} />
    </Router>
  )
}

export default Translation