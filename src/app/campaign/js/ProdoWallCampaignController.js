angular.module('prodo.CampaignApp')
 .controller('ProdoWallCampaignController', ['$scope', '$rootScope', '$state', '$http', '$timeout', '$log',  'checkIfSessionExist','campaignWalldata','CampaignWallService' , function($scope, $rootScope, $state, $http, $timeout, $log,  checkIfSessionExist,campaignWalldata,CampaignWallService) {
   // console.log('campaign controller initializing..');
   $log.debug( campaignWalldata.success);
   $scope.campaign={};
   $scope.ErrMsging=0;   
   $scope.pimgs=[];  
   $scope.productComments=[];
   $scope.$watch('$state.$current.locals.globals.campaignWalldata', function (campaignWalldata) {
	     if(campaignWalldata.error){
	      $("#prodo-ProductDetails").css("display", "none");
	      $scope.ErrMsging=1; 
	      $scope.productname="this product"; 
	      if(campaignWalldata.productname){
            $scope.productname=campaignWalldata.productname;
	      }   
	      document.getElementById("ErrMsging").innerHTML = "No Campaigns for  "+$scope.productname;
	     }
	     else{
	   
	      if(campaignWalldata.success){
	        $log.debug( campaignWalldata.success);
	        $("#prodo-ProductDetails").css("display", "block");
	        $scope.allCampaignData=campaignWalldata.success.Product_Campaigns;
	        $scope.campaign=$scope.allCampaignData[0];
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
			}
	      }
	     
    });

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
