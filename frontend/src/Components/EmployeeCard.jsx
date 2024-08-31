// src/EmployeeCard.js

import React from "react";
import { Link } from "react-router-dom";

const defaultImage =
  "https://i.pinimg.com/736x/93/e8/d0/93e8d0313894ff752ef1c6970116bad6.jpg";

const EmployeeCard = ({ employee, onDelete }) => {
  const formattedDate = new Date(employee.createdAt).toLocaleDateString(
    "en-GB"
  );

  return (
    <div className="bg-custompink text-white shadow-lg rounded-lg p-4 mb-4 flex flex-col items-center">
      <img
        src={employee.image || defaultImage}
        alt={employee.name + " image"}
        className="w-24 h-24 object-cover mb-4 rounded-full"
      />
      <h2 className="text-xl font-semibold mb-4 text-slate-600 text-center">
        {employee.name}
      </h2>

      <div className="w-full">
        <div className="grid grid-cols-2 gap-x-4 mb-2">
          <div className="font-medium text-gray-700">Employee ID</div>
          <div className="text-gray-700 text-left">: {employee.employeeId}</div>
        </div>
        <div className="grid grid-cols-2 gap-x-4 mb-2">
          <div className="font-medium text-gray-700">Email</div>
          <div className="text-gray-700 text-left overflow-hidden whitespace-nowrap text-ellipsis">
            : {employee.email}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-4 mb-2">
          <div className="font-medium text-gray-700">Mobile No</div>
          <div className="text-gray-700 text-left">: {employee.mobileNo}</div>
        </div>
        <div className="grid grid-cols-2 gap-x-4 mb-2">
          <div className="font-medium text-gray-700">Designation</div>
          <div className="text-gray-700 text-left">
            : {employee.designation}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-4 mb-2">
          <div className="font-medium text-gray-700">Gender</div>
          <div className="text-gray-700 text-left">: {employee.gender}</div>
        </div>
        <div className="grid grid-cols-2 gap-x-4 mb-2">
          <div className="font-medium text-gray-700">Course</div>
          <div className="text-gray-700 text-left">
            : {employee.course.join(", ")}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-4 mb-2">
          <div className="font-medium text-gray-700">Date</div>
          <div className="text-gray-700 text-left">: {formattedDate}</div>
        </div>
      </div>

      <div className="mt-4 flex space-x-2">
        <Link to={`/employeeEdit/${employee?._id}`}>
          <button className="p-2 bg-customVioletDark2 text-white rounded">
            Edit
          </button>
        </Link>
        <button
          onClick={() => onDelete(employee._id)}
          className="p-2 bg-red-400 hover:bg-red-500 text-white rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default EmployeeCard;
