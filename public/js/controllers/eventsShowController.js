angular
  .module('myMoments')
  .controller('EventsShowController', EventsShowController);

EventsShowController.$inject = ['CurrentUser', '$stateParams', 'Event' , 'Comment', '$scope', '$sce', 'Upload'];

function EventsShowController(CurrentUser, $stateParams, Event , Comment, $scope, $sce, Upload) {
  var self = this;

  self.isOwner = false;


  self.file = null;

  self.data = Event.get({id:$stateParams.id}, function() {

    if(CurrentUser.user)
      self.isOwner = CurrentUser.user._id == self.data.event.user;

    var socket = io();

    socket.on('connect', function() {
          socket.on('tweets', function(tweet) {
            // console.log(tweet);
          self.tweets.push(tweet);

          $scope.$apply();
        });

        var search_term = self.data.event.twittertag;
        socket.emit('updateTerm', search_term);
    });

    var postcodeid = self.data.event.postcode
    console.log(self.data.event.postcode)
    self.getMapSrc = function(id) {
       return $sce.trustAsResourceUrl("https://www.google.com/maps/embed/v1/search?key=AIzaSyD_Dhg3DEYXMLnwyV1uoQlC8UyO2nWght8&q=" + postcodeid)
     }

    
  });



  this.uploadGallery = function() {
    console.log("hello");
    console.log(self.file);
    Upload.upload({
      url: 'http://localhost:3000/api/upload/single',
      data: { file: self.file }
    })
    .then(function(res) {
      var photo = res.data.filename;
      self.event.uploads.push(photo);

    })
    .catch(function(err) {
      console.error(err);
    });
  }






  self.newComment = new Comment();
  self.newComment.comment = {};
  
  self.save = function() {

    console.log(self.data);

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