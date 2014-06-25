angular.module('prodo.InboxApp')
 .controller('ProdoEnquiryInboxController', ['$scope', '$rootScope', '$state', '$http', '$timeout', '$stateParams', '$log', 'growl','UserSessionService', 'InboxService', 'checkIfSessionExist', 'enquirymessage', function($scope, $rootScope, $state, $http, $timeout, $stateParams, $log, growl, UserSessionService, InboxService, checkIfSessionExist, enquirymessage) {
  
 	$log.debug('initialising enquiry inbox controller...');

  console.log(enquirymessage);

  $scope.enquiry_message = [];

  $scope.$state = $state;

  $scope.$watch('$state.$current.locals.globals.enquirymessage', function (enquirymessage) {
    
    if (enquirymessage.success && enquirymessage.success.inbox.length !== 0) {
      $scope.enquiry_message = enquirymessage.success.inbox; 
      $scope.message_length = enquirymessage.success.inbox.length;
    } else {
      if (enquirymessage.error && enquirymessage.error.code == 'AL001') {
        $rootScope.showModal();
      } else {
        $scope.enquiry_message = []; 
        $log.debug(enquirymessage.error.message);

      } 
    }
  });

  $scope.read_enquiry_message = function(message) {
    $scope.$emit('sendEnquiryMessageToRead', message);
    if (message.status == 'read') {
      $state.transitionTo('prodo.inbox.readcontent.enquiry');
    } else {
      InboxService.read_Enquiry_Message(message.messageid);
    }
  }

  // function to handle server side responses
    $scope.handleReadEnquiryResponse = function(data){
      if (data.success) {
        $state.transitionTo('prodo.inbox.readcontent.enquiry');
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
  

  var cleanupEventReadEnquiryMessageDone = $scope.$on("readEnquiryMessageDone", function(event, data){
    $scope.handleReadEnquiryResponse(data);  
  });

  var cleanupEventReadEnquiryMessageNotDone = $scope.$on("readEnquiryMessageNotDone", function(event, data){
    $rootScope.ProdoAppMessage("It looks as though we have broken something on our server system. Our support team is notified and will take immediate action to fix it." + data, 'error');    
  });
  
  // function to handle server side responses
  $scope.handleGetMoreEnquiryMessagesResponse = function(data){
    if (data.success) {
      console.log(data.success.inbox);
      for (var i=0;i<data.success.inbox.length;i++){
        if(data.success.inbox[i]){
          var inbox = data.success.inbox[i];
        }
        $scope.enquiry_message.push(inbox);
      }
      $rootScope.ProdoAppMessage(data.success.message, 'success');
    } else {
      $log.debug(data.error.message);
      $rootScope.ProdoAppMessage(data.error.message, 'error');
    }
  };   
    

  $scope.loadMoreEnquiryMessages = function(){
    var lastinbox = $scope.enquiry_message.length - 1;
    var inboxId= $scope.enquiry_message[lastinbox].messageid;
    InboxService.getMoreEnquiryMessages(inboxId);
  }

  var cleanupEventGetMoreEnquiryMessagesDone = $scope.$on("getMoreEnquiryMessagesDone", function(event, message){
    $scope.handleGetMoreEnquiryMessagesResponse(message);        
  });

  var cleanupEventGetMoreEnquiryMessagesNotDone = $scope.$on("getMoreEnquiryMessagesNotDone", function(event, message){
    $rootScope.ProdoAppMessage("It looks as though we have broken something on our server system. Our support team is notified and will take immediate action to fix it." + message, 'error');
  });

  $scope.$on('$destroy', function(event, message) {
    cleanupEventReadEnquiryMessageDone();
    cleanupEventReadEnquiryMessageNotDone();   
    cleanupEventGetMoreEnquiryMessagesDone();
    cleanupEventGetMoreEnquiryMessagesNotDone(); 
  });


}]);