/**
*Registration Controller
**/
angular.module('prodo.UserApp')
  .controller('UserRegistrationController', ['$scope', '$state', '$http', '$timeout', '$sce', 'UserSignupService', 'vcRecaptchaService', 'UserRecaptchaService', 'UserRegenerateTokenService', function($scope, $state, $http, $timeout, $sce, UserSignupService, vcRecaptchaService, UserRecaptchaService, UserRegenerateTokenService ) {
    $scope.submitted = false;
    $scope.user = { terms : true };
     

    var user = 
      {
        'fullname' : '',
        'email' :  '',
        'password' :  '',
        'terms' : '',
      };

    $scope.mainAlert = {
       isShown: false
      };

    $scope.showAlert = function (alertType, message, linkpage, linkmessage ) {
       $scope.mainAlert.message = message;
       $scope.mainAlert.isShown = true;
       $scope.mainAlert.linkpage = linkpage;
       $scope.mainAlert.linkmessage = linkmessage;
       $scope.mainAlert.alertType = alertType;
      
      // return $scope.mainAlert.message;
    }   

     $scope.closeAlert = function() {        
       $scope.mainAlert.isShown = false;
    };

    $scope.showmessage = function(alertclass, msg,  alertlink, linkmsg ) {
        var alerttype=alertclass;
        var alertmessage=msg; 
        var link = alertlink; 
        var linkmessage= linkmsg;      
        $scope.showAlert(alerttype, alertmessage, link, linkmessage);
        return true;
    };
    
    $scope.hideAlert = function() {
       $scope.mainAlert.isShown = false;
    }  

    $timeout(function(){
       $scope.hideAlert();
      }, 50000);
 

    // function to clear form data on submit
    $scope.clearformData = function() {
      $scope.user.fullname = '';
      $scope.user.email = '';
      $scope.user.password = '';
    }
  
     // function to send and stringify user registration data to Rest APIs
    $scope.jsonUserData = function(){
      var userData = 
      {
        user:
          {
            'fullname' : $scope.user.fullname,
            'email' : $scope.user.email,
            'password' : $scope.user.password,
            'terms' : $scope.user.terms 
          }  
      };
      return JSON.stringify(userData); 
    } 

    // function to handle server side responses
    $scope.handleSignupResponse = function(data){
      if (data.success) {
        $state.transitionTo('messageContent.emailverification');
        $scope.clearformData();    // on successfull signup transition occurs to verification page 
      } else {
        if (data.error.code== 'AU001') {     // user already exist
            console.log(data.error.code + " " + data.error.message);
            $scope.showAlert('alert-danger', data.error.message);
            $state.transitionTo('home.start'); 
        } else if (data.error.code=='AV001') {  // user data invalid
            console.log(data.error.code + " " + data.error.message);
            $scope.showAlert('alert-danger', data.error.message);
            $state.transitionTo('home.start');
        } else if (data.error.code=='AT001') {   // user has not verified
            console.log(data.error.code + " " + data.error.message);
            $state.transitionTo('messageContent.resetGenerateToken');
        } else {
            console.log(data.error.message);
            $scope.showAlert('alert-danger', 'Prodonus Database Server error. Please wait for some time.');
        }
      }
    };
  
    $scope.signup = function(){
      if ($scope.signupForm.$valid) {
        // $scope.showAlert('alert-success', 'message');
        var jsondata=$scope.jsonUserData();
        console.log('User Data entered successfully');
        UserRecaptchaService.validate($scope);
        $scope.$on("recaptchaNotDone", function(event, message){
          $scope.showAlert('alert-danger', 'Recaptcha failed, please try again');
        });
        $scope.$on("recaptchaDone", function(event, message){
          UserSignupService.saveUser(jsondata,    // calling function of UserSignupService to make POST method call to signup user.
          function(success){
            console.log(success);
            $scope.handleSignupResponse(success);      // calling function to handle success and error responses from server side on POST method success.
          },
          function(error){
            console.log(error);
        });  
  });
              } else {
        $scope.signupForm.submitted = true;
      }
    }

    // function to send and stringify user email to Rest APIs for token regenerate
    $scope.jsonRegenerateTokenData = function()
      {
        var userData = 
          {
            'email' : $scope.user.email
          };
        return JSON.stringify(userData); 
      }
     

    // function to handle server side responses
    $scope.handleRegenerateTokenResponse = function(data){
      if (data.success) {
        $state.transitionTo('messageContent.emailverification');
        $scope.clearformData();    
      } else {
        if (data.error.code== 'AU004') {     // enter valid data
            console.log(data.error.code + " " + data.error.message);
            $scope.showAlert('alert-danger', data.error.message);
        } else {
            // console.log(data.error.message);
            $scope.showAlert('alert-danger', data.error.message);
        }
      }
    };  

    // function for resetpassword to Prodonus App using REST APIs and performs form validation.
    $scope.regeneratetoken = function() {
          UserRegenerateTokenService.regenerateToken($scope.jsonRegenerateTokenData(),     // calling function of UserSigninService to make POST method call to signin user.
            function(success){
              console.log(success);
              $scope.handleRegenerateTokenResponse(success);       // calling function to handle success and error responses from server side on POST method success.
            },
            function(error){
              console.log(error);
            });
        
    }
  }]);
 