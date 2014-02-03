/**
*	User Signin Controller
**/
angular.module('prodo.UserApp')
 	.controller('UserSigninController', ['$scope', '$rootScope', '$state', '$timeout', '$stateParams', '$log', 'UserSessionService', 'UserSubscriptionService', function($scope, $rootScope, $state, $timeout, $stateParams, $log, UserSessionService, UserSubscriptionService) {
    $scope.submitted = false;  // form submit property is false
    $scope.user = 
      {
        'email' :  '',
        'password' :  '',
        'currentpassword': '',
        'newpassword': ''

      };

    // function to clear form data on submit
    $scope.clearformData = function() {
      $scope.user.email = '';
      $scope.user.password = '';
      $scope.user.currentpassword = '';
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
        $state.transitionTo('prodo.wall');
        $scope.showAlert('alert-success', 'Welcome to Prodonus, you have successfully signed up.');
        $scope.clearformData();
        
      } else {
        if (data.error.code== 'AU005') {     // user does not exist
            $log.debug(data.error.code + " " + data.error.message);
            $scope.showAlert('alert-danger', 'You are not a registered user, please signup first');
             
        } else if (data.error.code=='AU002') {  // user password invalid
            $log.debug(data.error.code + " " + data.error.message);
            $scope.showAlert('alert-danger', data.error.message);

        } else if (data.error.code=='AV001') {  // enter valid data
            $log.debug(data.error.code + " " + data.error.message);
            $scope.showAlert('alert-danger', data.error.message);
        } else if (data.error.code=='AU006') {  // user signedin using OTP
            $log.debug(data.error.code + " " + data.error.message);
            UserSessionService.authSuccess(data.error.user);
            $scope.showAlert('alert-danger', data.error.message);
        } else if (data.error.code=='AU003') {   // user has not verified
            $log.debug(data.error.code + " " + data.error.message);
            $scope.showAlert('alert-danger', 'Please check your email for verification link and activate your account with Prodonus.');
        } else if (data.error.code=='AS001') {   // user has not subscribed to any plan
            $log.debug(data.error.code + " " + data.error.message);
            UserSessionService.authSuccess(data.error.user);
            $scope.showAlert('alert-danger', data.error.message);
        } else if (data.error.code=='AS002') { // user subscription expired
            $log.debug(data.error.code + " " + data.error.message);
            UserSessionService.authSuccess(data.error.user);
            $scope.showAlert('alert-danger', data.error.message);  
        } else if (data.error.code== 'AP001') {    // user has not done any payment
            $log.debug(data.error.code + " " + data.error.message);
            UserSessionService.authSuccess(data.error.user);
            $scope.showAlert('alert-danger', data.error.message);
        } else {
            $log.debug(data.error.message);
            $scope.showAlert('alert-danger', data.error.message);

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
        $state.transitionTo('messageContent.signin');   
        $scope.showAlert('alert-info', 'Your temporary password has been sent. Please check your email, and signin again.');

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
             'currentpassword' : $scope.user.currentpassword,
             'newpassword' : $scope.user.newpassword
            }
          };
        return JSON.stringify(userData); 
      }
     

    // function to handle server side responses
    $scope.handleResetPasswordResponse = function(data){
      if (data.success) {
        if (data.success.isSubscribed && data.success.subscriptionExpired && data.success.hasDonePayment) {
          $state.transitionTo('prodo.wall');
        } else if (!data.success.isSubscribed) {
          $state.transitionTo('subscription.plans');
        };
      } else {
        if (data.error.code== 'AV001') {     // enter valid data
            $log.debug(data.error.code + " " + data.error.message);
            $scope.showAlert('alert-danger', data.error.message);
        } else {
            $log.debug(data.error.message);
            $scope.showAlert('alert-danger', data.error.message);
        }
      }
    };

    // function for resetpassword to Prodonus App using REST APIs and performs form validation.
    $scope.resetpassword = function() {
      $scope.showSpinner();
      UserSessionService.resetPasswordUser($scope.jsonResetPasswordData());
      var cleanupEventResetPasswordDone = $scope.$on("resetPasswordDone", function(event, message){
        $scope.clearformData();
        $scope.hideSpinner();
        $scope.handleResetPasswordResponse(message);  
        cleanupEventResetPasswordDone(); 
      });
      var cleanupEventResetPasswordNotDone = $scope.$on("resetPasswordNotDone", function(event, message){
        $scope.clearformData();
        $scope.hideSpinner();
        $scope.showAlert('alert-danger', "Server Error:" + message);
        cleanupEventResetPasswordNotDone();

      });
    }

}]);
 