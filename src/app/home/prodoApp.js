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
angular.module('prodo.SubscriptionApp', []);
 angular.module('upload', []);

angular.module('prodo.ProdonusApp',['ui.router', 'ui.bootstrap', 'xeditable', '$strap.directives', 'vcRecaptcha', 'ngResource', 'tags-input',  'prodo.CommonApp',
	'prodo.UserApp', 'prodo.ProdoWallApp', 'prodo.OrgApp','prodo.ProductApp', 'prodo.ProdoCommentApp',
	'prodo.WarrantyApp', 'prodo.DashboardApp','prodo.ContentApp',
  'prodo.BlogApp', 'prodo.AdApp', 'prodo.AdminApp' ,  'prodo.SubscriptionApp', 'ngAnimate','upload' 
  ])

	.config(function($logProvider)	{ 
  	$logProvider.debugEnabled(true);
	})

	.run(['$rootScope', 'UserSessionService', 'OrgRegistrationService', '$log', function ($rootScope, UserSessionService, OrgRegistrationService, $log, editableOptions) {
    UserSessionService.checkUser();
    $rootScope.usersession = UserSessionService;
    $rootScope.organizationData = OrgRegistrationService;
    $rootScope.$log = $log;
    editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
	 
	}])

	.controller('ProdoMainController', ['$scope', '$rootScope', '$state', '$log', 'UserSessionService', function($scope, $rootScope, $state, $log, UserSessionService) {

		$state.transitionTo('home.start');

		var cleanupEventSession_Changed = $scope.$on("session-changed", function(event, message){
			$log.debug(message);   
				if (message.success) {
					UserSessionService.authSuccess(message.success.user)
					cleanupEventSession_Changed();
					// $state.transitionTo($state.current.url);
				} 
				else {
				UserSessionService.authfailed();
				// $state.transitionTo('home.start');
				cleanupEventSession_Changed();
				
			};
       
      });

		var cleanupEventSession_Changed_Failure = $scope.$on("session-changed-failure", function(event, message){
			 UserSessionService.authfailed();
       $state.transitionTo('home.start');
			 $scope.showAlert('alert-danger', "Server Error: " + message);
       cleanupEventSession_Changed_Failure();
      });


		$scope.logout = function() {
			// $scope.showSpinner();
			UserSessionService.logoutUser();
			var cleanupEventLogoutDone = $scope.$on("logoutDone", function(event, message){
				// $scope.hideSpinner();
        $state.transitionTo('home.start');
        $scope.showAlert('alert-success', message);
        cleanupEventLogoutDone();

      });
      var cleanupEventLogoutNotDone = $scope.$on("logoutNotDone", function(event, message){
      	// $scope.hideSpinner();
        $scope.showAlert('alert-danger', "Server Error:" + message);
        cleanupEventLogoutNotDone();

      });
		};
		
	}]);
