const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("slugs");

const feedSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: "Please enter a title.",
  },
  body: {
    type: String,
    required: "Please type something you learned today.",
  },
  slug: String,
  created: {
    type: Date,
    default: Date.now,
  },
  tags: [String],
});

// create the slug before completing the feed item save process
feedSchema.pre("save", function (next) {
  if (!this.isModified('title')) {
    next();
    return;
  }
  this.slug = slug(this.title);
  next();
  // TODO make sure all slugs can be unique
});

module.exports = mongoose.model("FeedItem", feedSchema);
