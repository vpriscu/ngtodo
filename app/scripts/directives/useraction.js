'use strict';

/**
 * @ngdoc directive
 * @name ngtodoApp.directive:userAction
 * @description
 * # userAction
 */
angular.module('ngtodoApp')
  .directive('userAction', function ($location) {
    return {
      restrict: 'E',
      templateUrl: '/views/directives/user-action.html',
      scope: true,
      link: function postLink($scope, $location, userHandler) {
        $('#logout').on('click', function() {
          var ref = new Firebase('https://ngtodo-vlad.firebaseio.com/users');
          ref.unauth();
        });
      }
    };
  });
