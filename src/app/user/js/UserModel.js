/**
*Update the user model using the User service
**/

angular.module('prodo.UserApp')
.factory('userModel', function(){
  return {
          user:{
          fullname:"",
          email:"", 
          password:"",
        }
    }
});

	// .factory('userModel', ['userService', function(userService) {
	//   return new UserModel(userService);
	// }]);