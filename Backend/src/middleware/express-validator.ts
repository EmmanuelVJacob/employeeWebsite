import { body, param, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const validateFields = (fields: any[]) => {
  return [
    ...fields,
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
      }
      next();
    },
  ];
};

export const validateSignup = validateFields([
  body("username")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters long"),

  body("email").isEmail().normalizeEmail().withMessage("Invalid email address"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
]);

export const validateLogin = validateFields([
  body("email").isEmail().normalizeEmail().withMessage("Invalid email address"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
]);

export const validateCreateEmployee = validateFields([
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string"),

  body("email").isEmail().normalizeEmail().withMessage("Invalid email address"),

  body("mobileNo")
    .isNumeric()
    .withMessage("Mobile number must be a number")
    .isLength({ min: 10, max: 15 })
    .withMessage("Mobile number must be between 10 and 15 digits"),

  body("designation")
    .trim()
    .notEmpty()
    .withMessage("Designation is required")
    .isIn(["HR", "Manager", "Sales"])
    .withMessage("Select any one designation"),

  body("gender")
    .notEmpty()
    .withMessage("Gender is required")
    .isIn(["Male", "Female"])
    .withMessage("Gender must be either 'Male' or 'Female'"),

  body("course")
    .isArray({ min: 1 })
    .withMessage("Course must be an array with at least one item")
    .custom((value) => value.every((course: string) => ["MCA", "BCA", "BSC"].includes(course)))
    .withMessage("Each course must be one of 'MCA', 'BCA', or 'BSC'"),

  body("image").optional().isURL().withMessage("Image URL must be valid"),
]);

export const validateUpdateEmployee = validateFields([
  param("id").isMongoId().withMessage("Invalid employee ID"),

  body("name").optional().isString().withMessage("Name must be a string"),

  body("email")
    .optional()
    .isEmail()
    .normalizeEmail()
    .withMessage("Invalid email address"),

  body("mobileNo")
    .optional()
    .isNumeric()
    .withMessage("Mobile number must be a number")
    .isLength({ min: 10, max: 15 })
    .withMessage("Mobile number must be between 10 and 15 digits"),

  body("designation")
    .optional()
    .isIn(["HR", "Manager", "Sales"])
    .withMessage("Select any one designation"),

  body("gender")
    .optional()
    .isIn(["Male", "Female"])
    .withMessage("Gender must be either 'Male' or 'Female'"),

  body("course")
    .optional()
    .isArray({ min: 1 })
    .withMessage("Course must be an array with at least one item")
    .custom((value) => value.every((course: string) => ["MCA", "BCA", "BSC"].includes(course)))
    .withMessage("Each course must be one of 'MCA', 'BCA', or 'BSC'"),

  body("image").optional().isURL().withMessage("Image URL must be valid"),
]);

export const validateSingleEmployee = validateFields([
  param("id").isMongoId().withMessage("Invalid employee ID"),
]);
