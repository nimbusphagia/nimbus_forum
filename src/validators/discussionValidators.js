import { body } from "express-validator";

export const createDiscussionValidator = [
  body("title")
    .trim()
    .notEmpty().withMessage("Title is required")
    .isLength({ min: 5 }).withMessage("Title must be at least 5 characters")
    .isLength({ max: 150 }).withMessage("Title is too long"),

  body("img_url")
    .trim()
    .customSanitizer(value => value === "" ? undefined : value)
    .optional()
    .isURL().withMessage("Image URL must be a valid URL"),

  body("description")
    .trim()
    .notEmpty().withMessage("Description is required")
    .isLength({ min: 20 }).withMessage("Description must be at least 20 characters")
    .isLength({ max: 5000 }).withMessage("Description is too long")
];

