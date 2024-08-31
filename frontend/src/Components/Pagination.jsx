
import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="mt-4 flex justify-between items-center">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 bg-customVioletDark3 text-white rounded mr-2"
      >
        Previous
      </button>
      <span className="p-2 text-white">Page {currentPage} of {totalPages}</span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 bg-customVioletDark3 text-white rounded ml-2"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
