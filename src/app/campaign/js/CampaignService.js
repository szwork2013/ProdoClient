angular.module('prodo.CampaignApp')
// .factory('CampaignService', [
//   '$resource',
//   '$log',
//   '$rootScope',

//   function ($resource,$log, $rootScope) {

//   	var campaign = {
//   		addCampaign: $resource('/api/productcampaign/:orgid', {}, {
//           addCampaign: { 
//             method: 'POST', 
//             params: {orgid:'@orgid'}
//           }
//         }),
//   	};
  	
//   	campaign.addCampaign.addCampaign({orgid:$rootScope.usersession.currentUser.org.orgid},
//           function(success){
//             $log.debug(success);
//             $rootScope.$broadcast("campaignAddedSuccessfully",success);
//           },
//           function(error){
//             $log.debug(error);$rootScope.$broadcast("campaignNotAddedSuccessfully",error);
//           });
    
//     return campaign;
//   }
// ])



.factory('CampaignService', [
  '$rootScope',
  '$resource',
  '$log',
    function ($rootScope, $resource, $log) {
    var addCampaign = { Product: $resource('/api/productcampaign/:orgid/:prodle', {}, { addCampaignContent: { method: 'POST', params : {orgid : '@orgid' , prodle:'@prodle'} } }) };
    var deleteSelectedCampaign = { Product: $resource('/api/productcampaign/:campaign_id', {}, { deleteCampaign: { method: 'DELETE' , params : {campaign_id:'@campaign_id'}} }) };
    var modifyCurrentCampaign = { Product: $resource('/api/productcampaign/:orgid/:campaign_id', {}, { modifySelectedCampaign: { method: 'PUT' , params : {orgid : '@orgid' ,campaign_id:'@campaign_id'}} }) };
   // var deleteSelectedCampaign = { Product: $resource('/api/productcampaign/:orgid/:campaign_id', {}, { deleteCampaign: { method: 'DELETE' , params : {orgid : '@orgid' , campaign_id:'@campaign_id'}} }) };
 
    var products = {};
    products.createCampaign = function (campaignContent,prodle) {
      addCampaign.Product.addCampaignContent({ orgid:$rootScope.usersession.currentUser.org.orgid, prodle:prodle}, campaignContent, function (success) {
        $log.debug(success);
        $rootScope.$broadcast('campaignAddedSuccessfully', success);
      }), function (error) {
        $log.debug(error);
        $rootScope.$broadcast('campaignNotAddedSuccessfully', error);
      };
    };

    products.updateCampaign = function (content, campaign_id) {   
      modifyCurrentCampaign.Product.modifySelectedCampaign({orgid:$rootScope.usersession.currentUser.org.orgid , campaign_id:campaign_id},content, function (success) {
        $log.debug(success);
        $rootScope.$broadcast('campaignUpdatedSuccessfully', success);
      }), function (error) {
        $log.debug(error);
        $rootScope.$broadcast('campaignNotUpdatedSuccessfully', error);
      };
    };

     products.deleteTheCampaign = function (campaign_id) {
      deleteSelectedCampaign.Product.deleteCampaign({campaign_id:campaign_id}, function (success) {
        $log.debug(success);
        $rootScope.$broadcast('campaignDeletedSuccessfullt', success);
      }), function (error) {
        $log.debug(error);
        $rootScope.$broadcast('campaignNotDeleteSuccessfully', error);
      };
    };


    return products;
  }
])

.factory('getAllCampaigns', [
  '$rootScope',
  '$resource',
  '$log',
     function ($rootScope, $resource, $log) {
    var getAllCampaign = { Product: $resource('/api/productcampaign/:orgid', {}, { getCampaignDetails: { method: 'GET' , params : {orgid : '@orgid'}} }) };
     // var modifyCurrent = { Product: $resource('/api/productcampaign/:orgid/:campaign_id', {}, { getCampaignDetails: { method: 'GET' , params : {orgid : '@orgid', campaign_id:'@campaign_id'}} }) };
     var campaign = {};
    campaign.getCampaigns = function () {
      getAllCampaign.Product.getCampaignDetails({orgid:$rootScope.usersession.currentUser.org.orgid},function (success) {
        $log.debug(success);
        $rootScope.$broadcast('gotAllCampaigns', success);
      }), function (error) {
        $log.debug(error);
        $rootScope.$broadcast('notGotAllCampaigns', error);
      };
    };




    return campaign;
  }
]);


// .factory('deleteCampaigns', [
//   '$rootScope',
//   '$resource',
//   '$log',
//   function ($rootScope, $resource, $log) {
//    var deleteSelectedCampaign = { Product: $resource('/api/productcampaign/:orgid/:campaign_id', {}, { deleteCampaign: { method: 'DELETE' , params : {orgid : '@orgid' , campaign_id:'@campaign_id'}} }) };
//      // var modifyCurrent = { Product: $resource('/api/productcampaign/:orgid/:campaign_id', {}, { getCampaignDetails: { method: 'GET' , params : {orgid : '@orgid', campaign_id:'@campaign_id'}} }) };
//      var campaign = {};
//     campaign.deleteTheCampaign = function () {
//       deleteSelectedCampaign.Product.deleteCampaign({orgid:$rootScope.usersession.currentUser.org.orgid},function (success) {
//         $log.debug(success);
//         $rootScope.$broadcast('campaignDeletedSuccessfullt', success);
//       }), function (error) {
//         $log.debug(error);
//         $rootScope.$broadcast('campaignNotDeleteSuccessfully', error);
//       };
//     };




//     return campaign;
//   }
// ])

