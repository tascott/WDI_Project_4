angular
  .module('mymoments', ['angular-jwt', 'ngResource', 'ui.router', 'ngMaterial'])
  .constant('API', 'http://localhost:3000')
  .config(MainRouter)
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  })
  .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('teal')
      .primaryPalette('indigo')
      .accentPalette('yellow');
  });

MainRouter.$inject = ['$stateProvider', '$urlRouterProvider'];

function MainRouter($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "./js/views/authentications/login.html"
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
      templateUrl: "./js/views/users/show-user.html"
    })
    .state('events', {
      url: "/events",
      templateUrl: "./js/views/events/index.html"
    })
    .state('new-event', {
      url: "/events/new",
      templateUrl: "./js/views/events/new-event.html"
    })

  $urlRouterProvider.otherwise("/");
}
