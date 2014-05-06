angular.module('prodo.ProdoWallApp')
//Code for advanced search 
.factory('prodoDashboardService', [
  '$rootScope',
  '$resource',
  '$log',
  '$state',
  function ($rootScope, $resource, $log, $state) {

			    var prodoChartService = { Product: $resource('/api/featureanalytics/:prodle', {}, { prodlePieChart: { method: 'GET' ,  params: { prodle: '@prodle'} } }),
			                              Bar: $resource('/api/featureanalytics/barchart/:prodle', {}, { getBarDetails: { method: 'GET' ,  params: { prodle: '@prodle'} } }), };
			    // var returnProdleAnalyticsDetails = {};
			    // returnProdleAnalyticsDetails.getChartData = function () {
			    //   prodoChartService.Product.prodlePieChart({prodle:$rootScope.product_prodle},function (success) {
			    //     $log.debug(success);
			    //     $rootScope.$broadcast('gotDataCharts', success);
			    //   }), function (error) {
			    //     $log.debug(error);
			    //     $rootScope.$broadcast('notGotDataCharts', error);
			    //   };
			    // };
			    // return returnProdleAnalyticsDetails;
			    return prodoChartService;
  	  }
]);
