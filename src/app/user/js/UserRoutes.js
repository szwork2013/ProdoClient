/**
* Main routing configuration
**/
angular.module('prodo.UserApp')
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {  
  $urlRouterProvider.otherwise('/user/');
  $stateProvider
    .state('user', {
      abstract: true,
      url: '/user',
      templateUrl: 'main/views/main.home.tpl.html'
    })   
    .state('user.signin', {
        url: '/signin',
        templateUrl:  'user/js/user.signin.tpl.html'
        controller: UserSigninController;
    })
    .state('user.forgotPassword', {
        url: '/forgotPassword',
        templateUrl: 'main/views/user.forgot.password.tpl.html'
    })        
    .state('user.activate', {
        url: '/activate',
        templateUrl: 'main/views/user.forgot.password.tpl.html'
    })
    .state('user.payment', {
        url: '/payment',
        templateUrl: 'main/views/user.forgot.password.tpl.html'
    }) 
    .state('user.resetpassword', {
        url: '/resetpassword',
        templateUrl: 'main/views/user.forgot.password.tpl.html'
    })   
    .state('user.profile', {
        url: '/profile',
        templateUrl: 'main/views/user.forgot.password.tpl.html'
    })            
  }]);