/**
* Main routing configuration
**/

angular.module('prodo.ProdonusApp')
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {  
  $stateProvider
    .state('footer-content', {
      abstract: true,
      templateUrl: 'prodo/landing/views/prodo.footer.content.container.html'
    })    
    .state('footer-content.aboutus',{ 
      templateUrl: 'prodo/landing/views/prodo.aboutus.tpl.html' 
    })
    .state('footer-content.terms', {
      templateUrl: 'prodo/landing/views/prodo.general.terms.tpl.html' 
    })
    .state('footer-content.privacy',{ 
      templateUrl: 'prodo/landing/views/prodo.privacy.tpl.html'
    })
    .state('footer-content.business',{ 
      templateUrl: 'prodo/landing/views/prodo.business.tpl.html'
    })
    .state('footer-content.advertising', {
      templateUrl: 'prodo/landing/views/prodo.advertising.tpl.html'
    })
    .state('footer-content.application', {
      templateUrl: 'prodo/landing/views/prodo.application.tpl.html' 
    })
    .state('footer-content.support', {
      templateUrl: 'prodo/landing/views/prodo.support.tpl.html'
    })
    .state('footer-content.contactus', {
      templateUrl: 'prodo/landing/views/prodo.contactus.tpl.html'
    })

  }]);




























//     })
 // }]);
