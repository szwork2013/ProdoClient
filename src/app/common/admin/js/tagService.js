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
]);

angular.module('prodo.AdminApp').factory('domainTagList', [
  '$rootScope',
  '$resource',
  '$state',
  '$log',
  function ($rootScope, $resource, $state,$log) {
    var getAllList = { Product: $resource('/api/tagreffdictionary/alldomaintags', {}, { getTag: { method: 'GET' } }) };
    var getTagsList = {};
    getTagsList.getTags = function (tagInputData) {
      getAllList.Product.getTag(tagInputData, function (success) {
        $log.debug(success);
        $rootScope.$broadcast('gotAllDomainTags', success);
      }), function (error) {
        $log.debug(error);
        $rootScope.$broadcast('notGotAllDomainTags', error);
      };
    };
    return getTagsList;
  }
]);