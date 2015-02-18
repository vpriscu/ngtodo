'use strict';

/**
 * @ngdoc function
 * @name ngtodoApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the ngtodoApp
 */
angular.module('ngtodoApp')
        .controller('UserCtrl', ['$scope', '$location', 'userHandler',function($scope, $location, userHandler) {
          var ref = new Firebase('https://ngtodo-vlad.firebaseio.com/');
          $scope.callLogin = function() {
            console.log($scope.user);
            userHandler.SignIn($scope.user)
            if(userHandler.AuthStatus() !== false) {
              $location.path('/');
            }
          }
          if (userHandler.AuthStatus() !== false) {            
            $location.path('/');
          }

          $scope.Create = function () {
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
          
//          $scope.AuthStatus = function (event) {
//            var authData = ref.getAuth();
//            if (authData) {
//              Scope.user = authData;
//            } else {
//              console.log('User is logged out ');
//            }
//          };
          
          $scope.callLogout = function () {
            userHandler.Logout();
          };
          
        }]);
