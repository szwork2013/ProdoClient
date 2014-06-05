angular.module('prodo.ProdoWallApp')
	.controller('ProdoWallOrgController', ['$rootScope', '$scope', '$state', '$log', 'UserSessionService', 'orgdata', 'orgaddr', 'orgproduct', 'broadcastData', '$stateParams', 'growl', 'checkIfSessionExist', function($rootScope, $scope, $state, $log, UserSessionService, orgdata, orgaddr, orgproduct, broadcastData, $stateParams, growl, checkIfSessionExist) {

    $rootScope.orgdata = {};
    $log.debug('initialising org child..');
    $scope.orgaddr = [];
    $scope.productlist = [];
    $scope.messages = [];
    $scope.keyclients = [];
    $scope.isFollowing = false;
    $scope.views=[];

    $scope.views = [{id: 'photo', image: 'http://rlv.zcache.com/creative_persons_art_and_inspiration_word_cloud_mousepad-radf4dcce0d1b4215a51877aa37cacb84_x74vi_8byvr_512.jpg', name: 'Photo View', description: ''},{id: 'video', image: 'http://blog.wevideo.com/Portals/165225/images/Video%20Word%20Cloud.jpg', name: 'ProdoTV View', description: ''}, {id: 0, image: 'http://www.mediabistro.com/prnewser/files/2011/11/prdefined-word-cloud.jpg', name: 'Organization View', description: ''},{ id:1, image: 'http://www.tobiasclarsson.com/wp-content/uploads/IsakssonLarssonEtAl-DevelopmentofProductServiceSystems-ChallengesAndOpportunitiesForTheManufacturingFirm-2009-wordle.jpg', name: 'Product View', description: ''},{id: 2, image: 'http://www.cmswire.com/images/gartner%20multichannel.jpg', name: 'Campaign View', description: ''},{ id: 3, image: 'http://toddbacile.files.wordpress.com/2013/10/blog-word-cloud1.jpg', name: 'Blog View', description: ''},{id: 4, image: 'http://www.contract-software.biz/wp-content/uploads/2012/06/warranty-software.jpg', name: 'Warranty View', description: ''},{id: 5, image: 'http://nativemobile.com/wordpress/wp-content/uploads/2014/04/SiteScout-Adds-Video-to-Real-Time-Bidding-Platform.png', name: 'Real-time View', description: ''},{id: 6, image: 'https://www.hrsmart.com/sites/default/files/images/testimonial.gif', name: 'Recommendation, Rating & Testimonial View', description: ''},{id: 7, image: 'http://www.liftdivision.com/wp-content/uploads/sites/4/2013/04/competitive-analysis.jpg', name: 'Competitive Analysis View', description: ''},{id: 8, image: 'http://www.sonofblue.com/wp-content/uploads/2013/10/online-business-opportunities.jpg', name: 'New Customer Opportunity View', description: ''},{id: 9, image: 'http://testenviro.gesaky.com/wp-content/uploads/2013/10/social-media1.jpg', name: 'Social Media Integration View', description: ''} ];

    $scope.goToState = function(id) {
      if (id == 'photo') {
        $state.transitionTo('prodo.productwall.wall-photo', null, {'reload':true});
      } else if (id == 'video') {
        $state.transitionTo('prodo.productwall.wall-video', null, {'reload':true});
      } else if (id == 0) {
        $state.transitionTo('prodo.productwall.wall-org.info', null, {'reload':true});
      } else if (id == 1) {
        $state.transitionTo('prodo.productwall.wall-product.info', null, {'reload':true});
      } else if (id == 2) {
        $state.transitionTo('prodo.productwall.wall-campaign.campaign', null, {'reload':true});
      } else if (id == 3) {
        $state.transitionTo('prodo.productwall.wall-blog.blog', null, {'reload':true});
      } else if (id == 4) {
        $state.transitionTo('prodo.productwall.wall-warranty.warranty', null, {'reload':true});
      } else if (id == 5) {
        $state.transitionTo('prodo.productwall.wall-realtime', null, {'reload':true});
      } else if (id == 6) {
        $state.transitionTo('prodo.productwall.wall-rating', null, {'reload':true});
      } else if (id == 7) {
        $state.transitionTo('prodo.productwall.wall-competitiveanalysis', null, {'reload':true});
      } else if (id == 8) {
        $state.transitionTo('prodo.productwall.wall-customeropportunity', null, {'reload':true});
      } else if (id == 9) {
        $state.transitionTo('prodo.productwall.wall-media', null, {'reload':true});
      }
    }

    $scope.$state = $state;


    // if (checkIfSessionExist.success && orgdata.success) {
    //   $scope.$watch('$state.$current.locals.globals.orgdata', function (orgdata) {
        
    //     $rootScope.orgdata = orgdata.success.organization;
        
    //     if (orgdata.success.organization.keyclients && orgdata.success.organization.keyclients.length !== 0) {
    //       $scope.keyclients = orgdata.success.organization.keyclients;
    //     }
        
    //     if (orgdata.success.organization.org_logo == undefined) {
    //       $rootScope.orgdata.org_logo = {image: '../../../assets/images/if_no_logo_images_available.gif'}
    //     }
    //     if (orgdata.success.organization.org_images.length !== 0) {
    //       $log.debug("Org images emitting ");
    //       $scope.$emit('emittingOrgImages',orgdata.success.organization.org_images);
    //     } else {
    //       $scope.$emit('emittingNoOrgImages',orgdata.success.organization.org_images);
    //     }
    //     $log.debug($rootScope.orgdata);
    //   });
    // }

    // if (checkIfSessionExist.success && broadcastData.success) {
    //   $scope.$watch('$state.$current.locals.globals.broadcastData', function (broadcastData) {
    //     if (broadcastData.success.broadcast.length !== 0) {
    //       $scope.messages = broadcastData.success.broadcast;
    //       $log.debug($scope.messages);
    //     }
    //   });
    // }

    // if (checkIfSessionExist.success && orgaddr.success) {
    //   $scope.$watch('$state.$current.locals.globals.orgaddr', function (orgaddr) {
    //     $scope.orgaddr = orgaddr.success.orgaddress;
    //   });
    // }

    // if (checkIfSessionExist.success && orgproduct.success) {
    //   $scope.$watch('$state.$current.locals.globals.orgproduct', function (orgproduct) {
    //     if (orgproduct.error) {
    //       $log.debug('No product available'); 
    //     } else {
    //       $scope.productlist = orgproduct.success.product; 
    //       $scope.product_prodles = [];
    //       if (UserSessionService.productfollowlist.length > 0) {
    //         for (var i=0; i< UserSessionService.productfollowlist.length; i++){
    //           if(UserSessionService.productfollowlist[i] && UserSessionService.productfollowlist[i].prodle){
    //             var prodle = UserSessionService.productfollowlist[i].prodle;
    //             if ($scope.product_prodles.indexOf(prodle)<0) {
    //               $scope.product_prodles.push(prodle);
    //             }              
    //           }
    //         }
    //       };
    //     }
    //   });
    // }

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
