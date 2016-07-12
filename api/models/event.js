var mongoose = require("mongoose");

var eventSchema = mongoose.Schema({
  title: String,
  description: String,
  location: String,

  bgcolor: String,
  scndcolor: String,
  layout: String,


  user: {type: mongoose.Schema.ObjectId, ref: "User"}, 
  comments: [{ type: mongoose.Schema.ObjectId, ref: 'Comment' }]
});

module.exports = mongoose.model('Event', eventSchema);