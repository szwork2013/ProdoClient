/**
*	Org Registration Controller
**/
angular.module('prodo.OrgApp')
	.controller('OrgRegistrationController', ['$scope', 'orgModel', function($scope, orgModel) {
		$scope.user = orgModel;
	}]);

// /**
// *Update the org model using the Org service
// **/
// angular.module('prodo.OrgApp')
//   .factory('orgModel', ['orgService', function(orgService) {
//     return new OrgModel(orgService);
//   }]);