import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function AddCharacterForm({ onCharacterAdded }) {
    const [name, setName] = useState('')
    const [species, setSpecies] = useState('')
    const [image, setImage] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        const newCharacter = {
            name,
            species,
            image
        }
        
        axios.post('https://rick-morty-universe-5598d-default-rtdb.europe-west1.firebasedatabase.app/character.json', newCharacter)
            .then(response => {
                console.log('Character added successfully:', response.data)
                onCharacterAdded(); // Call the callback to refresh the character list
                setName('');
                setSpecies('');
                setImage('');
                navigate('/')
            })
            .catch(error => {
                console.error('Error adding character:', error)
            })
    }

    return (
        <div className="add-character-form">
            <h1>Add Character</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="text" name="species" placeholder="Species" value={species} onChange={(e) => setSpecies(e.target.value)} />
                <input type="text" name="image" placeholder="Image" value={image} onChange={(e) => setImage(e.target.value)} />
                <button type="submit">Add Character</button>
            </form>
        </div>
    )
}

export default AddCharacterForm;