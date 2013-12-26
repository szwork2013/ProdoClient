/**
* Main routing configuration
**/
angular.module('prodo.CommonApp')
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {  
  $urlRouterProvider.otherwise('/subscription');
  $stateProvider
    .state('subscription', {
      url: '/subscription',
      templateUrl: 'common/subscription/views/subscription.tpl.html',
      abstract: true
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
    .state('account', {
      url: '/account',
      templateUrl: 'common/accounts/views/account.settings.tpl.html',
      controller: 'ManageAccountController'
    })    
    .state('account.user', {
      url: '/user',
      views: {
        'account-navigation' : {
          templateUrl:  'user/views/user.account.settings.nav.tpl.html',
          controller: 'ManageAccountController'
          
        },
        'account-settings' : {
          templateUrl:  'user/views/user.account.settings.tpl.html',
          controller: 'ManageAccountController'
        }
      }
    })   
    .state('account.org', {
      url: '/org',
      views: {
        'account-navigation' : {
          templateUrl:  'org/views/org.account.settings.nav.tpl.html',
          controller: 'ManageAccountController'
        },
        'account-settings' : {
          templateUrl:  'org/views/org.account.settings.tpl.html',
          controller: 'ManageAccountController'
        }
      }
    })            
  }])
.run(['$rootScope', 'UserSessionService', '$state', function ($rootScope, UserSessionService, $state) {
  
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState){
      // console.log($state.current.url);
      if ((toState.name == 'prodo.wall' || toState.name == 'account.user') && $rootScope.usersession.isLoggedIn && !$rootScope.usersession.isSubscribed && !$rootScope.usersession.isPaymentDone ) {
        event.preventDefault();
      } else if (toState.name == 'prodo.wall' && $rootScope.usersession.isOtpPassword ) {
        event.preventDefault();
      };  
    })
  }]);