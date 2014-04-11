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
      resolve: {
        tagdata: function(domainTagList){
           var n = domainTagList.Tags.getTag().$promise;
           return n;
        }
      },
  
      onEnter : function($rootScope,$state)
      { 
        var restrict = $rootScope.usersession.isLoggedIn;
        if(restrict === false)
        {
          $state.go('prodo.landing.signin');
        }
      },

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
     .state('admin.organisation', {
      url: '/admin-organisation',
      templateUrl: 'common/admin/views/prodo.org_details.tpl.html'
    })  
    
  }]);