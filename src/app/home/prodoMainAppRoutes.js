/**
* Main routing configuration
**/

angular.module('prodo.ProdonusApp')
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {  
  $stateProvider
    .state('admin', {
      url: '/admin',
      abstract: true,
      templateUrl: 'common/admin/views/prodo.admin.tpl.html'
    })  
    .state('admin.tags', {
      url: '/admin-tags',
      templateUrl: 'common/admin/views/prodo.tag_input.tpl.html',
      controller: "prodoAdminTagInputController"
    })  
    .state('admin.product', {
      url: '/admin-product',
      templateUrl: 'common/admin/views/prodo.product.tpl.html'
    })  
    .state('admin.payment', {
      url: '/admin-payment',
      templateUrl: 'common/admin/views/prodo.payment.tpl.html'
    })  
    .state('home', {
      abstract: true,
      templateUrl: 'home/landing/views/home.tpl.html'
    })    
    .state('home.start', {
      views: {
        'marketing' : {
          templateUrl:  'home/landing/views/home.marketing.tpl.html'
        },
        'signup' : {
          templateUrl:  'home/landing/views/home.signup.tpl.html'
        }
      }
    }) 
    .state('home.signin', {
      url: '/signin',
      views: {
        'marketing' : {
          templateUrl:  'home/landing/views/home.marketing.tpl.html'
        },
        'signup' : {
          templateUrl:  'home/landing/views/home.signin.tpl.html'
        }
      }
    }) 
    .state('messageContent', {
      abstract: true,
      templateUrl: 'home/landing/views/message.content.tpl.html'
    })    
    .state('messageContent.aboutus',{ 
      templateUrl: 'home/landing/views/prodo.aboutus.tpl.html',
      controller: 'UserRegistrationController' 
    })
    .state('messageContent.terms', {
      templateUrl: 'home/landing/views/prodo.general.terms.tpl.html',
      controller: 'UserRegistrationController' 
    })
    .state('messageContent.privacy',{ 
      templateUrl: 'home/landing/views/prodo.privacy.tpl.html',
      controller: 'UserRegistrationController' 
    })
    .state('messageContent.business',{ 
      templateUrl: 'home/landing/views/prodo.business.tpl.html',
      controller: 'UserRegistrationController' 
    })
    .state('messageContent.advertising', {
      templateUrl: 'home/landing/views/prodo.advertising.tpl.html',
      controller: 'UserRegistrationController' 
    })
    .state('messageContent.application', {
      templateUrl: 'home/landing/views/prodo.application.tpl.html',
      controller: 'UserRegistrationController' 
    })
    .state('messageContent.support', {
      templateUrl: 'home/landing/views/prodo.support.tpl.html',
      controller: 'UserRegistrationController' 
    })
    .state('messageContent.contactus', {
      templateUrl: 'home/landing/views/prodo.contactus.tpl.html',
      controller: 'UserRegistrationController' 
    })
    .state('messageContent.emailverification', {
      templateUrl: 'home/landing/views/home.signup.verification.tpl.html',
      controller: 'UserRegistrationController'
    })  
    .state('messageContent.activateaccount', {
      templateUrl: 'home/landing/views/home.signup.activateaccount.tpl.html',
      controller: 'UserRegistrationController'
    }) 
    .state('messageContent.resetGenerateToken', {
      templateUrl: 'home/landing/views/home.signup.regeneratetoken.tpl.html',
      controller: 'UserRegistrationController'
    })    
    .state('messageContent.forgotPassword', {
      templateUrl: 'user/views/user.signin.forgotpassword.tpl.html',
      controller: 'UserSigninController'
    })    
    .state('messageContent.resetPassword', {
      templateUrl: 'user/views/user.signin.resetpassword.tpl.html',
      controller: 'UserSigninController'
    })  
  }])