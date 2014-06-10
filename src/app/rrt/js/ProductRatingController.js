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
angular.module('prodo.ProductApp').controller('ProductRatingController', ['$scope', '$log', '$rootScope', 'ProductService', 'UserSessionService', '$http', 'CommentLoadMoreService', 'ENV', 'TagReffDictionaryService', 'ProductFeatureService', '$state','productData','ProductEnquiry','ProductRating','ProductTestimonial', function ($scope, $log, $rootScope, ProductService, UserSessionService, $http, CommentLoadMoreService, ENV, TagReffDictionaryService, ProductFeatureService, $state,productData,ProductEnquiry,ProductRating,ProductTestimonial) {


    $scope.tabForRating={
    tabOverallRating:'true',
    tabCaptureRating:'false'
  };

  $rootScope.product_prodle;
  $rootScope.orgid;
 
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


  $scope.$state = $state;

$scope.featuresRates=[];
$scope.newRating=[];
$scope.myProductFeatureRating=[];
$scope.overallProductFeatureRating=[];
$scope.combineRating=[];



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


        $scope.getProductFeatures($rootScope.product_prodle,$rootScope.orgid);
        $scope.getMyProductFeatureRating($rootScope.product_prodle);
        $scope.getOverallProductFeatureRating($rootScope.product_prodle);





}])