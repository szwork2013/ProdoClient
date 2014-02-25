angular.module('prodo.ProdoWallApp')
	.controller('ProdoWallController', ['$rootScope', '$scope', '$state', '$log', 'OrgRegistrationService', function($rootScope, $scope, $state, $log, OrgRegistrationService) {

		$rootScope.$watch('orgid', function() {
      OrgRegistrationService.getOrgDetailSettings($rootScope.orgid);
     	OrgRegistrationService.getAllOrgAddress($rootScope.orgid);
    	OrgRegistrationService.getAllProducts($rootScope.orgid); 
  });


		// function to handle server side responses
    $scope.handleOrgAddressResponse = function(data){
      if (data.success) {
        OrgRegistrationService.updateOrgAdd(data.success.orgaddress);
        $scope.showAlert('alert-success', data.success.message);   
      } else {
        if (data.error.code== 'AU004') {     // enter valid data
            $log.debug(data.error.code + " " + data.error.message);
            $scope.showAlert('alert-danger', data.error.message);
        } else {
            $log.debug(data.error.message);
            $scope.showAlert('alert-danger', data.error.message);
        }
      }
    };  

      var cleanupEventGetOrgAddressDone = $scope.$on("getOrgAddressDone", function(event, message){
        $scope.handleOrgAddressResponse(message);
        cleanupEventGetOrgAddressDone();   
      });
      var cleanupEventGetOrgAddressNotDone = $scope.$on("getOrgAddressNotDone", function(event, message){
        $scope.showAlert('alert-danger', "Server Error:" + message);
        cleanupEventGetOrgAddressNotDone();      
      });
  

		var cleanupEventGetOrgAddData = $rootScope.$on("getOrgAddData", function(event, data){
        $scope.orgaddr = data;
        cleanupEventGetOrgAddData();  
    });

    var cleanupEventSendOrgData = $rootScope.$on("sendOrgData", function(event, data){
        $scope.orgdata = data;
        cleanupEventSendOrgData();  
    });

    var cleanupEventGetOrgDone = $rootScope.$on('getOrgDone', function (event, data) {
        OrgRegistrationService.updateOrgData(data.success.organization);
        cleanupEventGetOrgDone();
      });
    var cleanupEventGetOrgNotDone = $rootScope.$on('getOrgNotDone', function (event, data) {
        $scope.showAlert('alert-danger', 'Server Error:' + data);
        cleanupEventGetOrgNotDone();
      });

    // function to handle server side responses
    $scope.handleGetOrgProductResponse = function(data){
      if (data.success) {
        console.log(data.success);
        $scope.productlist = data.success.product;
        $scope.showAlert('alert-success', data.success.message);   
      } else {
        if (data.error.code== 'AU004') {     // enter valid data
            $log.debug(data.error.code + " " + data.error.message);
            $scope.showAlert('alert-danger', data.error.message);
        } else {
            $log.debug(data.error.message);
            $scope.showAlert('alert-danger', data.error.message);
        }
      }
    };  

      var cleanupEventGetOrgProductDone = $scope.$on("getOrgProductDone", function(event, message){
        $scope.handleGetOrgProductResponse(message);
        cleanupEventGetOrgProductDone();   
      });
      var cleanupEventGetOrgProductNotDone = $scope.$on("getOrgProductNotDone", function(event, message){
        $scope.showAlert('alert-danger', "Server Error:" + message);
        cleanupEventGetOrgProductNotDone();      
      });

	}]);
