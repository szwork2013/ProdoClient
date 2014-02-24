angular.module('prodo.UserApp')
 .controller('UserAccountController', ['$scope', '$rootScope', '$state', '$http', '$timeout', '$log', 'growl', 'UserSessionService', 'OrgRegistrationService', function($scope, $rootScope, $state, $http, $timeout, $log, growl, UserSessionService, OrgRegistrationService) {

    $scope.editorEnabled = false;
    $scope.editEmail = false;
    $scope.editAddress = false;
    $scope.hasChangedPassword = false;
    $scope.hasChangedEmail = false;
    $scope.isInvites = false;
    $scope.isUnfollowed = false;
    $scope.hasChangedAddress = false;
    $scope.hasChangedPersonalSettings = false;
    $scope.form = {};
  
    $scope.enableEditor = function() {
      $scope.editorEnabled = true;
    };
  
    $scope.disableEditor = function() {
      $scope.editorEnabled = false;
    };

    $scope.emailEditor = function() {
      $scope.generalsettingchange = '';
      if ($scope.editEmail) {
        $scope.editEmail = false;
      } else {
        $scope.editEmail = true;
      }
      
    };

    $scope.addrEditor = function() {
      $scope.locationsettingchange = '';
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
            }
          };

        return JSON.stringify(userData); 
      }

    // function to handle server side responses
    $scope.handleUpdateUserResponse = function(data){
      if (data.success) {
        growl.addSuccessMessage(data.success.message); 
        $scope.showAlert('alert-success', data.success.message);   
      } else {
        if (data.error.code== 'AU004') {     // enter valid data
            $log.debug(data.error.code + " " + data.error.message);
            growl.addErrorMessage(data.error.message); 
        } else {
            $log.debug(data.error.message);
            growl.addErrorMessage(data.error.message); 
        }
      }
    };  

    $scope.updateUserAccount = function() {
      if ($scope.form.userpersonalsettingform.$valid) {
        $scope.personalsettingchange = ''
        $scope.disableEditor();
        UserSessionService.saveUserSettings($scope.jsonUserAccountData());
      } else {
          $scope.personalsettingchange = 'Please pass valid data.'
      }
      var cleanupEventUpdateUserDone = $scope.$on("updateUserDone", function(event, message){
        $scope.hasChangedPersonalSettings = true;
        $scope.handleUpdateUserResponse(message); 
        cleanupEventUpdateUserDone();     
    });

      var cleanupEventUpdateUserNotDone = $scope.$on("updateUserNotDone", function(event, message){
        $scope.hasChangedPersonalSettings = true;
        growl.addErrorMessage("Server Error:" + message);
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
        growl.addSuccessMessage(data.success.message);   
      } else {
        if (data.error.code== 'AU004') {     // enter valid data
            $log.debug(data.error.code + " " + data.error.message);
            growl.addErrorMessage(data.error.message);
        } else {
            $log.debug(data.error.message);
            growl.addErrorMessage(data.error.message);
        }
      }
    };  

    
    $scope.updateUserEmail = function() {
      if ($scope.form.usergeneralsettingform.$valid) {
        $scope.emailEditor();
        UserSessionService.updateEmail($scope.jsonUpdateEmailData());
      } else {
          $scope.generalsettingchange = 'Please pass valid data.';
      }
      var cleanupEventUpdateUserEmailDone = $scope.$on("updateUserEmailDone", function(event, message){
        $scope.hasChangedEmail = true;
        $scope.handleUpdateUserEmailResponse(message); 
        cleanupEventUpdateUserEmailDone();     
    });

      var cleanupEventUpdateUserEmailNotDone = $scope.$on("updateUserEmailNotDone", function(event, message){
        $scope.hasChangedEmail = true;
        growl.addErrorMessage("Server Error:" + message);
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
      $scope.passwordsettingchange = '';
    }

    // function to handle server side responses
    $scope.handleUpdateUserPasswordResponse = function(data){
      if (data.success) {
        growl.addSuccessMessage(data.success.message);  
      } else {
        if (data.error.code== 'AU004') {     // enter valid data
            $log.debug(data.error.code + " " + data.error.message);
            growl.addErrorMessage(data.error.message);
        } else {
            $log.debug(data.error.message);
            growl.addErrorMessage(data.error.message);
        }
      }
    };  

    $scope.changePassword = function() {
      if ($scope.form.userpasswordsettingform.$valid) {
        $scope.passwordsettingchange = '';
        UserSessionService.updatePassword($scope.jsonUpdatePasswordData());
      } else {
          $scope.passwordsettingchange = 'Please pass valid data.'
      }
      var cleanupEventUpdateUserPasswordDone = $scope.$on("updateUserPasswordDone", function(event, message){
        $scope.hasChangedPassword = true;
        $scope.handleUpdateUserPasswordResponse(message); 
        $scope.clear();
        cleanupEventUpdateUserPasswordDone();     
    });

      var cleanupEventUpdateUserPasswordNotDone = $scope.$on("updateUserPasswordNotDone", function(event, message){
        $scope.hasChangedPassword = true;
        growl.addErrorMessage("Server Error:" + message);
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
      if ($scope.form.userlocationsettingform.$valid) {
        $scope.addrEditor();
        UserSessionService.saveUserSettings($scope.jsonUserAddressData());
      } else {
          $scope.locationsettingchange = 'Please pass valid data.'
      }
      var cleanupEventUpdateUserDone = $scope.$on("updateUserDone", function(event, message){
        hasChangedAddress = true;
        $scope.handleUpdateUserResponse(message); 
        cleanupEventUpdateUserDone();     
    });

      var cleanupEventUpdateUserNotDone = $scope.$on("updateUserNotDone", function(event, message){
        hasChangedAddress = true;
        growl.addErrorMessage("Server Error:" + message);
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
        growl.addSuccessMessage('Your invites has been successfully sent.');
      } else {
        if (data.error.code== 'AU004') {     // enter valid data
            $log.debug(data.error.code + " " + data.error.message);
            growl.addErrorMessage(data.error.message);
        } else {
            $log.debug(data.error.message);
            growl.addErrorMessage(data.error.message);
        }
      }
    };  


    $scope.sendUserInvites = function() {
      if ($scope.form.userinvitesform.$valid) {
        $scope.invitesettingchange = ''
        console.log($scope.jsonUserInvitesData());
        UserSessionService.sendInvites($scope.jsonUserInvitesData());
      } else {
          $scope.invitesettingchange = 'Please pass valid data.'
      }
      
      var cleanupEventSendUserInvitesDone = $scope.$on("sendUserInvitesDone", function(event, data){
        $scope.isInvites = true;
        $scope.handleUserInviteResponse(data); 
        cleanupEventSendUserInvitesDone();  
      });
      var cleanupEventSendUserInvitesNotDone = $scope.$on("sendUserInvitesNotDone", function(event, data){
        $scope.isInvites = true;
        growl.addErrorMessage("Server Error:" + data); 
        cleanupEventSendUserInvitesNotDone();     
      });
    }

    $scope.unfollow = function (product) {
      UserSessionService.unfollowProduct(product.prodle);
      var cleanupEventUnfollowProductDone = $scope.$on("unfollowProductDone", function(event, data){
        $scope.isUnfollowed = true;
        growl.addSuccessMessage('You have successfully unfollowed product:' + ' ' + product.name);
        var products_followed = $scope.products_followed;
          for (var i = 0, ii = products_followed.length; i < ii; i++) {
            if (product === products_followed[i]) { products_followed.splice(i, 1); }
          }   
        cleanupEventUnfollowProductDone();  
      });
      var cleanupEventUnfollowProductNotDone = $scope.$on("unfollowProductNotDone", function(event, data){
        growl.addErrorMessage("Server Error:" + message); 
        cleanupEventUnfollowProductNotDone();     
      });
    }

}]);
 