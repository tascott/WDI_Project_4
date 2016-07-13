angular
.module('myMoments')
.controller('EventsController', EventsController);

EventsController.$inject = ['Event', '$scope', '$http', 'CurrentUser', '$stateParams', '$state'];
function EventsController(Event, $scope, $http, CurrentUser, $stateParams, $state){

  var self            = this;

  self.events         = [];
  self.event          = {};
  self.selectedEvent  = {};

  self.createEvent    = createEvent;
  self.removeEvent    = removeEvent;


  function createEvent(){
   self.currentUser  = CurrentUser.getUser();
   self.event.user   = self.currentUser._id;
   console.log(self.event)
   $http.post("http://localhost:3000/api/events/" , {event: self.event}, function(data) {
     console.log("success");
   });
  }

 function removeEvent(event){
  Event.delete({ id: event._id}), function() {
      var index = self.events.indexOf(event);
      self.events.splice(index, 1);
    }
  }
}
