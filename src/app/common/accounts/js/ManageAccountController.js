angular.module('prodo.CommonApp')
	.controller('ManageAccountController', ['$scope', '$rootScope', '$state', '$http', '$timeout', 'UserSessionService', 'OrgRegistrationService', function($scope, $rootScope, $state, $http, $timeout, UserSessionService, OrgRegistrationService) {


    
		// function to send and stringify user email to Rest APIs for user account update
    $scope.jsonUserAccountData = function()
      {
        var userData = 
          {
          	user:
            {
            'fullname' : $scope.user.fullname,
            'password' : $scope.user.password
          	}
          };
        return JSON.stringify(userData); 
      }
     

    // function to handle server side responses
    $scope.handleUpdateUserResponse = function(data){
      if (data.success) {

        $scope.showAlert('alert-success', data.success.message);   
      } else {
        if (data.error.code== 'AU004') {     // enter valid data
            console.log(data.error.code + " " + data.error.message);
            $scope.showAlert('alert-danger', data.error.message);
        } else {
            console.log(data.error.message);
            $scope.showAlert('alert-danger', data.error.message);
        }
      }
    };  

    $scope.updateUserAccount = function() {
      UserSessionService.saveUserSettings($scope.jsonUserAccountData());
      $scope.$on("updateUserDone", function(event, message){
        $scope.handleUpdateUserResponse(message);   
      });
  
    }

    // function to handle server side responses
    $scope.handleDeleteUserResponse = function(data){
      if (data.success) {
        $scope.showAlert('alert-success', data.success.message);   
      } else {
            console.log(data.error.message);
            $scope.showAlert('alert-danger', data.error.message);
        }
    };

    $scope.deleteUserAccount = function() {
      UserSessionService.removeUserSettings();
      $scope.$on("deleteUserDone", function(event, message){
        $scope.handleDeleteUserResponse(message);   
      });
  
    }

    // Organisation Manage Account Settings
    $scope.jsonOrgAccountData = function()
      {
        var orgData = 
          {
            org:
            {
            'fullname' : $scope.user.fullname,
            'password' : $scope.user.password
            }
          };
        return JSON.stringify(orgData); 
      }
     

    // function to handle server side responses
    $scope.handleUpdateOrgResponse = function(data){
      if (data.success) {

        $scope.showAlert('alert-success', data.success.message);   
      } else {
        if (data.error.code== 'AU004') {     // enter valid data
            console.log(data.error.code + " " + data.error.message);
            $scope.showAlert('alert-danger', data.error.message);
        } else {
            console.log(data.error.message);
            $scope.showAlert('alert-danger', data.error.message);
        }
      }
    };  

    $scope.updateOrgAccount = function() {
      OrgRegistrationService.saveOrgSettings($scope.jsonOrgAccountData());
      $scope.$on("updateOrgDone", function(event, message){
        $scope.handleUpdateOrgResponse(message);   
      });
  
    }

    // function to handle server side responses
    $scope.handleDeleteOrgResponse = function(data){
      if (data.success) {
        $scope.showAlert('alert-success', data.success.message);   
      } else {
            console.log(data.error.message);
            $scope.showAlert('alert-danger', data.error.message);
        }
    };

    $scope.deleteOrgAccount = function() {
      OrgRegistrationService.removeOrgSettings();
      $scope.$on("deleteOrgDone", function(event, message){
        $scope.handleDeleteOrgResponse(message);   
      });
  
    }

    // // function to handle server side responses
    // $scope.handleGetUserResponse = function(data){
    //   if (data.success) {
    //     UserSessionService.updateUserData(data.success.user);
    //     // $scope.showAlert('alert-success', data.success.message);   
    //   } else {
    //         console.log(data.error.message);
    //         $scope.showAlert('alert-danger', data.error.message);
    //     }
    // };

    // $scope.getUserAccountData = function() {
    //   UserSessionService.getUserDetailSettings();
    //   $scope.$on("getUserDone", function(event, message){
    //     $scope.handleGetUserResponse(message);   
    //   });
  
    // }
	}]);

