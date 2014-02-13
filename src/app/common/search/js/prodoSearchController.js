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
    $scope.selected = undefined;
    $scope.tempnames=[];
    $scope.search = {};
    $scope.result=[];
    $rootScope.productSearch={product:""};
    $scope.enhancement=[];

    $scope.searchProductP=function()
    { 
              $scope.tempnames=[];  
              searchProductService.searchProduct();    
              $scope.$on('notGotAllProducts', function (event, data) {
      
               });



    };//


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


    $scope.searchProductData = function () {
      $scope.search.productsearchdata={};
      if ($scope.product_name !== '') {
                var temp=$scope.product_name.replace(/\s/g, "");
                $scope.search.productsearchdata.Product_Name = temp;
                temp="";
      }
      if ($scope.model_number !== '') {
                 var temp=$scope.model_number.replace(/\s/g, "");
                $scope.search.productsearchdata.Model_Number = temp;
                temp="";
      }
      if ($scope.category !== '') {
                 var temp=$scope.category.replace(/\s/g, "");
                $scope.search.productsearchdata.Category = temp;
                temp="";
      }
      if ($scope.feature !== '') {
                 var temp=$scope.feature.replace(/\s/g, "");
                $scope.search.productsearchdata.Feature = temp;
                temp="";
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
        $rootScope.product_prodle=dataProdle;
        $rootScope.orgid=dataOrgid;
       
        $('#testmodal').modal('hide');
        $('.modal-backdrop').remove(); 
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





$scope.$on('gotAllProducts', function (event, data) {
        $scope.productNames=data.success.doc;
        $scope.enhancement=data.name.doc;
                for(var i=0;i<$scope.productNames.length;i++)
                {
                          var temp1=$scope.productNames[i].name;
                          $scope.tempnames.push(temp1);
                          temp1="";
                }
     
      });







    $scope.sampleDataEmitSearch = function () {
                 var data9={};
                 angular.forEach($scope.productNames, function(state) {
                  if ($rootScope.productSearch.product === state.name) {
                    data9 = {prodle: state.prodle,orgid:state.orgid};
                    $rootScope.product_prodle=state.prodle;
                    $rootScope.orgid=state.orgid;
               
                  }
                  });

      $rootScope.$emit('product', data9);
      console.log("Emit" +data9.prodle);      
  
      };
  }
]);