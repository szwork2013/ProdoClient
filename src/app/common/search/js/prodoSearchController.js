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
  '$state',
  function ($scope, $log, $rootScope, prodoSearchService, UserSessionService, searchProductService, $http, $resource,trendingProductService, $state) {

  $scope.productNames = [];  
  //Store objects from searchproduct api

  $scope.selected = undefined; 

  $scope.search = {}; 
  //Object for .on storing search query string

  $scope.result = [];

  $scope.productSearch = {product:""};
  // Roostscope to transfer prodle data to productcontroller
    
  $scope.enhancement = {};    
  // Temporary variable to display product names

  $scope.searchCriterion = {};

  $scope.countForEmptyTextbox = 0;  
  //  Used to prevent api from calling if all fields are empty
  // For each text box from advanced search modal, if the text box is empty, Increment this variable

  $scope.names = [];   
  //testing

  $scope.message = "";
  //This variable stores the message received from server 

  trendingProductService.getTrendingProducts();  
  //Calling service to get //Trending Products

  $scope.trendingProducts = {};  
  //This object will store array received from API; This is used in ng-repeat in the template
  
  $scope.errors = "";

  $scope.title = "Trending Products"; 
  //  This is the variable to toggle div tag heading (Second Box of sidebar); 
  
  $scope.followedProductsCount = 6;

  var indexOfUnfollowedProduct=0;

  $scope.regularExpressionForProdonus = /^prodonus/i;
  //This regular expression is used to hide products starting with Prodonus
 
  $scope.openSearchModal = function() {
    $('#advancedSearchModal').modal({ 
      keyboard: false,
      backdrop: 'static',
      show: true
    });
  }

  var cleanEventGotTrendingProducts = $scope.$on('gotTrendingProducts', function (event, data) 
  {   
      if (data.success !== undefined) {
         $scope.trendingProducts = data.success.ProductTrends;
    };
  });
    
  var cleanEventNotGotTrendingProducts = $scope.$on('notGotTrendingProducts', function (event, data) //Error handling needed for 
  {
      $scope.errors = "Server Error";
      $rootScope.ProdoAppMessage("There is some issue with the server! Please try after some time",'error');
  });

  //$scope.noProductsFoundError = '';

  //The following function is called when search button is clicked from advanced search modal
  $scope.searchProductData = function () 
  {   
      $scope.message = "";
      $scope.result = [];
      $scope.countForEmptyTextbox = 0;
      $scope.search.productsearchdata = {};
      //$scope.search.productsearchdata.searchtype = "wall";
      // if ($scope.org !== '') 
      // {
      //       var temp=$scope.org.replace(/\s/g, "");
      //       $scope.search.productsearchdata.Organization_Name = temp;
      //       temp = "";
      // }
      // else
      // {
      //       $scope.search.productsearchdata.Organization_Name = "";
      //       $scope.countForEmptyTextbox++;     
      // }
      if ($scope.product_name !== '') 
      {
             var temp = $scope.product_name.replace(/\s/g, "");     //Declared temporary variable to remove spaces from search query
             $scope.search.productsearchdata.Product_Name = temp;
             temp = "";
      }
      else
      {
           $scope.search.productsearchdata.Product_Name = ""; 
           $scope.countForEmptyTextbox++;
      }
      if ($scope.model_number !== '') {
           var temp=$scope.model_number.replace(/\s/g, "");
           $scope.search.productsearchdata.Model_Number = temp;
           temp = "";
      }
      else
      {
           $scope.search.productsearchdata.Model_Number = "";
           $scope.countForEmptyTextbox++;
      }
      if ($scope.feature !== '') 
      {
           var temp=$scope.feature.replace(/\s/g, "");
           $scope.search.productsearchdata.Feature = temp;
           temp = "";
      }
      else
      {
           $scope.search.productsearchdata.Feature="";
           $scope.countForEmptyTextbox++;
      }
      if ($scope.category !== '') 
      {
           var temp=$scope.category.replace(/\s/g, "");
           $scope.search.productsearchdata.Category = temp;
           temp = "";
      }
      else
      {
           $scope.search.productsearchdata.Category = "";
           $scope.countForEmptyTextbox++;
      }
      // if ($scope.feature !== '') {
      //      var temp=$scope.feature.replace(/\s/g, "");
      //      $scope.search.productsearchdata.Feature = temp;
      //      temp = "";
      // }
      // else
      // {
      //      $scope.search.productsearchdata.Feature="";
      //      $scope.countForEmptyTextbox++;
      // }
    if ($scope.org !== '') 
      {
            var temp=$scope.org.replace(/\s/g, "");
            $scope.search.productsearchdata.Organization_Name = temp;
            temp = "";
      }
      else
      {
            $scope.search.productsearchdata.Organization_Name = "";
            $scope.countForEmptyTextbox++;     
      }
      $scope.search.productsearchdata.searchtype = "wall";



      //Following if statement is to check whether all fields are empty
      //If all are empty then dont call API
      if($scope.countForEmptyTextbox == 5)  // 5 is for textboxes present in advance search modal
      {
        $rootScope.ProdoAppMessage("Please enter atleast one search criteria to proceed" , 'error');
      }
     else
      {        
             prodoSearchService.searchProduct($scope.search);    //Calling searchproduct api for advanced search; Format for input is {productsearchdata:{''}}
      }
  };

  var cleanEventGetSearchProductDone = $scope.$on('getSearchProductDone', function (event, data) 
  {
    if(data.error!==undefined && data.error.code==='AL001')
    {
      $('#advancedSearchModal').modal('hide');  //code for cloasing modal
      $rootScope.showModal();
    }
    else if(data.error)
    {
       $rootScope.ProdoAppMessage(data.error.message,'error');
    }
    else
    {
     $scope.result = data.success.doc;
     $scope.message = "";
     $scope.message = data.success.message;}
     });

     var cleanEventGetSearchProductNotDone = $scope.$on('getSearchProductNotDone', function (event, data) {
          $rootScope.ProdoAppMessage("There is some issue with the server! Please try after some time",'error');
     });

  //This function assigns prodles and orgid to rootscope 
  $scope.orgProdleEmitter = function(dataProdle,dataOrgid)
  {   
     $rootScope.product_prodle = dataProdle;
     $rootScope.orgid = dataOrgid;    
     $('#advancedSearchModal').modal('hide');  //code for cloasing modal
     $rootScope.$broadcast('emittingOrgid', 'success');
  };

  //This functions resets the advanced search modal
  $scope.modalReset = function () 
  {
     document.getElementById('textBoxCategoryName').value = '';
     document.getElementById('textBoxModelNumber').value = '';
     document.getElementById('textBoxFeatureName').value = '';
     document.getElementById('textBoxProductName').value = '';
     document.getElementById('textBoxOrgName').value='';
     $scope.product_name = "";
     $scope.model_number = "";
     $scope.category = "";
     $scope.feature = "";
     $scope.search.productsearchdata = {};
     $scope.result = [];
     $scope.org = "";
     $scope.message = "";
  };

  //This function is called when a product from simple search is selected
  //It will search for respective prodle and orgid of product and assign it to rootscope variables
  $scope.quickSearchEmit = function () 
  {  
      angular.forEach($scope.productNames, function(state) 
      {
           if ($scope.productSearch.product === state.name) 
           {               
                $rootScope.product_prodle=state.prodle;
                $rootScope.orgid=state.orgid;             
            }
      }); 
      $rootScope.$broadcast('emittingOrgidBySearch', 'success');

      $scope.title = "Trending Products";
      $scope.productSearch.product = "";    
  };

  $scope.toggleTitleForDiv = function()
  {
      $scope.title = "Product Search";
      $scope.errors = "";
  };
   
  //This function is called unfollow product from sidebar; When unfollow button is clicked list from productfollowedlist is spliced;
  $scope.unfollowProduct = function (product) { 
      UserSessionService.unfollowProduct(product.prodle);
      indexOfUnfollowedProduct = UserSessionService.productfollowlist.indexOf(product);
   };

  var cleanEventUnfollowProductDone = $scope.$on("unfollowProductDone", function(event, message){
    if(message.error!==undefined && message.error.code==='AL001')
    {
      $rootScope.showModal();
    } else {
      UserSessionService.productfollowlist.splice(indexOfUnfollowedProduct, 1);
      $rootScope.$broadcast('unfollowProductFromSidelist', 'success');
    }
  });

  // $rootScope.$watch('orgid', function () 
  // {
  //     document.getElementById('searchText').placeholder="Search products in "+ $rootScope.orgdata.name;
  // });

  $scope.loadMoreFollowedProduct=function() {
      if($scope.followedProductsCount === 100)
      {
            document.getElementById('tabMore').innerHTML = "Read More"
            $scope.followedProductsCount = 6;     
      }
      else if($scope.followedProductsCount === 6)
      {
            document.getElementById('tabMore').innerHTML= "Read Less";
            $scope.followedProductsCount = 100;     
      }
  };    

  $scope.$on('$destroy', function(event, message) {
      cleanEventGotTrendingProducts();
      cleanEventNotGotTrendingProducts();      
      cleanEventGetSearchProductDone();
      cleanEventGetSearchProductNotDone();      
      cleanEventUnfollowProductDone(); 
  });



//End of controller         
  }
]);