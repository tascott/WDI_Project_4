angular
  .module('myMoments')
  .controller('EventsShowController', EventsShowController);

EventsShowController.$inject = ['$stateParams', 'Event' , 'Comment'];

function EventsShowController($stateParams, Event , Comment) {
  var self = this;

  self.data = Event.get({id:$stateParams.id});

  self.newComment = new Comment();

  self.newComment.comment = {};


  self.save = function() {

    self.data.$update(function(err , data){
      console.log(err , data);
    });

  }

  self.addComment = function() {

    self.newComment.comment.event = self.data.event._id;

    self.newComment.$save(function(comment){

      self.data.event.comments.push(comment);

      self.data.$update();

      self.newComment = new Comment();

    });

  }



}