angular
  .module('myMoments')
  .controller('CommentsShowController', CommentsShowController);

CommentsShowController.$inject = ['$stateParams', '$http']
function CommentsShowController($stateParams, $http) {
  var self = this;

  $http
  .get('http://localhost:3000/api/comments/' + $stateParams.id)
  .then(function(response){
    self.selectedComment = response.data.comment
    console.log(self.selectedComment)
  });
}