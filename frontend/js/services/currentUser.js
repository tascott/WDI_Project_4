angular
  .module('myMoments')
  .service('CurrentUser', CurrentUser);

CurrentUser.$inject = ["TokenService"];
function CurrentUser(TokenService){

  var self       = this;
  self.user      = getUser(); // Run this when the CurrentUser is first loaded
  self.getUser   = getUser;
  self.clearUser = clearUser;
  self.selectedEvent = null;

  function getUser(){
    return self.user ? self.user : TokenService.decodeToken();
  }

  function clearUser(){
    TokenService.removeToken();
    self.user = null;
  }

}
