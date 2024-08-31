import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState("");

  useEffect(() => {
    const userDetails = localStorage.getItem("userDetails");
    if (!userDetails) {
      setIsLoggedIn(false);
      return;
    }
    setUser(userDetails);
    setIsLoggedIn(true);
  }, [navigate]);

  const handleLogout = () => {
    localStorage?.removeItem("userDetails");
    localStorage?.removeItem("accessToken");
    localStorage?.removeItem("currentPage");
    localStorage?.removeItem("sort");
    localStorage?.removeItem("search");
    localStorage?.removeItem("order");

    axiosInstance
      .get("/logout")
      .then((res) => {
        if (res?.status === 200) {
          toast.success(res?.data?.message);
          setIsLoggedIn(false);
          setUser("");
          navigate("/login");
        } else {
          console.log(`Error ${res?.data}`);
        }
      })

      .catch((error) => {
        console.log(error);
      });
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to={"/"} className="flex items-center">
          <img
            src="https://img.freepik.com/premium-vector/smart-staff-logo-human-resources-logo-modern-employee-relations-logo_658057-44.jpg"
            alt="Logo"
            className="h-8 w-16 mr-2"
          />
          <span className="text-white text-xl font-bold">Employee Website</span>
        </Link>
        <div className="hidden md:flex items-center space-x-4">
          {user && (
            <h3 className="text-gray-300 hover:text-white font-bold mx-3">
              {user}
            </h3>
          )}
          <Link to={"/employeeList"} className="text-gray-300 hover:text-white">
            Employee List
          </Link>
          {!isLoggedIn ? (
            <Link to={"login"}>
              <button className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium bg-gray-700">
                login
              </button>
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium bg-gray-700"
            >
              logout
            </button>
          )}
        </div>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-300 hover:text-white"
          >
            {isOpen ? (
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden mt-2">
          {user && (
            <h3 className="block text-gray-300 hover:text-white px-2 py-1 font-bold mx-3">
              {user}
            </h3>
          )}
          <Link
            to={'/employeeList'}
            className="block text-gray-300 hover:text-white px-2 py-1"
          >
            Employee List
          </Link>
          {!isLoggedIn ? (
            <Link to={"login"}>
              <button
                onClick={""}
                className="block text-gray-300 hover:text-white px-2 py-1 rounded-md bg-gray-700 w-full text-left"
              >
                login
              </button>
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="block text-gray-300 hover:text-white px-2 py-1 rounded-md bg-gray-700 w-full text-left"
            >
              logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
