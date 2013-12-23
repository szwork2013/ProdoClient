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
	}])

	.controller('ProdoMainController', ['$scope', '$rootScope', '$state', function($scope, $rootScope, $state) {

		$state.transitionTo('home.start');
		$scope.$on('$stateNotFound', 
			function(event, unfoundState, fromState, fromParams){ 
		    console.log(unfoundState.to); // "lazy.state"
		    console.log(unfoundState.toParams); // {a:1, b:2}
		    console.log(unfoundState.options); // {inherit:false} + default options
			});

		// $scope.$on('$stateChangeStart', 
		// function(event, toState, toParams, fromState, fromParams){ 
		// 	if (!$rootScope.usersession.isLoggedIn) {
		// 		event.preventDefault();
		// 		// $state.transitionTo('messageContent.signin')
		// 	} else {

		// 	}

			

		// });

		$scope.$on('$stateChangeError', 
		function(event, toState, toParams, fromState, fromParams, error){ 
		});

		$scope.$on('$viewContentLoading', 
		function(event, viewConfig){ 
		    // Access to all the view config properties.
		    // and one special property 'targetView'
		    // viewConfig.targetView 
		});
		
	}]);
