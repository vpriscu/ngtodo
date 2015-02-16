'use strict';
//vpriscu@pitechnologies.ro
/**
 * @ngdoc function
 * @name ngtodoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ngtodoApp
 */
angular.module('ngtodoApp')
  .controller('MainCtrl', ['$scope', '$firebase', '$location',function($scope, $firebase, $location) {
      var ref = new Firebase('https://ngtodo-vlad.firebaseio.com/posts');
      
      $scope.posts;
      var sync = $firebase(ref);
      var postArray = sync.$asArray();
      
      $scope.posts = postArray;
      
      $scope.makePostData = function(post) {
        var userData = $scope.AuthStatus();
        ref.push({
          title: post.title,
          description: post.description,
          priority: post.priority,
          uid: userData.uid
        });
      };
      
      $scope.deletePost = function(post) {
        
        var userData = $scope.AuthStatus();
        var fredRef = new Firebase('https://ngtodo-vlad.firebaseio.com/posts/'+post.$id);
        fredRef.remove();
      };
      
      $scope.editPost = function(post) {
        
        var userData = $scope.AuthStatus();
        var fredRef = new Firebase('https://ngtodo-vlad.firebaseio.com/posts/'+post.$id);
        fredRef.update({
          title: post.title,
          description: post.description
        });
      };
      
      $scope.AuthStatus = function () {
        var authData = ref.getAuth();
        if (authData) {
          $scope.userData = authData;
          
          return authData;
        } else {
          $location.path('/user');
          return false;
        }
      };
      $scope.Logout = function () {
        ref.unauth();
      };
      
  }]);
