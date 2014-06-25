angular.module('prodo.InboxApp')
 .controller('ProdoInboxController', ['$scope', '$rootScope', '$state', '$http', '$timeout', '$stateParams', '$log', 'growl','UserSessionService', 'InboxService', 'checkIfSessionExist', function($scope, $rootScope, $state, $http, $timeout, $stateParams, $log, growl, UserSessionService, InboxService, checkIfSessionExist) {
  
 	$log.debug('initialising inbox parent controller...');

  $scope.$state = $state;

  $scope.read_primarymessage = {};

  $scope.read_enquirymessage = {};

  $scope.read_testimonialmessage = {};

  $scope.message_length = '';

  $scope.delete_messageid = '';

  $scope.form = {};
  $scope.ShowPrimaryReplyMessage = false;
  $scope.ShowEnquiryReplyMessage = false;
  $scope.ShowTestimonialReplyMessage = false;
  $scope.message = {reply: ''};

  $scope.showReply = function(){
    if ($rootScope.currentState == 'prodo.inbox.readcontent.primary') {      
      $scope.ShowPrimaryReplyMessage = true;
    } else if ($rootScope.currentState == 'prodo.inbox.readcontent.enquiry') {
      $scope.ShowEnquiryReplyMessage = true;
    } else if ($rootScope.currentState == 'prodo.inbox.readcontent.testimonial') {
      $scope.ShowTestimonialReplyMessage = true;
    }
  }

  $scope.discard_primary_reply = function(){
  	$scope.ShowPrimaryReplyMessage = false;
  }

  $scope.discard_enquiry_reply = function(){
    $scope.ShowEnquiryReplyMessage = false;
  }

  $scope.discard_testimonial_reply = function(){
    $scope.ShowTestimonialReplyMessage = false;
  }

  $scope.fromNow = function (time) {
	  if (time != undefined) {
	    return moment(time).calendar();
	  }
	};

	$scope.delete_message = function(messageid) {
    InboxService.delete_Message(messageid);
  }

  // function to handle server side responses
  $scope.handleDeleteMessageResponse = function(data){
    if (data.success) {
      $state.reload();
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
  

  var cleanupEventDeleteMessageDone = $scope.$on("deleteMessageDone", function(event, data){
    $scope.handleDeleteMessageResponse(data);  
  });

  var cleanupEventDeleteMessageNotDone = $scope.$on("deleteMessageNotDone", function(event, data){
    $rootScope.ProdoAppMessage("It looks as though we have broken something on our server system. Our support team is notified and will take immediate action to fix it." + data, 'error');    
  });

  $scope.delete_read_message = function(messageid) {
    InboxService.delete_Message(messageid);
  }

  // function to handle server side responses
  $scope.handleDeleteReadMessageResponse = function(data){
    if (data.success) {
      $rootScope.goState();
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
  

  var cleanupEventDeleteReadMessageDone = $scope.$on("deleteMessageDone", function(event, data){
    $scope.handleDeleteReadMessageResponse(data);  
  });

  var cleanupEventDeleteReadMessageNotDone = $scope.$on("deleteMessageNotDone", function(event, data){
    $rootScope.ProdoAppMessage("It looks as though we have broken something on our server system. Our support team is notified and will take immediate action to fix it." + data, 'error');    
  });

  $scope.accept_testimonial = function(testimonialid) {
    InboxService.accept_Testimonial_Message(testimonialid);
  }

  // function to handle server side responses
  $scope.handleAcceptTestimonialResponse = function(data){
    if (data.success) {
      $state.reload();
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
  

  var cleanupEventAcceptTestimonialMessageDone = $scope.$on("acceptTestimonialMessageDone", function(event, data){
    $scope.handleAcceptTestimonialResponse(data);  
  });

  var cleanupEventAcceptTestimonialMessageNotDone = $scope.$on("acceptTestimonialMessageNotDone", function(event, data){
    $rootScope.ProdoAppMessage("It looks as though we have broken something on our server system. Our support team is notified and will take immediate action to fix it." + data, 'error');    
  });

  $scope.jsonreplyToMessageData = function()
  {
    var replydata = 
      {
        'replytext': $scope.message.reply            
      }
    return JSON.stringify(replydata); 
  }


  $scope.replyText = function(id) {
    alert('hi');
    console.log('hi');
    console.log(id);
    console.log($scope.jsonreplyToMessageData());
    InboxService.replyToMessage(id, $scope.jsonreplyToMessageData());
  }

  // function to handle server side responses
  $scope.handleReplyToMessageResponse = function(data){
    if (data.success) {
      // $state.reload();
      $scope.ShowPrimaryReplyMessage = false;
      $scope.ShowEnquiryReplyMessage = false;
      $scope.ShowTestimonialReplyMessage = false;
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
  

  var cleanupEventReplyToMessageDone = $scope.$on("replyToMessageDone", function(event, data){
    $scope.handleReplyToMessageResponse(data);  
  });

  var cleanupEventReplyToMessageNotDone = $scope.$on("replyToMessageNotDone", function(event, data){
    $rootScope.ProdoAppMessage("It looks as though we have broken something on our server system. Our support team is notified and will take immediate action to fix it." + data, 'error');    
  });

  var cleanupEventSendPrimaryMessageToRead = $scope.$on("sendPrimaryMessageToRead", function(event, data){
    console.log('listening primary..........');
    $scope.read_primarymessage = data;
    $scope.delete_messageid = data.messageid;
  });

  var cleanupEventSendEnquiryMessageToRead = $scope.$on("sendEnquiryMessageToRead", function(event, data){
    console.log('listening enquiry..........');
    $scope.read_enquirymessage = data;
    $scope.delete_messageid = data.messageid;
  });

  var cleanupEventSendTestimonialMessageToRead = $scope.$on("sendTestimonialMessageToRead", function(event, data){
    console.log('listening..........');
    $scope.read_testimonialmessage = data;
    $scope.delete_messageid = data.messageid;
  });
  

  $scope.$on('$destroy', function(event, message) {
    cleanupEventDeleteMessageDone();
    cleanupEventDeleteMessageNotDone(); 
    cleanupEventDeleteReadMessageDone();
    cleanupEventDeleteReadMessageNotDone(); 
    cleanupEventSendPrimaryMessageToRead(); 
    cleanupEventSendEnquiryMessageToRead();
		cleanupEventSendTestimonialMessageToRead(); 
		cleanupEventAcceptTestimonialMessageDone();
    cleanupEventAcceptTestimonialMessageNotDone();  
    cleanupEventReplyToMessageDone();
    cleanupEventReplyToMessageNotDone();
  });

}]);