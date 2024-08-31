import express from "express";
import {
  validateCreateEmployee,
  validateUpdateEmployee,
  validateSingleEmployee,
} from "../middleware/express-validator";
import employeeController from "../controllers/employeeController";
import verifyJwtToken from "../middleware/jwtVerifyUser";

const employeeRouter = express.Router();

employeeRouter.post(
  "/addEmployee",
  validateCreateEmployee,
  verifyJwtToken,
  employeeController.createEmployee
);

employeeRouter.put(
  "/updateEmployee/:id",
  validateUpdateEmployee,
  verifyJwtToken,
  employeeController.updateEmployee
);

employeeRouter.get(
  "/getAllEmployees",
  verifyJwtToken,
  employeeController.getEmployees
);

employeeRouter.get(
  "/getSingleEmployee/:id",
  validateSingleEmployee,
  employeeController.getEmployeeById
);

employeeRouter.delete(
  "/removeEmployee/:id",
  validateSingleEmployee,
  verifyJwtToken,
  employeeController.deleteEmployee
);

employeeRouter.get(
  "/totalEmployeeCount",
  employeeController.getTotalEmployeeCount
);

employeeRouter.get(
  "/employeesCreatedThisMonth",
  employeeController.getEmployeesCreatedThisMonth
);

employeeRouter.get(
  "/employeesCreatedToday",
  employeeController.getEmployeesCreatedToday
);

export default employeeRouter;
