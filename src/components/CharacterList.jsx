import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'

const CharacterList = () => {
    const [CharacterToDisplay, setCharacterToDisplay] = useState([]);

    useEffect(() => {
        axios.get("https://rick-morty-universe-5598d-default-rtdb.europe-west1.firebasedatabase.app/character.json")
            .then(response => {
                const characterObj = response.data;

                const charactersArr = Object.keys(characterObj).map((id) => ({
                    id,
                    ...characterObj[id],
                }));

            setCharacterToDisplay(charactersArr);
            console.log(charactersArr)
})
.catch ((error) => {
    console.log("error Page")
})
},[])

if(CharacterToDisplay === null){
    console.log("...loading")
}
return (
    <div>
        <p>Hello Characters</p>
        {CharacterToDisplay.map((characterDetail)=>{
            return(
                <div>
                    <h2>{characterDetail.name}</h2>
                    <h3>{characterDetail.species}</h3>
                    <img src={characterDetail.image} alt={characterDetail.name} />
                </div>
            )
        })}
    </div>
)
}

export default CharacterList
