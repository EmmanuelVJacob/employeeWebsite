import React, { useState, useCallback } from "react";

const SearchInput = ({ search, setSearch }) => {
  const [inputValue, setInputValue] = useState(search);

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const handleInputChange = useCallback(
    debounce((value) => setSearch(value), 500),
    []
  );

  const onChange = (e) => {
    setInputValue(e.target.value);
    handleInputChange(e.target.value);
  };

  return (
    <div className="mb-4 flex items-center mt-6">
      <input
        type="text"
        placeholder="Search..."
        value={inputValue}
        onChange={onChange}
        className="p-2 border border-gray-300 bg-custompink rounded"
      />
    </div>
  );
};

export default SearchInput;
