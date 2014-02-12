angular.module('prodo.CommonApp')
 .controller('ManageAccountController', ['$scope', '$rootScope', '$state', '$http', '$timeout', '$log', 'UserSessionService', 'OrgRegistrationService', function($scope, $rootScope, $state, $http, $timeout, $log, UserSessionService, OrgRegistrationService) {

    $scope.org = OrgRegistrationService.currentOrgData;
    $scope.orgaddr = OrgRegistrationService.currentOrgAdd;
    $scope.editorEnabled = false;
    $scope.editEmail = false;
    $scope.editAddress = false;

  
    $scope.enableEditor = function() {
      $scope.editorEnabled = true;
    };
  
    $scope.disableEditor = function() {
      $scope.editorEnabled = false;
    };

    $scope.emailEditor = function() {
      if ($scope.editEmail) {
        $scope.editEmail = false;
      } else {
        $scope.editEmail = true;
      }
      
    };

    $scope.addrEditor = function() {
      if ($scope.editAddress) {
        $scope.editAddress = false;
      } else {
        $scope.editAddress = true;
      }
      
    };

		// function to send and stringify user email to Rest APIs for user account update
    $scope.jsonUserAccountData = function()
      {
        var userData = 
          {
            user:
            {
            'firstname' : $scope.user.firstname,
            'lastname' : $scope.user.lastname,
            'dob' : $scope.user.dob,
            'gender' : $scope.user.gender,
            'phone' : $scope.user.phone,
            'mobile' : $scope.user.mobile
            // 'email' : $scope.user.email,
            // 'password' : $scope.user.password,
            // 'currentpassword' : $scope.user.currentpassword,
            // 'newpassword' : $scope.user.newpassword,
            // 'address':{
            //             'address1':$scope.user.address1,
            //             'address2':$scope.user.address2,
            //             'address3':$scope.user.address3,
            //             'city':$scope.user.city,
            //             'state':$scope.user.state,
            //             'country':$scope.user.country,
            //             'zipcode':$scope.user.zipcode
            //           },
            // 'subscription':{
            //                   'planid':$scope.user.planid  ,
            //                   'planstartdate':$scope.user.planexpirydate , 
            //                   'planexpirydate':$scope.user.planstartdate
            //                },
            // 'payment':{
            //             'paymentid': ''
            //           },
            // 'payment_history':{
            //                     'paymentid': ''
            //                   },
            // 'profile_pic':$scope.user.profile_pic
            
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
      $scope.disableEditor();
      UserSessionService.saveUserSettings($scope.jsonUserAccountData());
      var cleanupEventUpdateUserDone = $scope.$on("updateUserDone", function(event, message){
        $scope.handleUpdateUserResponse(message); 
        cleanupEventUpdateUserDone();     
    });

      var cleanupEventUpdateUserNotDone = $scope.$on("updateUserNotDone", function(event, message){
        $scope.showAlert('alert-danger', "Server Error:" + message);
        cleanupEventUpdateUserNotDone();

      });
  
    }

    $scope.jsonUpdateEmailData = function()
      {
        var userData = 
          {
            user:
            {
            'email' : $scope.user.email,
            'currentpassword' : $scope.user.password
            }
          };

        return JSON.stringify(userData); 
    }

    // function to handle server side responses
    $scope.handleUpdateUserEmailResponse = function(data){
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

    $scope.updateUserEmail = function() {
      $scope.emailEditor();
      UserSessionService.updateEmail($scope.jsonUpdateEmailData());
      var cleanupEventUpdateUserEmailDone = $scope.$on("updateUserEmailDone", function(event, message){
        $scope.handleUpdateUserEmailResponse(message); 
        cleanupEventUpdateUserEmailDone();     
    });

      var cleanupEventUpdateUserEmailNotDone = $scope.$on("updateUserEmailNotDone", function(event, message){
        $scope.showAlert('alert-danger', "Server Error:" + message);
        cleanupEventUpdateUserEmailNotDone();

      });
  
    }

    $scope.jsonUpdatePasswordData = function()
      {
        var userData = 
          {
            user:
            {
            'currentpassword' : $scope.user.currentpassword,
            'newpassword' : $scope.user.newpassword,
            'confirmnewpassword' : $scope.user.confirmpassword,            
            }
          };

        return JSON.stringify(userData); 
    }

    $scope.clear = function () {
      $scope.user.currentpassword = '';
      $scope.user.newpassword = '';
      $scope.user.confirmpassword = '';
    }

    // function to handle server side responses
    $scope.handleUpdateUserPasswordResponse = function(data){
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

    $scope.changePassword = function() {
      UserSessionService.updatePassword($scope.jsonUpdatePasswordData());
      var cleanupEventUpdateUserPasswordDone = $scope.$on("updateUserPasswordDone", function(event, message){
        $scope.handleUpdateUserPasswordResponse(message); 
        $scope.clear();
        cleanupEventUpdateUserPasswordDone();     
    });

      var cleanupEventUpdateUserPasswordNotDone = $scope.$on("updateUserPasswordNotDone", function(event, message){
        $scope.showAlert('alert-danger', "Server Error:" + message);
        cleanupEventUpdateUserPasswordNotDone();

      });
  
    }

    // function to send and stringify user email to Rest APIs for user account update
    $scope.jsonUserAddressData = function()
      {
        var userData = 
          {
            user:
            {
            'address':{
                        'address1':$scope.user.address.address1,
                        'address2':$scope.user.address.address2,
                        'address3':$scope.user.address.address3,
                        'city':$scope.user.address.city,
                        'state':$scope.user.address.state,
                        'country':$scope.user.address.country,
                        'zipcode':$scope.user.address.zipcode
                      }
            }
          };

        return JSON.stringify(userData); 
      }

    $scope.updateUserAddress = function() {
      $scope.addrEditor();
      UserSessionService.saveUserSettings($scope.jsonUserAddressData());
      var cleanupEventUpdateUserDone = $scope.$on("updateUserDone", function(event, message){
        $scope.handleUpdateUserResponse(message); 
        cleanupEventUpdateUserDone();     
    });

      var cleanupEventUpdateUserNotDone = $scope.$on("updateUserNotDone", function(event, message){
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
        $scope.showAlert('alert-danger', "Server Error:" + message);
        cleanupEventDeleteUserNotDone();

      });
  
    }

    $scope.prodlesfollowed = [{}];
    $scope.prodlesrecommend = [{}];

    // function to handle server side responses
    $scope.handleGetUserResponse = function(data){
      if (data.success) {
          $scope.user = data.success.user;
          var d=new Date(data.success.user.dob);
          var year=d.getFullYear();
          var month=d.getMonth()+1;
          if (month<10){
            month="0" + month;
          }
          var day=d.getDate();
          $scope.user.dob = year + "-" + month + "-" + day;
          if ($scope.user.products_followed.length > 0) {
            for (var i=0;i<$scope.user.products_followed.length;i++){
              if($scope.user.products_followed[i] && $scope.user.products_followed[i].prodle){
                var prodle = $scope.user.products_followed[i].prodle;
              }
              $scope.prodlesfollowed.push(prodle);
            }
            UserSessionService.getProductFollowed($scope.prodlesfollowed);
          };
          if ($scope.user.products_recommends.length > 0) {
            for (var i=0;i<$scope.user.products_recommends.length;i++){
              if($scope.user.products_recommends[i] && $scope.user.products_recommends[i].prodle){
                var prodle = $scope.user.products_recommends[i].prodle;
              }
              $scope.prodlesrecommend.push(prodle);
            }
            UserSessionService.getProductRecommend($scope.prodlesrecommend);
          };
          UserSessionService.updateUserData(data.success.user);
          $scope.showAlert('alert-success', data.success.message);   
      } else {
          $log.debug(data.error.message);
          $scope.showAlert('alert-error', data.error.message);  
      }
    };

    $scope.products_followed = [];
    var cleanupEventGetProductFollowedDone = $rootScope.$on("getProductFollowedDone", function(event, data){
      $scope.products_followed = data.success.products;
      $scope.showAlert('alert-success', data.success.message);  
      cleanupEventGetProductFollowedDone();  
    });

    var cleanupEventGetProductFollowedNotDone = $rootScope.$on("getProductFollowedNotDone", function(event, data){
      $scope.showAlert('alert-error', data.error.message);  
      cleanupEventGetProductFollowedNotDone();  
    });

    var cleanupEventGetProductRecommendDone = $rootScope.$on("getProductRecommendDone", function(event, data){
      $scope.products_recommends = data.success.products;
      $scope.showAlert('alert-success', data.success.message);  
      cleanupEventGetProductRecommendDone();  
    });;

    var cleanupEventGetProductRecommendNotDone = $rootScope.$on("getProductRecommendNotDone", function(event, data){
      $scope.showAlert('alert-error', data.error.message);  
      cleanupEventGetProductRecommendNotDone();  
    });

    var cleanupEventGetUserDone = $rootScope.$on("getUserDone", function(event, message){
      $scope.handleGetUserResponse(message); 
      cleanupEventGetUserDone();  
    });

    var cleanupEventGetUserNotDone = $rootScope.$on("getUserNotDone", function(event, message){
      $scope.showAlert('alert-danger', "Server Error:" + message);
      cleanupEventGetUserNotDone();
    });

    $scope.userinvites=[{
                        'name': '',
                        'email': ''
                      }];

    $scope.addUserInvites = function() { 
      $scope.userinvites.push({'name': '', 'email': ''});
    };

    $scope.jsonUserInvitesData = function()
      {
        var userInvite = 
          {
            userinvites: $scope.userinvites
          }
        return JSON.stringify(userInvite); 
      }

    // function to handle server side responses
    $scope.handleUserInviteResponse = function(data){
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


    $scope.sendUserInvites = function() {
      console.log($scope.jsonUserInvitesData());
      UserSessionService.sendInvites($scope.jsonUserInvitesData());
      var cleanupEventSendUserInvitesDone = $scope.$on("sendUserInvitesDone", function(event, data){
        $scope.handleUserInviteResponse(data); 
        cleanupEventSendUserInvitesDone();  
      });
      var cleanupEventSendUserInvitesNotDone = $scope.$on("sendUserInvitesNotDone", function(event, data){
        $scope.showAlert('alert-danger', "Server Error:" + data); 
        cleanupEventSendUserInvitesNotDone();     
      });
    }

    $scope.unfollow = function (product, prodleindex) {
      UserSessionService.unfollowProduct(product.prodle);
      var cleanupEventUnfollowProductDone = $scope.$on("unfollowProductDone", function(event, data){
        $scope.showAlert('alert-success', data.success.message); 
        var products_followed = $scope.products_followed;
          for (var i = 0, ii = products_followed.length; i < ii; i++) {
            if (product === products_followed[i]) { products_followed.splice(i, 1); }
          }   
        cleanupEventUnfollowProductDone();  
      });
      var cleanupEventUnfollowProductNotDone = $scope.$on("unfollowProductNotDone", function(event, data){
        $scope.showAlert('alert-danger', "Server Error:" + data); 
        cleanupEventUnfollowProductNotDone();     
      });
    }


    /***
    // Organisation Manage Account Settings
    ***/

    var cleanupEventGetOrgAddData = $rootScope.$on("getOrgAddData", function(event, data){
        $scope.orgaddr = data;
        cleanupEventGetOrgAddData();  
    });
    

    $scope.jsonOrgAccountData = function()
      {
        var orgData = 
          {
            organization:
            {
            'name' : $scope.org.name,
            'description' : $scope.org.description
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
      $scope.disableEditor();
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
      console.log($scope.jsonOrgAddressData());
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

    $scope.orginvites=[{
                        'name': '',
                        'orgname': '',
                        'email': ''
                      }];

    $scope.addMoreInvites = function() { 
      $scope.orginvites.push({'name': '', 'orgname': '', 'email': ''});
    };

    $scope.jsonOrgInvitesData = function()
      {
        var orgInvite = 
          {
            otherorginvites: $scope.orginvites
          }
        return JSON.stringify(orgInvite); 
      }

    // function to handle server side responses
    $scope.handleOrgInviteResponse = function(data){
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


    $scope.sendOrgInvites = function() {
      console.log($scope.jsonOrgInvitesData());
      OrgRegistrationService.sendInvites($scope.jsonOrgInvitesData());
      var cleanupEventSendOrgInvitesDone = $scope.$on("sendOrgInvitesDone", function(event, data){
        $scope.handleOrgInviteResponse(data); 
        cleanupEventSendOrgInvitesDone();  
      });
      var cleanupEventSendOrgInvitesNotDone = $scope.$on("sendOrgInvitesNotDone", function(event, data){
        $scope.showAlert('alert-danger', "Server Error:" + data); 
        cleanupEventSendOrgInvitesNotDone();     
      });
    }

    $scope.customerinvites=[{
                        'name': '',
                        'email': ''
                      }];

    $scope.addCustomerInvites = function() { 
      $scope.customerinvites.push({'name': '', 'email': ''});
    };

    $scope.jsonOrgCustomerInvitesData = function()
      {
        var orgCustomerInvite = 
          {
            orgcustomerinvites: $scope.customerinvites
          }
        return JSON.stringify(orgCustomerInvite); 
      }

    // function to handle server side responses
    $scope.handleOrgCustomerInviteResponse = function(data){
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


    $scope.orgCustomerInvites = function() {
      console.log($scope.jsonOrgInvitesData());
      OrgRegistrationService.sendCustomerInvites($scope.jsonOrgCustomerInvitesData());
      var cleanupEventSendOrgCustomerInvitesDone = $scope.$on("sendOrgCustomerInvitesDone", function(event, data){
        $scope.handleOrgCustomerInviteResponse(data); 
        cleanupEventSendOrgCustomerInvitesDone();  
      });
      var cleanupEventSendOrgCustomerInvitesNotDone = $scope.$on("sendOrgCustomerInvitesNotDone", function(event, data){
        $scope.showAlert('alert-danger', "Server Error:" + data); 
        cleanupEventSendOrgCustomerInvitesNotDone();     
      });
    }


    $scope.showInvites = false;

    $scope.addInvites = function() {
      $scope.showInvites = true;
    }

    $scope.group = {
                      'grpname': '',
                      'invites': ''
    }

    $scope.jsonOrgGroupInvitesData = function()
      {
        var orgGroupInvite = 
          {
            usergrp:
            {
             'grpname': $scope.group.grpname,
             'invites': $scope.group.invites
            }
          }
        return JSON.stringify(orgGroupInvite); 
      }

    // function to handle server side responses
    $scope.handleOrgGroupInviteResponse = function(data){
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


    $scope.addGroupInvite = function() {
      OrgRegistrationService.groupInvites($scope.jsonOrgGroupInvitesData());
      var cleanupEventSendOrgGroupInvitesDone = $scope.$on("sendOrgGroupInvitesDone", function(event, data){
        $scope.handleOrgGroupInviteResponse(data); 
        cleanupEventSendOrgGroupInvitesDone();  
      });
      var cleanupEventSendOrgGroupInvitesNotDone = $scope.$on("sendOrgGroupInvitesNotDone", function(event, data){
        $scope.showAlert('alert-danger', "Server Error:" + data); 
        cleanupEventSendOrgGroupInvitesNotDone();     
      });
    }



}]);
 