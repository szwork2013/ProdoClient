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
      // resolve : { 
      //        trendingProducts:  function($http){
      //        return $http({method: 'GET', url: '/api/trendingproducts'})
      //          .success(function (data) { 
      //              return data;
      //          });
      //    }
                     
      //  },
      views: {
        'prodo-sidebar' : {
          templateUrl:  'prodo/home/views/prodo.wall.sidebar.tpl.html',
          controller: 'prodoSearchController'
        },
        'prodo-slider' : {
          templateUrl:  'prodo/home/views/prodo.wall.slider.tpl.html',
          controller: 'OrgAccountController'
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
      }
    })
    .state('prodo.wall.org', {
       templateUrl:  'org/manageorg/views/prodo.wall.org.tpl.html',
       controller: 'OrgAccountController'
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
       templateUrl:  'dashboard/views/prodo.wall.dashboard.tpl.html',
       controller: 'ProdoDashboardController'
      }) 
  }]);