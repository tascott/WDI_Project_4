var Event = require("../models/event");

function eventsIndex(req, res){
  Event.find({}, function(err, events) {
    if (err) return res.status(404).send(err);
    res.status(200).send(events);
  });
}

function eventsCreate(req, res){
  console.log("here creating" + req.body)
  var event = new Event(req.body.event);
  event.save(function(err, event) {
    if (err) return res.status(500).send(err);
    res.status(201).send(event);
  });
}

module.exports = {
  eventsIndex:  eventsIndex,
  eventsCreate: eventsCreate,
};
