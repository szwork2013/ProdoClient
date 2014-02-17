angular.module('prodo.ProdoWallApp').controller('prodoSearchController', [
  '$scope',
  '$log',
  '$rootScope',
  'prodoSearchService',
  'UserSessionService',
  'searchProductService',
  '$http',
  function ($scope, $log, $rootScope, prodoSearchService, UserSessionService, searchProductService, $http) {
//Declaration of variables
    $scope.productNames=[];
    $scope.selected = undefined;
    $scope.tempnames=[];
    $scope.search = {};
    $scope.result=[];
    $rootScope.productSearch={product:""};
    $scope.enhancement=[];
    $scope.searchCriterion={};
    $scope.count=0;


//Watch added on search textbox to call api on every character change. productSearch.product is a ng-model of textbox
//If content of textbox is not null
//parameter is poassed on to function on which service is called : format:{name: 'criteria'}
               $rootScope.$watch('productSearch.product', function() { 
               if($scope.productSearch.product!=="")
               {     
                    $scope.searchCriterion.name=$scope.productSearch.product;
                    $scope.searchProductP($scope.searchCriterion);
                
                   } 
             
                });




//This is the function callen on every character change from simple search text box
//searchProductService is a service which calles ''allproduct'' API

    $scope.searchProductP=function(data)
    { 
              
              searchProductService.searchProduct(data);    
              $scope.$on('notGotAllProducts', function (event, data) {
      
               });

    };//


//This is defined outside above function in order to make data available throughout this file
$scope.$on('gotAllProducts', function (event, data) {
       
          $scope.enhancement=[]; 
          $scope.enhancement=data.name.doc;     //$scope.enhancement is an array which stores name of products from api : used in typeahead
           console.log("names=" + data.name.doc);
          $scope.productNames=data.success.doc;      //$scope.productNames is an array of objectrs which stores information of products result     
      });



//The following function is called when search button is clicked from advanced search modal
    $scope.searchProductData = function () {
      $scope.count=0;
      $scope.search.productsearchdata={};
      if ($scope.product_name !== '') {
                var temp=$scope.product_name.replace(/\s/g, "");     //Declared temporary variable to remove spaces from search query
                $scope.search.productsearchdata.Product_Name = temp;
                temp="";
      }
      else
      {
        $scope.search.productsearchdata.Product_Name=""; 
       $scope.count++;
      }
      if ($scope.model_number !== '') {
                 var temp=$scope.model_number.replace(/\s/g, "");
                $scope.search.productsearchdata.Model_Number = temp;
                temp="";
      }
      else
      {
        $scope.search.productsearchdata.Model_Number="";
       $scope.count++;
      }
      if ($scope.category !== '') {
                 var temp=$scope.category.replace(/\s/g, "");
                $scope.search.productsearchdata.Category = temp;
                temp="";
      }
      else
      {
       $scope.search.productsearchdata.Category="";
      $scope.count++;
      }
      if ($scope.feature !== '') {
                 var temp=$scope.feature.replace(/\s/g, "");
                $scope.search.productsearchdata.Feature = temp;
                temp="";
      }
      else
      {
         $scope.search.productsearchdata.Feature="";
       $scope.count++;
      }
       if ($scope.org !== '') {
                 var temp=$scope.org.replace(/\s/g, "");
                $scope.search.productsearchdata.Organization_Name = temp;
                temp="";
      
      }
      else
      {
        $scope.search.productsearchdata.Organization_Name="";
       $scope.count++;     
      }


      //Following if statement is to check whether all fields are empty
      //If all are empty then dont call API

     if($scope.count==5)
      {
      }
     else
      {         console.log("Json file " + JSON.stringify($scope.search));
                prodoSearchService.searchProduct($scope.search);    //Calling searchproduct api for advanced search; Format for input is {productsearchdata:{''}}
               // $scope.search.productsearchdata= {};
                $scope.$on('getSearchProductDone', function (event, data) {
                $scope.result=data.success.doc;
                  $scope.message=data.success.message;
                  //alert($scope.message);
                });
                $scope.$on('getSearchProductNotDone', function (event, data) {
                });

      }

    };


//This function assigns prodles and orgid to rootscope 

$scope.emitProdle=function(dataProdle,dataOrgid)
{
        $rootScope.product_prodle=dataProdle;
        $rootScope.orgid=dataOrgid;    
        $('#testmodal').modal('hide');  //code for cloasing modal
        $('.modal-backdrop').remove(); 
};






//This functions resets the advanced search modal

    $scope.modalReset = function () 
    {
              $scope.message="";
              document.getElementById('textBoxCategoryName').value = '';
              document.getElementById('textBoxModelNumber').value = '';
              document.getElementById('textBoxFeatureName').value = '';
              document.getElementById('textBoxProductName').value = '';
              document.getElementById('textBoxOrgName').value='';
              $scope.product_name="";
              $scope.model_number="";
              $scope.category="";
              $scope.feature="";
              $scope.search.productsearchdata = {};
              $scope.result=[];
              $scope.org="";
    };











    $scope.sampleDataEmitSearch = function () {
        var data9={};
        angular.forEach($scope.productNames, function(state) 
        {
                if ($rootScope.productSearch.product === state.name) 
                {
                    data9 = {prodle: state.prodle,orgid:state.orgid};
                    $rootScope.product_prodle=state.prodle;
                   $rootScope.orgid=state.orgid;
                           
                }
         });

    };
//End of controller  

  }
]);