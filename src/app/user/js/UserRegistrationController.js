/**
*Registration Controller
**/
angular.module('prodo.UserApp')
  .controller('UserRegistrationController', ['$scope', '$state', '$http', '$timeout', '$sce', '$log', 'UserSessionService', 'UserSignupService', 'vcRecaptchaService', 'UserRecaptchaService', function($scope, $state, $http, $timeout, $sce, $log, UserSessionService, UserSignupService, vcRecaptchaService, UserRecaptchaService) {
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
            $log.debug(data.error.code + " " + data.error.message);
            $scope.showAlert('alert-danger', data.error.message);
            $state.transitionTo('home.start'); 
        } else if (data.error.code=='AV001') {  // user data invalid
            $log.debug(data.error.code + " " + data.error.message);
            $scope.showAlert('alert-danger', data.error.message);
            $state.transitionTo('home.start');
        } else if (data.error.code=='AT001') {   // user has not verified
            $log.debug(data.error.code + " " + data.error.message);
            $state.transitionTo('messageContent.resetGenerateToken');
        } else {
            $log.debug(data.error.message);
            $scope.showAlert('alert-danger', 'Prodonus Database Server error. Please wait for some time.');
        }
      }
    };
  
    $scope.signup = function(){
      if ($scope.signupForm.$valid) {
        $scope.showSpinner();
        var jsondata=$scope.jsonUserData();
        $log.debug('User Data entered successfully');
        UserRecaptchaService.validate($scope);
        var cleanupEventRecaptchaNotDone = $scope.$on("recaptchaNotDone", function(event, message){
          $scope.hideSpinner();
          $scope.showAlert('alert-danger', 'Recaptcha failed, please try again');
          cleanupEventRecaptchaNotDone();
        });
        var cleanupEventRecaptchaFailure = $scope.$on("recaptchaFailure", function(event, message){
          $scope.hideSpinner();
          $scope.showAlert('alert-danger', "Server is not responding. Error:" + message);
          cleanupEventRecaptchaFailure();
        });
        var cleanupEventRecaptchaDone = $scope.$on("recaptchaDone", function(event, message){
          UserSignupService.saveUser(jsondata,    // calling function of UserSignupService to make POST method call to signup user.
          function(success){
            $scope.hideSpinner();
            $log.debug(success);
            $scope.handleSignupResponse(success); 
            cleanupEventRecaptchaDone();     // calling function to handle success and error responses from server side on POST method success.
          },
          function(error){
            $scope.hideSpinner();
            $log.debug(error);
            $scope.showAlert('alert-danger', "Server Error:" + error.status);
            cleanupEventRecaptchaDone();
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
            $log.debug(data.error.code + " " + data.error.message);
            $scope.showAlert('alert-danger', data.error.message);
        } else {
            $log.debug(data.error.message);
            $scope.showAlert('alert-danger', data.error.message);
        }
      }
    };  

    // function for resetpassword to Prodonus App using REST APIs and performs form validation.
    $scope.regeneratetoken = function() {
      $scope.showSpinner();

      UserSessionService.regenerateTokenUser($scope.jsonRegenerateTokenData());

      var cleanupEventRegenerateTokenDone = $scope.$on("regenerateTokenDone", function(event, message){
        $scope.clearformData();
        $scope.hideSpinner();
        $scope.handleRegenerateTokenResponse(message);
        cleanupEventRegenerateTokenDone();   
      });

      var cleanupEventRegenerateTokenNotDone = $scope.$on("regenerateTokenNotDone", function(event, message){
        $scope.clearformData();
        $scope.hideSpinner(); 
        cleanupEventRegenerateTokenNotDone(); 
      });
    }

  }]);
 