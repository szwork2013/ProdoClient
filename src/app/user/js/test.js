/**
*Registration Controller
**/
angular.module('prodo.UserApp')
  .controller('UserRegistrationController', ['$scope', '$state', '$http', 'UserSignupService', 'vcRecaptchaService', function($scope, $state, $http, UserSignupService, vcRecaptchaService ) {
    $scope.submitted = false;
    $scope.user = { terms : true };
    $scope.message = [
    {
      "type": "success",
      "content": "Please check your email for verification link and activate your account with Prodonus."
    },        
    {
      "type": "danger",
      "content": "User already exists. Please signup with a different user account."
    } ];

    var user = 
      {
        'fullname' : '',
        'email' :  '',
        'password' :  '',
        'terms' : '',
      };

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
        $state.transitionTo('emailverification');   // on successfull signup transition occurs to verification page 
      } 
      else {
        $state.transitionTo('emailrejection');    // on error in signup transition occurs to error notification page
      }
    }
    // function to handle captcha server side responses
    $scope.handleCaptchaResponse = function(data, userD){
      if (data.success) {
        console.log(data.success)
        console.log(userD);
        UserSignupService.saveUser(userD,    // calling function of UserSignupService to make POST method call to signup user.
          function(success){
            console.log(success);
            $scope.handleSignupResponse(success);      // calling function to handle success and error responses from server side on POST method success.
          },
          function(error){
            console.log(error);
        });   // on successfull signup transition occurs to verification page 
      } 
      else {
        if (data.error.code== 'AR001') {     // Google recaptcha server down
            console.log(data.error.code + " " + data.error.message);
            $state.transitionTo('home.start');
        }
        else {
          console.log(data.error.message)
          vcRecaptchaService.reload(); 
        }
        // on error in signup transition occurs to error notification page
      }
    }  
  
    // function to signup to Prodonus App using REST APIs and performs form validation.
    var inserturl = 'http://localhost/api/recaptcha';
    var method = 'POST'; 
    $scope.signup = function(){
      var captchadata = 
        { 
          recaptcha: 
                  {
                  response:  Recaptcha.get_response(),
                  challenge: Recaptcha.get_challenge()
                  }
        };
      var jdata = JSON.stringify(captchadata);
      if ($scope.signupForm.$valid) {
        console.log('User Data entered successfully');
        console.log("this is my form data" + $scope.jsonUserData());

        $http({ 
             method: method,
             url: inserturl,
             data:  jdata ,
             headers: {'Content-Type': 'application/json'},
            }).
         success(function(data) {
                console.log("success"); 
                console.log(data);
                $scope.handleCaptchaResponse(data, $scope.jsonUserData());                       
          }).
         error(function(response) {
              console.log('Failed validation'); 
             
          });
        $scope.clearformData();     // calling function to clear form data once user has signup
      } else {
        $scope.signupForm.submitted = true;
      }
    }
  }]);
 