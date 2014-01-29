angular.module("prodo.ProdoWallApp")
.factory("prodoSearchService",['$rootScope', '$resource', '$http', '$state', '$log', function($rootScope, $resource, $http, $state, $log) {

	var searchService=
						{
							Product : $resource('/api/searchproduct',{},
								{
									searchProductByKey : {method:'POST'}
								})
						};

	var search = {};

	search.searchProduct = function(productData){
		searchService.Product.searchProductByKey(productData,
			function(success) {
				$log.debug(success);
				$rootScope.$broadcast('getSearchProductDone', success);
			}),
			function(error) {
				$log.debug(error);
				$rootScope.$broadcast('getSearchProductNotDone', error);
			}
	}

	return search;

}]);
