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
    .state('emailverification', {
      url: '',
      templateUrl: 'home/landing/views/home.signup.verification.tpl.html',
      controller: 'UserRegistrationController'
    })  
    .state('emailrejection', {
      url: '',
      templateUrl: 'home/landing/views/home.signup.rejection.tpl.html',
      controller: 'UserRegistrationController'
    }) 
    .state('signin', {
      url: '/signin',
      templateUrl: 'home/landing/views/home.signin.tpl.html',
      controller: 'UserSigninController'
    })  
    .state('staticContent', {
      url: '',
      abstract: true,
      templateUrl: 'home/landing/views/static.content.tpl.html'
    })    
    .state('staticContent.terms', {
      url: '/prodoterms',
      templateUrl: 'home/landing/views/prodo.general.terms.tpl.html',
      controller: 'UserRegistrationController' 
    })    
  }]);