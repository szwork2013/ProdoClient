/**
* User templates related routing configuration
**/

angular.module('prodo.UserApp')
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {  
  
  $stateProvider
  	.state('home', {
      abstract: true,
      templateUrl: 'user/views/user.registration.container.html'
    })    
    .state('home.signup', {
      views: {
        'marketing' : {
          templateUrl:  'prodo/landing/views/prodo.home.marketing.tpl.html'
        },
        'signup-signin' : {
          templateUrl:  'user/views/user.signup.tpl.html'
        }
      }
    }) 
    .state('home.signin', {
      url: '/signin',
      views: {
        'marketing' : {
          templateUrl:  'prodo/landing/views/prodo.home.marketing.tpl.html'
        },
        'signup-signin' : {
          templateUrl:  'user/views/user.signin.tpl.html'
        }
      }
    }) 
    .state('account', {
      abstract: true,
      templateUrl: 'user/views/user.account.settings.container.html'
    })    
    .state('account.user', {
      templateUrl:  'user/views/user.account.settings.tpl.html',
      controller: 'UserAccountController'
    })
    .state('user-content', {
      abstract: true,
      templateUrl: 'user/views/user.content.container.html'
    }) 
    .state('user-content.emailverification', {
      templateUrl: 'user/views/user.signup.verification.tpl.html',
      controller: 'UserRegistrationController'
    })  
    .state('user-content.activateaccount', {
      templateUrl: 'user/views/user.signup.activateaccount.tpl.html',
      controller: 'UserRegistrationController'
    }) 
    .state('user-content.regeneratetoken', {
      templateUrl: 'user/views/user.signup.regeneratetoken.tpl.html',
      controller: 'UserRegistrationController'
    })    
    .state('user-content.forgotpassword', {
      templateUrl: 'user/views/user.signin.forgotpassword.tpl.html',
      controller: 'UserSigninController'
    })    
    .state('user-content.resetpassword', {
      templateUrl: 'user/views/user.signin.resetpassword.tpl.html',
      controller: 'UserSigninController'
    }) 
    .state('user-content.passwordgeneratetoken', {
      templateUrl: 'user/views/user.signin.forgotpassword.regeneratetoken.tpl.html',
      controller: 'UserSigninController'
    })  

  }]);
 