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

        .controller('WarrantyController', ['$scope', 'WarrantyService', function($scope, WarrantyService) {

            $scope.productComments = {comments: [{}]};
            $scope.mytags;
            $scope.commenttextField = {userComment: ''};
            $scope.type = "warranty";
            $scope.pretags = ['addition', 'aggregate', 'all', 'bad news', 'budget', 'cost', 'damage', 'entirety',
              'expense', 'extent', 'list', 'lot', 'net', 'outlay', 'output', 'price tag', 'product', 'quantum', 'score',
              'set-back', 'sum', 'tab', 'tidy sum', 'whole', 'article', 'asset', 'belonging', 'chattel', 'goods', 'line',
              'material', 'object', 'produce', 'property', 'specialty', 'stock', 'thing', 'ware', 'good'];

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




//                WarrantyService.getWarranty({prodle: 'eyYHSKVtL'},
//                function(successData) {
//
//                    console.log(successData.success.warranty.product_comments);
//
//                    $scope.productComments = successData.success.warranty.product_comments;
//                },
//                        function(error) {
//                            console.log(error);
//                        });

            //   console.log(WarrantyService.getWarranty({prodle: 'eyYHSKVtL'}));






            $scope.productComments = {
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

            }
            $scope.addWarranty = function() {
              $scope.productWarranty.warranty.push(
                      {
                        warrantyno: "4",
                        modelno: $scope.warranty.modelno,
                        serialno: $scope.warranty.serialno,
                        dateofpurchase: $scope.warranty.dateofpurchase,
                        invoiceno: $scope.warranty.invoiceno
                      }


              );
              $scope.warranty.modelno = "";
              $scope.warranty.serialno = "";
              $scope.warranty.dateofpurchase = "";
              $scope.warranty.invoiceno = "";

            }




          }]);
