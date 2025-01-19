import React from "react";
import "../css/components/SearchBar.css";

function SearchBar({ placeholder = "관심사 혹은 키워드를 입력하세요", onSearch }) {
  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    onSearch(inputValue); // Pass the input value to the parent component
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder={placeholder}
        className="search-input"
        onChange={handleInputChange}
      />
      <img
        src="/assets/Hobby/search-icon.svg"
        alt="Search"
        className="search-icon"
      />
    </div>
  );
}

export default SearchBar;
