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
 angular.module('upload', []);

angular.module('prodo.ProdonusApp',['ui.router', 'ui.bootstrap', '$strap.directives', 'vcRecaptcha', 'ngResource', 'tags-input', 
	'prodo.UserApp', 'prodo.ProdoWallApp', 'prodo.OrgApp','prodo.ProductApp', 'prodo.ProdoCommentApp',
	'prodo.WarrantyApp', 'prodo.DashboardApp','prodo.ContentApp', 'prodo.CommonApp',
  'prodo.BlogApp', 'prodo.AdApp', 'prodo.AdminApp' ,'ngAnimate','upload' 
  ])

	.config(function($logProvider)	{
  	$logProvider.debugEnabled(true);
	})
	
	.run(['$rootScope', 'UserSessionService', 'OrgRegistrationService', '$log', function ($rootScope, UserSessionService, OrgRegistrationService, $log) {
    UserSessionService.checkUser();
    $rootScope.usersession = UserSessionService;
    $rootScope.organizationData = OrgRegistrationService;
    $rootScope.$log = $log;
	 
	}])

	.controller('ProdoMainController', ['$scope', '$rootScope', '$state', '$log', 'UserSessionService', function($scope, $rootScope, $state, $log, UserSessionService) {

		$state.transitionTo('home.start');

		$rootScope.$on("session-changed", function(event, message){
			$log.debug(message);   
				if (message.success) {
					UserSessionService.authSuccess(message.success.user)
					// $state.transitionTo($state.current.url);
				} 
				else {
				UserSessionService.authfailed();
				$state.transitionTo('home.start');
				
			};
       
      });

		$rootScope.$on("session-changed-failure", function(event, message){
			 UserSessionService.authfailed();
       $state.transitionTo('home.start');
			 $scope.showAlert('alert-danger', "Server Error: " + message);
       
      });


		$scope.logout = function() {
			// $scope.showSpinner();
			UserSessionService.logoutUser();
			$scope.$on("logoutDone", function(event, message){
				// $scope.hideSpinner();
        $state.transitionTo('home.start');
        $scope.showAlert('alert-success', message);

      });
      $scope.$on("logoutNotDone", function(event, message){
      	// $scope.hideSpinner();
        $scope.showAlert('alert-danger', "Server Error:" + message);

      });
		};

		 
	}]);
