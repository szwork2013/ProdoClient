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

angular.module('prodo.CommonApp')
        .directive('prodoComments', function() {
          return {
            restrict: 'A',
            // require: '?ngModel',
            templateUrl: 'common/comments/views/prodo.comment.tpl.html',
            //  scope: {productComments_l: '=info', pagesSize: '=', pagesShown: '='},
            controller: function($scope, ProductService, GetLoginService, CommentService)
            {

              $(document).ready(function() {
                //comment textbox increase height and decrease whe focus( toggle)
                $('#prodo-comment-Textbox').focus(function() {
                  $(this).height(75);
                });
                $('#prodo-comment-Textbox').blur(function() {
                  $(this).height(30);
                });
                //comment textbox increase height and decrease whe focus( toggle)

              });

              //on  scroll event in testing phase
              $scope.commentsLimit = function() {
                return $scope.pagesSize * $scope.pagesShown;
              };
              //on  scroll event in testing phase

              //function to convert time format for comment added  
              $scope.fromNow = function(time) {
                if (time != undefined) {
                  return moment(time).calendar();
                }
              };
              //function to convert time format for comment added  


              //group name in camelCase function
//              $scope.toCamelCase = function(s) {
//                if ((s !== undefined )|| (s!=="")) {
//
//                  s = s.replace(/([^a-zA-Z0-9_\- ])|^[_0-9]+/g, "").trim().toLowerCase();
//                  s = s.replace(/([ -]+)([a-zA-Z0-9])/g, function(a, b, c) {
//                    return c.toUpperCase();
//                  });
//                  s = s.replace(/([0-9]+)([a-zA-Z])/g, function(a, b, c) {
//                    return b + c.toUpperCase();
//                  });
//                  return s;
//                }
//
//              };
              //group name in camelCase function

              //get tags from comment
              $scope.getTagsFromCommentText = function($scope) {

                //get tags from comment text and compare with predefined tags and add to tags
                var commenttext = $scope.commenttextField.userComment;
                $scope.mytags = $scope.pretags;
                var new_arr = [];
                var commenttextTags = commenttext.split(" ");
                for (var i = 0; i < commenttextTags.length; i++) {
                  for (var j = 0; j < $scope.mytags.length; j++) {
                    if (commenttextTags[i] == $scope.mytags[j]) {
                      new_arr.push(commenttextTags[i]);
                    }
                  }
                }

                $scope.mytags = new_arr;
              };
              //get tags from comment

              //Add comment function
              $scope.addProductComment = function() {
                $scope.newProductComment = {
                  product_comment: {
                    user: {userid: $scope.userIDFromSession,
                      fullname: $scope.userFullnameFromSession
                    },
                    type: $scope.type,
                    commenttext: $scope.commenttextField.userComment
                  }};

                if ($scope.commenttextField.userComment !== "")

                {
                  $scope.getTagsFromCommentText($scope);
                  $scope.socket.emit('addComment', "xk7i99lj8", $scope.newProductComment.product_comment);

                  $scope.productComments.unshift($scope.newProductComment.product_comment);
                  $scope.commenttextField.userComment = "";
                }

              };
              //Add comment function


              //delete comment function
              $scope.deleteProductComment = function(comment) {
                // console.log("deleting....");
                if (comment.user.fullname == $scope.userFullnameFromSession)
                {
                  var index = $scope.productComments.indexOf(comment);
                  if (index != -1)
                    $scope.productComments.splice(index, 1);
                  CommentService.deleteComment({commentid: comment.commentid});
                  console.log(comment.commentid);
                }


              };
              //delete comment function
            },
          };
        })
