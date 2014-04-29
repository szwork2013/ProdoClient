angular.module('prodo.CampaignApp')
 .controller('ProdoWallCampaignController', ['$scope', '$rootScope', '$state', '$http', '$timeout', '$log',  'checkIfSessionExist','campaignWalldata','CampaignWallService' ,'ProductFeatureService','UserSessionService', function($scope, $rootScope, $state, $http, $timeout, $log,  checkIfSessionExist,campaignWalldata,CampaignWallService,ProductFeatureService,UserSessionService) {
   // console.log('campaign controller initializing..');
   $log.debug( campaignWalldata.success);
     $scope.productComments = {
    comments: [{}]
  };
   $scope.searchComment = {
    search: ''
  };
  $scope.tabForComment={
    tabComment:'true',
    tabSearch:'false'
  };
  $scope.isCollapsed = true;
  $scope.type="campaign";
  $rootScope.campaignidWall;
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

   $scope.campaign={};
   $scope.ErrMsging=0;   
   $scope.pimgs=[];  
   // $scope.productComments=[];
   $scope.$watch('$state.$current.locals.globals.campaignWalldata', function (campaignWalldata) {
	     if(campaignWalldata.error){
            $scope.handleGetCampaignResolveError(campaignWalldata);
	     }
	     else{
	        $scope.handleGetCampaignResolveSuccess(campaignWalldata);
	      }
   });

   $scope.preGetProductPrepaireData=function(){
	    $("#load-more").css("display", "none");
	    $scope.searchComment.search="";
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
	        $log.debug( campaignWalldata.success);
	        $("#prodo-ProductDetails").css("display", "block");
	        $scope.allCampaignData=campaignWalldata.success.Product_Campaigns;
	        $scope.campaign=$scope.allCampaignData[0];
          // $rootScope.campaignidWall=$scope.campaign.campaign_id;
          $log.debug("assigned campaignid"+$rootScope.campaignidWall);
            $scope.productComments=[
                {
					commentid: "332b-51f6-1398257909539",
					commenttext: "test",
					datecreated: "2014-04-23T13:02:28.796Z",
					status: "active",
					user: {
						grpname: "admin",
						orgname: "Shree Softwares and services",
						profilepic: "https://s3-ap-southeast-1.amazonaws.com/prodonus/dev/user/ue1R0Wwc3j/ue1R0Wwc3j615.jpg?AWSAccessKeyId=AKIAJOGXRBMWHVXPSC7Q&Expires=1429344419&Signature=HbF8kHbwF10r4JGJrffCeuyUxzs%3D",
						userid: "ue1R0Wwc3j",
						username: "shree"	
				    }
				},
				       {
					commentid: "332b-51f6-1398257909539",
					commenttext: "test",
					datecreated: "2014-04-23T13:02:28.796Z",
					status: "active",
					user: {
						grpname: "admin",
						orgname: "Shree Softwares and services",
						profilepic: "https://s3-ap-southeast-1.amazonaws.com/prodonus/dev/user/ue1R0Wwc3j/ue1R0Wwc3j615.jpg?AWSAccessKeyId=AKIAJOGXRBMWHVXPSC7Q&Expires=1429344419&Signature=HbF8kHbwF10r4JGJrffCeuyUxzs%3D",
						userid: "ue1R0Wwc3j",
						username: "shree"	
				    }
				},
				       {
					commentid: "332b-51f6-1398257909539",
					commenttext: "test",
					datecreated: "2014-04-23T13:02:28.796Z",
					status: "active",
					user: {
						grpname: "admin",
						orgname: "Shree Softwares and services",
						profilepic: "https://s3-ap-southeast-1.amazonaws.com/prodonus/dev/user/ue1R0Wwc3j/ue1R0Wwc3j615.jpg?AWSAccessKeyId=AKIAJOGXRBMWHVXPSC7Q&Expires=1429344419&Signature=HbF8kHbwF10r4JGJrffCeuyUxzs%3D",
						userid: "ue1R0Wwc3j",
						username: "shree"	
				    }
				}

				];

	         if ( $scope.campaign.artwork.length!==0) {
		        $scope.pimgs =  $scope.campaign.artwork;
		        $log.debug("Product images emitting when not null ");
		        $scope.$emit('emittingCampaignImages',$scope.pimgs);
		      } else {
		        $scope.$emit('emittingNoCampaignImages',$scope.pimgs);
		        $log.debug("Product images emitting when null ");
		      }

		       if ($scope.campaign.campaign_comments!==undefined){   //########check comments source 
		           $("#prodo-comment-media-list").css("display", "block");
		       }
               $("#loadMoreCommentMsg").css("display", "none");

                if ( $scope.campaign.campaign_comments) {   //##### check comment source
		          if ( $scope.campaign.campaign_comments.length > 4) {
		            $("#load-more").css("display", "inline");
		          } 
		          else{
		               $("#load-more").css("display", "none");
		          }
		        } 

		         $scope.isCollapsed = true;  //added by omkar 

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

	 // $scope.getSelectedCampaign=function(campaignid){
	 // 	$scope.getCampaign(campaignid);
	 // };

   // $scope.getCampaign=function(campaignid){
   //   CampaignWallService.get_ProductCampaign.getProductCampaign( {
	  //    	 prodle: $rootScope.product_prodle,
	  //        campaign_id: campaignid
   //    }, function (successData) {
   //    if (successData.success == undefined) { //if not product
   //     	  $scope.handleGetCampaignError(successData.error);
   //    } else {
   //      	$scope.handleGetCampaignSuccess(successData); 
   //    }
   //    }, function (error) { //if error geting product
	  //     $log.debug(error);
	  //     $("#prodo-ProductDetails").css("display", "none");
	  //     // $("#ErrMsging").css("display", "inline");
	  //     $scope.ErrMsging=1;
	  //     document.getElementById("ErrMsging").innerHTML = "Server Error:" + error.status;
     
   //  });
   // }

//  $scope.handleGetCampaignError=function(error){
// //error code check here
//     if(error.code=='AL001'){
//       $rootScope.showModal();
//     }
//     else{
//      $log.debug(error.message);
//      $("#prodo-ProductDetails").css("display", "none");
//      // $("#ErrMsging").css("display", "block");
//      $scope.ErrMsging=1;
//      if (document.getElementById("ErrMsging") !== null){
//       document.getElementById("ErrMsging").innerHTML = "No comments for this campaign...";	
//      } 
   
//     }     
//  };

// $scope.handleGetCampaignSuccess=function(successData){
//  $scope.campaign=successData.success.Product_Campaign;
// 	if (successData.success.Product_Campaign.artwork.length!==0) {
// 	    $scope.pimgs = successData.success.Product_Campaign.artwork;
// 	    $log.debug("Product images emitting when not null ");
// 	    $scope.$emit('emittingCampaignImages',$scope.pimgs);
// 	  } else {
// 	    $scope.$emit('emittingNoCampaignImages',$scope.pimgs);
// 	    $log.debug("Product images emitting when null ");
// 	  }
// };



}]);
