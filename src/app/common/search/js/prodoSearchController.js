angular.module('prodo.ProdoWallApp').controller('prodoSearchController', [
  '$scope',
  '$log',
  '$rootScope',
  'prodoSearchService',
  'UserSessionService',
  'searchProductService',
  '$http',
  '$resource' ,
  function ($scope, $log, $rootScope, prodoSearchService, UserSessionService, searchProductService, $http, $resource) {
//Declaration of variables
    $scope.productNames=[];  //Store objects from searchproduct api
    $scope.selected = undefined; 
    $scope.tempnames=[]; 
    $scope.search = {}; //Object for storing search query string
    $scope.result=[];
    $rootScope.productSearch={product:""};    // Roostscope to transfer prodle data to productcontroller
    $rootScope.enhancement={};    // Temporary variable to display product names
    $scope.searchCriterion={};
    $scope.count=0;  //  Used to prevent api from calling if all fields are empty
    var arraywithnames =[];
    $scope.names=[];
          $scope.getSearchResult=function(val)
          {




                $scope.searchCriterion.name=val;
                 return $http({
                method: 'POST',
                url: '/api/allproduct/',
                data: $scope.searchCriterion
                }).success(function (data, status, headers, cfg) 
                {

                             var addresses = [];  $scope.names=[];
                             angular.forEach(data.name.doc, function(item){
                             addresses.push(item);
                             $scope.names.push(item);
                             }); 
                             console.log(addresses);

                             return addresses;


                }
                ).error(function (data, status, headers, cfg) {
                console.log(data);                     
                });   




         
          };

////////////// Test functions    ///////////////////////////////
           var dataTEST=[];
           $scope.a = function()
           {
              
               dataTEST = $scope.getSearchResult("s");
               console.log("data received from getSearchResult function :"+ dataTEST);
               //console.log("data in scope : " + $scope.names);
           };

            // var data111=['omkar','kanekar','a'];
            // $scope.getSearchResult11=function(val)
            // {
               
            //    return data111;
            // };

  //////////////////////////////////////////////////////////////////////////////////////////       
          



//Watch added on search textbox to call api on every character change. productSearch.product is a ng-model of textbox
//If content of textbox is not null
//parameter is poassed on to function on which service is called : format:{name: 'criteria'}
    // $rootScope.$watch('productSearch.product', function() { 
    // if($scope.productSearch.product!=="")
    // {     
    //       $scope.searchCriterion.name=$scope.productSearch.product;
    //       $scope.searchProductP($scope.searchCriterion);
                
    // } 
             
    // });
//This is the function callen on every character change from simple search text box
//searchProductService is a service which calles ''allproduct'' API

    // $scope.searchProductP=function(data)
    // {             
    //           searchProductService.searchProduct(data);    
    //           $scope.$on('notGotAllProducts', function (event, data) {
    //            });
    // };//
//The following code is written using directive concept
//The api is called in prodoSearch directive on keyup event
//The data is directly accessible in tpl 

//This is defined outside above function in order to make data available throughout this file
   // $scope.$on('gotAllProducts', function (event, data) 
   //  {    
   //       $scope.enhancement=[]; 
   //       $scope.enhancement=data.name.doc;     //$scope.enhancement is an array which stores name of products from api : used in typeahead
   //       $scope.productNames=data.success.doc;      //$scope.productNames is an array of objectrs which stores information of products result     
   //  });
//The following function is called when search button is clicked from advanced search modal
    $scope.searchProductData = function () 
    {
         $scope.count=0;
         $scope.search.productsearchdata={};
         if ($scope.product_name !== '') 
         {
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
         if ($scope.category !== '') 
         {
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
         if ($scope.org !== '') 
         {
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
         {         
                 console.log("Json file " + JSON.stringify($scope.search));
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

//This function is called when a product from type-A is selected
//It will search for respective prodle and orgid of product and assign it to rootscope variables
    $scope.sampleDataEmitSearch = function () 
    {
        angular.forEach($rootScope.productNames, function(state) 
        {
                if ($rootScope.productSearch.product === state.name) 
                {               
                    $rootScope.product_prodle=state.prodle;
                    $rootScope.orgid=state.orgid;
                           
                }
         });

    };
//End of controller  

  }
]);