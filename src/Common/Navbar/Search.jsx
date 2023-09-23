import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (query.trim() !== '') {
      setIsLoading(true);

      try {
        const response = await axios.get(`http://localhost:3300/products?q=${query}`);
        setSearchResults(response.data);
        
        setIsLoading(false);

        if (typeof onSearch === 'function') {
          onSearch(query);
        }

        // Navigate to CustomerIndex with the query parameter
        navigate(`/?q=${query}`);
      } catch (error) {
        console.error('Error fetching search results:', error.message);
        setIsLoading(false);
      }
    } else {
      // If the search query is empty, navigate to the default route to show all products
      navigate('/');
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center mx-2">
      <input
        className="p-2 border rounded-l-lg w-full max-w-md focus:outline-none"
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-r-lg transition duration-300"
        onClick={handleSearch}
      >
        {isLoading ? 'Searching...' : 'Search'}
      </button>
    </div>
  );
};

export default Search;
