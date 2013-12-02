/**
 *	Prodo Controller
 **/
angular.module('prodo.ProductApp')
    .controller('ProductController', ['$scope', 'ProductService',function($scope, ProductService) {
        $scope.productComments = {comments: [{}]};

        ProductService.getProduct({prodle: 'xkWw_RNsr'}, 
          function(successData) {
            console.log(successData.success.product.product_comments);
            $scope.productComments = successData.success.product.product_comments;
          },
          function(error){
            console.log(error);
        });  

        // console.log(ProductService.getProduct({prodle: 'xkWw_RNsr'}));
        $scope.mytags;
        $scope.commenttextField = {textFieldc: ''};
        $scope.pretags = ['addition', 'aggregate', 'all', 'bad news', 'budget', 'cost', 'damage', 'entirety',
            'expense', 'extent', 'list', 'lot', 'net', 'outlay', 'output', 'price tag', 'product', 'quantum', 'score',
            'set-back', 'sum', 'tab', 'tidy sum', 'whole', 'article', 'asset', 'belonging', 'chattel', 'goods', 'line',
            'material', 'object', 'produce', 'property', 'specialty', 'stock', 'thing', 'ware', 'good'];
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
 }]);
