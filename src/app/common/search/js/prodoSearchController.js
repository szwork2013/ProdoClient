angular.module('prodo.ProdoWallApp')
.controller("prodoSearchController",['$rootScope', '$scope', '$state', '$stateParams', '$log', 'UserSessionService', 'UserSubscriptionService',  function($rootScope, $scope, $state, $stateParams, $log, UserSessionService, UserSubscriptionService)
{

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
 $scope.p="Product Name";
  $scope.m="Model Number";
  $scope.ff="Feature"; 
  $scope.c="Category";  
  $scope.valp="";
  $scope.query="";
  $scope.s1=""; 
  $scope.val="";   
  $scope.counter=0;
  $scope.query1=""; 
  $scope.query2=""; 
  $scope.query3=""; 
  $scope.query4="";  
  $scope.product=[];
  $scope.model=[];
  $scope.feature=[];
  $scope.category=[];
  $scope.search=[];
  $scope.condition="";
  $scope.news={};
      
  document.getElementById("t1").disabled=false;

  
          $scope.addM=function() 
          {
                          document.getElementById("t1").value="";  
                          if($scope.s1=="Product Name")
                          {
                             $scope.search.push({"Product_Name" : $scope.val});                
                          }
                           
                          
                          else if($scope.s1=="Feature")
                          {

                               $scope.search.push({"Feature" : $scope.val});
                          } 
                           
                          
                          else if($scope.s1=="Category")
                          {  

                             $scope.search.push({"Category" : $scope.val});
                          }
                          else if($scope.s1=="Model Number")
                          {
                            $scope.search.push({"Model_Number": $scope.val});
                          }
          
                          document.getElementById("orr").disabled=false;
                          document.getElementById("and").disabled=false;
                          document.getElementById("add").disabled=true;
                          document.getElementById("t1").disabled=true;
                          document.getElementById("final").disabled=true;              
          }; 
         


          $scope.and=function()
          {      
                   $scope.search.push({"condition":"AND"}); 
                   document.getElementById("and").disabled=true;
                   document.getElementById("orr").disabled=true;
                   document.getElementById("t1").disabled=true;
          };
          
  
          $scope.searchProductData=function()
          {
                       if($scope.s1=="Product Name")
                       {
                          $scope.search.push({"Product_Name" : $scope.val});
                       }
                       else if($scope.s1=="Model Number")
                       {
                          $scope.search.push({"Model_Number": $scope.val});
                       }
                       else if($scope.s1=="Feature")
                       {
                         $scope.search.push({"Feature" : $scope.val});
                       }
                       else if($scope.s1=="Category")
                       {
                         $scope.search.push({"Category" : $scope.val});
                       }
                       




                       var productsearchdata = JSON.stringify($scope.search);
                       prodoSearchService.searchProduct(productsearchdata);


                      concole.log(productsearchdata); 



                       $scope.$on('getSearchProductDone', function(event, data) {
                        
                       });
                    
                       $scope.$on('getSearchProductNotDone', function(event, data) {
                      
                       });
                
                      document.getElementById("t1").value="";
                      document.getElementById("111").value="";
                      document.getElementById("t1").disabled=true;
                      $scope.query4="";
                      $scope.s1="";
                      $scope.val="";
          };
           
  
          $scope.refr = function()
          {  
                              document.getElementById("and").disabled=false;
                              document.getElementById("orr").disabled=false;
                              document.getElementById("orr").disabled=true;
                              document.getElementById("and").disabled=true;
                              document.getElementById("add").disabled=false;
                              document.getElementById("final").disabled=false;                           
          };


          $scope.or=function()
          {
             $scope.search.push({"condition":"OR"});
             document.getElementById("and").disabled=true;
             document.getElementById("orr").disabled=true;
             document.getElementById("t1").disabled=true;
          };


          $scope.z=function()
          {
             console.log("inside");
             document.getElementById("t1").disabled=false;
          };

          
          $scope.temp=function()
          {
            $scope.search="";
            $scope.search=[];
          };
            



  /////////////////////////////////////////////////



}
]);