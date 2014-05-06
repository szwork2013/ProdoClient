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
angular.module('prodo.ProductApp').controller('ManageProductController', ['$scope', '$log', '$rootScope', 'ProductService', 'UserSessionService', '$http', 'CommentLoadMoreService', 'ENV', 'TagReffDictionaryService', 'ProductFeatureService',  'allproductdata','allproductCategories', '$state','CategoryTags','allCommentTags', function ($scope, $log, $rootScope, ProductService, UserSessionService, $http, CommentLoadMoreService, ENV, TagReffDictionaryService, ProductFeatureService, allproductdata,allproductCategories, $state,CategoryTags,allCommentTags) {

  $scope.$state = $state;

  //product
  $scope.form={};
  $scope.editStatus;
  $scope.edit;
  $scope.category=[];
  $scope.commenttags=[];
  $scope.product = {
    product: [{}]
  };
  $scope.ErrMsging=0;
  $scope.newProduct = {
    product: [{}]
  };
  $scope.listProductCategories={
    categoriesList:[],
    commenttagsList:[]
  };
  $scope.listCategory={
              productCategories:[]
            };
  $scope.productCategories=[];
  $scope.type = "product";
  $scope.productlist = [];
  $rootScope.product_prodle;
  $scope.newProduct_ResponseProdle="";
  $rootScope.orgid;
  $scope.chckedIndexs = [];
  // $scope.category;
  $scope.pImages_l = {
    product_images: [{}]
  };
  $scope.currentProdle;
  $scope.currentOrgid;
  // $scope.uploadSrc="product";
  //user
  $scope.userIDFromSession;
  $scope.usernameFromSession;
  $scope.grpnameFromSession;
  $scope.orgnameFromSession;
  $scope.orgidFromSession;
  $scope.ProductsFollowedFromSession = [];
  $scope.socket;


   $scope.handleAllProductDataError=function(error){
     $log.debug(JSON.stringify(error));
      if(error.code=='AL001'){
        $rootScope.showModal();
      }else{
     $("#prodo-ProductDetails").css("display", "none");
     $scope.ErrMsging=1;
     // $("#ErrMsging").css("display", "block");
     $scope.productlist=[];
     document.getElementById("ErrMsging").innerHTML = "<br>Product not available ... Add new product<br><br>";
    }
  };

  $scope.handleAllProductDataSuccess=function(allproductdata){
    // if(allproductCategories.error){
    //    $scope.listCategory.productCategories=['product','software'];
    //   }
    //   else if(allproductCategories.success){
    //    $scope.listCategory.productCategories=allproductCategories.success.categorytags;
    //  }
      $scope.productlist = allproductdata.success.product;
      // console.log( allproductdata.success.product);
      if ($scope.productlist.length == 0) { //after deleting product, check for next product from product followed,if no product - display msg
         $("#prodo-ProductDetails").css("display", "none");
        // $("#ErrMsging").css("display", "block");
        $scope.ErrMsging=1;
        document.getElementById("ErrMsging").innerHTML = "<br>Product not available ... Add new product<br><br>";
       
      }
      if ($scope.productlist.length !== 0) {
         // $log.debug("ADDED."+$scope.newProduct_ResponseProdle);
        // $log.debug("prodle " + $scope.productlist.length);
        $log.debug("prodle " + $scope.productlist[0].prodle + "orgid " + $scope.orgidFromSession);
        $scope.currentProdle = $scope.productlist[0].prodle;
        $scope.currentOrgid = $scope.productlist[0].orgid;
        $rootScope.currentProdleRoot = $scope.productlist[0].prodle; //for upload work
        if($scope.newProduct_ResponseProdle!=="" ){
          $scope.getProduct($scope.newProduct_ResponseProdle, $scope.currentOrgid);
          $scope.newProduct_ResponseProdle="";
        }
        else
          $scope.getProduct($scope.currentProdle, $scope.currentOrgid);
      }
  };
    //get Categories
 //  $scope.listProductCategories=function(){
 //     if(allproductCategories.error){
 //     // $log.debug("err");
 //      return ['product','software'];
 //     }
 //     else if(allproductCategories.success){
 //           $log.debug("new tags "+ allproductCategories.success.categorytags );
 //      return allproductCategories.success.categorytags;
 //     }
 // };

      

  $scope.$watch('$state.$current.locals.globals.allproductdata', function (allproductdata) {
    if (allproductdata.error) {
      $scope.handleAllProductDataError(allproductdata.error);
          
    } else {
       $scope.handleAllProductDataSuccess(allproductdata);
    }
  });

    if(allCommentTags.error){
           
            $scope.listProductCategories.commenttagsList= ['product','warranty'];
            $log.debug( $scope.listProductCategories.commenttagsList);
           }
           else if(allCommentTags.success){
             $scope.listProductCategories.commenttagsList= allCommentTags.success.commenttags;
              $log.debug( $scope.listProductCategories.commenttagsList);
           }


    if(allproductCategories.error){
           // $log.debug("err");
            $scope.listProductCategories.categoriesList= ['product','software'];
           }
           else if(allproductCategories.success){
             $scope.listProductCategories.categoriesList= allproductCategories.success.categorytags;
              // $log.debug("sucesss  "+ $scope.listProductCategories.categoriesList);
           }


  $scope.$watch('$state.$current.locals.globals.allproductCategories', function (allproductCategories) {
             if(allproductCategories.error){
           // $log.debug("err");
            $scope.listProductCategories.categoriesList= ['product','software'];
           }
           else if(allproductCategories.success){
            // setTimeout(function(){ $scope.$apply(function() {
                  $scope.listProductCategories.categoriesList= allproductCategories.success.categorytags;
                   // $log.debug("suce  "+ $scope.listProductCategories.categoriesList);
               // }); });
            }
   });




  //get login details
  $scope.getUserDetails = function () {
    if ($rootScope.usersession.currentUser.org) {
      $scope.grpnameFromSession = $rootScope.usersession.currentUser.org.grpname;
      $scope.orgidFromSession = $rootScope.usersession.currentUser.org.orgid;
      $scope.orgnameFromSession = $rootScope.usersession.currentUser.org.orgname;
    } else {
      $scope.grpnameFromSession = "";
      $scope.orgnameFromSession = "";
      $scope.orgidFromSession = "";
    }
    $scope.userIDFromSession = $rootScope.usersession.currentUser.userid;
    $scope.usernameFromSession = $rootScope.usersession.currentUser.username;
    // $scope.ProductsFollowedFromSession = $rootScope.usersession.currentUser.products_followed;
    $scope.ProductsFollowedFromSession = UserSessionService.productfollowlist
    // $log.debug("Products  f.. "+JSON.stringify( $scope.ProductsFollowedFromSession));
  }
  $scope.getUserDetails();
  //get login details
  // $scope.getproductCategories();

  $scope.handleGetProductSuccess=function(successData,l_prodle, l_orgid){
        $('#showHideAllchk').prop('checked', false);
        $("#prodo-ProductDetails").css("display", "block");
        $("productExtraInfo").css("display", "block");
        // $("#ErrMsging").css("display", "none");
        $scope.ErrMsging=0;
        $log.debug(successData.success.product);
        $scope.getProductFeatures(l_prodle, l_orgid);
        $("#prodo-ProductFeatureTable").css("display", "table");
        $scope.currentProdle=successData.success.product.prodle;
        $scope.product = successData.success.product;
        $rootScope.currentProdleRoot=successData.success.product.prodle;
        $scope.productComments = successData.success.product.product_comments;
        $scope.pImages_l = successData.success.product.product_images;
        $("#prodo-addingProduct").text($scope.product.status);
        // $scope.listProductCategories();
        //check owner of product
        if ($rootScope.usersession.currentUser.org) {
          if ($rootScope.usersession.currentUser.org.isAdmin == true) {
            if ($scope.orgidFromSession === $scope.currentOrgid) {
              $rootScope.isAdminCheck = true;
            } else $rootScope.isAdminCheck = false;
          }
        }
  };

 $scope.handleGetProductError=function(error){
    //error code check here
    if(error.code=='AL001'){
      $rootScope.showModal();
    }
    else{
     $log.debug(error.message);
     $("#prodo-ProductDetails").css("display", "none");
     // $("#ErrMsging").css("display", "block");
     $scope.ErrMsging=1;
     if (document.getElementById("ErrMsging") !== null) document.getElementById("ErrMsging").innerHTML = "Product not available , please select product....";
   
    }       
 };

   
  $scope.getProduct = function (l_prodle, l_orgid) {
    // $log.debug("1 prodle " + l_prodle + "orgid " + l_orgid);
    ProductService.getProduct({
      orgid: l_orgid,
      prodle: l_prodle
    }, function (successData) {
      if (successData.success == undefined) { //if not product
         $scope.handleGetProductError(successData.error);
      } else {
        $scope.handleGetProductSuccess(successData,l_prodle, l_orgid); 
      }
    }, function (error) { //if error geting product
      $log.debug(error);
      $("#prodo-ProductDetails").css("display", "none");
      // $("#ErrMsging").css("display", "inline");
      $scope.ErrMsging=1;
      document.getElementById("ErrMsging").innerHTML = "Server Error:" + error.status;
     
    });
  }
  //get product function declaration  

  
  //error handling for add product
  $scope.handleSaveProductResponse = function (data) {
    if (data.success) {
       $rootScope.ProdoAppMessage(data.success.message, 'success');
       $scope.disableEditor();
      $state.reload();
    } else {
       // $scope.disableEditor();
     
      if(data.error.code=='AL001'){
        $rootScope.showModal();
      }
  
      if (data.error.code == 'AV001') { // user already exist
        $log.debug(data.error.code + " " + data.error.message);
        $rootScope.ProdoAppMessage(data.error.message, 'error');

      } else if (data.error.code == 'AP001') { // user data invalid
        $log.debug(data.error.code + " " + data.error.message);
        $rootScope.ProdoAppMessage(data.error.message, 'error');
        
      } else {
        $log.debug(data.error.message);
        $rootScope.ProdoAppMessage(data.error.message, 'error');
      }
    }
  };
  //error handling for add product

  // $scope.handleSaveProductFeatureResponse(success);
  //error handling for add product
  $scope.handleSaveProductFeatureResponse = function (data) {
    if (data.success) {
       $rootScope.ProdoAppMessage(data.success.message, 'success');
       $scope.disableEditor();
       $state.reload();
    } else {
       // $scope.disableEditor();
       if(data.error.code=='AL001'){
        $rootScope.showModal();
      }
      if (data.error.code == 'AV001') { // user already exist
        $log.debug(data.error.code + " " + data.error.message);
        $rootScope.ProdoAppMessage(data.error.message, 'error');

      } else if (data.error.code == 'AP001') { // user data invalid
        $log.debug(data.error.code + " " + data.error.message);
        $rootScope.ProdoAppMessage(data.error.message, 'error');
      } else {
        $log.debug(data.error.message);
        $rootScope.ProdoAppMessage(data.error.message, 'error');
     }
    }
  };
  //error handling for add product
  //add ,update product

  $scope.addProduct = function (editStatus) {
  if($scope.productForm.$invalid){
      // $rootScope.ProdoAppMessage("Please add valid information", 'error');
      $scope.productForm.submitted=true;
    }
  else{
    $scope.productForm.$setPristine();
    $("productExtraInfo").css("display", "none");
    // $("#ErrMsging").css("display", "none");
    $scope.ErrMsging=0;
    //Input check validations are on Client side( using Angular validations)
    // $log.debug($scope.orgidFromSession);
    if (editStatus == 'add') { //add product

    if($scope.category.length==0 ){
      $rootScope.ProdoAppMessage("Please add category", 'error');
  } else{
      // $scope.productCategoryInvalid=false;

      $scope.newProduct = {
        product: {
          model_no: $scope.product.model_no,
          name: $scope.product.name,
          display_name: $scope.product.display_name,
          description: $scope.product.description,
          category:$scope.category,
          commenttags:$scope.commenttags
        }
      };

      if ($rootScope.usersession.currentUser.org.isAdmin == true) {
        ProductService.saveProduct({
          orgid: $scope.orgidFromSession
        }, $scope.newProduct, function (success) {
          if(success.success){
           $scope.newProduct_ResponseProdle=success.success.prodle;
           $scope.category=[];
           $scope.commenttags=[];
           $scope.disableEditor();
           $('#productExtraInfo').css('display','block'); 
          }
         // $scope.disableEditor();
         $scope.handleSaveProductResponse(success); // calling function to handle success and error responses from server side on POST method success.
        }, function (error) {
          $rootScope.ProdoAppMessage(error, 'error');
          $scope.category=[];
          $log.debug(error);
        });

      } else{
         $rootScope.ProdoAppMessage(data.error.message, 'error');
      }
    }
    }
     else if (editStatus == 'update') { //update product

    if($scope.product.category.length==0 ){

        $rootScope.ProdoAppMessage("Please add category", 'error');

    } else{
        // $scope.productCategoryInvalid=false;
        $scope.newProduct = {
          product: {
          model_no: $scope.product.model_no,
          name: $scope.product.name,
          description: $scope.product.description,
          support_discontinuation_date: $scope.product.support_discontinuation_date,
          sale_discontinuation_date: $scope.product.sale_discontinuation_date,
          banneddate: $scope.product.banneddate,
          display_name: $scope.product.display_name,
          category:$scope.product.category,
          commenttags:$scope.product.commenttags
        
        }
      };
      if ($rootScope.usersession.currentUser.org.isAdmin == true) {
        if ($scope.orgidFromSession === $scope.currentOrgid) {
          ProductService.updateProduct({
            orgid: $scope.orgidFromSession,
            prodle: $scope.currentProdle
          }, $scope.newProduct, function (success) {
            $scope.newProduct_ResponseProdle=$scope.currentProdle;
            $log.debug("update......"+success);
            // $rootScope.ProdoAppMessage("Product updated successfully...", 'success');
            $scope.handleSaveProductResponse(success); // calling function to handle success and error responses from server side on POST method success.
            $scope.getProduct($scope.currentProdle, $scope.currentOrgid);
            $scope.disableEditor();
          }, function (error) {
            $log.debug(error);
             $scope.editMode.editorEnabled = true;
            $rootScope.ProdoAppMessage(error, 'error');

          });
        }
      } else{
         $rootScope.ProdoAppMessage( "You dont have rights to update this product...", 'error'); 
      } 
    }
   }
   }
  };

  $scope.handleDeleteProductSuccess=function(success){
      $log.debug(JSON.stringify(success));
           $rootScope.ProdoAppMessage( "Product deleted successfully...", 'success'); 
           $scope.editMode.editorEnabled=false;
          $("#prodo-ProductDetails").css("display", "none");
          $state.reload();
          // $scope.handleProductDeleted();
  };

   $scope.handleDeleteProductError=function(error){
    if(error.code=='AL001'){
        $rootScope.showModal();
      }
      else{
        $log.debug(error.message);
      }
  }
  

  $scope.deleteProduct = function () {
    $log.debug("Deleting product  ..."+$scope.currentProdle );
    $rootScope.ProdoAppMessage("Deleting product  ..."+$scope.currentProdle, 'info');
    if ($scope.currentProdle !== undefined || $scope.currentProdle !== null || $scope.currentProdle !== "") {
      if ($rootScope.isAdminCheck == true) { //if owener of product
        ProductService.deleteProduct({
          orgid: $scope.orgidFromSession,
          prodle: $scope.currentProdle
        }, function (success) {
          if(success.success){
           $scope.handleDeleteProductSuccess(success);   
          }else if(success.error){
            $scope.handleDeleteProductError(success.error);
          }  
        }, function (error) {
          $log.debug(JSON.stringify(error));
          $rootScope.ProdoAppMessage(error, 'error'); 
        });
      }
      // }
      else{
       $rootScope.ProdoAppMessage("You dont have rights to delete this product...", 'error'); 

      }
    }
  };
  //delete product
  //clear text fields of product
  $scope.clearText = function () {
    // prodo-product-features_textfield
    $scope.product = "";
    $scope.pImages_l = "";
    $scope.features = "";
  }
  //clear text fields of product


  //toggle to select all product iamges
  $scope.selectAllImages = function (imgs) {
    if (!$('#showHideAllchk').is(':checked')) {
      $('.imgToggles').prop('checked', false);
      // $scope.chckedIndexs=[];
      $scope.chckedIndexs.length=0;
      // $scope.checked=0;
      // $log.debug("1"+$scope.chckedIndexs);
    } else {
      $('.imgToggles').prop('checked', true);
       for (i = 0; i < imgs.length; i++) {
      $scope.chckedIndexs.push(imgs[i]);
    }
      // $log.debug("2"+$scope.chckedIndexs);
       // $scope.checked=1;
    }
  };


  //get selected image for delete
  $scope.checkedIndex = function (img) {
    if ($scope.chckedIndexs.indexOf(img) === -1) {
      $scope.chckedIndexs.push(img);
      // $log.debug("3"+$scope.chckedIndexs);
    } else {
      $scope.chckedIndexs.splice($scope.chckedIndexs.indexOf(img), 1);
      }
    // $log.debug("4"+$scope.chckedIndexs);
 
        if($(".imgToggles").length == $(".imgToggles:checked").length) {
            $("#showHideAllchk").prop("checked", "checked");
        } else {
            // $("#showHideAllchk").removeAttr("checked");
            $('#showHideAllchk').prop('checked', false);
        }
 
  };
  //get selected image for delete
    //Delete product image validation
  $scope.checkImageSelectedToDelete = function () {
    $log.debug("Delete images.......");
     // $log.debug("5"+$scope.chckedIndexs);
    if ($scope.chckedIndexs.length > 0) { //if image selected to delete,show modal
      $('#imgDelModal').modal('toggle');
      $('#imgDelModal').modal('show');
    } else { //if no image selected to delete
       $rootScope.ProdoAppMessage("Select atlest 1 image to delete ", 'error'); 
    }
  };
  //Delete product image validation
  //if product admin, show delete images options
  $scope.checkAdminProductImagesDelete = function () {

    if ($rootScope.isAdminCheck == true) {
      return {
        display: "inline"
      }
    } else {
      return {
        display: "none"
      }
    }
  };
  //if product admin, show delete images options
$scope.handledeleteProductImagesSuccess=function(success){
  $log.debug(success);
       $rootScope.ProdoAppMessage("Images deleted successfully...", 'success'); 
};

$scope.handledeleteProductImagesError=function(error){
  if(error.code=='AL001'){
        $rootScope.showModal();
      }
      else{
         $log.debug(error);
      }
};

  //delete images
 $scope.deleteProductImages = function (index) {
    if ($rootScope.isAdminCheck == true) {
      //get selected ids to delete images
      
      $scope.imgIds = [{}];
      $scope.ids;
      $(':checkbox:checked').each(function (i) {
        $scope.imgIds[i] = $(this).val();
        $scope.ids = $(this).val();
      });
      angular.forEach($scope.chckedIndexs, function (value, index) {
        // $log.debug("value= "+value);
        var index = $scope.pImages_l.indexOf(value);
        $scope.pImages_l.splice($scope.pImages_l.indexOf(value), 1);
      });
      $scope.chckedIndexs = [];
      $scope.temp = {
        prodleimageids: $scope.imgIds
      }
      $http({
        method: 'DELETE',
        url: ENV.apiEndpoint_notSocket + '/api/image/product/' + $scope.orgidFromSession + '/' + $scope.currentProdle + '?prodleimageids=' + $scope.imgIds,
        // url: 'www.prodonus.com/api/image/product/' + $scope.orgidFromSession + '/' + $scope.currentProdle +'?prodleimageids='+$scope.imgIds ,
        // data: {'prodleimageids':[ $scope.imgIdsJson]}
      }).success(function (data, status, headers, cfg) {
       if(data.success)  {
        $scope.handledeleteProductImagesSuccess(data.success);
      }
      else  if(data.error)  {
        $scope.handledeleteProductImagesError(data.error);
      }
      }).error(function (data, status, headers, cfg) {
        // $log.debug(status);
       $rootScope.ProdoAppMessage(status, 'error'); 
     });
    } else {

       $rootScope.ProdoAppMessage("You dont have rights to delete images", 'error'); 

    }
    
    
  };
  //delete images

  //if product owner, display update delete product icons
  $scope.checkAdmintoUpdateProduct = function () {
    if ($rootScope.usersession.currentUser.org) {
      if ($rootScope.usersession.currentUser.org.isAdmin == true) {
        if ($scope.orgidFromSession === $scope.currentOrgid) {
          $rootScope.isAdminCheck = true;
          return {
            display: "block"
          }
        } else return {
          display: "none"
        }
      } else return {
        display: "none"
      }
    } else return {
      display: "none"
    }
  };
  //if product owner, display update delete product icons

  $scope.checkAdmin = function () {
    if ($rootScope.usersession.currentUser.org) {
      if ($rootScope.usersession.currentUser.org.isAdmin == true) {
        if ($scope.orgidFromSession === $scope.currentOrgid) {
          $rootScope.isAdminCheck = true;
        }
      }
    }
    if ($rootScope.isAdminCheck == true) {
      // $("#prodo.productAdmin").c$scope.warranties[i]ss("display", "inline"); 
      $("#prodo.productAdminAddProduct").css("display", "inline");
    } else if ($rootScope.usersession.currentUser.org.isAdmin == true) {
      $("#prodo.productAdmin").css("display", "none");
      $("#prodo.productAdminAddProduct").css("display", "inline");
    } else {
      $("#prodo.productAdmin").css("display", "none");
      $("#prodo.productAdminAddProduct").css("display", "none");
    }
  };
 
   $scope.features = [];
  $scope.PFeatures = [];
 $scope.handleGetProductFeatureSuccess=function(successData){
         // $log.debug("success    "+JSON.stringify(successData));
          $scope.features = [];
          $scope.featuretags = [];
          for (i = 0; i < successData.success.productfeature.length; i++) {
            $scope.features.push(successData.success.productfeature[i]);
            $scope.PFeatures.push(successData.success.productfeature[i]);
            $scope.featuretags.push(successData.success.productfeature[i].featurename);
          }
          // $scope.features= JSON.stringify($scope.features);
          // $log.debug("pf  "+ $scope.featuretags);
 };

 $scope.handleGetProductFeatureError=function(error){
    if(error.code=='AL001'){
        $rootScope.showModal();
      }
      else{
         $log.debug(error);
      }
 };
  //get Product features

  $scope.getProductFeatures = function (prodle, orgid) {
    if (prodle !== "") {
      ProductFeatureService.getFeature({
        orgid: orgid,
        prodle: prodle
      }, function (successData) {
        if (successData.success == undefined) {
         if(successData.error){
          $scope.handleGetProductFeatureError(successData.error);
         }
        } else {
          $scope.handleGetProductFeatureSuccess(successData);
           }
      }, function (error) {
       $rootScope.ProdoAppMessage("Server Error:" + error.status, 'error'); 
      });
    }
  };
  //get Product features

   $scope.handleDeleteFeatureSuccess=function(success,feature){
            // $log.debug(JSON.stringify( success));
          //client side delete
          var index = $scope.features.indexOf(feature);
          if (index != -1) $scope.features.splice(index, 1);
          $rootScope.ProdoAppMessage(success.success.message, 'success'); 
   };

 $scope.handleDeleteFeatureError=function(error){
     if(error.code=='AL001'){
        $rootScope.showModal();
      }
      else{
         $log.debug(error);
      }
 }

  //delete product feature
  $scope.deleteFeature = function (feature) {
    // $log.debug("deleting feature");
    if (feature !== undefined || feature !== null || feature !== "") {
        $rootScope.ProdoAppMessage("Deleting product feature ...", 'info');
      // $log.debug(feature.featureid);
      if ($rootScope.isAdminCheck == true) { //if product owner
        ProductFeatureService.deleteFeature({
          orgid: $scope.orgidFromSession,
          prodle: $scope.currentProdle,
          productfeatureid: feature.featureid
        }, function (success) {
          if(success.success){
           $scope.handleDeleteFeatureSuccess(success,feature);
          }
          else if(success.error){
           $scope.handleDeleteFeatureError(success.error);
          } 
        }, function (error) {
          $log.debug(JSON.stringify(error));
          $rootScope.ProdoAppMessage(JSON.stringify(error), 'error'); 
      });
      } else { //if not owner display msg
          $rootScope.ProdoAppMessage("You dont have rights to delete this feature...", 'error'); 
      }
    }
  };
  //delete product feature
  //add product feature
  $scope.addProductFeature = function (editStatus) {
   if($scope.productFeaturesForm.$invalid){
    // $rootScope.ProdoAppMessage("Please add valid information", 'error'); 
    $scope.productFeaturesForm.submitted=true;
   }
  else{
   
    $scope.newFeature = {};
    $scope.newFeature = {
      productfeature: [{
        featurename: $scope.featurename,
        featuredescription: $scope.featuredescription
      }]
    };
     $scope.disableEditorFeature();
    $scope.productFeaturesForm.$setPristine();
    $log.debug( $scope.newFeature);
    if ($scope.newFeature !== undefined || $scope.newFeature !== null || $scope.newFeature !== "") {
      if (editStatus == 'add') {
        // $log.debug("adding");
        if ($rootScope.isAdminCheck == true) { //if product owner
          ProductFeatureService.saveFeature({
            orgid: $scope.orgidFromSession,
            prodle: $scope.currentProdle
          }, $scope.newFeature, function (success) {
            // $log.debug(success);
            // $scope.currentProdle=$scope.product.product_prodle;
            $scope.newProduct_ResponseProdle=$scope.currentProdle;
            $scope.handleSaveProductFeatureResponse(success); // calling function to handle success and error responses from server side on POST method success.
            $log.debug("new Feature : " + JSON.stringify($scope.newFeature.productfeature[0]));
            $scope.features.push($scope.newFeature.productfeature[0]);
            // $rootScope.ProdoAppMessage("Feature added successfully", 'success'); 
            $scope.featurename="";
            $scope.featuredescription="";
            $log.debug($scope.features);
            $scope.feature = "";
          }, function (error) {
             $scope.enableFeatureErrorMsg();
             ProdFERRMsg.innerHTML = error;
             $rootScope.ProdoAppMessage(error, 'error'); 
            $log.debug(error);
          });
        } //if not owner display msg
        else{
             $rootScope.ProdoAppMessage( "You dont have rights to add product feature...", 'error'); 

        } 
      }
    }
  }
  };
  //add product feature

  //update product feature
  $scope.updateProductFeature = function (data, id) {
    if($scope.productFeatureUpdate.$invalid){
        $rootScope.ProdoAppMessage( "Please add valid information", 'error'); 
      }
    else{


    if (data !== undefined || data !== null || data !== "") {
      if ($rootScope.isAdminCheck == true) {
        ProductFeatureService.updateFeature({
          orgid: $scope.orgidFromSession,
          prodle: $scope.currentProdle,
          productfeatureid: id
        }, {
          'productfeature': data
        }, function (success) {
          // $log.debug(success);
           // $scope.currentProdle=$scope.product.product_prodle;
           $scope.newProduct_ResponseProdle=$scope.currentProdle;
          $scope.handleSaveProductFeatureResponse(success); // calling function to handle success and error responses from server side on POST method success.
        
        }, function (error) {
          $log.debug(error);
          $rootScope.ProdoAppMessage(error, 'error'); 
          
        });
      } else{
       $rootScope.ProdoAppMessage("You dont have rights to update product feature...", 'error'); 
      }
    }
  }
  };
  //update product feature

  //Edit mode and display mode toggle for product data add , update and diaplay
  // $scope.editorEnabled = false;
  // $scope.editorEnabledF = false;
     $scope.editMode = {
    editorEnabled: false,
    editorEnabledF : false
  };
  
  $scope.enableEditor = function () {
    $scope.editMode.editorEnabled = true;
    $rootScope.ProdoAppMessage("   Adding product data....", 'info');

  };
  $scope.disableEditor = function () {
    $scope.editMode.editorEnabled = false;
    $scope.productForm.submitted=false;
    $scope.feature = "";
    $scope.commenttags=[];
    $scope.category=[];
    if ($scope.currentProdle == undefined || $scope.currentProdle == null || $scope.currentProdle == "") {
      $("#prodo-ProductDetails").css("display", "none");
        // $("#ErrMsging").css("display", "block");
        $scope.ErrMsging=1;
      document.getElementById("ErrMsging").innerHTML = "<br>Product not available ... Add new product<br><br>";
    }
    else{

       $scope.getProduct($scope.currentProdle, $scope.currentOrgid);
      $scope.getProductFeatures($scope.currentProdle, $scope.currentOrgid);
    }
  };

  $scope.enableEditorFeature = function () {
    $scope.editMode.editorEnabledF = true;
    $rootScope.ProdoAppMessage("   Adding product data....", 'info');

  };
  $scope.disableEditorFeature = function () {
    $scope.editMode.editorEnabledF = false;
    $scope.productFeaturesForm.$setPristine();
    $scope.productFeaturesForm.submitted=false;
    $scope.featurename = "";
    $scope.descriptio="";
    if ($scope.currentProdle !== undefined || $scope.currentProdle !== null || $scope.currentProdle !== "") {
      $scope.getProduct($scope.currentProdle, $scope.currentOrgid);
      $scope.getProductFeatures($scope.currentProdle, $scope.currentOrgid);
    }
  };
  //Edit mode and display mode toggle for product data add , update and diaplay
  //on product logo hover, show follow product button
  $(document).ready(function () {
    if ($rootScope.isAdminCheck == true) {
      $("#productLogoUpload").css("display", "inline");
      $("#productLogo").hover(function () {
        $("#productLogoUpload").show();
      }, function () {
        setTimeout(function () {
          $("#productLogoUpload").hide();
        }, 3000);
      });
    } else {
      $("#productLogoUpload").css("display", "none");
    }


  });
  //on product logo hover, show follow product button
 $scope.changeProduct=function(product1){
  $scope.productForm.submitted=false;
    $scope.productFeaturesForm.submitted=false;
    $scope.feature = "";
    $scope.currentProdle = product1.prodle;
    $scope.currentOrgid = product1.orgid;
    $scope.getProduct($scope.currentProdle, $scope.currentOrgid);
    $scope.editMode.editorEnabled = false;
    $scope.editMode.editorEnabledF = false;
    // $scope.disableEditor();
    $('#productExtraInfo').css('display','block'); 
  };

  $scope.getSelectedProduct = function (product1) {
    jQuery("#FileName").hide();
    if(($scope.editMode.editorEnabled == true)|| ($scope.editMode.editorEnabledF ==true) ){
     
         $('#changeProductModal').modal('toggle');
      $('#changeProductModal').modal('show');

      $('#ChangeProductOkButton').on('click', function (event) {
        $scope.changeProduct(product1)
      });


      //modal code here , if yes clear data and show product if cancel, prev state
    }else{
    $scope.currentProdle = product1.prodle;
    $scope.currentOrgid = product1.orgid;
    $scope.getProduct($scope.currentProdle, $scope.currentOrgid);
    }
  };


  //Product List pagination
  $scope.currentPage = 0;
  $scope.pageSize = 4;
  $scope.numberOfPages = function () {
    return Math.ceil($scope.productlist.length / $scope.pageSize);
  };
  //Product List pagination
  //delete feature modal data passing
  $scope.selectedFeature;
  $scope.getSelectedFeature = function (feature) {
    $scope.selectedFeature = feature;
  };
  //delete feature modal data passing
  //date format
  $scope.formatDate = function (time) {
    return (moment(time).format('DD MMM YYYY'));
  };
  //date format

   var cleanupEventproductUploadResponseSuccess = $scope.$on("productUploadResponseSuccess",function(event,message){
     // $log.debug("Listening");
     $scope.newProduct_ResponseProdle=$scope.currentProdle;
      $state.reload();
   });
   // cleanupEventproductUploadResponseSuccess();

   var cleanupEventproductUploadLogoResponseSuccess = $scope.$on("productUploadLogoResponseSuccess",function(event,message){
       // $log.debug("Listening");
       $scope.newProduct_ResponseProdle=$scope.currentProdle;
      $state.reload();
   });
   // cleanupEventproductUploadLogoResponseSuccess();



}])
 
 angular.module('prodo.ProductApp').filter('startFrom', function () {
  return function (input, start) {
    if (input !== undefined || start !== undefined) {
      start = +start;
      return input.slice(start);
    }
  }
})