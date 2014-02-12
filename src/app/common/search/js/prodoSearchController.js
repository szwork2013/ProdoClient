angular.module('prodo.ProdoWallApp').controller('prodoSearchController', [
  '$scope',
  '$log',
  '$rootScope',
  'prodoSearchService',
  'UserSessionService',
  'searchProductService',
  '$http',
  function ($scope, $log, $rootScope, prodoSearchService, UserSessionService, searchProductService, $http) {
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


$scope.productNames=[];




    $scope.searchProductP=function()
    { 
      
    
      searchProductService.searchProduct();

    
      $scope.$on('notGotAllProducts', function (event, data) {
      
      });



    };

   $scope.$on('gotAllProducts', function (event, data) {

        $scope.productNames=data.success.doc;
     
      });














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
    $scope.result=[];
    
    $rootScope.productSearch={product:""};



    $scope.searchProductData = function () {
      $scope.search.productsearchdata={};
      if ($scope.product_name !== '') {
        $scope.search.productsearchdata.Product_Name = $scope.product_name;
      }
      if ($scope.model_number !== '') {
        $scope.search.productsearchdata.Model_Number = $scope.model_number;
      }
      if ($scope.category !== '') {
        $scope.search.productsearchdata.Category = $scope.category;
      }
      if ($scope.feature !== '') {
        $scope.search.productsearchdata.Feature = $scope.feature;
      }
      prodoSearchService.searchProduct($scope.search);
     // $scope.search.productsearchdata= {};
      $scope.$on('getSearchProductDone', function (event, data) {
        $scope.result=data.success.doc;
        //alert($scope.result);
        // if(data.success.doc===null)
        // {
        //   console.log("null");
        //   document.getElementById("prodo-searchResults").className="displayresult";
        // }
        // else
        // { console.log(" not null");
        //    document.getElementById("prodo-searchResults").className="displaynoresult";
        // }
        $scope.message=data.success.message;
        //alert($scope.message);
      });
      $scope.$on('getSearchProductNotDone', function (event, data) {
      });
    };




$scope.emitProdle=function(dataProdle,dataOrgid)
{
dataOfAdvancedSearch = {prodle: dataProdle,orgid:dataOrgid};
$rootScope.$emit("product",dataOfAdvancedSearch);console.log("sent to Bhagyashri ");
};








    $scope.modalReset = function () {
   // document.getElementById("prodo-searchResults").className="displaynoresult";
      $scope.message="";
      document.getElementById('textBoxCategoryName').value = '';
      document.getElementById('textBoxModelNumber').value = '';
      document.getElementById('textBoxFeatureName').value = '';
      document.getElementById('textBoxProductName').value = '';
      $scope.product_name="";
      $scope.model_number="";
      $scope.category="";
      $scope.feature="";
      $scope.search.productsearchdata = {};
      $scope.result=[];
    };


//////////////////////////// tryl and error


////////////////////////////////////////









    $scope.sampleDataEmitSearch = function () {

     var data9={};
     angular.forEach($scope.productNames, function(state) {
      if ($rootScope.productSearch.product === state.name) {
        data9 = {prodle: state.prodle,orgid:state.orgid};

        $rootScope.product_prodle=state.prodle;
        $rootScope.orgid=state.orgid;
   
      }
      });


      // var data9 = {
      //     prodle: 'xkdiPXcT_',
      //     orgid: 'orgxkpxhIFau'
      //   };
      $rootScope.$emit('product', data9);
      console.log("Emit" +data9.prodle);      

      };











  }
]);