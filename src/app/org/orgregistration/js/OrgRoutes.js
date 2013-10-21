/**
* Organization routing configuration
**/
angular.module('prodo.OrgApp')
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {  
  $urlRouterProvider.otherwise('/org');
  $stateProvider
    .state('org', {
      url: '/org',
      abstract: true,
      templateUrl: 'org/views/orgregistration.tpl.html'
    })    
    .state('org.notification', {
        url: '/notify',
        templateUrl: 'org/views/org.notification.tpl.html'
    }) 
    .state('org.profile', {
        url: '/profile`',
        templateUrl: 'org/views/org.profile.tpl.html'
    })
  }]);