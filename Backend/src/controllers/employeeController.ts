import { Request, Response } from "express";
import EmployeeService from "../services/employeeServices";

const employeeController = {
  getEmployees: async (req: Request, res: Response) => {
    const {
      page = 1,
      limit = 10,
      searchQuery = "",
      sortBy = "createdAt",
      sortOrder = "desc",
    } = req.query;
    try {
      const employeeService = new EmployeeService();
      const employees = await employeeService.getEmployees(
        parseInt(page as string),
        parseInt(limit as string),
        searchQuery as string,
        sortBy as string,
        sortOrder as string
      );
      res.json(employees);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  createEmployee: async (req: Request, res: Response) => {
    const { name, email, mobileNo, designation, gender, course, image } =
      req.body;
    try {
      const employeeService = new EmployeeService();
      const employee = await employeeService.createEmployee(
        name,
        email,
        mobileNo,
        designation,
        gender,
        course,
        image
      );
      res.json(employee);
    } catch (error: any) {
      if (error.message === "Email ID already present") {
        res.status(400).json({ message: "Email ID already present" });
      } else {
        res.status(500).json({ message: "Failed to create employee" });
      }
    }
  },

  getEmployeeById: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const employeeService = new EmployeeService();
      const employee = await employeeService.getEmployeeById(id);
      res.json(employee);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  updateEmployee: async (req: Request, res: Response) => {
    const { id } = req.params;
    const updates = req.body;
    try {
      const employeeService = new EmployeeService();
      const employee = await employeeService.updateEmployee(id, updates);
      res.json(employee);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteEmployee: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const employeeService = new EmployeeService();
      await employeeService.deleteEmployee(id);
      res.json({ message: "Employee deleted successfully!" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  getTotalEmployeeCount: async (req: Request, res: Response) => {
    try {
      const employeeService = new EmployeeService();
      const totalCount = await employeeService.getTotalEmployees();
      res.json({ totalEmployees: totalCount });
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "Failed to retrieve total employee count" });
    }
  },

  getEmployeesCreatedThisMonth: async (req: Request, res: Response) => {
    try {
      const employeeService = new EmployeeService();
      const count = await employeeService.getEmployeesCreatedThisMonth();
      res.json({ employeesCreatedThisMonth: count });
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "Failed to retrieve employee count for this month" });
    }
  },

  getEmployeesCreatedToday: async (req: Request, res: Response) => {
    try {
      const employeeService = new EmployeeService();
      const count = await employeeService.getEmployeesCreatedToday();
      res.json({ employeesCreatedToday: count });
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "Failed to retrieve employee count for today" });
    }
  },
};

export default employeeController;
