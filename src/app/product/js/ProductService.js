/* Overview:Product services  
 * Product services to get product and comments( top 5)
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
        .factory('ProductService', ['$resource', function($resource) {
            return $resource('/api/product/:prodle', {},
                    {
                      getProduct: {method: 'GET', params: {prodle: 'id'}},
//                            updateProduct: {method: 'PUT', params: {prodle: '@userid'}, isArray: false},
                    //  deleteProduct: {method: 'DELETE', params: {prodle: 'id'}}
                    });
          }])
        
        
        .factory('CommentService', ['$resource', function($resource) {
            return $resource('/api/comment/:commentid', {},
                    {
                     deleteComment: {method: 'DELETE', params: {commentid: "id"}}
                    });
          }])
        

        .factory('CommentServicesave', ['$resource', function($resource) {
            return $resource('/api/product/addcomment/xk7i99lj8', {},
                    {
                      saveProduct: {method: 'POST'},
//                            getProduct: {method: 'GET', params: {prodle: 'id'}},
//                            updateProduct: {method: 'PUT', params: {prodle: '@userid'}, isArray: false},
//                            deleteProduct: {method: 'DELETE', params: {prodle: '@userid'}}
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
//.run(function ($rootScope, $http, $cookieStore, $location) {
//    
//        var sessionId ;
//        if (sessionId == null) {
//            sessionId = $cookieStore.get("session.id");
//            console.log(sessionId);
//        }
//
// 
//    });

