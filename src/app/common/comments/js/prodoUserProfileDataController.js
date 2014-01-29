angular.module('prodo.CommonApp')
        .controller('prodoUserProfileDataController', ['$scope','$log', '$rootScope', 'prodoCommentService', 'UserSessionService','$http', function($scope, $log,$rootScope, prodoCommentService, UserSessionService,$http) {
   $scope.modaluser = {};
$scope.hello="hello";
$scope.userProfileModal=function(data1)
{                


                      prodoCommentService.searchUserData(data1);
      console.log(data1);
                      $scope.$on('getUserDataNotDone', function(event, data) {
                     
                      });

               


                          // return data.success.user.username;
   

};

$scope.$on('getUserDataDone', function(event, data) {
                          $scope.modaluser=data.success.user;
                     	});

}]);



