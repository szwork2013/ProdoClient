/**
*Registration Controller
**/
angular.module('prodo.UserApp')
  .controller('UserRegistrationController', ['$scope', '$state', '$http', '$timeout', '$sce', 'UserSessionService', 'UserSignupService', 'vcRecaptchaService', 'UserRecaptchaService', function($scope, $state, $http, $timeout, $sce, UserSessionService, UserSignupService, vcRecaptchaService, UserRecaptchaService) {
    $scope.submitted = false;
    $scope.user = { terms : true };
     

    $scope.user = 
      {
        'fullname' : '',
        'email' :  '',
        'password' :  '',
        'terms' : true,
      };

    // function to clear form data on submit
    $scope.clearformData = function() {
      $scope.user.fullname = '';
      $scope.user.email = '';
      $scope.user.password = '';
    }
  
    $timeout(function(){
       $scope.hideAlert();
      }, 50000);

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
        $scope.showSpinner();
        var jsondata=$scope.jsonUserData();
        console.log('User Data entered successfully');
        UserRecaptchaService.validate($scope);
        $scope.$on("recaptchaNotDone", function(event, message){
          $scope.hideSpinner();
          $scope.showAlert('alert-danger', 'Recaptcha failed, please try again');
        });
        $scope.$on("recaptchaFailure", function(event, message){
          $scope.hideSpinner();
          $scope.showAlert('alert-danger', "Server is not responding. Error:" + message);
        });
        $scope.$on("recaptchaDone", function(event, message){
          UserSignupService.saveUser(jsondata,    // calling function of UserSignupService to make POST method call to signup user.
          function(success){
            $scope.hideSpinner();
            console.log(success);
            $scope.handleSignupResponse(success);      // calling function to handle success and error responses from server side on POST method success.
          },
          function(error){
            $scope.hideSpinner();
            console.log(error);
            $scope.showAlert('alert-danger', "Server Error:" + message);

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
            console.log(data.error.message);
            $scope.showAlert('alert-danger', data.error.message);
        }
      }
    };  

    // function for resetpassword to Prodonus App using REST APIs and performs form validation.
    $scope.regeneratetoken = function() {
      $scope.showSpinner();
      UserSessionService.regenerateTokenUser($scope.jsonRegenerateTokenData());
      $scope.$on("regenerateTokenDone", function(event, message){
        $scope.clearformData();
        $scope.hideSpinner();
        $scope.handleRegenerateTokenResponse(message);   
      });
      $scope.$on("regenerateTokenNotDone", function(event, message){
      $scope.clearformData();
      $scope.hideSpinner();  
      });
  
    }
  }]);
 