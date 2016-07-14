angular
.module('myMoments')
.controller('CommentsController', CommentsController);

CommentsController.$inject = ['Comment', '$scope', '$http', 'CurrentUser', '$stateParams', '$state'];
function CommentsController(Comment, $scope, $http, CurrentUser, $stateParams, $state){

  var self            = this;

  self.comments         = [];
  self.comment          = {};
  self.selectedComment  = {};

  self.createComment    = createComment;
  self.removeComment    = removeComment;

  function createComment(){
   self.currentUser  = CurrentUser.getUser();
   self.comment.user   = self.currentUser._id;
   console.log(self.comment)
   $http.post("http://localhost:3000/api/comments/" , {comment: self.comment}, function(data) {
     console.log("success");
   });
 }c

 function removeComment(comment){
  $http
  .delete('http://localhost:3000/comments/' + comment._id)
  .then(function(response){
    var user = $scope.$parent.users.user;
    var index = self.comments.indexOf(comment);
    user.comments.splice(index, 1);
  });
}

}