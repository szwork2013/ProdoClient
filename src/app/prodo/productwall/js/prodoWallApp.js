angular.module('prodo.ProdoWallApp')
	.controller('ProdoWallController', ['$rootScope', '$scope', '$state', '$log', 'UserSessionService', 'orgdata', 'orgaddr', 'orgproduct', 'productData', '$stateParams', 'growl', 'checkIfSessionExist', function($rootScope, $scope, $state, $log, UserSessionService, orgdata, orgaddr, orgproduct, productData, $stateParams, growl, checkIfSessionExist) {
		
    $log.debug('initialising parent..');
    $scope.$state = $state;


    if ($state.$current.name == 'prodo.productwall.wall-org') {
      $rootScope.index = 0;
    } else {
        if ($state.$current.name == 'prodo.productwall.wall-product') {
          $rootScope.index = 1;
      } else if ($state.$current.name == 'prodo.productwall.wall-warranty') {
          $rootScope.index = 5;
      } else if ($state.$current.name == 'prodo.productwall.wall-campaign') {
          $rootScope.index = 2;
      } else if ($state.$current.name == 'prodo.productwall.wall-blog') {
          $rootScope.index = 3;
      } else if ($state.$current.name == 'prodo.productwall.wall-dashboard') {
          $rootScope.index = 4;
      } 
    }

    $scope.$watch('$state.$current.locals.globals.checkIfSessionExist', function (checkIfSessionExist) {
      if (checkIfSessionExist.error) {
        $rootScope.showModal();
      } 
    });

    $scope.navs = [{name: 'Organization', id: 'nav1'},{name: 'Product', id: 'nav2'},{name: 'Campaign', id: 'nav3'},{name: 'Blog', id: 'nav4'},{name: 'Dashboard', id: 'nav5'},{name: 'MyWarranty', id: 'nav6'}]
    
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
      if (id == 'nav1' && $state.$current.name !== 'prodo.productwall.wall-org') {
        $rootScope.index = 0;
        $state.transitionTo('prodo.productwall.wall-org', null, {'reload':true});
      } else if (id == 'nav2' && $state.$current.name !== 'prodo.productwall.wall-product') {
        $rootScope.index = 1;
        $state.transitionTo('prodo.productwall.wall-product', null, {'reload':true});
      } else if (id == 'nav3' && $state.$current.name !== 'prodo.productwall.wall-campaign') {
        $rootScope.index = 2;
        $state.transitionTo('prodo.productwall.wall-campaign', null, {'reload':true});
      } else if (id == 'nav4' && $state.$current.name !== 'prodo.productwall.wall-blog') {
        $rootScope.index = 3;
        $state.transitionTo('prodo.productwall.wall-blog', null, {'reload':true});
      } else if (id == 'nav5' && $state.$current.name !== 'prodo.productwall.wall-dashboard') {
        $rootScope.index = 4;
        $state.transitionTo('prodo.productwall.wall-dashboard', null, {'reload':true});
      } else if (id == 'nav6' && $state.$current.name !== 'prodo.productwall.wall-warranty') {
        $rootScope.index = 5;
        $state.transitionTo('prodo.productwall.wall-warranty', null, {'reload':true});
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
      console.log(data);
      $scope.updateimages(data);
    });

    var cleanEventEmittingNoCampaignImages = $scope.$on("emittingNoCampaignImages", function(event, data){
      $log.debug('listening in Parent controller by Campaign controller');
      console.log(data);
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
