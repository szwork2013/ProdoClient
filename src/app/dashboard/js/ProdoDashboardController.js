angular.module('prodo.ProdoWallApp').controller('ProdoDashboardController', [
  '$scope',
  '$rootScope',
  '$state',
  'prodoDashboardService','pieChartProdle','trendingChartContent',
  function ($scope, $rootScope, $state, prodoDashboardService,pieChartProdle, trendingChartContent) {
   // prodoDashboardService.getChartData();
    $scope.data = [];

    
    $scope.showPieChart = 0;

    $scope.showBarChart = 0;

    $scope.showTrendingChart = 0;

    $scope.barChart = function() {
          return [{
              key: 'Product Ratings',
              values: [

              ]
            }];
        };
     
    $scope.trending = [];

    if(pieChartProdle !== undefined)
    {
      // console.log(pieChartProdle);
        if(pieChartProdle.error!==undefined && pieChartProdle.error.code==='AL001')
        {
          $rootScope.showModal();
        }
        else if(pieChartProdle.error)
        {
           // $rootScope.ProdoAppMessage(pieChartProdle.error.message,'error');
           //$rootScope.ProdoAppMessage('Dashboard chart data not available','error');
        }
        else
        {
            $scope.data = pieChartProdle.success.piechart_analytics;
            $scope.showPieChart = 1;
            $scope.dataForBarChart = pieChartProdle.success.barchart_analytics;
            $scope.barChart = function() {
            return [{
              key: 'Product Ratings',
              values: $scope.dataForBarChart,
            }];
            };
             $scope.showBarChart = 1;
       }
    };

    if(pieChartProdle === undefined)
    {
        $rootScope.ProdoAppMessage("There is some issue with the server! Please try again after some time",'error');
    }


    // if(trendingChartContent !== undefined)
    // {
    //                   if(trendingChartContent.error!==undefined && trendingChartContent.error.code==='AL001')
    //                   {
    //                       $rootScope.showModal();
    //                   }
    //                   else if(trendingChartContent.error)
    //                   {
    //                        $rootScope.ProdoAppMessage(trendingChartContent.error.message,'error');
    //                        //$rootScope.ProdoAppMessage('Dashboard chart data not available','error');
    //                   }
    //                   else
    //                   {
                         
    //                       if(trendingChartContent.success.commenttrending.length>0)
    //                       {
    //                        var date = '';
    //                        for(var i=0;i<trendingChartContent.success.commenttrending.length;i++)
    //                        {
    //                         var day = trendingChartContent.success.commenttrending[i].date.day;
    //                         var month = trendingChartContent.success.commenttrending[i].date.month;
    //                         var year = trendingChartContent.success.commenttrending[i].date.year;
    //                         var date = year + '-' + month +'-' + day;
    //                         console.log("date is "+date);
    //                        }
    //                       } 
    //                   //   $scope.trending = [{"key" : "Talking", value:trendingChartContent.success.producttrending},{"key": "Comments", values : []}];
    //                   var test = (trendingChartContent.success.producttrending[0].x).split("T");
    //                   console.log(test[0]);
    //                   }



    // }

    // if(trendingChartContent === undefined)
    // {
    //     $rootScope.ProdoAppMessage("There is some issue with the server! Please try again after some time",'error');
    // }





  }
]);