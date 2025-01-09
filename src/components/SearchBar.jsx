import React from "react";
import "../css/components/SearchBar.css"; // Import the CSS file for this component

function SearchBar({ placeholder = "관심사 혹은 키워드를 입력하세요" }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder={placeholder}
        className="search-input"
      />
      <img
        src="/assets/Hobby/search-icon.svg" // Update this path to match your project's structure
        alt="Search"
        className="search-icon"
      />
    </div>
  );
}

export default SearchBar;
