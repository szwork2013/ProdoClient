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
        .controller('ProductController', ['$scope', 'ProductService', 'ProductSaveService', function($scope, ProductService, ProductSaveService) {
                $scope.productComments = {comments: [{}]};
                $scope.product = {product: [{}]};
                $scope.newProduct = {product: [{}]};

                ProductService.getProduct({prodle: 'xkWw_RNsr'},
                function(successData) {

                    console.log(successData.success.product.product_comments);
                    $scope.product = successData.success.product;
                    $scope.productComments = successData.success.product.product_comments;
                },
                        function(error) {
                            console.log(error);
                        });

                console.log(ProductService.getProduct({prodle: 'xkWw_RNsr'}));
                $scope.mytags;
                $scope.commenttextField = {userComment: ''};
                $scope.pretags = ['addition', 'aggregate', 'all', 'bad news', 'budget', 'cost', 'damage', 'entirety',
                    'expense', 'extent', 'list', 'lot', 'net', 'outlay', 'output', 'price tag', 'product', 'quantum', 'score',
                    'set-back', 'sum', 'tab', 'tidy sum', 'whole', 'article', 'asset', 'belonging', 'chattel', 'goods', 'line',
                    'material', 'object', 'produce', 'property', 'specialty', 'stock', 'thing', 'ware', 'good'];



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


                $scope.addProduct = function()
                {

                    $scope.newProduct = {product: {
//                            
                            display_name: $scope.display_name,
//                            orgid: $scope.product.orgid,
                            serial_no: $scope.product.serial_no,
                            model_no: $scope.product.model_no,
                            name: $scope.product.name,
                            description: $scope.product.description
                        }};


                    ProductSaveService.saveProduct($scope.newProduct,
                            function(success) {
                                console.log(success);
                                $scope.handleSaveProductResponse(success);      // calling function to handle success and error responses from server side on POST method success.
                            },
                            function(error) {
                                console.log(error);
                            });


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

                //Product discontinued visibility 
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

            }])

        