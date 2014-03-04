angular.module('prodo.ProdoWallApp')
	.controller('ProdoWallController', ['$rootScope', '$scope', '$state', '$log', 'OrgRegistrationService', 'orgdata', 'orgaddr', 'orgproduct', '$stateParams', function($rootScope, $scope, $state, $log, OrgRegistrationService, orgdata, orgaddr, orgproduct, $stateParams) {

    if (orgproduct.error) {
      console.log('No product available');
    } else {
        $scope.productlist = orgproduct.success.product; 
    }

    
  	$rootScope.$watch('orgid', function() {
  		$scope.reload();
    });

    $scope.$state = $state;

    $scope.$watch('$state.$current.locals.globals.orgdata', function (orgdata) {
      $rootScope.orgdata = orgdata.success.organization;
      $rootScope.images = orgdata.success.organization.org_images;
      // if (orgdata.success.organization.org_images.length == 0) {
      //   $rootScope.images = [ {
      //     image: 'http://www.bestflashstock.com/components/com_virtuemart/shop_image/product/Product_Banner_w_4d0fb60464521.jpg'
      //   } ] 
      // } else {
      //   $rootScope.images = orgdata.success.organization.org_images;
      // }
    });

    $scope.$watch('$state.$current.locals.globals.orgaddr', function (orgaddr) {
      $scope.orgaddr = orgaddr.success.orgaddress;
    });

    $scope.$watch('$state.$current.locals.globals.orgproduct', function (orgproduct) {
      $scope.productlist = orgproduct.success.product;
    });

    $scope.reload = function() {
      $state.reload();
    };

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
