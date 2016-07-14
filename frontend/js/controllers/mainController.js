angular
  .module('myMoments')
  .controller('MainController', MainController);

MainController.$inject = ['Upload', 'API_URL'];
function MainController(Upload, API_URL) {
  var self = this;

  self.file = null;
    
  

}