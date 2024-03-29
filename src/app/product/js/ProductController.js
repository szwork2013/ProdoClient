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
angular.module('prodo.ProductApp').controller('ProductController', ['$scope', '$log', '$rootScope', 'ProductService', 'UserSessionService', '$http', 'CommentLoadMoreService', 'ENV', 'TagReffDictionaryService', 'ProductFeatureService', '$state','productData','ProductEnquiry','ProductRating','ProductTestimonial', function ($scope, $log, $rootScope, ProductService, UserSessionService, $http, CommentLoadMoreService, ENV, TagReffDictionaryService, ProductFeatureService, $state,productData,ProductEnquiry,ProductRating,ProductTestimonial) {



      $scope.pimgs = [];
    
    // $scope.$watch('$state.$current.locals.globals.productData', function (productData) {
    //  if(productData.error){
    //      $("#prodo-ProductDetails").css("display", "none");
    //   $("#ErrMsging").css("display", "block");
    //   document.getElementById("ErrMsging").innerHTML = "Product not available";
    //  }
    //  else{
    //     $scope.features = [];
    // $("#productLogo").attr('src', '');
    // var temp = document.getElementById('prodo-comment-container');
    //   if(productData.success){
    //     // $log.debug("data ... "+ productData.success.product.prodle+" "+productData.success.product.orgid)
    //       $scope.tabComment=true;
    //      $scope.getProduct(productData.success.product.prodle,productData.success.product.orgid);
    //   }
    //  }
    
    //  });
    
    // $scope.searchBy={
    //   type:['general','category']
    // }


 $scope.featuresRates=[];

 $scope.inquiry="know";
 $scope.searchCommentBy;
 $scope.searchBySelected={
      type:'general'
    }
  $scope.searchfields = {};
  $scope.searchfields = [
    {
      name: 'general',
      value: 'commenttext'
    },
    {
      name: 'commentcategory',
      value: 'commentcategory'
    }
  ];

    $scope.commenttagSelected={
      tag:'general'
    };
    $scope.isCollapsedSearch=1;
   $rootScope.comment_image_l=[];
  $rootScope.file_data ="";
  $rootScope.count=0;
  $scope.productComments = {
    comments: [{}]
  };
   $scope.searchComment = {};
    $scope.search = {};
  $scope.tabForComment={
    tabComment:'true',
    tabSearch:'false',
    tabTesto:'false'
  }



  // $scope.searchComment="warranty";
  $scope.newProductComment = [];
  $rootScope.productCommentResponsearray = [];
  $scope.mytags=[];
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
  $scope.showLoadMore={status:false};


   $scope.preGetProductPrepaireData=function(){
     // $("#load-more").css("display", "none");
     $scope.showLoadMore.status=   false;  
    // document.getElementById("prodo-comment-search-Textbox").value="";
    // $scope.searchComment.search="";
    $scope.commenttextField.userComment="";
    $scope.tabForComment.tabComment = true;
    $scope.tabForComment.tabSearch=false;

    // $log.debug("search "+$scope.searchComment.search);
   };

   $scope.preGetProductPrepaireData();

  //watch prodle if changed by user by product search or any other source
  $rootScope.$watch('product_prodle', function () {
    // $log.debug("Listening" + $rootScope.product_prodle);
  
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
      }

  });

 
$scope.sendEnquiry=function(orgid,prodle,inquiry){
 $scope.EnquiryData={
  subject:'',
  body:''
 } ;
$scope.subjectbody="";

if(inquiry=='know'){
  $scope.EnquiryData.subject="Product Enquiry "+ $scope.product.name;
  $scope.EnquiryData.body="I want to know more about product";
}
else if(inquiry=='buy'){
  $scope.EnquiryData.subject="Product Buy Request "+ $scope.product.name;
  $scope.EnquiryData.body="I want to buy this product";
}
else if(inquiry=='custom'){
  $scope.EnquiryData.subject="custom";
  $scope.EnquiryData.body=$scope.productreqMsg;

}
$log.debug($scope.EnquiryData);

if($scope.EnquiryData.body){
    $scope.AllData={
      productenquirydata:$scope.EnquiryData
    }

          ProductEnquiry.sendEnquiry({
                orgid: orgid,
                prodle: prodle
              }, $scope.AllData, function (success) {
               if(success.success){
                $scope.handleEnquirySuccess(success);
               }
               else{
                 $scope.handleEnquiryError(success.error);
               }
              }, function (error) {
                $log.debug(error);
               $rootScope.ProdoAppMessage("Server Error:" + error.status, 'error');
              });

 }
 else{
   $rootScope.ProdoAppMessage("Please enter enquiry message", 'error');
 }

};

 $scope.handleEnquirySuccess=function(success){
  $log.debug(success.success);

  $rootScope.ProdoAppMessage("Your enquiry request sent successfully", 'success');
 };

$scope.handleEnquiryError=function(error){
  if(error){ 
    if(error.code=='AL001'){
    $rootScope.showModal();
  }
   else{
     $log.debug(error);
    $rootScope.ProdoAppMessage(error.message, 'error');
   }
 }
};



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
            // $("#load-more").css("display", "inline");
            $scope.showLoadMore.status=   true;  
          } 
          else{
               // $("#load-more").css("display", "none");
               $scope.showLoadMore.status=   false;  
          }
        } 
   };
    $scope.getProductHandleError=function(error){
      if(error){ 
        if(error.code=='AL001'){
        $rootScope.showModal();
      }
   
     else{
      $log.debug(error);
      $("#prodo-ProductDetails").css("display", "none");
      $("#ErrMsging").css("display", "inline");
      document.getElementById("ErrMsging").innerHTML =  error.message;
    }
     }
   }



   $scope.getProduct = function (l_prodle, l_orgid) {
    $log.debug("Prodle n orgid "+ l_prodle + " "+l_orgid);
    $scope.preGetProductPrepaireData();
 
      if (productData.success == undefined) { //if not product
        $scope.getProductHandleError();
        $("#prodo-ProductDetails").css("display", "none");
        $("#ErrMsging").css("display", "block");
        if (document.getElementById("ErrMsging") !== null) document.getElementById("ErrMsging").innerHTML = "Product not available , please select product....";
       
      } else {
        $scope.getProductHandleSuccess(l_prodle, l_orgid);
            }
    // },
     if(productData.error) { //if error geting product
      $scope.getProductHandleError(productData.error);
     };
  $scope.isCollapsed = true;  //added by omkar 
  };
  //get product function declaration  
  //get Product features
  $scope.features = [];
  $scope.PFeatures = [];
 $scope.handleGetProductFeaturesError=function(error){
   if(error.code=='AL001'){
        $rootScope.showModal();
      }else{
    
      }
 };
  $scope.handleGetProductFeaturesSuccess=function(successData){
       // $log.debug("success    "+JSON.stringify(successData));
    $scope.features = [];
    $scope.featuretags = [];
    for (i = 0; i < successData.success.productfeature.length; i++) {
      $scope.features.push(successData.success.productfeature[i]);
      $scope.PFeatures.push(successData.success.productfeature[i]);
      $scope.featuretags.push(successData.success.productfeature[i].featurename);

    }
  };

  $scope.getProductFeatures = function (prodle, orgid) {
    if (prodle !== "") {
      ProductFeatureService.getFeature({
        orgid: orgid,
        prodle: prodle
      }, function (successData) {
        if (successData.success == undefined) {
         $scope.handleGetProductFeaturesError(successData.error);
       } else {
          $scope.handleGetProductFeaturesSuccess(successData);
        }
      }, function (error) {
        $rootScope.ProdoAppMessage("Server Error:" + error.status, 'error');
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
        $rootScope.ProdoAppMessage("You can start your product conversation", 'success');
        UserSessionService.productfollowlist.unshift($scope.product);
        $("#prodo-followBtn").css("display", "none");
      }
      else{
        if(data.error){
          if(data.error.code=='AL001'){
            $rootScope.showModal();
          }
        }
      }
    });

  $scope.recommendCurrentProduct = function (prodle) {
       ProductRating.recommend_product.recommendProduct({
           prodle: prodle,
        }, function (success) {
         if(success.success){
          $log.debug(success.success);
          $rootScope.ProdoAppMessage(success.success.message, 'success');
         }
         else{
           $log.debug(success.error);
           $rootScope.ProdoAppMessage(success.error.message, 'error');
         }
        }, function (error) {
          $log.debug(error);
         $rootScope.ProdoAppMessage("Server Error:" + error.status, 'error');
        });



  };









  $scope.$on('$destroy', function(event, message) {
      cleanEventFollowProductDone();
  });

  //Follow Product
  //date format
  $scope.formatDate = function (time) {
    return (moment(time).format('DD MMM YYYY'));
  };
  //date format

$scope.showSearchCategories=function(){
$scope.isCollapsedSearch=0;
};

$scope.hideSearchCategories=function(){
$scope.isCollapsedSearch=1;
};



}])