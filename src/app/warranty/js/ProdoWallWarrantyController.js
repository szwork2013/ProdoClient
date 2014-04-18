angular.module('prodo.WarrantyApp')
 .controller('ProdoWallWarrantyController', ['$scope', '$rootScope', '$state', '$http', '$timeout', '$log', 'growl', 'WarrantyService','GetWarrantyService', 'checkIfSessionExist', 'warrantydata', function($scope, $rootScope, $state, $http, $timeout, $log, growl, WarrantyService, GetWarrantyService, checkIfSessionExist, warrantydata) {

 	// $log.debug(warrantydata);
 	$scope.warranties = [];

 	if (checkIfSessionExist.success && warrantydata.success) {
    $scope.$watch('$state.$current.locals.globals.warrantydata', function (warrantydata) {
      $scope.warranties = warrantydata.success.Warranty;
    });
  }

  // function to handle server side responses
  $scope.handleGetMoreWarrantiesResponse = function(data){
    if (data.success) {
    	console.log(data.success.warranty);
    	for (var i=0;i<data.success.warranty.length;i++){
        if(data.success.warranty[i]){
          var warranty = data.success.warranty[i];
        }
        $scope.warranties.push(warranty);
      }
    } else {
      $log.debug(data.error.message);
      $scope.showAlert('alert-danger', data.error.message);
    }
    $scope.hideSpinner();
  };   
    

  $scope.loadWarranties = function(){
  	$scope.showSpinner();  
  	var lastwarrantyId = $scope.warranties.length - 1;
    $scope.WarrantyId= $scope.warranties[lastwarrantyId].warranty_id;
    GetWarrantyService.getMoreWarranties($scope.WarrantyId);
  }

  var cleanupEventGetMoreWarrantiesDone = $scope.$on("getMoreWarrantiesDone", function(event, message){
    $scope.handleGetMoreWarrantiesResponse(message);        
 	});

  var cleanupEventGetMoreWarrantiesNotDone = $scope.$on("getMoreWarrantiesNotDone", function(event, message){
    $scope.hideSpinner(); 
  });

  $scope.$on('$destroy', function(event, message) {
    cleanupEventGetMoreWarrantiesDone();
		cleanupEventGetMoreWarrantiesNotDone();
  });


}]);
 