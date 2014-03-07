angular.module('prodo.ProdoWallApp')
//Code for advanced search 
.factory('prodoSearchService', [
  '$rootScope',
  '$resource',
  '$log',
  function ($rootScope, $resource, $log) {
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
  '$log',
     function ($rootScope, $resource, $log) {
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
//This service is written to get data from trending api
.factory('trendingProductService', [
  '$rootScope',
  '$resource',
  '$log',
    function ($rootScope, $resource, $log) {
    var trendingProducts = { Product: $resource('/api/trendingproducts', {}, { searchProductByKey: { method: 'GET' } }) };
    var products = {};
    products.getTrendingProducts = function () {
      trendingProducts.Product.searchProductByKey(function (success) {
        $log.debug(success);
        $rootScope.$broadcast('gotTrendingProducts', success);
      }), function (error) {
        $log.debug(error);
        $rootScope.$broadcast('notGotTrendingProducts', error);
      };
    };
    return products;
  }
])

