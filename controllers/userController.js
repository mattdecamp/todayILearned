const mongoose = require("mongoose");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const { promisify } = require("util");
const passport = require("passport");

exports.loginForm = (req, res) => {
  res.render("login", {
    title: "Login",
    flashes: req.flash(),
  });
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
  body("password", "Password fields must be at least 8 characters.").notEmpty(),
  // body("passwordconfirm", "Please confirm the password.").notEmpty(),
  body(
    "passwordconfirm",
    "Password confirmation does not match password"
  ).custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Password fields do not match");
    }
    // Indicates the success of this synchronous custom validator
    return true;
  }),
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
  await User.register(
    new User({ name: req.body.name, email: req.body.email }),
    req.body.password
  );
  next();
};

exports.editAccount = (req, res) => {
  res.render("account", { title: "Edit Your Account" });
};

exports.updateAccount = async (req, res) => {
  const updates = {
    name: req.body.name,
    email: req.body.email,
  };
  const user = await User.findOneAndUpdate(
    { _id: req.user._id },
    { $set: updates },
    { new: true, runValidators: true }
  );
  req.flash("success", "Your Account has been successfully updated.");
  res.redirect("/account");
};
