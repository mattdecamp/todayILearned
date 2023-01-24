const passport = require("passport");

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