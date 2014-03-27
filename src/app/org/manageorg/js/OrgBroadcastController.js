angular.module('prodo.OrgApp')
 .controller('ManageOrgBroadcastController', ['$scope', '$rootScope', '$state', '$http', '$timeout', '$log','growl', 'UserSessionService', 'OrgRegistrationService', 'OrgService', function($scope, $rootScope, $state, $http, $timeout, $log, growl, UserSessionService, OrgRegistrationService, OrgService) {
    
    $scope.submitted= false;    
    $scope.form = {};
    $scope.broadcast = {
      message: '',
      duration: ''
    };

    $scope.clear = function() {
      $scope.broadcast = {
        message: '',
        duration: ''
      };
    }

     // function to send and stringify user registration data to Rest APIs
    $scope.jsonOrgBroadcastData = function(){
      var Data = 
      {
        "broadcast":
          {
            'message' : $scope.broadcast.message,
            'expireindays' : $scope.broadcast.duration
          }  
      };
      return JSON.stringify(Data); 
    } 

    // function to handle server side responses
    $scope.handleOrgBroadcastResponse = function(data){
      if (data.success) {
        $log.debug('OrgBroadcast_' + data);
        $scope.clear();
        growl.addSuccessMessage(data.success.message);    

      } else {
            $log.debug(data.error.message);
            growl.addSuccessMessage(data.error.message);  
        }
      $scope.hideSpinner();

    };

    $scope.broadcastMessage = function() {
      if ($scope.form.orgMessageBroadcastform.$valid) {
        $scope.showSpinner();
        OrgRegistrationService.OrgMessagebroadcast( $scope.jsonOrgBroadcastData());
      } else {
        $scope.form.orgMessageBroadcastform.submitted = true;
      }
    }

    var cleanupOrgBroadcastDone = $scope.$on("OrgBroadcastDone", function(event, message) {
      $scope.handleOrgBroadcastResponse(message);
    });

    var cleanupOrgBroadcastNotDone = $scope.$on("OrgBroadcastNotDone", function(event, message) {
      $scope.handleOrgBroadcastResponse(message);
    });

    $scope.$on('$destroy', function(event, message) {
      cleanupOrgBroadcastDone();
      cleanupOrgBroadcastDone();
    });



}]);