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
  author: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: "You must supply and author."
  }
});

// create the slug before completing the feed item save process
feedSchema.pre("save", function (next) {
  if (!this.isModified('title')) {
    next();
    return;
  }
  this.slug = slug(this.title+"-"+this.created.toDateString());
  next();
  // TODO make sure all slugs can be unique
});

module.exports = mongoose.model("FeedItem", feedSchema);
