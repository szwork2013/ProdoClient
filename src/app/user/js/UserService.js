angular.module('prodo.UserApp').factory('UserSessionService', [
  '$rootScope',
  '$resource',
  '$http',
  '$state',
  '$log',
  function ($rootScope, $resource, $http, $state, $log) {
    var UserService = {
        Signup: $resource('/api/user/signup', {}, { saveUser: { method: 'POST' } }),
        Signin: $resource('/api/user/signin', {}, { signinUser: { method: 'POST' } }),
        ManageUser: $resource('/api/user/:userid', {}, {
          getAllUsers: {
            method: 'GET',
            isArray: true
          },
          getUserSettings: {
            method: 'GET',
            params: { userid: '@userid' },
            isArray: false
          },
          updateUserSettings: {
            method: 'PUT',
            params: { userid: '@userid' },
            isArray: false
          },
          deleteUserSettings: {
            method: 'DELETE',
            params: { userid: '@userid' }
          }
        }),
        User_Invites: $resource('/api/userinvites', {}, {
          sendUserInvites: { 
            method: 'POST', 
            isArray: false
          }
        }),
        Update_Email: $resource('/api/changeemail/:userid', {}, {
          updateEmailSettings: { 
            method: 'POST',
            params: { userid: '@userid' }, 
            isArray: false
          }
        }),
        Change_Password: $resource('/api/changepassword/:userid', {}, {
          updatePasswordSettings: { 
            method: 'POST', 
            params: { userid: '@userid' },
            isArray: false
          }
        }),
        ForgotPassword: $resource('/api/user/forgotpassword', {}, { forgotPassword: { method: 'POST' } }),
        ResetPassword: $resource('/api/user/resetpassword/:userid', {}, {
          resetPassword: {
            method: 'PUT',
            params: { userid: '@userid' },
            isArray: false
          }
        }),
        RegenerateToken: $resource('/api/regenerateverificationtoken', {}, { regenerateToken: { method: 'POST' } }),
        IsUserLoggedin: $resource('/api/isloggedin', {}, { checkUserSession: { method: 'GET' } }),
        Logout: $resource('/api/logout', {}, { logoutUser: { method: 'GET' } }),
        Product_Followed: $resource('/api/myproductsfollowed?prodles=:data', {}, {
          getProduct_Followed: { 
            method: 'GET', 
            params: { data: '@data' }
          }
        }),
        Product_Recommend: $resource('/api/myrecommendproducts?prodles=:data', {}, {
          getProduct_Recommend: { 
            method: 'GET', 
            params: { data: '@data' }
          }
        }),
        Product_Unfollow: $resource('/api/user/followun/:data', {}, {
          followUnProduct: { 
            method: 'GET', 
            params: { data: '@data' }
          }
        }),
        User_Profile: $resource('/api/profileinfo/:userid', {}, {
          getUserProfile: {
            method: 'GET',
            params: { userid: '@userid' }
          }
        })
      };
    var session = {};
    session.isLoggedIn = false;
    session.currentUser = null;
    session.productfollowlist = {};
    session.signinUser = function (userdata) {
      UserService.Signin.signinUser(userdata, function (success) {
        $log.debug(success);
        $rootScope.$broadcast('signinDone', success);
      }, function (error) {
        $log.debug(error);
        $rootScope.$broadcast('signinNotDone', error.status);
      });
    };

    session.getUserProfileData = function (userData) {
      UserService.User_Profile.getUserProfile({ userid: userData }, function (success) {
        $log.debug(success);
        $rootScope.$broadcast('getUserDataDone', success);
      }), function (error) {
        $log.debug(error);
        $rootScope.$broadcast('getUserDataNotDone', error);
      };
    };

    session.saveUserSettings = function (userdata) {
      UserService.ManageUser.updateUserSettings({ userid: session.currentUser.userid }, userdata, function (success) {
        $log.debug(success);
        $rootScope.$broadcast('updateUserDone', success);
      }, function (error) {
        $log.debug(error);
        $rootScope.$broadcast('updateUserNotDone', error.status);
      });
    };

    session.updateEmail = function (userdata) {
      UserService.Update_Email.updateEmailSettings({ userid: session.currentUser.userid }, userdata, function (success) {
        $log.debug(success);
        $rootScope.$broadcast('updateUserEmailDone', success);
      }, function (error) {
        $log.debug(error);
        $rootScope.$broadcast('updateUserEmailNotDone', error.status);
      });
    };

    session.updatePassword = function (userdata) {
      UserService.Change_Password.updatePasswordSettings({ userid: session.currentUser.userid }, userdata, function (success) {
        $log.debug(success);
        $rootScope.$broadcast('updateUserPasswordDone', success);
      }, function (error) {
        $log.debug(error);
        $rootScope.$broadcast('updateUserPasswordNotDone', error.status);
      });
    };

    session.getProductFollowed = function (prodledata) {
      UserService.Product_Followed.getProduct_Followed({ data: prodledata }, function (success) {
        $log.debug(success);
        session.productfollowlist = success.success.products;
        $rootScope.$broadcast('getProductFollowedDone', success);
      }, function (error) {
        $log.debug(error);
        $rootScope.$broadcast('getProductFollowedNotDone', error);
      });
    };

    session.getProductRecommend = function (prodledata) {
      UserService.Product_Recommend.getProduct_Recommend({ data: prodledata }, function (success) {
        $log.debug(success);
        $rootScope.$broadcast('getProductRecommendDone', success);
      }, function (error) {
        $log.debug(error);
        $rootScope.$broadcast('getProductRecommendNotDone', error);
      });
    };

    session.unfollowProduct = function (pdata) {
      UserService.Product_Unfollow.followUnProduct({ data: pdata }, function (success) {
        $log.debug(success);
        $rootScope.$broadcast('unfollowProductDone', success);
      }, function (error) {
        $log.debug(error);
        $rootScope.$broadcast('unfollowProductNotDone', error);
      });
    };

    session.sendInvites = function (udata) {
      UserService.User_Invites.sendUserInvites(udata, function (success) {
        $log.debug(success);
        $rootScope.$broadcast('sendUserInvitesDone', success);
      }, function (error) {
        $log.debug(error);
        $rootScope.$broadcast('sendUserInvitesNotDone', error);
      });
    };

    session.removeUserSettings = function () {
      UserService.ManageUser.deleteUserSettings({ userid: session.currentUser.userid }, function (success) {
        $log.debug(success);
        $rootScope.$broadcast('deleteUserDone', success);
      }, function (error) {
        $log.debug(error);
        $rootScope.$broadcast('daleteUserNotDone', error.status);
      });
    };
    session.getUserDetailSettings = function () {
      UserService.ManageUser.getUserSettings({ userid: session.currentUser.userid }, function (success) {
        $log.debug(success);
        $rootScope.$broadcast('getUserDone', success);
      }, function (error) {
        $log.debug(error);
        $rootScope.$broadcast('getUserNotDone', error.status);
      });
    };
    session.updateUserData = function (userData, $scope) {
      session.currentUserData = userData;
    };
    session.forgotPasswordUser = function (userdata) {
      UserService.ForgotPassword.forgotPassword(userdata, function (success) {
        $log.debug(success);
        $rootScope.$broadcast('forgotPasswordDone', success);
      }, function (error) {
        $log.debug(error);
        $rootScope.$broadcast('forgotPasswordNotDone', error.status);
      });
    };
    session.resetPasswordUser = function (userdata) {
      UserService.ResetPassword.resetPassword({ userid: session.currentUser.userid }, userdata, function (success) {
        $log.debug(success);
        $rootScope.$broadcast('resetPasswordDone', success);
      }, function (error) {
        $log.debug(error);
        $rootScope.$broadcast('resetPasswordNotDone', error.status);
      });
    };
    session.regenerateTokenUser = function (userdata) {
      UserService.RegenerateToken.regenerateToken(userdata, function (success) {
        $log.debug(success);
        $rootScope.$broadcast('regenerateTokenDone', success);
      }, function (error) {
        $log.debug(error);
        $rootScope.$broadcast('regenerateTokenNotDone', error.status);
      });
    };
    session.init = function () {
      session.resetSession();
    };
    session.resetSession = function () {
      session.currentUser = null;
      session.isLoggedIn = false;
    };
    session.logoutUser = function () {
      UserService.Logout.logoutUser(function (success) {
        $log.debug(success.success.message);
        session.resetSession();
        $rootScope.$broadcast('logoutDone', success.success.message);
      }, function (error) {
        $log.debug(error);
        $rootScope.$broadcast('logoutNotDone', error.status);
      });
    };
    session.authSuccess = function (userData, $scope) {
      session.currentUser = userData;
      session.isLoggedIn = true;
      $rootScope.$broadcast('session', userData);
    };
    session.authfailed = function () {
      session.resetSession();
    };
    session.checkUser = function () {
      UserService.IsUserLoggedin.checkUserSession(function (success) {
        $log.debug(success);
        $rootScope.$broadcast('session-changed', success);
      }, function (error) {
        $log.debug(error);
        $rootScope.$broadcast('session-changed-failure', error.status);
      });
    };
    return session;
  }
]).factory('UserSignupService', [
  '$resource',
  function ($resource) {
    return $resource('/api/user/signup', {}, { saveUser: { method: 'POST' } });
  }
]).factory('UserRecaptchaService', [
  '$http',
  'vcRecaptchaService',
  '$log',
  function ($http, vcRecaptchaService, $log) {
    var recaptchaService = {};
    recaptchaService.validate = function ($scope) {
      var method = 'POST';
      var inserturl = '/api/recaptcha';
      var recaptchadata = {
          recaptcha: {
            response: Recaptcha.get_response(),
            challenge: Recaptcha.get_challenge()
          }
        };
      var jdata = JSON.stringify(recaptchadata);
      $http({
        method: method,
        url: inserturl,
        data: jdata,
        headers: { 'Content-Type': 'application/json' }
      }).success(function (data, status) {
        $log.debug('success');
        $log.debug(data);
        recaptchaService.handleRecaptchaResponse($scope, data);
      }).error(function (data, status) {
        $log.debug(status);
        $scope.$broadcast('recaptchaFailure', status);
        vcRecaptchaService.reload();
      });
    };
    recaptchaService.handleRecaptchaResponse = function ($scope, data) {
      if (data.success) {
        $log.debug(data.success);
        $scope.$emit('recaptchaDone', 'Success');
      } else {
        if (data.error.code == 'AR001') {
          $log.debug(data.error.code + ' ' + data.error.message);
          $state.transitionTo('home.start');
        } else {
          $log.debug(data.error.message);
          $scope.$emit('recaptchaNotDone', 'Failure');
          vcRecaptchaService.reload();
        }
      }
    };
    return recaptchaService;
  }
]);
