angular.module('prodo.ProdoWallApp')
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) { 
  $urlRouterProvider.rule(function ($injector, $location) {
        var path = $location.path(), normalized = path.toLowerCase();
        if (path != normalized) return normalized;
    });

  $stateProvider
    .state('prodo', {
      templateUrl: 'prodo/home/views/prodo.container.html',
      abstract: true
    })    
    .state('prodo.wall', {
      views: {
        'prodo-sidebar' : {
          templateUrl:  'prodo/home/views/prodo.wall.sidebar.tpl.html',
          controller: 'prodoSearchController'
        },
        'prodo-slider' : {
          templateUrl:  'prodo/home/views/prodo.wall.slider.tpl.html'
        },
        'prodo-navbar' : {
          templateUrl:  'prodo/home/views/prodo.wall.navbar.tpl.html'
        },
        'prodo-content' : {
          abstract: true,
          templateUrl:  'prodo/home/views/prodo.wall.content.container.html'
        },
        'prodo-advertisment' : {
          templateUrl:  'prodo/home/views/prodo.wall.advertisment.tpl.html'
        }
      },
      controller: 'ProdoWallController'
    })
    .state('prodo.wall.org', { 
       templateUrl:  'org/manageorg/views/prodo.wall.org.tpl.html',
       controller: 'ProdoWallController',
       resolve: {
          orgdata: function(OrgService, $rootScope) {
            console.log('hi-1');
             return OrgService.org_data.getOrgSettings({orgid: $rootScope.orgid}).$promise;
          },

          orgdata1: function(OrgRegistrationService, $rootScope) {
                        console.log("Resolving dependency...");
                        var n = OrgRegistrationService.getOrgDetailSettings($rootScope.orgid);
                       console.log(n)
                       return n; 
                    },
          orgproductdata: function(OrgRegistrationService, $rootScope) {
              console.log("Resolving dependency...");
             return OrgRegistrationService.getAllProducts($rootScope.orgid);
              
          },
          orgaddressdata: function(OrgRegistrationService, $rootScope) {
              console.log("Resolving dependency...");
             return OrgRegistrationService.getAllOrgAddress($rootScope.orgid);
              
          },
          test: function(){
              console.log("test")
            }
        }
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
      resolve : 
      { 
        dataFromService : function($http) 
         {
            return $http({
                          method: 'GET',
                          url: '/api/trendingproducts'
                        });
         },
      },    
       templateUrl:  'dashboard/views/prodo.wall.dashboard.tpl.html',
       controller: 'ProdoDashboardController'
      }) 
  }]);