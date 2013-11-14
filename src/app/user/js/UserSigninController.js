/**
*	User Signin Controller
**/
angular.module('prodo.UserApp')
.factory('signinService', [ '$http', '$state', 'userModel', function($http, $state, userModel, $scope) {
  var signinService= {};
         
  signinService.postUserData = function($scope) {
	  var method = 'POST';
	  var inserturl = 'http://localhost/api/signin'; // URL where the Node.js server is running
	   
	    var userFormData = { 
                        'email' : $scope.user.email,
                        'password' : $scope.user.password
                         
                      };
 

		// $scope.fullname = '';
		// $scope.email = '';
		// $scope.password = '';

		var userData = JSON.stringify(userFormData); 


		$http({ // Accessing the Angular $http Service to send data via REST Communication to Node Server.
     method: method,
     url: inserturl,
     data:  userData ,
     headers: {'Content-Type': 'application/json'},
	 
	   })
	   .success(function(data) {
        console.log("success"); 
        console.log("This is my data: " + data);
        console.log(data);
        signinService.verifyUser(data);    
	    })
	  .error(function(data) {
	  	console.log("error");  //Getting Error Response in Callback
	   });
	
	return false;
};   
          
	signinService.verifyUser = function(data){
		if (data.success) {
		  $state.transitionTo('prodo.wall');
		} else {
			if (data.error.code= 'AU001') {
					console.log("User does not exist");
					$state.transitionTo('home.start');
			} else if (data.error.code='AU002') {
					console.log("User password invalid");
					$state.transitionTo('signin');
			} else if (data.error.code='AU003') {
					console.log("User not verified");
					$state.transitionTo('emailverification');
			} else if (data.error.code='AS001') {
					console.log("User not subscribed");
					$state.transitionTo('subscription.plans');
			} else if (data.error.code='AS002') {
					console.log("User subscription expired");
					$state.transitionTo('subscription.plans');
			}	else if (data.error.code='AP001') {
					console.log("User payment pending");
					$state.transitionTo('subscription.payments');
			}	else {
					console.log(data.error.message);
					$state.transitionTo('signin');

			}
		}
	};


	return signinService;
	}])
	.controller('UserSigninController', ['$scope', function($scope, userModel) {
		$scope.user = userModel;
		$scope.signin = function(){
          if ($scope.signinForm.$valid) {
                console.log('User Data entered successfully');
                signinService.postUserData($scope);
                
              } else {
                $scope.signinForm.submitted = true;
                Console.log('Please fill the required fields');
              }
             
       }
	}]);