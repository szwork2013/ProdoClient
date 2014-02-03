angular.module('prodo.ProdoWallApp').controller('prodoSearchController', [
  '$scope',
  '$log',
  '$rootScope',
  'prodoSearchService',
  'UserSessionService',
  '$http',
  function ($scope, $log, $rootScope, prodoSearchService, UserSessionService, $http) {
    $scope.TrendingProducts = [
      { productname: 'Products Followed' },
      { productname: 'Sony' },
      { productname: 'Videocon' },
      { productname: 'LG' },
      { productname: 'Motorola' }
    ];
    $scope.FollowedProducts = [
      { productname: 'Samsung Galaxy 4' },
      { productname: 'Samsung Note II' },
      { productname: 'Samsung Washing Machine' },
      { productname: 'Samsung LCD 32 inches' },
      { productname: 'Samsung S4' }
    ];
    $scope.products_id = [
      {
        'key': '1',
        'value': 'Nokia Lumia 720'
      },
      {
        'key': '2',
        'value': 'Samsung Galaxy Pro'
      },
      {
        'key': '3',
        'value': 'Micromax Canvas'
      },
      {
        'key': '4',
        'value': 'Micromax Canvas Doodle'
      },
      {
        'key': '5',
        'value': 'HTC Pro'
      },
      {
        'key': '6',
        'value': 'Apple Ipad'
      },
      {
        'key': '7',
        'value': 'Nokia 6600'
      },
      {
        'key': '8',
        'value': 'Videocone'
      },
      {
        'key': '9',
        'value': 'Blackberry Boss '
      },
      {
        'key': '10',
        'value': 'Sony'
      }
    ];
    $scope.search = {};
    $scope.searchProductData = function () {
      if ($scope.product_name !== '') {
        $scope.search.Product_Name = $scope.product_name;
      }
      if ($scope.model_number !== '') {
        $scope.search.Model_number = $scope.model_number;
      }
      if ($scope.category !== '') {
        $scope.search.Category = $scope.category;
      }
      if ($scope.feature !== '') {
        $scope.search.Feature = $scope.feature;
      }
      prodoSearchService.searchProduct($scope.search);
      $scope.$on('getSearchProductDone', function (event, data) {
      });
      $scope.$on('getSearchProductNotDone', function (event, data) {
      });
    };
    $scope.modalReset = function () {
      document.getElementById('textBoxCategoryName').value = '';
      document.getElementById('textBoxModelNumber').value = '';
      document.getElementById('textBoxFeatureName').value = '';
      document.getElementById('textBoxProductName').value = '';
      $scope.search = {};
    };
    $scope.sampleDataEmitSearch = function () {
      var data9 = {
          prodle: 'xkdiPXcT_',
          orgid: 'orgxkpxhIFau'
        };
      $rootScope.$emit('product', data9);
      console.log('inside function' + data9);
    };
  }
]);