'use strict';

/**
 * @ngdoc function
 * @name ngtodoApp.controller:AccountCtrl
 * @description
 * # AccountCtrl
 * Controller of the ngtodoApp
 */
angular.module('ngtodoApp')
  .controller('AccountCtrl', ['$scope', '$firebase', '$location', 'userHandler',function($scope, $firebase, $location, userHandler) {
      var ref = new Firebase('https://ngtodo-vlad.firebaseio.com/users');
      if(userHandler.AuthStatus() === false) {
        $location.path('/user');
      } else {
        $scope.userData = userHandler.AuthStatus();
      }
      var userRef = ref.child($scope.userData.uid);
      userRef.on('value', function (snap) {
        $scope.account = snap.val();
      });
      $scope.addUserData = function (account) {
        userRef.set({
          username: account.username
        });
      };
  }]);
