import { body } from "express-validator";

const userRegistrationValidator = () => {
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
      .isLength({ min: 3 })
      .withMessage("Username should be atleast 3 character")
      .isLength({ max: 13 })
      .withMessage("Username should not exceed 13 character"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password is required.")
      .isLength({ min: 3 })
      .withMessage("Password should be atleast 3 character")
      .isLength({ max: 13 })
      .withMessage("Password should not exceed 13 character"),
  ];
};

const userLoginValidator = () => {
  return [
    body("email").isEmail().withMessage("Email is not valid"),
    body("password").notEmpty().withMessage("Password cannot be empty"),
  ];
};

export { userRegistrationValidator, userLoginValidator };
