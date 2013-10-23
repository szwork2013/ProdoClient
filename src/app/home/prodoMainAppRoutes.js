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
  }]);