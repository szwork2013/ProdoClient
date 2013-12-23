/**
 *Product services to get product and comments( top 5)
 **/

angular.module('prodo.WarrantyApp')
        .factory('WarrantyService', ['$resource', function($resource) {
                return $resource('/api/product/:prodle', {},
                        {
                            getWarranty: {method: 'GET', params: {prodle: 'id'}},
//                            
                        });
            }])

       