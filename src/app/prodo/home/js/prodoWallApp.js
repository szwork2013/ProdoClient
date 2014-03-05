angular.module('prodo.ProdoWallApp')
	.controller('ProdoWallController', ['$rootScope', '$scope', '$state', '$log', 'OrgRegistrationService', 'orgdata', 'orgaddr', 'orgproduct', '$stateParams', function($rootScope, $scope, $state, $log, OrgRegistrationService, orgdata, orgaddr, orgproduct, $stateParams) {

    $rootScope.orgdata = {};
    $scope.orgaddr = [];
    $scope.productlist = [];

    $scope.updateimages = function(data) {
      console.log(data);
      if (data.length == 0) {
        $rootScope.images = [ {
          image: 'http://www.bestflashstock.com/components/com_virtuemart/shop_image/product/Product_Banner_w_4d0fb60464521.jpg'
        } ] 
      } else {
        $rootScope.images = data;
      }
    };
    

    $scope.$state = $state;
    
  	$rootScope.$watch('orgid', function() {
  		$state.reload();
    });
    // $rootScope.images = orgdata.success.organization.org_images;
    $scope.$watch('$state.$current.locals.globals.orgdata', function (orgdata) {
      $rootScope.orgdata = orgdata.success.organization;
      $scope.updateimages(orgdata.success.organization.org_images);
      console.log($rootScope.orgdata);
    });

    $scope.$watch('$state.$current.locals.globals.orgaddr', function (orgaddr) {
      $scope.orgaddr = orgaddr.success.orgaddress;
    });

    $scope.$watch('$state.$current.locals.globals.orgproduct', function (orgproduct) {
      if (orgproduct.error) {
            console.log('No product available');
          } else {
              $scope.productlist = orgproduct.success.product; 
          }
    });

	}]);
