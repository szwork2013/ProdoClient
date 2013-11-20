/**
*	User Signin Controller
**/
angular.module('prodo.UserApp')
	.controller('UserSigninController', ['$scope', '$state', 'UserSigninService', function($scope, $state, UserSigninService) {
		
    $scope.submitted = false;  // form submit property is false
    var user = 
      {
        'email' :  '',
        'password' :  ''
      };

    // function to clear form data on submit
    $scope.clearformData = function() 
      {
        $scope.user.email = '';
        $scope.user.password = '';
      }

    // function to send and stringify user data to Rest APIs
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
        if (data.error.code== 'AU001') {     // user does not exist
            console.log(data.error.code + " " + data.error.message);
            $state.transitionTo('home.start');
        } else if (data.error.code=='AU002') {  // user password invalid
            console.log(data.error.code + " " + data.error.message);
            $state.transitionTo('signin');
        } else if (data.error.code=='AU003') {   // user has not verified
            console.log(data.error.code + " " + data.error.message);
            $state.transitionTo('emailverification');
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
            $state.transitionTo('signin');
        }
      }
   };  

    // function to signin to Prodonus App using REST APIs and performs form validation.
    $scope.signin = function() {
      if ($scope.signinForm.$valid) {                          
        console.log('User Data entered successfully');
          UserSigninService.signinUser($scope.jsonUserSigninData(),     // calling function of UserSigninService to make POST method call to signin user.
          function(success){
            console.log(success);
            $scope.handleSigninResponse(success);       // calling function to handle success and error responses from server side on POST method success.
          },
          function(error){
            console.log(error);
          });
          $scope.clearformData();       // calling function to clear form data once user has signin 
      } else {
        $scope.signupForm.submitted = true;
      }
    }
 }]);
 