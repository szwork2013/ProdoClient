angular.module('prodo.ProdoWallApp')
	.controller('ProdoWallController', ['$scope', '$state', function($scope, $state) {

		$state.transitionTo('prodo.wall');
    $scope.slides = [
            {image: 'http://placekitten.com/605/350'},
            {image: 'http://placekitten.com/601/350'},
            {image: 'http://placekitten.com/602/350'},
            {image: 'http://placekitten.com/603/350'},
            {image: 'http://placekitten.com/604/350'}
        ];


            // $(document).ready(function(){
            //         alert("Slideri");
            //     $('#layerslider').layerSlider({
            //         skinsPath : '../../../vendor/layerslider/skins/',
            //         skin : 'glass',
            //         thumbnailNavigation : 'hover',
            //         hoverPrevNext : false,
            //         autoPlayVideos : false
            //     });
            // }); 


        $scope.TrendingProducts = [
            {productname: 'Samsung'},
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
        $scope.prodotabs = [
            {value: 'Organisation'},
            {value: 'Product'},
            {value: 'Warranty'},
            {value: 'Blog'},
            {value: 'Dashboard'}
        ];
        $scope.currentIndex = 0;
        $scope.isCurrentTabIndex = function (index) {
            return $scope.currentIndex === index;
        };

        $scope.isCurrentListIndex = function (index) {
            return $scope.currentIndex === index;
        };
	}]);
