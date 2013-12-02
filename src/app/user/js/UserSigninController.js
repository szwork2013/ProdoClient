/**
*	User Signin Controller
**/
angular.module('prodo.UserApp')
	.controller('UserSigninController', ['$scope', '$state', '$timeout', '$stateParams', 'UserSigninService', 'UserForgotPasswordService', 'UserResetPasswordService', function($scope, $state, $timeout, $stateParams, UserSigninService, UserForgotPasswordService, UserResetPasswordService) {
		
    $scope.submitted = false;  // form submit property is false
    var user = 
      {
        'email' :  '',
        'password' :  ''

      };

      $scope.mainAlert = {
       isShown: false
      };

      // to check data emitted..
      $scope.$on('OTPReset', function(event, data) {
        console.log(data);
      })
    

      
    $scope.showAlert = function (alertType, message) {
       $scope.mainAlert.message = message;
       $scope.mainAlert.isShown = true;
       $scope.mainAlert.alertType = alertType;
      
      // return $scope.mainAlert.message;
    }   

     $scope.closeAlert = function() {        
       $scope.mainAlert.isShown = false;
    };

    $scope.showmessage = function(alertclass, msg) {
        var alerttype=alertclass;
        var alertmessage=msg;         
       $scope.showAlert(alerttype, alertmessage);
       return true;
    };
    
    $scope.hideAlert = function() {
       $scope.mainAlert.isShown = false;
    }  

    $timeout(function(){
       $scope.hideAlert();
      }, 50000);
 

    // function to clear form data on submit
    $scope.clearformData = function() 
      {
        $scope.user.email = '';
        $scope.user.password = '';
      }

    // function to send and stringify user signin data to Rest APIs
    $scope.jsonUserSigninData = function()
      {
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
        $state.transitionTo('prodo.wall');
      } else {
        if (data.error.code== 'AU005') {     // user does not exist
            console.log(data.error.code + " " + data.error.message);
            $scope.showAlert('alert-danger', 'You are not a registered user, please signup first');
             
        } else if (data.error.code=='AU002') {  // user password invalid
            console.log(data.error.code + " " + data.error.message);
            $scope.showAlert('alert-danger', data.error.message);

        } else if (data.error.code=='AV001') {  // enter valid data
            console.log(data.error.code + " " + data.error.message);
            $scope.showAlert('alert-danger', data.error.message);
        } else if (data.error.code=='AU006') {  // user signedin using OTP
            console.log(data.error.code + " " + data.error.message);
            $scope.$emit("OTPReset", data.error.user.userid);
            $state.transitionTo('messageContent.resetPassword');
        } else if (data.error.code=='AU003') {   // user has not verified
            console.log(data.error.code + " " + data.error.message);
            $state.transitionTo('messageContent.emailverification');
        } else if (data.error.code=='AS001') {   // user has not subscribed to any plan
            console.log(data.error.code + " " + data.error.message);
            $state.transitionTo('subscription.plans');
        } else if (data.error.code=='AS002') { // user subscription expired
            console.log(data.error.code + " " + data.error.message);
            $state.transitionTo('subscription.plansexpired');
        } else if (data.error.code== 'AP001') {    // user has not done any payment
            console.log(data.error.code + " " + data.error.message);
            $state.transitionTo('subscription.payment');
        } else {
            console.log(data.error.message);
        }
      }
    };  

    // function to signin to Prodonus App using REST APIs and performs form validation.
    $scope.signin = function() {
          UserSigninService.signinUser($scope.jsonUserSigninData(),     // calling function of UserSigninService to make POST method call to signin user.
          function(success){
            console.log(success);
            $scope.handleSigninResponse(success);       // calling function to handle success and error responses from server side on POST method success.
          },
          function(error){
            console.log(error);
          });
          $scope.clearformData();       // calling function to clear form data once user has signin 
       
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
        $scope.showAlert('alert-info', 'Your temporary password has been sent. Please check your email, and signin again.');
        // $state.transitionTo('messageContent.signin');
      } else {
        if (data.error.code== 'AV001') {     // enter valid data
            console.log(data.error.code + " " + data.error.message);
            $scope.showAlert('alert-danger', data.error.message);
        } else if (data.error.code=='AV004') {  // enter prodonus registered emailid
            console.log(data.error.code + " " + data.error.message);
            $scope.showAlert('alert-danger', data.error.message);
        } else if (data.error.code== 'AT001') {    // user has not done any payment
            console.log(data.error.code + " " + data.error.message);
            $scope.showAlert('alert-danger', data.error.message);
        } else {
            console.log(data.error.message);
            $scope.showAlert('alert-danger', data.error.message);
        }
      }
    };  

    // function for forgotpassword to Prodonus App using REST APIs and performs form validation.
    $scope.forgotpassword = function() {
          UserForgotPasswordService.forgotPassword($scope.jsonForgotPasswordData(),     // calling function of UserSigninService to make POST method call to signin user.
          function(success){
            console.log(success);
            $scope.handleForgotPasswordResponse(success);       // calling function to handle success and error responses from server side on POST method success.
          },
          function(error){
            console.log(error);
          });
          $scope.clearformData();       // calling function to clear form data once user has signin 
       
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
        // $scope.showAlert('alert-info', 'Your temporary password has been sent. Please check your email, and signin again.');
        $state.transitionTo('prodo.wall');
      } else {
        if (data.error.code== 'AV001') {     // enter valid data
            console.log(data.error.code + " " + data.error.message);
            $scope.showAlert('alert-danger', data.error.message);
        } else {
            console.log(data.error.message);
            $scope.showAlert('alert-danger', data.error.message);
        }
      }
    };  

    // function for resetpassword to Prodonus App using REST APIs and performs form validation.
    $scope.resetpassword = function() {
          console.log($scope.jsonResetPasswordData());    
          UserResetPasswordService.resetPassword({userid: 'ugJcpIxvcH'}, $scope.jsonResetPasswordData(),     // calling function of UserSigninService to make POST method call to signin user.
            function(success){
              console.log(success);
              $scope.handleResetPasswordResponse(success);       // calling function to handle success and error responses from server side on POST method success.
            },
            function(error){
              console.log(error);
            });
          
          
          $scope.clearformData();       // calling function to clear form data once user has signin 
       
    }
 }]);
 