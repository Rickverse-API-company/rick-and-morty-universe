import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './AddCharacterForm.css'

function AddCharacterForm({ onCharacterAdded }) {
    const [name, setName] = useState('')
    const [species, setSpecies] = useState('')
    const [image, setImage] = useState('')
    const [status, setStatus] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        const newCharacter = {
            name,
            species,
            image,
            status: "Alive"
        }
        
        onCharacterAdded(newCharacter)
            .then(() => {
                setName('');
                setSpecies('');
                setImage('');
                setStatus('');
                navigate('/')
            })
            .catch(error => {
                console.error('Error adding character:', error)
            })
    }

    return (
        <section className="add-character-section">
            <div className="portal-decoration portal-top-right"></div>
            <div className="portal-decoration portal-bottom-left"></div>
            
            <div className="form-container">
                <h1 className="form-title">Add New Character</h1>
                <p className="form-subtitle">Create your own character in the Rick and Morty universe</p>
                
                <form className="character-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label" htmlFor="name"></label>
                        <input
                            className="form-input"
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter character name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="species"></label>
                        <input
                            className="form-input"
                            type="text"
                            id="species"
                            name="species"
                            placeholder="Enter character species"
                            value={species}
                            onChange={(e) => setSpecies(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="image"></label>
                        <input
                            className="form-input"
                            type="url"
                            id="image"
                            name="image"
                            placeholder="Enter character image URL"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            
                        />
                    </div>

                    <button className="submit-button" type="submit">
                        Add to Universe
                    </button>
                </form>
            </div>
        </section>
    )
}

export default AddCharacterForm;