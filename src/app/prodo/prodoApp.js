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
angular.module('prodo.ProdoHomeApp', []);
angular.module('prodo.ProdonusApp', [
  'ui.router',
  'ui.bootstrap',
  'ngAnimate',
  '$strap.directives',
  'vcRecaptcha',
  'ngResource',
  'tags-input',
  'ngCookies',
  'vrdirectivesslider',
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
  'prodo.ProdoHomeApp',
  'configSocket',
]).config([
  '$logProvider', 'growlProvider', '$httpProvider',
  function ($logProvider, growlProvider) {
    $logProvider.debugEnabled(true);
    growlProvider.globalTimeToLive(10000);
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
    $rootScope.$on('$stateChangeSuccess', function(event, to, toParams, from, fromParams) {
      $rootScope.previousState = from.name;
      $rootScope.currentState = to.name;
      var pattern = new RegExp("prodo.productwall");
      var stateresult = pattern.test($rootScope.currentState);
      if ($rootScope.currentState == 'prodo.home.wall') {
        $rootScope.home = 1;
        $rootScope.wall = 0;
        $rootScope.inbox = 0;
      } else if (stateresult) {
        $rootScope.wall = 1;
        $rootScope.home = 0;
        $rootScope.inbox = 0;
      } else if ($rootScope.currentState == 'prodo.inbox.i_wall') {
        $rootScope.wall = 0;
        $rootScope.home = 0;
        $rootScope.inbox = 1;
      } else {
        $rootScope.wall = 0;
        $rootScope.home = 0;
        $rootScope.inbox = 0;
      }

    });
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
  'notify',
  function ($scope, $rootScope, $state, $log, $location, growl, $timeout, UserSessionService, OrgRegistrationService, notify, marketingData) {
    $state.transitionTo('prodo.landing.signup');
    $scope.prodlesfollowed = [{}];
    $rootScope.blogid = "";
    $scope.showSignin = function () {
      $state.transitionTo('prodo.landing.signin');
    };
    $scope.showSignup = function () {
      $state.transitionTo('prodo.landing.signup');
    };

    $rootScope.goState = function() {
      $state.transitionTo($rootScope.previousState);
    };

    $rootScope.ProdoAppMessage = function(message,flag)
    {
      if(flag==='success')
      {
        //growl.addSuccessMessage(message); 
        //notify()
        notify({message:message,template:'common/notification/views/prodo-notify-success.html',position:'center'});
      }
      else {
        if (flag==='error') {
           notify({message:message,template:'common/notification/views/prodo-notify-error.html',position:'center'});
        } else if (flag==='info') {
          //growl.addInfoMessage(message); 
        } else {
          //growl.addWarningMessage(message); 
        } 
      }
          
    };

    var cleanupEventSession_Changed_Failure = $scope.$on('session-changed-failure', function (event, message) {
      UserSessionService.authfailed();
      $state.transitionTo('prodo.landing.signup');
      $rootScope.ProdoAppMessage("It looks as though we have broken something on our server system. Our support team is notified and will take immediate action to fix it." + message, 'error');   
    });

    var cleanupEventSessionDone = $scope.$on('session', function (event, data) {
      if ($rootScope.usersession.isLoggedIn) {
        var planExpiryDate = moment.utc(moment(data.subscription.planexpirydate));
        var todaysDate = moment.utc(moment());
        $rootScope.daysRemaining = planExpiryDate.diff(todaysDate, 'days');
  
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
              if (data.org && data.org.orgtype == 'Manufacturer' && data.org.status == 'active') {
                $rootScope.orgid = data.org.orgid;
                $log.debug('active_manufacturer' + $rootScope.orgid);
                var firstproduct = 1;
                OrgRegistrationService.get_Product(firstproduct);
              } else if (data.products_followed.length > 0) {
                var  lastProductFollowed = data.products_followed.length - 1;
                $rootScope.orgid= data.products_followed[ lastProductFollowed].orgid;
                $log.debug('others_' + $rootScope.orgid);
                $state.transitionTo('prodo.home.wall');
              } 
            }         
        } 
      }
    });

    $scope.handleGetFirstProductResponse = function(data){
      if (data.success) {
        if (data.success.product.length > 0) {
          $rootScope.product_prodle = data.success.product[0].prodle; 
        }
        $state.transitionTo('prodo.home.wall');
      } else {
        if(data.error !== undefined && data.error.code === 'AL001' ) {
          $rootScope.showModal();
        } else {
          $log.debug(data.error.message);
          $rootScope.ProdoAppMessage(data.error.message,'error');        
        }
      }
    }; 

    var cleanupEventGetFirstProductDone = $scope.$on('getFirstProductDone', function (event, data) {
      $scope.handleGetFirstProductResponse(data);
    });

    var cleanupEventGetFirstProductNotDone = $scope.$on('getFirstProductNotDone', function (event, data) {
      $rootScope.ProdoAppMessage("It looks as though we have broken something on our server system. Our support team is notified and will take immediate action to fix it." + message, 'error');   
    });
    
    $scope.logout = function () {
      UserSessionService.logoutUser();
    };
    var cleanupEventLogoutDone = $scope.$on('logoutDone', function (event, message) {
      $log.debug($rootScope.usersession.isLoggedIn);
      $state.transitionTo('prodo.landing.signup');
      $rootScope.ProdoAppMessage('You are successfully signed out.', 'success');   

    });
    var cleanupEventLogoutNotDone = $scope.$on('logoutNotDone', function (event, message) {
      $rootScope.ProdoAppMessage("It looks as though we have broken something on our server system. Our support team is notified and will take immediate action to fix it." + message, 'error');   
    });

    $scope.$on('$destroy', function(event, message) {
      cleanupEventSession_Changed_Failure(); 
      cleanupEventSessionDone();
      cleanupEventGetProductFollowedDone();           
      cleanupEventLogoutDone();
      cleanupEventLogoutNotDone(); 
      cleanupEventGetFirstProductDone();
      cleanupEventGetFirstProductNotDone();     
    });
  }
]);
