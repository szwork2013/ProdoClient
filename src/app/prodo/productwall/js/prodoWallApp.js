angular.module('prodo.ProdoWallApp')
	.controller('ProdoWallController', ['$rootScope', '$scope', '$state', '$log', 'UserSessionService', 'orgproduct', 'broadcastData', '$stateParams', 'growl', 'checkIfSessionExist', 'dashboardSliderData', 'blogSliderData', function($rootScope, $scope, $state, $log, UserSessionService, orgproduct, broadcastData, $stateParams, growl, checkIfSessionExist, dashboardSliderData, blogSliderData) {
		
    $log.debug('initialising parent..');
    $scope.$state = $state;

    console.log(orgproduct);
    $scope.messages = [];
  
    $scope.productdata = {};

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
      $rootScope.$broadcast('showUniqueProductBlog', prodle, blogid);
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
