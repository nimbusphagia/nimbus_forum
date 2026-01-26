import { body } from "express-validator";

export const signupValidator = [
  body("first_name")
    .trim()
    .notEmpty().withMessage("Name is required")
    .isLength({ min: 2 }).withMessage("Name must be at least 2 characters"),

  body("last_name")
    .trim()
    .notEmpty().withMessage("Last name is required")
    .isLength({ min: 2 }).withMessage("Last name must be at least 2 characters"),

  body("email")
    .trim()
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email address")
    .normalizeEmail(),

  body("password")
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 8 }).withMessage("Password must be at least 8 characters")
    .matches(/[A-Z]/).withMessage("Password must contain at least one uppercase letter"),

  body("confirm_password")
    .notEmpty().withMessage("Please confirm your password")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    })
];

export const loginValidator = [
  body("username")
    .trim()
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email address")
    .normalizeEmail(),

  body("password")
    .notEmpty().withMessage("Password is required")
];
