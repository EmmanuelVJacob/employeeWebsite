import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import SearchInput from "../Components/SearchInput";
import SortButton from "../Components/SortButton";
import Pagination from "../Components/Pagination";
import EmployeeList from "../Components/EmployeeList";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const EmployeeListing = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState(localStorage.getItem("search") || "");
  const [sort, setSort] = useState(localStorage.getItem("sort") || "date");
  const [order, setOrder] = useState(localStorage.getItem("order") || "desc");
  const [currentPage, setCurrentPage] = useState(
    parseInt(localStorage.getItem("currentPage")) || 1
  );
  const [totalPages, setTotalPages] = useState(1);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axiosInstance.get("/employee/getAllEmployees", {
        params: {
          searchQuery: search,
          sortBy: sort,
          sortOrder: order,
          page: currentPage,
          limit: 8,
        },
      });

      setEmployees(response.data.employees);
      setTotalPages(Math.ceil(response.data.total / 8));
    } catch (err) {
      setError("Error fetching employees. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [search, sort, order, currentPage]);

  useEffect(() => {
    const token = localStorage?.getItem("accessToken");
    if (!token) {
      navigate("/login");
    }
  });

  useEffect(() => {
    localStorage.setItem("search", search);
  }, [search]);

  useEffect(() => {
    localStorage.setItem("sort", sort);
  }, [sort]);

  useEffect(() => {
    localStorage.setItem("order", order);
  }, [order]);

  useEffect(() => {
    localStorage.setItem("currentPage", currentPage.toString());
  }, [currentPage]);

  const handleSort = (field) => {
    setSort(field);
    setOrder(order === "asc" ? "desc" : "asc");
  };

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: `Confirm To Delete the Employee`,
        text: "This action cannot be undone!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        await axiosInstance.delete(`/employee/removeEmployee/${id}`);
        Swal.fire("Deleted!", "The employee has been deleted.", "success");
        fetchEmployees();
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
      Swal.fire("Error!", "There was an error deleting the employee.", "error");
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-center items-center mt-4 h-7">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
          Employee Listing
        </h1>
      </div>
      <SearchInput search={search} setSearch={setSearch} />
      <div className="flex flex-col sm:flex-row sm:justify-between mb-4">
        <div className="flex flex-wrap gap-2 mb-4 sm:mb-0">
          <div className="text-white text-center font-bold pt-3">Sort by</div>
          <SortButton
            field="employee Id"
            sort={sort}
            order={order}
            onSort={handleSort}
          />
          <SortButton
            field="name"
            sort={sort}
            order={order}
            onSort={handleSort}
          />
          <SortButton
            field="email"
            sort={sort}
            order={order}
            onSort={handleSort}
          />
          <SortButton
            field="date"
            sort={sort}
            order={order}
            onSort={handleSort}
          />
        </div>
        <div className="flex justify-center sm:justify-end w-full sm:w-auto">
          <Link
            to="/create"
            className="inline-flex items-center justify-center px-4 py-2 bg-customVioletDark2 text-white rounded-full shadow-md"
          >
            <span className="text-lg sm:text-xl font-bold">+</span>
            <span className="ml-2 hidden sm:inline">Add Employee</span>
          </Link>
        </div>
      </div>

      {loading && (
        <div className="flex justify-center items-center">
          <div className="text-white">Loading...</div>
        </div>
      )}

      {error && (
        <div className="flex justify-center items-center">
          <div className="text-red-300 flex justify-center items-center text-3xl font-bold">oops something went wrong</div>
        </div>
      )}

      {!loading && !error && employees && employees.length > 0 && (
        <EmployeeList employees={employees} onDelete={handleDelete} />
      )}

      {!loading && !error && employees && employees.length === 0 && (
        <div className="flex justify-center items-center">
          <div className="text-white flex justify-center items-center text-3xl font-bold">
            No Data to be shown
          </div>
        </div>
      )}
      {!loading && !error && employees && employees.length !== 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default EmployeeListing;
