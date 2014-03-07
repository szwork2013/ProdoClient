angular.module('prodo.AdminApp').factory('tagAddService', [
  '$rootScope',
  '$resource',
  '$state',
  function ($rootScope, $resource, $state) {
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