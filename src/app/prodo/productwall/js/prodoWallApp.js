angular.module('prodo.ProdoWallApp')
	.controller('ProdoWallController', ['$rootScope', '$scope', '$state', '$log', 'UserSessionService', 'orgdata', 'orgproduct', 'broadcastData', '$stateParams', 'growl', 'checkIfSessionExist', 'dashboardSliderData', 'blogSliderData', function($rootScope, $scope, $state, $log, UserSessionService, orgdata, orgproduct, broadcastData, $stateParams, growl, checkIfSessionExist, dashboardSliderData, blogSliderData) {
		
    $log.debug('initialising parent..');
    $scope.$state = $state;
    console.log(blogSliderData);
    console.log(orgproduct);
    $scope.messages = [];
    $rootScope.images = [];
    $scope.productdata = {};
    $scope.productblogs = [];

    $scope.$watch('$state.$current.locals.globals.orgproduct', function (orgproduct) {
    
      if (orgproduct.success && orgproduct.success.product !== undefined) {
        $scope.productdata = orgproduct.success.product; 
        console.log($scope.productdata)
      } else {
          if (orgproduct.error && orgproduct.error.code == 'AL001') {
            $rootScope.showModal();
          } else {
            $scope.productdata = {}; 
            $log.debug(orgproduct.error.message);
          } 
      }
    });

    $scope.$watch('$state.$current.locals.globals.blogSliderData', function (blogSliderData) {
    
      if (blogSliderData.success && blogSliderData.success.doc.length !== 0) {
        $scope.productblogs = blogSliderData.success.doc; 
        console.log($scope.productblogs)
      } else {
          if (blogSliderData.error && blogSliderData.error.code == 'AL001') {
            $rootScope.showModal();
          } else {
            $scope.productblogs = []; 
            $log.debug(blogSliderData.error.message);
          } 
      }
    });

    if (checkIfSessionExist.success && orgdata.success) {
      $scope.$watch('$state.$current.locals.globals.orgdata', function (orgdata) {
        if (orgdata.success.organization.org_images.length !== 0) {
          $rootScope.images = orgdata.success.organization.org_images;
        } else {
          $rootScope.images = [{image: '../../../assets/images/if_no_org_images_available.gif' }]; 
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


    $rootScope.goToUnifiedView = function(){
      $state.transitionTo('prodo.productwall.wall-unified');
    }

    $scope.viewProductBlog = function(prodle, blogid){
      $rootScope.product_prodle = prodle;
      $rootScope.product_blogid = blogid;
      $state.transitionTo('prodo.productwall.wall-blogdetail.detailview');
    }

    $scope.viewChart = function(name, query, type){
      $rootScope.$broadcast('showUniqueChart', name, query, type);
    }


    $scope.$watch('$state.$current.locals.globals.checkIfSessionExist', function (checkIfSessionExist) {
      if (checkIfSessionExist.error) {
        $rootScope.showModal();
      } 
    })

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


    $scope.$on('$destroy', function(event, data) {
      
      cleanEventOrgProdleEmit();
      cleanEventOrgProdleEmitBySearch();  
      cleanEventOrgProdleEmitByUserProfile();
    });

	}])

.filter("pagingFilter", function(){
  return function(input, currentPage, pageSize ){
    return input ?  input.slice(currentPage * pageSize, currentPage * ( pageSize + 1 )) : [];
  }

});
