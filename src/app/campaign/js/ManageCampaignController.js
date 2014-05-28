angular.module('prodo.CampaignApp')
 .controller('ManageCampaignController', ['$scope', '$rootScope', '$state', '$http', '$timeout', '$stateParams', '$log', 'growl', 'checkIfSessionExist','currentorgproducts','CampaignService','getAllCampaigns', 'campaigndata', 'fileReader','ENV','isLoggedin', function($scope, $rootScope, $state, $http, $timeout, $stateParams, $log, growl, checkIfSessionExist, currentorgproducts, CampaignService, getAllCampaigns , campaigndata ,fileReader,ENV,isLoggedin) {

    $scope.productlist = {};

    $scope.form = {};

    $scope.targettedAudience = [];

    $scope.regexForText = /^[a-zA-Z\s]*$/;

    $scope.regexForNumbers = /^[0-9]+$/;

    $scope.regexForEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

    $scope.regexForPhno = /^\(?[+]([0-9]{2,5})\)?[-]?([0-9]{10,15})$/;

    $scope.errorForWrongCampaignname = '';

    $scope.errorForCampaignStart = ''; 

    $scope.errorForInvalidEnddate = ''; 

    $scope.invalidDesc = '';

    $scope.showCampaign = 1;

    $scope.$state = $state;

    $scope.addNewCampaign = 0; 

    $scope.campaign = {productName: '',Name:'',Description:'',startDate:'',endDate:'',category:[], campaignBannerText:'', campaignTags : [],prodle:'', campaign_impression : '', resultDate : '' ,impression_limit : ''};

    $scope.errorForInvalidProduct = '';
 
    $scope.campaignDetailsObject = [];

    $scope.campaignName = '';

    $scope.startDate = '';

    $scope.category = [];    $scope.radiovalue = 0;

    $scope.endDate= '';// $scope.endDates = '';

    $scope.productlist = [];

    $scope.prodleContent = 'wrong';

    $scope.addJSON = {"campaigndata": {"name":'',"productname":'',"category":[],"description":'',"startdate":'',"enddate":''}};

    $scope.enableEditing = 0;

    $scope.currentCampaign = {};

    $scope.today = moment().format('YYYY-MM-DD');

    $scope.errorForEmptyCampaigntags = '';
     // pagination
    $scope.currentPage = 0;

    $scope.pageSize = 3;

    $scope.numberOfPages = function () {
      return Math.ceil($scope.campaignDetailsObject.length / $scope.pageSize);
    };
  
    $scope.errorForEmptyCategoryModify = '';
    // pagination
    // $scope.errorForInvalidCategory  = '';
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
    
    $scope.campaignExpired = 0;

    $scope.errorForEmptyCategory = '';

    $scope.showBanner = 4;

    $scope.prodlesOfOrg = [];

    $scope.errorForImproperBanner = '';

    $scope.invalidCampaignImpression = '';

    if (currentorgproducts.error) 
    {
          //$scope.ProdoAppMessage("Currently no products exists in the organization",'error');
    } 
    else 
    {
    	  for(var i=0;i<currentorgproducts.success.product.length ; i++)
    	  {
    	  	$scope.productlist.push(currentorgproducts.success.product[i].name);
          $scope.prodlesOfOrg.push(currentorgproducts.success.product[i].prodle);
    	  }
    }

    var cleanupeventcampaignpublishsuccess = $scope.$on("campaignPublishedSuccessfully", function(event, data){
     if(data.error !== undefined && data.error.code === 'AL001' )
        {
          $rootScope.showModal();
        }
        if(data.success)
        {
           $rootScope.ProdoAppMessage(data.success.message,'success'); 
           $state.reload();
        }
        else {
          if (data.error.code== 'AU004') {     // enter valid data
              $rootScope.ProdoAppMessage(data.error.message,'error');  
          } else {
              $rootScope.ProdoAppMessage(data.error.message,'error');   
          }
        }
    });

    var cleanupeventcampaignpublisherror= $scope.$on("campaignNotPublishedSuccessfully", function(event, data){
           $rootScope.ProdoAppMessage("Some issues with server",'error');
    });
    
    $scope.$watch('$state.$current.locals.globals.campaigndata', function (campaigndata) { 
      if (campaigndata.success) {
         $scope.campaignDetailsObject = campaigndata.success.Product_Campaigns; 
         if($scope.currentCampaignContentId !== undefined && $scope.currentCampaignContentId !== '')
         {
              for(var i=0;i<$scope.campaignDetailsObject.length;i++)
              {
                if($scope.campaignDetailsObject[i].campaign_id === $scope.currentCampaignContentId)
                {
                  $scope.currentCampaign = $scope.campaignDetailsObject[i]; 
                }
              }
         }
         else
         {
          $scope.currentCampaign = $scope.campaignDetailsObject[0]; 
         }          
          var campaignExpiryDate = moment.utc(moment($scope.currentCampaign.enddate));

          var todays = moment.utc(moment());
          
          if(campaignExpiryDate.diff(todays,'days')<0)
          { 
            $scope.campaignExpired = 1 ;
          }
      } else if(campaigndata.error !== undefined && campaigndata.error.code === 'AL001' ) {
          $rootScope.showModal();
      } else if (campaigndata.error) {  
          $scope.noCampaignExists = 0;
      }
      $rootScope.campaign_id = $scope.currentCampaign.campaign_id;
      $rootScope.campaign_prodle = $scope.currentCampaign.prodle;
    });

   $scope.currentCampaignContentId = "";

 // function to send and stringify user registration data to Rest APIs
    $scope.jsonOrgCampaignData = function(){
      if($scope.showBanner === 1)
      {
        $scope.campaign.campaignBannerText = undefined;
      }
      var Data = 
      {    
            'name' : $scope.campaign.Name,
            'productname' : $scope.campaign.productName,
            'enddate': $scope.campaign.endDate,
            'startdate': $scope.campaign.startDate,
            'description': $scope.campaign.Description,
            'category': $scope.campaign.category,
            'bannertext' : $scope.campaign.campaignBannerText,
            'campaign_tags' : $scope.campaign.campaignTags,            
            'impression_limit' : $scope.campaign.impression_limit,
            'resultdate' : $scope.campaign.resultDate,                     
      };
      return Data; 
    }; 

    $scope.errorForInvalidResultDate = '';
    $scope.errorForEndDate = '';

    $scope.saveCampaign = function()
    {     
      $scope.errorForWrongCampaignname = '';  
    	$scope.errorForCampaignStart = ''; 
    	$scope.errorForInvalidEnddate = ''; 
    	$scope.invalidDesc ='';
    	$scope.errorForInvalidProduct = '';
    	$scope.allValid = 0;
    	$scope.errorForInvalidProduct = '';
      $scope.errorForEmptyCategory = '';
      $scope.errorForEmptyCampaigntags = '';
      $scope.errorForImproperBanner = '';
      $scope.invalidCampaignImpression = '';
      $scope.errorForInvalidResultDate = '';
      $scope.errorForEndDate = '';
      //$scope.errorForInvalidCategory = '';
    	$scope.getProdle();

      if($scope.campaign.Name === undefined || $scope.campaign.Name ==='')
      {
                $scope.errorForWrongCampaignname = 'Please enter valid campaign name!';
                $scope.allValid = 1;
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
      if($scope.form.campaign.resultDate.$dirty === false)
      {
              $scope.errorForInvalidResultDate = "Please select valid result date";
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
      if($scope.campaign.category ===undefined || $scope.campaign.category.length === 0)
      {
          $scope.errorForEmptyCategory = 'Please enter atleast one targeted audience category';
          $scope.allValid = 1;
      }
      if($scope.campaign.campaignTags === undefined || $scope.campaign.campaignTags.length === 0 )
      {
           $scope.errorForEmptyCampaigntags = "Please enter valid campaign tags";
           $scope.allValid = 1;
      }
      if($scope.showBanner !== 1 && $scope.showBanner !== 2)
      {
           $scope.errorForImproperBanner = 'Please select atleast one option from above selection';
           $scope.allValid = 1;
      }
      if($scope.showBanner===2 && ($scope.campaign.campaignBannerText === undefined || $scope.campaign.campaignBannerText === '') )
      {
           $scope.errorForImproperBanner = 'Please enter valid banner text';
           $scope.allValid = 1;
      }
      if($scope.campaign.impression_limit === undefined || $scope.campaign.impression_limit === '' || $scope.regexForNumbers.test($scope.campaign.impression_limit) === false )
      {
           $scope.invalidCampaignImpression = 'Please enter valid campaign impression limit';
           $scope.allValid = 1;
      }

      if(moment.utc($scope.campaign.resultDate).diff(moment.utc($scope.campaign.endDate),'days')<0)
      {
          $scope.errorForInvalidResultDate = "Result date can't be lesser than end date";
          $scope.allValid = 1;
      }

      if(moment.utc($scope.campaign.endDate).diff(moment.utc($scope.campaign.startDate),'days')<0)
      {
          $scope.errorForEndDate = "End date can't be lesser than start date";
          $scope.allValid = 1;
      }

      $scope.assignProdleForCampaign($scope.campaign.productName);
      if($scope.allValid === 0 )
      {       
           if($scope.isValidImage==true && $scope.showBanner === 1){
                $scope.socket.emit('addProductCampaign', $rootScope.usersession.currentUser.userid, $rootScope.usersession.currentUser.org.orgid,$scope.prodleContent, $scope.jsonOrgCampaignData(),$scope.file_data);               
            }
            else if ($scope.showBanner === 2)
            {    
                  CampaignService.createCampaign($scope.jsonOrgCampaignData(),$scope.campaign.prodle);
            }
            else if($scope.isValidImage === false && $scope.showBanner === 1)
            {
                  $rootScope.ProdoAppMessage("Please select banner image to upload", 'error');
            }
      }
    };

    $scope.restrictEndDates = function()    { $scope.restrictEndDate = $scope.campaign.startDate;  };

    $scope.jsonOrgCampaignDataModify = function(){
      if($scope.currentCampaign.bannertext === undefined || $scope.currentCampaign.bannertext ==='')
      {
        $scope.currentCampaign.bannertext = '';
      }
        var Data = 
        {
          "campaigndata":
            {
              'name' : $scope.currentCampaign.name,
              'productname' : $scope.currentCampaign.productname,
              'enddate': $scope.currentCampaign.enddate,
              'startdate': $scope.currentCampaign.startdate,
              'description': $scope.currentCampaign.description,
              'category': $scope.currentCampaign.category,
              'bannertext' : $scope.currentCampaign.bannertext,
              'impression_limit' : $scope.currentCampaign.impression_limit,
              'resultdate' : $scope.currentCampaign.resultdate,
            }  
        };
        return JSON.stringify(Data); 
    };

    $scope.errorForEmptyCategoryCampaignTags = '';

    $scope.errorForEmptyBannerText = '';

    $scope.invalidUpdatedCampaignImpression = '';

    $scope.invalidChangedEnddate = '';

    $scope.invalidResDate = '';

    $scope.updateCampaign = function()
    {
        	$scope.errorForWrongCampaignname = '';  
        	$scope.errorForCampaignStart = ''; 
        	$scope.errorForInvalidEnddate = ''; 
        	$scope.invalidDesc ='';
        	$scope.errorForInvalidProduct = '';
        	$scope.allValidContent = 0;
        	$scope.errorForInvalidProduct = '';
          $scope.errorForEmptyCategoryModify = '';
          $scope.errorForEmptyBannerText = '';
          $scope.errorForEmptyCategoryCampaignTags = '';
        	$scope.getProdle();
          $scope.invalidUpdatedCampaignImpression = '';
          $scope.invalidChangedResultDate = '';      
          $scope.invalidChangedEnddate = '';
          $scope.invalidResDate = '';

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

          if($scope.currentCampaign.category === undefined || $scope.currentCampaign.category.length === 0)
          {
               $scope.errorForEmptyCategoryModify = 'Please enter atleast one targeted audience category';
               $scope.allValidContent = 1;
          }

          if($scope.currentCampaign.campaign_tags.length === 0)
          {
            $scope.errorForEmptyCategoryCampaignTags = 'Please enter valid campaign tags';
            $scope.allValidContent = 1;
          }

          if($scope.currentCampaign.impression_limit === undefined || $scope.currentCampaign.impression_limit === '' || $scope.regexForNumbers.test($scope.currentCampaign.impression_limit) === false)
          {
            $scope.invalidUpdatedCampaignImpression = 'Please enter valid campaign impression limit';
            $scope.allValidContent = 1;
          }

          if(moment.utc($scope.currentCampaign.enddate).diff(moment.utc($scope.currentCampaign.startdate),'days')<0)
          {
                $scope.invalidChangedEnddate = "End date can't be lesser than start date";
                $scope.allValidContent = 1;
          }

          // if(moment.utc($scope.currentCampaign.resultdate).diff)
          if(moment.utc($scope.currentCampaign.resultdate).diff(moment.utc($scope.currentCampaign.enddate),'days')<0)
          {
                 $scope.invalidResDate = "Result date can't be lesser than end date";
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
        }
        else {
          if (data.error.code== 'AU004') {     // enter valid data
              $rootScope.ProdoAppMessage(data.error.message,'error');    //ShowAlert
              $state.reload();
          } else {
              $rootScope.ProdoAppMessage(data.error.message,'error');    //ShowError
              $state.reload();
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

    $scope.showDetails = function(campaignName)
    {     
        // $scope.productName = $scope.campaignDetailsObject[index].productname; 
        for(var i=0;i<$scope.campaignDetailsObject.length;i++)
        {

          if(campaignName === $scope.campaignDetailsObject[i].name)
          {
                $scope.currentCampaign = $scope.campaignDetailsObject[i]; 
                $scope.currentCampaignContentId = $scope.currentCampaign.campaign_id;
          }
          else
          { 

          }
             
        } 
        $rootScope.campaign_id = $scope.currentCampaign.campaign_id; $rootScope.campaign_prodle = $scope.currentCampaign.prodle;

        $scope.enableEditing = 0;

        $scope.addNewCampaign = 0;

        $scope.campaignExpired = 0;

        var campaignExpiryDate = moment.utc(moment($scope.currentCampaign.enddate));
        
        var todays = moment.utc(moment());
      
        if(campaignExpiryDate.diff(todays,'days')<0)
        {
          $scope.campaignExpired = 1 ;
        }
    };

    $scope.add = function()
    {
        $scope.addNewCampaign = 1;
        $scope.campaign = {productName: '',Name:'',Description:'',startDate:'',endDate:'',category:[], campaignBannerText:'', campaignTags : [],prodle:'' , impression_limit : '', resultDate:''};
    };

    $scope.cancel = function()
    {
        $scope.addNewCampaign = 0;
        $scope.addNewCampaign = 0;
        $state.transitionTo($state.current, $stateParams, { reload: true, inherit: false, notify: true });
        $scope.campaign = {productName: '',Name:'',Description:'',startDate:'',endDate:'',category:[], campaignBannerText:'', campaignTags : [],prodle:'' , impression_limit : '' , resultDate :''};
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
        }
        else {
          if (data.error.code== 'AU004') {     // enter valid data
              $rootScope.ProdoAppMessage(data.error.message,'error');    //ShowAlert
          } else {
              if(data.error.code === 'AP001')
              {
                    $rootScope.ProdoAppMessage(data.error.message,'error');  
                    $scope.campaign.productName = '';
              }
              else
              {
                  $rootScope.ProdoAppMessage(data.error.message,'error');    //ShowError
              }
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
           $state.reload();
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

     var cleanupeventcampaignbannerupdate = $scope.$on("campaignBannerUploadResponseSuccess", function(event, data){
              $state.reload();
     });

     $scope.publishCampaign = function()
     {    
           CampaignService.publishCampaignNow($scope.currentCampaign.campaign_id);
     };

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
                   else { 
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
                                   $('#addCampaignForm')[0].reset();      
                                }
                           } 
                           else{
                             $rootScope.ProdoAppMessage("Please upload image only", 'error'); 
                              //$scope.campaign = {productName: '',Name:'',Description:'',startDate:'',endDate:'',category:[], campaignBannerText:'', campaignTags : [],prodle:''};

                             // $('#addCampaignForm')[0].reset();      
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
         //$('#addCampaignForm')[0].reset();      
         if (error) {      
              if (error.error.code == 'AP003') { // user already exist
                $log.debug(error.error.code + " " + error.error.message);
                $rootScope.ProdoAppMessage(error.error.message, 'error');
                
              } else if (error.error.code == 'AV001') { // user data invalid
                $scope.ProdoAppMessage(error.error.message, 'error');
                $log.debug('response from server');
                //notify({ message:error.error.message, template:'campaign/js/abc.html'} );
              } else {
                $rootScope.ProdoAppMessage(error.error.message, 'error');  
                if(error.error.code === 'AP001')
                {
                   $scope.campaign.productName = '';
                }
                else
                {
                  $scope.campaign = {productName: '',Name:'',Description:'',startDate:'',endDate:'',category:[], campaignBannerText:'', campaignTags : [],prodle:'' , impression_limit : '' , resultDate : ''};
                }
              }
            } else{
              $scope.imageSrc = JSON.stringify(imagelocation.success.invoiceimage);
              $rootScope.$broadcast("campaignUploadResponseSuccess", "success");
              $rootScope.ProdoAppMessage("Campaign added successfully", 'success'); 
              $state.enableEditing = 0;
              $state.transitionTo($state.current, $stateParams, { reload: true, inherit: false, notify: true });
              $scope.counter++;
              //$log.debug($scope.counter);
              if ($scope.counter < $scope.fileLength) {
              } else
              { 
                $scope.counter = 0;
              }
            }
        };

        $scope.assignProdleForCampaign = function(name)
        {
                 for(var i = 0 ; i<currentorgproducts.success.product.length;i++)
                 {
                      if(name === currentorgproducts.success.product[i].name)
                      {
                        $scope.campaign.prodle = currentorgproducts.success.product[i].prodle;
                        break;
                      }
                      else
                      {
                            $scope.campaign.prodle = 'NONE';
                      }
                 }
        };

        $scope.showBannerImageUpload = function()
        {
              $scope.showBanner = 1;
              $scope.errorForImproperBanner = '';
        };

        $scope.showBannerText = function()
        { 
              $scope.showBanner = 2;
              $scope.errorForImproperBanner = '';
        };

        $scope.showCampaignExpired = 0;

        $scope.showExpiredCampaigns = function()
        {
             $scope.showCampaignExpired = 1;
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
                    cleanupeventcampaignpublishsuccess();
                    cleanupeventcampaignpublisherror();
                    cleanupeventcampaignbannerupdate();
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
