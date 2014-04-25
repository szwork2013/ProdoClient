angular.module('prodo.ProdoHomeApp')
	.controller('ProdoHomeController', ['$rootScope', '$scope', '$state', '$log', 'UserSessionService', '$stateParams', 'growl', 'allOrgData', 'latestSignupData','prodoSearchService', 'checkIfSessionExist','trendingProductService', function($rootScope, $scope, $state, $log, UserSessionService, $stateParams, growl, allOrgData, latestSignupData, prodoSearchService, checkIfSessionExist, trendingProductService) {
		
    $log.debug('initialising home controller..');
    console.log(allOrgData);
    console.log(latestSignupData);
    $scope.allorganalytics = [];
    $scope.latestsignups = [];

    $scope.isCollapsed = true;


    $scope.regularExpressionForProdonus = /^prodonus/i;

    $scope.trendingProducts = {};  

    $scope.$state = $state;

    trendingProductService.getTrendingProducts();

    $scope.org = {orgName:'',nameOfProduct:'',feature:'',category:'',model_number:''};

    // $scope.orgName = '';

    // $scope.nameOfProduct = '';

    // $scope.feature = '';

    // $scope.category = '';

    // $scope.model_number = '';

    $scope.trendingProductEmit = function(prodle,orgid)
    {     
            $rootScope.product_prodle = prodle;
            $rootScope.orgid = orgid; 
            $state.transitionTo("prodo.productwall.wall-product");
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
      if (checkIfSessionExist.error) {
        $rootScope.showModal();
      } 
    });

    if (allOrgData.success) {
      $scope.allorganalytics = allOrgData.success.organalytics;
    };

    if (latestSignupData.success) {
      $scope.latestsignups = latestSignupData.success.OrgNames;
    };
   

    $scope.transitionToOrgWall = function(orgid){
      $rootScope.orgid = orgid;
      $state.transitionTo('prodo.productwall.wall-org');
    };

    $scope.transitionToCampaignWall = function(orgid){
      $rootScope.orgid = orgid;
      $state.transitionTo('prodo.productwall.wall-campaign');
    };

      // $scope.showAdvanceSearch=function()
      // {
      //   $scope.isCollapsed = false;
      // };

      //  $scope.hideAdvanceSearch=function()
      // {
      //   $scope.isCollapsed = !$scope.isCollapsed;alert('hello');

      // };
      $scope.search = {productsearchdata:{}};  
      $scope.homeSearchInit = function()
      {
        if(($scope.org.orgName === undefined || $scope.org.orgName === '') && ($scope.org.nameOfProduct === undefined || $scope.org.nameOfProduct === '') && ($scope.org.category === undefined || $scope.org.category === '') && ($scope.org.feature === undefined || $scope.org.feature === '') && ($scope.org.model_number === undefined || $scope.org.model_number === ''))
        {
          $rootScope.ProdoAppMessage("Please enter atleast one search criteria to proceed with search", 'error' );
        }
        else
        {

           
           $scope.search.productsearchdata.searchtype = "home";
           if ($scope.org.orgName !== '') 
              {
                     var temp = $scope.org.orgName.replace(/\s/g, "");     //Declared temporary variable to remove spaces from search query
                     $scope.search.productsearchdata.Organization_Name = temp;
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
                  console.log(JSON.stringify($scope.search));
                  prodoSearchService.searchProduct($scope.search);
        }
      };
        var cleanEventGetSearchProductDone = $scope.$on('getSearchProductDone', function (event, data) 
          {
            if(data.error!==undefined && data.error.code==='AL001')
            {
              $('#advancedSearchModal').modal('hide');  //code for cloasing modal
              $('.modal-backdrop').remove(); 
              $rootScope.showModal();
            }
            else
            {
             $scope.allorganalytics = data.success.doc;
             // $scope.message = "";
             // $scope.message = data.success.message;
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
    });

	}]);
