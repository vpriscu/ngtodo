'use strict';
//vpriscu@pitechnologies.ro
/**
 * @ngdoc function
 * @name ngtodoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ngtodoApp
 */
angular.module('ngtodoApp').controller('MainCtrl', ['$scope', '$firebase', '$location', 'userHandler', '$routeParams', function ($scope, $firebase, $location, userHandler, $routeParams) {
  var ref = new Firebase('https://ngtodo-vlad.firebaseio.com/posts');
  var refFriend = new Firebase('https://ngtodo-vlad.firebaseio.com/friends');

  $scope.userData = {};
  if (userHandler.AuthStatus() === false) {
    $location.path('/user');
  } else {
    $scope.userData = userHandler.AuthStatus();
  }

  $scope.friendsList =  $firebase(refFriend.orderByChild('uid').equalTo($scope.userData.uid)).$asArray();
  $scope.orderBy = $location.search();
  (typeof $scope.orderBy.filter === 'undefined') ? false : $scope.orderBy.filter;
  $scope.posts = $firebase(ref.orderByChild('uid').equalTo($scope.userData.uid)).$asArray();

  $scope.makePostData = function (post) {
    ref.push({
      title: $scope.post.title,
      description: $scope.post.description,
      uid: $scope.userData.uid,
      status: 'new'
    }, function (error) {
      if (error === null) {
        toast('Item was added', 6000);
      }
    });
    $scope.post.title = '';
    $scope.post.description = '';
  };

  $scope.deletePost = function (post) {

    var fredRef = new Firebase('https://ngtodo-vlad.firebaseio.com/posts/' + post.$id);
    fredRef.remove();
  };

  $scope.editPost = function (post) {
    var fredRef = new Firebase('https://ngtodo-vlad.firebaseio.com/posts/' + post.$id);
    fredRef.update({
      title: post.title,
      description: post.description,
      status: post.status,
      uid: post.uid
    });
  };

  $scope.markDone = function (post) {
    var fredRef = new Firebase('https://ngtodo-vlad.firebaseio.com/posts/' + post.$id);
    fredRef.update({
      status: 'done'
    });
  };
}]);
