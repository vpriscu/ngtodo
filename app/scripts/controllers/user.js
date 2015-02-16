'use strict';

/**
 * @ngdoc function
 * @name ngtodoApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the ngtodoApp
 */
angular.module('ngtodoApp')
        .controller('UserCtrl', ['$scope', '$location',function($scope, $location) {
          var ref = new Firebase('https://ngtodo-vlad.firebaseio.com/');
          $scope.SignIn = function (user) {
            event.preventDefault();  // To prevent form refresh
            var username = $scope.user.email;
            var password = $scope.user.password;
            ref.authWithPassword({
              email: $scope.user.email,
              password: $scope.user.password
            }, function (error, authData) {
              if (error) {
                console.log('Login Failed!', error);
              } else {
                console.log('Authenticated successfully with payload:', authData);
                $location.path('/');
              }
            });
          };

          $scope.Create = function (event) {
            event.preventDefault();  // To prevent form refresh
            ref.createUser({
              email: $scope.user.email,
              password: $scope.user.password
            }, function (error, userData) {
              if (error) {
                console.log('Error creating user:', error);
              } else {
                console.log('Successfully created user account with uid:', userData.uid);
              }
            });
          };

          $scope.ChangeEmail = function (event) {
            event.preventDefault();  // To prevent form refresh
            ref.changeEmail({
              oldEmail: $scope.user.oldEmail,
              newEmail: $scope.user.newEmail,
              password: $scope.user.password
            }, function (error) {
              if (error === null) {
                console.log('Email changed successfully');
              } else {
                console.log('Error changing email:', error);
              }
            });
          };

          $scope.ChangePassword = function (event) {
            event.preventDefault();  // To prevent form refresh
            ref.changePassword({
              email: $scope.user.email,
              oldPassword: $scope.user.oldPassword,
              newPassword: $scope.user.newPassword
            }, function (error) {
              if (error === null) {
                console.log('Password changed successfully');
              } else {
                console.log('Error changing password:', error);
              }
            });
          };
          $scope.RessetPassword = function (event) {
            event.preventDefault();  // To prevent form refresh
            ref.resetPassword({
              email: $scope.user.email
            }, function (error) {
              if (error === null) {
                console.log('Password reset email sent successfully');
              } else {
                console.log('Error sending password reset email:', error);
              }
            });
          };

          $scope.RemoveUser = function (event) {
            event.preventDefault();  // To prevent form refresh
            ref.removeUser({
              email: $scope.user.email,
              password: $scope.user.password
            }, function (error) {
              if (error === null) {
                console.log('User removed successfully');
              } else {
                console.log('Error removing user:', error);
              }
            });
          };
          
          $scope.AuthStatus = function (event) {
            var authData = ref.getAuth();
            if (authData) {
              Scope.user = authData;
            } else {
              console.log("User is logged out");
            }
          };
          
          $scope.Logout = function (event) {
            ref.unauth();
          };
          
        }]);
