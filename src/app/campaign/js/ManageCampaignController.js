angular.module('prodo.CampaignApp')
 .controller('ManageCampaignController', ['$scope', '$rootScope', '$state', '$http', '$timeout', '$stateParams', '$log', 'growl', 'checkIfSessionExist','currentorgproducts','CampaignService','getAllCampaigns', 'campaigndata', 'fileReader','ENV','isLoggedin', function($scope, $rootScope, $state, $http, $timeout, $stateParams, $log, growl, checkIfSessionExist, currentorgproducts, CampaignService, getAllCampaigns , campaigndata ,fileReader,ENV,isLoggedin) {

    $scope.productlist = {};

    $scope.form = {};

    $scope.targettedAudience = [];

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

    $scope.campaign = {productName: '',Name:'',Description:'',startDate:'',endDate:'',category:[]};

    $scope.errorForInvalidProduct = '';
 
    $scope.campaignDetailsObject = [];

    $scope.campaignName = '';

    $scope.startDate = '';

    $scope.category = [];

    $scope.endDate= '';// $scope.endDates = '';

    $scope.productlist = [];

    $scope.prodleContent = 'wrong';

    $scope.addJSON = {"campaigndata": {"name":'',"productname":'',"category":[],"description":'',"startdate":'',"enddate":''}};

    $scope.enableEditing = 0;

    $scope.currentCampaign = {};

    $scope.today = moment().format('YYYY-MM-DD');

     // pagination
    $scope.currentPage = 0;

    $scope.pageSize = 3;

    $scope.numberOfPages = function () {
      return Math.ceil($scope.campaignDetailsObject.length / $scope.pageSize);
    };

    // pagination

    $scope.fileLength;

    $scope.uploadSrc;
      
    $scope.counter = 0;

    $scope.file;
      
    $scope.file_data = {
            filetype: '',
            filename: '',
            filebuffer: ''
    };

    $scope.action={};

    $scope.isValidImage=false;

    $scope.invoiceimage;
    
    $scope.newCampaignAdd = 0;

    $scope.open = function($event,opened) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope[opened] = true;
    };
    
    $scope.restrictEndDate = $scope.today;

    $scope.noCampaignExists = 1;
    
    if (currentorgproducts.error) 
    {
          //$scope.ProdoAppMessage("Currently no products exists in the organization",'error');
    } 
    else 
    {
    	  for(var i=0;i<currentorgproducts.success.product.length ; i++)
    	  {
    	  	$scope.productlist.push(currentorgproducts.success.product[i].name);
    	  }
    }

    $scope.$watch('$state.$current.locals.globals.campaigndata', function (campaigndata) { 
      if (campaigndata.success) {
         $scope.campaignDetailsObject = campaigndata.success.Product_Campaigns;
         $scope.currentCampaign = $scope.campaignDetailsObject[0]; 
         //$scope.ProdoAppMessage(campaigndata.success.message,'success');
      } else if(campaigndata.error !== undefined && campaigndata.error.code === 'AL001' ) {
          $rootScope.showModal();
      } else if (campaigndata.error) {  
            //$scope.ProdoAppMessage(campaigndata.error.message,'error');    //ShowAlert
            $scope.noCampaignExists = 0;
      }
      $rootScope.campaign_id = $scope.currentCampaign.campaign_id;
    });

 // function to send and stringify user registration data to Rest APIs
    $scope.jsonOrgCampaignData = function(){
      var Data = 
      {
        
            'name' : $scope.campaign.Name,
            'productname' : $scope.campaign.productName,
            'enddate': $scope.campaign.endDate,
            'startdate': $scope.campaign.startDate,
            'description': $scope.campaign.Description,
            'category': $scope.campaign.category
           
      };
      return Data; 
    }; 

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
        	$scope.allValid = 1;   
        }
        if($scope.campaign.productName ===undefined || $scope.campaign.productName ==='')
        {
        	$scope.errorForInvalidProduct = "Please select valid product name !";
            $scope.allValid = 1;
        }
        if($scope.allValid === 0 )
        {       
             // CampaignService.createCampaign($scope.jsonOrgCampaignData() ,$scope.prodleContent);  
             // alert($scope.prodleContent);

             if($scope.isValidImage==true){

                  $scope.socket.emit('addProductCampaign', $rootScope.usersession.currentUser.userid, $rootScope.usersession.currentUser.org.orgid,$scope.prodleContent, $scope.jsonOrgCampaignData(),$scope.file_data);               
              }
              else{
                $rootScope.ProdoAppMessage("Please select banner image to upload", 'error');
               }
        }
    };

    $scope.restrictEndDates = function()    { $scope.restrictEndDate = $scope.campaign.startDate;  };

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
    	$scope.allValidContent = 0;
    	$scope.errorForInvalidProduct = '';
    	$scope.getProdle();

      if($scope.currentCampaign.productname === undefined || $scope.currentCampaign.productname ==='')
      {
          $scope.errorForInvalidProduct = "Please select valid product name !";
          $scope.allValidContent = 1;
      }

      if($scope.currentCampaign.description === undefined || $scope.currentCampaign.description === '')
      {
      	$scope.invalidDesc = "Please enter valid description";
      	$scope.allValidContent = 1;   
      }
      if($scope.currentCampaign.name ===undefined || $scope.currentCampaign.name ==='' )
      {    	
           $scope.errorForWrongCampaignname = 'Please enter valid campaign name!';
           $scope.allValidContent = 1;
      }
      
      if($scope.allValidContent === 0 )
      {    
           CampaignService.updateCampaign($scope.jsonOrgCampaignDataModify() ,$scope.currentCampaign.campaign_id);    
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
           $rootScope.ProdoAppMessage(data.success.message,'success'); 
          
           $scope.enableEditing=0;
           $state.transitionTo($state.current, $stateParams, { reload: true, inherit: false, notify: true });

        }
        else {
          if (data.error.code== 'AU004') {     // enter valid data
              $rootScope.ProdoAppMessage(data.error.message,'error');    //ShowAlert
          } else {
              $rootScope.ProdoAppMessage(data.error.message,'error');    //ShowError
          }
        }
    });

    var cleanupeventnotchangedcampaignerror = $scope.$on("campaignNotUpdatedSuccessfully", function(event, data){
    	     $rootScope.ProdoAppMessage("Some issues with server",'error');
    });

    var cleanupeventdeletecampaignsuccessfully = $scope.$on("campaignDeletedSuccessfullt", function(event, data){
     if(data.error !== undefined && data.error.code === 'AL001' )
        {
          $rootScope.showModal();
        }
        if(data.success)
        {
           $rootScope.ProdoAppMessage(data.success.message,'success');
           $state.transitionTo($state.current, $stateParams, { reload: true, inherit: false, notify: true });
        }
        else {
          if (data.error.code== 'AU004') {     // enter valid data
              $rootScope.ProdoAppMessage(data.error.message,'error');    //ShowAlert
          } else {
              $rootScope.ProdoAppMessage(data.error.message,'error');    //ShowError
          }
        }
    });

    var cleanupeventdeletecampaignerror = $scope.$on("campaignNotDeleteSuccessfully", function(event, data){
    	     $rootScope.ProdoAppMessage("Some issues with server",'error');
    });

    $scope.showDetails = function(index)
    {     
        // $scope.productName = $scope.campaignDetailsObject[index].productname; 
        $scope.currentCampaign = $scope.campaignDetailsObject[index];  
        $rootScope.campaign_id = $scope.currentCampaign.campaign_id; 
        $scope.enableEditing = 0;
        $scope.addNewCampaign = 0;
    };

    $scope.add = function()
    {
        $scope.addNewCampaign = 1;
    };

    $scope.cancel = function()
    {
        $scope.addNewCampaign = 0;
        $scope.addNewCampaign = 0;
        $state.reload();
        $scope.campaign = {productName: '',Name:'',Description:'',startDate:'',endDate:'',category:[]};
    };

    $scope.getProdle = function()
    { 
      if(currentorgproducts.success)
      {
          for(var i =0;i<currentorgproducts.success.product.length;i++)
          {
          	if($scope.campaign.productName === currentorgproducts.success.product[i].name)
          	{
          		$scope.prodleContent = currentorgproducts.success.product[i].prodle;
          	
          	}
          }
      }
    };

    $scope.disableEditingCampaign = function()
    {
        $scope.enableEditing = 0;
        $scope.addNewCampaign = 0;
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
           $rootScope.ProdoAppMessage(data.success.message,'success');
           $scope.enableEditing = 0; 
           $state.transitionTo($state.current, $stateParams, { reload: true, inherit: false, notify: true });
          // $scope.currentCampaign = $scope.campaignDetailsObject[$scope.campaignDetailsObject.length-1]; 
        }
        else {
          if (data.error.code== 'AU004') {     // enter valid data
              $rootScope.ProdoAppMessage(data.error.message,'error');    //ShowAlert
          } else {
              $rootScope.ProdoAppMessage(data.error.message,'error');    //ShowError
          }
        }
    });

    var cleanupeventaddedcampaignerror = $scope.$on("campaignNotAddedSuccessfully", function(event, data){
    	     $rootScope.ProdoAppMessage("Some issues with server",'error');
    });

    var cleanupartworkcampaignsuccess = $scope.$on("campaignUploadResponseSuccess", function(event, data){
          $state.reload();
    });
//campaignUploadResponseSuccess

    $scope.deleteCampaignImages = function()
    {
       $scope.imageids=[];   
       for(var i=0;i<$scope.currentCampaign.artwork.length;i++)  
       { 
           if(document.getElementById(i).checked === true)
           {    
                     $scope.imageids.push($scope.currentCampaign.artwork[i].imageid); 
           }      
       }
       if($scope.imageids.length !==0 )
       {
                 CampaignService.deleteCampaignArtwork($scope.currentCampaign.campaign_id,$scope.imageids);
       }
    };

     var cleanupeventcampaignartworkimagesdeletesuccess= $scope.$on("campaignImagesDeletedSuccessfully", function(event, data){
      if(data.error !== undefined && data.error.code === 'AL001' )
        {
          $rootScope.showModal();
        }
        if(data.success)
        {
           $rootScope.ProdoAppMessage(data.success.message,'success');
            // $state.reload();
           $state.transitionTo($state.current, $stateParams, { reload: true, inherit: false, notify: true });
           $scope.enableEditing = 1;

        }
        else {
          if (data.error.code== 'AU004') {     // enter valid data
              $rootScope.ProdoAppMessage(data.error.message,'error');    //ShowAlert
          } else {
              $rootScope.ProdoAppMessage(data.error.message,'error');    //ShowError
          }
        }
     });

     var cleanupeventcampaignartworkimagesdeleteerror = $scope.$on("campaignImagesNotDeletedSuccessfully", function(event, data){
             $rootScope.ProdoAppMessage("Some issues with server",'error');
     });

    // /////////////////////////////////////////////////////
    // upload

     $scope.socket = io.connect(ENV.apiEndpoint + ENV.port + '/api/prodoupload', {
        query: 'session_id=' + $rootScope.usersession.currentUser.sessionid
      });
    
      $scope.handleUploadError=function(error){
       $("#bar").hide();
       if(error.code=='AL001'){
            $rootScope.showModal();
          }else{
          $log.debug(error);
          $rootScope.showModal();
        }
      };

    $scope.getFile = function (a) {
         isLoggedin.checkUserSession(
         function (successData) {
                 if (successData.success == undefined) {
                      if(successData.error)
                      {
                         $scope.handleUploadError(successData.error);
                      } 
                 }
                 else { //add comment
                          fileReader.readAsBinaryString(a, $scope).then(function (result) {
                          var action;
                          $scope.imageBfr = result;
                          $scope.file = a;
                          $scope.file_data = {
                            filetype: $scope.file.type,
                            filename: $scope.file.name,
                            filebuffer: $scope.imageBfr
                          };
                          if (($scope.file.type == 'image/jpg') || ($scope.file.type == 'image/png') || ($scope.file.type == 'image/gif') || ($scope.file.type == 'image/jpeg')) {
                            if (($scope.file.size / 1024 < 2048)) {
                                $scope.isValidImage=true;
                              } else {
                                 $rootScope.ProdoAppMessage("Image size must ne less than 2MB", 'error');        
                              }
                         } 
                         else{
                           $rootScope.ProdoAppMessage("Please upload image only", 'error'); 
                           }
                        
                          });
                    }
           });  
      };

      $scope.socket.removeAllListeners('addProductCampaignResponse');

      $scope.socket.on('addProductCampaignResponse', function (error, imagelocation) {
                     $scope.addProductCampaignResponseHandler(error, imagelocation);
      });

      $scope.addProductCampaignResponseHandler=function(error, imagelocation){
       if (error) {         
            if (error.error.code == 'AP003') { // user already exist
              $log.debug(error.error.code + " " + error.error.message);
              $rootScope.ProdoAppMessage(error.error.message, 'error');
              
            } else if (error.error.code == 'AV001') { // user data invalid
              $scope.ProdoAppMessage(error.error.message, 'error');
              $log.debug('response from server');
              //notify({ message:error.error.message, template:'campaign/js/abc.html'} );
            } else {
              $log.debug(error.error.message);
              $rootScope.ProdoAppMessage(error.error.message, 'error');            
            }
          } else{
            $scope.imageSrc = JSON.stringify(imagelocation.success.invoiceimage);
            $rootScope.$broadcast("campaignUploadResponseSuccess", "success");
            $rootScope.ProdoAppMessage("Campaign added successfully", 'success');
            $state.enableEditing = 0;
            $state.transitionTo($state.current, $stateParams, { reload: true, inherit: false, notify: true });
            $scope.counter++;
            $log.debug($scope.counter);
            if ($scope.counter < $scope.fileLength) {
            } else
            { 
              $scope.counter = 0;
            }
          }
      };
       var cleanupEventcampaignUploadResponseSuccess = $scope.$on("campaignUploadResponseSuccess",function(event,message){

       });

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
              cleanupartworkcampaignsuccess();
              cleanupeventcampaignartworkimagesdeletesuccess();
              cleanupeventcampaignartworkimagesdeleteerror();
    });
}]);


angular.module('prodo.CampaignApp').filter('startFrom', function () {
  return function (input, start) {
    if (input !== undefined || start !== undefined) {
      start = +start;
      return input.slice(start);
    }
  }
})
