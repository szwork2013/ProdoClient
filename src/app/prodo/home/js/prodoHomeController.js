angular.module('prodo.ProdoWallApp')
	.controller('ProdoHomeController', ['$rootScope', '$scope', '$state', '$log', 'UserSessionService', '$stateParams', 'growl', 'allOrgData', 'checkIfSessionExist', function($rootScope, $scope, $state, $log, UserSessionService, $stateParams, growl, allOrgData, checkIfSessionExist) {
		
    $log.debug('initialising home controller..');
    console.log(allOrgData);
    $scope.allorganalytics = [];
    $scope.latestsignups = [];
    $scope.orgsponsers = [];

    $scope.$state = $state;

    $scope.$watch('$state.$current.locals.globals.checkIfSessionExist', function (checkIfSessionExist) {
      if (checkIfSessionExist.error) {
        $rootScope.showModal();
      } 
    });

    if (allOrgData.success) {
      if (allOrgData.success.organalyticsall.length !== 0) {
        $scope.allorganalytics = allOrgData.success.organalyticsall;
      }

      if (allOrgData.success.organalyticslatest.length !== 0) {
        $scope.latestsignups = allOrgData.success.organalyticslatest;
      }

      if (allOrgData.success.organalyticssponser.length !== 0) {
        $scope.orgsponsers = allOrgData.success.organalyticssponser;
      }
      
    };

    $scope.transitionToOrgWall = function(orgid){
      $rootScope.orgid = orgid;
      $state.transitionTo('prodo.productwall.wall-org');
    }

    $scope.transitionToCampaignWall = function(orgid, campaignid, prodle){
      $rootScope.orgid = orgid;
      $rootScope.product_prodle = prodle;
      $rootScope.campaign_id = campaignid;
      $state.transitionTo('prodo.productwall.wall-campaign');
    }

	}]);
