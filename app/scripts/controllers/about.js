'use strict';

/**
 * @ngdoc function
 * @name ngtodoApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the ngtodoApp
 */
angular.module('ngtodoApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Kara'
    ];
  });
