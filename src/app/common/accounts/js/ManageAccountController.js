angular.module('prodo.CommonApp')
 .controller('ManageAccountController', ['$scope', '$rootScope', '$state', '$http', '$timeout', 'UserSessionService', 'OrgRegistrationService', function($scope, $rootScope, $state, $http, $timeout, $modal, UserSessionService, OrgRegistrationService) {

    
		// function to send and stringify user email to Rest APIs for user account update
    $scope.jsonUserAccountData = function()
      {
        var userData = 
          {
            user:
            {
            'fullname' : $scope.user.fullname,
            'firstname' : $scope.user.firstname,
            'lastname' : $scope.user.lastname,
            'dob' : $scope.user.dob,
            'gender' : $scope.user.gender,
            'phone' : $scope.user.phone_number,
            'mobile' : $scope.user.mobile_number,
            'email' : $scope.user.email,
            'password' : $scope.user.password,
            'currentpassword' : $scope.user.currentpassword,
            'newpassword' : $scope.user.newpassword,
            'address':{
                        'address1':$scope.user.address1,
                        'address2':$scope.user.address2,
                        'address3':$scope.user.address3,
                        'city':$scope.user.city,
                        'state':$scope.user.state,
                        'country':$scope.user.country,
                        'zipcode':$scope.user.zipcode
                      },
            'subscription':{
                              'planid':$scope.user.planid  ,
                              'planstartdate':$scope.user.planexpirydate , 
                              'planexpirydate':$scope.user.planstartdate
                           },
            'payment':{
                        'paymentid': ''
                      },
            'payment_history':{
                                'paymentid': ''
                              },
            'profile_pic':$scope.user.profile_pic
            
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
            'name' : $scope.org.name,
            'description' : $scope.org.description,
            'subscription': {
                            'planid': '' , 
                            'planstartdate': '' , 
                            'planexpirydateate': ''
                            },
            'org_images': [{

                        'image' : $scope.org.image

                        }],
            'location': [{
                          'locationtype': $scope.org.orgaddresstype,
                          'address': 
                            {
                            'address1': $scope.org.address1,
                            'address2': $scope.org.address2,
                            'address3': $scope.org.address3,
                            'country': $scope.org.country,
                            'city': $scope.org.city,
                            'state': $scope.org.state,
                            'zipcode': $scope.org.zipcode 
                            }, 
                          'contacts': 
                            [ 
                             {'customerhelpline' : $scope.org.contact.customerhelpline1 },
                             {'customerhelpline' : $scope.org.contact.customerhelpline2 },
                             {'customerhelpline' : $scope.org.contact.customerhelpline3 }
                            ]
                        }],
            'usergrp': [{
                          'grpname': $scope.org.grpname  
                       }],
            'orginvites': $scope.org.invites 
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
	}])