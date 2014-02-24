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
      templateUrl: 'org/orgregistration/views/orgregistration.company.tpl.html',
      controller: 'OrgRegistrationController'
    }) 
    .state('orgregistration.address', {
        templateUrl:  'org/orgregistration/views/orgregistration.address.tpl.html',
        controller: 'OrgRegistrationController'
    })
    .state('orgregistration.groupuser', {
        templateUrl: 'org/orgregistration/views/orgregistration.groupusers.tpl.html',
        controller: 'OrgRegistrationController'
    })     
    .state('orgregistration.terms', {
        templateUrl: 'org/orgregistration/views/orgregistration.terms.tpl.html',
        controller: 'OrgRegistrationController'
    })        
    .state('orgregistration.finish', {
        templateUrl: 'org/orgregistration/views/orgregistration.finish.tpl.html',
        controller: 'OrgRegistrationController'
    })
    .state('account-org', {
      abstract: true,
      templateUrl: 'org/manageorg/views/org.account.settings.container.html'
    })    
    .state('account-org.org', {
      abstract: true,
      templateUrl:  'org/manageorg/views/org.account.settings.tpl.html',
      controller: 'OrgAccountController'
    })
    .state('account-org.org.detail', {
       templateUrl:  'org/manageorg/views/org.wall.orgDetails.tpl.html'
      }) 
    .state('account-org.org.upload', {
       templateUrl:  'org/manageorg/views/org.wall.orgUpload.tpl.html'
      }) 
    .state('account-org.org.broadcast', {
       templateUrl:  'org/manageorg/views/org.wall.orgBroadcast.tpl.html'
      })
    .state('account-org.org.Productdetail', {
       templateUrl:  'product/views/prodo.wall.productFeatures.tpl.html'
      }) 
    .state('account-org.org.Productupload', {
       templateUrl:  'product/views/prodo.wall.productUpload.tpl.html'
      })    
  }]);
 