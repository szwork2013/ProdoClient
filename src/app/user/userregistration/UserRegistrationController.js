/**
*Registration Controller
**/
angular.module('prodo.UserApp')
	.controller('UserRegistrationController', ['$scope', 'userModel', function($scope, userModel) {
		$scope.user = userModel;
	}]);