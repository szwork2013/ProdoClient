/**
*Update the user model using the User service
**/

angular.module('prodo.UserApp')
	.factory('userModel', ['userService', function(userService) {
	  return new UserModel(userService);
	}]);