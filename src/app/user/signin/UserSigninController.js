/**
*	User Signin Controller
**/
angular.module('prodo.UserApp')
	.controller('UserSigninController', ['$scope', 'userModel', function($scope, userModel) {
		$scope.user = userModel;
	}]);