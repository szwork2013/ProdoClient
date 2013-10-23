angular.module('prodo.ProdoWallApp')
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {  
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
          templateUrl:  'home/prodo/views/prodo.wall.carousel.tpl.html'
        },
        'dashboard' : {
          templateUrl:  'home/prodo/views/prodo.wall.dashboard.tpl.html'
        },
        'comment' : {
          templateUrl:  'home/prodo/views/prodo.wall.comment.tpl.html'
        }
      },
      controller: 'ProdoWallController'
    })    
  }]);