angular.module('prodo.InboxApp')
  .factory('InboxGetService', [
    '$resource',
    function ($resource) {
      var InboxS = {
          All_Inbox_Message: $resource('/api/inboxmessage/:userid?messagetype=:data', {}, { getAllMessages: { method: 'GET'} })
      }
      return InboxS;
    }
  ])

  .factory('InboxService', [
    '$rootScope',
    '$resource',
    '$http',
    '$state',
    '$log',
    function ($rootScope, $resource, $http, $state, $log) {
      var InboxService = {
        Read: $resource('/api/inboxaction/:inboxid?action=:data ', {}, { readMessage: { method: 'PUT', params: { inboxid: '@inboxid', data: '@data' } } }),
        Delete: $resource('/api/inboxaction/:inboxid?action=:data ', {}, { deleteMessage: { method: 'PUT', params: { inboxid: '@inboxid', data: '@data' } } }),
        Accept: $resource('/api/testimonialaction/:testimonialid?name=:data', {}, { acceptTestimonialMessage: { method: 'GET', params: { testimonialid: '@testimonialid', data: '@data' } } }),
        LoadMore: $resource('/api/loadmoreinboxmessage/:userid/:inboxid ', {}, { loadMoreMessage: { method: 'GET', params: { userid: '@userid', inboxid: '@inboxid' } } }),
        Reply: $resource('/api/replytomessage/:userid/:inboxid ', {}, { ReplyToMessage: { method: 'POST', params: { userid: '@userid', inboxid: '@inboxid' } } }) 
      }; 
      var inbox = {};

      inbox.read_Primary_Message = function (inboxid) {
        InboxService.Read.readMessage({inboxid: inboxid, data: 'read'}, function (success) {
          $log.debug(success);
          $rootScope.$broadcast('readPrimaryMessageDone', success);
        }, function (error) {
          $log.debug(error);
          $rootScope.$broadcast('readPrimaryMessageNotDone', error.status);
        });
      };

      inbox.read_Testimonial_Message = function (inboxid) {
        InboxService.Read.readMessage({inboxid: inboxid, data: 'read'}, function (success) {
          $log.debug(success);
          $rootScope.$broadcast('readTestimonialMessageDone', success);
        }, function (error) {
          $log.debug(error);
          $rootScope.$broadcast('readTestimonialMessageNotDone', error.status);
        });
      };

      inbox.read_Enquiry_Message = function (inboxid) {
        InboxService.Read.readMessage({inboxid: inboxid, data: 'read'}, function (success) {
          $log.debug(success);
          $rootScope.$broadcast('readEnquiryMessageDone', success);
        }, function (error) {
          $log.debug(error);
          $rootScope.$broadcast('readEnquiryMessageNotDone', error.status);
        });
      };

      inbox.accept_Testimonial_Message = function (testimonialid) {
        InboxService.Accept.acceptTestimonialMessage({testimonialid: testimonialid, data: 'accept'}, function (success) {
          $log.debug(success);
          $rootScope.$broadcast('acceptTestimonialMessageDone', success);
        }, function (error) {
          $log.debug(error);
          $rootScope.$broadcast('acceptTestimonialMessageNotDone', error.status);
        });
      };

      inbox.delete_Message = function (inboxid) {
        InboxService.Delete.deleteMessage({inboxid: inboxid, data: 'delete'}, function (success) {
          $log.debug(success);
          $rootScope.$broadcast('deleteMessageDone', success);
        }, function (error) {
          $log.debug(error);
          $rootScope.$broadcast('deleteMessageNotDone', error.status);
        });
      };

      inbox.getMorePrimaryMessages = function (inboxid) {
        InboxService.LoadMore.loadMoreMessage({userid: $rootScope.usersession.currentUser.userid , inboxid: inboxid}, function (success) {
          $log.debug(success);
          $rootScope.$broadcast('getMorePrimaryMessagesDone', success);
        }, function (error) {
          $log.debug(error);
          $rootScope.$broadcast('getMorePrimaryMessagesNotDone', error.status);
        });
      };

      inbox.getMoreEnquiryMessages = function (inboxid) {
        InboxService.LoadMore.loadMoreMessage({userid: $rootScope.usersession.currentUser.userid , inboxid: inboxid}, function (success) {
          $log.debug(success);
          $rootScope.$broadcast('getMoreEnquiryMessagesDone', success);
        }, function (error) {
          $log.debug(error);
          $rootScope.$broadcast('getMoreEnquiryMessagesNotDone', error.status);
        });
      };

      inbox.getMoreTestimonialMessages = function (inboxid) {
        InboxService.LoadMore.loadMoreMessage({userid: $rootScope.usersession.currentUser.userid , inboxid: inboxid}, function (success) {
          $log.debug(success);
          $rootScope.$broadcast('getMoreTestimonialMessagesDone', success);
        }, function (error) {
          $log.debug(error);
          $rootScope.$broadcast('getMoreTestimonialMessagesNotDone', error.status);
        });
      };

      inbox.replyToMessage = function (inboxid, data) {
        InboxService.Reply.ReplyToMessage({userid: $rootScope.usersession.currentUser.userid , inboxid: inboxid}, data, function (success) {
          $log.debug(success);
          $rootScope.$broadcast('replyToMessageDone', success);
        }, function (error) {
          $log.debug(error);
          $rootScope.$broadcast('replyToMessageNotDone', error.status);
        });
      };

      return inbox;
    }
  ]);