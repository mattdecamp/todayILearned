const passport = require("passport");

exports.login = passport.authenticate("local", {
  failureRedirect: "/login",
  failureFlash: 'Failed Login!',
  successRedirect: "/",
  successFlash: 'You are now logged in!',
});

exports.logout = (req, res) => {
  req.logout(function (err) {
    if (err) { return next(err); }
    // flash is not working
  });
  
  req.flash("success", "You are now logged out!");
  res.redirect("/");
  
};
