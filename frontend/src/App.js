import "./App.css";
import Navbar from "./Components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./Screens/Login";
import Dashboard from "./Screens/Dashboard";
import Signup from "./Screens/SignUp";
import "react-toastify/dist/ReactToastify.css";
import CreateEmployeeForm from "./Screens/createEmployee";
import EmployeeListing from "./Screens/employeeList";
import EditEmployeeForm from "./Screens/EditEmployee";

function App() {
  return (
    <BrowserRouter>
      <div className="bg-customPurple min-h-screen">
        <Navbar />
        <ToastContainer />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<Signup />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/employeeList" element={<EmployeeListing />} />
          <Route path="/create" element={<CreateEmployeeForm />} />
          <Route path="/employeeEdit/:id" element={<EditEmployeeForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
