angular.module('prodo.ProdoWallApp')
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) { 
  $urlRouterProvider.rule(function ($injector, $location) {
        var path = $location.path(), normalized = path.toLowerCase();
        if (path != normalized) return normalized;
    });

  $stateProvider
    .state('prodo', {
      url: '/prodo',
      templateUrl: 'home/prodo/views/prodo.tpl.html',
      abstract: true,
      controller: 'ProdoWallController'
    })    
    .state('prodo.wall', {
      url: '',
      views: {
        'sidebar' : {
          templateUrl:  'home/prodo/views/prodo.wall.sidebar.tpl.html'
        },
        'productwall' : {
          templateUrl:  'common/slider/views/prodo.wall.slider.tpl.html'
        },
        'prodonavbar' : {
          templateUrl:  'home/prodo/views/prodo.wall.navbar.tpl.html'
        },
        'content' : {
          templateUrl:  'home/prodo/views/prodo.wall.content.tpl.html'
        }
      },
      controller: 'ProdoWallController'
    })
    .state('prodo.wall.org', {
      url: '',
       templateUrl:  'org/manageorg/views/prodo.wall.org.tpl.html',
      }) 
    .state('prodo.wall.product', {
      url: '',
       templateUrl:  'product/views/prodo.wall.productTabs.tpl.html',
      }) 
     .state('prodo.wall.warranty', {
      url: '',
       templateUrl:  'warranty/views/prodo.wall.warrantyTabs.tpl.html',
      }) 
    .state('prodo.wall.blog', {
      url: '',
       templateUrl:  'blog/views/prodo.wall.blog.tpl.html',
      }) 
    .state('prodo.wall.dashboard', {
      url: '',
       templateUrl:  'dashboard/views/prodo.wall.dashboard.tpl.html',
       controller: 'ProdoDashboardController'
      }) 
  }])
 .run(['$rootScope', 'UserSessionService', '$state', function ($rootScope, UserSessionService, $state) {
  
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState){
      // console.log($state.current.url);
      if (toState.name == 'prodo.wall' && !$rootScope.usersession.isLoggedIn) {
        event.preventDefault();

      } else if (toState.name=='home.start' && $rootScope.usersession.isLoggedIn) {
        event.preventDefault();
      }  
    })
  }]);
 
