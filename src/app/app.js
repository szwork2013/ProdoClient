angular.module('MyApp', ['ngResource'])

.controller('MyHTTPController', ['$scope', '$http', function($scope, $http) {
	$http.get('/api/emailtemplate').success(function(data){
		$scope.emailtemplates = data;
	}). error(function(error){
		console.log("ERROR-" + error);
	});
}])
.factory('eMailTemplateModel', function($resource) {
	return $resource("/api/emailtemplate");
})
.controller('MyResourceController', ['$scope', 'eMailTemplateModel', function($scope, eMailTemplateModel) {
	eMailTemplateModel.query(function(data) {
		$scope.emailtemplates = data;
	});
}])

.factory("User", function($resource) {
	return $resource("/api/user/:userid");
})
.controller('MyUserResourceController', ['$scope', 'User', function($scope, User) {

	$scope.user = User.get({userid: 'u34'}, function(success){console.log(success)}, function(error){});
}])
.factory("UserModel", function($resource) {
 	return $resource("/api/user/signup");
 })
  // var messages = $resource(
  //     "./api.cfm/messages/:listController:id/:docController",
  //     {
  //         id: "@id",
  //         listController: "@listController",
  //         docController: "@docController"
  //     },
  //     {
  //         clear: {
  //             method: "POST",
  //             params: {
  //                 listController: "clear-all"
  //             }
  //         },
  //         archive: {
  //             method: "POST",
  //             params: {
  //                 docController: "archive"
  //             }
  //         }
  //     }
  // );
.factory('Users', function($resource) {
	var user = $resource(
			'/api/user', 
			{
				//params
			}, 
			{
				// action that falls outside normal CRUD operations
			}
		);

	user.findAllUsers = function() {
	    return user.query();
	};

	user.findByUserId = function(id) {
	    return user.get({
	        userId : id
	    });
	};

	user.saveUser = function(user) {
	    return user.$save();
	}

	user.deleteUser = function(id) {
		return user.delete({
	        userId : id
	    });
	}

	return user;
})

// .controller('UserController', function($scope, $routeParams, $location, User, FlashMessage) {
// 	$scope.users = User.findAllUsers();
// 	$scope.user = User.findByUserId($routeParams.userId);

// 	// save edited course and print flash message
// 	$scope.saveUser = function() {
//     var savedUser = User.saveUser($scope.user);
// 	}
// })

.controller('MyPostController', ['$scope', 'SignupModel', function($scope, SignupModel) {
	$scope.signupUser = function() {
		var userdata = {
				fullname: "Ramesh Kunhiraman",
				email: "ramee@prodonus.com",
				password: "rk123"
			}
		SignupModel.save(userdata);	
	};
}])

.directive('panel', function() {
	return {
		restrict: 'A',
		scope: {
			user: "="
		},
		controller: function($scope) {
			$scope.directivename = 'DD';
			//$scope.user = { name:'Johnny'};
			alert("I am a super Panel "+ $scope.user.name);
		},
		link: function(scope, element, attrs) {
			alert("I am a super Panel "+ scope.user.name);
		}
	}
})

.directive('enter', function() {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			element.addClass('button');
			element.bind('mouseenter', function() {
				console.log('Add');
				element.addClass(attrs.enter);
			});
		}
	}
})

.directive('leave', function() {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
				element.bind('mouseleave', function() {
					console.log('remove');
				element.removeClass(attrs.enter);
			})
		}
	}
}); 