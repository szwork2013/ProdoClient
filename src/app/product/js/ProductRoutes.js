/**
* Products routing configuration
**/

angular.module('prodo.ProductApp')
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {  
  $stateProvider
    .state('prodo', {
      url: '',
      abstract: true,
      templateUrl: 'product/views/product.prodo.tpl.html'
    })     
    .state('prodo.wall', {
      url: '',
      views: {
        'left-sidebar' : {
          templateUrl:  'product/views/product.leftsidebar.tpl.html'
        },
        'main-prodo' : {
          templateUrl:  'product/views/product.mainprodo.tpl.html',
          controller: 'ProductController'
        }
      }
    }) 
    .state('prodo.nav', {
        url: '/nav',
        templateUrl: 'product/views/product.nav.tpl.html'
    })  
    .state('prodo.dashboard', {
        url: '/dashboard',
        templateUrl: 'product/views/product.dashboard.tpl.html'
    })  
    .state('prodo.comment', {
        url: '/comment',
        templateUrl: 'product/views/product.comments.tpl.html'
    })            
  }]);