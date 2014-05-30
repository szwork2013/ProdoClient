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
  return $resource('/api/product/:orgid/:prodle', {},
  {
    getProduct: {method: 'GET', params: {orgid: 'id', prodle: 'id'}},
    updateProduct: {method: 'PUT', params: {orgid: 'id', prodle: 'id'}, isArray: false},
    deleteProduct: {method: 'DELETE', params: {orgid: 'id', prodle: 'id'}},
    saveProduct: {method: 'POST', params: {orgid: 'id'}},
  });
}])

 .factory('ProductFeatureService', ['$resource', function($resource) {
  return $resource('/api/productfeature/:orgid/:prodle/:productfeatureid', {},
  {
    getFeature: {method: 'GET', params: {orgid: 'id', prodle: 'id'}},
    updateFeature: {method: 'PUT', params: {orgid: 'id', prodle: 'id',productfeatureid: 'id'}, isArray: false},
    deleteFeature: {method: 'DELETE', params: {orgid: 'id', prodle: 'id' ,productfeatureid: 'id'}},
    saveFeature: {method: 'POST', params: {orgid: 'id', prodle: 'id'}}
  });
}])

 .factory('CommentService', ['$resource', function($resource) {
  return $resource('/api/comment/:commentid', {},
  {
    deleteComment: {method: 'DELETE', params: {commentid: "id"}}
  });
}])



 .factory('CommentLoadMoreService', ['$resource', function($resource) {
  return $resource('/api/nextcomments/:commentid', {},
  {
    loadMoreComments: {method: 'GET', params: {commentid: "id"}}
  });
}])

.factory('TagReffDictionaryService', ['$resource', function($resource) {
  return $resource('/api/tagreffdictionary/getAllTag', {},
  {
    getAllTags: {method: 'GET'}
  });
}])

.factory('CategoryTags', ['$resource', function($resource) {
  return $resource('/api/categorytags', {},
  {
    getCategoryTags: {method: 'GET'}
  });
}])

.factory('CommentTags', ['$resource', function($resource) {
  return $resource('/api/commenttags', {},
  {
    getCommentTags: {method: 'GET'}
  });
}])


.factory('isLoggedin', ['$resource', function($resource) {
  return $resource('/api/isloggedin', {},
  {
    checkUserSession: { method: 'GET' }
  });
}])

 .factory('ProductEnquiry', ['$resource', function($resource) {
  return $resource('/api/productenquiry/:orgid/:prodle', {},
  {
    sendEnquiry: {method: 'POST', params: {orgid: 'id', prodle: 'id'}}
  });
}])

 .factory('ProductTestimonial', ['$resource', function($resource) {
  return $resource('api/testimonial/:orgid/:prodle ', {},
  {
    sendTestimonial: {method: 'POST', params: {orgid: 'id', prodle: 'id'}}
  });
}])

.factory('ProductRating', [
  '$resource',
  function ($resource) {
    var rating = {
        add_Rating: $resource('/api/productfeaturating/:prodle ', {}, { addRating: { method: 'POST' , params : { prodle:'@prodle'}}}),
        get_MyProductFeatureRating: $resource('api/myproductfeaturerating/:prodle ', {}, { getMyProductFeatureRating: { method: 'GET', params : { prodle:'@prodle'}} }),
        get_OverallProductFeatureRating: $resource('api/overallproductfeaturerating/:prodle ', {}, { getOverallProductFeatureRating: { method: 'GET' , params : { prodle:'@prodle'}} })
    }
    return rating;
  }
]);





