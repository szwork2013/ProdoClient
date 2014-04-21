/**
*Registration Controller
**/
angular.module('prodo.UserApp')
  .controller('UserRegistrationController', ['$scope', '$state', '$http', '$timeout', '$sce', '$log', 'growl', 'UserSessionService', 'UserSignupService', 'vcRecaptchaService', 'UserRecaptchaService', function($scope, $state, $http, $timeout, $sce, $log, growl, UserSessionService, UserSignupService, vcRecaptchaService, UserRecaptchaService) {
    $scope.submitted = false;     

    $scope.user = 
      {
        'username' : '',
        'email' :  '',
        'password' :  '',
        'terms' : true,
        'type': 'business'
      };

    $scope.activateaccount = { 'email': ''};

    // function to clear form data on submit
    $scope.clearformData = function() {
      $scope.user.username = '';
      $scope.user.email = '';
      $scope.user.password = '';
    }

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
            $rootScope.ProdoAppMessage(data.error.message, 'error');
        } else if (data.error.code=='ACT001') {  // user data invalid
            $log.debug(data.error.code + " " + data.error.message);
            $state.transitionTo('prodo.user-content.reactivate');
        } else if (data.error.code=='AV001') {  // user data invalid
            $log.debug(data.error.code + " " + data.error.message);
            $rootScope.ProdoAppMessage(data.error.message, 'error');
        } else if (data.error.code=='AT001') {   // user has not verified
            $log.debug(data.error.code + " " + data.error.message);
            $state.transitionTo('user-content.resetGenerateToken');
        } else {
            $log.debug(data.error.message);
            $rootScope.ProdoAppMessage('Prodonus Database Server error. Please wait for some time.', 'error');
        }
      }
      $scope.hideSpinner();

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
      $rootScope.ProdoAppMessage('Recaptcha failed, please try again', 'error');
      
    });

    var cleanupEventRecaptchaFailure = $scope.$on("recaptchaFailure", function(event, message){
      $scope.hideSpinner();
      $rootScope.ProdoAppMessage("It looks as though we have broken something on our server system. Our support team is notified and will take immediate action to fix it." + message, 'error');   
    });

    var cleanupEventRecaptchaDone = $scope.$on("recaptchaDone", function(event, message){
      UserSessionService.signupUser($scope.jsonUserData());    // calling function of UserSignupService to make POST method call to signup user.       
    });

    var cleanupEventSignupDone = $scope.$on("signupDone", function(event, message){
      $log.debug(message);
      $scope.handleSignupResponse(message);      
    });

    var cleanupEventSignupNotDone = $scope.$on("signupNotDone", function(event, message){
      $scope.hideSpinner();
      $log.debug(message);
      $rootScope.ProdoAppMessage("It looks as though we have broken something on our server system. Our support team is notified and will take immediate action to fix it." + message, 'error');   
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
        $state.transitionTo('prodo.user-content.regeneratetoken');
        $scope.clearformData();    
      } else {
        if (data.error.code== 'AU004') {     // enter valid data
            $log.debug(data.error.code + " " + data.error.message);
            $rootScope.ProdoAppMessage(data.error.message, 'error');
        } else {
            $log.debug(data.error.message);
            $rootScope.ProdoAppMessage(data.error.message, 'error');
        }
      }
    };  

    // function for resetpassword to Prodonus App using REST APIs and performs form validation.
    $scope.regeneratetoken = function() {
      $scope.showSpinner();

      UserSessionService.regenerateTokenUser($scope.jsonRegenerateTokenData());
    }

    var cleanupEventRegenerateTokenDone = $scope.$on("regenerateTokenDone", function(event, message){
      $scope.clearformData();
      $scope.handleRegenerateTokenResponse(message);  
      $scope.hideSpinner();           
    });

    var cleanupEventRegenerateTokenNotDone = $scope.$on("regenerateTokenNotDone", function(event, message){
      $scope.clearformData();
      $scope.hideSpinner(); 
      $rootScope.ProdoAppMessage("It looks as though we have broken something on our server system. Our support team is notified and will take immediate action to fix it." + message, 'error');   

    });

    $scope.jsonActivateAccountTokenData = function()
      {
        var userData = 
          {
            'email' : $scope.activateaccount.email
          };
        return JSON.stringify(userData); 
      }
    
    // function to handle server side responses
    $scope.handleActivateAccountTokenResponse = function(data){
      if (data.success) {
        $state.transitionTo('prodo.user-content.activaterequest'); 
      } else {
        if (data.error.code== 'AU004') {     // enter valid data
            $log.debug(data.error.code + " " + data.error.message);
            $rootScope.ProdoAppMessage(data.error.message, 'error');
        } else {
            $log.debug(data.error.message);
            $rootScope.ProdoAppMessage(data.error.message, 'error');
        }
      }
    };   
    

    $scope.activate_account_request = function() {
      if ($scope.activateaccountForm.$valid) {
        UserSessionService.activateaccount($scope.jsonActivateAccountTokenData());
      } else {
        $scope.activateaccountForm.submitted = true;
      }
    }

    var cleanupEventActivateAccountTokenDone = $scope.$on("activateAccountTokenDone", function(event, message){
      $scope.clearformData();
      $scope.handleActivateAccountTokenResponse(message);  
      $scope.hideSpinner();           
    });

    var cleanupEventActivateAccountTokenNotDone = $scope.$on("activateAccountTokenNotDone", function(event, message){
      $scope.clearformData();
      $scope.hideSpinner(); 
      $rootScope.ProdoAppMessage("It looks as though we have broken something on our server system. Our support team is notified and will take immediate action to fix it." + message, 'error');   

    });


    $scope.$on('$destroy', function(event, message) {
      cleanupEventRecaptchaNotDone();
      cleanupEventRecaptchaFailure();
      cleanupEventRecaptchaDone(); 
      cleanupEventSignupDone();
      cleanupEventSignupNotDone();
      cleanupEventRegenerateTokenDone();
      cleanupEventRegenerateTokenNotDone(); 
      cleanupEventActivateAccountTokenNotDone();
      cleanupEventActivateAccountTokenDone();
    });

  }]);
 