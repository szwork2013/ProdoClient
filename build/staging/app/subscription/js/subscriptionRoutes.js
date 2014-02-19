 /**
* Subscription routing configuration
**/
angular.module('prodo.SubscriptionApp')
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {  
  $stateProvider
    .state('subscription', {
      templateUrl: 'subscription/views/subscription.container.html',
      abstract: true
    })
    .state('subscription.plans', {
      templateUrl:  'subscription/views/subscription.plans.tpl.html',
      controller: 'SubscriptionController'
    }) 
    .state('subscription.plansexpired', {
      templateUrl:  'subscription/views/subscription.plansexpired.tpl.html',
      controller: 'SubscriptionController'
    }) 
    .state('subscription.payment', {
      url: '/userPayment/:planid/:plantype',
      templateUrl:  'subscription/views/subscription.payment.tpl.html',
      controller: 'PaymentController'
    })   
  }]);
 