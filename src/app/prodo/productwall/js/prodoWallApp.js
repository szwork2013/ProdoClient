angular.module('prodo.ProdoWallApp')
	.controller('ProdoWallController', ['$rootScope', '$scope', '$state', '$log', 'UserSessionService', 'orgdata', 'orgaddr', 'orgproduct', 'productData', '$stateParams', 'growl', 'checkIfSessionExist', function($rootScope, $scope, $state, $log, UserSessionService, orgdata, orgaddr, orgproduct, productData, $stateParams, growl, checkIfSessionExist) {
		
    $log.debug('initialising parent..');
    $scope.$state = $state;

    if ($state.$current.name == 'prodo.productwall.wall-org') {
      $rootScope.index = 0;
    }

    $scope.$watch('$state.$current.locals.globals.checkIfSessionExist', function (checkIfSessionExist) {
      if (checkIfSessionExist.error) {
        $rootScope.showModal();
      } 
    });

    $scope.navs = [{name: 'Organization', id: '1'},{name: 'Product', id: '2'},{name: 'MyWarranty', id: '3'},{name: 'Campaign', id: '4'},{name: 'Blog', id: '5'},{name: 'Dashboard', id: '6'}]
    
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

    $scope.goToState = function(id) {
      if (id == 1 && $state.$current.name !== 'prodo.productwall.wall-org') {
        $rootScope.index = 0;
        $state.transitionTo('prodo.productwall.wall-org', null, {'reload':true});
      } else if (id == 2 && $state.$current.name !== 'prodo.productwall.wall-product') {
        $rootScope.index = 1;
        $state.transitionTo('prodo.productwall.wall-product', null, {'reload':true});
      } else if (id == 3 && $state.$current.name !== 'prodo.productwall.wall-warranty') {
        $rootScope.index = 2;
        $state.transitionTo('prodo.productwall.wall-warranty', null, {'reload':true});
      } else if (id == 4 && $state.$current.name !== 'prodo.productwall.wall-campaign') {
        $rootScope.index = 3;
        $state.transitionTo('prodo.productwall.wall-campaign', null, {'reload':true});
      } else if (id == 5 && $state.$current.name !== 'prodo.productwall.wall-blog') {
        $rootScope.index = 4;
        $state.transitionTo('prodo.productwall.wall-blog', null, {'reload':true});
      } else if (id == 6 && $state.$current.name !== 'prodo.productwall.wall-dashboard') {
        $rootScope.index = 5;
        $state.transitionTo('prodo.productwall.wall-dashboard', null, {'reload':true});
      };
    }

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

    var cleanEventEmittingCampaignImages = $scope.$on("emittingCampaignImages", function(event, data){
      $log.debug('listening in Parent controller by Campaign controller');
      $scope.updateimages(data);
    });

    var cleanEventEmittingNoCampaignImages = $scope.$on("emittingNoCampaignImages", function(event, data){
      $log.debug('listening in Parent controller by Campaign controller');
      $scope.updateimages(data);
    });


    var cleanEventEmittingOrgImages = $scope.$on("emittingOrgImages", function(event, data){
      $log.debug('listening in Parent controller by org controller');
      $scope.updateimages(data);
    });

    var cleanEventEmittingNoOrgImages = $scope.$on("emittingNoOrgImages", function(event, data){
      $log.debug('listening in Parent controller by org controller');
      $scope.updateimages(data);
    });


    $scope.$on('$destroy', function(event, data) {
      
      cleanEventOrgProdleEmit();
      cleanEventOrgProdleEmitBySearch();  
      cleanEventOrgProdleEmitByUserProfile();
      cleanEventEmittingProductImages();
      cleanEventEmittingNoProductImages();
      cleanEventEmittingCampaignImages();
      cleanEventEmittingNoCampaignImages();
      cleanEventEmittingOrgImages();
      cleanEventEmittingNoOrgImages();
    });


	}]);
