/**
* Main routing configuration
**/

angular.module('prodo.AdminApp')
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {  
  $stateProvider
    .state('admin', {
      url: '/admin',
      abstract: true,
      templateUrl: 'common/admin/views/prodo.admin.content.container.html'
    })  
    .state('admin.tags', {
      url: '/admin-tags',
      templateUrl: 'common/admin/views/prodo.tag_input.tpl.html',
      controller: "prodoAdminTagInputController"
    })  
    .state('admin.product', {
      url: '/admin-product',
      templateUrl: 'common/admin/views/prodo.product.tpl.html'
    })  
    .state('admin.payment', {
      url: '/admin-payment',
      templateUrl: 'common/admin/views/prodo.payment.tpl.html'
    })  
    
  }]);