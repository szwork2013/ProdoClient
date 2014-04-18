angular.module('prodo.OrgApp')
 .controller('ManageOrgBroadcastController', ['$scope', '$rootScope', '$stateParams', '$state', '$http', '$timeout', '$log','growl', 'UserSessionService', 'OrgRegistrationService', 'OrgService', 'getBroadcastData', function($scope, $rootScope, $stateParams, $state, $http, $timeout, $log, growl, UserSessionService, OrgRegistrationService, OrgService, getBroadcastData) {
    
    $scope.submitted= false;    
    $scope.form = {};
    $scope.broadcasts = [];
    $scope.broadcast = {
      message: '',
      duration: '',
      type: ''
    };

    $scope.options = [
    {
      name: 'Normal',
      value: 'Normal'
    }, 
    {
      name: 'Urgent',
      value: 'Urgent'
    }
  ];
  
  $scope.broadcast.type = $scope.options[0];

    $scope.clear = function() {
      $scope.form.orgMessageBroadcastform.$setPristine();
      $scope.broadcast = {
        message: '',
        duration: '',
        type: $scope.options[0]
      };
    }

    $scope.$state = $state;

    if (getBroadcastData.success) {
      $scope.$watch('$state.$current.locals.globals.getBroadcastData', function (getBroadcastData) {
        if (getBroadcastData.success.broadcast.length !== 0) {
          $scope.broadcasts = getBroadcastData.success.broadcast;
        }
      });
    }

     // function to send and stringify user registration data to Rest APIs
    $scope.jsonOrgBroadcastData = function(){
      var Data = 
      {
        "broadcast":
          {
            'message' : $scope.broadcast.message,
            'expireindays' : $scope.broadcast.duration,
            'broadcasttype': $scope.broadcast.type.name
          }  
      };
      return JSON.stringify(Data); 
    } 


    // function to handle server side responses
    $scope.handleOrgBroadcastResponse = function(data){
      if (data.success) {
        $log.debug('OrgBroadcast_' + data);
        $scope.clear();
        $state.transitionTo($state.current, $stateParams, { reload: true, inherit: false, notify: true });
        $rootScope.ProdoAppMessage(data.success.message,'success');
      } else {
        if(data.error !== undefined && data.error.code === 'AL001' ) {
          $rootScope.showModal();
        } else {
          $log.debug(data.error.message);
          $rootScope.ProdoAppMessage(data.error.message,'error');
        }
      }    
      $scope.hideSpinner();

    };

    $scope.broadcastMessage = function() {
      if ($scope.form.orgMessageBroadcastform.$valid) {
        $scope.showSpinner();
        $scope.form.orgMessageBroadcastform.submitted = false;
        OrgRegistrationService.OrgMessagebroadcast( $scope.jsonOrgBroadcastData());
      } else {
        $scope.form.orgMessageBroadcastform.submitted = true;
      }
    }

    var cleanupOrgBroadcastDone = $scope.$on("OrgBroadcastDone", function(event, message) {
      $scope.handleOrgBroadcastResponse(message);
    });

    var cleanupOrgBroadcastNotDone = $scope.$on("OrgBroadcastNotDone", function(event, message) {
      $rootScope.ProdoAppMessage('It looks as though we have broken something on our server system. Our support team is notified and will take immediate action to fix it','error');
    });

    // function to handle server side responses
    $scope.handleDeleteOrgBroadcastResponse = function(data){
      if (data.success) {
        $log.debug('DeleteOrgBroadcast_' + data);
        $rootScope.ProdoAppMessage(data.success.message,'success');
        $state.transitionTo($state.current, $stateParams, { reload: true, inherit: false, notify: true });

      } else {
        if(data.error !== undefined && data.error.code === 'AL001' ) {
          $rootScope.showModal();
        } else {
          $log.debug(data.error.message);
          $rootScope.ProdoAppMessage(data.error.message,'error');
        }
      }    
    };


    $scope.deleteBroadcast = function(broadcastid) {

      OrgRegistrationService.DeleteMessagebroadcast(broadcastid);
    };

    var cleanupDeleteOrgBroadcastDone = $scope.$on("DeleteOrgBroadcastDone", function(event, message) {
      $scope.handleDeleteOrgBroadcastResponse(message);
    });

    var cleanupDeleteOrgBroadcastNotDone = $scope.$on("DeleteOrgBroadcastNotDone", function(event, message) {
      $rootScope.ProdoAppMessage('It looks as though we have broken something on our server system. Our support team is notified and will take immediate action to fix it','error');
    });


    $scope.$on('$destroy', function(event, message) {
      cleanupOrgBroadcastDone();
      cleanupOrgBroadcastDone();
      cleanupDeleteOrgBroadcastDone();
      cleanupDeleteOrgBroadcastDone();
    });



}]);