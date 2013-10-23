/**
*	User Signin Controller
**/
angular.module('prodo.UserApp')
	.controller('UserSigninController', ['$scope', function($scope, userModel) {
		$scope.user = userModel;
	}]);