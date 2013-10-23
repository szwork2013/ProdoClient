angular.module('prodo.ProdoWallApp',['ui.router', 'ui.bootstrap'])
	.directive('prodoComments', function () {
    return {
        restrict: 'A',
        templateUrl: 'home/prodo/views/template.html',
        scope: { comments: '=', pagesSize:'=', pagesShown:'=' },
        link: function(scope) {
            scope.commentsLimit = function() {
                return scope.pagesSize*scope.pagesShown;
            }
            
            scope.fromNow = function(time) {
              console.log(moment);
              return moment(time).fromNow();
            }
        }
    };
})
     .directive('whenScrolled', function() {
    return function(scope, elm, attr) {
        var raw = elm[0];
        
        elm.bind('scroll', function() {
            if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
                scope.$apply(attr.whenScrolled);
            }
        });
    };
})
	.controller('ProdoWallController', ['$scope', '$state', function($scope, $state) {

		$state.transitionTo('prodo.wall');
 
	$scope.comments;
    $scope.slides = [
            {image: 'http://placekitten.com/605/350'},
            {image: 'http://placekitten.com/601/350'},
            {image: 'http://placekitten.com/602/350'},
            {image: 'http://placekitten.com/603/350'},
            {image: 'http://placekitten.com/604/350'}
        ];
        $scope.listorgs = [
            {orgname: 'Samsung'},
            {orgname: 'Sony'},
            {orgname: 'Videocon'},
            {orgname: 'LG'},
            {orgname: 'Motorola'}
        ];
        $scope.listproducts = [
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
            {value: 'Blog'} 
        ];
        $scope.currentIndex = 0;
        $scope.isCurrentTabIndex = function (index) {
            return $scope.currentIndex === index;
        };

        $scope.isCurrentListIndex = function (index) {
            return $scope.currentIndex === index;
        };

        
  
    $scope.comments = [
      {
        time:Date.now(),
        text:"I like this web site"
      },{
        time:Date.now(),
        text:"Prodonus is really cool :)"
      }];

    $scope.add = function () {
      if(!$scope.textField) return;
     
      $scope.comments.unshift({
       time: Date.now(),
       text: $scope.textField
      });
       $scope.textField = "";
     
    }


 
		
	}]);
