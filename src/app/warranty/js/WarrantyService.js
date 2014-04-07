angular.module('prodo.WarrantyApp')
.factory('WarrantyService', [
  '$resource',
  function ($resource) {
    var warranty = {
        add_warranty: $resource('/api/warranty/:userid', {}, { addWarrantyDetail: { method: 'POST'} }),
        get_warranty: $resource('/api/warranty/:userid/:warrantyid', {}, { getWarrantyDetail: { method: 'GET'} }),
        get_allwarranties: $resource('/api/warranty/:userid', {}, { getAllWarrantyDetails: { method: 'GET'} }),
        delete_warranty: $resource('/api/warranty/:userid/:warrantyid', {}, { deleteWarranty: { method: 'DELETE'} })

    }
    return warranty;
  }
]);
