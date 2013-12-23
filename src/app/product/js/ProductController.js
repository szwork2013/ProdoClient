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
        .controller('ProductController', ['$scope', 'ProductService', 'ProductSaveService', 'GetLoginService', function($scope, ProductService, ProductSaveService, GetLoginService) {
            //var global declaration
            $scope.productComments = {comments: [{}]};
            $scope.newProductComment = [];
            $scope.product = {product: [{}]};
            $scope.newProduct = {product: [{}]};
            $scope.type = "product";
            $scope.productCommentResponsearray = [];
            $scope.userIDFromSession;
            $scope.userFullnameFromSession;
            $scope.socket;
            $scope.pendingCommentCount = 03;
            $scope.mytags;
            $scope.product_prodle;
            $scope.commenttextField = {userComment: ''};
            $scope.pretags = ['addition', 'aggregate', 'all', 'bad news', 'budget', 'cost', 'damage', 'entirety',
              'expense', 'extent', 'list', 'lot', 'net', 'outlay', 'output', 'price tag', 'product', 'quantum', 'score',
              'set-back', 'sum', 'tab', 'tidy sum', 'whole', 'article', 'asset', 'belonging', 'chattel', 'goods', 'line',
              'material', 'object', 'produce', 'property', 'specialty', 'stock', 'thing', 'ware', 'good'];


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
            $scope.logindata = GetLoginService.checkLogin(
                    function(successData) {
                      console.log("session" + JSON.stringify(successData));
                      localStorage.sid = successData.sessionid;
                      $scope.userIDFromSession = successData.userid;
                      $scope.userFullnameFromSession = successData.fullname;
                    },
                    function(error) {
                      console.log(error);
                    });
            //get login details

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
                var count = $scope.productCommentResponsearray.length;
                console.log(count);
                var a = document.getElementById("responseComment");
                a.style.display = 'inline';
                a.innerHTML = count + ' new comments';
                // a.textContent(JSON.stringify(result.success.product_comment).length + " new comments")
              }
              // $scope.socket.removeAllListeners();
            })
            //productComment response 




            //get product function declaration
            $scope.getProductFunction = function()
            {

              ProductService.getProduct({prodle: 'xk7i99lj8'},
              function(successData) {

                console.log(successData.success.product.product_comments);
                $scope.product = successData.success.product;
                $scope.product_prodle = successData.success.product.prodle;
                $scope.productComments = successData.success.product.product_comments;
              },
                      function(error) {
                        console.log(error);
                      });
            }
            //get product function declaration  


            $scope.getProductFunction();
            //   console.log(ProductService.getProduct({prodle: 'eyYHSKVtL'}));



            //testing
            $scope.getLatestComments = function() {

              $scope.getProductFunction();
              var a = document.getElementById("responseComment");
              a.style.display = 'none';
              a.innerHTML = "";
              //code to get latest comments
            };
            //testing


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
              ProductSaveService.saveProduct($scope.newProduct,
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
              // if(user has product organization account)
              ProductService.deleteProduct({prodle: $scope.product_prodle});
              // else alert("You dont have access to delete this product");
            }



            //delete product


            $scope.hideIfNotUser = function(fullname) {
              if (fullname) {
                if (fullname !== $scope.userFullnameFromSession) {
                  return {
                    display: "none"
                  }
                }
              }
            }


             
          

            // $scope.productComments = {
            //     comments: [{
            //             userName: "Bhagyashri",
            //             companyName: "Giant Leap Systemsss",
            //             time: Date.now(),
            //             text: "I like this web site",
            //             tags: ['great', 'some', 'cool', 'bad'],
            //             group: "Support",
            //             dp: "http://placehold.it/64x64"

            //         }, {
            //             userName: "Neha",
            //             companyName: "Giant Leap Systems",
            //             time: Date.now(),
            //             text: "Prodonus is really cool :)",
            //             tags: ['great', 'bad'],
            //             group: "Developer",
            //             dp: "http://placehold.it/64x64"

            //         }]
            // };



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

        