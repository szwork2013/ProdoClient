angular.module('prodo.ProdoWallApp')
        .controller('prodoSearchController', ['$scope','$log', '$rootScope','prodoSearchService',  'UserSessionService','$http', function($scope, $log,$rootScope, prodoSearchService, UserSessionService, $http) {


$scope.TrendingProducts = [
            {productname: 'Products Followed'},
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
  // Code for Advance Search
 

$scope.products_id = 
[

{'key':'1' , 'value':'Nokia Lumia 720' },
{'key':'2' , 'value':'Samsung Galaxy Pro'},
{'key':'3' , 'value':'Micromax Canvas'},
{'key':'4' , 'value':'Micromax Canvas Doodle'},
{'key':'5' , 'value':'HTC Pro'},
{'key':'6' , 'value':'Apple Ipad' },
{'key':'7' , 'value':'Nokia 6600'}, 
{'key':'8' , 'value':'Videocone'},
{'key':'9' , 'value':'Blackberry Boss '},
{'key':'10', 'value':'Sony'}
 
 ];

////start of advanced search
  $scope.search={};

  // var split = 'show OR text OR into input OR abs ccc'.split('OR').length;
  // console.log(split); 
   $scope.searchProductData=function()
  {
    if($scope.product_name!=="")
    { 
      $scope.search.Product_Name=$scope.product_name;
  
    }
     if($scope.model_number !=="")
    {
       $scope.search.Model_number=$scope.model_number;
    } 
   
    if($scope.category !=="") 
    {
      $scope.search.Category=$scope.category;
    }
    
    
    if($scope.feature !=="")
    {
      
      
      $scope.search.Feature=$scope.feature;
     // $scope.search.push({"Feature":$scope.feature});
      // var splitFeature = $scope.feature.split('OR').length;
      // var splitFeature2=$scope.feature.split('OR');
      // for(var l=0;l<splitFeature;l++)
      // {
      //   $scope.search.push({"Feature" : splitFeature2[l]}); 
      //   if(l!==splitFeature-1)
      //   {
      //     $scope.search.push({"Condition" : "OR"});
      //   }
      // } 
    }
  //  var productsearchdata = JSON.stringify($scope.search);
                       prodoSearchService.searchProduct($scope.search);
 

                      //console.log(productsearchdata); 



                       $scope.$on('getSearchProductDone', function(event, data) {
                       });
                    
                       $scope.$on('getSearchProductNotDone', function(event, data) {
                      
                       }); 
    
  }; 
  
  
  $scope.modalReset=function()
  { 
    document.getElementById("textBoxCategoryName").value="";
    document.getElementById("textBoxModelNumber").value="";
    document.getElementById("textBoxFeatureName").value="";
    document.getElementById("textBoxProductName").value="";
    $scope.search={};
  };


  /////////////////////////////////////////////////
$scope.sampleDataEmitSearch=function()
{
  var data9={prodle:"xkdiPXcT_",orgid:"orgxkpxhIFau"};
  $scope.$emit("product",data9);
  console.log("inside function");
};


}
]);