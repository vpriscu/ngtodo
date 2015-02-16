'use strict';

/**
 * @ngdoc directive
 * @name ngtodoApp.directive:userAction
 * @description
 * # userAction
 */
angular.module('ngtodoApp')
  .directive('userAction', function () {
    return {
      restrict: 'E',
      templateUrl: '/views/directives/user-action.html',
      link: function postLink(scope) {
        scope.AuthStatus();
      }
    };
  });
