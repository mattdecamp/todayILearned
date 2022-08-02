const mongoose = require("mongoose");
const { body, validationResult } = require("express-validator");
const User = mongoose.model("User");
const { promisify } = require("util");

exports.loginForm = (req, res) => {
  res.render("login", { title: "Login", flashes: req.flash() });
};

exports.registerForm = (req, res) => {
  res.render("register", { title: "Register" });
};

exports.validationBodyRules = [
  body("name", "Name field cannot be blank.").notEmpty().trim().escape(),
  body("email", "Email field cannot be blank.").isEmail().normalizeEmail({
    remove_dots: false,
    remove_extension: false,
    gmail_remove_subaddress: false,
  }),
  body(
    "password",
    "Password fields cannot be blank and must be at least 8 characters."
  ).notEmpty(),
  // body("passwordconfirm", "Please confirm the password.").notEmpty(),
  body(
    "passwordconfirm",
    "Password confirmation does not match password"
  ).custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Password confirmation does not match password");
    }

    // Indicates the success of this synchronous custom validator
    return true;
  }),
  // body("passwordconfirm", "Passwords must match.").equals(),
];

exports.validation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash(
      "error",
      errors.array().map((err) => err.msg)
    );
    res.render("register", {
      title: "Register",
      name: req.body.name,
      email: req.body.email,
      flashes: req.flash(),
    });
    return;
  }
  next();
};

exports.registerUser = async (req, res, next) => {
  const user = new User({ name: req.body.name, email: req.body.email });
  const registerWithPromise = promisify(User.register).bind(User);
  await registerWithPromise(user, req.body.password);
  // TODO if user exists, message with redirect to login
  next();
};

// exports.validateErrors = (req, res, next) => {
//   const errors = validationResult(req);
//   if (errors.isEmpty()) {
//     return next();
//   }
//   const extractedErrors = [];
//   errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

//   return res.status(400).json({
//     errors: extractedErrors,
//     success: false,
//   });

// if (!errors.isEmpty()) {
//   return res.status(400).json({ errors: errors.array() });
// }
// };

// const errors = validationResult(req);
// if (errors) {
//   req.flash(
//     "error",
//     errors.mapped((err) => err.msg)
//   );
//   res.render("register", {
//     title: "Register",
//     body: req.body,
//     flashes: req.flash(),
//   });
// }
