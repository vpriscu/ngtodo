'use strict';

/**
 * @ngdoc directive
 * @name ngtodoApp.directive:userAction
 * @description
 * # userAction
 */
angular.module('ngtodoApp')
  .directive('userAction', function ($location, $firebase) {
    return {
      restrict: 'E',
      templateUrl: '/views/directives/user-action.html',
      scope: true,
      link: function($scope, $location, userHandler) {
        var ref = new Firebase('https://ngtodo-vlad.firebaseio.com/users');
        $('#logout').on('click', function() {
          ref.unauth();
        });
        $scope.userData = ref.getAuth();
        var refFriend = new Firebase('https://ngtodo-vlad.firebaseio.com/friends');

        $scope.friendRequests = $firebase(refFriend.orderByChild('friendId').equalTo($scope.userData.uid)).$asArray();
      }
    };
  });
