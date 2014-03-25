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
    }, 5000);

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
      } else {
        $scope.signinForm.submitted = true;
      }
    }
    var cleanupEventSigninDone = $scope.$on("signinDone", function(event, message){
      $scope.handleSigninResponse(message);
      $scope.hideSpinner();
    });

    var cleanupEventSigninNotDone = $scope.$on("signinNotDone", function(event, message){
      $scope.clearformData();
      $scope.hideSpinner();
      $scope.showAlert('alert-danger', "It looks as though we have broken something on our server system. Our support team is notified and will take immediate action to fix it." + message);
    });

    // function to send and stringify user signin data to Rest APIsIt looks as though we have broken something on our server system. Our support team is notified and will take immediate action to fix it." + message
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
    }
    var cleanupEventForgotPasswordDone = $scope.$on("forgotPasswordDone", function(event, message){
        $scope.clearformData();
        $scope.hideSpinner();
        $scope.handleForgotPasswordResponse(message);
    });
    
    var cleanupEventForgotPasswordNotDone = $scope.$on("forgotPasswordNotDone", function(event, message){
        $scope.clearformData();
        $scope.hideSpinner();
        $scope.showAlert('alert-danger', "It looks as though we have broken something on our server system. Our support team is notified and will take immediate action to fix it." + message);
      });

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
            $rootScope.orgid = $rootScope.usersession.currentUser.org.orgid;
            $state.transitionTo('prodo.home.wall.org');
          } else if ($rootScope.usersession.currentUser.hasDonePayment) {
            $state.transitionTo('prodo.home.wall.org');
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
      } else {
        $scope.resetPasswordForm.submitted = true;
      }
    }

    var cleanupEventResetPasswordDone = $scope.$on("resetPasswordDone", function(event, message){
        $scope.clearformData();
        $scope.handleResetPasswordResponse(message);  
    });

    var cleanupEventResetPasswordNotDone = $scope.$on("resetPasswordNotDone", function(event, message){
        $scope.clearformData();
        $scope.hideSpinner();
        $scope.showAlert('alert-danger', "It looks as though we have broken something on our server system. Our support team is notified and will take immediate action to fix it." + message);
    });

    $scope.$on('$destroy', function(event, message) {
      cleanupEventSigninDone(); 
      cleanupEventSigninNotDone();      
      cleanupEventForgotPasswordDone();
      cleanupEventForgotPasswordNotDone();      
      cleanupEventResetPasswordDone(); 
      cleanupEventResetPasswordNotDone();
    });

}]);
 