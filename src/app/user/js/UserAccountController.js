angular.module('prodo.UserApp')
 .controller('UserAccountController', ['$scope', '$rootScope', '$state', '$http', '$timeout', '$log', 'growl', 'UserSessionService', 'OrgRegistrationService', 'userdata', function($scope, $rootScope, $state, $http, $timeout, $log, growl, UserSessionService, OrgRegistrationService, userdata) {

    $log.debug(userdata.success.user);
    $scope.user ={};
    $scope.editorEnabled = false;
    $scope.editEmail = false;
    $scope.editAddress = false;
    $scope.hasChangedPassword = false;
    $scope.isInvites = false;
    $scope.isUnfollowed = false;
    $scope.hasChangedAddress = false;
    $scope.hasChangedEmail = false;
    $scope.hasChangedPersonalSettings = false;
    $scope.form = {};
    $scope.submitted = false;

    $scope.prodlesrecommend = [{}];

    $scope.products_followed = [];
    $scope.products_followed = UserSessionService.productfollowlist;

  
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
var cleanupEventUserUploadResponseSuccess = $scope.$on("userUploadResponseSuccess",function(event,message){
    if(message.error !== undefined && message.error.code === 'AL001' )
       {
           UserSessionService.resetSession();
           $state.go('prodo.landing.signin');
       }
       else
       {
          console.log("Listenig ")
          $state.reload();
      }
     })


    $scope.$state = $state;
    $scope.$watch('$state.$current.locals.globals.userdata', function (userdata) {
      
      if (userdata.success.user) {
          $scope.user = userdata.success.user;
          if (userdata.success.user.firstname != null) {
            $scope.hasPersonalDetail = true;
          } else {
            $scope.hasPersonalDetail = false;
          }
          if (userdata.success.user.address.address1 != null) {
            $scope.hasAddress = true;
          } else {
            $scope.hasAddress = false;
          }
          if (userdata.success.user.dob != null) {
            var d=new Date(userdata.success.user.dob);
            var year=d.getFullYear();
            var month=d.getMonth()+1;
            if (month<10){
              month="0" + month;
            }
            var day=d.getDate();
            $scope.user.dob = year + "-" + month + "-" + day;
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
          UserSessionService.updateUserData(userdata.success.user);
          $scope.showAlert('alert-success', userdata.success.message);   
      } else {
          $log.debug(userdata.error.message);
          $scope.showAlert('alert-error', userdata.error.message);  
      }
    });

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
        $state.reload();
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

    $scope.updateUserAccount = function() {
      if ($scope.form.userpersonalsettingform.$valid) {
        $scope.personalsettingchange = ''
        $scope.disableEditor();
        UserSessionService.saveUserSettings($scope.jsonUserAccountData());
      } else {
          $scope.personalsettingchange = 'Please enter valid data.'
      }
    }

    var cleanupEventUpdateUserDone = $scope.$on("updateUserDone", function(event, message){
       if(message.error !== undefined && message.error.code === 'AL001' )
       {
           UserSessionService.resetSession();
           $state.go('prodo.landing.signin');
       }
       else
       {
          $scope.hasChangedPersonalSettings = true;
          $scope.handleUpdateUserResponse(message);  
      }   
    });

    var cleanupEventUpdateUserNotDone = $scope.$on("updateUserNotDone", function(event, message){
      $scope.hasChangedPersonalSettings = true;
      growl.addErrorMessage("It looks as though we have broken something on our server system. Our support team is notified and will take immediate action to fix it." + message);
    });

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
        $scope.emailEditor();
        $state.reload();
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
        UserSessionService.updateEmail($scope.jsonUpdateEmailData());
      } else {
        $scope.form.usergeneralsettingform.submitted = true;
      }
    }

    var cleanupEventUpdateUserEmailDone = $scope.$on("updateUserEmailDone", function(event, message){
        if(message.error !== undefined && message.error.code === 'AL001' )
       {
           UserSessionService.resetSession();
           $state.go('prodo.landing.signin');
       }
       else
       {
          $scope.hasChangedEmail = true;
          $scope.handleUpdateUserEmailResponse(message); 
       }
    });

    var cleanupEventUpdateUserEmailNotDone = $scope.$on("updateUserEmailNotDone", function(event, message){
      $scope.hasChangedEmail = true;
      growl.addErrorMessage("It looks as though we have broken something on our server system. Our support team is notified and will take immediate action to fix it." + message);   
    });

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
        $scope.clear();  
        $state.reload();
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
        $scope.form.userpasswordsettingform.submitted = false;
        UserSessionService.updatePassword($scope.jsonUpdatePasswordData());
      } else {
        $scope.form.userpasswordsettingform.submitted = true;
      }
    }

    var cleanupEventUpdateUserPasswordDone = $scope.$on("updateUserPasswordDone", function(event, message){
      if(message.error !== undefined && message.error.code === 'AL001' )
       {
           UserSessionService.resetSession();
           $state.go('prodo.landing.signin');
       }
       else
       {
          $scope.hasChangedPassword = true;
          $scope.handleUpdateUserPasswordResponse(message); 
       }
    });

    var cleanupEventUpdateUserPasswordNotDone = $scope.$on("updateUserPasswordNotDone", function(event, message){
      $scope.hasChangedPassword = true;
      growl.addErrorMessage("It looks as though we have broken something on our server system. Our support team is notified and will take immediate action to fix it." + message);
    });


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
          $scope.locationsettingchange = 'Please enter valid data.'
      } 
    }

    var cleanupEventUpdateUserDone = $scope.$on("updateUserDone", function(event, message){
      if(message.error !== undefined && message.error.code === 'AL001' )
       {
           UserSessionService.resetSession();
           $state.go('prodo.landing.signin');
       }
       else
       {
          hasChangedAddress = true;
          $scope.handleUpdateUserResponse(message); 
      }         
    });

    var cleanupEventUpdateUserNotDone = $scope.$on("updateUserNotDone", function(event, message){
      hasChangedAddress = true;
      growl.addErrorMessage("It looks as though we have broken something on our server system. Our support team is notified and will take immediate action to fix it." + message);
    });

    // function to handle server side responses
    $scope.handleDeleteUserResponse = function(data){
      if (data.success) {
        UserSessionService.logoutUser();
        $scope.showAlert('alert-success', data.success.message);   
      } else {
        $log.debug(data.error.message);
        $scope.showAlert('alert-danger', data.error.message);
      }
    };
    var cleanupEventLogoutDone = $scope.$on("logoutDone", function(event, message){
      $state.transitionTo('prodo.landing.signin');
      $scope.showAlert('alert-success', message);   
    });

    $scope.deleteUserAccount = function() {
      UserSessionService.removeUserSettings();
    }

    var cleanupEventDeleteUserDone = $scope.$on("deleteUserDone", function(event, message){
      if(message.error !== undefined && message.error.code === 'AL001' )
       {
           UserSessionService.resetSession();
           $state.go('prodo.landing.signin');
       }
       else
       {
           $scope.handleDeleteUserResponse(message);   
        }  
    });
    var cleanupEventDeleteUserNotDone = $scope.$on("deleteUserNotDone", function(event, message){
      $scope.showAlert('alert-danger', "It looks as though we have broken something on our server system. Our support team is notified and will take immediate action to fix it." + message);
    });

    var cleanupEventGetProductRecommendDone = $rootScope.$on("getProductRecommendDone", function(event, data){
      if(data.error !== undefined && data.error.code === 'AL001' )
       {
           UserSessionService.resetSession();
           $state.go('prodo.landing.signin');
       }
       else
       {
          $scope.products_recommends = data.success.products;
          $scope.showAlert('alert-success', data.success.message); 
      }        
    });

    var cleanupEventGetProductRecommendNotDone = $rootScope.$on("getProductRecommendNotDone", function(event, data){
      $scope.showAlert('alert-error', data.error.message);      
    });

    $scope.userinvites=[{
                        'name': '',
                        'email': ''
                      }];

    $scope.addUserInvites = function() { 
      if ($scope.form.userinvitesform.$valid) {
        $scope.invitesettingchange = '';
        $scope.userinvites.push({'name': '', 'email': ''});
      } else {
        $scope.invitesettingchange = 'New fields will only be visible once you enter data here.';
      }
    };

    $scope.clearInvites = function() { 
        $scope.userinvites = [{'name': '', 'email': ''}];
    };

    $scope.removeInvites = function(invite) {
    var invites = $scope.userinvites;
      for (var i = 0, ii = invites.length; i < ii; i++) {
        if (invite === invites[i]) { 
          invites.splice(i, 1); 
        }
        else {
          invites.splice(i,0);
        } 
      }
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
        $scope.clearInvites();
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
        $log.debug($scope.jsonUserInvitesData());
        UserSessionService.sendInvites($scope.jsonUserInvitesData());
      } else {
          $scope.invitesettingchange = 'Please pass valid data.'
      }
    }

    var cleanupEventSendUserInvitesDone = $scope.$on("sendUserInvitesDone", function(event, data){
      if(data.error !== undefined && data.error.code === 'AL001' )
       {
           UserSessionService.resetSession();
           $state.go('prodo.landing.signin');
       }
       else
       {
          $scope.isInvites = true;
          $scope.handleUserInviteResponse(data);  
        } 
    });
    var cleanupEventSendUserInvitesNotDone = $scope.$on("sendUserInvitesNotDone", function(event, data){
      $scope.isInvites = true;
      growl.addErrorMessage("It looks as though we have broken something on our server system. Our support team is notified and will take immediate action to fix it." + data);    
    });

    $scope.handleUnfollowProductResponse = function(data, product){
      if (data.success) {
        $state.reload();
        var products_followed = UserSessionService.productfollowlist;
        for (var i = 0, ii = products_followed.length; i < ii; i++) {
          if (product === products_followed[i]) { products_followed.splice(i, 1); }
        } 
        growl.addSuccessMessage('You have successfully unfollowed product:' + ' ' + product.name);    
      } else {
          $log.debug(data.error.message);
          growl.addErrorMessage(data.error.message); 
        }
    }; 

    $scope.unfollow = function (product) {
      UserSessionService.unfollowProduct(product.prodle, product);
    };
    
    var cleanupEventUnfollowProductDone = $scope.$on("unfollowProductDone", function(event, data, product){
       if(data.error !== undefined && data.error.code === 'AL001' )
       {
           UserSessionService.resetSession();
           $state.go('prodo.landing.signin');
       }
       else
       {
          $scope.isUnfollowed = true;
          $scope.handleUnfollowProductResponse(data, product); 
       }    
    });
    var cleanupEventUnfollowProductNotDone = $scope.$on("unfollowProductNotDone", function(event, data){
      growl.addErrorMessage("It looks as though we have broken something on our server system. Our support team is notified and will take immediate action to fix it." + data);   
    });
  

    $scope.$on('$destroy', function(event, message) {
      cleanupEventUpdateUserDone();     
      cleanupEventUpdateUserNotDone();   
      cleanupEventUpdateUserEmailDone(); 
      cleanupEventUpdateUserEmailNotDone();
      cleanupEventUpdateUserPasswordDone();
      cleanupEventUpdateUserPasswordNotDone();  
      cleanupEventUpdateUserDone(); 
      cleanupEventUpdateUserNotDone(); 
      cleanupEventDeleteUserDone();   
      cleanupEventDeleteUserNotDone();
      cleanupEventLogoutDone();                            
      cleanupEventGetProductRecommendDone(); 
      cleanupEventGetProductRecommendNotDone();     
      cleanupEventSendUserInvitesDone();      
      cleanupEventSendUserInvitesNotDone();      
      cleanupEventUnfollowProductDone(); 
      cleanupEventUnfollowProductNotDone();  
      cleanupEventUserUploadResponseSuccess();
    });
}]);
 