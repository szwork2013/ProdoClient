angular.module('prodo.WarrantyApp')
.factory('WarrantyService', [
  '$resource',
  function ($resource) {
    var warranty = {
        add_warranty: $resource('/api/warranty/:userid', {}, { addWarrantyDetail: { method: 'POST'} , headers:{'Content-Type':'multipart/form-data'}}),
        get_warranty: $resource('/api/warranty/:userid/:warrantyid', {}, { getWarrantyDetail: { method: 'GET'} }),
        get_allwarranties: $resource('/api/warranty/:userid', {}, { getAllWarrantyDetails: { method: 'GET'} }),
        get_latest5warranties: $resource('/api/latestwarranty/:userid', {}, { getLatestWarrantyDetails: { method: 'GET'} }),
        update_warranty: $resource('/api/warranty/:userid/:warrantyid', {}, { updateWarranty: { method: 'PUT'} }),
        delete_warranty: $resource('/api/warranty/:userid/:warrantyid', {}, { deleteWarranty: { method: 'DELETE'} })

    }
    return warranty;
  }
])

.factory('GetWarrantyService', [
  '$rootScope',
  '$resource',
  '$http',
  '$state',
  '$log',
  function ($rootScope, $resource, $http, $state, $log) {
    var warrantyService = {
        get_next5warranties: $resource('/api/nextwarranties/:userid/:warrantyid', {}, { getNextWarrantyDetails: { method: 'GET', params: { userid: '@userid', warrantyid: '@warrantyid' }} }),
      };
    var warranty = {};

    warranty.getMoreWarranties = function (warrantyid) {
      warrantyService.get_next5warranties.getNextWarrantyDetails({ userid: $rootScope.usersession.currentUser.userid, warrantyid: warrantyid }, function (success) {
        $log.debug(success);
        $rootScope.$broadcast('getMoreWarrantiesDone', success);
      }, function (error) {
        $log.debug(error);
        $rootScope.$broadcast('getMoreWarrantiesNotDone', error.status);
      });
    };


    return warranty;
  }
])

.factory('OrgnameService', ['$resource', function($resource) {
  return $resource('/api/orgnames', {},
  {
    getOrgname: {method: 'GET'}
  });
}])

.factory('ProductnameService', ['$resource', function($resource) {
  return $resource('/api/productname', {},
  {
    getProductname: {method: 'GET'}
  });
}])