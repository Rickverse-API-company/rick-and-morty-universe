import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


function CharacterList() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    axios
      .get("https://rickandmortyapi.com/api/character")
      .then((response) => {
        setCharacters(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching characters:", error);
      });
  }, []);

  return (
    <main className="CharacterList">
      <h2>Character List with {characters.length} characters</h2>
      <ul>
        {characters.map((characterDetails) => (
          <li key={characterDetails.id}>
            <img src={characterDetails.image} alt={characterDetails.name} />
            <h3>{characterDetails.name}</h3>
            <p>
              Species: <b>{characterDetails.species}</b>
            </p>
            <p>
              Status: <b>{characterDetails.status}</b>
            </p>
            <p>
              Location: <b>{characterDetails.location.name}</b>
            </p>
            <Link to={`/character/${characterDetails.id}`} id="button">
              More Details
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default CharacterList;