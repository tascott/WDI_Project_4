var mongoose = require('mongoose');

var EventSchema = mongoose.Schema({
  title: String,
  location: String,
});

module.exports = mongoose.model('Event', EventSchema);

