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
angular.module('prodo.ProductApp').controller('ProductTestimonialController', ['$scope', '$log', '$rootScope', 'ProductService', 'UserSessionService', '$http', 'CommentLoadMoreService', 'ENV', 'TagReffDictionaryService', 'ProductFeatureService', '$state','productData','ProductEnquiry','ProductRating','ProductTestimonial', function ($scope, $log, $rootScope, ProductService, UserSessionService, $http, CommentLoadMoreService, ENV, TagReffDictionaryService, ProductFeatureService, $state,productData,ProductEnquiry,ProductRating,ProductTestimonial) {

$scope.tabForTesti={};



$scope.testimonial={};

$scope.allTestimonials=[];
    $scope.testimonialError={}

     $scope.fromNowTestimonial = function (time) {
    if (time != undefined) {
      return moment(time).calendar();
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
$scope.getTestimonials($rootScope.product_prodle);
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
   $scope.getTestimonials($rootScope.product_prodle);
   $scope.tabForTesti.tabAllTesti = true; 
   $scope.tabForTesti.tabCaptureTesti=false;

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




}])