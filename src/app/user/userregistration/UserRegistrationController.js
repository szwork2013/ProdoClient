/**
*Registration Controller
**/
angular.module('prodo.UserApp')

	.controller('UserRegistrationController', ['$scope', '$state', function($scope, $state, userModel) {
		$scope.user = userModel;
		$scope.message =[ {
      "type": "info",
      "title": "Help!",
      "content": "Field is required"
    }, {"type": "info",
      "title": "Success!",
      "content": "alert directive is working pretty hot with 3 sec timeout1"},
      {"type": "warning",
      "title": "Success!",
      "content": "alert directive is working pretty hot with 3 sec timeout11"},
      {"type": "warning",
      "title": "Success!",
      "content": "alert directive is working pretty hot with 3 sec timeout111"},
      {"type": "warning",
      "title": "Success!",
      "content": "alert directive is working pretty hot with 3 sec timeout11111"}];

      $scope.submitted = false;
  $scope.signup= function() {
    if ($scope.signupForm.$valid) {
      alert('success');
      $state.transitionTo('subscription.plans');
    } else {
      $scope.signupForm.submitted = true;
      alert('Please fill the required fields');
    }
  }
 }]);

	