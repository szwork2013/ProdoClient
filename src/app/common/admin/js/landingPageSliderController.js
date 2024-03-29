angular.module('prodo.AdminApp').controller('LandingPageController', [
  '$scope',
  '$log',
  '$rootScope',
  'UserSessionService',
  '$state',
  'fileReader',
  'ENV',
  'isLoggedin',
  'prodoAdminService',
  function ($scope, $log, $rootScope, UserSessionService, $state, fileReader, ENV, isLoggedin , prodoAdminService) {
	$scope.marketing = {'name':'','description':''};
  $scope.charts = {'name':'','description':'','type':'','category':'', 'queryid' : '', 'queryname' : ''};

   prodoAdminService.getAllQueries();



  $scope.queryList = [];

  $scope.queryTest = [];
  
  var cleanUpEventGotAllQueries = $scope.$on('gotAllQueriesList', function (event, data) 
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
       $scope.queryList = [];
       $scope.queryTest = data.success.doc;
      
       for(var i = 0 ; i< data.success.doc.length; i++)
       {
        $scope.queryList.push(data.success.doc[i].queryname);
       } 
    }

  });

  var cleanUpEventNotGotAllQueries = $scope.$on('notGotAllQueries', function (event, data) {
          $rootScope.ProdoAppMessage("There is some issue with the server! Please try after some time",'error');
  });

	$scope.jsonContent = function()
	{
		var filecontent = {
			'name' : $scope.marketing.name,
			'description' : $scope.marketing.description
		};
		return filecontent;
	};

  $scope.jsonContentForChart = function()
  {
    var filecontent = {
      'chartname' : $scope.charts.name,
      'description' : $scope.charts.description,
      'type' : $scope.charts.type,
      'category' : $scope.charts.category,
      'query' : {
        'queryid' : $scope.charts.queryid,
        'queryname' : $scope.charts.queryname
      }
    };
    return filecontent;
  };

	$scope.submitLangingpageContent = function()
	{
			 $scope.socket.emit('addMarketingData',$rootScope.usersession.currentUser.userid,$scope.jsonContent(),$scope.file_data);               
	};

  $scope.submitDashboardChartContent = function()
  {  $scope.assignQueryIdToChart();  

       $scope.socket.emit('addDashboardCharts',$rootScope.usersession.currentUser.userid,$scope.jsonContentForChart(),$scope.file_data);  
  };



	$scope.socket = io.connect(ENV.apiEndpoint + ENV.port + '/api/prodoupload', 
	{      
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
                                 $('#marketingData')[0].reset();      
                              }
                         } 
                         else{
                           $rootScope.ProdoAppMessage("Please upload image only", 'error'); 
                            $('#marketingData')[0].reset();      
                           }
                        
                          });
                    }
           });  
      };

      $scope.socket.removeAllListeners('addMarketingDataResponse');

      $scope.socket.on('addMarketingDataResponse', function (error, imagelocation) {
               $scope.addMarketingContentResponseHandler(error, imagelocation);
      });

      $scope.addMarketingContentResponseHandler=function(error, imagelocation){
		       $('#marketingData')[0].reset();      
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
		            //$rootScope.$broadcast("campaignUploadResponseSuccess", "success");
		            $rootScope.ProdoAppMessage("Marketing data added successfully", 'success'); 
		            $state.enableEditing = 0;
		            //$state.transitionTo($state.current, $stateParams, { reload: true, inherit: false, notify: true });
		            $scope.counter++;
		            //$log.debug($scope.counter);
		            if ($scope.counter < $scope.fileLength) {
		            } else
		            { 
		              $scope.counter = 0;
		            }
		          }
      };




      $scope.socket.removeAllListeners('addDashboardChartResponse');

      $scope.socket.on('addDashboardChartResponse', function (error, imagelocation) {
               $scope.addChartsResponse(error, imagelocation);
      });

      $scope.addChartsResponse=function(error, imagelocation){
          // $('#marketingData')[0].reset();      
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
                //$rootScope.$broadcast("campaignUploadResponseSuccess", "success");
                $rootScope.ProdoAppMessage("Chart added successfully", 'success'); 
                $state.enableEditing = 0;
                //$state.transitionTo($state.current, $stateParams, { reload: true, inherit: false, notify: true });
                $scope.counter++;
                //$log.debug($scope.counter);
                if ($scope.counter < $scope.fileLength) {
                } else
                { 
                  $scope.counter = 0;
                }
              }
      };

      $scope.assignQueryIdToChart = function()
      {
        for(var i=0; i< $scope.queryTest.length ; i++)
        {
          if($scope.charts.queryname === $scope.queryTest[i].queryname)
          {
            $scope.charts.queryid = $scope.queryTest[i].queryid;
            break;
          }
          else
          {
            $scope.charts.queryid = "";
          }
        }
      }

  	$scope.$on('$destroy', function(event, message) 
  	{
				
   	});






















  }
]);