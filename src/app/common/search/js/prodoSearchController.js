angular.module('prodo.ProdoWallApp').controller('prodoSearchController', [
  '$scope',
  '$log',
  '$rootScope',
  'prodoSearchService',
  'UserSessionService',
  'searchProductService',
  '$http',
  '$resource' ,
  'trendingProductService',
  'growl',
  function ($scope, $log, $rootScope, prodoSearchService, UserSessionService, searchProductService, $http, $resource,trendingProductService,growl) {
//Declaration of variables
console.log("rootscope"+$rootScope.orgid);
    $scope.productNames=[];  //Store objects from searchproduct api
    $scope.selected = undefined; 
    //$scope.tempnames=[]; 
    $scope.search = {}; //Object for .onstoring search query string
    $scope.result=[];
    $scope.productSearch={product:""};    // Roostscope to transfer prodle data to productcontroller
    $scope.enhancement={};    // Temporary variable to display product names
    $scope.searchCriterion={};
    $scope.count=0;  //  Used to prevent api from calling if all fields are empty
    $scope.names=[];   //testing
    $scope.message="";//This variable stores the message received from server 
    trendingProductService.getTrendingProducts();  //Calling service to get //Trending Products
    //$scope.followed_products={};
    $scope.trendingProducts={};  //This object will store array received from API; This is used in ng-repeat in the template
    $scope.errors="";
    $scope.title = "Trending Products"; //  This is the variable to toggle div tag heading (Second Box of sidebar); 
    $scope.limit=6;
    

          $scope.$on('gotTrendingProducts', function (event, data) //After getting Data from trending product aPI
          {
            $scope.trendingProducts=data.success.ProductTrends;
          });
          $scope.$on('notGotTrendingProducts', function (event, data) //Error handling needed for 
          {
            $scope.errors="Server Error";
          });

    //The following function was written to resolve the problem of getting search result in first letter/
    //Timebeing it is not being used
    //Need to test it out
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
                      $scope.errors="Server Error";           
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
         // $('#productSearchResult').css("display","none");
         // $('#orgSearchResult').css("display","none");
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
                 prodoSearchService.searchProduct($scope.search);    //Calling searchproduct api for advanced search; Format for input is {productsearchdata:{''}}
                 // $scope.search.productsearchdata= {};
                 $scope.$on('getSearchProductDone', function (event, data) {
                 $scope.result=data.success.doc;
                 
                 $scope.message="";
                 $scope.message=data.success.message;
                 console.log("data received from api --------------------------"+ JSON.stringify($scope.result));
                  //alert($scope.message);
                 });
                 $scope.$on('getSearchProductNotDone', function (event, data) {

                  $scope.errors="Server Error";

                 });

          }

    };




//This function assigns prodles and orgid to rootscope 
    $scope.orgProdleEmitter=function(dataProdle,dataOrgid)
    {   

        $rootScope.product_prodle=dataProdle;
        $rootScope.orgid=dataOrgid;    
        $('#advancedSearchModal').modal('hide');  //code for cloasing modal
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
              $scope.message="";
              // $('#productSearchResult').css("display","none");
              // $('#orgSearchResult').css("display","none");
    };




//This function is called when a product from simple search is selected
//It will search for respective prodle and orgid of product and assign it to rootscope variables
    $scope.quickSearchEmit = function () 
    {  
       // $rootScope.productSearch.product=$rootScope.productSearch.product.substring(2); //This is written to trim first two characters from string; eg: P-Prodonus Software to Prodonus Software
       
        angular.forEach($scope.productNames, function(state) 
        {
                if ($scope.productSearch.product === state.name) 
                {               
                    $rootScope.product_prodle=state.prodle;
                    $rootScope.orgid=state.orgid;
                           
                }
         });
       
        $scope.title = "Trending Products";
        $scope.productSearch.product="";
    };




    $scope.toggleTitleForDiv=function()
    {
         $scope.title="Search";
         $scope.errors="";
    };
    // $scope.callOrgDetailsAPI=function(orgid,orgname)
    // {
    //     var dataForOrgproductsAPI={};
    //     dataForOrgproductsAPI.orgname=orgname;
    //     dataForOrgproductsAPI.orgid=orgid;
    //     getOrgProductDetails.searchProductOrg(dataForOrgproductsAPI);
    // };



    //This function is called unfollow product from sidebar; When unfollow button is clicked list from productfollowedlist is spliced;
    $scope.unfollowProduct = function (product) { 

        UserSessionService.unfollowProduct(product.prodle);
        var clearresponse = $scope.$on("unfollowProductDone", function(event, data)
        {
                var index = UserSessionService.productfollowlist.indexOf(product);
                UserSessionService.productfollowlist.splice(index, 1);
                clearresponse(); 
        });
  
    };

    $scope.loadMoreFollowedProduct=function()
    {

        if($scope.limit===100)
        {
        document.getElementById('tabMore').innerHTML="More"
          $scope.limit=6;
         
        }
        else if($scope.limit===6)
        {
                document.getElementById('tabMore').innerHTML="Less";
                $scope.limit=100;
              
        }

    };


//End of controller  
         
  }
]);