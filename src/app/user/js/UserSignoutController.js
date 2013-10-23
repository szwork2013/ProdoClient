/**
*	User Signout Controller
**/
angular.module('prodo.UserApp')
	.controller('UserSignoutController', ['$scope', 'userModel', function($scope, userModel) {
		$scope.user = userModel;
	}]);