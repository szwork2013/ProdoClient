/**
* User templates related routing configuration
**/

angular.module('prodo.UserApp')
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {  
  
  $stateProvider
  	.state('home', {
      abstract: true,
      templateUrl: 'user/views/user.registration.container.html',
      controller: 'ProdoMainController',
      resolve: {
          checkuser: function(UserSessionService, $rootScope) {
            console.log('checkuser');
            var d = UserSessionService.checkUser().$promise;
            return d;
          },
          checkAuthSuccess: function(UserSessionService, $rootScope, checkuser){
            if (checkuser.success) {
             return UserSessionService.authSuccess(checkuser.success.user);
            } else {
             return UserSessionService.authfailed();
            }
          }
        }
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
    .state('account-user', {
      abstract: true,
      templateUrl: 'user/views/user.account.settings.container.html'
    })    
    .state('account-user.user', {
      templateUrl:  'user/views/user.account.settings.tpl.html',
      controller: 'UserAccountController'
    })
    .state('user-content', {
      url: '/user',
      abstract: true,
      templateUrl: 'user/views/user.content.container.html'
    }) 
    .state('user-content.emailverification', {
      url: '/verification',
      templateUrl: 'user/views/user.signup.verification.tpl.html',
      controller: 'UserRegistrationController'
    })  
    .state('user-content.activateaccount', {
      url: '/activateaccount',
      templateUrl: 'user/views/user.signup.activateaccount.tpl.html',
      controller: 'UserRegistrationController'
    }) 
    .state('user-content.regeneratetoken', {
      url: '/regeneratetoken',
      templateUrl: 'user/views/user.signup.regeneratetoken.tpl.html',
      controller: 'UserRegistrationController'
    })    
    .state('user-content.forgotpassword', {
      url: '/forgotpassword',
      templateUrl: 'user/views/user.signin.forgotpassword.tpl.html',
      controller: 'UserSigninController'
    })    
    .state('user-content.resetpassword', {
      url: '/resetpassword',
      templateUrl: 'user/views/user.signin.resetpassword.tpl.html',
      controller: 'UserSigninController'
    }) 
    .state('user-content.passwordregeneratetoken', {
      url: '/passwordregeneratetoken',
      templateUrl: 'user/views/user.signin.forgotpassword.regeneratetoken.tpl.html',
      controller: 'UserSigninController'
    })  

  }]);
 