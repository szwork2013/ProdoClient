/**
*User services to address user details from the REST service 
**/
angular.module('prodo.UserApp')

.factory('UserSessionService', ['$rootScope', '$resource', '$http', function($rootScope, $resource, $http) {

    var UserService = 
      {
      Signup: $resource('/api/user/signup', {},
      {
        saveUser: { method: 'POST'}
      }),
      Signin:  $resource('/api/user/signin', {},
      {
        signinUser: { method: 'POST'}
      }),
      ForgotPassword:  $resource('/api/user/forgotpassword', {},
      {
        forgotPassword: { method: 'POST'}
      }),
      ResetPassword: $resource('/api/user/resetpassword/:userid', {},
      {
        resetPassword: { method: 'PUT', params: { userid: '@userid' }, isArray: false}
      }),
      RegenerateToken:  $resource('/api/regenerateverificationtoken', {},
      {
        regenerateToken: { method: 'POST'}
      }),
      IsUserLoggedin:  $resource('/api/isLogin', {},
      {
        checkUserSession: { method: 'GET'}
      }),
    };
      
    var session = {};
    session.isLogged = 0;
    session.currentUser = 0;

      session.signinUser= function (userdata) {
        UserService.Signin.signinUser(userdata,     // calling function of UserSigninService to make POST method call to signin user.
        function(success){
          console.log(success);
          $rootScope.$broadcast("signinDone", success);
        },
        function(error){
          console.log(error);
        });
      }

      session.forgotPasswordUser= function (userdata) {
        UserService.ForgotPassword.forgotPassword(userdata,     // calling function of UserSigninService to make POST method call to signin user.
        function(success){
          console.log(success);
          $rootScope.$broadcast("forgotPasswordDone", success);        },
        function(error){
          console.log(error);
        });
      }

      session.resetPasswordUser= function (userdata) {
        UserService.ResetPassword.resetPassword({userid: session.currentUser}, userdata,     // calling function of UserSigninService to make POST method call to signin user.
        function(success){
          console.log(success);
          $rootScope.$broadcast("resetPasswordDone", success);        },
        function(error){
          console.log(error);
        });
      }

      session.regenerateTokenUser= function (userdata) {
        UserService.RegenerateToken.regenerateToken(userdata,     // calling function of UserSigninService to make POST method call to signin user.
        function(success){
          console.log(success);
          $rootScope.$broadcast("regenerateTokenDone", success);        },
        function(error){
          console.log(error);
        });
      }

      session.init = function () {
          session.resetSession();
        }
        
        session.resetSession = function() {
          session.currentUser = null;
          session.isLoggedIn = false
        }

        // session.logout = function(){
        //   var scope = this;
        //   $http.delete('/auth').success(function() {
        //     scope.resetSession();
        //     $rootScope.$broadcast("session-changed");
        //   });
        // }

        session.authSuccess = function(userData, $scope){
          session.currentUser = userData;
          console.log(userData);
          session.isLoggedIn = true;
      });
        }

        session.authfailed = function(){
          session.resetSession();
        }

        session.checkUser= function () {
        UserService.IsUserLoggedin.checkUserSession(     // calling function of UserSigninService to make POST method call to signin user.
        function(success){
          console.log(success);
          $rootScope.$broadcast("session-changed", success);        },
        function(error){
          console.log(error);
        });
      }

           
    return session;
}])

.factory('UserSignupService', ['$resource', function($resource) {
  return $resource('/api/user/signup', {},
    {
      saveUser: { method: 'POST'},
      // findAllUsers: { method: 'GET', isArray: true },
      // findByUserId: { method: 'GET', params: { userId : 'id' }},
      // updateUser: { method: 'PUT', params: { userid: '@userid' }, isArray: false},
      // deleteUser: { method: 'DELETE', params: { userid: '@userid' }}
  });
}])

.factory('UserRecaptchaService', ['$http', 'vcRecaptchaService', function($http, vcRecaptchaService) {
  var recaptchaService= {};
     
  recaptchaService.validate = function($scope) {
    var method = 'POST';
    var inserturl =  '/api/recaptcha'; // URL where the Node.js server is running
    var recaptchadata = 
    { 
      recaptcha: 
              {
              response:  Recaptcha.get_response(),
              challenge: Recaptcha.get_challenge()
              }
    }; 

    var jdata = JSON.stringify(recaptchadata); // The data is to be string.
    
    $http({ 
           method: method,
           url: inserturl,
           data:  jdata ,
           headers: {'Content-Type': 'application/json'},
          }).
       success(function(data) {
              console.log("success"); 
              console.log(data); 
              recaptchaService.handleRecaptchaResponse($scope, data);                      
        }).
       error(function(data) {
            console.log('Failed validation'); 
            vcRecaptchaService.reload(); 
        });
  }; 
  
  recaptchaService.handleRecaptchaResponse = function($scope, data){
    if (data.success) {
      console.log(data.success);
      $scope.$emit("recaptchaDone", "Success");
    } else {
        if (data.error.code== 'AR001') {     // Google recaptcha server down
          console.log(data.error.code + " " + data.error.message);

          $state.transitionTo('home.start');
        }
        else {
        console.log(data.error.message);
         $scope.$emit("recaptchaNotDone", "Failure");
        vcRecaptchaService.reload(); 
        }
        // on error in signup transition occurs to error notification page
      }
  }  
  
  return recaptchaService;
}]);
     
 
// function UserController($scope, UserService) {
//   $scope.user = {};

//   $scope.$watch('userSession', function() {
//     UserService.addUserSession($scope.user);
//   });

//   $scope.$on('session-changed', function() {
//     $scope.user = UserService.;getUserSEssion();
//   });
// }


