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
angular.module('prodo.CampaignApp', []);
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
  'prodo.CampaignApp',
  'configSocket'
]).config([
  '$logProvider', 'growlProvider', '$httpProvider',
  function ($logProvider, growlProvider) {
    $logProvider.debugEnabled(true);
    growlProvider.globalTimeToLive(5000);
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
  '$timeout',
  'UserSessionService',
  'OrgRegistrationService',
  function ($scope, $rootScope, $state, $log, $location, growl, $timeout, UserSessionService, OrgRegistrationService) {
    $state.transitionTo('prodo.landing.signup');
    $scope.prodlesfollowed = [{}];
    $scope.showSignin = function () {
      $state.transitionTo('prodo.landing.signin');
    };
    $scope.showSignup = function () {
      $state.transitionTo('prodo.landing.signup');
    };

    $rootScope.ProdoAppMessage = function(message,flag)
    {
      if(flag==='success')
      {
        growl.addSuccessMessage(message); 
        // notify({message:message,template:'common/notification/views/notification-success.html',position:'center'})
      }
      else {
        if (flag==='error') {
          growl.addErrorMessage(message); 
          // notify({message:message,template:'common/notification/views/notification-error.html',position:'center'});
        } else if (flag==='info') {
          growl.addInfoMessage(data.error.message); 
          // notify({message:message,template:'common/notification/views/notification-error.html',position:'center'});
        } else {
          growl.addWarningMessage(data.error.message); 
          // notify({message:message,template:'common/notification/views/notification-error.html',position:'center'});
        } 
      }
          
    };

    var cleanupEventSession_Changed_Failure = $scope.$on('session-changed-failure', function (event, message) {
      UserSessionService.authfailed();
      $state.transitionTo('prodo.landing.signup');
      growl.addErrorMessage("It looks as though we have broken something on our server system. Our support team is notified and will take immediate action to fix it." + message);   
    });

    var cleanupEventSessionDone = $scope.$on('session', function (event, data) {
      if ($rootScope.usersession.isLoggedIn) {
        if (data.prodousertype == 'business' && data.org == undefined) {
          $state.transitionTo('prodo.orgregistration.company');
        } else if ((data.prodousertype == 'business' || data.prodousertype == 'individual')  && data.hasDonePayment) {
            if (data.products_followed == null || data.products_followed == undefined) {
              $log.debug('There is some problem with the database. Please contact support.')
            } else if (data.products_followed.length > 0) {
                var lastProductFollowed = data.products_followed.length - 1;
                $rootScope.orgid= data.products_followed[ lastProductFollowed].orgid;
                $rootScope.product_prodle= data.products_followed[ lastProductFollowed].prodle;
                for (var i=0;i<data.products_followed.length;i++){
                  if(data.products_followed[i] && data.products_followed[i].prodle){
                    var prodle = data.products_followed[i].prodle;
                  }
                  $scope.prodlesfollowed.push(prodle);
                }
              UserSessionService.getProductFollowed($scope.prodlesfollowed, data);
            }
            if (data.isOtpPassword == true) {
              $state.transitionTo('prodo.landing.resetpassword');
            } else {
              if (data.org && data.org.orgtype == 'Manufacturer') {
                $rootScope.orgid = data.org.orgid;
                $log.debug('manufacturer_' + $rootScope.orgid);
                $state.transitionTo('prodo.home.wall-org');
              } else if (data.products_followed.length > 0) {
                var  lastProductFollowed = data.products_followed.length - 1;
                $rootScope.orgid= data.products_followed[ lastProductFollowed].orgid;
                $log.debug('others_' + $rootScope.orgid);
                $state.transitionTo('prodo.home.wall-org');
              } 
            }         
        } 
      }
    });
    
    $scope.logout = function () {
      UserSessionService.logoutUser();
    };
    var cleanupEventLogoutDone = $scope.$on('logoutDone', function (event, message) {
      $log.debug($rootScope.usersession.isLoggedIn);
      $state.transitionTo('prodo.landing.signup');
      growl.addSuccessMessage('You are successfully signed out.');   

    });
    var cleanupEventLogoutNotDone = $scope.$on('logoutNotDone', function (event, message) {
      growl.addErrorMessage("It looks as though we have broken something on our server system. Our support team is notified and will take immediate action to fix it." + message);   
    });

    $scope.$on('$destroy', function(event, message) {
      cleanupEventSession_Changed_Failure(); 
      cleanupEventSessionDone();
      cleanupEventGetProductFollowedDone();           
      cleanupEventLogoutDone();
      cleanupEventLogoutNotDone();      
    });
  }
]);
