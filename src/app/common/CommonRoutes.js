/**
* Main routing configuration
**/
angular.module('prodo.CommonApp')
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {  
  
  $stateProvider
    .state('subscription', {
      url: '',
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
      abstract: true,
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
          abstract: true,
          templateUrl:  'user/views/user.account.settings.tpl.html',
          controller: 'ManageAccountController'
        }
      }
    })
    .state('account.user.general', {
      url: '/general',
      templateUrl: 'user/views/user.account.general.settings.tpl.html',
      controller: 'ManageAccountController' 
    })  
    .state('account.user.location', {
      url: '/location',
      templateUrl: 'user/views/user.account.location.settings.tpl.html' 
    })  
    .state('account.user.invites', {
      url: '/invites',
      templateUrl: 'user/views/user.account.invites.settings.tpl.html' 
    })  
    .state('account.user.product', {
      url: '/product',
      templateUrl: 'user/views/user.account.product.settings.tpl.html' 
    })  
    .state('account.user.subscription', {
      url: '/subscription',
      templateUrl: 'user/views/user.account.subscription.settings.tpl.html' 
    }) 
    .state('account.user.payment', {
      url: '/payment',
      templateUrl: 'user/views/user.account.payment.settings.tpl.html' 
    }) 
    .state('account.user.paymenthistory', {
      url: '/paymenthistory',
      templateUrl: 'user/views/user.account.paymenthistory.settings.tpl.html' 
    })     
    .state('account.org', {
      url: '/org',
      views: {
        'account-navigation' : {
          templateUrl:  'org/manageorg/views/org.account.settings.nav.tpl.html',
          controller: 'ManageAccountController'
        },
        'account-settings' : {
          abstract: true,
          templateUrl:  'org/manageorg/views/org.account.settings.tpl.html',
          controller: 'ManageAccountController'
        }
      }
    })
    .state('account.org.general', {
      url: '/general',
      templateUrl: 'org/manageorg/views/org.account.general.settings.tpl.html',
      controller: 'ManageAccountController' 
    })  
    .state('account.org.location', {
      url: '/location',
      templateUrl: 'org/manageorg/views/org.account.location.settings.tpl.html',
      controller: 'ManageAccountController'  
    })
    .state('account.org.groupinvites', {
      url: '/invites',
      templateUrl: 'org/manageorg/views/org.account.groupinvites.settings.tpl.html',
      controller: 'ManageAccountController'  
    })    
    .state('account.org.otherinvites', {
      url: '/invites',
      templateUrl: 'org/manageorg/views/org.account.invites.settings.tpl.html',
      controller: 'ManageAccountController'  
    })  
    .state('account.org.product', {
      url: '/product',
      templateUrl: 'org/manageorg/views/org.account.product.settings.tpl.html',
      controller: 'ManageAccountController'  
    })  
    .state('account.org.subscription', {
      url: '/subscription',
      templateUrl: 'org/manageorg/views/org.account.subscription.settings.tpl.html',
      controller: 'ManageAccountController'  
    }) 
    .state('account.org.payment', {
      url: '/payment',
      templateUrl: 'org/manageorg/views/org.account.payment.settings.tpl.html',
      controller: 'ManageAccountController'  
    }) 
    .state('account.org.paymenthistory', {
      url: '/paymenthistory',
      templateUrl: 'org/manageorg/views/org.account.paymenthistory.settings.tpl.html',
      controller: 'ManageAccountController' 
    })                
  }]) 
 
//.run(['$rootScope', 'UserSessionService', '$state', '$log', function ($rootScope, UserSessionService, $state, $log) {
// 
//    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState){
//   
//      if ((toState.name == 'prodo.wall' || toState.name == 'account.user') && $rootScope.usersession.isLoggedIn && !$rootScope.usersession.isSubscribed && !$rootScope.usersession.isPaymentDone ) {
//      // if ((toState.name == 'prodo.wall') && $rootScope.usersession.isLoggedIn && !$rootScope.usersession.isSubscribed && !$rootScope.usersession.isPaymentDone ) {
//        event.preventDefault();
//      } else if (toState.name == 'prodo.wall' && $rootScope.usersession.isOtpPassword ) {
//        event.preventDefault();
//      };      })
//  }]);
// 