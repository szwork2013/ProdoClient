angular.module('prodo.ProdoWallApp')
	.controller('ProdoWallController', ['$rootScope', '$scope', '$state', '$log', 'UserSessionService', 'orgdata', 'orgaddr', 'orgproduct', 'productData', '$stateParams', 'growl', function($rootScope, $scope, $state, $log, UserSessionService, orgdata, orgaddr, orgproduct, productData, $stateParams, growl) {
		$log.debug('initialising parent..');

     $scope.updateimages = function(data) {
      $rootScope.manageSlider="";   // Added this variable to check conditions in tpl
      $rootScope.manageSlider= data.length;  // Added this variable to check conditions in tpl
      if (data.length !== 0) 
      {
        $rootScope.images = "";     // Omkar: To clear previous images
        $rootScope.images = data;
      }
      else if (data.length===0)
      {
        $rootScope.images = "";    // Omkar: To clear previous images
        $rootScope.images= [{image: '../../../assets/images/if_no_org_images_available.gif' }];    // This will be shown when org images are not there  
      }
    };

    $scope.goToOrg = function() {
      $state.transitionTo('prodo.home.wall-org', null, {'reload':true});
    }

    $scope.goToProduct = function() {
      $state.transitionTo('prodo.home.wall-product', null, {'reload':true});
    }

    $scope.goToWarranty = function() {
      $state.transitionTo('prodo.home.wall-warranty', null, {'reload':true});
    }

    $scope.goToBlog = function() {
      $state.transitionTo('prodo.home.wall-blog', null, {'reload':true});
    }

    $scope.goToDashboard = function() {
      $state.transitionTo('prodo.home.wall-dashboard', null, {'reload':true});
    }


    $scope.$state = $state;

    var cleanEventOrgProdleEmit = $scope.$on("emittingOrgid", function(event, success){
      $log.debug('Listening in Org controller by simple search');
      $state.transitionTo($state.current, $stateParams, { reload: true, inherit: false, notify: true });

    });

    var cleanEventOrgProdleEmitBySearch = $scope.$on("emittingOrgidBySearch", function(event, success){
       $log.debug('listening in Org controller by advance search')
      $state.transitionTo($state.current, $stateParams, { reload: true, inherit: false, notify: true });
    });

    var cleanEventOrgProdleEmitByUserProfile = $scope.$on("emittingOrgidByUserProfile", function(event, success){
      $log.debug('listening in Org controller by user profile')
      $state.transitionTo($state.current, $stateParams, { reload: true, inherit: false, notify: true });
    });

    var cleanEventEmittingProductImages = $scope.$on("emittingProductImages", function(event, data){
      $log.debug('listening in Parent controller by product controller');
      $scope.updateimages(data);
    });

    var cleanEventEmittingNoProductImages = $scope.$on("emittingNoProductImages", function(event, data){
      $log.debug('listening in Parent controller by product controller');
      $scope.updateimages(data);
    });

    var cleanEventEmittingOrgImages = $scope.$on("emittingOrgImages", function(event, data){
      $log.debug('listening in Parent controller by org controller');
      $scope.updateimages(data);
    });

    $scope.$on('$destroy', function(event, data) {
      
      cleanEventOrgProdleEmit();
      cleanEventOrgProdleEmitBySearch();  
      cleanEventOrgProdleEmitByUserProfile();
      cleanEventEmittingProductImages();
      cleanEventEmittingNoProductImages();
      cleanEventEmittingOrgImages();
      
    });


	}]);
