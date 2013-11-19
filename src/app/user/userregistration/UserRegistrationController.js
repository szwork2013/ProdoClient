/**
*Registration Controller
**/

angular.module('prodo.UserApp')

.controller('UserRegistrationController', ['$scope', '$state', 'UserModel', function($scope, $state, UserModel) {
	
  $scope.message = [{
            "type": "success",
            "content": "Please check your email for verification link and activate your account with Prodonus."
  },        {
            "type": "danger",
            "content": "User already exists. Please signup with a different user account."
  }];
  var user = 
      {
        'fullname' : '',
        'email' :  '',
        'password' :  ''
      };
  $scope.clearformData = function(){
    $scope.user.fullname = '';
    $scope.user.email = '';
    $scope.user.password = '';
  }
  $scope.jsonUserData = function(){
      var userData = 
      {
        user:
          {
            'fullname' : $scope.user.fullname,
            'email' : $scope.user.email,
            'password' : $scope.user.password
          }  
      };
      // console.log(userData);
    return JSON.stringify(userData); 


  }   
  
  $scope.submitted = false;
  $scope.signup = function(){
    if ($scope.signupForm.$valid) {
      console.log('User Data entered successfully');
        UserModel.saveUser($scope.jsonUserData(), 
        function(success){
          console.log(success);
          $scope.handleSignupResponse(success);
    },
        function(error){
          console.log(error);
      });
      $scope.clearformData();
    } else {
      $scope.signupForm.submitted = true;
    }
  }
  $scope.handleSignupResponse = function(data){
    if (data.success) {
      $state.transitionTo('emailverification');
    } 
    else {
      $state.transitionTo('emailrejection');
    }
  }
 }]);
 