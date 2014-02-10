 /**
* Main routing configuration
**/
angular.module('prodo.CommonApp')
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {  
  
  $stateProvider
    .state('subscription', {
      templateUrl: 'common/subscription/views/subscription.tpl.html',
      abstract: true
    })
    .state('subscription.plans', {
      templateUrl:  'common/subscription/views/subscription.plans.tpl.html',
      controller: 'SubscriptionController'
    }) 
    .state('subscription.plansexpired', {
      templateUrl:  'common/subscription/views/subscription.plansexpired.tpl.html',
      controller: 'SubscriptionController'
    }) 
    .state('subscription.payment', {
      url: '/userPayment/:planid/:plantype',
      templateUrl:  'common/subscription/views/subscription.payment.tpl.html',
      controller: 'PaymentController'
    })   
    .state('subscription.company', {
      url: '/company/:planid/:plantype',
      templateUrl: 'org/orgregistration/views/orgregistration.company.tpl.html',
      controller: 'OrgRegistrationController'
    }) 
    .state('subscription.address', {
        url: '/address/:planid/:plantype',
        templateUrl:  'org/orgregistration/views/orgregistration.address.tpl.html',
        controller: 'OrgRegistrationController'
    })
    .state('subscription.groupuser', {
        url: '/groupuser/:planid/:plantype',
        templateUrl: 'org/orgregistration/views/orgregistration.groupusers.tpl.html',
        controller: 'OrgRegistrationController'
    })     
    .state('subscription.terms', {
        url: '/terms/:planid/:plantype',
        templateUrl: 'org/orgregistration/views/orgregistration.terms.tpl.html',
        controller: 'OrgRegistrationController'
    })        
    .state('subscription.finish', {
        url: '/finish/:planid/:plantype',
        templateUrl: 'org/orgregistration/views/orgregistration.finish.tpl.html',
        controller: 'OrgRegistrationController'
    }) 
    .state('account', {
      abstract: true,
      templateUrl: 'common/accounts/views/account.settings.tpl.html',
      controller: 'ManageAccountController'
    })    
    .state('account.user', {
      templateUrl:  'user/views/user.account.settings.tpl.html',
      controller: 'ManageAccountController'
    })   
  }]);
 
// .run(['$rootScope', 'UserSessionService', '$state', '$log', function ($rootScope, UserSessionService, $state, $log) {
 
//     $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState){
   
//       // if ((toState.name == 'prodo.wall' || toState.name == 'account.user') && $rootScope.usersession.isLoggedIn && !$rootScope.usersession.isSubscribed && !$rootScope.usersession.isPaymentDone ) {
//       if ((toState.name == 'prodo.wall') && $rootScope.usersession.isLoggedIn && !$rootScope.usersession.isSubscribed && !$rootScope.usersession.isPaymentDone ) {
//         event.preventDefault();
//       } else if (toState.name == 'prodo.wall' && $rootScope.usersession.isOtpPassword ) {
//         event.preventDefault();
//       };      })
//  }]);
 
