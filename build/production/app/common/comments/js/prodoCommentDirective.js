/*
 * Overview: comment Directive
 * It is comments block , where it has user avatar, user name, company name, date and time difference from the time of posting that comment, tags and many more
 * Dated: 28/10/2013.
 * Author: Bhagyashri Jangam
 * Copyright: Prodonus Software Private Limited and GiantLeap Systems Private Limited 2013
 * Change History:
 * ----------------------------------------------------------------------
 * date | author | description 
 * ----------------------------------------------------------------------
 * 27-3/2013 | xyx | Add a new property
 * 
 */

 angular.module('prodo.CommonApp').directive('prodoComments', function () {
  return {
    restrict: 'A',
    
    templateUrl: 'common/comments/views/prodo.comment.tpl.html',
    controller: [
    '$scope',
    '$log',
    'ProductService',
    '$rootScope',
    'UserSessionService',
    'CommentService',
    function ($scope, $log, ProductService, $rootScope, UserSessionService, CommentService) {
      $(document).ready(function () {
        $('#prodo-comment-Textbox').focus(function () {
          $(this).height(75);
        });
        $('#prodo-comment-Textbox').blur(function () {
          $(this).height(40);
        });
      });
      $scope.commentsLimit = function () {
        return $scope.pagesSize * $scope.pagesShown;
      };
      $scope.fromNow = function (time) {
        if (time != undefined) {
          return moment(time).calendar();
        }
      };
      $scope.toCamelCase = function (s) {
        if (s == undefined || s == '' || s == null) {
          s = '  ';
        } else {
          s = s.replace(/([^a-zA-Z0-9_\- ])|^[_0-9]+/g, '').trim();
          s = s.replace(/([ -]+)([a-zA-Z0-9])/g, function (a, b, c) {
            return c.toUpperCase();
          });
          s = s.replace(/([0-9]+)([a-zA-Z])/g, function (a, b, c) {
            return b + c.toUpperCase();
          });
        }
        return s;
      };
        
        $scope.deleteProductComment = function (comment) {
          if (comment.user.userid == $scope.userIDFromSession ) {
            var index = $scope.productComments.indexOf(comment);
            if (index != -1)
              $scope.productComments.splice(index, 1);
            CommentService.deleteComment({ commentid: comment.commentid });
            $log.debug(comment.commentid);
          }
        };
      }
      ]
    };
  });