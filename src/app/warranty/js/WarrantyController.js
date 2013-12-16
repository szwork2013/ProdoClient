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

.directive('datepicker', function() {
  return {
    link: function(scope, el, attr) {
      $(el).datepicker({
        onSelect: function(dateText) {
          console.log(dateText);
          var expression = attr.ngModel + " = " + "'" + dateText + "'";
          scope.$apply(expression);
          console.log(scope.startDate);
          // how do i set this elements model property ?
        }
      });
    }
  };
})

        .controller('WarrantyController', ['$scope', 'WarrantyService', function($scope, WarrantyService) {
                alert("inn controller");
                $scope.productComments = {comments: [{}]};
                $scope.mytags;
                $scope.commenttextField = {userComment: ''};
                 $scope.type="warranty";
                $scope.pretags = ['addition', 'aggregate', 'all', 'bad news', 'budget', 'cost', 'damage', 'entirety',
                    'expense', 'extent', 'list', 'lot', 'net', 'outlay', 'output', 'price tag', 'product', 'quantum', 'score',
                    'set-back', 'sum', 'tab', 'tidy sum', 'whole', 'article', 'asset', 'belonging', 'chattel', 'goods', 'line',
                    'material', 'object', 'produce', 'property', 'specialty', 'stock', 'thing', 'ware', 'good'];
                $scope.pendingCommentCount = 03;
             //    alert($scope.type);
 


                WarrantyService.getWarranty({prodle: 'eyYHSKVtL'},
                function(successData) {

                    console.log(successData.success.warranty.product_comments);

                    $scope.productComments = successData.success.warranty.product_comments;
                },
                        function(error) {
                            console.log(error);
                        });

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
                        console.log($scope.productComments);


            }]);
