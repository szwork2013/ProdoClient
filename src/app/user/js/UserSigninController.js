/**
*	User Signin Controller
**/
angular.module('prodo.UserApp')
 	.controller('UserSigninController', ['$scope', '$rootScope', '$state', '$timeout', '$stateParams', '$log', 'UserSessionService', 'OrgRegistrationService', function($scope, $rootScope, $state, $timeout, $stateParams, $log, UserSessionService, OrgRegistrationService) {
    $scope.submitted = false;  // form submit property is false
    $scope.user = 
      {
        'email' :  '',
        'password' :  '',
        'newpassword': ''

      };

    // function to clear form data on submit
    $scope.clearformData = function() {
      $scope.user.email = '';
      $scope.user.password = '';
      $scope.user.newpassword = '';
      $scope.user.confirmnewpassword = '';
    }

    $timeout(function() {
       $scope.hideAlert();
    }, 50000);

    // function to send and stringify user signin data to Rest APIs
    $scope.jsonUserSigninData = function() {
      var userSigninData = 
        {
          'email' : $scope.user.email,
          'password' : $scope.user.password
        };
      return JSON.stringify(userSigninData); 
    }

    // function to handle server side responses
    $scope.handleSigninResponse = function(data){
      if (data.success) {
        UserSessionService.authSuccess(data.success.user);
        $scope.showAlert('alert-success', 'Welcome to Prodonus, you have successfully signed up.');
      } else {
        if (data.error.user == undefined) {     
            $log.debug(data.error.code + " " + data.error.message);
            $scope.showAlert('alert-danger', data.error.message);
        } else if (data.error.user) {
          if (data.error.code == 'AW001') {
              $log.debug(data.error.code + " " + data.error.message);
              UserSessionService.authSuccess(data.error.user);
              $scope.showAlert('alert-info', data.error.message);
          } else {
              $log.debug(data.error.code + " " + data.error.message);
              UserSessionService.authSuccess(data.error.user);
              $scope.showAlert('alert-danger', data.error.message);
          }
        } 
      }
    };  

    // function to signin to Prodonus App using REST APIs and performs form validation.
    $scope.signin = function() {
      if ($scope.signinForm.$valid) {
        $scope.showSpinner();
        $log.debug('User Data entered successfully');
        UserSessionService.signinUser($scope.jsonUserSigninData());

        var cleanupEventSigninDone = $scope.$on("signinDone", function(event, message){
          $scope.hideSpinner();
          $scope.handleSigninResponse(message);
          cleanupEventSigninDone(); 
        });

        var cleanupEventSigninNotDone = $scope.$on("signinNotDone", function(event, message){
          $scope.clearformData();
          $scope.hideSpinner();
          $scope.showAlert('alert-danger', "Server Error:" + message);
          cleanupEventSigninNotDone();
        });
      } else {
        $scope.signinForm.submitted = true;
      }
    }

     

    // function to send and stringify user signin data to Rest APIs
    $scope.jsonForgotPasswordData = function()
      {
        var userData = 
          {
            user:
            {
             'email' : $scope.user.email 
            }
          };
        return JSON.stringify(userData); 
    }

    // function to handle server side responses
    $scope.handleForgotPasswordResponse = function(data){
      if (data.success) {   
        $scope.showAlert('alert-info', 'Your temporary password has been sent. Please check your email, and follow instructions.');

      } else {
        if (data.error.code== 'AV001') {     // enter valid data
            $log.debug(data.error.code + " " + data.error.message);
            $scope.showAlert('alert-danger', data.error.message);
        } else if (data.error.code=='AV004') {  // enter prodonus registered emailid
            $log.debug(data.error.code + " " + data.error.message);
            $scope.showAlert('alert-danger', data.error.message);
        } else if (data.error.code== 'AT001') {    // user has not done any payment
            $log.debug(data.error.code + " " + data.error.message);
            $scope.showAlert('alert-danger', data.error.message);
        } else {
            $log.debug(data.error.message);
            $scope.showAlert('alert-danger', data.error.message);
        }
      }
    };  

    // function for forgotpassword to Prodonus App using REST APIs and performs form validation.
    $scope.forgotpassword = function() {
      $scope.showSpinner();
      UserSessionService.forgotPasswordUser($scope.jsonForgotPasswordData());
      var cleanupEventForgotPasswordDone = $scope.$on("forgotPasswordDone", function(event, message){
        $scope.clearformData();
        $scope.hideSpinner();
        $scope.handleForgotPasswordResponse(message);
        cleanupEventForgotPasswordDone();   
      });
      var cleanupEventForgotPasswordNotDone = $scope.$on("forgotPasswordNotDone", function(event, message){
        $scope.clearformData();
        $scope.hideSpinner();
        $scope.showAlert('alert-danger', "Server Error:" + message);
        cleanupEventForgotPasswordNotDone();

      });
    }

    // function to send and stringify user reset password data to Rest APIs
    $scope.jsonResetPasswordData = function()
      {
        var userData = 
          {
            user:
            {
             'newpassword' : $scope.user.newpassword,
             'confirmnewpassword' : $scope.user.confirmnewpassword
            }
          };
        return JSON.stringify(userData); 
      }
     

    // function to handle server side responses
    $scope.handleResetPasswordResponse = function(data){
      if (data.success) {
          if ($rootScope.usersession.currentUser.hasDonePayment && $rootScope.usersession.currentUser.org.orgid) {
            OrgRegistrationService.getOrgDetailSettings();
          } else if (!$rootScope.usersession.currentUser.isSubscribed) {
            // UserSubscriptionService.getPlan();
          } else if ($rootScope.usersession.currentUser.isSubscribed && !$rootScope.usersession.currentUser.subscriptionExpired && !$rootScope.usersession.currentUser.hasDonePayment) {
            $state.transitionTo('subscription.payment', {
              planid: $rootScope.usersession.currentUser.subscription.planid,
              plantype: $rootScope.usersession.currentUser.usertype
            });
          } else if ($rootScope.usersession.currentUser.isSubscribed && $rootScope.usersession.currentUser.subscriptionExpired) {
            $state.transitionTo('subscription.payment', {
              planid: $rootScope.usersession.currentUser.subscription.planid,
              plantype: $rootScope.usersession.currentUser.usertype
            });
          } else if ($rootScope.usersession.currentUser.hasDonePayment) {
            $state.transitionTo('prodo.wall.org');
          } 
      } else {
        if (data.error.code== 'AV001') {     // enter valid data
            $log.debug(data.error.code + " " + data.error.message);
            $scope.showAlert('alert-danger', data.error.message);
        } else {
            $log.debug(data.error.message);
            $scope.showAlert('alert-danger', data.error.message);
        }
      }
      $scope.hideSpinner();
    };

    // function for resetpassword to Prodonus App using REST APIs and performs form validation.
    $scope.resetpassword = function() {
      if ($scope.resetPasswordForm.$valid) {
      $scope.showSpinner();
      UserSessionService.resetPasswordUser($scope.jsonResetPasswordData());
      var cleanupEventResetPasswordDone = $scope.$on("resetPasswordDone", function(event, message){
        $scope.clearformData();
        $scope.handleResetPasswordResponse(message);  
        cleanupEventResetPasswordDone(); 
      });
      var cleanupEventResetPasswordNotDone = $scope.$on("resetPasswordNotDone", function(event, message){
        $scope.clearformData();
        $scope.hideSpinner();
        $scope.showAlert('alert-danger', "Server Error:" + message);
        cleanupEventResetPasswordNotDone();

      });

      } else {
        $scope.resetPasswordForm.submitted = true;
      }
    }

}]);
 