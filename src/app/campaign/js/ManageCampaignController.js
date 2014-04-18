angular.module('prodo.CampaignApp')
 .controller('ManageCampaignController', ['$scope', '$rootScope', '$state', '$http', '$timeout', '$stateParams', '$log', 'growl', 'checkIfSessionExist','currentorgproducts','CampaignService','getAllCampaigns','notify', 'campaigndata', function($scope, $rootScope, $state, $http, $timeout, $stateParams, $log, growl, checkIfSessionExist, currentorgproducts, CampaignService, getAllCampaigns , notify, campaigndata) {
 		

 $scope.newCampaignAdd = 0;

 $scope.temp = [];

 $scope.temp2 = [];

 $scope.productlist = {};

 $scope.form = {};

 $scope.regexForText = /^[a-zA-Z\s]*$/;

 $scope.regexForNumbers = /[0-9]/;

 $scope.regexForEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

 $scope.regexForPhno = /^\(?[+]([0-9]{2,5})\)?[-]?([0-9]{10,15})$/;

 $scope.errorForWrongCampaignname = '';

 $scope.errorForCampaignStart = ''; 

 $scope.errorForInvalidEnddate = ''; 

 $scope.invalidDesc = '';
 $scope.showCampaign = 1;

 $scope.$state = $state;
 $scope.addNewCampaign = 0; 
 // $scope.campaignDescription = '';

$scope.campaign = {productName: '',Name:'',Description:'',startDate:'',endDate:'',category:[]};
$scope.errorForInvalidProduct = '';

 
 $scope.campaignDetailsObject = {};

 $scope.campaignName = '';

 //$scope.enddate = '';
 $scope.startDate = '';
 $scope.category = [];

 $scope.endDate= '';// $scope.endDates = '';

 $scope.productlist = [];

 $scope.prodleContent = 'wrong';

 $scope.addJSON = {"campaigndata": {"name":'',"productname":'',"category":[],"description":'',"startdate":'',"enddate":''}};

$scope.enableEditing = 0;
$scope.currentCampaign = {};

 // getAllCampaigns.getCampaigns();

$scope.ProdoAppMessage = function(message,flag)
{
      if(flag==='success')
      {
        notify({message:message,template:'common/notification/views/notification-success.html',position:'center'})
      }
      else
      {
         notify({message:message,template:'common/notification/views/notification-error.html',position:'center'}); 
      }
};


$scope.noCampaignExists = 1;

if (currentorgproducts.error) 
{
      $scope.ProdoAppMessage("Currently no products exists in the organization",'error');
} 
else 
{
	  for(var i=0;i<currentorgproducts.success.product.length ; i++)
	  {
	  	$scope.productlist.push(currentorgproducts.success.product[i].name);
	  }
}

      $scope.$watch('$state.$current.locals.globals.campaigndata', function (campaigndata) {
        console.log(campaigndata);
        if (campaigndata.success) {
           $scope.campaignDetailsObject = campaigndata.success.Product_Campaigns;
           $scope.campaignName = $scope.campaignDetailsObject[0].name;
           $scope.campaignDescription = $scope.campaignDetailsObject[0].description;
           $scope.startDate = $scope.campaignDetailsObject[0].startdate;
           $scope.category = $scope.campaignDetailsObject[0].category;
           $scope.endDate = $scope.campaignDetailsObject[0].enddate;
           $scope.productName = $scope.campaignDetailsObject[0].productname;
           $scope.currentCampaign = $scope.campaignDetailsObject[0];
           var d1=new Date($scope.campaignDetailsObject[0].startdate);
            var year1=d1.getFullYear();
            var month1=d1.getMonth()+1;
            if (month1<10){
              month1="0" + month1;
            }
            var day1=d1.getDate();
           $scope.currentCampaign.startdate = year1 + "-" + month1+ "-" + day1;
           var d=new Date($scope.campaignDetailsObject[0].enddate);
            var year=d.getFullYear();
            var month=d.getMonth()+1;
            if (month<10){
              month="0" + month;
            }
            var day=d.getDate();
           $scope.currentCampaign.enddate = year + "-" + month + "-" + day;
           //$scope.ProdoAppMessage(campaigndata.success.message,'success');
        } else if(campaigndata.error !== undefined && campaigndata.error.code === 'AL001' ) {
            $rootScope.showModal();
        } else if (campaigndata.error) {  
              $scope.ProdoAppMessage(campaigndata.error.message,'error');    //ShowAlert
        }
  
      });

 // function to send and stringify user registration data to Rest APIs
$scope.jsonOrgCampaignData = function(){
  var Data = 
  {
    "campaigndata":
      {
        'name' : $scope.campaign.Name,
        'productname' : $scope.campaign.productName,
        'enddate': $scope.campaign.endDate,
        'startdate': $scope.campaign.startDate,
        'description': $scope.campaign.Description,
        'category': $scope.campaign.category
      }  
  };
  return JSON.stringify(Data); 
} 


$scope.saveCampaign = function()
{     
    $scope.errorForWrongCampaignname = '';  
	$scope.errorForCampaignStart = ''; 
	$scope.errorForInvalidEnddate = ''; 
	$scope.invalidDesc ='';
	$scope.errorForInvalidProduct = '';
	$scope.allValid = 0;
	$scope.errorForInvalidProduct = '';
	$scope.getProdle();
    if($scope.campaign.Name === undefined || $scope.regexForText.test($scope.campaign.Name) === false || $scope.campaign.Name ==='')
    {
              $scope.errorForWrongCampaignname = 'Please enter valid campaign name!';
              $scope.valid = 1;
    }
    console.log($scope.allValid);
    if($scope.form.campaign.startDate.$dirty === false)
    {
    	      $scope.errorForCampaignStart = 'Please select valid start date!'; 
    	      $scope.allValid = 1;    
    }
    if($scope.form.campaign.endDates.$dirty === false)
    {
    	      $scope.errorForInvalidEnddate = 'Please select valid end date!'; 
    	      $scope.allValid = 1;  
    }

    if($scope.campaign.Description === undefined || $scope.campaign.Description === '')
    {
    	$scope.invalidDesc = "Please enter valid description";
    	$scope.allValid = 1;    console.log("hello3");
    }
    if($scope.campaign.productName ===undefined || $scope.campaign.productName ==='')
    {
    	$scope.errorForInvalidProduct = "Please select valid product name !";
        $scope.allValid = 1;
    }
    if($scope.allValid === 0 )
    {       
         CampaignService.createCampaign($scope.jsonOrgCampaignData() ,$scope.prodleContent);  
         // alert($scope.prodleContent);
    }
};

$scope.jsonOrgCampaignDataModify = function(){
var Data = 
{
  "campaigndata":
    {
      'name' : $scope.currentCampaign.name,
      'productname' : $scope.currentCampaign.productname,
      'enddate': $scope.currentCampaign.enddate,
      'startdate': $scope.currentCampaign.startdate,
      'description': $scope.currentCampaign.description,
      'category': $scope.currentCampaign.category
    }  
};
return JSON.stringify(Data); 
};

$scope.updateCampaign = function()
{
	$scope.errorForWrongCampaignname = '';  
	$scope.errorForCampaignStart = ''; 
	$scope.errorForInvalidEnddate = ''; 
	$scope.invalidDesc ='';
	$scope.errorForInvalidProduct = '';
	$scope.allValid = 0;
	$scope.errorForInvalidProduct = '';
	$scope.getProdle();
    if($scope.currentCampaign.productname === undefined || $scope.regexForText.test($scope.currentCampaign.productname) === false || $scope.currentCampaign.productname ==='')
    {
        $scope.errorForInvalidProduct = "Please select valid product name !";
        $scope.allValid = 1;
    }

    if($scope.currentCampaign.description === undefined || $scope.currentCampaign.description === '')
    {
    	$scope.invalidDesc = "Please enter valid description";
    	$scope.allValid = 1;   
    }
    if($scope.currentCampaign.name ===undefined || $scope.currentCampaign.name ==='' || $scope.regexForText.test($scope.currentCampaign.name) === false)
    {
    	
         $scope.errorForWrongCampaignname = 'Please enter valid campaign name!';
         $scope.valid = 1;

    }
    
    if($scope.allValid === 0 )
    {    
        
         CampaignService.updateCampaign($scope.jsonOrgCampaignDataModify() ,$scope.currentCampaign.campaign_id);    
         // alert($scope.prodleContent);
    }
};

$scope.deleteTheCampaign = function(data)
{
    CampaignService.deleteTheCampaign(data);
};


var cleanupeventchangedcampaignsuccessfully = $scope.$on("campaignUpdatedSuccessfully", function(event, data){
 if(data.error !== undefined && data.error.code === 'AL001' )
    {
      $rootScope.showModal();
    }
    if(data.success)
    {
       $scope.ProdoAppMessage(data.success.message,'success');
       $scope.enableEditing=0;
       $state.transitionTo($state.current, $stateParams, { reload: true, inherit: false, notify: true });

    }
    else {
      if (data.error.code== 'AU004') {     // enter valid data
          $scope.ProdoAppMessage(data.error.message,'error');    //ShowAlert
      } else {
          $scope.ProdoAppMessage(data.error.message,'error');    //ShowError
      }
    }
});

var cleanupeventnotchangedcampaignerror = $scope.$on("campaignNotUpdatedSuccessfully", function(event, data){
	     $scope.ProdoAppMessage("Some issues with server",'error');
});

var cleanupeventdeletecampaignsuccessfully = $scope.$on("campaignDeletedSuccessfullt", function(event, data){
 if(data.error !== undefined && data.error.code === 'AL001' )
    {
      $rootScope.showModal();
    }
    if(data.success)
    {
       $scope.ProdoAppMessage(data.success.message,'success');
       $state.transitionTo($state.current, $stateParams, { reload: true, inherit: false, notify: true });
    }
    else {
      if (data.error.code== 'AU004') {     // enter valid data
          $scope.ProdoAppMessage(data.error.message,'error');    //ShowAlert
      } else {
          $scope.ProdoAppMessage(data.error.message,'error');    //ShowError
      }
    }
});

var cleanupeventdeletecampaignerror = $scope.$on("campaignNotDeleteSuccessfully", function(event, data){
	     $scope.ProdoAppMessage("Some issues with server",'error');
});

$scope.showDetails = function(index)
{
  
    $scope.campaignName = $scope.campaignDetailsObject[index].name;
    $scope.campaignDescription = $scope.campaignDetailsObject[index].description;
    $scope.startDate = $scope.campaignDetailsObject[index].startdate;
    $scope.category = $scope.campaignDetailsObject[index].category;
    $scope.endDate = $scope.campaignDetailsObject[index].enddate;
    $scope.productName = $scope.campaignDetailsObject[index].productname; 
    $scope.currentCampaign = $scope.campaignDetailsObject[index];  
    var d1=new Date($scope.campaignDetailsObject[index].startdate);
    var year1=d1.getFullYear();
    var month1=d1.getMonth()+1;
    if (month1<10){
      month1="0" + month1;
    }
    var day1=d1.getDate();
    $scope.currentCampaign.startdate = year1 + "-" + month1 + "-" + day1;
    var d=new Date($scope.campaignDetailsObject[index].enddate);
    var year=d.getFullYear();
    var month=d.getMonth()+1;
    if (month<10){
      month="0" + month;
    }
    var day=d.getDate();
   $scope.currentCampaign.enddate = year + "-" + month + "-" + day;  
};

$scope.add = function()
{
    $scope.addNewCampaign = 1;
};

$scope.cancel = function()
{
    $scope.addNewCampaign = 0;$state.reload();
};

$scope.getProdle = function()
{ 
  for(var i =0;i<currentorgproducts.success.product.length;i++)
  {
  	if($scope.campaign.productName === currentorgproducts.success.product[i].name)
  	{
  		$scope.prodleContent = currentorgproducts.success.product[i].prodle;
  	
  	}
  }
};

$scope.disableEditingCampaign = function()
{
    $scope.enableEditing = 0;
    $state.reload();
};

 $scope.enableEditingCampaign = function() {
      $scope.enableEditing = 1;
 };

var cleanupeventaddedcampaignsuccessfully = $scope.$on("campaignAddedSuccessfully", function(event, data){
 if(data.error !== undefined && data.error.code === 'AL001' )
    {
      $rootScope.showModal();
    }
    if(data.success)
    {
       $scope.ProdoAppMessage(data.success.message,'success');
       $scope.enableEditing = 0;
       $state.transitionTo($state.current, $stateParams, { reload: true, inherit: false, notify: true });
    }
    else {
      if (data.error.code== 'AU004') {     // enter valid data
          $scope.ProdoAppMessage(data.error.message,'error');    //ShowAlert
      } else {
          $scope.ProdoAppMessage(data.error.message,'error');    //ShowError
      }
    }
});

var cleanupeventaddedcampaignerror = $scope.$on("campaignNotAddedSuccessfully", function(event, data){
	     $scope.ProdoAppMessage("Some issues with server",'error');
});

$scope.currentPage = 0;

$scope.pageSize = 5;

$scope.numberOfPages = function () {
     return Math.ceil($scope.productlist.length / $scope.pageSize);
};

$scope.$on('$destroy', function(event, message) 
{
	cleanupeventaddedcampaignsuccessfully();
	cleanupeventaddedcampaignerror();
	cleanupeventchangedcampaignsuccessfully();
	cleanupeventnotchangedcampaignerror();
	cleanupeventaddedcampaignsuccessfully();
	cleanupeventaddedcampaignerror();
	cleanupeventdeletecampaignsuccessfully();
	cleanupeventdeletecampaignerror();
});

 // pagination
  $scope.currentPage = 0;
  $scope.pageSize = 3;
  $scope.numberOfPages = function () {
    return Math.ceil($scope.campaignDetailsObject.length / $scope.pageSize);
  };
  // pagination


}]);


angular.module('prodo.CampaignApp').filter('startFrom', function () {
  return function (input, start) {
    if (input !== undefined || start !== undefined) {
      start = +start;
      return input.slice(start);
    }
  }
})