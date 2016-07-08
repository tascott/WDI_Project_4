angular
  .module('mymoments')
  .controller('EventsController', EventsController);

EventsController.$inject = ['Event', '$state', '$location'];

function EventsController(Event, $state, $location){

  var self = this;
  self.newEvent = null;
  self.all = null;
  this.getEvents = getEvents;

getEvents();

function getEvents(){
  Event.query(function(data){
    console.log(data[9])
    self.all = data;
  });

}

this.addEvent = function(){
    console.log("adding event" + self.all)
    Event.save(self.newEvent, function(response){
      console.log("YOOO" + response)
      console.log(response)
      console.log(self.newEvent)
        self.all.push(self.newEvent);
        self.newProject = {}
    });

    
  }

  this.showEvent = function(event) {
    this.eventShow = event;
  }

  function editEvent(event){
      self.editedEvent = event;  
  }

  function updateEvent(){
    index = self.all.indexOf(self.editedProject)
    $http.put('http://localhost:3000/events/' + self.editedEvent._id, {project: this.editedEvent}).then(function(response){
      self.all[index] = self.editedEvent;
    })
    }

    function deleteProject(event){
          $http.delete('http://localhost:3000/events/' + event._id).then(function(response){
            index = self.all.indexOf(event)
            self.all.splice(index, 1)
          })
      }


}
