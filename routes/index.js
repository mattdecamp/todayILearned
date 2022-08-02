const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const feedController = require("../controllers/feedController");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const { catchErrors } = require("../handlers/errorHandlers");

/* GET home page. */
// router.get("/", function (req, res, next) {
//   res.render("index", { title: "Today I Learned..." });
// });
router.get("/", catchErrors(feedController.getFeed));

// router.get('/', feedController.addFeedItem);
router.post("/add", catchErrors(feedController.createFeedItem));

// render login and login form
router.get("/login", userController.loginForm);

// login user
router.post("/login", authController.login);

// render register page
router.get("/register", userController.registerForm);

// register user
router.post(
  "/register",

  userController.validationBodyRules,
  userController.validation,
  userController.registerUser,
  authController.login
);

// logout user
router.get("/logout", authController.logout);

router.get("/account", function (req, res, next) {
  res.render("account", { title: "Account" });
});

module.exports = router;
