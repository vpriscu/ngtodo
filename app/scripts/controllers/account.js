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
      
      
      
      $scope.callLogout = function() {
        userHandler.Logout();
      }
      
      
//      
//      $scope.AuthStatus = function () {
//        var authData = ref.getAuth();
//        if (authData) {
//          $scope.userData = authData;
//          return authData;
//        } else {
//          $location.path('/user');
//          return false;
//        }
//      };
//      $scope.AuthStatus();
//      $scope.Logout = function () {
//        ref.unauth();
//        $location.path('/user');
//      };
      
       $scope.addUserData = function() {
        var userData = $scope.AuthStatus();
        var userRef = ref.child(userData.uid);
        userRef.set({
          username: $scope.userData.username
        });
      };

  }]);
