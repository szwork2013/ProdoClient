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
        },
        // checkIfSessionExist: function(UserService, $rootScope) {
        //     return UserService.Is_user_loggedin.checkUserSession().$promise;
        // }
      },
  
      // onEnter : function(checkIfSessionExist, $rootScope,$state)
      // { 
      //   if (checkIfSessionExist.error) {
      //     $state.go('prodo.landing.signin');
      //   } else if (checkIfSessionExist.success && checkIfSessionExist.success.user.isAdmin === false)
      //   {
      //     $state.go($state.$current);
      //   }
      // },

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
    
    .state('admin.landingpageslider', {
      url: '/admin-landingpageslider',
      templateUrl: 'common/admin/views/prodo.landingpageslider.tpl.html',
      // resolve: {
      //   checkIfSessionExist: function(UserService, $rootScope) {
      //       return UserService.Is_user_loggedin.checkUserSession().$promise;
      //   }
      // }, 
      // onEnter : function(checkIfSessionExist, $rootScope,$state)
      // { 
      //   if (checkIfSessionExist.error) {
      //     $state.go('prodo.landing.signin');
      //   } 
        // else if (checkIfSessionExist.success && checkIfSessionExist.success.user.isAdmin === false)
        // {
          //$state.go('prodo.home');
        // }
      // },

       controller: "LandingPageController"

    })  
    .state('admin.chart', {
      url: '/admin-chart',
      templateUrl: 'common/admin/views/prodo.charts.tpl.html',
       controller: "LandingPageController"
    })  
    .state('admin.chartAssign',{
      url:'/admin-assignchartsforusers',
      templateUrl: 'common/admin/views/prodo.charts.codeassign.tpl.html',
      resolve:
      {
              chartContent: function(charts)
                         {
                           var data =  charts.dashboardCharts.getList().$promise;
                           return data;
                         }
      },
      controller: "ProdoAdminController"
    })
   .state('admin.queryMapping',{
      url:'/admin-queryMapping',
      templateUrl: 'common/admin/views/prodo.query.mapping.tpl.html',
      resolve:
      {
              chartContent: function(charts)
                         {
                           var data =  charts.dashboardCharts.getList().$promise;
                           return data;
                         }
      },
      controller: "ProdoAdminController"
    })
    // .state('admin.authorAcceptance',{
    //   url:'/admin-authorAcceptance',
    //   templateUrl: 'common/admin/views/prodo.blog.author.acceptance.tpl.html',
    // 
    //   controller: "ProdoAdminController"
    // })









  }]);