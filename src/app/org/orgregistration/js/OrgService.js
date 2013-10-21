/**
*Org service to get the organization details from the REST service 
**/

angular.module('prodo.OrgApp')
.factory('OrgService', ['$http', '$q', '$angularCacheFactory', 
  function($http,$q,$angularCacheFactory) {
    var _dataCache = $angularCacheFactory('dataCache', { 
      maxAge: 3600000 // expire after an hour
    });
    
    var method = 'POST';
    var url = 'http://localhost:3000'; 
    function restService (method, url, data) {
      $http({ // Accessing the Angular $http Service to send data via REST Communication to Node Server.
          method: method,
          url: url,
          data: data ,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      })
      .success(function(response) {
        status = response.data; //Org form data successfully submitted
      })
      .error(function(response) {
        status = response.error; //Error please use the exception handler
      });
    }
    /**
     * @class orgService
     */
    return {
        addOrg: function (OrgformData) {
            // var jdata = 'mydata='+JSON.stringify(OrgformData); //check this code                   
          return restService('POST', 'http://localhost:9000', OrgformData);
        },

        getOrg: function (id) {
            var deferred = $q.defer();
            if (_dataCache.get(id)) {
                deferred.resolve(_dataCache.get(id));
            } else {
                // Get the data from the server and populate cache
                //TBD more code to be added
                restService('GET', 'http://localhost:9000', OrgformData); //only the orgid is send
            }
            return deferred.promise;
        }
        
        closeOrg: function (id) {
          return restService('POST', 'http://localhost:9000', OrgformData);
        }
      };
  };
}]);
 