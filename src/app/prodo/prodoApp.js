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
    growlProvider.globalTimeToLive(15000);
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
  function ($scope, $rootScope, $state, $log, $location, growl, UserSessionService, OrgRegistrationService) {
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

    var cleanupEventSession_Changed_Failure = $scope.$on('session-changed-failure', function (event, message) {
        $scope.showAlert('alert-danger', 'Server Error: ' + message);
        cleanupEventSession_Changed_Failure();
      });

    var cleanupEventSessionDone = $rootScope.$on('session', function (event, data) {
        $log.debug(data);
        if ($rootScope.usersession.isLoggedIn) {
          if ($scope.locationPath == '/message/resetpassword') {
            $state.transitionTo('user-content.resetpassword');
          } else {
            if (data.prodousertype == 'business' && data.org == undefined) {
              $state.transitionTo('orgregistration.company');
            } else if ((data.prodousertype == 'business' || data.prodousertype == 'individual')  && data.hasDonePayment) {
                if (data.products_followed == null && data.products_followed == undefined) {
                  $log.debug('There is some problem with the database. Please contact support.')
                } else if (data.products_followed.length > 0) {
                    var n = data.products_followed.length - 1;
                    $rootScope.orgid= data.products_followed[n].orgid;
                    $rootScope.product_prodle= data.products_followed[n].prodle;
                    for (var i=0;i<data.products_followed.length;i++){
                      if(data.products_followed[i] && data.products_followed[i].prodle){
                        var prodle = data.products_followed[i].prodle;
                      }
                      $scope.prodlesfollowed.push(prodle);
                    }
                  UserSessionService.getProductFollowed($scope.prodlesfollowed);
                }
                if (data.org) {
                  $rootScope.orgid = data.org.orgid;
                  $state.transitionTo('prodo.wall.org');
                  // OrgRegistrationService.getOrgDetailSettings($rootScope.orgid);
                } else if (data.products_followed.length > 0) {
                    var n = data.products_followed.length - 1;
                    $rootScope.orgid= data.products_followed[n].orgid;
                    $state.transitionTo('prodo.wall.org');
                }
            } 
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
        $state.transitionTo('prodo.wall.org'); 
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
