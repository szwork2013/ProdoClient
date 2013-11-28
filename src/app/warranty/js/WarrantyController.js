/**
 *	Prodo Controller
 **/
angular.module('prodo.WarrantyApp')
        .controller('WarrantyController', ['$scope', function($scope) {

                $scope.mytags;
                $scope.commenttextField = {textFieldc: ''};
                $scope.pretags = ['addition', 'aggregate', 'all', 'bad news', 'budget', 'cost', 'damage', 'entirety',
                    'expense', 'extent', 'list', 'lot', 'net', 'outlay', 'output', 'price tag', 'product', 'quantum', 'score',
                    'set-back', 'sum', 'tab', 'tidy sum', 'whole', 'article', 'asset', 'belonging', 'chattel', 'goods', 'line',
                    'material', 'object', 'produce', 'property', 'specialty', 'stock', 'thing', 'ware', 'good'];
                $scope.productComments = {
                    comments: [{
                            userName: "Ramesh",
                            companyName: "Giant Leap Systemsss",
                            time: Date.now(),
                            text: "Warranty service is good",
                            tags: ['good', 'some', 'cool', 'bad'],
                            group: "Support",
                            dp: "http://placehold.it/64x64"

                        }, {
                            userName: "Sunil",
                            companyName: "Giant Leap Systems",
                            time: Date.now(),
                            text: "Prodonus is really cool :)",
                            tags: ['great', 'bad'],
                            group: "Developer",
                            dp: "http://placehold.it/64x64"

                        }]
                };


            }]);
