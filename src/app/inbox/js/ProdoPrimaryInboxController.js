angular.module('prodo.InboxApp')
 .controller('ProdoPrimaryInboxController', ['$scope', '$rootScope', '$state', '$http', '$timeout', '$stateParams', '$log', 'growl','UserSessionService', 'InboxService', 'checkIfSessionExist', 'primarymessage', function($scope, $rootScope, $state, $http, $timeout, $stateParams, $log, growl, UserSessionService, InboxService, checkIfSessionExist, primarymessage) {
 
 	$log.debug('initialising primary inbox controller...');
  console.log(primarymessage);

  $scope.primary_message = [];

  $scope.$state = $state;

  $scope.$watch('$state.$current.locals.globals.primarymessage', function (primarymessage) {
    
    if (primarymessage.success && primarymessage.success.inbox.length !== 0) {
      $scope.primary_message = primarymessage.success.inbox; 
      $scope.message_length = primarymessage.success.inbox.length;
    } else {
        if (primarymessage.error && primarymessage.error.code == 'AL001') {
          $rootScope.showModal();
        } else {
          $scope.primary_message = []; 
          $log.debug(primarymessage.error.message);
        } 
    }
  });

  $scope.read_primary_message = function(message) {
    $scope.$emit('sendPrimaryMessageToRead', message);
    if (message.status == 'read') {
      $state.transitionTo('prodo.inbox.readcontent.primary');
    } else {
      InboxService.read_Primary_Message(message.messageid);
    }
  }

  // function to handle server side responses
    $scope.handleReadPrimaryResponse = function(data){
      if (data.success) {
        $state.transitionTo('prodo.inbox.readcontent.primary');
        $rootScope.ProdoAppMessage(data.success.message, 'success');
      } else {
        if (data.error.code== 'AL001') {     // enter valid data
            $log.debug(data.error.code + " " + data.error.message);
            $rootScope.showModal();
        } else {
            $log.debug(data.error.message);
            $rootScope.ProdoAppMessage(data.error.message, 'error');
        }
      }
    };  
  

  var cleanupEventReadPrimaryMessageDone = $scope.$on("readPrimaryMessageDone", function(event, data){
    $scope.handleReadPrimaryResponse(data);  
  });

  var cleanupEventReadPrimaryMessageNotDone = $scope.$on("readPrimaryMessageNotDone", function(event, data){
    $rootScope.ProdoAppMessage("It looks as though we have broken something on our server system. Our support team is notified and will take immediate action to fix it." + data, 'error');    
  });

  // function to handle server side responses
  $scope.handleGetMorePrimaryMessagesResponse = function(data){
    if (data.success) {
      console.log(data.success.inbox);
      for (var i=0;i<data.success.inbox.length;i++){
        if(data.success.inbox[i]){
          var inbox = data.success.inbox[i];
        }
        $scope.primary_message.push(inbox);
      }
      $rootScope.ProdoAppMessage(data.success.message, 'success');
    } else {
      $log.debug(data.error.message);
      $rootScope.ProdoAppMessage(data.error.message, 'error');
    }
  };   
    

  $scope.loadMorePrimaryMessages = function(){
    var lastinbox = $scope.primary_message.length - 1;
    var inboxId= $scope.primary_message[lastinbox].messageid;
    InboxService.getMorePrimaryMessages(inboxId);
  }

  var cleanupEventGetMorePrimaryMessagesDone = $scope.$on("getMorePrimaryMessagesDone", function(event, message){
    $scope.handleGetMorePrimaryMessagesResponse(message);        
  });

  var cleanupEventGetMorePrimaryMessagesNotDone = $scope.$on("getMorePrimaryMessagesNotDone", function(event, message){
    $rootScope.ProdoAppMessage("It looks as though we have broken something on our server system. Our support team is notified and will take immediate action to fix it." + message, 'error');
  });

  $scope.$on('$destroy', function(event, message) {
    cleanupEventGetMorePrimaryMessagesDone();
    cleanupEventGetMorePrimaryMessagesNotDone();
    cleanupEventReadPrimaryMessageDone();
    cleanupEventReadPrimaryMessageNotDone(); 
  });


}]);