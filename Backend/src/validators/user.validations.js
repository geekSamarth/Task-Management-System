import { body } from "express-validator";

export const userRegistrationValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is invalid"),
    body("username")
      .trim()
      .notEmpty()
      .withMessage("username is required")
      .isLength({ min: 4 })
      .withMessage("username should be atleast 4 character long")
      .isLength({ max: 12 })
      .withMessage("username should be only 12 character long"),

    body("password")
      .notEmpty()
      .withMessage("password is required")
      .isLength({ min: 8 })
      .withMessage("password should be at least 8 character long"),
  ];
};

export const userLoginValidation = () => {
  return [
    body("email").isEmpty.isEmail().withMessage("Email is not valid"),
    body("password").notEmpty().withMessage("Password cannot be empty"),
  ];
};
