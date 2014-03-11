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
angular.module('prodo.ProductApp').controller('ProductController', ['$scope', '$log', '$rootScope', 'ProductService', 'UserSessionService', '$http', 'CommentLoadMoreService', 'ENV', 'TagReffDictionaryService', 'ProductFeatureService', 'growl', function ($scope, $log, $rootScope, ProductService, UserSessionService, $http, CommentLoadMoreService, ENV, TagReffDictionaryService, ProductFeatureService, growl) {
 
  
  $scope.productComments = {
    comments: [{}]
  };
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
  //watch prodle if changed by user by product search or any other source
  $rootScope.$watch('product_prodle', function () {
    // $log.debug("Listening" + $rootScope.product_prodle);
    // growl.addInfoMessage("Getting product details");
    $scope.features = [];
    $("#productLogo").attr('src', '');
    var temp = document.getElementById('prodo-comment-container');
    if ($rootScope.product_prodle !== undefined && $rootScope.product_prodle !== null && $rootScope.product_prodle !== "") {
      $scope.getProduct($rootScope.product_prodle, $rootScope.orgid); //if product available, call getproduct
    } else { //show msg to follow product
      $("#prodo-ProductDetails").css("display", "none");
      $("#ErrMsging").css("display", "block");
      document.getElementById("ErrMsging").innerHTML = "Product not available";
      // growl.addErrorMessage(" You are not following any product , Please start following product....");
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
  $scope.getProduct = function (l_prodle, l_orgid) {
    $log.debug("1 prodle " + l_prodle + "orgid " + l_orgid);
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
        $("#prodo-ProductDetails").css("display", "block");
        $("productExtraInfo").css("display", "block");
        $("#ErrMsging").css("display", "none");
        // $log.debug(successData.success.product);
        $scope.getProductFeatures(l_prodle, l_orgid);

        $("#prodo-ProductFeatureTable").css("display", "table");
        // $("#prodoCommentsTab").css("display", "inline");
        // $("#tabComments").css("display", "inline");
        $scope.product = successData.success.product;
        // $rootScope.product_prodle = successData.success.product.prodle;
        // if(successData.success.product.product_comments)
        $scope.productComments = successData.success.product.product_comments;
        // console.log( $scope.productComments);
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
        //if no comments , dont show load more comments button
        // $("#loadMoreCommentMsg").css("display", "none");
        $log.debug("COmments :   "+successData.success.product.product_comments);
        // if((successData.success.product.product_comments==undefined) || (successData.success.product.product_comments==null)||(successData.success.product.product_comments=="")){
        //       $("#loadMoreCommentMsg").css("display", "none");
        // }
        // if (successData.success.product.product_comments) {
        //   if (successData.success.product.product_comments.length > 4) {
        //     $("#load-more").css("display", "inline");
        //   } 
        // } 
        
      }
    }, function (error) { //if error geting product
      $log.debug(error);
      $("#prodo-ProductDetails").css("display", "none");
      $("#ErrMsging").css("display", "inline");
      document.getElementById("ErrMsging").innerHTML = "Server Error:" + error.status;
      // growl.addErrorMessage( "Server Error:" + error.status);
    });
$scope.isCollapsed = true;
  }
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
  console.log("featuretags-------------------"+JSON.stringify($scope.PFeatures));
  //get Product features
  //Product Description height toggle
  $scope.ShowDescription = function () {

    if (document.getElementById('prodo-description').style.height === "15px") $("#prodo-description").css("height", "");
    else $("#prodo-description").css("height", "15px");
  };

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
        growl.addSuccessMessage("Follwing product");
        UserSessionService.productfollowlist.push($scope.product);
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
  $scope.viewFeatures=function()
  {
     alert("hello");
  };
  $scope.addFeatureToComment=function(data)
  {
    document.getElementById('prodo-comment-Textbox').value=document.getElementById('prodo-comment-Textbox').value+" "+data+" ";
  };
  
  $scope.showFeature=function()
  {
             $scope.isCollapsed = false;
  };
   $scope.hideFeature=function()
  {
             $scope.isCollapsed = true;
  };
}])