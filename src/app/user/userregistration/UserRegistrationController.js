/**
*Registration Controller
**/
 angular.module('prodo.UserApp')
.factory('signupService', ['$http', '$state', 'userModel', function( $http, $state, userModel, $scope) {
        var signupService= {};

        signupService.verifyUser = function(data){
            if (data.success) {
                  $state.transitionTo('emailverification');
                } 
                else

                {
                $state.transitionTo('emailrejection');
              }
          };
         
        signupService.postdata = function($scope) {
        var method = 'POST';
        var inserturl = 'http://localhost/api/signup'; // URL where the Node.js server is running
        // $scope.user=userModel;
        // console.log(userModel);
        var userFormData = {'fullname' : $scope.user.fullname,
                        'email' : $scope.user.email,
                        'password' : $scope.user.password
                         
                      };
        
        // var userFormData = userModel;
     

     //    $scope.fullname = '';
     // $scope.email = '';
     // $scope.password = '';
     
      var userRegistrationData = JSON.stringify(userFormData); 
      

      $http({ // Accessing the Angular $http Service to send data via REST Communication to Node Server.
             method: method,
             url: inserturl,
             data:  userRegistrationData ,
             headers: {'Content-Type': 'application/json'},
       
         }).
         success(function(data) {
                console.log("success"); 
                console.log("This is my data: " + data);
                console.log(data);
                 signupService.verifyUser(data);// Getting Success Response in Callback
                
          }).
        error(function(data) {
        console.log("error");  //Getting Error Response in Callback

         });
          
          // customService.list($scope);// Calling the list function in Angular Controller to show all current data in HTML
         return false;
   };   
          


        return signupService;
  }])
  	.controller('UserRegistrationController', ['$scope', '$state', 'signupService', function($scope, $state, signupService, userModel) {
		    $scope.user = userModel;
        $scope.message = [{
          "type": "info",
          "content": "Please check your email for verification link and activate your account with Prodonus."
    },{
        "type": "danger",
        "content": "User already exists. Please signup with a different user account."
    }];
             $scope.submitted = false;
        $scope.signup = function(){
          if ($scope.signupForm.$valid) {
                console.log('User Data entered successfully');
                signupService.postdata($scope);
              } else {
                $scope.signupForm.submitted = true;
                Console.log('Please fill the required fields');
              }
             
       }
 }]);

	