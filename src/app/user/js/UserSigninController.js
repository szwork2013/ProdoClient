/**
*	User Signin Controller
**/
angular.module('prodo.UserApp')
 	.controller('UserSigninController', ['$scope', '$rootScope', '$state', '$timeout', '$stateParams', '$log', 'growl', 'UserSessionService', 'OrgRegistrationService', function($scope, $rootScope, $state, $timeout, $stateParams, $log, growl, UserSessionService, OrgRegistrationService) {
    $scope.submitted = false;  // form submit property is false
    $scope.user = 
      {
        'email' :  '',
        'password' :  '',
        'newpassword': '',
        'confirmpassword': '',
        'currentpassword': ''

      };

    // function to clear form data on submit
    $scope.clearformData = function() {
      $scope.user.email = '';
      $scope.user.password = '';
      $scope.user.newpassword = '';
      $scope.user.confirmnewpassword = '';
      $scope.user.currentpassword = '';
    }

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
        $scope.signinForm.$setPristine();
        $scope.clearformData();
      } else {
        if (data.error.user == undefined) {     
            $log.debug(data.error.code + " " + data.error.message);
            $rootScope.ProdoAppMessage(data.error.message,'error');
        } else if (data.error.user) {
          if (data.error.code == 'AW001') {
              $log.debug(data.error.code + " " + data.error.message);
              UserSessionService.authSuccess(data.error.user);
              $rootScope.ProdoAppMessage(data.error.message,'error');
          } else {
              $log.debug(data.error.code + " " + data.error.message);
              UserSessionService.authSuccess(data.error.user);
              $rootScope.ProdoAppMessage(data.error.message,'error');         
            }
        } 
      }
      $scope.hideSpinner();
    };  

    // function to signin to Prodonus App using REST APIs and performs form validation.
    $scope.signin = function() {
      if ($scope.signinForm.$valid) {
        $scope.showSpinner();
        $scope.signinForm.submitted = false;
        $log.debug('User Data entered successfully');
        UserSessionService.signinUser($scope.jsonUserSigninData());
      } else {
        $scope.signinForm.submitted = true;
      }
    }
    var cleanupEventSigninDone = $scope.$on("signinDone", function(event, message){
      $scope.handleSigninResponse(message);
    });

    var cleanupEventSigninNotDone = $scope.$on("signinNotDone", function(event, message){
      $scope.signinForm.$setPristine();
      $scope.clearformData();
      $scope.hideSpinner();
      $rootScope.ProdoAppMessage("It looks as though we have broken something on our server system. Our support team is notified and will take immediate action to fix it." + message, 'error');
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
        $rootScope.ProdoAppMessage('Your temporary password settings has been sent. Please check your email, and follow instructions.', 'info');
        $scope.clearformData();
      } else {
        if (data.error.code== 'AV001') {     // enter valid data
            $log.debug(data.error.code + " " + data.error.message);
            $rootScope.ProdoAppMessage(data.error.message, 'error');
        } else if (data.error.code=='AV004') {  // enter prodonus registered emailid
            $log.debug(data.error.code + " " + data.error.message);
            $rootScope.ProdoAppMessage(data.error.message, 'error');
        } else if (data.error.code== 'AT001') {    // user has not done any payment
            $log.debug(data.error.code + " " + data.error.message);
            $rootScope.ProdoAppMessage(data.error.message, 'error');
        } else {
            $log.debug(data.error.message);
            $rootScope.ProdoAppMessage(data.error.message, 'error');
        }
      }
      
      $scope.hideSpinner();
    };  

    // function for forgotpassword to Prodonus App using REST APIs and performs form validation.
    $scope.forgotpassword = function() {
      $scope.showSpinner();
      UserSessionService.forgotPasswordUser($scope.jsonForgotPasswordData());
    }
    var cleanupEventForgotPasswordDone = $scope.$on("forgotPasswordDone", function(event, message){
        $scope.handleForgotPasswordResponse(message);
    });
    
    var cleanupEventForgotPasswordNotDone = $scope.$on("forgotPasswordNotDone", function(event, message){
        $scope.hideSpinner();
        $rootScope.ProdoAppMessage("It looks as though we have broken something on our server system. Our support team is notified and will take immediate action to fix it." + message, 'error');
      });

    // function to send and stringify user reset password data to Rest APIs
    $scope.jsonResetPasswordData = function()
      {
        var userData = 
          {
            user:
            {
             'currentpassword' : $scope.user.currentpassword,
             'newpassword' : $scope.user.newpassword,
             'confirmnewpassword' : $scope.user.confirmnewpassword
            }
          };
        return JSON.stringify(userData); 
      }
     

    // function to handle server side responses
    $scope.handleResetPasswordResponse = function(data){
      if (data.success) {
          if ($rootScope.usersession.currentUser.hasDonePayment && $rootScope.usersession.currentUser.org && $rootScope.usersession.currentUser.org.orgtype == 'Manufacturer') {
            $rootScope.orgid = $rootScope.usersession.currentUser.org.orgid;
            $state.transitionTo('prodo.home.wall-org');
          } else if ($rootScope.usersession.currentUser.hasDonePayment) {
            $state.transitionTo('prodo.home.wall-org');
          } 
          $scope.resetPasswordForm.$setPristine();
          $scope.clearformData();
      } else {
        if (data.error.code== 'AL001') {     // enter valid data
            $log.debug(data.error.code + " " + data.error.message);
            $rootScope.showModal();
        } else {
            $log.debug(data.error.message);
            $rootScope.ProdoAppMessage(data.error.message, 'error');
        }
      }
      $scope.hideSpinner();
    };

    // function for resetpassword to Prodonus App using REST APIs and performs form validation.
    $scope.resetpassword = function() {
      if ($scope.resetPasswordForm.$valid) {
        $scope.showSpinner();
        $scope.resetPasswordForm.submitted = false;
        UserSessionService.resetPasswordUser($scope.jsonResetPasswordData());
      } else {
        $scope.resetPasswordForm.submitted = true;
      }
    }

    var cleanupEventResetPasswordDone = $scope.$on("resetPasswordDone", function(event, message){
        $scope.handleResetPasswordResponse(message);  
    });

    var cleanupEventResetPasswordNotDone = $scope.$on("resetPasswordNotDone", function(event, message){
        $scope.resetPasswordForm.$setPristine();
        $scope.clearformData();
        $scope.hideSpinner();
        $rootScope.ProdoAppMessage("It looks as though we have broken something on our server system. Our support team is notified and will take immediate action to fix it." + message, 'error');
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
 