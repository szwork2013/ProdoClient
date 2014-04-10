angular.module('prodo.WarrantyApp')
 .controller('ProdoWallWarrantyController', ['$scope', '$rootScope', '$state', '$http', '$timeout', '$log', 'growl', 'WarrantyService', 'checkIfSessionExist', 'warrantydata', function($scope, $rootScope, $state, $http, $timeout, $log, growl, WarrantyService, checkIfSessionExist, warrantydata) {

 	// $log.debug(warrantydata);
 	$scope.warranties = [];

 	if (checkIfSessionExist.success && warrantydata.success) {
    $scope.$watch('$state.$current.locals.globals.warrantydata', function (warrantydata) {
      $scope.warranties = warrantydata.success.Warranty;
    });
  }


}]);
 