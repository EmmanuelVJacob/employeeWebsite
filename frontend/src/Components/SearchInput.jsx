
import React from "react";

const SearchInput = ({ search, setSearch }) => {
  return (
    <div className="mb-4 flex items-center mt-6">
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="p-2 border border-gray-300 bg-custompink rounded"
      />
    </div>
  );
};

export default SearchInput;
