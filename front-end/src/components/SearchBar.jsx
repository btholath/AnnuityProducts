// components/SearchBar.jsx
import React from 'react';

function SearchBar({ searchTerm, handleSearch, onAddClick }) {
  return (
    <div className="d-flex mb-3">
      <input
        type="text"
        className="form-control me-2"
        placeholder="Search policies..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <button className="btn btn-success" onClick={onAddClick}>Add New Policy</button>
    </div>
  );
}

export default SearchBar;