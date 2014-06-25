angular.module('prodo.InboxApp')
 .controller('ProdoTestimonialInboxController', ['$scope', '$rootScope', '$state', '$http', '$timeout', '$stateParams', '$log', 'growl','UserSessionService', 'InboxService', 'checkIfSessionExist', 'testimonialmessage', function($scope, $rootScope, $state, $http, $timeout, $stateParams, $log, growl, UserSessionService,InboxService, checkIfSessionExist,testimonialmessage) {
  
 	$log.debug('initialising testimonial inbox controller...');
  
  console.log(testimonialmessage);

  $scope.testimonial_message = [];

  $scope.$state = $state;

  $scope.$watch('$state.$current.locals.globals.testimonialmessage', function (testimonialmessage) {
    
    if (testimonialmessage.success && testimonialmessage.success.inbox.length !== 0) {
      $scope.testimonial_message = testimonialmessage.success.inbox;
      $scope.message_length = testimonialmessage.success.inbox.length; 
    } else {
        if (testimonialmessage.error && testimonialmessage.error.code == 'AL001') {
          $rootScope.showModal();
        } else {
          $scope.testimonial_message = []; 
          $log.debug(testimonialmessage.error.message);
        } 
    }
  });

  $scope.read_testimonial_message = function(message) {
    $scope.$emit('sendTestimonialMessageToRead', message);
    if (message.status == 'read') {
      $state.transitionTo('prodo.inbox.readcontent.testimonial');
    } else {
      InboxService.read_Testimonial_Message(message.messageid);
    }
  }

  // function to handle server side responses
    $scope.handleReadTestimonialResponse = function(data){
      if (data.success) {
        $state.transitionTo('prodo.inbox.readcontent.testimonial');
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
  

  var cleanupEventReadTestimonialMessageDone = $scope.$on("readTestimonialMessageDone", function(event, data){
    $scope.handleReadTestimonialResponse(data);  
  });

  var cleanupEventReadTestimonialMessageNotDone = $scope.$on("readTestimonialMessageNotDone", function(event, data){
    $rootScope.ProdoAppMessage("It looks as though we have broken something on our server system. Our support team is notified and will take immediate action to fix it." + data, 'error');    
  });

  // function to handle server side responses
  $scope.handleGetMoreTestimonialMessagesResponse = function(data){
    if (data.success) {
      console.log(data.success.inbox);
      for (var i=0;i<data.success.inbox.length;i++){
        if(data.success.inbox[i]){
          var inbox = data.success.inbox[i];
        }
        $scope.testimonial_message.push(inbox);
      }
      $rootScope.ProdoAppMessage(data.success.message, 'success');
    } else {
      $log.debug(data.error.message);
      $rootScope.ProdoAppMessage(data.error.message, 'error');
    }
  };   
    

  $scope.loadMoreTestimonialMessages = function(){
    var lastinbox = $scope.testimonial_message.length - 1;
    var inboxId= $scope.testimonial_message[lastinbox].messageid;
    InboxService.getMoreTestimonialMessages(inboxId);
  }

  var cleanupEventGetMoreTestimonialMessagesDone = $scope.$on("getMoreTestimonialMessagesDone", function(event, message){
    $scope.handleGetMoreTestimonialMessagesResponse(message);        
  });

  var cleanupEventGetMoreTestimonialMessagesNotDone = $scope.$on("getMoreTestimonialMessagesNotDone", function(event, message){
    $rootScope.ProdoAppMessage("It looks as though we have broken something on our server system. Our support team is notified and will take immediate action to fix it." + message, 'error');
  });
  

  $scope.$on('$destroy', function(event, message) {
    cleanupEventReadTestimonialMessageDone();
    cleanupEventReadTestimonialMessageNotDone(); 
    cleanupEventGetMoreTestimonialMessagesDone();
    cleanupEventGetMoreTestimonialMessagesNotDone();  
  });


}]);