import React, { use } from 'react'
import './Translation.css'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react';

//https://bible-api.com/data//

const Translation = () => {
  const { translation } = useParams();
  useEffect(() => {
    fetch(`https://bible-api.com/data/${translation}`)
      .then(response => response.json())
  }, []);


  return (
    <h1>Translation</h1>
  )
}

export default Translation