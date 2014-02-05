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
    .state('home', {
      url: '',
      abstract: true,
      templateUrl: 'home/landing/views/home.tpl.html'
    })    
    .state('home.start', {
      url: '/signup',
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
      url: '/message',
      abstract: true,
      templateUrl: 'home/landing/views/message.content.tpl.html'
    })    
    .state('messageContent.aboutus', {
      url: '/prodo-aboutus',
      templateUrl: 'home/landing/views/prodo.aboutus.tpl.html',
      controller: 'UserRegistrationController' 
    })
    .state('messageContent.terms', {
      url: '/prodo-terms',
      templateUrl: 'home/landing/views/prodo.general.terms.tpl.html',
      controller: 'UserRegistrationController' 
    })
    .state('messageContent.privacy', {
      url: '/prodo-privacy',
      templateUrl: 'home/landing/views/prodo.privacy.tpl.html',
      controller: 'UserRegistrationController' 
    })
    .state('messageContent.business', {
      url: '/prodo-business',
      templateUrl: 'home/landing/views/prodo.business.tpl.html',
      controller: 'UserRegistrationController' 
    })
    .state('messageContent.advertising', {
      url: '/prodo-advertising',
      templateUrl: 'home/landing/views/prodo.advertising.tpl.html',
      controller: 'UserRegistrationController' 
    })
    .state('messageContent.application', {
      url: '/prodo-application',
      templateUrl: 'home/landing/views/prodo.application.tpl.html',
      controller: 'UserRegistrationController' 
    })
    .state('messageContent.support', {
      url: '/prodo-support',
      templateUrl: 'home/landing/views/prodo.support.tpl.html',
      controller: 'UserRegistrationController' 
    })
    .state('messageContent.contactus', {
      url: '/prodo-contactus',
      templateUrl: 'home/landing/views/prodo.contactus.tpl.html',
      controller: 'UserRegistrationController' 
    })
    .state('messageContent.emailverification', {
      url: '/emailverification',
      templateUrl: 'home/landing/views/home.signup.verification.tpl.html',
      controller: 'UserRegistrationController'
    })  
    .state('messageContent.activateaccount', {
      url: '/activateaccount',
      templateUrl: 'home/landing/views/home.signup.activateaccount.tpl.html',
      controller: 'UserRegistrationController'
    }) 
    .state('messageContent.resetGenerateToken', {
      url: '/regeneratetoken',
      templateUrl: 'home/landing/views/home.signup.regeneratetoken.tpl.html',
      controller: 'UserRegistrationController'
    })    
    .state('messageContent.forgotPassword', {
      url: '/forgotpassword',
      templateUrl: 'user/views/user.signin.forgotpassword.tpl.html',
      controller: 'UserSigninController'
    })    
    .state('messageContent.resetPassword', {
      url: '/resetpassword',
      templateUrl: 'user/views/user.signin.resetpassword.tpl.html',
      controller: 'UserSigninController'
    })  
  }])