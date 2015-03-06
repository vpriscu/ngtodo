'use strict';

/**
 * @ngdoc function
 * @name ngtodoApp.controller:AccountCtrl
 * @description
 * # AccountCtrl
 * Controller of the ngtodoApp
 */
angular.module('ngtodoApp')
    .controller('AccountCtrl', ['$scope', '$firebase', '$location', 'userHandler', '$filter', function ($scope, $firebase, $location, userHandler, $filter) {
      var ref = new Firebase('https://ngtodo-vlad.firebaseio.com/users');
      var refFriend = new Firebase('https://ngtodo-vlad.firebaseio.com/friends');
      if (userHandler.AuthStatus() === false) {
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
      $scope.searchFriend = function() {
        if($scope.find.username.length > 2) {
          $scope.find.foundFriends = $firebase(ref.orderByChild('username')).$asArray();
        } else {
          $scope.find.foundFriends = false;
        }
      };

      // we get all the friends list for the current user.
      $scope.friendsList =  $firebase(refFriend.orderByChild('uid').equalTo($scope.userData.uid)).$asArray();

      $scope.addFriend = function(item) {
        var requestPresent = $filter('filter')($scope.friendsList, {friendId: item.$id, approved: 0});
        if(requestPresent.length === 0 && item.$id !== $scope.userData.uid){
          refFriend.push({
            approved: 0,
            friendId: item.$id,
            friendName: item.username,
            uid: $scope.userData.uid
          }, function(error) {
            if(error === null) {
              toast(item.username + ' will recive a friend request', 6000);
            }
          })
        } else {
          toast(' You already sent a request to ' + item.username, 6000);
        }

        $scope.find.username = '';
        $scope.find.foundFriends = false;
      };
      $scope.removeFriend = function(id) {
        var refFriendRemove = new Firebase('https://ngtodo-vlad.firebaseio.com/friends/'+id);
        refFriendRemove.remove();
      }
      //console.log($scope.friendsList);
    }]);
