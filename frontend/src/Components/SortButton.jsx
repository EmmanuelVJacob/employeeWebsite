import React from "react";

const SortButton = ({ field, sort, order, onSort }) => {
  return (
    <button
      onClick={() => onSort(field)}
      className="p-2 bg-customVioletDark3 text-white rounded w-full sm:w-auto text-center"
    >
      {`${field.charAt(0).toUpperCase() + field.slice(1)}`}
      {sort === field ? (order === "asc" ? " ↑" : " ↓") : ""}
    </button>
  );
};

export default SortButton;
