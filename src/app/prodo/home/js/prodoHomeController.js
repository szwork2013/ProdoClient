
angular.module('prodo.ProdoHomeApp')
	.controller('ProdoHomeController', ['$rootScope', '$scope', '$state', '$log', 'UserSessionService', 'OrgRegistrationService', '$stateParams', 'growl', 'allOrgData', 'allCampaignData', 'prodoSearchService', 'checkIfSessionExist','trendingProductService', function($rootScope, $scope, $state, $log, UserSessionService, OrgRegistrationService, $stateParams, growl, allOrgData, allCampaignData, prodoSearchService, checkIfSessionExist, trendingProductService) {


    $log.debug(allOrgData);
    $log.debug(allCampaignData);
    $scope.campaigns = [];

    $scope.allorganalytics = [];

    $scope.searchorganalytics = [];

    $scope.searchForOrg = false;

    $scope.latestsignups = [];

    $scope.orgsponsers = [];

    $scope.isCollapsed = true;

    $scope.regularExpressionForProdonus = /^prodonus/i;

    $scope.trendingProducts = {};  

    $scope.$state = $state;

    trendingProductService.getTrendingProducts();

    $scope.org = {orgName:'',nameOfProduct:'',feature:'',category:'',model_number:''};

    $scope.trendingProductEmit = function(prodle,orgid)
    {     
            $rootScope.product_prodle = prodle;
            $rootScope.orgid = orgid;   
            $state.transitionTo("prodo.productwall.wall-unified");
    };

    var cleanEventGotTrendingProducts = $scope.$on('gotTrendingProducts', function (event, data) 
    {  
        if (data.success !== undefined) {
                $scope.trendingProducts = data.success.ProductTrends;
        };
    });
        
    var cleanEventNotGotTrendingProducts = $scope.$on('notGotTrendingProducts', function (event, data) //Error handling needed for 
    {
        $rootScope.ProdoAppMessage("There is some issue with the server! Please try after some time",'error');
    });

    $scope.$watch('$state.$current.locals.globals.checkIfSessionExist', function (checkIfSessionExist) {
      if (checkIfSessionExist!== null && checkIfSessionExist !==undefined){
        if(checkIfSessionExist.error) {
          $rootScope.showModal();
        } 
      }
    });

    if (allOrgData.success) {
      if (allOrgData.success.organalyticsall.length !== 0) {

        $scope.allorganalytics = allOrgData.success.organalyticsall;
      }

      if (allOrgData.success.organalyticslatest.length !== 0) {
        $scope.latestsignups = allOrgData.success.organalyticslatest;
      }

      if (allOrgData.success.organalyticssponser.length !== 0) {
        $scope.orgsponsers = allOrgData.success.organalyticssponser;
      }
      
    };

    if (allCampaignData.success) {

      if (allCampaignData.success.campaigns.length !== 0) {

        $scope.campaigns = allCampaignData.success.campaigns;
      }

    };
   
    $scope.transitionToOrgWall = function(orgid){
      $rootScope.orgid = orgid;
      var firstproduct = 1;
      if (orgid !== $rootScope.usersession.currentUser.org.orgid) {
        OrgRegistrationService.get_Product(firstproduct, orgid);
      } else {
        $state.transitionTo('prodo.productwall.wall-unified');
      }
    };

    $scope.handleFirstProductResponse = function(data){
      if (data.success) {
        if (data.success.product.length > 0) {
          $rootScope.product_prodle = data.success.product[0].prodle;
        }
        $state.transitionTo('prodo.productwall.wall-unified');
      } else {
        if(data.error !== undefined && data.error.code === 'AL001' ) {
          $rootScope.showModal();
        } else {
          $log.debug(data.error.message);
          $rootScope.ProdoAppMessage(data.error.message,'error');        
        }
      }
    }; 

    var cleanupEventFirstProductDone = $scope.$on('getOtherOrgFirstProductDone', function (event, data) {
      $scope.handleFirstProductResponse(data);
    });

    var cleanupEventFirstProductNotDone = $scope.$on('getOtherOrgFirstProductNotDone', function (event, data) {
      $rootScope.ProdoAppMessage("It looks as though we have broken something on our server system. Our support team is notified and will take immediate action to fix it." + message, 'error');   
    });

    $scope.transitionToCampaignWall = function(orgid, campaignid, prodle){
      $rootScope.orgid = orgid;
      $rootScope.product_prodle = prodle;
      $rootScope.campaign_idwall = campaignid;
      $state.transitionTo('prodo.productwall.wall-campaign.campaign');
    };

    $scope.search = {productsearchdata:{}};  

    $scope.back = function() {
      $scope.searchForOrg = false;
    }

    $scope.homeSearchInit = function()
    {
        if(($scope.org.orgName === undefined || $scope.org.orgName === '') && ($scope.org.nameOfProduct === undefined || $scope.org.nameOfProduct === '') && ($scope.org.category === undefined || $scope.org.category === '') && ($scope.org.feature === undefined || $scope.org.feature === '') && ($scope.org.model_number === undefined || $scope.org.model_number === ''))
        {
          $rootScope.ProdoAppMessage("Please enter atleast one search criteria to proceed with search", 'error' );
        }
        else
        {

           
          
              if ($scope.org.nameOfProduct !== '') 
              {
                    var temp=$scope.org.nameOfProduct.replace(/\s/g, "");
                    $scope.search.productsearchdata.Product_Name = temp;
                    temp = "";
              }
              else
              {
                    $scope.search.productsearchdata.Product_Name = "";
                    $scope.countForEmptyTextbox++;     
              }
       
              if ($scope.org.model_number !== '') {
                   var temp=$scope.org.model_number.replace(/\s/g, "");
                   $scope.search.productsearchdata.Model_Number = temp;
                   temp = "";
              }
              else
              {
                   $scope.search.productsearchdata.Model_Number = "";
                   $scope.countForEmptyTextbox++;
              }
                 if ($scope.org.feature !== '') {
                   var temp=$scope.org.feature.replace(/\s/g, "");
                   $scope.search.productsearchdata.Feature = temp;
                   temp = "";
              }
              else
              {
                   $scope.search.productsearchdata.Feature="";
                   $scope.countForEmptyTextbox++;
              }
              if ($scope.org.category !== '') 
              {
                   var temp=$scope.org.category.replace(/\s/g, "");
                   $scope.search.productsearchdata.Category = temp;
                   temp = "";
              }
              else
              {
                   $scope.search.productsearchdata.Category = "";
                   $scope.countForEmptyTextbox++;
              }
              if ($scope.org.orgName !== '') 
              {
                     var temp = $scope.org.orgName.replace(/\s/g, "");     //Declared temporary variable to remove spaces from search query
                     $scope.search.productsearchdata.Organization_Name = temp;
                     temp = "";
              }
              else
              {
                   $scope.search.productsearchdata.Organization_Name = ""; 
                   $scope.countForEmptyTextbox++;
              }
               $scope.search.productsearchdata.searchtype = "home";
                  prodoSearchService.searchProduct($scope.search);
        }
    };

   $scope.clearTextboxContent = function()
   {
      $scope.org = {orgName:'',nameOfProduct:'',feature:'',category:'',model_number:''};
   }

    var cleanEventGetSearchProductDone = $scope.$on('getSearchProductDone', function (event, data) 
      {
        if(data.error!==undefined && data.error.code==='AL001')
        {
          $rootScope.showModal();
        }
        else if(data.error)
        {
          $rootScope.ProdoAppMessage(data.error.message,'error');
        }
        else
        {
          if(data.success.organalytics  !== undefined)
              {
                    if(data.success.organalytics.length > 0)
                    {
                      $scope.searchorganalytics = data.success.organalytics;
                      $scope.searchForOrg = true;
                    }
                    else if(data.success.organalytics.length === 0)
                    {
                           $rootScope.ProdoAppMessage("No organizations found for specified search criteria",'success');
                    }
              }
       
                 if(data.success.organalytics === undefined)
                 {
                      $rootScope.ProdoAppMessage("No organizations found for specified search criteria",'success');
                 }
         }
         });

     var cleanEventGetSearchProductNotDone = $scope.$on('getSearchProductNotDone', function (event, data) {
          $rootScope.ProdoAppMessage("There is some issue with the server! Please try after some time",'error');
     });

    $scope.$on('$destroy', function(event, message) {
      cleanEventGotTrendingProducts();
      cleanEventNotGotTrendingProducts();   
      cleanEventGetSearchProductDone(); 
      cleanEventGetSearchProductNotDone(); 
      cleanupEventFirstProductDone();
      cleanupEventFirstProductNotDone(); 
    });

	}]);
