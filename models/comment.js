var mongoose = require("mongoose");

var commentSchema = mongoose.Schema({
  body: String,
  name: String,
  event: {type: mongoose.Schema.ObjectId, ref: "Event"},
  user: {type: mongoose.Schema.ObjectId, ref: "User"}
});

module.exports = mongoose.model('Comment', commentSchema);