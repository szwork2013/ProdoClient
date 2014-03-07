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
     .controller('ManageProductController', ['$scope','$log', '$rootScope', 'ProductService', 'UserSessionService','$http','CommentLoadMoreService','ENV','TagReffDictionaryService','ProductFeatureService', 'growl','allproductdata','$state',function($scope, $log,$rootScope, ProductService, UserSessionService,$http,CommentLoadMoreService,ENV,TagReffDictionaryService,ProductFeatureService,growl,allproductdata,$state) {

                 $scope.$state=$state;
                 console.log(allproductdata);
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
                $scope.currentProdle;
                $scope.currentOrgid;
                // $scope.uploadSrc="product";

                //user
                $scope.userIDFromSession;
                $scope.usernameFromSession;
                $scope.grpnameFromSession;
                $scope.orgnameFromSession;
                $scope.orgidFromSession;
                $scope.ProductsFollowedFromSession=[];
                $scope.socket;

            
                $scope.$watch('$state.$current.locals.globals.allproductdata', function (allproductdata) {
                    if (allproductdata.error) {
                         temp.innerHTML="<br>Product not available ... Add new product<br><br>";
                                
                        }
                         else {
                            $scope.productlist = allproductdata.success.product; 
                            if($scope.productlist.length==0){ //after deleting product, check for next product from product followed,if no product - display msg
                            temp.innerHTML="<br>Product not available ... Add new product<br><br>";
                            growl.addErrorMessage(" Product not available ...");
                          }
                             if($scope.productlist.length !== 0){
                              $log.debug("prodle "+$scope.productlist[0].prodle + "orgid "+ $scope.orgidFromSession);
                              $scope.currentProdle=$scope.productlist[0].prodle;
                              $scope.currentOrgid=$scope.orgidFromSession;
                              $scope.getProduct($scope.currentProdle,$scope.currentOrgid); 
                              }
                        }
                  });

               // //watch prodle if changed by user by product search or any other source
               // $rootScope.$watch('product_prodle', function() {  
               //  // $log.debug("Listening" + $rootScope.product_prodle);
               //  // growl.addInfoMessage("Getting product details");
               //  $scope.features=[];
               //  $("#productLogo").attr('src', '');
               //  var temp=document.getElementById('prodo-comment-container');
               //  if($rootScope.product_prodle!==undefined && $rootScope.product_prodle!==null && $rootScope.product_prodle!==""){
               //      $scope.getProduct($rootScope.product_prodle,$rootScope.orgid); //if product available, call getproduct
               //    }
                   
               //     else { //show msg to follow product
               //      $("#prodo-ProductDetails").css("display", "none");
               //      $("#ErrMsging").css("display", "block");
               //       document.getElementById("ErrMsging").innerHTML="Product not available";
               //      // growl.addErrorMessage(" You are not following any product , Please start following product....");
               //     }
                 
               // });

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
                // $scope.ProductsFollowedFromSession = $rootScope.usersession.currentUser.products_followed;
               $scope.ProductsFollowedFromSession= UserSessionService.productfollowlist
                // $log.debug("Products  f.. "+JSON.stringify( $scope.ProductsFollowedFromSession));
              }
              $scope.getUserDetails();
               //get login details


               $scope.getProduct = function(l_prodle,l_orgid){
                   $log.debug("1 prodle "+l_prodle + "orgid "+ l_orgid);
                 ProductService.getProduct({orgid: l_orgid, prodle: l_prodle},
                  function(successData) {
                    if (successData.success == undefined){  //if not product
                     $("#prodo-ProductDetails").css("display", "none");
                      $("#ErrMsging").css("display", "block");
                      if(document.getElementById("ErrMsging")!==null)
                      document.getElementById("ErrMsging").innerHTML="Product not available , please select product....";
                    // growl.addErrorMessage(" Product not available....");
                   }
                   else {
                     $("#prodo-ProductDetails").css("display", "block");
                      $("productExtraInfo").css("display", "block");
                      $("#ErrMsging").css("display", "none");
                    // $log.debug(successData.success.product);
                    $scope.getProductFeatures(l_prodle,l_orgid);
                    $scope.checkAdminProductUpload();
                    $("#prodo-ProductFeatureTable").css("display", "table"); 
                    // $("#prodoCommentsTab").css("display", "inline");
                    // $("#tabComments").css("display", "inline");
                    $scope.product = successData.success.product;
                    // $rootScope.product_prodle = successData.success.product.prodle;
                    $scope.productComments = successData.success.product.product_comments;
                    $scope.pImages_l = successData.success.product.product_images;
                    $("#prodo-addingProduct").text($scope.product.status);

                    //check owner of product
                    if($rootScope.usersession.currentUser.org){
                      if ($rootScope.usersession.currentUser.org.isAdmin==true) {
                        if ($scope.orgidFromSession === $scope.currentOrgid ) {
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
                        // growl.addErrorMessage( "Server Error:" + error.status);
                    });
            }
                //get product function declaration  


                //error handling for add product
                $scope.handleSaveProductResponse = function(data) {
                  if (data.success) {
                   growl.addSuccessMessage( data.success.message);
                   $state.reload();
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
                
                // $log.debug($scope.orgidFromSession);
                  if(editStatus=='add'){ //add product
                     $scope.newProduct = {product: {
                   model_no: $scope.product.model_no,
                  name: $scope.product.name,
                  description: $scope.product.description
                }};
                   if ($rootScope.usersession.currentUser.org.isAdmin ==true) {

                    ProductService.saveProduct({orgid: $scope.orgidFromSession}, $scope.newProduct,
                      function(success) {
                        // $log.debug(success);
                              $scope.handleSaveProductResponse(success); // calling function to handle success and error responses from server side on POST method success.

                            },
                            function(error) {
                              $log.debug(error);
                            });
                    
                  }
                  else  growl.addErrorMessage("You dont have rights to add product...");
                }
                else if(editStatus=='update'){ //update product
                   $scope.newProduct = {product: {
                  model_no: $scope.product.model_no,
                  name: $scope.product.name,
                  description: $scope.product.description,
                  support_discontinuation_date:$scope.product.supDis,
                  sale_discontinuation_date:$scope.product.prodDis,
                  banneddate:$scope.product.banneddate
                }};
                  if ($rootScope.usersession.currentUser.org.isAdmin ==true) {
                    if ($scope.orgidFromSession === $scope.currentOrgid ) {
                     ProductService.updateProduct({orgid:$scope.orgidFromSession,prodle:$scope.currentProdle}, $scope.newProduct,
                      function(success) {
                        // $log.debug(success);
                              $scope.handleSaveProductResponse(success); // calling function to handle success and error responses from server side on POST method success.
                              $scope.getProduct($scope.currentProdle,$scope.currentOrgid); 
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
                    $log.debug(JSON.stringify($scope.currentOrgid));
                 $http({
                  method: 'GET',
                  url: '/api/product/' + $scope.currentOrgid  ,
                        // data: {'prodleimageids':[ $scope.imgIdsJson]}
                      }).success(function(data, status, headers, cfg) {
                       if(data.success){
                        $log.debug(JSON.stringify(data.success));
                        if(data.success.product.length==0){ //after deleting product, check for next product from product followed,if no product - display msg
                         $log.debug(data.success.product.length);
                          $("#prodo-ProductDetails").css("display", "none");
                         $("#ErrMsging").css("display", "inline");
                         document.getElementById("ErrMsging").innerHTML="Product not available , Add new product ...";
                         // growl.addErrorMessage(" Product not available , Add new product ...");

                       }

                        else // if products followed has product, select latest product
                        {
                          $log.debug(data.success.product[0].prodle);
                          $scope.currentProdle=data.success.product[0].prodle;
                          $scope.getProduct($scope.currentProdle,$scope.currentOrgid);
                        }
                      }
                        // $log.debug(data);
                      }).error(function(data, status, headers, cfg) { //if error deleting product , from server
                        growl.addErrorMessage(status);
                        $log.debug(status);
                      });
                     
                    };


                    $scope.deleteProduct = function()
                    {
                      growl.addInfoMessage("Deleting product  ...");
                      if($scope.currentProdle!==undefined && $scope.currentProdle!==null && $scope.currentProdle!==""){
                       if ($rootScope.isAdminCheck==true ) { //if owener of product
                        ProductService.deleteProduct({orgid: $scope.orgidFromSession, prodle: $scope.currentProdle},
                         function(success) {
                          $log.debug(JSON.stringify( success));
                          growl.addSuccessMessage("Product deleted successfully...");
                              $("#prodo-ProductDetails").css("display", "none");
                                $state.reload();
                          // $scope.handleProductDeleted();
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
                   $scope.product="";
                   $scope.pImages_l="";
                   $scope.features="";
                 }
                //clear text fields of product

               

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
                   // $log.debug($scope.chckedIndexs);
                 }
                 else {
                   $scope.chckedIndexs.splice($scope.chckedIndexs.indexOf(img), 1);
                 }
                 // $log.debug($scope.chckedIndexs);
               };
               //get selected image for delete

              //delete images
              $scope.deleteProductImages = function(index) {
                    if ($rootScope.isAdminCheck==true ) {
                   //get selected ids to delete images
                  growl.addInfoMessage("Deleting product images ...");
                  $scope.imgIds = [{}];
                  $scope.ids;
                  $(':checkbox:checked').each(function(i) {
                    $scope.imgIds[i] = $(this).val();
                    $scope.ids=  $(this).val();               
                  });
                  angular.forEach($scope.chckedIndexs, function (value, index) {
                    // $log.debug("value= "+value);
                    var index = $scope.pImages_l.indexOf(value);
                    $scope.pImages_l.splice($scope.pImages_l.indexOf(value), 1);
                  });
                  $scope.chckedIndexs = [];
                  $scope.temp={prodleimageids:$scope.imgIds}
                  $http({
                    method: 'DELETE',
                    url: ENV.apiEndpoint_notSocket+'/api/image/product/' + $scope.orgidFromSession + '/' + $scope.currentProdle +'?prodleimageids='+$scope.imgIds ,
                     // url: 'www.prodonus.com/api/image/product/' + $scope.orgidFromSession + '/' + $scope.currentProdle +'?prodleimageids='+$scope.imgIds ,
                        // data: {'prodleimageids':[ $scope.imgIdsJson]}
                      }).success(function(data, status, headers, cfg) {
                        // $log.debug(data);
                        growl.addSuccessMessage("Images deleted successfully...");
                      }).error(function(data, status, headers, cfg) {
                       // $log.debug(status);
                       growl.addErrorMessage(status);
                     });
                    }
                    else
                      growl.addErrorMessage("You dont have rights to delete this feature");
                    };
                  //delete images


                  //if product owner, display update delete product icons
                  $scope.checkAdmintoUpdateProduct=function(){
                    if($rootScope.usersession.currentUser.org){
                      if ($rootScope.usersession.currentUser.org.isAdmin==true) {
                        if ($scope.orgidFromSession === $scope.currentOrgid ) {
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
                      if ($scope.orgidFromSession === $scope.currentOrgid ) {
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
                      if ($scope.orgidFromSession === $scope.currentOrgid ) {
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
            $scope.getProductFeatures=function(prodle,orgid){
              if(prodle!==""){
               ProductFeatureService.getFeature({orgid: orgid, prodle:prodle},
                function(successData) {
                  if (successData.success == undefined){
                   if($rootScope.usersession.currentUser.org.isAdmin==true) { 
                   //admin tasks
                 }
                 else { }
               }
             else {
              // $log.debug("success    "+JSON.stringify(successData));
              $scope.features=[];
              $scope.featuretags=[];
              for(i=0;i<successData.success.productfeature.length;i++){
                $scope.features.push(successData.success.productfeature[i]);
                $scope.PFeatures.push(successData.success.productfeature[i]);
                $scope.featuretags.push(successData.success.productfeature[i].featurename);
              }
                       // $scope.features= JSON.stringify($scope.features);
                       // $log.debug("pf  "+ $scope.featuretags);
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
              // $log.debug("deleting feature");
              if(feature!==undefined && feature!==null && feature!==""){
                growl.addInfoMessage("Deleting product feature ...");
                // $log.debug(feature.featureid);
                if ($rootScope.isAdminCheck==true){ //if product owner
                  ProductFeatureService.deleteFeature({orgid: $scope.orgidFromSession, prodle:$scope.currentProdle ,productfeatureid:feature.featureid},
                    function(success) {
                      // $log.debug(JSON.stringify( success));
                      //client side delete
                      var index = $scope.features.indexOf(feature);
                      if (index != -1)
                        $scope.features.splice(index, 1);
                      growl.addSuccessMessage(success.success.message);

                    },
                    function(error){
                     $log.debug(JSON.stringify( error));
                     growl.addErrorMessage(JSON.stringify( error))

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
              // $log.debug( $scope.newFeature);
              if($scope.newFeature!==undefined && $scope.newFeature!==null && $scope.newFeature!==""){
                if(editStatus=='add'){
                  // $log.debug("adding");
                  if ($rootScope.isAdminCheck==true){  //if product owner
                    ProductFeatureService.saveFeature({orgid: $scope.orgidFromSession , prodle:$scope.currentProdle}, $scope.newFeature,
                      function(success) {
                        // $log.debug(success);
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
                  ProductFeatureService.updateFeature({orgid:$scope.orgidFromSession,prodle:$scope.currentProdle,productfeatureid:id },{'productfeature': data},
                    function(success) {
                      // $log.debug(success);
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
               $scope.editorEnabledF=false;
              $scope.enableEditor = function() {
                $scope.editorEnabled = true;
                 growl.addInfoMessage("   Adding product data.....");
              };
              $scope.disableEditor = function() {
                $scope.editorEnabled = false;
                $scope.feature="";
                if($scope.currentProdle!==undefined && $scope.currentProdle!==null && $scope.currentProdle!==""){
                  $scope.getProduct($scope.currentProdle,$scope.currentOrgid); 
                  $scope.getProductFeatures($scope.currentProdle,$scope.currentOrgid);
                }
              };

               $scope.enableEditorFeature = function() {
                $scope.editorEnabledF=true;
                growl.addInfoMessage("   Adding product data.....");
              };
              $scope.disableEditorFeature = function() {
                $scope.editorEnabledF=false;
                $scope.feature="";
               if($scope.currentProdle!==undefined && $scope.currentProdle!==null && $scope.currentProdle!==""){
                  $scope.getProduct($scope.currentProdle,$scope.currentOrgid); 
                  $scope.getProductFeatures($scope.currentProdle,$scope.currentOrgid);
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

       
                 $scope.getSelectedProduct=function(product1){
                   $scope.currentProdle=product1.prodle;
                   $scope.currentOrgid=$scope.orgidFromSession;
                   $scope.getProduct($scope.currentProdle,$scope.currentOrgid); 
                };


                 //Product List pagination
                 $scope.currentPage = 0;
                 $scope.pageSize = 4;

                 $scope.numberOfPages=function(){
                  return Math.ceil($scope.productlist.length/$scope.pageSize);                
                };
                 //Product List pagination

                 

             //delete feature modal data passing
             $scope.selectedFeature;
             $scope.getSelectedFeature=function(feature){
              $scope.selectedFeature=feature;
             };
              //delete feature modal data passing
             
              //date format
               $scope.formatDate=function(time){
                return(moment(time).format('DD MMM YYYY'));
               };
               //date format
            
             
          }]) 

    angular.module('prodo.ProductApp').filter('startFrom', function() {
      return function(input, start) {
        if(input !== undefined && start !==undefined){
        start = +start; 
        return input.slice(start);
      }
    }
  })