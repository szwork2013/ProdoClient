angular.module('prodo.ProdoWallApp')
//Code for advanced search 
.factory('prodoDashboardService', [
  '$rootScope',
  '$resource',
  '$log',
  '$state',
  function ($rootScope, $resource, $log, $state) {

			    var prodoChartService = { Product: $resource('/api/featureanalytics/:prodle', {}, { prodlePieChart: { method: 'GET' ,  params: { prodle: '@prodle'} } }),
			                              Trending: $resource('/api/trendingchart/:prodle', {}, { getTrendingChart: { method: 'GET' ,  params: { prodle: '@prodle'} } }), 
			                              get_ProductCharts: $resource('/api/dashboard/icons', {}, { getProductCharts: { method: 'GET'} })
			                            };
			

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
])
.factory('allChartsData', [
  '$rootScope',
  '$resource',
  '$log',
  '$state',
  function ($rootScope, $resource, $log, $state) {

  	var getChartContent = {chart: $resource('/api/chart/:prodle/:queryid', {}, {getContent : {method : 'GET', params : {prodle : '@prodle', queryid : '@queryid'}}}) };
    var query = {};
    query.getContent = function(queryid)
    {
    	getChartContent.chart.getContent({prodle: $rootScope.product_prodle , queryid : queryid}, function(success){
    		$rootScope.$broadcast('gotChartDataSuccessfully', success);
    	},
    	function(error)
    	{
    		$rootScope.$broadcast('notGotChartData', error);
    	})
    };

    return query;
  }
]);
