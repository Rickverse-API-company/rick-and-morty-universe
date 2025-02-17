import './App.css'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/homepage'
import Navbar from './components/navbar'
import Footer from './components/footer'


function App() {


  return (
    <>
    <Navbar />
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path="/*" element={<h1>Page not found</h1>} />
    </Routes>
    <Footer />
    </>
  )
}

export default App
