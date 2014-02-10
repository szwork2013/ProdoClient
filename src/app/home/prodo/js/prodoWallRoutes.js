var app = angular.module('prodo.ProdoWallApp');
app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) { 
  $urlRouterProvider.rule(function ($injector, $location) {
        var path = $location.path(), normalized = path.toLowerCase();
        if (path != normalized) return normalized;
    });

  $stateProvider
    .state('prodo', {
      templateUrl: 'home/prodo/views/prodo.tpl.html',
      abstract: true
    })    
    .state('prodo.wall', {
      views: {
        'sidebar' : {
          templateUrl:  'common/search/views/prodo.wall.sidebar.tpl.html',
          controller: 'prodoSearchController'
        },
        'orglogodisplay' : {
          templateUrl:  'org/manageorg/views/prodo.wall.orglogo.tpl.html',
          controller: 'ManageAccountController'
        },
        'productwall' : {
          templateUrl:  'common/slider/views/prodo.wall.slider.tpl.html',
          controller: 'ManageAccountController'
        },
        'prodonavbar' : {
          templateUrl:  'home/prodo/views/prodo.wall.navbar.tpl.html'
        },
        'content' : {
          templateUrl:  'home/prodo/views/prodo.wall.content.tpl.html',
        }
      },
      controller: 'ProdoWallController'
    })
    .state('prodo.wall.org', {
       templateUrl:  'org/manageorg/views/prodo.wall.org.tpl.html',
       controller: 'ManageAccountController'
      }) 
    .state('prodo.wall.org.detail', {
       templateUrl:  'org/manageorg/views/org.wall.orgDetails.tpl.html'
      }) 
    .state('prodo.wall.org.upload', {
       templateUrl:  'org/manageorg/views/org.wall.orgUpload.tpl.html'
      }) 
    .state('prodo.wall.org.broadcast', {
       templateUrl:  'org/manageorg/views/org.wall.orgBroadcast.tpl.html'
      }) 
    .state('prodo.wall.product', {
       templateUrl:  'product/views/prodo.wall.productTabs.tpl.html',
      }) 
     .state('prodo.wall.warranty', {
       templateUrl:  'warranty/views/prodo.wall.warrantyTabs.tpl.html',
      }) 
    .state('prodo.wall.blog', {
       templateUrl:  'blog/views/prodo.wall.blog.tpl.html',
      }) 
    .state('prodo.wall.dashboard', {
       templateUrl:  'dashboard/views/prodo.wall.dashboard.tpl.html',
       controller: 'ProdoDashboardController'
      }) 
  }]);

 // .run(['$rootScope', 'UserSessionService', '$state', '$log', function ($rootScope, UserSessionService, $state, $log) {
  
 //    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState){
 //      // $log.debug($state.current.url);

 //      if (toState.name == 'prodo.wall' && !$rootScope.usersession.isLoggedIn) {
 //        event.preventDefault();

 //      } else if (toState.name=='home.start' && $rootScope.usersession.isLoggedIn) {
 //        event.preventDefault();
 //      }  
 //    })
 //  }]);
