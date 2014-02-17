angular.module('prodo.ProdoWallApp')
//Code for advanced search 
.factory('prodoSearchService', [
  '$rootScope',
  '$resource',
  '$http',
  '$state',
  '$log',
  function ($rootScope, $resource, $http, $state, $log) {
    var searchService = { Product: $resource('/api/searchproduct', {}, { searchProductByKey: { method: 'POST' } }) };
    var search = {};
    search.searchProduct = function (productData) {
      searchService.Product.searchProductByKey(productData, function (success) {
        $log.debug(success);
        $rootScope.$broadcast('getSearchProductDone', success);
      }), function (error) {
        $log.debug(error);
        $rootScope.$broadcast('getSearchProductNotDone', error);
      };
    };
    return search;


  }
])

//service for normal search
.factory('searchProductService', [
  '$rootScope',
  '$resource',
  '$http',
  '$state',
  '$log',
     function ($rootScope, $resource, $http, $state, $log) {
    var searchService = { Product: $resource('/api/allproduct', {}, { searchProductByKey: { method: 'POST' } }) };
    var search = {};
    search.searchProduct = function (searchData) {
      searchService.Product.searchProductByKey(searchData,function (success) {
        $log.debug(success);
        $rootScope.$broadcast('gotAllProducts', success);
      }), function (error) {
        $log.debug(error);
        $rootScope.$broadcast('notGotAllProducts', error);
      };
    };
    return search;


  }
])


