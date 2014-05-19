angular.module('prodo.ProdoWallApp').controller('ProdoDashboardController', [
  '$scope',
  '$rootScope',
  '$state',
  'prodoDashboardService','pieChartProdle','trendingChartContent','dashboardSliderData',
  function ($scope, $rootScope, $state, prodoDashboardService,pieChartProdle, trendingChartContent,dashboardSliderData) {
   // prodoDashboardService.getChartData();

    $scope.data = [];

    
    $scope.showPieChart = 0;

    $scope.showBarChart = 0;

    $scope.showTrendingChart = 0;

    $scope.commentTrending = [];

    $scope.commentObjectStructure = {x:'',y:''};

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


    if(trendingChartContent !== undefined)
    {
                      if(trendingChartContent.error!==undefined && trendingChartContent.error.code==='AL001')
                      {
                          $rootScope.showModal();
                      }
                      else if(trendingChartContent.error)
                      {
                           $rootScope.ProdoAppMessage(trendingChartContent.error.message,'error');
                           //$rootScope.ProdoAppMessage('Dashboard chart data not available','error');
                      }
                      else
                      {
                         console.log(JSON.stringify(trendingChartContent));
                          if(trendingChartContent.success.commenttrending.length>0)
                          {
                           var date = '';
                           for(var i=0;i<trendingChartContent.success.commenttrending.length;i++)
                           {
                            var day = trendingChartContent.success.commenttrending[i].date.day;
                            var month = trendingChartContent.success.commenttrending[i].date.month;
                            var year = trendingChartContent.success.commenttrending[i].date.year;
                            var date = year + '-' + month +'-' + day;
                            $scope.commentObjectStructure.x = Date.parse(date);
                            $scope.commentObjectStructure.y = trendingChartContent.success.commenttrending[i].count;
                            $scope.commentTrending.push($scope.commentObjectStructure);
                            console.log("date is "+date);
                            console.log("----- "+JSON.stringify($scope.commentTrending) );
                           }
                          } 
                         // console.log("Trending "+JSON.stringify(trendingChartContent.success.producttrending));
                         // console.log("Comments "+JSON.stringify($scope.commentTrending));
  

                         //$scope.trending = [{"key" : "Talking", values:trendingChartContent.success.producttrending},{"key": "Comments", values : $scope.commentTrending}];
                      $scope.trending = function()
                      { 
                        return [{"key" : "Talking", values:trendingChartContent.success.producttrending},{"key": "Comments", values : $scope.commentTrending}];
                      };
                      console.log("Final objext ----" + JSON.stringify($scope.trending()))
                     // var test = (trendingChartContent.success.producttrending[0].x).split("T");
                      // console.log(test[0]);
                      }



    }

    if(trendingChartContent === undefined)
    {
        $rootScope.ProdoAppMessage("There is some issue with the server! Please try again after some time",'error');
    }





  }
]);