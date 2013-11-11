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
       templateUrl:  'product/comments/views/prodo.wall.comment.tpl.html',
      }) 
     .state('prodo.wall.warranty', {
      url: '',
       templateUrl:  'warranty/views/prodo.wall.warranty.tpl.html',
      }) 
    .state('prodo.wall.blog', {
      url: '',
       templateUrl:  'blog/views/prodo.wall.blog.tpl.html',
      }) 
    // .state('org', {
    //   url: '/org',
    //   parent: 'prodo.wall',
    //   templateUrl:  'org/orgregistration/views/prodo.wall.org.tpl.html',
    //   // controller: 'SubscriptionController'
    // }) 
    // .state('product', {
    //   url: '/product',
    //   templateUrl:  'product/comments/views/prodo.wall.comment.tpl.html',
    //   // controller: 'PaymentController'
    // })  
    // .state('warranty', {
    //   url: '/warranty',
    //   templateUrl:  'warranty/views/prodo.wall.warranty.tpl.html',
    //   // controller: 'PaymentController'
    // }) 
    // .state('blog', {
    //   url: '/blog',
    //   templateUrl:  'blog/views/prodo.wall.blog.tpl.html',
    //   // controller: 'PaymentController'
    // })      
    // .state('prodo.wall.content', {
    //   url: 'prodo/org',
    //   templateUrl:  'org/orgregistration/views/prodo.wall.org.tpl.html',
    //   // controller: 'SubscriptionController'
    // }) 
    // .state('prodo.wall.content.org', {
    //   url: '/org',
    //   templateUrl:  'org/orgregistration/views/prodo.wall.org.tpl.html',
    //   // controller: 'SubscriptionController'
    // }) 
    // .state('prodo.wall.content.product', {
    //   url: '/product',
    //   templateUrl:  'product/comments/views/prodo.wall.comment.tpl.html',
    //   // controller: 'PaymentController'
    // })  
    // .state('prodo.wall.content.warranty', {
    //   url: '/warranty',
    //   templateUrl:  'warranty/views/prodo.wall.warranty.tpl.html',
    //   // controller: 'PaymentController'
    // }) 
    // .state('prodo.wall.content.blog', {
    //   url: '/blog',
    //   templateUrl:  'blog/views/prodo.wall.blog.tpl.html',
    //   // controller: 'PaymentController'
    // })  
  }]);