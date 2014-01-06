angular.module('prodo.ProdoWallApp')
	.controller('ProdoDashboardController', ['$scope', '$state', function($scope, $state) {

		$scope.data = [
                    {
											key: "Awesome", y: 500 
										},
										{
											key: "Good",  y: 200
										},
										{
											key: "Average",  y: 900
										},
										{
											key: "Bad",  y: 700
										},
										{
											key: "Worst", y: 400
										},
									];

	}]);