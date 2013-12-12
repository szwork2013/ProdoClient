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
                controller: function($scope)
                {
                    $(document).ready(function() {
                        $('#prodo-comment-Textbox').focus(function() {
                            $(this).height(75);
                        });
                        $('#prodo-comment-Textbox').blur(function() {
                            $(this).height(30);
                        });
                    

                    });

                    $scope.commentsLimit = function() {
                        return $scope.pagesSize * $scope.pagesShown;
                    };
                    $scope.fromNow = function(time) {
                        if (time != undefined) {
                            return moment(time).calendar();
                        }
                    };
                    $scope.toCamelCase = function(s) {
                        if (s != undefined) {

                            s = s.replace(/([^a-zA-Z0-9_\- ])|^[_0-9]+/g, "").trim().toLowerCase();
                            s = s.replace(/([ -]+)([a-zA-Z0-9])/g, function(a, b, c) {
                                return c.toUpperCase();
                            });
                            s = s.replace(/([0-9]+)([a-zA-Z])/g, function(a, b, c) {
                                return b + c.toUpperCase();
                            });
                            return s;
                        }

                    };


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

                    $scope.addProductComment = function() {
                        if ($scope.commenttextField.userComment != "")
                        {
                            $scope.getTagsFromCommentText($scope);
                            $scope.productComments.unshift({
                                time: Date.now(),
                                commenttext: $scope.commenttextField.userComment,
                                tags: $scope.mytags,
                                user: $scope.user,
                                avatar_url: "http://placehold.it/64x64",
                            });
                            $scope.commenttextField.userComment = "";
                        }
                        else {
                                    //add code if validation failed
                        }
                    };


                    $scope.deleteProductComment = function(comment) {
                        // console.log("deleting....");
                        var index = $scope.productComments.indexOf(comment);
                        if (index != -1)
                            $scope.productComments.splice(index, 1);
                    };
                },
//                link: function(scope, element, attrs, ngModel, controller) {
//                }
            };
        })
