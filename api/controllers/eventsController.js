var Event = require("../models/event");
var User = require("../models/user");

function eventsIndex(req, res){
  Event.find({}, function(err, events) {
    if (err) return res.status(404).send(err);
    res.status(200).send(events);
  });
}

function eventsCreate(req, res){

  console.log(req.body);
  var event = new Event(req.body.event);

  event.save(function(err,event){
  if (err) return res.status(500).json({ error: 'Error'});
    res.json(event);
    User.findById( event.user, function(err, user) {
      if (err) return res.status(500).json({ error: 'Error'});
      user.events.push(event)
      user.save(function(err, user) {
        console.log("event saved!");
        res.status(201).send(event);
      });
    });
  });

}

function eventsShow(req, res){
  Event.findById(req.params.id)
    .populate("comments")
    .exec(function(err, event) {
    if (err) return res.status(404).json({message: 'Something went wrong.'});
    res.status(200).json({event: event});
  })
}
function showEvent(event){
  $http
    .get('http://localhost:3000/events/' + event._id)
    .then(function(response){
      self.event = response.data;
    });
}


function eventsUpdate(req, res){
  var id = req.params.id;

  Event.findByIdAndUpdate({ _id: id }, req.body.event, {new: true}).populate('comments').exec(function(err, event){
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    if (!event) return res.status(404).send(err);
    res.status(200).send({event: event});
  });
}

function eventsDelete(req, res){
  var id = req.params.id;

  Event.remove({ _id: id }, function(err) {
    if (err) return res.status(500).send(err);
    res.status(204).send();
  });
}

module.exports = {
  eventsIndex:  eventsIndex,
  eventsCreate: eventsCreate,
  eventsShow:   eventsShow,
  eventsUpdate: eventsUpdate,
  eventsDelete: eventsDelete
};
