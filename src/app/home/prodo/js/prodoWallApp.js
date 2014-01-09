angular.module('prodo.ProdoWallApp')
	.controller('ProdoWallController', ['$scope', '$state', '$log', function($scope, $state, $log) {
		
    // $state.transitionTo('prodo.wall');
    
    $scope.slides = [
      {image: '/common/slider/gallery/bg1.jpg'},
      {image: '/common/slider/gallery/bg2.jpg'},
      {image: '/common/slider/gallery/bg3.jpg'},
      {image: '/common/slider/gallery/bg5.jpg'},
      {image: '/common/slider/gallery/bbb-bg.jpg'}
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
