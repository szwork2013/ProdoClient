/**
*Registration Controller
**/
angular.module('prodo.UserApp')
  .controller('UserRegistrationController', ['$scope', '$state', '$http', '$timeout', '$sce', '$log', 'UserSessionService', 'UserSignupService', 'vcRecaptchaService', 'UserRecaptchaService', function($scope, $state, $http, $timeout, $sce, $log, UserSessionService, UserSignupService, vcRecaptchaService, UserRecaptchaService) {
    $scope.submitted = false;     

    $scope.user = 
      {
        'username' : '',
        'email' :  '',
        'password' :  '',
        'terms' : true,
        'type': 'business'
      };

    // function to clear form data on submit
    $scope.clearformData = function() {
      $scope.user.username = '';
      $scope.user.email = '';
      $scope.user.password = '';
    }
  
    $timeout(function(){
       $scope.hideAlert();
      }, 50000);

    $('#recaptcha_reload_button').on('click', function() {
      var placeholder = $(this).find(':selected').data('placeholder');
      $('#recaptcha_response_field').attr('placeholder', "Enter what you see");
    });
    $('#recaptcha_audio_button').on('click', function() {
      var placeholder = $(this).find(':selected').data('placeholder');
      $('#recaptcha_response_field').attr('placeholder', "Enter what you hear");
    });


     // function to send and stringify user registration data to Rest APIs
    $scope.jsonUserData = function(){
      var userData = 
      {
        user:
          {
            'username' : $scope.user.username,
            'email' : $scope.user.email,
            'password' : $scope.user.password,
            'terms' : $scope.user.terms,
            'prodousertype' : $scope.user.type
          }  
      };
      return JSON.stringify(userData); 
    } 

    // function to handle server side responses
    $scope.handleSignupResponse = function(data){
      if (data.success) {
        $state.transitionTo('prodo.user-content.emailverification');

      } else {
        if (data.error.code== 'AU001') {     // user already exist
            $log.debug(data.error.code + " " + data.error.message);
            $scope.showAlert('alert-danger', data.error.message);
        } else if (data.error.code=='AV001') {  // user data invalid
            $log.debug(data.error.code + " " + data.error.message);
            $scope.showAlert('alert-danger', data.error.message);
        } else if (data.error.code=='AT001') {   // user has not verified
            $log.debug(data.error.code + " " + data.error.message);
            $state.transitionTo('user-content.resetGenerateToken');
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
      } else {
        $scope.signupForm.submitted = true;
      }
    }

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
      UserSessionService.signupUser($scope.jsonUserData());    // calling function of UserSignupService to make POST method call to signup user.
        cleanupEventRecaptchaDone(); 
    });

    var cleanupEventSignupDone = $scope.$on("signupDone", function(event, message){
      $scope.hideSpinner();
      $log.debug(message);
      $scope.handleSignupResponse(message);
      cleanupEventSignupDone();
    });

    var cleanupEventSignupNotDone = $scope.$on("signupNotDone", function(event, message){
      $scope.hideSpinner();
      $log.debug(message);
      $scope.showAlert('alert-danger', "Server Error:" + message.status);
      cleanupEventSignupNotDone();
    });



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
 