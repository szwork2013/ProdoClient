    /* Overview: Product Controller 
     * Controller for product comments,product features etc
     * Dated: 25/11/2013.
     * Author: Bhagyashri Jangam
     * Copyright: Prodonus Software Private Limited and GiantLeap Systems Private Limited 2013
     * Change History:
     *
     * date | author | description 
     *
     * 27-3/2013 | xyx | Add a new property
     * 
     */
     angular.module('prodo.ProductApp')
     .controller('ProductController', ['$scope','$log', '$rootScope', 'ProductService', 'UserSessionService','$http','CommentLoadMoreService','ENV','TagReffDictionaryService','ProductFeatureService', 'growl',function($scope, $log,$rootScope, ProductService, UserSessionService,$http,CommentLoadMoreService,ENV,TagReffDictionaryService,ProductFeatureService,growl) {

                //comments
                $scope.productComments = {comments: [{}]};
                $scope.newProductComment = [];
                $rootScope.productCommentResponsearray = [];
                $scope.mytags;
                $scope.myFeaturetags;
                $scope.count = 0;
                $scope.commenttextField = {userComment: ''};
                $scope.pretags=[];
                $scope.featuretags=[];
                $scope.productcommentResponseListener;
                $scope.tagPairs= [];

                //product
                $scope.editStatus;
                $scope.product = {product: [{}]};
                $scope.newProduct = {product: [{}]};
                $scope.type = "product";
                $scope.productlist=[];
                $rootScope.product_prodle;
                $rootScope.orgid;
                $scope.pImages_l = {product_images: [{}]};
                // $scope.uploadSrc="product";

                //user
                $scope.userIDFromSession;
                $scope.usernameFromSession;
                $scope.grpnameFromSession;
                $scope.orgnameFromSession;
                $scope.orgidFromSession;
                $scope.ProductsFollowedFromSession=[];
                $scope.socket;





               //watch prodle if changed by user by product search or any other source
               $rootScope.$watch('product_prodle', function() {  
                $log.debug("Listening" + $rootScope.product_prodle);
                // growl.addInfoMessage("Getting product details");
                $scope.features=[];
                $("#productLogo").attr('src', '');
                var temp=document.getElementById('prodo-comment-container');
                if($rootScope.product_prodle!==undefined && $rootScope.product_prodle!==null && $rootScope.product_prodle!==""){
                    $scope.getProduct(); //if product available, call getproduct
                  }
                   
                   else { //show msg to follow product
                    $("#prodo-ProductDetails").css("display", "none");
                    $("#ErrMsging").css("display", "block");
                     document.getElementById("ErrMsging").innerHTML="You are not following any product , Please start following product....";
                    growl.addErrorMessage(" You are not following any product , Please start following product....");
                   }
                 
               });

              //get login details
              $scope.getUserDetails = function( ) {
                if ($rootScope.usersession.currentUser.org) {
                  $scope.grpnameFromSession = $rootScope.usersession.currentUser.org.grpname;
                  $scope.orgidFromSession = $rootScope.usersession.currentUser.org.orgid;
                  $scope.orgnameFromSession = $rootScope.usersession.currentUser.org.orgname;
                }
                else {
                  $scope.grpnameFromSession = "";
                  $scope.orgnameFromSession = "";
                  $scope.orgidFromSession = "";
                }
                $scope.userIDFromSession = $rootScope.usersession.currentUser.userid;
                $scope.usernameFromSession = $rootScope.usersession.currentUser.username;
                $scope.ProductsFollowedFromSession = $rootScope.usersession.currentUser.products_followed;

                $log.debug("Products  f.. "+JSON.stringify( $scope.ProductsFollowedFromSession));
              }
              $scope.getUserDetails();
               //get login details


               $scope.getProduct = function(){
                 ProductService.getProduct({orgid: $rootScope.orgid, prodle: $rootScope.product_prodle},
                  function(successData) {
                    if (successData.success == undefined){  //if not product
                     $("#prodo-ProductDetails").css("display", "none");
                      $("#ErrMsging").css("display", "block");
                      document.getElementById("ErrMsging").innerHTML="Product not available....";
                    growl.addErrorMessage(" Product not available....");
                   }
                   else {
                     $("#prodo-ProductDetails").css("display", "block");
                      $("productExtraInfo").css("display", "block");
                      $("#ErrMsging").css("display", "none");
                    $log.debug(successData.success.product);
                    $scope.getProductFeatures();
                    $scope.checkAdminProductUpload();
                    $("#prodo-ProductFeatureTable").css("display", "table"); 
                    // $("#prodoCommentsTab").css("display", "inline");
                    // $("#tabComments").css("display", "inline");
                    $scope.product = successData.success.product;
                    $rootScope.product_prodle = successData.success.product.prodle;
                    $scope.productComments = successData.success.product.product_comments;
                    $scope.pImages_l = successData.success.product.product_images;
                    $("#prodo-addingProduct").text($scope.product.status);

                    //check owner of product
                    if($rootScope.usersession.currentUser.org){
                      if ($rootScope.usersession.currentUser.org.isAdmin==true) {
                        if ($scope.orgidFromSession === $rootScope.orgid ) {
                          $rootScope.isAdminCheck=true;
                        }
                        else   $rootScope.isAdminCheck=false;
                      }
                    } 
                    //if no comments , dont show load more comments button
                    $("#loadMoreCommentMsg").css("display", "none");
                    if(successData.success.product.product_comments.length<5){
                      $("#load-more").css("display", "none");
                    }
                    else  $("#load-more").css("display", "inline");
                  }
                },
                function(error) {  //if error geting product
               
                       $log.debug(error);
                        $("#prodo-ProductDetails").css("display", "none");
                         $("#ErrMsging").css("display", "inline");
                         document.getElementById("ErrMsging").innerHTML="Server Error:" + error.status;
                        growl.addErrorMessage( "Server Error:" + error.status);
                    });
            }
                //get product function declaration  


                //error handling for add product
                $scope.handleSaveProductResponse = function(data) {
                  if (data.success) {
                   growl.addSuccessMessage( data.success.message);
                   
                 } else {
                    if (data.error.code == 'AV001') {     // user already exist
                      $log.debug(data.error.code + " " + data.error.message);
                      growl.addErrorMessage(data.error.message);

                     } else if (data.error.code == 'AP001') {  // user data invalid
                      $log.debug(data.error.code + " " + data.error.message);
                      growl.addErrorMessage(data.error.message);
                    } else {
                      $log.debug(data.error.message);
                      growl.addErrorMessage(data.error.message);
                    }
                  }
                };
                //error handling for add product

                //add ,update product
                $scope.addProduct = function(editStatus)
                { 
                    
                  
                   $("productExtraInfo").css("display", "none");
                   $("#ErrMsging").css("display", "none");
                 //Input check validations are on Client side( using Angular validations)
                 $scope.newProduct = {product: {
                  display_name: $scope.display_name,
                  model_no: $scope.product.model_no,
                  name: $scope.product.name,
                  description: $scope.product.description
                }};
                $log.debug($scope.orgidFromSession);
                  if(editStatus=='add'){ //add product
                   if ($rootScope.usersession.currentUser.org.isAdmin ==true) {

                    ProductService.saveProduct({orgid: $scope.orgidFromSession}, $scope.newProduct,
                      function(success) {
                        $log.debug(success);
                              $scope.handleSaveProductResponse(success); // calling function to handle success and error responses from server side on POST method success.

                            },
                            function(error) {
                              $log.debug(error);
                            });
                    
                  }
                  else  growl.addErrorMessage("You dont have rights to add product...");
                }
                else if(editStatus=='update'){ //update product
                  if ($rootScope.usersession.currentUser.org.isAdmin ==true) {
                    if ($scope.orgidFromSession === $rootScope.orgid ) {
                     ProductService.updateProduct({orgid:$scope.orgidFromSession,prodle:$rootScope.product_prodle}, $scope.newProduct,
                      function(success) {
                        $log.debug(success);
                              $scope.handleSaveProductResponse(success); // calling function to handle success and error responses from server side on POST method success.
                              $scope.getProduct(); 
                            },
                            function(error) {
                              $log.debug(error);
                            });
                   }
                 }
                 else growl.addErrorMessage("You dont have rights to update this product...");
               }

             };

                //delete product
                $scope.handleProductDeleted=function(){
                 $http({
                  method: 'GET',
                  url: '/api/product/' + $rootScope.orgid  ,
                        // data: {'prodleimageids':[ $scope.imgIdsJson]}
                      }).success(function(data, status, headers, cfg) {
                       if(data.success){
                        if(data.success.product.length==0){ //after deleting product, check for next product from product followed,if no product - display msg
                         $log.debug(data.success.product.length);
                          $("#prodo-ProductDetails").css("display", "none");
                         $("#ErrMsging").css("display", "inline");
                         document.getElementById("ErrMsging").innerHTML="Product not available , Add new product ...";
                         growl.addErrorMessage(" Product not available , Add new product ...");

                       }

                        else // if products followed has product, select latest product
                        {
                          $log.debug(data.success.product[0].prodle);
                          $rootScope.product_prodle=data.success.product[0].prodle;
                        }
                      }
                        // $log.debug(data);
                      }).error(function(data, status, headers, cfg) { //if error deeting product , from server
                        growl.addErrorMessage(status);
                        $log.debug(status);
                      });

                    };


                    $scope.deleteProduct = function()
                    {
                      growl.addInfoMessage("Deleting product  ...");
                      if($rootScope.product_prodle!==undefined && $rootScope.product_prodle!==null && $rootScope.product_prodle!==""){
                       if ($rootScope.isAdminCheck==true ) { //if owener of product
                        ProductService.deleteProduct({orgid: $scope.orgidFromSession, prodle: $rootScope.product_prodle},
                         function(success) {
                          $log.debug(JSON.stringify( success));
                          growl.addSuccessMessage("Product deleted successfully...");
                          $scope.handleProductDeleted();
                        },
                        function(error){
                         $log.debug(JSON.stringify( error));
                       });
                      }
                      // }
                      else
                        growl.addErrorMessage("You dont have rights to delete this product...");

                    }
                  };
                //delete product

                //clear text fields of product
                $scope.clearText=function(){   
                   // prodo-product-features_textfield
                   $log.debug("clearig");
                   $scope.product="";
                   $scope.pImages_l="";
                   $scope.features="";
                 }
                //clear text fields of product

                // display DiscontinuedSupport fields if product id discontinued
                $scope.ShowDiscontinuedSupport=function(product){
                 if (product.support_discontinuation_date) return{display: "inline" } 
                   else return{display: "none" } 
                 };
                 // display DiscontinuedSupport fields if product is discontinued

                 // display DiscontinuedSale fields if product is discontinued 
                 $scope.ShowDiscontinuedSale=function(product){
                   if (product.sale_discontinuation_date) return{display: "inline" } 
                     else return{display: "none" }              
                   };
                  // display DiscontinuedSale fields if product is discontinued 

                  // display BannedDate fields if product is banned   
                  $scope.ShowBannedDate=function(product){
                   if (product.banneddate) {
                    return{display: "inline" } 
                  }
                };
                 // display BannedDate fields if product is banned    

                 //toggle to select all product iamges
                 $scope.selectAllImages = function() { 
                   if ($('.imgToggles').is(':checked')) {
                    $('.imgToggles').prop('checked', false)
                  } else {
                    $('.imgToggles').prop('checked', true)
                  }
                };
                $scope.checkedAllIndex=function(imgs){
                  for(i=0;i<imgs.length;i++){
                    $scope.chckedIndexs.push(imgs[i]);
                  }
                };

               //get selected image for delete
               $scope.chckedIndexs=[];
               $scope.checkedIndex = function (img) {
                 if ($scope.chckedIndexs.indexOf(img) === -1) {
                   $scope.chckedIndexs.push(img);
                   $log.debug($scope.chckedIndexs);
                 }
                 else {
                   $scope.chckedIndexs.splice($scope.chckedIndexs.indexOf(img), 1);
                 }
                 $log.debug($scope.chckedIndexs);
               };
               //get selected image for delete

              //delete images
              $scope.deleteProductImages = function(index) {
                  //get selected ids to delete images
                  growl.addInfoMessage("Deleting product images ...");
                  $scope.imgIds = [{}];
                  $scope.ids;
                  $(':checkbox:checked').each(function(i) {
                    $scope.imgIds[i] = $(this).val();
                    $scope.ids=  $(this).val();               
                  });
                  angular.forEach($scope.chckedIndexs, function (value, index) {
                    $log.debug("value= "+value);
                    var index = $scope.pImages_l.indexOf(value);
                    $scope.pImages_l.splice($scope.pImages_l.indexOf(value), 1);
                  });
                  $scope.chckedIndexs = [];
                  $scope.temp={prodleimageids:$scope.imgIds}
                  $http({
                    method: 'DELETE',
                    url: ENV.apiEndpoint_notSocket+'/api/image/product/' + $scope.orgidFromSession + '/' + $rootScope.product_prodle +'?prodleimageids='+$scope.imgIds ,
                     // url: 'www.prodonus.com/api/image/product/' + $scope.orgidFromSession + '/' + $rootScope.product_prodle +'?prodleimageids='+$scope.imgIds ,
                        // data: {'prodleimageids':[ $scope.imgIdsJson]}
                      }).success(function(data, status, headers, cfg) {
                        $log.debug(data);
                        growl.addSuccessMessage("Images deleted successfully...");
                      }).error(function(data, status, headers, cfg) {
                       $log.debug(status);
                       growl.addErrorMessage(status);
                     });
                    };
                  //delete images


                  //if product owner, display update delete product icons
                  $scope.checkAdmintoUpdateProduct=function(){
                    if($rootScope.usersession.currentUser.org){
                      if ($rootScope.usersession.currentUser.org.isAdmin==true) {
                        if ($scope.orgidFromSession === $rootScope.orgid ) {
                          $rootScope.isAdminCheck=true;
                          return{display: "block"}
                        }
                        else
                          return{display: "none"}
                      }
                      else
                        return{display: "none"}
                    } 
                    else
                      return{display: "none"}
                  };
                  //if product owner, display update delete product icons
                  

                  $scope.checkAdmin = function() {
                   if($rootScope.usersession.currentUser.org){
                    if ($rootScope.usersession.currentUser.org.isAdmin==true) {
                      if ($scope.orgidFromSession === $rootScope.orgid ) {
                        $rootScope.isAdminCheck=true;
                      }
                    }
                  } 
                  if ($rootScope.isAdminCheck==true){
                      // $("#prodo.productAdmin").css("display", "inline"); 
                      $("#prodo.productAdminAddProduct").css("display", "inline"); 
                    }
                    else if($rootScope.usersession.currentUser.org.isAdmin==true) {
                      $("#prodo.productAdmin").css("display", "none"); 
                      $("#prodo.productAdminAddProduct").css("display", "inline"); 
                    }
                    else{
                     $("#prodo.productAdmin").css("display", "none"); 
                     $("#prodo.productAdminAddProduct").css("display", "none"); 
                   }
                 };

                //if product owner, show upload optoin
                $scope.checkAdminProductUpload=function() {
                  if($rootScope.usersession.currentUser.org){
                    if ($rootScope.usersession.currentUser.org.isAdmin==true) {
                      if ($scope.orgidFromSession === $rootScope.orgid ) {
                        $rootScope.isAdminCheck=true;
                      }
                    }
                  } 
                  if ($rootScope.isAdminCheck==true)
                    $("#Upload-clck").css("display", "block");      

                };
               //if product owner, show upload optoin

              //Delete product image validation
              $scope.checkImageSelectedToDelete=function(){
                 if($scope.chckedIndexs.length>0){  //if image selected to delete,show modal
                   $('#imgDelModal').modal('toggle');
                   $('#imgDelModal').modal('show');
                 }
                 else{ //if no image selected to delete
                  growl.addErrorMessage("Select atlest 1 image to delete");
                }
              };
            //Delete product image validation

            //if product admin, show delete images options
            $scope.checkAdminProductImagesDelete=function() { 

              if ($rootScope.isAdminCheck==true) {
                return{display: "inline"}
              }
              else {
                return{display: "none"}
              }
            };
             //if product admin, show delete images options

            //get Product features
            $scope.features=[];
            $scope.PFeatures=[];
            $scope.getProductFeatures=function(){
              if($rootScope.product_prodle!==""){
               ProductFeatureService.getFeature({orgid: $rootScope.orgid, prodle: $rootScope.product_prodle},
                function(successData) {
                  if (successData.success == undefined){
                   if($rootScope.usersession.currentUser.org.isAdmin==true) { 
                   //admin tasks
                 }
                 else { }
               }
             else {
              $log.debug("success    "+JSON.stringify(successData));
              $scope.features=[];
              $scope.featuretags=[];
              for(i=0;i<successData.success.productfeature.length;i++){
                $scope.features.push(successData.success.productfeature[i]);
                $scope.PFeatures.push(successData.success.productfeature[i]);
                $scope.featuretags.push(successData.success.productfeature[i].featurename);
              }
                       // $scope.features= JSON.stringify($scope.features);
                       $log.debug("pf  "+ $scope.featuretags);
                     }
                   },
                   function(error) {
                     growl.addErrorMessage("Server Error:" + error.status);
                   });
  }
};
            //get Product features

            //delete product feature
            $scope.deleteFeature = function(feature){
              $log.debug("deleting feature");
              if(feature!==undefined && feature!==null && feature!==""){
                growl.addInfoMessage("Deleting product feature ...");
                $log.debug(feature.featureid);
                if ($rootScope.isAdminCheck==true){ //if product owner
                  ProductFeatureService.deleteFeature({orgid: $scope.orgidFromSession, prodle: $rootScope.product_prodle ,productfeatureid:feature.featureid},
                    function(success) {
                      $log.debug(JSON.stringify( success));
                      //client side delete
                      var index = $scope.features.indexOf(feature);
                      if (index != -1)
                        $scope.features.splice(index, 1);
                      growl.addSuccessMessage(success.success.message);

                    },
                    function(error){
                     $log.debug(JSON.stringify( error));
                     growl.addErrorMessage(error)

                   });
                }
                else //if not owner display msg
                  growl.addErrorMessage("You dont have rights to delete this feature...");
              }
            };
             //delete product feature
             
             //add product feature
             $scope.addProductFeature=function(editStatus){
              $scope.newFeature={};
              $scope.newFeature = {productfeature: [{
                featurename: $scope.feature.name,
                featuredescription: $scope.feature.description
              }]};
              $log.debug( $scope.newFeature);
              if($scope.newFeature!==undefined && $scope.newFeature!==null && $scope.newFeature!==""){
                if(editStatus=='add'){
                  $log.debug("adding");
                  if ($rootScope.isAdminCheck==true){  //if product owner
                    ProductFeatureService.saveFeature({orgid: $scope.orgidFromSession , prodle:$rootScope.product_prodle}, $scope.newFeature,
                      function(success) {
                        $log.debug(success);
                        $scope.handleSaveProductResponse(success); // calling function to handle success and error responses from server side on POST method success.
                        $log.debug("new Feature : "+JSON.stringify( $scope.newFeature.productfeature[0]));
                        $scope.features.push($scope.newFeature.productfeature[0]);
                        growl.addSuccessMessage("Feature added successfully");
                        $log.debug($scope.features);
                        $scope.feature="";
                      },
                      function(error) {
                        growl.addErrorMessage(error);
                        $log.debug(error);
                      });
                } //if not owner display msg
                else  growl.addErrorMessage("You dont have rights to add product feature...");
              }
            }
          };
              //add product feature


             //update product feature
             $scope.updateProductFeature = function(data, id) {
              console.log(data);
              if(data!==undefined && data!==null && data!==""){
                if ($rootScope.isAdminCheck==true){
                  ProductFeatureService.updateFeature({orgid:$scope.orgidFromSession,prodle:$rootScope.product_prodle,productfeatureid:id},{'productfeature': data},
                    function(success) {
                      $log.debug(success);
                      $scope.handleSaveProductResponse(success); // calling function to handle success and error responses from server side on POST method success.
                      // $scope.features.push($scope.newFeature);
                      growl.addSuccessMessage(success.success.message);                                                               
                    },
                    function(error) {
                      $log.debug(error);
                      growl.addErrorMessage(error);
                    });
                }
                else  growl.addErrorMessage("You dont have rights to update product feature...");
              }
              };
              //update product feature


              //Edit mode and display mode toggle for product data add , update and diaplay
              $scope.editorEnabled = false;
              $scope.enableEditor = function() {
                $scope.editorEnabled = true;
                growl.addInfoMessage("   Adding product data.....");
              };
              $scope.disableEditor = function() {
                $scope.editorEnabled = false;
                $scope.feature="";
                if($rootScope.product_prodle!==undefined && $rootScope.product_prodle!==null && $rootScope.product_prodle!==""){
                  $scope.getProduct();
                  $scope.getProductFeatures();
                }
              };
              //Edit mode and display mode toggle for product data add , update and diaplay

              //on product logo hover, show follow product button
              $(document).ready(function(){
                if ($rootScope.isAdminCheck==true) {
                 $("#productLogoUpload").css("display", "inline");  
                 $("#productLogo").hover(function(){
                  $("#productLogoUpload").show();
                },function(){
                  setTimeout( function() {
                    $("#productLogoUpload").hide();
                  }, 3000 );
                });
               }
               else {
                 $("#productLogoUpload").css("display", "none");
               }


             });
              //on product logo hover, show follow product button

              //Product Description height toggle

              $scope.ShowDescription=function(){

                if(document.getElementById('prodo-description').style.height ==="15px")
                  $("#prodo-description").css("height", ""); 
                else 
                 $("#prodo-description").css("height", "15px"); 
             };

             //get All products
             $scope.getAllProducts = function(){
               $http({
                method: 'GET',
                url: '/api/product/' + $rootScope.orgid  ,
                        // data: {'prodleimageids':[ $scope.imgIdsJson]}
                      }).success(function(data, status, headers, cfg) {
                       if(data.success){
                        if(data.success.product.length==0){ //after deleting product, check for next product from product followed,if no product - display msg
                         $log.debug(data.success.product.length);
                         temp.innerHTML="<br>Product not available ... Add new product<br><br>";
                         growl.addErrorMessage(" Product not available ...");
                       }

                        else // if products followed has product, select latest product
                        {
                         $scope.productList=data.success.product;
                         $log.debug("Products List : "+JSON.stringify($scope.productList));
                       }
                     }
                        // $log.debug(data);
                      }).error(function(data, status, headers, cfg) { //if error deeting product , from server
                        growl.addErrorMessage(status);
                        $log.debug(status);
                      });

                    };
                 //get All products
                 $scope.getAllProducts ();

                 $scope.getSelectedProduct=function(product1){
                  $rootScope.product_prodle=product1.prodle;
                };


                 //Product List pagination
                 $scope.currentPage = 0;
                 $scope.pageSize = 4;

                 $scope.numberOfPages=function(){
                  return Math.ceil($scope.productList.length/$scope.pageSize);                
                };
                 //Product List pagination

                 //Follow Product

                 $scope.CheckIfAlreadyFollowingProduct=function(){

                   var follow;
                   for(i=0 ; i<$scope.ProductsFollowedFromSession.length; i++){
                    if($scope.ProductsFollowedFromSession[i].prodle==$rootScope.product_prodle){
                      follow=true;
                    }
                  }
                  if(follow==true){
                    return{display: "none" } 

                  }
                  else return{display: "inline" } 
                };

                $scope.followCurrentProduct=function(){
                 $log.debug("following");
                 var follow;
                 for(i=0 ; i<$scope.ProductsFollowedFromSession.length; i++){
                  if($scope.ProductsFollowedFromSession[i].prodle==$rootScope.product_prodle){

                    follow=true;

                  }
                }
                if(follow==true){
                  $rootScope.usersession.followProduct($rootScope.product_prodle);
                  growl.addSuccessMessage("Follwing product");
                }
              };
             //Follow Product

             //delete feature modal data passing
             $scope.selectedFeature;
             $scope.getSelectedFeature=function(feature){
              $scope.selectedFeature=feature;
             };
              //delete feature modal data passing


          }]) 

    angular.module('prodo.ProductApp').filter('startFrom', function() {
      return function(input, start) {
        if(input !== undefined && start !==undefined){
        start = +start; //parse to int
        return input.slice(start);
      }
    }
  })