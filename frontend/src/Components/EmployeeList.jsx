
import React from "react";
import EmployeeCard from "./EmployeeCard";

const EmployeeList = ({ employees, onDelete }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
      {employees.map((employee) => (
        <EmployeeCard
          key={employee.employeeId}
          employee={employee}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default EmployeeList;
