'use strict';

/**
 * @ngdoc service
 * @name ngtodoApp.userHandler
 * @description
 * # userHandler
 * Factory in the ngtodoApp.
 */
angular.module('ngtodoApp')
  .factory('userHandler', function ($location) {
    // Service logic
    // ...

    var ref = new Firebase('https://ngtodo-vlad.firebaseio.com/users');
    var factory = {};
    
    factory.SignIn = function (user) {
//          event.preventDefault();  // To prevent form refresh
      ref.authWithPassword({
        email: user.email,
        password: user.password
      }, function (error, user) {
        if (error) {
          console.log('Login Failed!', error);
        } else {
          return user;
        }
      });
      console.log('user should be auth '+user);
    };
    
    factory.AuthStatus = function () {
      var authData = ref.getAuth();
      if (authData) {
        return  authData;
      } else {
        return false;
      }
    };
    
    factory.Logout = function () {
      ref.unauth();
      console.log('user logged out');
      $location.path('/user');
    };
    // Public API here
    return factory;
  });
