angular.module('prodo.WarrantyApp')
.factory('WarrantyService', [
  '$resource',
  function ($resource) {
    var warranty = {
        add_warranty: $resource('/api/warranty/:userid', {}, { addWarrantyDetail: { method: 'POST'} , headers:{'Content-Type':'multipart/form-data'}}),
        get_warranty: $resource('/api/warranty/:userid/:warrantyid', {}, { getWarrantyDetail: { method: 'GET'} }),
        get_allwarranties: $resource('/api/warranty/:userid', {}, { getAllWarrantyDetails: { method: 'GET'} }),
        delete_warranty: $resource('/api/warranty/:userid/:warrantyid', {}, { deleteWarranty: { method: 'DELETE'} })

    }
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