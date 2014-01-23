angular.module('prodo.ProdoWallApp')
.controller("prodoSearchController",['$rootScope', '$scope', '$state', '$stateParams', '$log', 'UserSessionService', 'UserSubscriptionService',  function($rootScope, $scope, $state, $stateParams, $log, UserSessionService, UserSubscriptionService)
{

$scope.TrendingProducts = [
            {productname: 'Products Followed'},
            {productname: 'Sony'},
            {productname: 'Videocon'},
            {productname: 'LG'},
            {productname: 'Motorola'}
        ];
        $scope.FollowedProducts = [
            {productname: 'Samsung Galaxy 4'},
            {productname: 'Samsung Note II'},
            {productname: 'Samsung Washing Machine'},
            {productname: 'Samsung LCD 32 inches'},
            {productname: 'Samsung S4'}
        ];
  // Code for Advance Search
 

$scope.products_id = 
[

{'key':'1' , 'value':'Nokia Lumia 720' },
{'key':'2' , 'value':'Samsung Galaxy Pro'},
{'key':'3' , 'value':'Micromax Canvas'},
{'key':'4' , 'value':'Micromax Canvas Doodle'},
{'key':'5' , 'value':'HTC Pro'},
{'key':'6' , 'value':'Apple Ipad' },
{'key':'7' , 'value':'Nokia 6600'}, 
{'key':'8' , 'value':'Videocone'},
{'key':'9' , 'value':'Blackberry Boss '},
{'key':'10', 'value':'Sony'}
 
 ];





}
]);