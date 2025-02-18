import './App.css'
import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import HomePage from './pages/homepage'
import CharacterDetails from './components/characterdetails'
import Navbar from './components/navbar'
import Footer from './components/footer'

function App() {
  const [characters, setCharacters] = useState([]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage characters={characters} setCharacters={setCharacters} />} />
        <Route path="/character/:id" element={<CharacterDetails characters={characters} />} />
        <Route path="*" element={<h1>Page not found</h1>} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
