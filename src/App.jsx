import './App.css'
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './components/AuthContext'
import { useState } from 'react'
import HomePage from './pages/Homepage'
import CharacterDetails from './components/CharacterDetails'
import Navbar from './components/NavBar'
import Footer from './components/Footer'
import LocationDetails from './components/LocationDetails'
import Login from './components/Login'
import Register from './components/Register'
import About from './components/About'

function App() {
  const [characters, setCharacters] = useState([]);
  const [location, setLocation] = useState([]);

  return (
    <>
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/Register' element={<Register />} />
        <Route path="/" element={<HomePage characters={characters} setCharacters={setCharacters} location={location} setLocation={setLocation} />} />
        <Route path="/character/:id" element={<CharacterDetails characters={characters} />} />
        <Route path="/location/:id" element={<LocationDetails locations={location} setAppCharacters={setCharacters} />} />
        <Route path="*" element={<h1>Page not found</h1>} />
        <Route path="/About" element={<About/>}/>
      </Routes>
      <Footer />
      </AuthProvider>
    </>
  )
}

export default App
