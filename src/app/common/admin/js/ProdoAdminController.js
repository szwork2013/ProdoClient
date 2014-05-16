angular.module('prodo.AdminApp').controller('ProdoAdminController', [
  '$scope',
  '$rootScope',
  'UserSessionService',
  '$state',
  'isLoggedin',
  'prodoAdminService',
  'chartContent',
  function ($scope, $rootScope, UserSessionService, $state, isLoggedin, prodoAdminService, chartContent) {
	$scope.chart = {'code':'','charts':[]};
  $scope.query = {'queryname': '', 'description' : ''};
  
  $scope.assignCodeToCharts = {'code':'', 'chartids':[]};
  $scope.chartsList = [];

  $scope.chartName = [];
  $scope.chart = {'chartname':[]};

  $scope.list = '';
  
  $scope.saveQueryContent = function()
  {
           prodoAdminService.addQueryContent($scope.query);
  };

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
 {$scope.assignCodeToCharts = {'code':'', 'chartids':[]};
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

  	$scope.$on('$destroy', function(event, message) 
  	{

          cleanUpEventQueryAddedSuccessfully();
          cleanUpEventQueryAddError();
				
   	});

  }
]);