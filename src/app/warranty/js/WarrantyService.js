/* Overview:Warranty services  
 * Warranty services to get warranty and comments 
 * Dated: 29/11/2013.
 * Author: Bhagyashri Jangam
 * Copyright: Prodonus Software Private Limited and GiantLeap Systems Private Limited 2013
 * Change History:
 *
 * date | author | description 
 *
 * 27-3/2013 | xyx | Add a new property
 * 
 */

angular.module('prodo.ProductApp')
        .factory('WarrantyService', ['$resource', function($resource) {
            return $resource('/api/warranty/:prodle', {},
                    {
                      getProduct: {method: 'GET', params: {prodle: 'id'}},
//                            updateProduct: {method: 'PUT', params: {prodle: '@userid'}, isArray: false},
                    //  deleteProduct: {method: 'DELETE', params: {prodle: 'id'}}
                    });
          }])
        
  
        .factory('WarrantySaveService', ['$resource', function($resource) {
            return $resource('/api/warranty/:orgid', {},
                    {
                      saveProduct: {method: 'POST', params: {orgid: 'orge1LSosNiS'}},
                      //getProduct: {method: 'GET', params: {prodle: 'id'}},
                      //    updateProduct: {method: 'PUT', params: {prodle: '@userid'}, isArray: false},
                      //     deleteProduct: {method: 'DELETE', params: {prodle: '@userid'}}
                    });
          }])

