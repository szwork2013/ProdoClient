/**
*User services to address user details from the REST service 
**/
angular.module('prodo.UserApp')

.factory('UserSessionService', ['$rootScope', '$resource', '$http', '$state', '$log', function($rootScope, $resource, $http, $state, $log) {

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
      ManageUser: $resource('/api/user/:userid', {},
      {
        getAllUsers: { method: 'GET', isArray: true },
        getUserSettings: { method: 'GET', params: { userid: '@userid' }, isArray: false},
        updateUserSettings: { method: 'PUT', params: { userid: '@userid' }, isArray: false},
        deleteUserSettings: { method: 'DELETE', params: { userid: '@userid' }}
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
      IsUserLoggedin:  $resource('/api/isloggedin', {},
      {
        checkUserSession: { method: 'GET'}
      }),
      Logout:  $resource('/api/logout', {},
      {
        logoutUser: { method: 'GET'}
      }),
    };
      
    var session = {};
    session.isLoggedIn = false;
    session.currentUser = null;

    session.signinUser= function (userdata) {
      UserService.Signin.signinUser(userdata,     // calling function of UserSigninService to make POST method call to signin user.
      function(success){
        $log.debug(success);
        $rootScope.$broadcast("signinDone", success);
      },
      function(error){
        $log.debug(error);
        $rootScope.$broadcast("signinNotDone", error.status);
        
      });
    }

    session.saveUserSettings= function (userdata) {
      UserService.ManageUser.updateUserSettings({userid: session.currentUser.userid}, userdata,     // calling function of UserSigninService to make POST method call to signin user.
      function(success){
        $log.debug(success);
        $rootScope.$broadcast("updateUserDone", success);
      },
      function(error){
        $log.debug(error);
        $rootScope.$broadcast("updateUserNotDone", error.status);
      });
    }

    session.removeUserSettings= function () {
      UserService.ManageUser.deleteUserSettings({userid: session.currentUser.userid},     // calling function of UserSigninService to make POST method call to signin user.
      function(success){
        $log.debug(success);
        $rootScope.$broadcast("deleteUserDone", success);
      },
      function(error){
        $log.debug(error);
        $rootScope.$broadcast("daleteUserNotDone", error.status);
      });
    }

    session.getUserDetailSettings= function () {
      UserService.ManageUser.getUserSettings({userid: session.currentUser.userid},     // calling function of UserSigninService to make POST method call to signin user.
      function(success){
        $log.debug(success);
        $rootScope.$broadcast("getUserDone", success);
      },
      function(error){
        $log.debug(error);
        $rootScope.$broadcast("getUserNotDone", error.status);
      });
    }

    session.updateUserData = function(userData, $scope){
        session.currentUserData = userData;
      }

    session.forgotPasswordUser= function (userdata) {
      UserService.ForgotPassword.forgotPassword(userdata,     // calling function of UserSigninService to make POST method call to signin user.
      function(success){
        $log.debug(success);
        $rootScope.$broadcast("forgotPasswordDone", success);        },
      function(error){
        $log.debug(error);
        $rootScope.$broadcast("forgotPasswordNotDone", error.status);
      });
    }

    session.resetPasswordUser= function (userdata) {
      UserService.ResetPassword.resetPassword({userid: session.currentUser.userid}, userdata,     // calling function of UserSigninService to make POST method call to signin user.
      function(success){
        $log.debug(success);
        $rootScope.$broadcast("resetPasswordDone", success);        },
      function(error){
        $log.debug(error);
        $rootScope.$broadcast("resetPasswordNotDone", error.status);
      });
    }

    session.regenerateTokenUser= function (userdata) {
      UserService.RegenerateToken.regenerateToken(userdata,     // calling function of UserSigninService to make POST method call to signin user.
      function(success){
        $log.debug(success);
        $rootScope.$broadcast("regenerateTokenDone", success);        },
      function(error){
        $log.debug(error);
        $rootScope.$broadcast("regenerateTokenNotDone", error.status);
      });
    }

    session.init = function () {
        session.resetSession();
      }
      
      session.resetSession = function() {
        session.currentUser = null;
        session.isLoggedIn = false;
      }

      session.logoutUser = function(){
        UserService.Logout.logoutUser(     // calling function of UserSigninService to make POST method call to signin user.
          function(success){
            $log.debug(success.success.message);
            session.resetSession();
            $rootScope.$broadcast("logoutDone", success.success.message); 
          },
          function(error){
            $log.debug(error);
            $rootScope.$broadcast("logoutNotDone", error.status);
          });
          
          // $rootScope.$broadcast("session-changed");
      }

      session.authSuccess = function(userData, $scope){
        session.currentUser = userData;
        session.isLoggedIn = true;
        $rootScope.$broadcast("session", userData);
      }

      session.authfailed = function(){
        session.resetSession();
      }

      session.checkUser= function () {
      UserService.IsUserLoggedin.checkUserSession(     // calling function of UserSigninService to make POST method call to signin user.
      function(success){
        $log.debug(success);
        $rootScope.$broadcast("session-changed", success);    
      },
      function(error){
        $log.debug(error);
        $rootScope.$broadcast("session-changed-failure", error.status);
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

.factory('UserRecaptchaService', ['$http', 'vcRecaptchaService', '$log', function($http, vcRecaptchaService, $log) {
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
       success(function(data, status) {
              $log.debug("success"); 
              $log.debug(data); 
              recaptchaService.handleRecaptchaResponse($scope, data);                      
        }).
       error(function(data, status) {
            $log.debug(status);
            $scope.$broadcast("recaptchaFailure", status); 
            vcRecaptchaService.reload(); 
        });
  }; 
  
  recaptchaService.handleRecaptchaResponse = function($scope, data){
    if (data.success) {
      $log.debug(data.success);
      $scope.$emit("recaptchaDone", "Success");
    } else {
        if (data.error.code== 'AR001') {     // Google recaptcha server down
          $log.debug(data.error.code + " " + data.error.message);

          $state.transitionTo('home.start');
        }
        else {
        $log.debug(data.error.message);
         $scope.$emit("recaptchaNotDone", "Failure");
        vcRecaptchaService.reload(); 
        }
        // on error in signup transition occurs to error notification page
      }
  }  
  
  return recaptchaService;
}]);