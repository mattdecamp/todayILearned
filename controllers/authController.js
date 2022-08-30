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

exports.authEdit = (req, res, next) => {
  if (req.isAuthenticated()) {
    next(); // user is logged in
    return
  }
  req.flash('error', "Whoops! You must be logged in to edit your account.")
  res.redirect('/login')
}
exports.authPost = (req, res, next) => {
  if (req.isAuthenticated()) {
    next(); // user is logged in
    return
  }
  req.flash('error', "Whoops! You must be logged in to create a post.")
  res.redirect('/login')
}

exports.authDelete = (req, res, next) => {
  if (req.isAuthenticated()) {
    next(); // user is logged in
    return
  }
  req.flash('error', "Whoops! You must be logged in to delete a post.")
  res.redirect('/login')
}