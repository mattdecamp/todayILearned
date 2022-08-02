const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");
const passportLocalMongoose = require("passport-local-mongoose");
const mongodbErrorHandler = require('mongoose-mongodb-errors')

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, "Invalid Email Address"],
    required: "Please enter an email address.",
  },
  name: {
    type: String,
    required: "Please enter a name.",
    trim: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

userSchema.plugin(passportLocalMongoose, { usernameField: "email" });
userSchema.plugin(mongodbErrorHandler);

// user (gr)avatar
userSchema.virtual("gravatar").get(function () {
  const hash = md5(this.email);
  return `https://gravatar.com/avatar/${hash}?s=400`;
});

module.exports = mongoose.model("User", userSchema);
