angular
  .module('myMoments')
  .controller('UsersController', UsersController);

UsersController.$inject = ['$rootScope', 'User', 'TokenService', '$state', 'CurrentUser', '$stateParams'];
function UsersController($rootScope, User, TokenService, $state, CurrentUser, $stateParams){

  var self = this;

  if ($stateParams.id) {
    User.get({ id: $stateParams.id }, function(res) {
      self.user = res.user;
    });
  }

  $rootScope.$on('$stateChangeStart' ,function(event,toState){
      self.isHome = toState.name == "home";
  });

  
  self.all           = [];
  self.user          = null;
  self.currentUser   = null;
  self.error         = null;
  self.getUsers      = getUsers;
  self.register      = register;
  self.login         = login;
  self.logout        = logout;
  self.checkLoggedIn = checkLoggedIn;
  self.showEvent     = showEvent;
  self.test          = "controller";
  self.selectedEvent = null;

  function getUsers() {
    User.query(function(data){
      self.all = data.users;
    });
  }

  function handleLogin(res) {
    var token = res.token ? res.token : null;
    if (token) {
      self.currentUser = CurrentUser.getUser();
      self.getUsers();
      $state.go('home');
    }
  }

  function showEvent(event){
    console.log("in the function")
    self.selectedEvent = event; 
    console.log(self.selectedEvent);
    $state.go('event');
  }

  function handleError(e) {
    self.error = "Something went wrong.";
  }

  function register() {
    self.error = null;
    User.register(self.user, handleLogin, handleError);
  }

  function login() {
    self.error = null;
    User.login(self.user, handleLogin, handleError);
  }

  function logout() {
    self.all         = [];
    self.currentUser = null;
    self.user        = null;
    CurrentUser.clearUser();
    $state.go("home");
  }

  function checkLoggedIn() {
    self.currentUser = CurrentUser.getUser();
    return !!self.currentUser;
  }

  if (checkLoggedIn()) {
    self.getUsers();
  }

  return self;
}
