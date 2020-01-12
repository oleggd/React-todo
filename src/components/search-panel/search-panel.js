import React from 'react';

import './search-panel.css';

const SearchPanel = () => {
  const searchText = "Type here to search";

  return <input type="text"
    placeholder={searchText}
    className="form-control search-input"
    />;
}

export default SearchPanel;