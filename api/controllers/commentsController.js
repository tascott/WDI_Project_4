var Event = require("../models/event");
var Comment = require("../models/comment");


function commentsIndex(req, res){
  Comment.find({}, function(err, comments) {
    if (err) return res.status(404).send(err);
    res.status(200).send(comments);
  });
}

function commentsCreate(req, res){
  var comment = new Comment(req.body.comment);
  comment.save(function(err,comment){
  if (err) return res.status(500).json({ error: 'Error'});
    res.json(comment);
    Event.findById( comment.event, function(err, event) {
      if (err) return res.status(500).json({ error: 'Error'});
      if(!event) return res.status(404).json({error: 'Not found'});
      event.comments.push(comment);
      event.save(function(err, comment) {
        console.log("comment saved!");
        res.status(201).send(comment);
      });
    });
  });

}

function commentsShow(req, res){
  Comment.findById(req.params.id).exec(function(err, comment) {
    if (err) return res.status(404).json({message: 'Something went wrong.'});
    res.status(200).json({ comment: comment });
  })
}
function showComment(comment){
  $http
    .get('http://localhost:3000/comments/' + comment._id)
    .then(function(response){
      self.comment = response.data;
    });
}


function commentsUpdate(req, res){
  var id = req.params.id;

  Comment.findByIdAndUpdate({ _id: id }, req.body.comment, function(err, comment){
    if (err) return res.status(500).send(err);
    if (!comment) return res.status(404).send(err);
    res.status(200).send(comment);
  });
}

function commentsDelete(req, res){
  var id = req.params.id;

  Comment.remove({ _id: id }, function(err) {
    if (err) return res.status(500).send(err);
    res.status(204).send();
  });
}

module.exports = {
  commentsIndex:  commentsIndex,
  commentsCreate: commentsCreate,
  commentsShow:   commentsShow,
  commentsUpdate: commentsUpdate,
  commentsDelete: commentsDelete
};
