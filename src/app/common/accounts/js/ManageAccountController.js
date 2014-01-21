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
            $log.debug(data.error.code + " " + data.error.message);
            $scope.showAlert('alert-danger', data.error.message);
        } else {
            $log.debug(data.error.message);
            $scope.showAlert('alert-danger', data.error.message);
        }
      }
    };  

    $scope.updateUserAccount = function() {
      UserSessionService.saveUserSettings($scope.jsonUserAccountData());
      var cleanupEventUpdateUserDone = $scope.$on("updateUserDone", function(event, message){
        $scope.handleUpdateUserResponse(message); 
        cleanupEventUpdateUserDone();     
    });

      var cleanupEventUpdateUserNotDone = $scope.$on("updateUserNotDone", function(event, message){
        $scope.hideSpinner();
        $scope.showAlert('alert-danger', "Server Error:" + message);
        cleanupEventUpdateUserNotDone();

      });
  
    }

    // function to handle server side responses
    $scope.handleDeleteUserResponse = function(data){
      if (data.success) {
        UserSessionService.logoutUser();
        var cleanupEventLogoutDone = $scope.$on("logoutDone", function(event, message){
        $state.transitionTo('home.start');
        $scope.showAlert('alert-success', message);
        cleanupEventLogoutDone();

      });
        $scope.showAlert('alert-success', data.success.message);   
      } else {
            $log.debug(data.error.message);
            $scope.showAlert('alert-danger', data.error.message);
        }
    };

    $scope.deleteUserAccount = function() {

      UserSessionService.removeUserSettings();
      var cleanupEventDeleteUserDone = $scope.$on("deleteUserDone", function(event, message){
        $scope.handleDeleteUserResponse(message);
        cleanupEventDeleteUserDone();   
      });
      var cleanupEventDeleteUserNotDone = $scope.$on("deleteUserNotDone", function(event, message){
        $scope.hideSpinner();
        $scope.showAlert('alert-danger', "Server Error:" + message);
        cleanupEventDeleteUserNotDone();

      });
  
    }

    // function to handle server side responses
    $scope.handleGetUserResponse = function(data){
    if (data.success) {
        UserSessionService.updateUserData(data.success.user);
        $scope.showAlert('alert-success', data.success.message);   
    } else {
        $log.debug(data.error.message);
        $scope.showAlert('alert-success', data.success.message);  
      }
  };

    var cleanupEventGetUserDone = $rootScope.$on("getUserDone", function(event, message){
      $scope.handleGetUserResponse(message); 
      cleanupEventGetUserDone();  
    });

    var cleanupEventGetUserNotDone = $rootScope.$on("getUserNotDone", function(event, message){
      scope.showAlert('alert-danger', "Server Error:" + message);
      cleanupEventGetUserNotDone();
    });



    /***
    // Organisation Manage Account Settings
    ***/

    $scope.jsonOrgAccountData = function()
      {
        var orgData = 
          {
            organization:
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
            $log.debug(data.error.code + " " + data.error.message);
            $scope.showAlert('alert-danger', data.error.message);
        } else {
            $log.debug(data.error.message);
            $scope.showAlert('alert-danger', data.error.message);
        }
      }
    };  

    $scope.updateOrgAccount = function() {
      OrgRegistrationService.saveOrgSettings($scope.jsonOrgAccountData());
      var cleanupEventUpdateOrgDone = $scope.$on("updateOrgDone", function(event, message){
        $scope.handleUpdateOrgResponse(message);
        cleanupEventUpdateOrgDone();  
      });
      var cleanupEventUpdateOrgNotDone = $scope.$on("updateOrgNotDone", function(event, message){
        $scope.showAlert('alert-danger', "Server Error:" + message);
        cleanupEventUpdateOrgNotDone();     
      });
  
    }

    // function to handle server side responses
    $scope.handleOrgAddressResponse = function(data){
      if (data.success) {
        OrgRegistrationService.updateOrgAdd(data.success.orgaddress);
        $scope.showAlert('alert-success', data.success.message);   
      } else {
        if (data.error.code== 'AU004') {     // enter valid data
            $log.debug(data.error.code + " " + data.error.message);
            $scope.showAlert('alert-danger', data.error.message);
        } else {
            $log.debug(data.error.message);
            $scope.showAlert('alert-danger', data.error.message);
        }
      }
    };  



    $scope.getOrgAddress = function() {
      OrgRegistrationService.getAllOrgAddress();
      var cleanupEventGetOrgAddressDone = $scope.$on("getOrgAddressDone", function(event, message){
        $scope.handleOrgAddressResponse(message);
        cleanupEventGetOrgAddressDone();   
      });
      var cleanupEventGetOrgAddressNotDone = $scope.$on("getOrgAddressNotDone", function(event, message){
        $scope.showAlert('alert-danger', "Server Error:" + message);
        cleanupEventGetOrgAddressNotDone();      
      });
  
    }

    $scope.jsonOrgAddressData = function()
      {
        var orgAddData = 
          {
            location:
            {
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
                    ],
              'locationtype': $scope.org.orgaddresstype
            }
          }
        return JSON.stringify(orgAddData); 
      }


    // function to handle server side responses
    $scope.handleAddOrgAddressResponse = function(data){
      if (data.success) {

        $scope.showAlert('alert-success', data.success.message);   
      } else {
        if (data.error.code== 'AU004') {     // enter valid data
            $log.debug(data.error.code + " " + data.error.message);
            $scope.showAlert('alert-danger', data.error.message);
        } else {
            $log.debug(data.error.message);
            $scope.showAlert('alert-danger', data.error.message);
        }
      }
    };  


    $scope.addOrgAddress = function() {
      OrgRegistrationService.saveOrgAddress($scope.jsonOrgAddressData());
      var cleanupEventUpdateOrgAddressDone = $scope.$on("updateOrgAddressDone", function(event, message){
        $scope.handleUpdateOrgAddressResponse(message); 
        cleanupEventUpdateOrgAddressDone();  
      });
      var cleanupEventUpdateOrgAddressNotDone = $scope.$on("updateOrgAddressNotDone", function(event, message){
        $scope.showAlert('alert-danger', "Server Error:" + message); 
        cleanupEventUpdateOrgAddressNotDone();     
      });
      var cleanupEventAddOrgAddressDone = $scope.$on("addOrgAddressDone", function(event, message){
        $scope.handleAddOrgAddressResponse(message);
        cleanupEventAddOrgAddressDone();   
      });
      var cleanupEventAddOrgAddressNotDone = $scope.$on("addOrgAddressNotDone", function(event, message){
        $scope.showAlert('alert-danger', "Server Error:" + message);
        cleanupEventAddOrgAddressNotDone();      
      });
  
    }

    // function to handle server side responses
    $scope.handleUpdateOrgAddressResponse = function(data){
      if (data.success) {

        $scope.showAlert('alert-success', data.success.message);   
      } else {
        if (data.error.code== 'AU004') {     // enter valid data
            $log.debug(data.error.code + " " + data.error.message);
            $scope.showAlert('alert-danger', data.error.message);
        } else {
            $log.debug(data.error.message);
            $scope.showAlert('alert-danger', data.error.message);
        }
      }
    };  


    $scope.updateAddress = function(addressId) {
      OrgRegistrationService.updateOrgAddress($scope.jsonOrgAddressData(), addressId);
      var cleanupEventUpdateOrgAddressDone = $scope.$on("updateOrgAddressDone", function(event, message){
        $scope.handleUpdateOrgAddressResponse(message); 
        cleanupEventUpdateOrgAddressDone();  
      });
      var cleanupEventUpdateOrgAddressNotDone = $scope.$on("updateOrgAddressNotDone", function(event, message){
        $scope.showAlert('alert-danger', "Server Error:" + message); 
        cleanupEventUpdateOrgAddressNotDone();     
      });
    }

    // function to handle server side responses
    $scope.handleDeleteOrgResponse = function(data){
      if (data.success) {
        $scope.showAlert('alert-success', data.success.message);   
      } else {
          $log.debug(data.error.message);
          $scope.showAlert('alert-danger', data.error.message);
        }
    };

    $scope.deleteOrgAccount = function() {
      OrgRegistrationService.removeOrgSettings();
      var cleanupEventDeleteOrgDone = $scope.$on("deleteOrgDone", function(event, message){
        $scope.handleDeleteOrgResponse(message);
        cleanupEventDeleteOrgDone();   
      });
      var cleanupEventDeleteOrgNotDone = $scope.$on("deleteOrgNotDone", function(event, message){
        $scope.showAlert('alert-danger', "Server Error:" + message);
        cleanupEventDeleteOrgNotDone();  
      });
  
    }

    // function to handle server side responses
    $scope.handleDeleteOrgAddressResponse = function(data){
      if (data.success) {
        $scope.showAlert('alert-success', data.success.message);   
      } else {
          $log.debug(data.error.message);
          $scope.showAlert('alert-danger', data.error.message);
        }
    };

    $scope.deleteOrgAddress = function(addressId) {
      OrgRegistrationService.removeOrgAddress(addressId);
      var cleanupEventDeleteOrgAddressDone = $scope.$on("deleteOrgAddressDone", function(event, message){
        $scope.handleDeleteOrgResponse(message);   
        cleanupEventDeleteOrgAddressDone();
      });
      var cleanupEventDeleteOrgAddressNotDone = $scope.$on("deleteOrgAddressNotDone", function(event, message){
        $scope.showAlert('alert-danger', "Server Error:" + message);   
        cleanupEventDeleteOrgAddressNotDone();
      });
  
    }

    // function to handle server side responses
    $scope.handleGetOrgResponse = function(data){
      if (data.success) {
        OrgRegistrationService.updateOrgData(data.success.organization);
        $scope.showAlert('alert-success', data.success.message);   
      } else {
        $log.debug(data.error.message);
        $scope.showAlert('alert-danger', data.error.message);
        }
    };

      var cleanupEventGetOrgDone = $rootScope.$on("getOrgDone", function(event, message){
        $scope.handleGetOrgResponse(message); 
        cleanupEventGetOrgDone();  
      });

      var cleanupEventGetOrgNotDone = $rootScope.$on("getOrgNotDone", function(event, message){
        $scope.showAlert('alert-danger', "Server Error:" + message); 
        cleanupEventGetOrgNotDone();  
      });


}]);
 