/**
* Main routing configuration
**/

angular.module('prodo.ProdonusApp')
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {  
  $stateProvider
    .state('landing', {
      url: '',
      abstract: true,
      templateUrl: 'home/landing/views/home.landing.tpl.html'
    })    
    .state('landing.start', {
      url: '',
      views: {
        'marketing' : {
          templateUrl:  'home/landing/views/home.landing.marketing.tpl.html'
        },
        'signup' : {
          templateUrl:  'home/landing/views/home.landing.signup.tpl.html'
        }
      }
    }) 
    .state('landing.subscription', {
      url: '',
      abstract: true,
      templateUrl: 'home/landing/views/home.landing.subscription.tpl.html'
    })    
    .state('landing.subscription.plans', {
      url: '/subscription',
      templateUrl: 'home/landing/views/home.landing.subscription.plans.tpl.html'
    })    
    .state('home', {
      url: '/home',
      abstract: true,
      templateUrl: 'home/prodo/views/home.prodo.tpl.html'
    })     
    .state('home.prodo', {
      url: '',
      views: {
        'sidebar' : {
          templateUrl:  'home/landing/views/home.landing.signup.tpl.html'
        },
        'main' : {
          templateUrl:  'home/prodo/views/home.main.tpl.html'
        }
      }
    })     
  }]);