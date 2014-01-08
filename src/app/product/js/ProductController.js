/* Overview: Product Controller 
 * Controller for product comments,product features etc
 * Dated: 25/11/2013.
 * Author: Bhagyashri Jangam
 * Copyright: Prodonus Software Private Limited and GiantLeap Systems Private Limited 2013
 * Change History:
 *
 * date | author | description 
 *
 * 27-3/2013 | xyx | Add a new property
 * 
 */
angular.module('prodo.ProductApp')
        .controller('ProductController', ['$scope', '$rootScope', 'ProductService', 'UserSessionService', function($scope, $rootScope, ProductService, UserSessionService, UploadService) {

            //comments
            $scope.productComments = {comments: [{}]};
            $scope.newProductComment = [];
            $scope.productCommentResponsearray = [];
            $scope.mytags;
            $scope.count = 0;
            $scope.commenttextField = {userComment: ''};
            $scope.pretags = ['addition', 'aggregate', 'all', 'bad news', 'budget', 'cost', 'damage', 'entirety',
              'expense', 'extent', 'list', 'lot', 'net', 'outlay', 'output', 'price tag', 'product', 'quantum', 'score',
              'set-back', 'sum', 'tab', 'tidy sum', 'whole', 'article', 'asset', 'belonging', 'chattel', 'goods', 'line',
              'material', 'object', 'produce', 'property', 'specialty', 'stock', 'thing', 'ware', 'good'];

            //product
            $scope.product = {product: [{}]};
            $scope.newProduct = {product: [{}]};
            $scope.type = "product";
            $scope.product_prodle;

            //user
            $scope.userIDFromSession;
            $scope.userFullnameFromSession;
            $scope.grpnameFromSession;
            $scope.orgnameFromSession;
            $scope.orgidFromSession;
            $scope.socket;






            $scope.showErrorIfCommentNotAdded = function( ) {
              var retry = document.getElementById("responseComment");
              retry.style.display = 'inline';
              retry.innerHTML = 'Error adding comment please try again..';
            }

            $scope.showRetryIconIfCommentNotAdded = function( ) {
              var retryIcon = document.getElementById("retryIcon");
              retryIcon.style.display = 'inline';
            }



            //get login details
            $scope.getUserDetails = function( ) {
              if ($rootScope.usersession.currentUser.grpname)
                $scope.grpnameFromSession = $rootScope.usersession.currentUser.grpname;
              else
                $scope.grpnameFromSession = "";
              if ($rootScope.usersession.currentUser.orgname) {
                $scope.orgidFromSession = $rootScope.usersession.currentUser.orgid;
                $scope.orgnameFromSession = $rootScope.usersession.currentUser.orgname;
              }
              else
                $scope.orgnameFromSession = "";

              $scope.orgnameFromSession;
              $scope.userIDFromSession = $rootScope.usersession.currentUser.userid;
              $scope.userFullnameFromSession = $rootScope.usersession.currentUser.fullname;
            }
            $scope.getUserDetails();

            //get login details

            localStorage.sid = $rootScope.usersession.currentUser.sessionid;
            //socket connect
            $scope.socket = io.connect('http://ec2-54-254-210-45.ap-southeast-1.compute.amazonaws.com:8000', {
              query: 'session_id=' + localStorage.sid
            });
            //socket connect

            //socket response when for add comment
            $scope.socket.on("addcommentResponse", function(error, result) {
              if (error) {
                console.log(error.error.message);
                $scope.showErrorIfCommentNotAdded();
                $scope.showRetryIconIfCommentNotAdded();
                // if(retry) retry.textContent("Error posting comment.. Please try again");
              } else if (result) {
                // console.log(result.success.message);
                $scope.ifErrorAddingComment = false;
                console.log("addcommentResponse success" + result.success.product_comment);
              }
              //   $scope.socket.removeAllListeners();
            })
            //socket response when for add comment


            //productComment response
            $scope.socket.on("productcommentResponse", function(error, result) {
              if (error) {
                console.log(error.error.message);
              } else if (result) {
                console.log("productcomment  Response success" + result.success.product_comment);
                $scope.productCommentResponsearray.push(result.success.product_comment);
                $scope.count = $scope.productCommentResponsearray.length;
                console.log($scope.count);
                var a = document.getElementById("responseComment");
                a.style.display = 'inline';
                a.innerHTML = $scope.count + ' new comments';
                // a.textContent(JSON.stringify(result.success.product_comment).length + " new comments")
              }
              // $scope.socket.removeAllListeners();
            })
            //productComment response 

            //Add comment function
            $scope.addProductComment = function() {
              $scope.newProductComment = {
                product_comment: {
                  user: {userid: $scope.userIDFromSession,
                    fullname: $scope.userFullnameFromSession,
                    orgname: $scope.orgnameFromSession,
                    grpname: $scope.grpnameFromSession
                  },
                  type: $scope.type,
                  commenttext: $scope.commenttextField.userComment
                }};

              if ($scope.commenttextField.userComment !== "")

              {
                //  $scope.getTagsFromCommentText($scope);
                $scope.socket.emit('addComment', "xk7i99lj8", $scope.newProductComment.product_comment);

                $scope.productComments.unshift($scope.newProductComment.product_comment);
                $scope.commenttextField.userComment = "";
              }

            };
            //Add comment function

            //get product function declaration
            $scope.getProduct = function()
            {

              ProductService.getProduct({orgid: $scope.orgidFromSession, prodle: 'xk7i99lj8'},
              function(successData) {

                console.log(successData.success.product.product_comments);
                $scope.product = successData.success.product;
                $scope.product_prodle = successData.success.product.prodle;
                $scope.productComments = successData.success.product.product_comments;
              },
                      function(error) {
                        console.log(error);
                        $scope.showAlert('alert-danger', "Server Error:" + error.status);

                      });
            }
            //get product function declaration  

            $scope.getProduct();
            //   console.log(ProductService.getProduct({prodle: 'eyYHSKVtL'}));

            //get latest comments posted by others
            $scope.getLatestComments = function() {
              $scope.reversecomments_l = $scope.productCommentResponsearray.reverse();
              $scope.productComments = $scope.reversecomments_l.concat($scope.productComments);
              var a = document.getElementById("responseComment");
              a.style.display = 'none';
              a.innerHTML = "";
              $scope.productCommentResponsearray.length = 0;
              $scope.reversecomments_l.length = 0;
              $scope.count = 0;
              //code to get latest comments
            };
            //get latest comments posted by others

            //error handling for add product
            $scope.handleSaveProductResponse = function(data) {
              if (data.success) {
                alert(data.success.message);
              } else {
                if (data.error.code == 'AV001') {     // user already exist
                  console.log(data.error.code + " " + data.error.message);
                  alert(data.error.message);
                } else if (data.error.code == 'AP001') {  // user data invalid
                  console.log(data.error.code + " " + data.error.message);
                  alert(data.error.message);
                } else {
                  console.log(data.error.message);
                  alert(data.error.message);
                }
              }
            };
            //error handling for add product

            //add product
            $scope.addProduct = function()
            {

              $scope.newProduct = {product: {
                  display_name: $scope.display_name,
                  serial_no: $scope.product.serial_no,
                  model_no: $scope.product.model_no,
                  name: $scope.product.name,
                  description: $scope.product.description
                }};

              ProductService.saveProduct({orgid: $scope.orgidFromSession},$scope.newProduct,
                      function(success) {
                        console.log(success);
                        $scope.handleSaveProductResponse(success); // calling function to handle success and error responses from server side on POST method success.
                      },
                      function(error) {
                        console.log(error);
                      });

            };
            //delete product
            $scope.deleteProduct = function()
            {
              if ($rootScope.usersession.currentUser.isAdmin) {
                alert("deleting");
                ProductService.deleteProduct({orgid: $scope.orgidFromSession,prodle: $scope.product_prodle});
              }
              else
                alert("You dont have rights to delete this product...");
            }
            //delete product


            $scope.hideIfNotUser = function(fullname) {
              if (fullname) {
                if (fullname !== $scope.userFullnameFromSession) {
                  return {display: "none"}
                }
              }
            }

            $scope.hideIfNoOrg = function(orgname) {
              if ((orgname == "") || (orgname == " ") || (orgname == undefined) || (orgname == null)) {
                return{display: "none"}
              }
            }
            $scope.hideIfNogrp = function(grpname) {
              if ((grpname == "") || (grpname == " ") || (grpname == undefined) || (grpname == null)) {
                return{display: "none"}
              }
            }

            //Product discontinued visibility testing
//                if (($scope.product !== undefined) || ($scope.product !== ""))
//                {
//                    $scope.status = "deactive";
//                    if ($scope.status == "deactive")
//                    {
//
//                        document.getElementById("prodo-productDiscontinued").style.display = "block";
//                    }
//                    else
//                    {
//                        document.getElementById("prodo-productDiscontinued").style.display = "none";
//                    }
//                }
            //Product discontinued visibility testing





          }])

        