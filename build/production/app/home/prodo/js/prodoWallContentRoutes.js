/**
* Main routing configuration for prodo wall content
**/
angular.module('prodo.ContentApp')
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {  
  // $urlRouterProvider.otherwise('/');
  $stateProvider
    .state('org', {
      url: '/org',
      parent: 'content',
      templateUrl:  'org/orgregistration/views/prodo.wall.org.tpl.html',
      // controller: 'SubscriptionController'
    }) 
    .state('product', {
      url: '/product',
      templateUrl:  'product/views/prodo.wall.comment.tpl.html',
      // controller: 'PaymentController'
    })  
    .state('warranty', {
      url: '/warranty',
      templateUrl:  'warranty/views/prodo.wall.warranty.tpl.html',
      // controller: 'PaymentController'
    }) 
    .state('blog', {
      url: '/blog',
      templateUrl:  'blog/views/prodo.wall.blog.tpl.html',
      // controller: 'PaymentController'
    })           
  }]);