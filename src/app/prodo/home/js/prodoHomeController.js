angular.module('prodo.ProdoHomeApp')
	.controller('ProdoHomeController', ['$rootScope', '$scope', '$state', '$log', 'UserSessionService', '$stateParams', 'growl', 'allOrgData', 'latestSignupData', 'checkIfSessionExist','trendingProductService', function($rootScope, $scope, $state, $log, UserSessionService, $stateParams, growl, allOrgData, latestSignupData, checkIfSessionExist, trendingProductService) {
		
    $log.debug('initialising home controller..');
    console.log(allOrgData);
    console.log(latestSignupData);
    $scope.allorganalytics = [];
    $scope.latestsignups = [];

    $scope.isCollapsed = true;


    $scope.regularExpressionForProdonus = /^prodonus/i;

    $scope.trendingProducts = {};  

    $scope.$state = $state;

    trendingProductService.getTrendingProducts();

    $scope.trendingProductEmit = function(prodle,orgid)
    {
            
            $rootScope.product_prodle = prodle;
            $rootScope.orgid = orgid; 
            $state.transitionTo("prodo.productwall.wall-product");
    };

    var cleanEventGotTrendingProducts = $scope.$on('gotTrendingProducts', function (event, data) 
    {  
        if (data.success !== undefined) {
                $scope.trendingProducts = data.success.ProductTrends;
        };
    });
        
    var cleanEventNotGotTrendingProducts = $scope.$on('notGotTrendingProducts', function (event, data) //Error handling needed for 
    {
        $rootScope.ProdoAppMessage("There is some issue with the server! Please try after some time",'error');
    });

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
    };

    $scope.$on('$destroy', function(event, message) {
      cleanEventGotTrendingProducts();
      cleanEventNotGotTrendingProducts();      
    });

	}]);
