import './Translation.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import React from 'react';

//https://bible-api.com/data//

function Translation() {
  const [data, setData] = useState([]);

  async function main() {
  const { data } = await axios.get("https://bible-api.com/data")
  setData(data);
  }

  useEffect(() => {
    main();
  }, []);


  return (
    <div>
      {data.length > 0 ? (
        <h1>{data[0]?.name}</h1>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  )
}

export default Translation