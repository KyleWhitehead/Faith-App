import "./Translation.css";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";

//https://bible-api.com/data//

function Translation() {
  const [data, setData] = useState([]);

  async function main() {
    const { data } = await axios.get("https://bible-api.com/data");
    setData(data.translations);
  }

  useEffect(() => {
    main();
  }, []);

  return (
    <div>
      {data.length > 0 ? (
        data.map((item) => (
          <div key={item.id} className="translation__card">
            <h2>{item.name}</h2>
            <p>{item.language}</p>
            <p>{item.identifier}</p>
          </div>
        ))
      ) : (
        <p>Loading translations...</p>
      )}
    </div>
  );
}

export default Translation;