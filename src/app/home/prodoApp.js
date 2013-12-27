/**
* Prodonus main application modules
*
**/
angular.module('prodo.CommonApp', []);
angular.module('prodo.UserApp', []);
angular.module('prodo.ProdoWallApp', []);
angular.module('prodo.OrgApp', []);
angular.module('prodo.ProductApp', []);
angular.module('prodo.ProdoCommentApp', []);
angular.module('prodo.WarrantyApp', []);
angular.module('prodo.DashboardApp', []);
angular.module('prodo.ContentApp', []);
angular.module('prodo.BlogApp', []);
angular.module('prodo.AdApp', []);
angular.module('prodo.AdminApp', []);

angular.module('prodo.ProdonusApp',['ui.router', 'ui.bootstrap', '$strap.directives', 'vcRecaptcha', 'ngResource', 'tags-input', 
	'prodo.UserApp', 'prodo.ProdoWallApp', 'prodo.OrgApp','prodo.ProductApp', 'prodo.ProdoCommentApp',
	'prodo.WarrantyApp', 'prodo.DashboardApp','prodo.ContentApp', 'prodo.CommonApp',
  'prodo.BlogApp', 'prodo.AdApp', 'prodo.AdminApp' ,'ngAnimate'
  ])
	
	.run(['$rootScope', 'UserSessionService', function ($rootScope, UserSessionService) {
    $rootScope.usersession = UserSessionService;
    UserSessionService.checkUser();

	}])

	.controller('ProdoMainController', ['$scope', '$rootScope', '$state', 'UserSessionService', function($scope, $rootScope, $state, UserSessionService) {

		$state.transitionTo('home.start');

		$rootScope.$on("session-changed", function(event, message){
			console.log(message);   
			if (message.error.code == "AL001") {
				UserSessionService.authfailed();
				// $state.transitionTo('home.start');
			} 
			else  {
				UserSessionService.authSuccess(message);
				// $state.transitionTo($state.current.url);
			};
       
      });

		 
	}]);
