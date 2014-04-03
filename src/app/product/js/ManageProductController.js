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
angular.module('prodo.ProductApp').controller('ManageProductController', ['$scope', '$log', '$rootScope', 'ProductService', 'UserSessionService', '$http', 'CommentLoadMoreService', 'ENV', 'TagReffDictionaryService', 'ProductFeatureService', 'growl', 'allproductdata','allproductCategories', '$state','CategoryTags', function ($scope, $log, $rootScope, ProductService, UserSessionService, $http, CommentLoadMoreService, ENV, TagReffDictionaryService, ProductFeatureService, growl, allproductdata,allproductCategories, $state,CategoryTags) {

  $scope.$state = $state;

  //product
  $scope.form={};
  $scope.editStatus;
  $scope.edit;
  $scope.category=[];
  $scope.product = {
    product: [{}]
  };
  $scope.newProduct = {
    product: [{}]
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
  $scope.category;
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


  

  $scope.$watch('$state.$current.locals.globals.allproductdata', function (allproductdata) {
    if (allproductdata.error) {
           $log.debug(JSON.stringify( allproductdata.error));
        $("#prodo-ProductDetails").css("display", "none");
        $("#ErrMsging").css("display", "block");
         $scope.productlist=[];
      document.getElementById("ErrMsging").innerHTML = "<br>Product not available ... Add new product<br><br>";
    } else {
      if(allproductCategories.error){
       $scope.listCategory.productCategories=['product','software'];
      }
      else if(allproductCategories.success){
       $scope.listCategory.productCategories=allproductCategories.success.categorytags;
     }
      $scope.productlist = allproductdata.success.product;
      console.log( allproductdata.success.product);
      if ($scope.productlist.length == 0) { //after deleting product, check for next product from product followed,if no product - display msg
         $("#prodo-ProductDetails").css("display", "none");
        $("#ErrMsging").css("display", "block");
        document.getElementById("ErrMsging").innerHTML = "<br>Product not available ... Add new product<br><br>";
        // growl.addErrorMessage(" Product not available ...");
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
    }
  });


  //get Categories
  $scope.listProductCategories=function(){
     if(allproductCategories.error){
     $log.debug("err");
      return ['product','software'];
     }
     else if(allproductCategories.success){
      $log.debug("suc");
      return allproductCategories.success.categorytags;
     }
 };

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
  $scope.getProduct = function (l_prodle, l_orgid) {
    // $log.debug("1 prodle " + l_prodle + "orgid " + l_orgid);
    ProductService.getProduct({
      orgid: l_orgid,
      prodle: l_prodle
    }, function (successData) {
      if (successData.success == undefined) { //if not product
        $("#prodo-ProductDetails").css("display", "none");
        $("#ErrMsging").css("display", "block");
        if (document.getElementById("ErrMsging") !== null) document.getElementById("ErrMsging").innerHTML = "Product not available , please select product....";
        // growl.addErrorMessage(" Product not available....");
      } else {
        $('#showHideAllchk').prop('checked', false);
        $("#prodo-ProductDetails").css("display", "block");
        $("productExtraInfo").css("display", "block");
        $("#ErrMsging").css("display", "none");
        $log.debug(successData.success.product);
        $scope.getProductFeatures(l_prodle, l_orgid);
        $("#prodo-ProductFeatureTable").css("display", "table");
        $scope.currentProdle=successData.success.product.prodle;
        $scope.product = successData.success.product;
        $rootScope.currentProdleRoot=successData.success.product.prodle;
        $scope.productComments = successData.success.product.product_comments;
        $scope.pImages_l = successData.success.product.product_images;
        $("#prodo-addingProduct").text($scope.product.status);
        //check owner of product
        if ($rootScope.usersession.currentUser.org) {
          if ($rootScope.usersession.currentUser.org.isAdmin == true) {
            if ($scope.orgidFromSession === $scope.currentOrgid) {
              $rootScope.isAdminCheck = true;
            } else $rootScope.isAdminCheck = false;
          }
        }
      }
    }, function (error) { //if error geting product
      $log.debug(error);
      $("#prodo-ProductDetails").css("display", "none");
      $("#ErrMsging").css("display", "inline");
      document.getElementById("ErrMsging").innerHTML = "Server Error:" + error.status;
      // growl.addErrorMessage( "Server Error:" + error.status);
    });
  }
  //get product function declaration  

  
  //error handling for add product
  $scope.handleSaveProductResponse = function (data) {
    if (data.success) {
       $scope.enableProductSuccessMsg();
       ProdSuccessMsg.innerHTML = data.success.message;
       $scope.disableEditor();
       // growl.addSuccessMessage(data.success.message);
      $state.reload();
    } else {
       // $scope.disableEditor();
      if (data.error.code == 'AV001') { // user already exist
        $log.debug(data.error.code + " " + data.error.message);
        $scope.enableProductErrorMsg();
        ProdERRMsg.innerHTML = data.error.message;
        // growl.addErrorMessage(data.error.message);

      } else if (data.error.code == 'AP001') { // user data invalid
        $log.debug(data.error.code + " " + data.error.message);
        $scope.enableProductErrorMsg();
        ProdERRMsg.innerHTML = data.error.message;
        // growl.addErrorMessage(data.error.message);
      } else {
        $log.debug(data.error.message);
        $scope.enableProductErrorMsg();
        ProdERRMsg.innerHTML = data.error.message; 
        // growl.addErrorMessage(data.error.message);
      }
    }
  };
  //error handling for add product

  // $scope.handleSaveProductFeatureResponse(success);
  //error handling for add product
  $scope.handleSaveProductFeatureResponse = function (data) {
    if (data.success) {
        // $scope.enableFeatureSuccessMsg();
        $scope.enableFeatureSuccessMsg();
        ProdFSuccessMsg.innerHTML = "Feature added successfully";
       ProdFSuccessMsg.innerHTML = data.success.message;
       $scope.disableEditor();
       // growl.addSuccessMessage(data.success.message);
      $state.reload();
    } else {
       // $scope.disableEditor();
      if (data.error.code == 'AV001') { // user already exist
        $log.debug(data.error.code + " " + data.error.message);
       $scope.enableFeatureErrorMsg();
        ProdFERRMsg.innerHTML = data.error.message;
        // growl.addErrorMessage(data.error.message);

      } else if (data.error.code == 'AP001') { // user data invalid
        $log.debug(data.error.code + " " + data.error.message);
      $scope.enableFeatureErrorMsg();
        ProdFERRMsg.innerHTML = data.error.message;
        // growl.addErrorMessage(data.error.message);
      } else {
        $log.debug(data.error.message);
       $scope.enableFeatureErrorMsg();
        ProdFERRMsg.innerHTML = data.error.message; 
        // growl.addErrorMessage(data.error.message);
      }
    }
  };
  //error handling for add product
  //add ,update product

  $scope.addProduct = function (editStatus) {
  if($scope.productForm.$invalid){
      // $scope.enableProductErrorMsg();
      // ProdERRMsg.innerHTML = "Please add valid information"; 
      $scope.productForm.submitted=true;
    }
  else{
    $scope.productForm.$setPristine();
    $("productExtraInfo").css("display", "none");
    $("#ErrMsging").css("display", "none");
    //Input check validations are on Client side( using Angular validations)
    // $log.debug($scope.orgidFromSession);
    if (editStatus == 'add') { //add product

    if($scope.category.length==0 ){
     $scope.enableProductErrorMsg();
        ProdERRMsg.innerHTML = "Please add category";  
     // $scope.productCategoryInvalid=true;
  } else{
      // $scope.productCategoryInvalid=false;
      $scope.newProduct = {
        product: {
          model_no: $scope.product.model_no,
          name: $scope.product.name,
          display_name: $scope.product.display_name,
          description: $scope.product.description,
          category:$scope.category
        }
      };
      if ($rootScope.usersession.currentUser.org.isAdmin == true) {
        ProductService.saveProduct({
          orgid: $scope.orgidFromSession
        }, $scope.newProduct, function (success) {
          if(success.success){
           $scope.newProduct_ResponseProdle=success.success.prodle;
           $scope.category=[];
           $scope.disableEditor();
           $('#productExtraInfo').css('display','block'); 
          }
         // $scope.disableEditor();
         $scope.handleSaveProductResponse(success); // calling function to handle success and error responses from server side on POST method success.
        }, function (error) {
         // growl.addErrorMessage(error);
          // $scope.editMode.editorEnabled = true;
           $scope.enableProductErrorMsg();
           ProdERRMsg.innerHTML = error; 
            $scope.category=[];
          $log.debug(error);
        });

      } else{
         $scope.enableProductErrorMsg();
         ProdERRMsg.innerHTML = data.error.message; 
         // growl.addErrorMessage("You dont have rights to add product...");
      }
    }
    } else if (editStatus == 'update') { //update product

    if($scope.product.category.length==0 ){
     $scope.enableProductErrorMsg();
        ProdERRMsg.innerHTML = "Please add category";  
     // $scope.productCategoryInvalid=true;
    } else{
        // $scope.productCategoryInvalid=false;
        $scope.newProduct = {
          product: {
          model_no: $scope.product.model_no,
          name: $scope.product.name,
          description: $scope.product.description,
          support_discontinuation_date: $scope.product.supDis,
          sale_discontinuation_date: $scope.product.prodDis,
          banneddate: $scope.product.banneddate,
          display_name: $scope.product.display_name,
          category:$scope.product.category
        
        }
      };
      if ($rootScope.usersession.currentUser.org.isAdmin == true) {
        if ($scope.orgidFromSession === $scope.currentOrgid) {
          ProductService.updateProduct({
            orgid: $scope.orgidFromSession,
            prodle: $scope.currentProdle
          }, $scope.newProduct, function (success) {
            $scope.newProduct_ResponseProdle=$scope.currentProdle;
            $log.debug(success);
            $scope.enableProductSuccessMsg();
            ProdSuccessMsg.innerHTML ="Product updated successfully...";
            $scope.handleSaveProductResponse(success); // calling function to handle success and error responses from server side on POST method success.
            $scope.getProduct($scope.currentProdle, $scope.currentOrgid);
            $scope.disableEditor();
          }, function (error) {
            $log.debug(error);
             $scope.editMode.editorEnabled = true;
            $scope.enableProductErrorMsg();
            ProdERRMsg.innerHTML = error; 
            // growl.addErrorMessage(error);
          });
        }
      } else{
        $scope.enableProductErrorMsg();
        ProdERRMsg.innerHTML = "You dont have rights to update this product...";
        // growl.addErrorMessage("You dont have rights to update this product..."); 
      } 
    }
   }
   }
  };
  $scope.deleteProduct = function () {
    $log.debug("Deleting product  ..."+$scope.currentProdle );
    growl.addInfoMessage("Deleting product  ..."+$scope.currentProdle );
    if ($scope.currentProdle !== undefined || $scope.currentProdle !== null || $scope.currentProdle !== "") {
      if ($rootScope.isAdminCheck == true) { //if owener of product
        ProductService.deleteProduct({
          orgid: $scope.orgidFromSession,
          prodle: $scope.currentProdle
        }, function (success) {
          $log.debug(JSON.stringify(success));
          $scope.enableProductSuccessMsg();
          ProdSuccessMsg.innerHTML ="Product deleted successfully...";
          // growl.addSuccessMessage("Product deleted successfully...");
          $("#prodo-ProductDetails").css("display", "none");
          $state.reload();
          // $scope.handleProductDeleted();
        }, function (error) {
          $log.debug(JSON.stringify(error));
          $scope.enableProductErrorMsg();
          ProdERRMsg.innerHTML = error;
           // growl.addErrorMessage(error);
        });
      }
      // }
      else{
        $scope.enableProductErrorMsg();
        ProdERRMsg.innerHTML = error;
       // growl.addErrorMessage("You dont have rights to delete this product...");
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
       $scope.enableIMGErrorMsg();
       ProdIMGERRMsg.innerHTML = "Select atlest 1 image to delete ";
      // growl.addErrorMessage("Select atlest 1 image to delete");
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

  //delete images
 $scope.deleteProductImages = function (index) {
    if ($rootScope.isAdminCheck == true) {
      //get selected ids to delete images
      // growl.addInfoMessage("Deleting product images ...");
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
        // $log.debug(data);
      $scope.enableIMGSuccessMsg();
      ProdIMGSuccessMsg.innerHTML = "Images deleted successfully...";
       
        // growl.addSuccessMessage("Images deleted successfully...");

      }).error(function (data, status, headers, cfg) {
        // $log.debug(status);
        $scope.enableIMGErrorMsg();
       ProdIMGERRMsg.innerHTML = status;
        // growl.addErrorMessage(status);
      });
    } else {
      $scope.enableIMGErrorMsg();
       ProdIMGERRMsg.innerHTML = "You dont have rights to delete images";
    }
    
    // growl.addErrorMessage("You dont have rights to delete images");
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
      // $("#prodo.productAdmin").css("display", "inline"); 
      $("#prodo.productAdminAddProduct").css("display", "inline");
    } else if ($rootScope.usersession.currentUser.org.isAdmin == true) {
      $("#prodo.productAdmin").css("display", "none");
      $("#prodo.productAdminAddProduct").css("display", "inline");
    } else {
      $("#prodo.productAdmin").css("display", "none");
      $("#prodo.productAdminAddProduct").css("display", "none");
    }
  };

  //get Product features
  $scope.features = [];
  $scope.PFeatures = [];
  $scope.getProductFeatures = function (prodle, orgid) {
    if (prodle !== "") {
      ProductFeatureService.getFeature({
        orgid: orgid,
        prodle: prodle
      }, function (successData) {
        if (successData.success == undefined) {
          if ($rootScope.usersession.currentUser.org.isAdmin == true) {
            //admin tasks
          } else {}
        } else {
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
        }
      }, function (error) {
        $scope.enableFeatureErrorMsg();
        ProdFERRMsg.innerHTML = "Server Error:" + error.status;
        // growl.addErrorMessage("Server Error:" + error.status);
      });
    }
  };
  //get Product features
  //delete product feature
  $scope.deleteFeature = function (feature) {
    // $log.debug("deleting feature");
    if (feature !== undefined || feature !== null || feature !== "") {
      growl.addInfoMessage("Deleting product feature ...");
      // $log.debug(feature.featureid);
      if ($rootScope.isAdminCheck == true) { //if product owner
        ProductFeatureService.deleteFeature({
          orgid: $scope.orgidFromSession,
          prodle: $scope.currentProdle,
          productfeatureid: feature.featureid
        }, function (success) {
          // $log.debug(JSON.stringify( success));
          //client side delete
          var index = $scope.features.indexOf(feature);
          if (index != -1) $scope.features.splice(index, 1);
          // growl.addSuccessMessage(success.success.message);
          $scope.enableFeatureSuccessMsg();
          ProdFSuccessMsg.innerHTML = success.success.message;
        }, function (error) {
          $log.debug(JSON.stringify(error));
          $scope.enableFeatureErrorMsg();
          ProdFERRMsg.innerHTML = JSON.stringify(error);
          // growl.addErrorMessage(JSON.stringify(error))

        });
      } else { //if not owner display msg
      // growl.addErrorMessage("You dont have rights to delete this feature...");
      $scope.enableFeatureErrorMsg();
      ProdFERRMsg.innerHTML = "You dont have rights to delete this feature...";
      }
    }
  };
  //delete product feature
  //add product feature
  $scope.addProductFeature = function (editStatus) {
   if($scope.productFeaturesForm.$invalid){
    // $scope.enableFeatureErrorMsg();
    // ProdFERRMsg.innerHTML ="Please add valid information";
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
            // $scope.enableFeatureSuccessMsg();
            // ProdFSuccessMsg.innerHTML = "Feature added successfully";
            $scope.featurename="";
            $scope.featuredescription="";
            // growl.addSuccessMessage("Feature added successfully");
            $log.debug($scope.features);
            $scope.feature = "";
          }, function (error) {
            // growl.addErrorMessage(error);
             $scope.enableFeatureErrorMsg();
             ProdFERRMsg.innerHTML = error;
            $log.debug(error);
          });
        } //if not owner display msg
        else{
          $scope.enableFeatureErrorMsg();
          ProdFERRMsg.innerHTML = "You dont have rights to add product feature...";
          // growl.addErrorMessage("You dont have rights to add product feature...");
        } 
      }
    }
  }
  };
  //add product feature

  //update product feature
  $scope.updateProductFeature = function (data, id) {
    if($scope.productFeatureUpdate.$invalid){
      $scope.enableFeatureErrorMsg();
      ProdFERRMsg.innerHTML = "Please add valid information";
    }
    else{

    console.log(data);
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
          // $scope.features.push($scope.newFeature);
          $scope.enableFeatureSuccessMsg();
          ProdFSuccessMsg.innerHTML = success.success.message;
          // growl.addSuccessMessage(success.success.message);
        }, function (error) {
          $log.debug(error);
          $scope.enableFeatureErrorMsg();
          ProdFERRMsg.innerHTML = error;
          // growl.addErrorMessage(error);
        });
      } else{
       // growl.addErrorMessage("You dont have rights to update product feature...");
       $scope.enableFeatureErrorMsg();
       ProdFERRMsg.innerHTML = "You dont have rights to update product feature...";
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
    growl.addInfoMessage("   Adding product data.....");
  };
  $scope.disableEditor = function () {
    $scope.editMode.editorEnabled = false;
      $scope.productForm.submitted=false;
    $scope.feature = "";
    if ($scope.currentProdle == undefined || $scope.currentProdle == null || $scope.currentProdle == "") {
      $("#prodo-ProductDetails").css("display", "none");
        $("#ErrMsging").css("display", "block");
      document.getElementById("ErrMsging").innerHTML = "<br>Product not available ... Add new product<br><br>";
    }
    else{

       $scope.getProduct($scope.currentProdle, $scope.currentOrgid);
      $scope.getProductFeatures($scope.currentProdle, $scope.currentOrgid);
    }
  };

  $scope.enableEditorFeature = function () {
    $scope.editMode.editorEnabledF = true;
    growl.addInfoMessage("   Adding product data.....");
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
      // $scope.enableProductErrorMsg();
      // ProdERRMsg.innerHTML = "Please add product first then view other products..."; 
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


  var ProdFERRMsg = document.getElementById('ProdFERRMsg');
  var ProdFSuccessMsg=document.getElementById('ProdFSuccessMsg');
  $scope.enableFeatureErrorMsg=function(){
     $(".spanProdIMGERR").css("display", "none");
     $(".spanProdERR").css("display", "none");
     $(".spanErr").css("display", "none");
     $(".spanProdFERR").css("display", "block");
     $(".alert-danger").removeClass("in").show();
     $(".alert-danger").delay(5000).addClass("in").fadeOut(2000);
  };
  $scope.enableFeatureSuccessMsg=function(){
    $(".spanProdIMGSuccess").css("display", "none");
    $(".spanSuccess").css("display", "none");
    $(".spanProdSuccess").css("display", "none");
    $(".spanProdFSuccess").css("display", "block");
    $(".alert-success").removeClass("in").show();
    $(".alert-success").delay(5000).addClass("in").fadeOut(2000);
  };

  var ProdIMGERRMsg = document.getElementById('ProdIMGERRMsg');
  var ProdIMGSuccessMsg=document.getElementById('ProdIMGSuccessMsg');
  $scope.enableIMGErrorMsg=function(){
     $(".spanProdERR").css("display", "none");
     $(".spanProdFERR").css("display", "none");
     $(".spanErr").css("display", "none");
     $(".spanProdIMGERR").css("display", "block");
     $(".alert-danger").removeClass("in").show();
     $(".alert-danger").delay(5000).addClass("in").fadeOut(2000);
    
  };
  $scope.enableIMGSuccessMsg=function(){
    $(".spanProdSuccess").css("display", "none");
    $(".spanProdFSuccess").css("display", "none");
    $(".spanSuccess").css("display", "none");
    $(".spanProdIMGSuccess").css("display", "block");
    $(".alert-success").removeClass("in").show();
    $(".alert-success").delay(5000).addClass("in").fadeOut(2000);
    
  };

  var ProdERRMsg = document.getElementById('ProdERRMsg');
  var ProdSuccessMsg=document.getElementById('ProdSuccessMsg');
  $scope.enableProductErrorMsg=function(){
     $(".spanProdFERR").css("display", "none");
     $(".spanProdIMGERR").css("display", "none");
     $(".spanErr").css("display", "none");
     $(".spanProdERR").css("display", "block");
     $(".alert-danger").removeClass("in").show();
     $(".alert-danger").delay(5000).addClass("in").fadeOut(2000);
    
  };
  $scope.enableProductSuccessMsg=function(){
    $(".spanProdFSuccess").css("display", "none");
    $(".spanProdIMGSuccess").css("display", "none");
    $(".spanSuccess").css("display", "none");
    $(".spanProdSuccess").css("display", "block");
    $(".alert-success").removeClass("in").show();
    $(".alert-success").delay(5000).addClass("in").fadeOut(2000);
    
  };
}])
 
 angular.module('prodo.ProductApp').filter('startFrom', function () {
  return function (input, start) {
    if (input !== undefined || start !== undefined) {
      start = +start;
      return input.slice(start);
    }
  }
})