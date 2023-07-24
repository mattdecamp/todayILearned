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
router.post(
  // TODO: Need a flash message to indicate failed login
  "/login",
  (req, res, next) => {
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/register",
      failureFlash: {
        type: "error",
        message: "Incorrect username or password",
      },
      successFlash: {
        type: "success",
        message: "You are now logged in!",
      },
    })(req, res, next);
  }
);

// render register page
router.get("/register", userController.registerForm);

// register user
router.post(
  "/register",
  userController.validationBodyRules,
  userController.validation,
  userController.registerUser,
  passport.authenticate("local"),
  function (req, res, err) {
    if (err) {
      console.log(err);
      req.flash('error', "user already exists")
      res.redirect('/register')
    }
    req.flash("success", "You are now registered!");
    res.redirect("/");
  }
  // function (req, res, err) {
  //   if (err) {
  //     console.log(err);
  //     return res.render("register");
  //   }
  //   req.flash("success", "You are now registered!");
  //   res.redirect("/");
  // }
);

// logout user
router.get("/logout", function (req, res) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
  });
  res.redirect("/login");
});

router.get("/account", authController.authEdit, userController.editAccount);
router.post("/account", catchErrors(userController.updateAccount));

module.exports = router;
