angular.module('prodo.CommonApp', []);
angular.module('prodo.UserApp', []);
angular.module('prodo.ProdoWallApp', []);
angular.module('prodo.OrgApp', []);
angular.module('prodo.ProductApp', []);
angular.module('prodo.ProdoCommentApp', []);
angular.module('prodo.WarrantyApp', []);
angular.module('prodo.DashboardApp', []);
angular.module('prodo.ContentApp', []);
angular.module('prodo.BlogApp', []);
angular.module('prodo.AdApp', []);
angular.module('prodo.AdminApp', []);
angular.module('prodo.SubscriptionApp', []);
angular.module('prodo.UploadApp', []);
angular.module('prodo.ProdonusApp', [
  'ui.router',
  'ui.bootstrap',
  'xeditable',
  'ngAnimate',
  '$strap.directives',
  'vcRecaptcha',
  'ngResource',
  'tags-input',
  'prodo.CommonApp',
  'prodo.UserApp',
  'prodo.ProdoWallApp',
  'prodo.OrgApp',
  'prodo.ProductApp',
  'prodo.ProdoCommentApp',
  'prodo.WarrantyApp',
  'prodo.DashboardApp',
  'prodo.ContentApp',
  'prodo.BlogApp',
  'prodo.AdApp',
  'prodo.AdminApp',
  'prodo.SubscriptionApp',
  'prodo.UploadApp',
  'config'
]).config([
  '$logProvider',
  function ($logProvider) {
    $logProvider.debugEnabled(true);
  }
]).run([
  '$rootScope',
  'UserSessionService',
  'OrgRegistrationService',
  '$log',
  'editableOptions',
  function ($rootScope, UserSessionService, OrgRegistrationService, $log, editableOptions) {
    UserSessionService.checkUser();
    $rootScope.usersession = UserSessionService;
    $rootScope.organizationData = OrgRegistrationService;
    $rootScope.$log = $log;
    editableOptions.theme = 'bs3';
  }
]).controller('ProdoMainController', [
  '$scope',
  '$rootScope',
  '$state',
  '$log',
  'UserSessionService',
  'OrgRegistrationService',
  'UserSubscriptionService',
  function ($scope, $rootScope, $state, $log, UserSessionService, OrgRegistrationService, UserSubscriptionService) {
    $state.transitionTo('home.start');
    $scope.isShown = false;
    $scope.showSignin = function () {
      $scope.isShown = true;
      $state.transitionTo('home.signin');
    };
    $scope.showSignup = function () {
      $scope.isShown = false;
      $state.transitionTo('home.start');
    };
    var cleanupEventSession_Changed = $scope.$on('session-changed', function (event, message) {
        $log.debug(message);
        if (message.success) {
          UserSessionService.authSuccess(message.success.user);
          cleanupEventSession_Changed();
        } else {
          UserSessionService.authfailed();
          cleanupEventSession_Changed();
        }
        ;
      });
    var cleanupEventSession_Changed_Failure = $scope.$on('session-changed-failure', function (event, message) {
        UserSessionService.authfailed();
        $state.transitionTo('home.start');
        $scope.showAlert('alert-danger', 'Server Error: ' + message);
        cleanupEventSession_Changed_Failure();
      });
    var cleanupEventSessionDone = $rootScope.$on('session', function (event, data) {
        $log.debug(data);
        if ($rootScope.usersession.isLoggedIn) {
          if (data.isOtpPassword) {
            $state.transitionTo('messageContent.resetPassword');
          } else if (!data.isOtpPassword && !data.isSubscribed) {
            UserSubscriptionService.getPlan();
          } else if (data.isSubscribed && !data.subscriptionExpired && !data.hasDonePayment) {
            $state.transitionTo('subscription.payment', {
              planid: data.subscription.planid,
              plantype: data.usertype
            });
          } else if (data.isSubscribed && data.subscriptionExpired) {
            $state.transitionTo('subscription.payment', {
              planid: data.subscription.planid,
              plantype: data.usertype
            });
          } else if (data.org.orgid) {
            OrgRegistrationService.getOrgDetailSettings();
          } else {
            $state.transitionTo('prodo.wall');
          }
        }
        cleanupEventSessionDone();
      });
    $scope.handleGetOrgResponse = function (data) {
      if (data.success) {
        OrgRegistrationService.updateOrgData(data.success.organization);
        $scope.showAlert('alert-success', data.success.message);
      } else {
        $log.debug(data.error.message);
        $scope.showAlert('alert-danger', data.error.message);
      }
    };
    var cleanupEventGetOrgDone = $rootScope.$on('getOrgDone', function (event, message) {
        $scope.handleGetOrgResponse(message);
        cleanupEventGetOrgDone();
      });
    var cleanupEventGetOrgNotDone = $rootScope.$on('getOrgNotDone', function (event, message) {
        $scope.showAlert('alert-danger', 'Server Error:' + message);
        cleanupEventGetOrgNotDone();
      });

      var cleanupEventSendOrgData = $rootScope.$on("sendOrgData", function(event, data){
        $scope.org = data;
        $state.transitionTo('prodo.wall'); 
        cleanupEventSendOrgData();  

      });
    $scope.logout = function () {
      UserSessionService.logoutUser();
      var cleanupEventLogoutDone = $scope.$on('logoutDone', function (event, message) {
          $state.transitionTo('home.start');
          $scope.showAlert('alert-success', message);
          cleanupEventLogoutDone();
        });
      var cleanupEventLogoutNotDone = $scope.$on('logoutNotDone', function (event, message) {
          $scope.showAlert('alert-danger', 'Server Error:' + message);
          cleanupEventLogoutNotDone();
        });
    };
  }
]);
