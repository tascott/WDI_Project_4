var mongoose = require("mongoose");

var eventSchema = mongoose.Schema({
  title: String,
  description: String,
  profilePhoto: String,

  bgcolor: String,
  scndcolor: String,
  thirdcolor: String,

  layout: String,
  header: String,
  twitter: Boolean,
  twittertag: String,
  location: Boolean,
  postcode: String,


  user: {type: mongoose.Schema.ObjectId, ref: "User"}, 
  comments: [{ type: mongoose.Schema.ObjectId, ref: 'Comment' }]
});

module.exports = mongoose.model('Event', eventSchema);