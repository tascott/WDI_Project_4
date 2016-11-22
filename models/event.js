var mongoose = require("mongoose");

var eventSchema = mongoose.Schema({
  title: String,
  description: String,
  profilePhoto: String,

  bgcolor: { type: String, default: 'lightblue' },
  scndcolor: String,
  thirdcolor: String,

  layout: String,
  header: String, 
  twitter: Boolean,
  twittertag: String,
  location: Boolean,
  postcode: String,
  has_map: Boolean,
  has_gallery: Boolean,
  has_comments: Boolean,


  uploads: Array,


  user: {type: mongoose.Schema.ObjectId, ref: "User"}, 
  comments: [{ type: mongoose.Schema.ObjectId, ref: 'Comment' }]
});

module.exports = mongoose.model('Event', eventSchema);