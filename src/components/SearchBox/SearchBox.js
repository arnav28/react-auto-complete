import React, { useState, useCallback, useEffect } from 'react';
import debounce from 'lodash/debounce';

import './SearchBox.css';


const SearchBox = (props) => {

  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState(props.suggestions);

  // Debounce input changes to reduce load on server
  const delayedInputChange = useCallback(debounce(searchTerm => props.handleChange(searchTerm), 500), []);
  
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    delayedInputChange(e.target.value);
  };

  // Check when search suggestions are updated
  useEffect(() => {
    setSuggestions(props.suggestions);
  }, [props.suggestions]);

  return(
    <div className="search-box">
      <input 
        className="search-input"
        value={searchQuery}
        autoComplete='off'
        placeholder={"Search"}
        onChange={(e) => handleInputChange(e)}
      />
      {
        suggestions && suggestions.length > 0 &&
        <div className="search-results">
          { suggestions.map((item, index) => 
            <div key={index} className="item" onClick={() => setSearchQuery(item.name)}>
              <span className="title">{item.name}</span>
              <span className="label">{item.type}</span>
            </div> 
          )}
        </div>
      }
  </div>
  );
}

export default SearchBox