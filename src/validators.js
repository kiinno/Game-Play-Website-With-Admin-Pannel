const check = require("express-validator").check;

const loginFormValidator = [
  check("username").notEmpty().withMessage("Please enter username"),
  check("password").notEmpty().withMessage("Password is required to login"),
];

const signupFormValidator = [
  check("first_name")
    .notEmpty()
    .withMessage("field first name is require")
    .isAlphanumeric()
    .withMessage(
      "field first name must be dont have a spaces or special characters"
    )
    .isLength({ min: 2, max: 14 })
    .withMessage("first name must be 2 to 14 character length"),
  check("last_name")
    .notEmpty()
    .withMessage("field last name is require")
    .isAlphanumeric()
    .withMessage(
      "field last name must be dont have a spaces or special characters"
    )
    .isLength({ min: 2, max: 14 })
    .withMessage("last name must be 2 to 14 character length"),
  check("username")
    .notEmpty()
    .withMessage("field username is require")
    .isAlphanumeric()
    .withMessage(
      "field username must be dont have a spaces or special characters"
    )
    .isLength({ min: 3, max: 25 })
    .withMessage("username must be at least 3 to 25 character maximum"),
  check("email")
    .notEmpty()
    .withMessage("field email is require")
    .isEmail()
    .withMessage("Please enter a valid email address"),
  check("password")
    .notEmpty()
    .withMessage("field password is require")
    .isStrongPassword()
    .withMessage(
      "Password must be a strong password contains lower/upper case letters & numbers and minimum 8 characers"
    ),
  check("confirm_password")
    .notEmpty()
    .withMessage("field confirm password is require")
    .custom((value, { req }) => {
      if (value === req.body.password) return true;
      else throw "Password does not matches";
    }),
];

module.exports = { loginFormValidator, signupFormValidator };
