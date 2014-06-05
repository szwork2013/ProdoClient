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

$scope.tabForTesti={};

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

    $scope.tabForRating={
    tabOverallRating:'true',
    tabCaptureRating:'false'
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
$scope.testimonial={};
$scope.featuresRates=[];
$scope.newRating=[];
$scope.myProductFeatureRating=[];
$scope.overallProductFeatureRating=[];
$scope.combineRating=[];
$scope.showLoadMore={status:false};
$scope.allTestimonials=[];
    $scope.testimonialError={}
   $scope.preGetProductPrepaireData=function(){
     // $("#load-more").css("display", "none");
     $scope.showLoadMore.status=   false;  
    // document.getElementById("prodo-comment-search-Textbox").value="";
    // $scope.searchComment.search="";
    $scope.commenttextField.userComment="";
    $scope.tabForComment.tabComment = true;
    $scope.tabForComment.tabSearch=false;
    $scope.featuresRates=[];
    $scope.newRating=[];
    $scope.myProductFeatureRating=[];
    $scope.overallProductFeatureRating=[];
    $scope.combineRating=[];
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

  $scope.fromNowTestimonial = function (time) {
    if (time != undefined) {
      return moment(time).calendar();
    }
  };

$scope.sendTestimonial=function(orgid,prodle,testimonial){
$scope.testimonialData={
  testimonialdata:{"text":testimonial.testimonial,displayname:testimonial.name}
};
  if($scope.productTestiForm.$invalid){
          $scope.productTestiForm.submitted=true;
           $rootScope.ProdoAppMessage(" Please enter testimonial data", 'error');
    }
  else{
  if(testimonial.testimonial==""){
        $rootScope.ProdoAppMessage(" Please enter testimonial text", 'error');
    }
    else if(testimonial.testimonial.length>1000){
      $rootScope.ProdoAppMessage("Testimonial can not be more than 1000 characters", 'error');
    
    }
 
    else{
   
    $scope.productTestiForm.$setPristine();
    ProductTestimonial.send_Testimonial.sendTestimonial({
                orgid: orgid,
                prodle: prodle
              }, $scope.testimonialData, function (success) {
               if(success.success){
                $scope.handleTestimonialSuccess(success);
               }
               else{
                 $scope.handleTestimonialError(success.error);
               }
              }, function (error) {
                $log.debug(error);
               $rootScope.ProdoAppMessage("Server Error:" + error.status, 'error');
              });

   }
  }
}

 $scope.handleTestimonialSuccess=function(success){
  $log.debug(success.success);
   $scope.testimonial="";
  $rootScope.ProdoAppMessage("Your Testimonial added successfully", 'success');
   $( "#btn-slideTesti").click();
 };

$scope.handleTestimonialError=function(error){
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

$scope.getTestimonials=function(prodle){
     ProductTestimonial.get_Testimonials.getTestimonials({
        prodle: prodle
      }, function (successData) {
        if (successData.success == undefined) {
         $scope.handlegetTestimonialsError(successData.error);
       } else {
          $scope.handlegetTestimonialsSuccess(successData);
        }
      }, function (error) {
        $rootScope.ProdoAppMessage("Server Error:" + error.status, 'error');
      });

}

 $scope.handlegetTestimonialsError=function(error){
   if(error.code=='AL001'){
        $rootScope.showModal();
      }else{
        $log.debug(error);
        // $rootScope.ProdoAppMessage(error.message, 'error');
      }
 };
  $scope.handlegetTestimonialsSuccess=function(successData){
      if(successData.success){
           $scope.allTestimonials=successData.success.testimonials;
           $log.debug($scope.allTestimonials);
      }
  };



$scope.sendEnquiry=function(orgid,prodle,inquiry){
 $scope.EnquiryData={
  subject:'',
  body:''
 } ;
$scope.subjectbody="";

if(inquiry=='know'){
  $scope.EnquiryData.subject="know";
  $scope.EnquiryData.body="I want to know more about product";
}
else if(inquiry=='buy'){
  $scope.EnquiryData.subject="buy";
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


$scope.getSelectedRates=function(value){
for(i=0;i<$scope.featuresRates.length;i++){
  if($scope.featuresRates[i].featurename==value.featurename){
   $scope.featuresRates[i].rated=true;
  }
}

};

$scope.sendRating=function(orgid,prodle,featuresRates){
 
  $scope.newRating_l=[];
  for(i=0;i<$scope.featuresRates.length;i++){
    if($scope.featuresRates[i].rated==true){
       $scope.newRating_l.push({featurename: featuresRates[i].featurename , featurerates: featuresRates[i].featurerates});
      }
    }
 $log.debug($scope.newRating_l);
  $scope.AllData={
      featureratedata:$scope.newRating_l
    }
  // $rootScope.ProdoAppMessage("Thank you for rating our product features...", 'success');
          ProductRating.add_Rating.addRating({
                 prodle: prodle,
              }, $scope.AllData, function (success) {
               if(success.success){
                $scope.handleRatingSuccess(success);
               }
               else{
                 $scope.handleRatingError(success.error);
               }
              }, function (error) {
                $log.debug(error);
               $rootScope.ProdoAppMessage("Server Error:" + error.status, 'error');
              });



};

 $scope.handleRatingSuccess=function(success){
  $scope.getLatestDataAfterRating($scope.product.prodle,$scope.product.orgid);
  $scope.tabForRating.tabOverallRating = true; 
  $scope.tabForRating.tabCaptureRating=false; 


  $log.debug(success);
  $rootScope.ProdoAppMessage("Your Rating request sent successfully", 'success');
 };

$scope.handleRatingError=function(error){
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




 $scope.$watch('tabForComment.tabTesto', function () {
   if($scope.tabForComment.tabTesto==true){
      $("#prodo-CommentLoadMoreContainer").css("display", "none");
   }
   else{
      $("#prodo-CommentLoadMoreContainer").css("display", "block");
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


   $scope.getProductHandleSuccess=function(l_prodle, l_orgid){
      $("#prodo-ProductDetails").css("display", "block");
        $("productExtraInfo").css("display", "block");
        $("#ErrMsging").css("display", "none");
        $log.debug(productData.success.product);
        $scope.getProductFeatures(l_prodle, l_orgid);
        $scope.getMyProductFeatureRating(l_prodle);
        $scope.getOverallProductFeatureRating(l_prodle);
        $scope.getTestimonials(l_prodle);
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
      $scope.featuresRates.push({featurename:successData.success.productfeature[i].featurename,
                                 featurerates:0 ,rated:false});
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

$(document).ready(function(){

 // $(".example-a").barrating();

 $(".btn-slideTesti").click(function(){
    var hidden = $("#panelTesti").is(":hidden");
    $("#panelTesti").slideToggle("slow");
    $(this).toggleClass("active"); 
   if(hidden){
      $('#prodoBtnTesti').css('backgroundColor', '#BF8618');
      $('#prodoBtnTesti').css('borderColor', '#BF8618');
     }
    else{
       $('#prodoBtnTesti').css('backgroundColor', '#3276b1');
       $('#prodoBtnTesti').css('borderColor', '#3276b1');
    }
    return false;
  });


 $(".btn-slide").click(function(){
    var hidden = $("#panel").is(":hidden");
    $("#panel").slideToggle("slow");
    $(this).toggleClass("active"); 
   if(hidden){
      $('#prodoBtnEnquiry').css('backgroundColor', '#BF8618');
      $('#prodoBtnEnquiry').css('borderColor', '#BF8618');
     }
    else{
       $('#prodoBtnEnquiry').css('backgroundColor', '#3276b1');
       $('#prodoBtnEnquiry').css('borderColor', '#3276b1');
    }
    return false;
  });

  $(".btn-slideRating").click(function(){
    var hidden = $("#panelRating").is(":hidden");
    $("#panelRating").slideToggle("slow");
    $(this).toggleClass("active"); 
   if(hidden){
      $('#prodoBtnRating').css('backgroundColor', '#BF8618');
      $('#prodoBtnRating').css('borderColor', '#BF8618');
     }
    else{
       $('#prodoBtnRating').css('backgroundColor', '#3276b1');
       $('#prodoBtnRating').css('borderColor', '#3276b1');
    }
    return false;
  });


   
});
$scope.getMyProductFeatureRating=function(prodle){
     ProductRating.get_MyProductFeatureRating.getMyProductFeatureRating({
        prodle: prodle
      }, function (successData) {
        if (successData.success == undefined) {
         $scope.handleGetMyProductFeatureRatingError(successData.error);
       } else {
          $scope.handleGetMyProductFeatureRatingSuccess(successData);
        }
      }, function (error) {
        $rootScope.ProdoAppMessage("Server Error:" + error.status, 'error');
      });

}

 $scope.handleGetMyProductFeatureRatingError=function(error){
   if(error.code=='AL001'){
        $rootScope.showModal();
      }else{
        $log.debug(error);
        $rootScope.ProdoAppMessage(error.message, 'error');
      }
 };
  $scope.handleGetMyProductFeatureRatingSuccess=function(successData){
      if(successData.success){
        for(var i=0; i<successData.success.myproductfeaturerating.length;i++){
            $scope.myProductFeatureRating.push(
              {featurename:successData.success.myproductfeaturerating[i].featurename,
                featurerates:successData.success.myproductfeaturerating[i].featurerates});
               // if(successData.success.myproductfeaturerating[i].featurerates==null){
               //    $scope.featuresRates.push({featurename:successData.success.myproductfeaturerating[i].featurename,
               //                   featurerates:0 ,rated:false});
               // }
               // else{
               //   $scope.featuresRates.push({featurename:successData.success.myproductfeaturerating[i].featurename,
               //                   featurerates:successData.success.myproductfeaturerating[i].featurerates ,rated:false});
               // }
             
        }
      }
      // $log.debug($scope.myProductFeatureRating);
      


  };

  $scope.getOverallProductFeatureRating=function(prodle){
     ProductRating.get_OverallProductFeatureRating.getOverallProductFeatureRating({
        prodle: prodle
      }, function (successData) {
        if (successData.success == undefined) {
         $scope.handleGetOverallProductFeatureRatingError(successData.error);
       } else {
          $scope.handleGetOverallProductFeatureRatingSuccess(successData);
        }
      }, function (error) {
        $rootScope.ProdoAppMessage("Server Error:" + error.status, 'error');
      });

}

 $scope.handleGetOverallProductFeatureRatingError=function(error){
   if(error.code=='AL001'){
        $rootScope.showModal();
      }else{
        $log.debug(error);
        $rootScope.ProdoAppMessage(error.message, 'error');
      }
 };
  $scope.handleGetOverallProductFeatureRatingSuccess=function(successData){
      if(successData.success){
        for(var i=0; i<successData.success.overallproductfeaturerating.length;i++){
            $scope.overallProductFeatureRating.push(successData.success.overallproductfeaturerating[i]);
             
        }
      }
      // $log.debug($scope.overallProductFeatureRating);
      $scope.combineRatings($scope.myProductFeatureRating,successData.success.overallproductfeaturerating);
     

  };


// 
 $scope.combineRatings=function(myProductFeatureRating, overallProductFeatureRating){
  var i; var j;
  for( i=0;  i<myProductFeatureRating.length; i++  ) {
    
    if(overallProductFeatureRating[i].featurename == myProductFeatureRating[i].featurename){
     if(overallProductFeatureRating[i].ratecount==0){

          $scope.combineRating.push ({
         featurename:myProductFeatureRating[i].featurename,
         featurerates:myProductFeatureRating[i].featurerates,
         featureoverall:null,
         featureUserCount:overallProductFeatureRating[i].usercount
        
        });
     }
     else{

         $scope.combineRating.push ({
         featurename:myProductFeatureRating[i].featurename,
         featurerates:myProductFeatureRating[i].featurerates,
         featureoverall:(overallProductFeatureRating[i].ratecount/overallProductFeatureRating[i].usercount),
         featureUserCount:overallProductFeatureRating[i].usercount
        
        });
    }
   }

  }
  $log.debug(myProductFeatureRating);
  $log.debug(overallProductFeatureRating);
  $log.debug($scope.combineRating);
};

$scope.getLatestDataAfterRating=function(l_prodle,l_orgid){
   $scope.featuresRates=[];
    $scope.newRating=[];
    $scope.myProductFeatureRating=[];
    $scope.overallProductFeatureRating=[];
    $scope.combineRating=[];
    $scope.getProductFeatures(l_prodle, l_orgid);
    $scope.getMyProductFeatureRating(l_prodle);
    $scope.getOverallProductFeatureRating(l_prodle);

};

}])