angular.module('prodo.ProdonusApp')
	.controller('ProdoMarketingController', ['$rootScope', '$scope', '$state', '$log','$stateParams', 'growl', 'marketingData', function($rootScope, $scope, $state, $log, $stateParams, growl, marketingData) {
		
    console.log(marketingData);


  // $scope.myInterval = 10000;
  $scope.slides = [];

  if (marketingData.success) {
    $scope.slides = marketingData.success.marketingdata;
  } else {
    $scope.slides = [{
      artwork: { 'images': '../../../assets/images/if_no_logo_images_available.gif'}
    }]
  }

	}]);
