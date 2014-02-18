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
  'ngAnimate',
  '$strap.directives',
  'vcRecaptcha',
  'ngResource',
  'tags-input',
  'ngCookies',
  'angular-growl',
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
  '$logProvider', 'growlProvider', '$httpProvider',
  function ($logProvider, growlProvider) {
    $logProvider.debugEnabled(true);
    growlProvider.globalTimeToLive(20000);
    growlProvider.onlyUniqueMessages(true);      
    growlProvider.messagesKey("errors");
    growlProvider.messageTextKey("message");
    growlProvider.messageSeverityKey("field");
  }
]).run([
  '$rootScope',
  'UserSessionService',
  'OrgRegistrationService',
  '$log',
  'growl',
  function ($rootScope, UserSessionService, OrgRegistrationService, $log, growl) {
    UserSessionService.checkUser();
    $rootScope.usersession = UserSessionService;
    $rootScope.organizationData = OrgRegistrationService;
    $rootScope.$log = $log;
  }
]).controller('ProdoMainController', [
  '$scope',
  '$rootScope',
  '$state',
  '$log',
  '$location',
  'growl',
  'UserSessionService',
  'OrgRegistrationService',
  'UserSubscriptionService',
  function ($scope, $rootScope, $state, $log, $location, growl, UserSessionService, OrgRegistrationService, UserSubscriptionService) {
    $state.transitionTo('home.signup');
    $scope.isShown = false;
    $scope.prodlesfollowed = [{}];
    $scope.showSignin = function () {
      $scope.isShown = true;
      $state.transitionTo('home.signin');
    };
    $scope.showSignup = function () {
      $scope.isShown = false;
      $state.transitionTo('home.signup');
    };

    $scope.$watch('locationPath', function(path) {
      $location.path(path);
    });
  
    $scope.$watch(function() {
      return $location.path();
    }, function(path) {
    $scope.locationPath = path;
    });

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
        $state.transitionTo('home.signup');
        $scope.showAlert('alert-danger', 'Server Error: ' + message);
        cleanupEventSession_Changed_Failure();
      });
    var cleanupEventSessionDone = $rootScope.$on('session', function (event, data) {
        $log.debug(data);
        if ($rootScope.usersession.isLoggedIn) {
          if (data.products_followed == null && data.products_followed == undefined) {
            $log.debug('There is some problem with the database. Please contact support.')
          } else if (data.products_followed.length > 0) {
            $rootScope.orgid= data.products_followed[0].orgid;
            $rootScope.product_prodle= data.products_followed[0].prodle;
            for (var i=0;i<data.products_followed.length;i++){
              if(data.products_followed[i] && data.products_followed[i].prodle){
                var prodle = data.products_followed[i].prodle;
              }
              $scope.prodlesfollowed.push(prodle);
            }
            UserSessionService.getProductFollowed($scope.prodlesfollowed);
          }
        if ($scope.locationPath == '/message/resetpassword') {
          $state.transitionTo('user-content.resetpassword');
          }
            else if (data.hasDonePayment && data.org) {
            OrgRegistrationService.getOrgDetailSettings();
          } else if (!data.isSubscribed) {
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
          } else if (data.hasDonePayment) {
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
          $state.transitionTo('home.signup');
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
