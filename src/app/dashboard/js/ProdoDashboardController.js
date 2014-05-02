angular.module('prodo.ProdoWallApp').controller('ProdoDashboardController', [
  '$scope',
  '$rootScope',
  '$state',
  'prodoDashboardService','pieChartProdle','barChartProdle',
  function ($scope, $rootScope, $state, prodoDashboardService,pieChartProdle, barChartProdle) {
   // prodoDashboardService.getChartData();
    $scope.data = [];

    
    // $scope.barChart = function()
    // {
    //   $scope.showBarChart = 1;
    //   return [
    //   {
    //     key : 'Product Ratings',
    //     values : []
    //   }]
    // };


    // $scope.data = [
    //   {
    //     emotionname: 'Awesome',
    //     tagcount: 500
    //   },
    //   {
    //     emotionname: 'Good',
    //     tagcount: 200
    //   },
    //   {
    //     emotionname: 'Average',
    //     tagcount: 900
    //   },
    //   {
    //     emotionname: 'Bad',
    //     tagcount: 700
    //   },
    //   {
    //     emotionname: 'Worst',
    //     tagcount: 400
    //   }
    // ];
    $scope.showPieChart = 0;

    $scope.showBarChart = 0;

    $scope.barChart = function() {
          return [{
              key: 'Product Ratings',
              values: [

              ]
            }];
        };
     
        //  $scope.example = function()
        //  { return
        //    { [
        //         {
        //           'label': 'Awsome ',
        //           'value': 300
        //         },
        //         {
        //           'label': 'Average',
        //           'value': 600
        //         },
        //         {
        //           'label': 'Good',
        //           'value': 200
        //         },
        //         {
        //           'label': 'Bad',
        //           'value': 400
        //         },
        //         {
        //           'label': 'Worst',
        //           'value': 10
        //         },
        //         {
        //           'label': 'Complaints',
        //           'value': 20,
        //         }
        //       ]
        //     } 
        // };


    if(pieChartProdle !== undefined)
    {
      // console.log(pieChartProdle);
        if(pieChartProdle.error!==undefined && pieChartProdle.error.code==='AL001')
        {
          $rootScope.showModal();
        }
        else if(pieChartProdle.error)
        {
           $rootScope.ProdoAppMessage(pieChartProdle.error.message,'error');
        }
        else
        {
            $scope.data = pieChartProdle.success.taganalytics;
            $scope.showPieChart = 1;
       }
    };

    if(barChartProdle !== undefined)
    {
        if(barChartProdle.error!==undefined && barChartProdle.error.code==='AL001')
        {
          $rootScope.showModal();
        }
        else if(barChartProdle.error)
        {
           $rootScope.ProdoAppMessage("Bar chart data not available",'error');$scope.showBarChart = 0;
        }
        else
        {
            $scope.datas = barChartProdle.success.taganalytics;
            $scope.barChart = function() {
            return [{
              key: 'Product Ratings',
              values: $scope.datas,
            }];
        };
            $scope.showBarChart = 1;
       }
    };

     // var cleanEventGetSearchProductNotDone = $scope.$on('notGotDataCharts', function (event, data) {
     //      $rootScope.ProdoAppMessage("There is some issue with the server! Please try after some time",'error');
     // });





  }
]);