angular.module('prodo.AdminApp').factory('tagAddService', [
  '$rootScope',
  '$resource',
  '$state',
  '$log',
  function ($rootScope, $resource, $state,$log) {
    var addService = { Product: $resource('/api/tagreffdictionary/addtag', {}, { addTags: { method: 'POST' } }) };
    var tagAddObject = {};
    tagAddObject.addTagFunction = function (tagInputData) {
      addService.Product.addTags(tagInputData, function (success) {
        $log.debug(success);
        $rootScope.$broadcast('tagAddedSuccessfully', success);
      }), function (error) {
        $log.debug(error);
        $rootScope.$broadcast('tagsNotAddedSuccessfully', error);
      };
    };
    return tagAddObject;
  }
])
.factory('domainTagList', [
  '$resource',
  function ($resource) {
    var TagS = {
        Tags: $resource('/api/tagreffdictionary/alldomaintags', {}, { getTag: { method: 'GET'} })
    }
    return TagS;
  }
]).factory('prodoAdminService', [
'$resource','$rootScope','$state',
        function ($resource, $rootScope, $state)
        {
                 var queryMappingFunction = {query : $resource('/api/dashboard/addquery', {}, {insertQuery : {method : 'POST'}})};
                 var getQueryFunction = {queryContent : $resource('/api/dashboard/queries', {}, {getQueryContent : {method : 'GET'}})};
                 // var getChartsList = {chartsContenList}
                 var assignCodeToChart = {codeToChart : $resource('/api/dashboard/RBONDS_Mapping', {}, {submitChart : {method: 'POST'}})};
                 var authorAcceptanceForm = {getListofRequest : $resource('/api/author', {}, { getAllRequest : { method : 'GET'}})};
                 var acceptAuthorRequest = { accept : $resource('/api/author/acceptance/:authorid/:userid' , {} , {acceptRequest : {method : 'PUT', params : { authorid : '@authorid' , userid:'@userid'} }})};
                 var rejectAuthor = { reject : $resource('/api/author/rejection/:authorid/:userid' , {} , {rejectRequest : {method : 'PUT', params : { authorid : '@authorid' , userid : '@userid'} }})};
                 var getAllCodesWithChart = { get : $resource('/api/dashboard/RBONDS_Mapping', {}, {getContentOfChart : { method : 'GET'}})};
       
                 var updateCodeContent = { change : $resource('/api/dashboard/RBONDS_Mapping/:code', {}, {changeCodeContent : { method : 'PUT', params : {code : '@code'}}})};
       
                 var query = {};
                 query.addQueryContent = function(queryContent)
                 {
                  queryMappingFunction.query.insertQuery(queryContent, function(success)
                  {
                    $rootScope.$broadcast('queryAddedSuccessfully', success);
                  }),
                  function(error) 
                  {
                    $rootScope.$broadcast('queryNotAddesSuccessfully' , error);
                  };
                 }
                 query.getAllQueries = function()
                 {
                  getQueryFunction.queryContent.getQueryContent(function(success)
                  {
                    $rootScope.$broadcast('gotAllQueriesList',success);
                  }),
                  function(error)
                  {
                    $rootScope.$broadcast('notGotAllQueries', error);
                  };
                 }
                 query.insertChartsToCode = function(content)
                 {
                  assignCodeToChart.codeToChart.submitChart(content, function(success)
                  {
                    $rootScope.$broadcast('chartsSubmittedSuccessfully', success);
                  }),
                  function(error)
                  {
                        $rootScope.$broadcast('chartsNotSubmittedSuccessfully', success);
                  }
                 }
                 query.getAllRequest = function()
                 {
                  authorAcceptanceForm.getListofRequest.getAllRequest(function(success)
                  {
                    $rootScope.$broadcast("gotAllRequests", success);
                  }),
                  function(error)
                  {
                    $rootScope.$broadcast('notGotAllRequests', error);
                  };
                 }
                 query.acceptAuthorRequest = function(data, id)
                 {
                  acceptAuthorRequest.accept.acceptRequest( { authorid : data , userid : id} ,function(success)
                  {
                    $rootScope.$broadcast("authorRequestAcceptedSuccessfully", success);
                  }),   function(error)
                  {
                    $rootScope.$broadcast('authorRequestNotAcceptedSuccessfully', error);
                  };
                  
                 }
                 query.rejectAuthorRequest = function(data, id)
                 {
                  rejectAuthor.reject.rejectRequest( { authorid : data , userid : id} ,function(success)
                  {
                    $rootScope.$broadcast("authorRequestRejected", success);
                  }),   function(error)
                  {
                    $rootScope.$broadcast('authorRequestNotRejected', error);
                  };
                  
                 }

                 query.getCodeChartContent = function()
                 {
                  getAllCodesWithChart.get.getContentOfChart(function(success){
                    $rootScope.$broadcast('gotCodeContentSuccess', success);
                  }),
                  function(error)
                  {
                    $rootScope.$broadcast('notGotCodeContent', error);
                  };
                 }

                 // query.updateRbondsContent = function()
                 // {
                 //  updateRBONDS.change.
                 // }
                 query.changeCodeContent = function(code, content)
                 {
                       updateCodeContent.change.changeCodeContent({code : code}, content , function(success)
                       {
                        $rootScope.$broadcast('changedCodeContent', success);
                       }),
                       function(error)
                       {
                        $rootScope.$broadcast('notChangedCodeContent' , error);
                       }
                 }
                return query;
        }
])
.factory('charts', [
  '$resource',
  function ($resource) {
       var getAllCharts = {
            dashboardCharts : $resource('/api/dashboard/chartdata', {}, {getList : {method: 'GET'}})
          };  
       return getAllCharts;
  }
]);