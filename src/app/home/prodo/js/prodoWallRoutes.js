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
        'prodonavbar' : {
          templateUrl:  'home/prodo/views/prodo.wall.navbar.tpl.html'
        },
        'dashboard' : {
          templateUrl:  'home/prodo/views/prodo.wall.dashboard.tpl.html'
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
       templateUrl:  'product/views/prodo.wall.comment.tpl.html',
      }) 
     .state('prodo.wall.warranty', {
      url: '',
       templateUrl:  'warranty/views/prodo.wall.warranty.tpl.html',
      }) 
    .state('prodo.wall.blog', {
      url: '',
       templateUrl:  'blog/views/prodo.wall.blog.tpl.html',
      }) 
  }]);