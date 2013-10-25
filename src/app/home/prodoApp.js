/**
* Prodonus main application modules
*
**/
angular.module('prodo.CommonApp', []);
angular.module('prodo.UserApp', []);
angular.module('prodo.ProdoWallApp', []);
angular.module('prodo.OrgApp', []);
angular.module('prodo.ProductApp', []);
angular.module('prodo.WarrantyApp', []);
angular.module('prodo.DashboardApp', []);

angular.module('prodo.BlogApp', []);
angular.module('prodo.AdApp', []);

angular.module('prodo.ProdonusApp',['ui.router', 'ui.bootstrap', 'prodo.UserApp', 'prodo.ProdoWallApp', 'prodo.OrgApp',
  'prodo.ProductApp', 'prodo.WarrantyApp', 'prodo.DashboardApp','prodo.CommonApp', '$strap.directives',
  'prodo.BlogApp', 'prodo.AdApp'
  ])
	.controller('ProdoMainController', ['$scope', '$state', function($scope, $state) {

		$state.transitionTo('home.start');
// $state.transitionTo('home.prodo');
		// somewhere else
		$scope.$on('$stateNotFound', 
		function(event, unfoundState, fromState, fromParams){ 
		    console.log(unfoundState.to); // "lazy.state"
		    console.log(unfoundState.toParams); // {a:1, b:2}
		    console.log(unfoundState.options); // {inherit:false} + default options
		});

		$scope.$on('$stateChangeSuccess', 
		function(event, toState, toParams, fromState, fromParams){ 
		});

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
