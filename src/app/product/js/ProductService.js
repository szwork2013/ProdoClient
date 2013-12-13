/**
 *Product services to get product and comments( top 5)
 **/

angular.module('prodo.ProductApp')
        .factory('ProductService', ['$resource', function($resource) {
                return $resource('/api/product/:prodle', {},
                        {
                            
                            getProduct: {method: 'GET', params: {prodle: 'id'}},
//                            updateProduct: {method: 'PUT', params: {prodle: '@userid'}, isArray: false},
//                            deleteProduct: {method: 'DELETE', params: {prodle: '@userid'}}
                        });
            }])

        .factory('CommentServicesave', ['$resource', function($resource) {
                return $resource('/api/product/addcomment/xkWw_RNsr', {},
                        {
                            saveProduct: {method: 'POST'},
//                            getProduct: {method: 'GET', params: {prodle: 'id'}},
//                            updateProduct: {method: 'PUT', params: {prodle: '@userid'}, isArray: false},
//                            deleteProduct: {method: 'DELETE', params: {prodle: '@userid'}}
                        });
            }])


        .factory('GetLoginService', ['$resource', function($resource) {
                return $resource('/api/isLogin', {},
                        {
                            checkLogin: {method: 'GET'},
                        });
            }])


        .factory('ProductSaveService', ['$resource', function($resource) {
                return $resource('/api/product/:orgid', {},
                        {
                            saveProduct: {method: 'POST', params: {orgid: 'orge1LSosNiS'}},
                            //getProduct: {method: 'GET', params: {prodle: 'id'}},
                            //    updateProduct: {method: 'PUT', params: {prodle: '@userid'}, isArray: false},
                            //     deleteProduct: {method: 'DELETE', params: {prodle: '@userid'}}
                        });
            }])

