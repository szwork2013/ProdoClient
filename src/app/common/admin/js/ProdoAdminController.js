angular.module('prodo.AdminApp').controller('ProdoAdminController', [
  '$scope',
  '$rootScope',
  'UserSessionService',
  '$state',
  'isLoggedin',
  'prodoAdminService',
  'chartContent',
  '$stateParams',
  function ($scope, $rootScope, UserSessionService, $state, isLoggedin, prodoAdminService, chartContent, $stateParams) {
	$scope.chart = {'code':'','charts':[]};

  $scope.editCharts = 0;

  $scope.query = {'queryname': '', 'description' : ''};
  
  $scope.assignCodeToCharts = {'code':'', 'chartids':[]};

  $scope.chartsList = [];

  $scope.chartName = [];

  $scope.chart = {'chartname':[]};

  $scope.list = '';

  prodoAdminService.getAllRequest();    $scope.test123 = '';   
  
  $scope.saveQueryContent = function()
  {
           prodoAdminService.addQueryContent($scope.query);
  };

  $scope.codeContent = {};

  var cleanUpEventQueryAddedSuccessfully = $scope.$on('queryAddedSuccessfully', function (event, data) 
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
       $rootScope.ProdoAppMessage(data.success.message,'success');
    }

  });

  var cleanUpEventQueryAddError = $scope.$on('queryNotAddedSuccessfully', function (event, data) {
          $rootScope.ProdoAppMessage("There is some issue with the server! Please try after some time",'error');
  });

  $scope.codeToChange = '';

  $scope.RBONDSCodes = [];

  prodoAdminService.getCodeChartContent();

  $scope.RBONDS = {'code' : ''};

  var cleanUpEventGotContentOfCode = $scope.$on('gotCodeContentSuccess', function (event, data) 
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
      // $rootScope.ProdoAppMessage(data.success.message,'success');
       //console.log('----'+JSON.stringify(data.success));
       $scope.codeContent = data.success.RBONDS_Mapping;
       $scope.RBONDSCodes = [];
       for(var i = 0; i<$scope.codeContent.length; i++)
       {
        $scope.RBONDSCodes.push($scope.codeContent[i].code);
       }

     
    }

  });

  var cleanUpEventNotGotContentOfCode = $scope.$on('notGotCodeContent', function (event, data) {
          $rootScope.ProdoAppMessage("There is some issue with the server! Please try after some time",'error');
  });

  // var cleanUpEventGotAllCharts = $scope.$on('gotAllCharts', function (event, data) 
  // {
  //   if(data.error!==undefined && data.error.code==='AL001')
  //   {
  //     $rootScope.showModal();
  //   }
  //   else if(data.error)
  //   {
  //      $rootScope.ProdoAppMessage(data.error.message,'error');
  //   }
  //   else
  //   {
  //      $scope.chartsList = data.success.doc;
  //      for(var i=0;i<data.success.doc.length;i++)
  //      {
  //       $scope.chartName.push(data.success.doc.chartname);
  //      }
  //   }

  // });

  // var cleanUpEventNotGotAllCharts= $scope.$on('notGotAllCharts', function (event, data) {
  //         $rootScope.ProdoAppMessage("There is some issue with the server! Please try after some time",'error');
  // });
  
  var cleanUpEventQueryAddedSuccessfully = $scope.$on('chartsSubmittedSuccessfully', function (event, data) 
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
       $rootScope.ProdoAppMessage(data.success.message,'success');
    }

  });

  var cleanUpEventQueryAddError = $scope.$on('chartsNotSubmittedSuccessfully', function (event, data) {
          $rootScope.ProdoAppMessage("There is some issue with the server! Please try after some time",'error');
  });

  if(chartContent.success)
  {
          $scope.chartsList = chartContent.success.doc;
           for(var i=0;i<chartContent.success.doc.length;i++)
           {
            $scope.chartName.push(chartContent.success.doc[i].chartname);
           }
  }

  if(chartContent.error)
  {
    $rootScope.ProdoAppMessage('Some error with server', 'error');
  }

  $scope.assignChartIdToCode = function()
  {
    for(var i =0; i<chartsList.length;i++)
    {
      if($scope.chart.chartname === chartsList[i].chartname)
      {

      }
    }
  }

 $scope.showCharts = function()
 {
  return $scope.chartName;
 }

 $scope.assignCodeToChart = function()
 {
  $scope.assignCodeToCharts = {'code':'', 'chartids':[]};
     for( var i=0;i<$scope.chartsList.length;i++)
     {
          // if(document.getElementById(i).checked === true)
          if(document.getElementById(i).checked === true)
          {
            $scope.assignCodeToCharts.chartids.push($scope.chartsList[i].chartid);
          }
     }
    $scope.assignCodeToCharts.code = $scope.chart.code;


    prodoAdminService.insertChartsToCode($scope.assignCodeToCharts);
 };

 $scope.pushToList = function()
 {
      $scope.chart.chartname.push($scope.list);
      console.log($scope.chart.chartname);
 };

 $scope.authorDetails = {};

 $scope.acceptAuthorRequest = function(id, uid)
 { //console.log('userid'+uid);
     prodoAdminService.acceptAuthorRequest(id, uid);
 };

  var cleanUpEventGotAllAuthors = $scope.$on('gotAllRequests', function (event, data) 
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
         $scope.authorDetails = data.success.author; 
    }

  });

  var cleanUpEventNotGotAllAuthors = $scope.$on('notGotAllRequests', function (event, data) {
          $rootScope.ProdoAppMessage("There is some issue with the server! Please try after some time",'error');
  });


  $scope.rejectAuthor = function(content, id)
  {
    prodoAdminService.rejectAuthorRequest(content, id);
  }
  var cleanUpEventRejectAuthorReq = $scope.$on('authorRequestRejected', function (event, data) 
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
        $rootScope.ProdoAppMessage(data.success.message,'success');
        $state.transitionTo($state.current, $stateParams, { reload: true, inherit: false, notify: true });
    }

  });

  var cleanUpEventRejectAuthorError = $scope.$on('authorRequestNotRejected', function (event, data) {
          $rootScope.ProdoAppMessage("There is some issue with the server! Please try after some time",'error');
  });

  var cleanUpEventAuthorRequestAcceptedSuccessfully = $scope.$on('authorRequestAcceptedSuccessfully', function (event, data) 
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
       $rootScope.ProdoAppMessage(data.success.message,'success');
       $state.transitionTo($state.current, $stateParams, { reload: true, inherit: false, notify: true });
    }

  });

  var cleanUpEventAuthorRequestNotAccepted = $scope.$on('authorRequestNotAcceptedSuccessfully', function (event, data) {
          $rootScope.ProdoAppMessage("There is some issue with the server! Please try after some time",'error');
  });

  $scope.edit = function()
  {
    $scope.editCharts = 1;
  };

  $scope.saveChartsContent = function()
  {
    if($scope.RBONDS.code === undefined || $scope.RBONDS.code === '' )
    {
      $rootScope.ProdoAppMessage('Please enter atleast one rbonds category', 'error');
    }
    else
    {
             $scope.updateCodeContent = {'chartids':[]};
             for( var i=0;i<$scope.chartsList.length;i++)
             {
                  if(document.getElementById('I'+i).checked === true)
                  {
                    $scope.updateCodeContent.chartids.push($scope.chartsList[i].chartid);
                  }
             } 

             if($scope.updateCodeContent.chartids.length === 0)
             {
              $rootScope.ProdoAppMessage('Please select atleast one chart for the code selected' , 'error');
             }
             else
             {
                     prodoAdminService.changeCodeContent($scope.RBONDS.code, $scope.updateCodeContent);
              }
    }
  };

  $scope.back = function()
  {
    $scope.editCharts = 0;
  };

  var cleanUpEventCodeUpdatesSuccessfully = $scope.$on('changedCodeContent', function (event, data) 
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
       $rootScope.ProdoAppMessage(data.success.message,'success');
       $state.transitionTo($state.current, $stateParams, { reload: true, inherit: false, notify: true });
    }

  });



  var cleanUpEventCodeUpdatesFailure = $scope.$on('notChangedCodeContent', function (event, data) {
          $rootScope.ProdoAppMessage("There is some issue with the server! Please try after some time",'error');
  });

  	$scope.$on('$destroy', function(event, message) 
  	{
          cleanUpEventQueryAddedSuccessfully();
          cleanUpEventQueryAddError();
          cleanUpEventGotAllAuthors();
          cleanUpEventNotGotAllAuthors();
          cleanUpEventAuthorRequestAcceptedSuccessfully();
          cleanUpEventAuthorRequestNotAccepted();
          cleanUpEventRejectAuthorReq();
          cleanUpEventRejectAuthorError();
          cleanUpEventGotContentOfCode();
          cleanUpEventNotGotContentOfCode();
          cleanUpEventCodeUpdatesFailure();
          cleanUpEventCodeUpdatesSuccessfully();
				
   	});

  }
]);