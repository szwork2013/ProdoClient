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
angular.module('prodo.UploadApp', []);
var app = angular.module('prodo.ProdonusApp', [
    'ui.router',
    'ui.bootstrap',
    '$strap.directives',
    'vcRecaptcha',
    'ngResource',
    'ngAnimate',
    'tags-input',
    'prodo.UserApp',
    'prodo.ProdoWallApp',
    'prodo.OrgApp',
    'prodo.ProductApp',
    'prodo.ProdoCommentApp',
    'prodo.WarrantyApp',
    'prodo.DashboardApp',
    'prodo.ContentApp',
    'prodo.CommonApp',
    'prodo.BlogApp',
    'prodo.AdApp',
    'prodo.AdminApp',
    'prodo.UploadApp'
  ]);
app.config([
  '$logProvider',
  function ($logProvider) {
    $logProvider.debugEnabled(true);
  }
]);
app.run([
  '$rootScope',
  'UserSessionService',
  'OrgRegistrationService',
  '$log',
  function ($rootScope, UserSessionService, OrgRegistrationService, $log) {
    UserSessionService.checkUser();
    $rootScope.usersession = UserSessionService;
    $rootScope.organizationData = OrgRegistrationService;
    $rootScope.$log = $log;
  }
]);
app.controller('ProdoMainController', [
  '$scope',
  '$rootScope',
  '$state',
  '$log',
  'UserSessionService',
  function ($scope, $rootScope, $state, $log, UserSessionService) {
    $state.transitionTo('home.start');
    var cleanupEventSession_Changed = $scope.$on('session-changed', function (event, message) {
        $log.debug(message);
        if (message.success) {
          UserSessionService.authSuccess(message.success.user);
          cleanupEventSession_Changed();
        } else {
          UserSessionService.authfailed();
          $state.transitionTo('home.start');
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