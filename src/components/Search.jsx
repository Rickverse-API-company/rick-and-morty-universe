import React from 'react'
import './Search.css'
import { FaSearch } from 'react-icons/fa'

const Search = ({ setSearchTerm }) => {
  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div className="search-container">
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          className="search-input"
          type="text"
          placeholder="Search characters..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
      </form>
    </div>
  )
}

export default Search
