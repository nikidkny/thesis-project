import classNames from "classnames";
import PropTypes from "prop-types";
import { useState } from "react";
import "./SearchBar.scss";

const SearchBar = ({ className, placeholder }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  var classes = classNames([
    className,
    "search",
    {
      "search--focused": isFocused,
    },
  ]);
  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const performSearch = () => {
    // Perform search functionality using the searchQuery
    console.log("Perform search for:", searchQuery);
    // Reset search query
    setSearchQuery("");
  };
  return (
    <label className={classes}>
      <input
        type="search"
        name="search"
        className="search__field"
        placeholder={placeholder}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        value={searchQuery}
        onChange={handleInputChange}
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            performSearch();
          }
        }}
      />
      <i type="icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-search"
          viewBox="0 0 16 16"
        >
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
        </svg>
      </i>
    </label>
  );
};

SearchBar.prototype = {
  placeholder: PropTypes.string,
};
SearchBar.defaultProps = {
  placeholder: "Search",
};
export default SearchBar;
