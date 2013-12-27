/*
 * Overview: Warranty Controller 
 * This controller will handle all warranty tasks...
 * Dated: 09/12/2013.
 * Author: Bhagyashri Jangam
 * Copyright: Prodonus Software Private Limited and GiantLeap Systems Private Limited 2013
 * Change History:
 *
 * date | author | description 
 *
 * 27-3/2013 | xyx | Add a new property
 * 
 */

angular.module('prodo.WarrantyApp')

        .controller('WarrantyController', ['$scope', 'WarrantyService', 'WarrantySaveService',  function($scope, WarrantyService, WarrantySaveService ) {
            $scope.warrantyComments = {comments: [{}]};
            $scope.mytags;
            $scope.warranty;
            $scope.userIDFromSession;
            $scope.userFullnameFromSession;
            $scope.socket;
            $scope.newWarranty = {product: [{}]};
            $scope.commenttextField = {userComment: ''};
            $scope.type = "warranty";
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

//            //get login details
//            $scope.logindata = GetLoginService.checkLogin(
//                    function(successData) {
//                      console.log("session" + JSON.stringify(successData));
//                      localStorage.sid = successData.sessionid;
//                      $scope.userIDFromSession = successData.userid;
//                      $scope.userFullnameFromSession = successData.fullname;
//                    },
//                    function(error) {
//                      console.log(error);
//                    });
//            //get login details


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

            //error handling for add product
            $scope.handleSaveWarrantyResponse = function(data) {
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

            $scope.productWarranty = {warranty: [{
                  warrantyno: "1",
                  modelno: "1123",
                  serialno: "123123",
                  dateofpurchase: "12 Nov 13",
                  invoiceno: "2"
                },
                {
                  warrantyno: "2",
                  modelno: "2343",
                  serialno: "12345345323",
                  dateofpurchase: "11 Nov 13",
                  invoiceno: "4"
                },
                {
                  warrantyno: "3",
                  modelno: "654645",
                  serialno: "7676767",
                  dateofpurchase: "12 Oct 13",
                  invoiceno: "5"
                }
              ]};

            console.log("data= " + $scope.productWarranty.warranty);

            //get product function declaration
            $scope.getWarrantyFunction = function()
            {

              WarrantyService.getWarranty({prodle: 'xk7i99lj8'},
              function(successData) {

                console.log(successData.success.warranty.warranty_comments);
                $scope.warranty = successData.success.warranty;
                //   $scope.product_prodle = successData.success.product.prodle;
                $scope.warrantyComments = successData.success.warranty.warranty_comments;
              },
                      function(error) {
                        console.log(error);
                      });
            }
            //get product function declaration  


         //   $scope.getWarrantyFunction();
            //   console.log(ProductService.getProduct({prodle: 'eyYHSKVtL'}));

            //get latest comments posted by others
            $scope.getLatestComments = function() {

              $scope.getWarrantyFunction();
              var a = document.getElementById("responseComment");
              a.style.display = 'none';
              a.innerHTML = "";
              //code to get latest comments
            };
            //get latest comments posted by others

            $scope.warrantyComments = {
              comments: [{
                  commenttext: "good warranty service",
                  status: "active",
                  datecreated: "2013-12-16T07:53:52.725Z",
                  tags: [],
                  user: {
                    userid: "uxkfzVj7or",
                    fullname: "Bhagyashri"
                  }
                },
                {
                  commenttext: "hiii",
                  status: "active",
                  datecreated: "2013-12-16T07:50:47.763Z",
                  tags: [],
                  user: {
                    userid: "uxkfzVj7or",
                    fullname: "Bhagyashri"
                  }

                }]
            };

            $scope.deleteWarranty = function(warranty) {
              var index = $scope.productWarranty.warranty.indexOf(warranty);
              if (index != -1)
                $scope.productWarranty.warranty.splice(index, 1);
              // if(user has product organization account)
              // WarrantyService.deleteWarranty({prodle: $scope.product_prodle});
              // else alert("You dont have access to delete this product");
            };

            $scope.hideIfNotUser = function(fullname) {
              if (fullname) {
                if (fullname !== $scope.userFullnameFromSession) {
                  return {
                    display: "none"
                  }
                }
              }
            }

            $scope.addWarranty = function() {
              $scope.newWarranty = {warranty: {
                  warrantyno: "4",
                  modelno: $scope.warranty.modelno,
                  serialno: $scope.warranty.serialno,
                  dateofpurchase: $scope.warranty.dateofpurchase,
                  invoiceno: $scope.warranty.invoiceno
                }};
//              WarrantySaveService.saveWarranty($scope.newWarranty.warranty,
//                      function(success) {
//                        console.log(success);
//                        $scope.handleSaveWarrantyResponse(success); // calling function to handle success and error responses from server side on POST method success.
//                      },
//                      function(error) {
//                        console.log(error);
//                      });

              $scope.productWarranty.warranty.push($scope.newWarranty.warranty);
              $scope.warranty.modelno = "";
              $scope.warranty.serialno = "";
              $scope.warranty.dateofpurchase = "";
              $scope.warranty.invoiceno = "";

            };
            
          }]);
