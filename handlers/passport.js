const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require("mongoose");
const User = mongoose.model("User");

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
