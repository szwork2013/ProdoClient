/**
* Main routing configuration
**/
angular.module('prodo.CommonApp')
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {  
  $urlRouterProvider.otherwise('/subscription');
  $stateProvider
    .state('subscription', {
      url: '/subscription',
      templateUrl: 'common/subscription/views/subscription.tpl.html'
    })
    .state('subscription.plans', {
      url: '/plans',
      templateUrl:  'common/subscription/views/subscription.plans.tpl.html',
      // controller: 'SubscriptionController'
    }) 
    .state('subscription.plansexpired', {
      url: '/plans',
      templateUrl:  'common/subscription/views/subscription.plansexpired.tpl.html',
      // controller: 'SubscriptionController'
    }) 
    .state('subscription.payment', {
      url: '/userPayment',
      templateUrl:  'common/subscription/views/subscription.payment.tpl.html',
      // controller: 'PaymentController'
    })   
    .state('subscription.company', {
      url: '/company',
      templateUrl: 'org/orgregistration/views/orgregistration.company.tpl.html',
      controller: 'OrgRegistrationController'
    }) 
    .state('subscription.contact', {
        url: '/contact',
        templateUrl:  'org/orgregistration/views/orgregistration.contact.tpl.html',
        controller: 'OrgRegistrationController'
    })
    .state('subscription.address', {
        url: '/address',
        templateUrl:  'org/orgregistration/views/orgregistration.address.tpl.html',
        controller: 'OrgRegistrationController'
    })
    .state('subscription.groupuser', {
        url: '/groupuser',
        templateUrl: 'org/orgregistration/views/orgregistration.groupusers.tpl.html',
        controller: 'OrgRegistrationController'
    })     
    .state('subscription.terms', {
        url: '/terms',
        templateUrl: 'org/orgregistration/views/orgregistration.terms.tpl.html',
        controller: 'OrgRegistrationController'
    })        
    .state('subscription.finish', {
        url: '/finish',
        templateUrl: 'org/orgregistration/views/orgregistration.finish.tpl.html',
        controller: 'OrgRegistrationController'
    })            
  }]);