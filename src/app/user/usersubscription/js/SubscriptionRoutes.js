/**
* Main routing configuration
**/
angular.module('prodo.SubscriptionApp')
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {  
  $urlRouterProvider.otherwise('/subscription');
  $stateProvider
    .state('subscription', {
      url: '/subscription',
      abstract: true,
      templateUrl: 'subscription/views/subscription.tpl.html'
    })
    .state('subscription.plans', {
      url: '/plans',
      templateUrl:  'subscription/views/subscription.plans.tpl.html',
      controller: 'SubscriptionController'
    }) 
    .state('subscription.payment', {
      url: '/payment',
      templateUrl:  'subscription/views/subscription.payment.tpl.html',
      controller: 'PaymentController'
    })   
    .state('subscription.company', {
      url: '/company',
      templateUrl: 'org/views/orgregistration.company.tpl.html',
      controller: 'OrgRegistrationController'
    }) 
    .state('subscription.contact', {
        url: '/contact',
        templateUrl:  'org/views/orgregistration.contact.tpl.html'
    })
    .state('subscription.address', {
        url: '/address',
        templateUrl:  'org/views/orgregistration.address.tpl.html'
    })
    .state('subscription.groupuser', {
        url: '/groupuser',
        templateUrl: 'org/views/orgregistration.groupusers.tpl.html'
    })     
    .state('subscription.terms', {
        url: '/terms',
        templateUrl: 'org/views/orgregistration.terms.tpl.html'
    })        
    .state('subscription.finish', {
        url: '/finish',
        templateUrl: 'org/views/orgregistration.finish.tpl.html'
    })            
  }]);