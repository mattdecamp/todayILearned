const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const feedController = require("../controllers/feedController");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const { catchErrors } = require("../handlers/errorHandlers");
const passport = require("passport");

/* GET home page. */
router.get("/", catchErrors(feedController.getFeed));

router.get(
  "/:id/delete",
  authController.authDelete,
  catchErrors(feedController.deleteFeedItem)
);

router.post(
  "/add",
  authController.authPost,
  catchErrors(feedController.createFeedItem)
);

// render login and login form
router.get("/login", userController.loginForm);

// login user
router.post("/login", passport.authenticate("local"), function (req, res) {
  req.flash("success", "You are now logged in!");
  res.redirect("/");
});

// render register page
router.get("/register", userController.registerForm);

// register user
router.post(
  "/register",
  userController.validationBodyRules,
  userController.validation,
  userController.registerUser,
  passport.authenticate('local'), function(req, res) {
    req.flash("success", "You are now registered!");
      res.redirect('/');
  }
);

// logout user
router.get("/logout", function(req, res) {
  req.logout(function (err) {
    if (err) { return next(err); }
  });
  res.redirect("/register");
});

router.get("/account", authController.authEdit, userController.editAccount);
router.post("/account", catchErrors(userController.updateAccount));

module.exports = router;
