angular.module('prodo.ProdoCommentApp').factory('prodoCommentService', [
  '$rootScope',
  '$resource',
  '$http',
  '$state',
  '$log',
  function ($rootScope, $resource, $http, $state, $log) {
    var searchService = {
        Product: $resource('/api/profileinfo/:userid', {}, {
          searchUser: {
            method: 'GET',
            params: { userid: '@userid' }
          }
        })
      };
    var search = {};
    search.searchUserData = function (userData) {
      searchService.Product.searchUser({ userid: userData }, function (success) {
        $log.debug(success);
        $rootScope.$broadcast('getUserDataDone', success);
      }), function (error) {
        $log.debug(error);
        $rootScope.$broadcast('getUserDataNotDone', error);
      };
    };
    return search;
  }
]);