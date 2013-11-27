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

angular.module('prodo.ProdoCommentApp')

        .directive('prodoComments', function() {
            return {
                restrict: 'A',
               // require: '?ngModel',
                templateUrl: 'product/views/prodo.comment.tpl.html',
              //  scope: {comments: '=', pagesSize: '=', pagesShown: '='},
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


                    $scope.mytags;
                    
                    $scope.commenttextField = {textFieldc: ''};
                    $scope.pretags = ['addition', 'aggregate', 'all', 'bad news', 'budget', 'cost', 'damage', 'entirety',
                        'expense', 'extent', 'list', 'lot', 'net', 'outlay', 'output', 'price tag', 'product', 'quantum', 'score',
                        'set-back', 'sum', 'tab', 'tidy sum', 'whole', 'article', 'asset', 'belonging', 'chattel', 'goods', 'line',
                        'material', 'object', 'produce', 'property', 'specialty', 'stock', 'thing', 'ware', 'good'];


                    $scope.productComments = {
                        comments: [{
                                userName: "Bhagyashri",
                                companyName: "Giant Leap Systems",
                                time: Date.now(),
                                text: "I like this web site",
                                tags: ['great', 'some', 'cool', 'bad'],
                                group: "Support",
                                dp: "http://placehold.it/64x64"
                                
                            }, {
                                userName: "Neha",
                                companyName: "Giant Leap Systems",
                                time: Date.now(),
                                text: "Prodonus is really cool :)",
                                tags: ['great', 'bad'],
                                group: "Developer",
                                dp: "http://placehold.it/64x64"
                                 
                            }]
                    };

                    $scope.getTagsFromCommentText = function($scope) {

                        //get tags from comment text and compare with predefined tags and add to tags
                        var commenttext = $scope.commenttextField.textFieldc;
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
                        $scope.getTagsFromCommentText($scope);
                        $scope.productComments.comments.unshift({
                            userName: "Shree",
                            companyName: "Srujan Systems",
                            time: Date.now(),
                            text: $scope.commenttextField.textFieldc,
                            tags: $scope.mytags,
                            group: "Admin",
                            dp: "http://placehold.it/64x64",
                            upvotecount: 0
                        });
                        $scope.commenttextField.textFieldc = "";
                    };


                    $scope.deleteProductComment = function(comment) {
                        // console.log("deleting....");
                        var index = $scope.productComments.comments.indexOf(comment);
                        if (index != -1)
                            $scope.productComments.comments.splice(index, 1);
                    };


                     

                },
                link: function(scope, element, attrs, ngModel, controller) {

                    scope.commentsLimit = function() {
                        return scope.pagesSize * scope.pagesShown;
                    }

                    scope.fromNow = function(time) {
                        // console.log(moment);
                        // return moment(time).fromNow();
                        return moment(time).calendar();
                    }

                    scope.toCamelCase = function(s) {

                        s = s.replace(/([^a-zA-Z0-9_\- ])|^[_0-9]+/g, "").trim().toLowerCase();

                        s = s.replace(/([ -]+)([a-zA-Z0-9])/g, function(a, b, c) {
                            return c.toUpperCase();
                        });

                        s = s.replace(/([0-9]+)([a-zA-Z])/g, function(a, b, c) {
                            return b + c.toUpperCase();
                        });
                        return s;
                    }

                }
            };
        })
