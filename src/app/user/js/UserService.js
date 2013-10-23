/**
*User service to get the user details from the REST service 
**/

angular.module('prodo.UserApp')
// .factory('userService', ['$http', '$q', '$angularCacheFactory', function($http,$q,$angularCacheFactory) {
    .factory('userService', ['$http', '$q', function($http,$q,$angularCacheFactory) {
  //   var _dataCache = $angularCacheFactory('dataCache', { 
  //     maxAge: 3600000 // expire after an hour
  //   });
    
  //   /**
  //    * @class userService
  //    */
  //   return {
  //       addUsers: function (input) {
  //           var output;
  //           // do something with the data
  //           return output;
  //       },

  //       getUser: function (id) {
  //           var deferred = $q.defer();
  //           if (_dataCache.get(id)) {
  //               deferred.resolve(_dataCache.get(id));
  //           } else {
  //               // Get the data from the server and populate cache
  //           }
  //           return deferred.promise;
  //       },
        
  //       removeUser: function (id) {
  //           var deferred = $q.defer();
  //           if (_dataCache.get(id)) {
  //               deferred.resolve(_dataCache.get(id));
  //           } else {
  //               // Get the data from the server and populate cache
  //           }
  //           return deferred.promise;
  //       }
  //     };
  }
]);