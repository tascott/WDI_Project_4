angular
  .module('myMoments')
  .controller('EventsShowController', EventsShowController);

EventsShowController.$inject = ['$stateParams', 'Event' , 'Comment', '$scope'];

function EventsShowController($stateParams, Event , Comment, $scope) {
  var self = this;

  self.data = Event.get({id:$stateParams.id}, function() {

    var socket = io();

    socket.on('connect', function() {
      
      console.log('caaaaammmmmmoonnnnnn');
          socket.on('tweets', function(tweet) {
            console.log(tweet);
          self.tweets.push(tweet);
          $scope.$apply();
        });

        var search_term = self.data.event.twittertag;
        socket.emit('updateTerm', search_term);
    });

    
  });


  self.newComment = new Comment();
  self.newComment.comment = {};
  self.save = function() {
    self.data.$update(function(err , data){
      console.log(err , data);
    });
  }

  self.tweets = [];

  self.addComment = function() {

    self.newComment.comment.event = self.data.event._id;

    self.newComment.$save(function(comment){

      self.data.event.comments.push(comment);

      self.data.$update();

      self.newComment = new Comment();

    });

  }
}