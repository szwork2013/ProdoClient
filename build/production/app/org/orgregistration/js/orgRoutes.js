/**
* Organization routing configuration
**/
angular.module('prodo.OrgApp')
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {  
  
  $stateProvider
    .state('orgregistration', {
      templateUrl: 'org/orgregistration/views/orgregistration.container.html',
      abstract: true
    })
    .state('orgregistration.company', {
      url: '/company/:planid/:plantype',
      templateUrl: 'org/orgregistration/views/orgregistration.company.tpl.html',
      controller: 'OrgRegistrationController'
    }) 
    .state('orgregistration.address', {
        url: '/address/:planid/:plantype',
        templateUrl:  'org/orgregistration/views/orgregistration.address.tpl.html',
        controller: 'OrgRegistrationController'
    })
    .state('orgregistration.groupuser', {
        url: '/groupuser/:planid/:plantype',
        templateUrl: 'org/orgregistration/views/orgregistration.groupusers.tpl.html',
        controller: 'OrgRegistrationController'
    })     
    .state('orgregistration.terms', {
        url: '/terms/:planid/:plantype',
        templateUrl: 'org/orgregistration/views/orgregistration.terms.tpl.html',
        controller: 'OrgRegistrationController'
    })        
    .state('orgregistration.finish', {
        url: '/finish/:planid/:plantype',
        templateUrl: 'org/orgregistration/views/orgregistration.finish.tpl.html',
        controller: 'OrgRegistrationController'
    })    
  }]);
 