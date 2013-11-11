/**
*Registration Controller
**/
angular.module('prodo.UserApp')
.factory('myCustomService', [ '$http', function($http, $scope) {
        var customService= {};
         
        customService.postdata = function($scope) {
        var method = 'POST';
        var inserturl = 'http://localhost/api/signup'; // URL where the Node.js server is running
        $scope.dataDisplay = ""; 
        var formData =  {'fullname' : $scope.fullname,
                        'email' : $scope.email,
                        'password' : $scope.password
                         
                      };

     $scope.fullname = '';
     $scope.email = '';
     $scope.password = '';

      var jdata = 'mydata=' + JSON.stringify(formData); 
      console.log(jdata);

      $http({ // Accessing the Angular $http Service to send data via REST Communication to Node Server.
             method: method,
             url: inserturl,
             data:  jdata ,
             headers: {'Content-Type': 'application/x-www-form-urlencoded'},
       
         }).
         success(function(response) {
                console.log("success"); 
                console.log("This is my data: " + response);
                console.log(response.data);// Getting Success Response in Callback
                 $scope.dataDisplay = response.data;
                console.log($scope.dataDisplay);
                 // customService.list($scope);

         }).
         error(function(response) {
        console.log("error");  //Getting Error Response in Callback
        console.log($scope.dataDisplay);
         });
          
          // customService.list($scope);// Calling the list function in Angular Controller to show all current data in HTML
         return false;
   };   
        return customService;
  }])
  	.controller('UserRegistrationController', ['$scope', '$state', 'myCustomService', function($scope, $state, myCustomService, userModel) {
		    // $scope.user = userModel;
        $scope.signup = function(){
        myCustomService.postdata($scope, console.log($scope));
          // $scope.save();
       }
		 
  //     $scope.submitted = false;
  // $scope.signup= function() {
  //   if ($scope.signupForm.$valid) {
  //     alert('success');
  //     $state.transitionTo('subscription.plans');
  //   } else {
  //     $scope.signupForm.submitted = true;
  //     alert('Please fill the required fields');
  //   }
  // }
 }]);

	