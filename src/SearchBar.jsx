import React from "react";
import "./SearchBar.css";

const SearchBar = ({ search, setSearch }) => {
  return (
    <input
      className="search-bar"
      type="text"
      placeholder="🔍 Search by title..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
};

export default SearchBar;
