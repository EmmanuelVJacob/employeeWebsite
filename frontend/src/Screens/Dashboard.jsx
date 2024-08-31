// src/components/Dashboard.js
import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";

const Dashboard = () => {
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [employeesThisMonth, setEmployeesThisMonth] = useState(0);
  const [employeesToday, setEmployeesToday] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const total = await axiosInstance.get("/employee/totalEmployeeCount");
        const monthly = await axiosInstance.get(
          "/employee/employeesCreatedThisMonth"
        );
        const daily = await axiosInstance.get(
          "/employee/employeesCreatedToday"
        );

        setTotalEmployees(total?.data?.totalEmployees);
        setEmployeesThisMonth(monthly?.data?.employeesCreatedThisMonth);
        setEmployeesToday(daily?.data?.employeesCreatedToday);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 bg-customPurple min-h-screen">
      <div className="mb-6 flex flex-col justify-center items-center h-60 text-center">
        <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
          Welcome to the Employee Dashboard
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-lg">
          Here you can view the latest statistics about employee counts. Keep
          track of overall numbers, monthly trends, and today's updates to stay
          informed.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-custompink p-6 rounded-lg shadow-md flex items-center space-x-4">
          <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8.25v11.25m0-11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5zM6 6.75a6 6 0 1112 0v2.25M4.5 12a9.75 9.75 0 1115 0v1.5"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-700 ">
              Total Employees
            </h2>
            <p className="text-2xl font-bold text-gray-900">{totalEmployees}</p>
          </div>
        </div>

        <div className="bg-custompink p-6 rounded-lg shadow-md flex items-center space-x-4">
          <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 15l-3-3 3-3M15 15l3-3-3-3"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-700">
              Employees This Month
            </h2>
            <p className="text-2xl font-bold text-gray-900">
              {employeesThisMonth}
            </p>
          </div>
        </div>

        <div className="bg-custompink p-6 rounded-lg shadow-md flex items-center space-x-4">
          <div className="w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 12l6 6 6-6M6 6l6 6 6-6"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-700">
              Employees Today
            </h2>
            <p className="text-2xl font-bold text-gray-900">{employeesToday}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
