const mongoose = require("mongoose");
const FeedItem = mongoose.model("FeedItem");

exports.createFeedItem = async (req, res) => {
  req.body.tags = req.body.tags.split(",");
  const feedItem = new FeedItem(req.body);
  await feedItem.save();
  req.flash("success", `Successfully created ${feedItem.title}. nice!`);
  res.redirect("/");
};

exports.getFeed = async (req, res) => {
  console.log(req.user);
  // 1 query database for feed items
  const feedItems = await FeedItem.find().sort({ created: "desc" });
  res.render("index", {
    title: "Today I Learned",
    feedItems
  });
};
