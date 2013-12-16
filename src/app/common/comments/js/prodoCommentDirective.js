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
                controller: function($scope, ProductService, GetLoginService)
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



                    var socket;
//                    function connectSocket()
//                    {
//                        socket = io.connect('http://ec2-54-254-210-45.ap-southeast-1.compute.amazonaws.com:8000');
//
//                        socket.on("commentResponse", function(result) {
//                            if (result.error) {
//                                document.getElementById('CommentErr').innerHTML = result.error.message;
//                            } else {
//                                document.getElementById('CommentErr').innerHTML = result.success.message;
//                            }
//                        })
//                    }
                    $scope.sid;
                    $scope.addProductComment = function() {
 

                        $scope.logindata = GetLoginService.checkLogin(
                                function(successData) {

                                    console.log("sessionid" + successData.sessionid);
                                   // alert($scope.logindata);
                               //     alert(successData.sessionid);
//                                   $scope.sid = successData.sessionid;
                                    localStorage.sid = successData.sessionid;

                                },
                                function(error) {
                                    console.log(error);
                                });

                           
                        $scope.newProductComment = {
                            product_comment: {
                                 user: {userid: "uxkfzVj7or", fullname: "Bhagyashri"},
//                                user: {userid: "ulyCJMISNL", fullname: "Neha Singhal"},
                                type:$scope.type,
                                commenttext: $scope.commenttextField.userComment
                            }};

                       // alert("sid="+localStorage.sid);
                        socket = io.connect('http://ec2-54-254-210-45.ap-southeast-1.compute.amazonaws.com:8000', {
                            query: 'session_id=' + localStorage.sid
                        });
 
                        socket.on("commentResponse", function(error, result) {
                            if (error) {
                                console.log(error.error.message);
                            } else if(result){
                               // console.log(result.success.message);
                                 console.log("comment response success"+result.success.product_comment);

                            }
                        })
                        if ($scope.commenttextField.userComment !== "")
 
                        {
                            $scope.getTagsFromCommentText($scope);
                            $scope.productComments.unshift($scope.newProductComment.product_comment);
                            socket.emit('addComment', "eyYHSKVtL", $scope.newProductComment.product_comment);
                            $scope.commenttextField.userComment = "";
                        }

                    };


                    $scope.deleteProductComment = function(comment) {
                        // console.log("deleting....");
                        var index = $scope.productComments.indexOf(comment);
                        if (index != -1)
                            $scope.productComments.splice(index, 1);
                    };
                },
            };
        })
