'use strict';

/**
 * @ngdoc directive
 * @name ngtodoApp.directive:addItem
 * @description
 * # addItem
 */
angular.module('ngtodoApp')
  .directive('addItem', function() {
    
    return {
      restrict: 'E',
      templateUrl: '/views/directives/add-item.html',
      link: function(scope) {
        scope.options = [
          {'label': 'Not important', 'value': 0},
          {'label': 'Medium', 'value': 1}
        ];
      }
    };
  });
