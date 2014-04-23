angular.module('prodo.ProdoWallApp')
	.controller('ProdoHomeController', ['$rootScope', '$scope', '$state', '$log', 'UserSessionService', '$stateParams', 'growl', 'allOrgData', 'latestSignupData', 'checkIfSessionExist', function($rootScope, $scope, $state, $log, UserSessionService, $stateParams, growl, allOrgData, latestSignupData, checkIfSessionExist) {
		
    $log.debug('initialising home controller..');
    console.log(allOrgData);
    console.log(latestSignupData);
    $scope.allorganalytics = [];
    $scope.latestsignups = [];

    $scope.$state = $state;

    $scope.$watch('$state.$current.locals.globals.checkIfSessionExist', function (checkIfSessionExist) {
      if (checkIfSessionExist.error) {
        $rootScope.showModal();
      } 
    });

    if (allOrgData.success) {
      $scope.allorganalytics = allOrgData.success.organalytics;
    };

    if (latestSignupData.success) {
      $scope.latestsignups = latestSignupData.success.OrgNames;
    };

    $scope.transitionToOrgWall = function(orgid){
      $rootScope.orgid = orgid;
      $state.transitionTo('prodo.productwall.wall-org');
    }

    $scope.transitionToCampaignWall = function(orgid){
      $rootScope.orgid = orgid;
      $state.transitionTo('prodo.productwall.wall-campaign');
    }

	}]);
