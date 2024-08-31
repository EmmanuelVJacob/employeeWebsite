import employeeModel from "../models/employeeModel";
import { Employee } from "../models/types/employeeModelTypes";

class EmployeeService {
  async createEmployee(
    name: string,
    email: string,
    mobileNo: number,
    designation: string,
    gender: string,
    course: string[],
    image?: string
  ): Promise<Employee | undefined> {
    try {
      const existingEmployee = await employeeModel.findOne({ email });
      if (existingEmployee) {
        throw new Error("Email ID already present");
      }
      const newEmployee = new employeeModel({
        name,
        email,
        mobileNo,
        designation,
        gender,
        course,
        image,
      });
      const savedEmployee = await newEmployee.save();
      return savedEmployee;
    } catch (error) {
      console.error("Error creating employee:", error);
      throw new Error("Failed to create employee");
    }
  }

  async getEmployees(
    page = 1,
    limit = 8,
    searchQuery = "",
    sortBy = "createdAt",
    sortOrder = "desc"
  ) {
    try {
      const skip = (page - 1) * limit; 
      const query = searchQuery
        ? {
            $or: [
              { name: { $regex: searchQuery, $options: "i" } },
              { email: { $regex: searchQuery, $options: "i" } },
              { designation: { $regex: searchQuery, $options: "i" } },
              { course: { $in: [searchQuery] } },
            ],
          }
        : {};
  
      const sortField = sortBy === "date" ? "createdAt" : sortBy;
      const sortDirection = sortOrder === "asc" ? 1 : -1;
  
      const total = await employeeModel.countDocuments(query);
  
      const employees = await employeeModel.aggregate([
        { $match: query },
        {
          $addFields: {
            nameLower: { $toLower: "$name" }, 
          },
        },
        {
          $sort: {
            [sortField === "name" ? "nameLower" : sortField]: sortDirection,
          },
        },
        { $skip: skip }, 
        { $limit: limit }, 
        {
          $project: {
            nameLower: 0,
          },
        },
      ]);
  
      return { employees, total };
    } catch (error) {
      console.error("Error fetching employees:", error);
      throw new Error("Failed to fetch employees");
    }
  }
  
  async getEmployeeById(id: string): Promise<Employee | undefined> {
    try {
      const employee = await employeeModel.findById(id);
      if (!employee) {
        throw new Error("Employee not found");
      }
      return employee;
    } catch (error) {
      console.error("Error fetching employee:", error);
      throw new Error("Failed to fetch employee");
    }
  }

  async updateEmployee(
    id: string,
    updates: Partial<Employee>
  ): Promise<Employee | undefined> {
    try {
      const updatedEmployee = await employeeModel.findByIdAndUpdate(
        id,
        updates,
        { new: true }
      );
      if (!updatedEmployee) {
        throw new Error("Employee not found");
      }
      return updatedEmployee;
    } catch (error) {
      console.error("Error updating employee:", error);
      throw new Error("Failed to update employee");
    }
  }

  async deleteEmployee(id: string): Promise<string | undefined> {
    try {
      await employeeModel.findByIdAndDelete(id);
      return "Employee deleted successfully!";
    } catch (error) {
      console.error("Error deleting employee:", error);
      throw new Error("Failed to delete employee");
    }
  }

  async getTotalEmployees(): Promise<number> {
    try {
      const total = await employeeModel.countDocuments();
      return total;
    } catch (error) {
      console.error("Error fetching total employees count:", error);
      throw new Error("Failed to fetch total employee count");
    }
  }

  async getEmployeesCreatedThisMonth(): Promise<number> {
    try {
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      const endOfMonth = new Date();
      endOfMonth.setMonth(endOfMonth.getMonth() + 1); 

      const count = await employeeModel.countDocuments({
        createdAt: {
          $gte: startOfMonth,
          $lt: endOfMonth,
        },
      });
      return count;
    } catch (error) {
      console.error("Error fetching employees created this month:", error);
      throw new Error("Failed to fetch employees created this month");
    }
  }

  async getEmployeesCreatedToday(): Promise<number> {
    try {
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0); 
      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999); 

      const count = await employeeModel.countDocuments({
        createdAt: {
          $gte: startOfDay,
          $lte: endOfDay,
        },
      });
      return count;
    } catch (error) {
      console.error("Error fetching employees created today:", error);
      throw new Error("Failed to fetch employees created today");
    }
  }
}

export default EmployeeService;
