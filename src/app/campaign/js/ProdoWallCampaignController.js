angular.module('prodo.CampaignApp')
 .controller('ProdoWallCampaignController', ['$scope', '$rootScope', '$state', '$http', '$timeout', '$log',  'checkIfSessionExist','campaignWalldata','CampaignWallService' ,'ProductFeatureService','UserSessionService', function($scope, $rootScope, $state, $http, $timeout, $log,  checkIfSessionExist,campaignWalldata,CampaignWallService,ProductFeatureService,UserSessionService) {
   // console.log('campaign controller initializing..');
   // $log.debug( campaignWalldata.success);
    $scope.$state = $state;
  $scope.searchCommentBy;
 $scope.searchBySelected={
      type:'general'
    }
  $scope.searchfields = {};
  $scope.searchfields = [
    {
      name: 'general',
      value: 'commenttext'
    }
  ];

    $scope.commenttagSelected={
      tag:'general'
    };

  $scope.productComments = {
    comments: [{}]
  };

  $scope.tabForComment={
    tabComment:'true',
    tabSearch:'false'
  };
  $scope.isCollapsed = true;
  $scope.type="campaign";
  $rootScope.campaignidWall;
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

   $scope.campaign={};
   $scope.ErrMsging=0;   
   $scope.pimgs=[];  

  $rootScope.comment_image_l=[];
  $rootScope.file_data ="";
  $rootScope.count=0;

  $scope.features=[];
  $scope.featuretags=[];
  $scope.showLoadMore={status:false};


   if($rootScope.campaign_idwall !== "" || $rootScope.campaign_idwall !== undefined){
       $scope.$watch('$state.$current.locals.globals.campaignWalldata', function (campaignWalldata) {
       if(campaignWalldata.error){
            $scope.handleGetCampaignResolveError(campaignWalldata);
       }
       else{
          $scope.handleGetCampaignResolveSuccess(campaignWalldata);
        }
   });
   }




   $scope.preGetProductPrepaireData=function(){
     // $("#load-more").css("display", "none");
      $scope.showLoadMore.status=false; 
	    $scope.searchfields.general='';
	    $scope.commenttextField.userComment="";
	    $scope.tabForComment.tabComment = true;
	    $scope.tabForComment.tabSearch=false;
   };
    
   $scope.handleGetCampaignResolveError=function(campaignWalldata){
	  $("#prodo-ProductDetails").css("display", "none");
	  $scope.ErrMsging=1; 
      document.getElementById("ErrMsging").innerHTML = campaignWalldata.error.message;
   }
    $scope.handleGetCampaignResolveSuccess=function(campaignWalldata){
      $scope.preGetProductPrepaireData();
	      if(campaignWalldata.success){
	        // $log.debug( campaignWalldata.success);
	        $("#prodo-ProductDetails").css("display", "block");
          $scope.getProductFeatures($rootScope.product_prodle,$rootScope.orgid);
	        $scope.allCampaignData=campaignWalldata.success.Product_Campaigns;
          if($rootScope.campaignidWall){
             $scope.getCampaign($rootScope.campaignidWall);
          }
          else{
              console.log('watch' + $rootScope.campaign_idwall);
             $scope.getCampaign($scope.allCampaignData[0].campaign_id);
          }
        
          // if ( $scope.allCampaignData[0].artwork.length!==0) {
          //   $scope.pimgs =  $scope.allCampaignData[0].artwork;
          //   $log.debug("Product images emitting when not null ");
          //   $scope.$emit('emitting1CampaignImages',$scope.pimgs);
          // } else {
          //   $scope.$emit('emitting1NoCampaignImages',$scope.pimgs);
          //   $log.debug("Product images emitting when null ");
          // }

	       //  $scope.campaign=$scope.allCampaignData[0];
        //   $rootScope.campaignidWall=$scope.campaign.campaign_id;
        //   if($scope.campaign.campaign_tags){
        //     for (i = 0; i < $scope.campaign.campaign_tags.length; i++) {
        //       $scope.features.push($scope.campaign.campaign_tags[i]);
        //        $scope.featuretags.push($scope.campaign.campaign_tags[i].featurename);
        //     }
        //  }
        
        //   $log.debug("assigned campaignid"+$rootScope.campaignidWall);
        //   if($scope.campaign.campaign_comments){
        //      $scope.productComments=$scope.campaign.campaign_comments;
        //   }
           
	       //   if ( $scope.campaign.artwork.length!==0) {
		      //   $scope.pimgs =  $scope.campaign.artwork;
		      //   $log.debug("Product images emitting when not null ");
		      //   $scope.$emit('emittingCampaignImages',$scope.pimgs);
		      // } else {
		      //   $scope.$emit('emittingNoCampaignImages',$scope.pimgs);
		      //   $log.debug("Product images emitting when null ");
		      // }

		      //  if ($scope.campaign.campaign_comments!==undefined){   //########check comments source 
		      //      $("#prodo-comment-media-list").css("display", "block");
		      //  }
        //        $("#loadMoreCommentMsg").css("display", "none");

        //    if ( $scope.campaign.campaign_comments) {   //##### check comment source
		      //     if ( $scope.campaign.campaign_comments.length > 4) {
		      //      // $("#load-more").css("display", "inline");
           // $scope.showLoadMore.status=true; 
		      //     } 
		      //     else{
		            // //$("#load-more").css("display", "none");
           // $scope.showLoadMore.status=false; 
		      //     }
		      //   } 

		      //    $scope.isCollapsed = true;  //added by omkar 

			}
    };
   

if($rootScope.campaign_idwall ){
   $rootScope.$watch('campaign_idwall', function (campaign_idwall) {
      console.log('firstwatch' + campaign_idwall);
      $scope.getCampaign(campaign_idwall);
      $rootScope.campaign_idwall="";

   });
 }


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
    // $scope.features= JSON.stringify($scope.features);
    // $log.debug("pf  "+ $scope.featuretags);
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
  //get Product features

	 $scope.getSelectedCampaign=function(campaignid){
	 	$scope.getCampaign(campaignid);
	 };

   $scope.getCampaign=function(campaignid){
   $scope.preGetProductPrepaireData();
     CampaignWallService.get_ProductCampaign.getProductCampaign( {
	     	 prodle: $rootScope.product_prodle,
	         campaign_id: campaignid
      }, function (successData) {
      if (successData.success == undefined) { //if not product
       	  $scope.handleGetCampaignError(successData.error);
      } else {
        	$scope.handleGetCampaignSuccess(successData); 
      }
      }, function (error) { //if error geting product
	      $log.debug(error);
	      $("#prodo-ProductDetails").css("display", "none");
	      // $("#ErrMsging").css("display", "inline");
	      $scope.ErrMsging=1;
	      document.getElementById("ErrMsging").innerHTML = "Server Error:" + error.status;
     
    });
   }

 $scope.handleGetCampaignError=function(error){
  //error code check here
    if(error.code=='AL001'){
      $rootScope.showModal();
    }
    else{
     $log.debug("Get Campaign- "+error.message);
     $("#prodo-ProductDetails").css("display", "none");
     // $("#ErrMsging").css("display", "block");
     $scope.ErrMsging=1;
     document.getElementById("ErrMsging").innerHTML = error.message;
   }     
 };

$scope.handleGetCampaignSuccess=function(successData){

  // $state.reload();

     if(successData.success.Product_Campaign){
   $scope.preGetProductPrepaireData();
   $scope.campaign=successData.success.Product_Campaign;
  // console.log( $scope.campaign);
   $rootScope.campaignidWall=$scope.campaign.campaign_id;
 $scope.ErrMsging=0;
     $log.debug( $scope.campaign);
     $("#prodo-ProductDetails").css("display", "block");
     $scope.getProductFeatures($rootScope.product_prodle,$rootScope.orgid);
     if($scope.campaign.campaign_comments){
        $scope.productComments=$scope.campaign.campaign_comments;
     }
     if ( $scope.campaign.artwork.length!==0) {
        // $scope.pimgs =  $scope.campaign.artwork;
        $rootScope.images=$scope.campaign.artwork;
        // $log.debug("Product images emitting when not null ");
        // $scope.$emit('emittingCampaignImages',$scope.pimgs);
    } else {
        // $scope.$emit('emittingNoCampaignImages',$scope.pimgs);
        // $log.debug("Product images emitting when null ");
        $rootScope.images="";

    }
     if ($scope.campaign.campaign_comments!==undefined){   
         $("#prodo-comment-media-list").css("display", "block");
     }
        $("#loadMoreCommentMsg").css("display", "none");
        if ( $scope.campaign.campaign_comments) {  
          if ( $scope.campaign.campaign_comments.length > 4) {
            // $("#load-more").css("display", "inline");
             $scope.showLoadMore.status=true; 
          } 
          else{
               // $("#load-more").css("display", "none");
                $scope.showLoadMore.status=false; 
          }
      } 
       $scope.isCollapsed = true;  //added by omkar 
      }

      // $rootScope.campaignidWall='';

};



$scope.CheckIfAlreadyFollowingCampaign=function(){
  var follow;
  if($rootScope.usersession.currentUser){
  if($rootScope.usersession.currentUser.campaign_followed){
  
   
      for (i = 0; i < $rootScope.usersession.currentUser.campaign_followed.length; i++) {
      if ($rootScope.usersession.currentUser.campaign_followed[i].campaign_id == $rootScope.campaignidWall) {
        follow = true;
      }
    }
    if (follow == true) {
      return {
        display: "none"
      }
    } else {
       return {
      display: "inline"
     }
    }
   }
     else {
       return {
      display: "inline"
     }
    }

  }
  else {
       return {
      display: "inline"
     }
    }

};

$scope.followCurrentCampaign=function(campaignid){
$log.debug(campaignid);
CampaignWallService.follow.followCampaign( {
        campaign_id: campaignid
      }, function (successData) {
      if (successData.success == undefined) { //if not product
          $scope.handleFollowCampaignError(successData.error);
      } else {
          $scope.handleFollowCampaignSuccess(successData); 
      }
      }, function (error) { //if error geting product
        $log.debug(error);
       $rootScope.ProdoAppMessage("Server Error:" + error.status, 'error');
     
    });



};

 $scope.handleFollowCampaignError=function(error){
  //error code check here
  $log.debug(error);
    if(error.code=='AL001'){
      $rootScope.showModal();
    }
    else{
      $rootScope.ProdoAppMessage(error.message, 'error');
   }     
 };

  $scope.handleFollowCampaignSuccess=function(successData){
    $log.debug(successData);
   if(successData.success){
    $rootScope.ProdoAppMessage("You are following this campaign", 'success');
     $rootScope.usersession.currentUser.campaign_followed.push({
      orgid:$scope.campaign.orgid,
      prodle:$scope.campaign.prodle,
      campaign_id:$rootScope.campaignidWall
      });
        $("#prodo-followBtncampaign").css("display", "none");
  }
};



  //Product List pagination
  $scope.currentPage = 0;
  $scope.pageSize = 4;
  $scope.numberOfPages = function () {
    return Math.ceil($scope.allCampaignData.length / $scope.pageSize);
  };
  //Product List pagination



}])
 angular.module('prodo.CampaignApp').filter('startFrom', function () {
  return function (input, start) {
    // if(campaignWalldata.success.Product_Campaigns){
        if ((input !== undefined) || (start !== undefined)) {
          if(input){
             start = +start;
            return input.slice(start);
          }
      }
    // }
  
  }
})
