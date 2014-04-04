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
angular.module('prodo.ProductApp').controller('ProductController', ['$scope', '$log', '$rootScope', 'ProductService', 'UserSessionService', '$http', 'CommentLoadMoreService', 'ENV', 'TagReffDictionaryService', 'ProductFeatureService', 'growl','$state','productData', function ($scope, $log, $rootScope, ProductService, UserSessionService, $http, CommentLoadMoreService, ENV, TagReffDictionaryService, ProductFeatureService, growl,$state,productData) {
 
      $scope.pimgs = [];

    $scope.$watch('$state.$current.locals.globals.productData', function (productData) {
       $scope.features = [];
    $("#productLogo").attr('src', '');
    var temp = document.getElementById('prodo-comment-container');
      if(productData.success){
        // $log.debug("data ... "+ productData.success.product.prodle+" "+productData.success.product.orgid)
          $scope.tabComment=true;
         $scope.getProduct(productData.success.product.prodle,productData.success.product.orgid);
      }
     });
 
  $scope.productComments = {
    comments: [{}]
  };
   $scope.searchComment = {
    search: ''
  };
  $scope.tabForComment={
    tabComment:'true',
    tabSearch:'false'
  }
  // $scope.searchComment="warranty";
  $scope.newProductComment = [];
  $rootScope.productCommentResponsearray = [];
  $scope.mytags;
  $scope.myFeaturetags;
  $scope.count = 0;
  $scope.commenttextField = {
    userComment: ''
  };
  $scope.pretags = [];
  $scope.featuretags = [];
  $scope.productcommentResponseListener;
  $scope.tagPairs = [];

  //product
  $scope.editStatus;
  $scope.product = {
    product: [{}]
  };
  $scope.newProduct = {
    product: [{}]
  };
  $scope.type = "product";
  $rootScope.product_prodle;
  $rootScope.orgid;
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
  $scope.isCollapsed = true;

  $scope.$state = $state;

  //watch prodle if changed by user by product search or any other source
  $rootScope.$watch('product_prodle', function () {
    // $log.debug("Listening" + $rootScope.product_prodle);
    // growl.addInfoMessage("Getting product details");
    $scope.features = [];
    $("#productLogo").attr('src', '');
    var temp = document.getElementById('prodo-comment-container');
    if ($rootScope.product_prodle !== undefined || $rootScope.product_prodle !== null || $rootScope.product_prodle !== "") {
      $scope.getProduct($rootScope.product_prodle, $rootScope.orgid); //if product available, call getproduct
     
      $scope.tabComment=true;
    } else { //show msg to follow product
      $("#prodo-ProductDetails").css("display", "none");
      $("#ErrMsging").css("display", "block");
      document.getElementById("ErrMsging").innerHTML = "Product not available";
      // growl.addErrorMessage(" You are not following any product , Please start following product....");
    }

  });

  //get login details
  $scope.getUserDetails = function () {
    $scope.userIDFromSession = $rootScope.usersession.currentUser.userid;
    $scope.usernameFromSession = $rootScope.usersession.currentUser.username;
    // $scope.ProductsFollowedFromSession = $rootScope.usersession.currentUser.products_followed;
    $scope.ProductsFollowedFromSession = UserSessionService.productfollowlist
    // $log.debug("Products  f.. "+JSON.stringify( $scope.ProductsFollowedFromSession));
    if ($rootScope.usersession.currentUser.org) {
      $scope.grpnameFromSession = $rootScope.usersession.currentUser.org.grpname;
      $scope.orgidFromSession = $rootScope.usersession.currentUser.org.orgid;
      $scope.orgnameFromSession = $rootScope.usersession.currentUser.org.orgname;
    } else {
      $scope.grpnameFromSession = "";
      $scope.orgnameFromSession = "";
      $scope.orgidFromSession = "";
    }
  }
  $scope.getUserDetails();
  //get login details

   $scope.preGetProductPrepaireData=function(){
     $("#load-more").css("display", "none");
          
    // document.getElementById("prodo-comment-search-Textbox").value="";
    $scope.searchComment.search="";
    $scope.commenttextField.userComment="";
    $scope.tabForComment.tabComment = true;
    $scope.tabForComment.tabSearch=false;
    // $log.debug("search "+$scope.searchComment.search);
   };
   $scope.getProductHandleSuccess=function(l_prodle, l_orgid){
      $("#prodo-ProductDetails").css("display", "block");
        $("productExtraInfo").css("display", "block");
        $("#ErrMsging").css("display", "none");
        $log.debug(productData.success.product);
        $scope.getProductFeatures(l_prodle, l_orgid);

        $("#prodo-ProductFeatureTable").css("display", "table");
        // $("#prodoCommentsTab").css("display", "inline");
        // $("#tabComments").css("display", "inline");
        $scope.product = productData.success.product;
        if (productData.success.product.product_images) {
        $scope.pimgs = productData.success.product.product_images;
        $log.debug("Product images emitting when not null ");
        $scope.$emit('emittingProductImages',$scope.pimgs);
      } else {
        $scope.$emit('emittingNoProductImages',$scope.pimgs);
        $log.debug("Product images emitting when null ");
      }
        // $rootScope.product_prodle = successData.success.product.prodle;
        // if(successData.success.product.product_comments)
        $scope.productComments = productData.success.product.product_comments;
        if(productData.success.product.product_comments!==undefined){
           $("#prodo-comment-media-list").css("display", "block");
        }

        // console.log( $scope.productComments);
        $scope.pImages_l = productData.success.product.product_images;
        $("#prodo-addingProduct").text($scope.product.status);
        $("#loadMoreCommentMsg").css("display", "none");

        //check owner of product
        if ($rootScope.usersession.currentUser.org) {
          if ($rootScope.usersession.currentUser.org.isAdmin == true) {
            if ($scope.orgidFromSession === $scope.currentOrgid) {
              $rootScope.isAdminCheck = true;
            } else $rootScope.isAdminCheck = false;
          }
        }
        //if no comments , dont show load more comments button
        // $("#loadMoreCommentMsg").css("display", "none");
        $log.debug("COmments :   "+productData.success.product.product_comments);
        if((productData.success.product.product_comments==undefined) || (productData.success.product.product_comments==null)||(productData.success.product.product_comments=="")){
              $("#loadMoreCommentMsg").css("display", "none");
        }
        if (productData.success.product.product_comments) {
          if (productData.success.product.product_comments.length > 4) {
            $("#load-more").css("display", "inline");
          } 
          else{
               $("#load-more").css("display", "none");
          }
        } 
   };
    $scope.getProductHandleError=function(error){
    $log.debug(error);
      $("#prodo-ProductDetails").css("display", "none");
      $("#ErrMsging").css("display", "inline");
      document.getElementById("ErrMsging").innerHTML = "Server Error:" + error.status;
    }
  $scope.getProduct = function (l_prodle, l_orgid) {
    $log.debug("Prodle n orgid "+ l_prodle + " "+l_orgid);
    $scope.preGetProductPrepaireData();
 
      if (productData.success == undefined) { //if not product
        $scope.getProductHandleError();
        $("#prodo-ProductDetails").css("display", "none");
        $("#ErrMsging").css("display", "block");
        if (document.getElementById("ErrMsging") !== null) document.getElementById("ErrMsging").innerHTML = "Product not available , please select product....";
        // growl.addErrorMessage(" Product not available....");
      } else {
        $scope.getProductHandleSuccess(l_prodle, l_orgid);
            }
    // },
     if(productData.error) { //if error geting product
      $scope.getProductHandleError(productData.error);
      
      // growl.addErrorMessage( "Server Error:" + error.status);
    };
  $scope.isCollapsed = true;  //added by omkar 
  };
  //get product function declaration  
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
        growl.addErrorMessage("Server Error:" + error.status);
      });
    }
  };
  //get Product features

//show more and less description toggle
    $(".show-more").click(function () {        
        $(".text").toggleClass("show-more-height");
        if(!$(".text").hasClass("show-more-height")){
            $(this).text(" Show Less");
               $(this).removeClass('fa-arrow-down').addClass('fa-arrow-up');

             // $(this).className="fa-arrow-up";
        }else{;
            $(this).text(" Show More");
            $(this).removeClass('fa-arrow-up').addClass('fa-arrow-down');
        }
    });
    $scope.cslcShowMoreLength = function () {
      if ($scope.product.description) {
        if ($scope.product.description.length<130) {
          return {
            display: "none"
          }
        }
    }
    };
 //show more and less description toggle   


  //Follow Product
  $scope.CheckIfAlreadyFollowingProduct = function () {

    var follow;
    // $log.debug("following : "+ JSON.stringify($scope.ProductsFollowedFromSession))
    for (i = 0; i < $scope.ProductsFollowedFromSession.length; i++) {
      if ($scope.ProductsFollowedFromSession[i].prodle == $rootScope.product_prodle) {
        follow = true;
      }
    }
    if (follow == true) {
      return {
        display: "none"
      }

    } else return {
      display: "inline"
    }
  };

  $scope.followCurrentProduct = function () {
    // $log.debug("following");
    $rootScope.usersession.followProduct($rootScope.product_prodle);
  };

  var cleanEventFollowProductDone = $scope.$on('followProductDone', function (event, data) {
    if (data.success) {
        growl.addSuccessMessage("Following product");
        UserSessionService.productfollowlist.unshift($scope.product);
        $("#prodo-followBtn").css("display", "none");
      }
    });

  $scope.$on('$destroy', function(event, message) {
      cleanEventFollowProductDone();
  });

  //Follow Product
  //date format
  $scope.formatDate = function (time) {
    return (moment(time).format('DD MMM YYYY'));
  };
  //date format

  $scope.showFeature=function()
  {
    $scope.isCollapsed = false;
  };
   $scope.hideFeature=function()
  {
    $scope.isCollapsed = true;
  };

}])