/**
* Main routing configuration
**/

angular.module('prodo.ProdonusApp')
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {  
  $stateProvider
    .state('home', {
      url: '',
      abstract: true,
      templateUrl: 'home/landing/views/home.tpl.html'
    })    
    .state('home.start', {
      url: '',
      views: {
        'marketing' : {
          templateUrl:  'home/landing/views/home.marketing.tpl.html'
        },
        'signup' : {
          templateUrl:  'home/landing/views/home.signup.tpl.html'
        }
      }
    }) 
    .state('messageContent', {
      url: '',
      abstract: true,
      templateUrl: 'home/landing/views/message.content.tpl.html'
    })    
    .state('messageContent.terms', {
      url: '/prodoterms',
      templateUrl: 'home/landing/views/prodo.general.terms.tpl.html',
      controller: 'UserRegistrationController' 
    })
    .state('messageContent.emailverification', {
      url: '',
      templateUrl: 'home/landing/views/home.signup.verification.tpl.html',
      controller: 'UserRegistrationController'
    })  
    .state('messageContent.emailrejection', {
      url: '',
      templateUrl: 'home/landing/views/home.signup.rejection.tpl.html',
      controller: 'UserRegistrationController'
    }) 
    .state('messageContent.resetGenerateToken', {
      url: '/regeneratetoken',
      templateUrl: 'home/landing/views/home.signup.regeneratetoken.tpl.html',
      controller: 'UserRegistrationController'
    })  
    .state('messageContent.signin', {
      url: '/signin',
      templateUrl: 'home/landing/views/home.signin.tpl.html',
      controller: 'UserSigninController'
    })   
    .state('messageContent.forgotPassword', {
      url: '/forgotPassword',
      templateUrl: 'user/views/user.signin.forgotpassword.tpl.html',
      controller: 'UserSigninController'
    })    
    .state('messageContent.resetPassword', {
      url: '/resetPassword',
      templateUrl: 'user/views/user.signin.resetpassword.tpl.html',
      controller: 'UserSigninController'
    })      
  }]);