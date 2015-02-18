'use strict';
//vpriscu@pitechnologies.ro
/**
 * @ngdoc function
 * @name ngtodoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ngtodoApp
 */
angular.module('ngtodoApp').controller('MainCtrl', ['$scope', '$firebase', '$location', 'userHandler', function ($scope, $firebase, $location, userHandler) {
    var ref = new Firebase('https://ngtodo-vlad.firebaseio.com/posts');
    $scope.userData = {};
    if (userHandler.AuthStatus() === false) {
      $location.path('/user');
    } else {
      $scope.userData = userHandler.AuthStatus();
    }

    $scope.posts = $firebase(ref).$asArray();

    $scope.makePostData = function (post) {
      var userData = $scope.AuthStatus();
      ref.push({
        title: $scope.post.title,
        description: $scope.post.description
      }, function (error) {
        if (error === null) {
          toast('Item was added', 6000);
        }
      });
      $scope.post.title = '';
      $scope.post.description = '';
    };

    $scope.deletePost = function (post) {

      var userData = $scope.AuthStatus();
      var fredRef = new Firebase('https://ngtodo-vlad.firebaseio.com/posts/' + post.$id);
      fredRef.remove();
    };

    $scope.editPost = function (post) {

      var userData = $scope.AuthStatus();
      var fredRef = new Firebase('https://ngtodo-vlad.firebaseio.com/posts/' + post.$id);
      fredRef.update({
        title: post.title,
        description: post.description
      });
    };

    $scope.markDone = function (post) {
      console.log('here');
      var userData = $scope.AuthStatus();
      var fredRef = new Firebase('https://ngtodo-vlad.firebaseio.com/posts/' + post.$id);
      fredRef.update({
        done: 1
      });
    };
    
  }]);
