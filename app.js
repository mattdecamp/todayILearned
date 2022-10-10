const createError = require("http-errors");
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
// const MongoStore = require("connect-mongo");
const path = require("path");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const flash = require("connect-flash");
const errorHandlers = require("./handlers/errorHandlers");
const routes = require("./routes/index");
const helpers = require("./helpers");
const mongoose = require("mongoose");
const User = mongoose.model("User");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SECRET,
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: true,
    // store: new MongoStore({ mongoUrl: process.env.DATABASE }),
  })
  );
  // The flash middleware let's us use req.flash('error', 'Shit!'), which will then pass that message to the next page the user requests
  app.use(flash());
  
  // Passport JS is what we use to handle our logins
  app.use(passport.initialize());
app.use(passport.session());
  

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(User.createStrategy());

  
//////////////////////
// APP LOCAL VARIABLES
//////////////////////

app.use((req, res, next) => {
  res.locals.h = helpers;
  res.locals.logo = { url: "/", title: "t.i.l..." };
  res.locals.nav = [
    { url: "/account", title: "Account" },
    { url: "/register", title: "Register" },
    { url: "/login", title: "Login" },
  ];
  res.locals.matt = {
    name: "Matt DeCamp",
    url: "https://mattdecamp.com",
    github: "https://github.com/mattdecamp",
  };
  res.locals.flashes = req.flash();
  res.locals.user = req.user || null;
  res.locals.currentPath = req.path;
  next();
});

app.use("/", routes);

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });

// If that above routes didnt work, we 404 them and forward to error handler
app.use(errorHandlers.notFound);

// One of our error handlers will see if these errors are just validation errors
app.use(errorHandlers.flashValidationErrors);

// Otherwise this was a really bad error we didn't expect! Shoot eh
if (process.env.NODE_ENV === "development") {
  /* Development Error Handler - Prints stack trace */
  app.use(errorHandlers.developmentErrors);
}

// production error handler
app.use(errorHandlers.productionErrors);

module.exports = app;
