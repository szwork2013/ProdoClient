angular.module('prodo.ProdoWallApp')
	.controller('ProdoWallOrgController', ['$rootScope', '$scope', '$state', '$log', 'UserSessionService', 'orgdata', 'orgaddr', 'orgproduct', 'broadcastData', '$stateParams', 'growl', 'checkIfSessionExist', function($rootScope, $scope, $state, $log, UserSessionService, orgdata, orgaddr, orgproduct, broadcastData, $stateParams, growl, checkIfSessionExist) {

    $rootScope.orgdata = {};
    $log.debug('initialising org child..');
    $scope.orgaddr = [];
    $scope.productlist = [];
    $scope.messages = [];
    $scope.keyclients = [];
    $scope.isFollowing = false;

    $scope.$state = $state;

    if (checkIfSessionExist.success && orgdata.success) {
      $scope.$watch('$state.$current.locals.globals.orgdata', function (orgdata) {
        
        $rootScope.orgdata = orgdata.success.organization;
        
        if (orgdata.success.organization.keyclients && orgdata.success.organization.keyclients.length !== 0) {
          $scope.keyclients = orgdata.success.organization.keyclients;
        }
        
        if (orgdata.success.organization.org_logo == undefined) {
          $rootScope.orgdata.org_logo = {image: '../../../assets/images/if_no_logo_images_available.gif'}
        }
        if (orgdata.success.organization.org_images.length !== 0) {
          $log.debug("Org images emitting ");
          $scope.$emit('emittingOrgImages',orgdata.success.organization.org_images);
        } else {
          $scope.$emit('emittingNoOrgImages',orgdata.success.organization.org_images);
        }
        $log.debug($rootScope.orgdata);
      });
    }

    if (checkIfSessionExist.success && broadcastData.success) {
      $scope.$watch('$state.$current.locals.globals.broadcastData', function (broadcastData) {
        if (broadcastData.success.broadcast.length !== 0) {
          $scope.messages = broadcastData.success.broadcast;
          $log.debug($scope.messages);
        }
      });
    }

    if (checkIfSessionExist.success && orgaddr.success) {
      $scope.$watch('$state.$current.locals.globals.orgaddr', function (orgaddr) {
        $scope.orgaddr = orgaddr.success.orgaddress;
      });
    }

    if (checkIfSessionExist.success && orgproduct.success) {
      $scope.$watch('$state.$current.locals.globals.orgproduct', function (orgproduct) {
        if (orgproduct.error) {
          $log.debug('No product available'); 
        } else {
          $scope.productlist = orgproduct.success.product; 
          $scope.product_prodles = [];
         // $rootScope.product_prodle = $scope.productlist[0].prodle;
          $rootScope.orgid = $scope.productlist[0].orgid;

          if (UserSessionService.productfollowlist.length > 0) {
            for (var i=0; i< UserSessionService.productfollowlist.length; i++){
              if(UserSessionService.productfollowlist[i] && UserSessionService.productfollowlist[i].prodle){
                var prodle = UserSessionService.productfollowlist[i].prodle;
                if ($scope.product_prodles.indexOf(prodle)<0) {
                  $scope.product_prodles.push(prodle);
                }              
              }
            }
          };
        }
      });
    }

    var cleanEventUnfollowProductFromSidelist = $scope.$on("unfollowProductFromSidelist", function(event, success){
      $state.transitionTo($state.current, $stateParams, { reload: true, inherit: false, notify: true });
    });


    $scope.handlefollowproductResponse = function(data, product){
      if (data.success) {
        UserSessionService.productfollowlist.push(product);
        $state.transitionTo($state.current, $stateParams, { reload: true, inherit: false, notify: true });
        $rootScope.ProdoAppMessage('You can start your product conversation for' + ' ' + product.name,'success');
      } else {
        if(data.error !== undefined && data.error.code === 'AL001' ) {
          $rootScope.showModal();
        } else {
          $log.debug(data.error.message);
          $rootScope.ProdoAppMessage(data.error.message,'error');        
        }
      }
    }; 

    $scope.follow = function(product){
      UserSessionService.followProduct(product.prodle, product);
    };

    var cleanupEventFollowProductDone = $scope.$on('followProductDone', function(event, data, product) {
       $scope.isFollowing = true;
       $scope.handlefollowproductResponse(data, product);
      });

    var cleanupEventFollowProductNotDone = $scope.$on('followProductNotDone', function(event, data) {
        $scope.isFollowing = true;
        $rootScope.ProdoAppMessage('It looks as though we have broken something on our server system. Our support team is notified and will take immediate action to fix it','error');
      });    

    $scope.$on('$destroy', function(event, data) {
      cleanupEventFollowProductDone(); 
      cleanupEventFollowProductNotDone();  
      cleanEventUnfollowProductFromSidelist();
    });
    
	}]);
