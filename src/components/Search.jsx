import React from 'react'

const Search = ({setSearchTerm}) => {

return (
    <div>
    <input
            type="text"
            placeholder="Search Character..."
            onChange={(e) => setSearchTerm(e.target.value)}
        />
    </div>
)
}

export default Search
