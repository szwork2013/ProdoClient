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
    .state('subscription.orgPayment', {
      url: '/orgPayment',
      templateUrl:  'common/subscription/views/subscription.org.payment.tpl.html',
      // controller: 'PaymentController'
    })  
    .state('subscription.userPayment', {
      url: '/userPayment',
      templateUrl:  'common/subscription/views/subscription.user.payment.tpl.html',
      // controller: 'PaymentController'
    })   
    .state('subscription.company', {
      url: '/company',
      templateUrl: 'org/orgregistration/views/orgregistration.company.tpl.html',
      // controller: 'OrgRegistrationController'
    }) 
    .state('subscription.contact', {
        url: '/contact',
        templateUrl:  'org/orgregistration/views/orgregistration.contact.tpl.html'
    })
    .state('subscription.address', {
        url: '/address',
        templateUrl:  'org/orgregistration/views/orgregistration.address.tpl.html'
    })
    .state('subscription.groupuser', {
        url: '/groupuser',
        templateUrl: 'org/orgregistration/views/orgregistration.groupusers.tpl.html'
    })     
    .state('subscription.terms', {
        url: '/terms',
        templateUrl: 'org/orgregistration/views/orgregistration.terms.tpl.html'
    })        
    .state('subscription.finish', {
        url: '/finish',
        templateUrl: 'org/orgregistration/views/orgregistration.finish.tpl.html'
    })            
  }]);