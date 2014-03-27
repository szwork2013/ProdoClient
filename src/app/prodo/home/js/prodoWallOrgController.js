angular.module('prodo.ProdoWallApp')
	.controller('ProdoWallOrgController', ['$rootScope', '$scope', '$state', '$log', 'UserSessionService', 'orgdata', 'orgaddr', 'orgproduct', '$stateParams', 'growl', function($rootScope, $scope, $state, $log, UserSessionService, orgdata, orgaddr, orgproduct, $stateParams, growl) {

    $rootScope.orgdata = {};
    $scope.orgaddr = [];
    $scope.productlist = [];
    $rootScope.images = [];
    $scope.messages = [];
    $scope.isFollowing = false;
    var planExpiryDate = moment.utc(moment($rootScope.usersession.currentUser.subscription.planexpirydate));
    var todaysDate = moment.utc(moment());
    $rootScope.daysRemaining = "Trial : "+planExpiryDate.diff(todaysDate, 'days')+" Days Remaining";

    $scope.updateimages = function(data) {
      $scope.manageSlider="";   // Added this variable to check conditions in tpl
      $scope.manageSlider= data.length;  // Added this variable to check conditions in tpl
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


    // Neha's previous update images function
                  //  $scope.updateimages = function(data) {
                  //   console.log(data);
                  //   if (data.length == 0) {
                  //     $rootScope.images = [ {
                  //       image: 'http://www.bestflashstock.com/components/com_virtuemart/shop_image/product/Product_Banner_w_4d0fb60464521.jpg'
                  //     } ] 
                  //   } else {
                  //     $rootScope.images = data;
                  //   }
                  // };

    $scope.$state = $state;

    var cleanEventOrgProdleEmit = $scope.$on("emittingOrgid", function(event, success){
      $state.reload();
    });

    var cleanEventOrgProdleEmitBySearch = $scope.$on("emittingOrgidBySearch", function(event, success){
      $state.reload();
    });

    var cleanEventOrgProdleEmitByUserProfile = $scope.$on("emittingOrgidByUserProfile", function(event, success){
      $state.reload();
    });

    $scope.$watch('$state.$current.locals.globals.orgdata', function (orgdata) {
      $rootScope.orgdata = orgdata.success.organization;
      $scope.messages = orgdata.success.organization.broadcast;
      if (orgdata.success.organization.org_logo == undefined) {
        $rootScope.orgdata.org_logo = {image: '../../../assets/images/if_no_logo_images_available.gif'}
      }
      $scope.updateimages(orgdata.success.organization.org_images);
      $log.debug($rootScope.orgdata);
    });

    $scope.$watch('$state.$current.locals.globals.orgaddr', function (orgaddr) {
      $scope.orgaddr = orgaddr.success.orgaddress;
    });

    $scope.$watch('$state.$current.locals.globals.orgproduct', function (orgproduct) {
      if (orgproduct.error) {
        $log.debug('No product available'); 
      } else {
        $scope.productlist = orgproduct.success.product; 
        $scope.product_prodles = [];
        $rootScope.product_prodle = $scope.productlist[0].prodle; 
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

    var cleanEventUnfollowProductFromSidelist = $scope.$on("unfollowProductFromSidelist", function(event, success){
      $state.reload();
    });


    $scope.handlefollowproductResponse = function(data, product){
      if (data.success) {
        UserSessionService.productfollowlist.push(product);
        $state.reload();
        growl.addSuccessMessage('You have successfully followed' + ' ' + product.name);    
      } else {
          if(data.error !== undefined && data.error.code === 'AL001' ) {
            UserSessionService.resetSession();
            $state.transitionTo('prodo.landing.signin');
          } else {
            $log.debug(data.error.message);
            growl.addErrorMessage(data.error.message); 
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
        growl.addErrorMessage('There is some server error.');
      });    

    $scope.$on('$destroy', function(event, data) {
      cleanupEventFollowProductDone(); 
      cleanupEventFollowProductNotDone();  
      cleanEventUnfollowProductFromSidelist();
      cleanEventOrgProdleEmit();  
      cleanEventOrgProdleEmitBySearch();
      cleanEventOrgProdleEmitByUserProfile();

    });

	}]);
