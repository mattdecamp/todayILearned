const mongoose = require("mongoose");
// const FeedItem = mongoose.model("FeedItem");
const FeedItem = require('../models/FeedItem')
exports.createFeedItem = async (req, res) => {
  req.body.author = req.user._id;
  req.body.tags = req.body.tags.split(",");
  const feedItem = new FeedItem(req.body);
  await feedItem.save();
  req.flash("success", `Post successfully created. Nice!`);
  res.redirect("/");
};

exports.getFeed = async (req, res) => {
  // 1 query database for feed items
  const feedItems = await FeedItem.find()
    .populate("author")
    .sort({ created: "desc" });
  res.render("index", {
    title: "Today I Learned",
    feedItems,
  });
};

exports.deleteFeedItem = async (req, res) => {
  const postItem = await FeedItem.findOne({ _id: req.params.id });
  if (!postItem.author.equals(req.user._id)) {
    req.flash("error", `You must be the author.`);
    res.redirect("/");
  }
  // confirmAuthor(postItem, req.user);
  const id = req.params.id;
  await FeedItem.findByIdAndRemove(id);
  req.flash("success", `Item successfully deleted.`);
  res.redirect("/");
};
