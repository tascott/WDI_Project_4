angular
  .module('myMoments', ['ngResource', 'angular-jwt', 'ui.router', 'ngFileUpload'])
  .constant('API', 'https://localhost:3000/api')
  .constant('API_URL', 'https://localhost:3000')
  .config(MainRouter)
  .config(function($httpProvider){
    $httpProvider.interceptors.push('authInterceptor');
  });

MainRouter.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
function MainRouter($stateProvider, $urlRouterProvider, $locationProvider) {
  // $locationProvider.html5Mode(true);

  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "./js/views/home.html"
    })
    .state('login', {
      url: "/login",
      templateUrl: "./js/views/authentications/login.html"
    })
    .state('register', {
      url: "/register",
      templateUrl: "./js/views/authentications/register.html"
    })
    .state('users', {
      url: "/users",
      templateUrl: "./js/views/users/index.html"
    })
    .state('user', {
      url: "/users/:id",
      templateUrl: "./js/views/users/show.html",
      controller: "UsersController as profile"
    })
    .state('event', {
      url: "/events/:id",
      templateUrl: "./js/views/events/index.html",
      controller: "EventsShowController as events",
    })
    .state('event-new', {
      url: "/eventnew",
      templateUrl: "./js/views/events/new.html",
      controller: "EventsController as events"
    });

  $urlRouterProvider.otherwise("/");
}
