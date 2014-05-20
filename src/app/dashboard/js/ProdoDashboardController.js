angular.module('prodo.ProdoWallApp').controller('ProdoDashboardController', [
  '$scope',
  '$rootScope',
  '$state',
  'prodoDashboardService','pieChartProdle','trendingChartContent','dashboardSliderData','allChartsData',
  function ($scope, $rootScope, $state, prodoDashboardService,pieChartProdle, trendingChartContent,dashboardSliderData, allChartsData) {
   // prodoDashboardService.getChartData();

    $scope.data = [];

    
    $scope.showPieChart = 0;

    $scope.showBarChart = 0;

    $scope.showTrendingChart = 0;

    $scope.commentTrending = [];

    $scope.commentObjectStructure = {x:'',y:''};

    $scope.commentContent = {"key":"Comments","color":'#ccf',"values":[]};

    $scope.talkinsContent = {"key":"Talkins","color":"#333","values":[]};

    $scope.showSampleDataFordualstack = 1;

    $scope.commentData = [];

    $scope.talkinData = [];

    $scope.allTrendingContent = [];

    $scope.sampleData = [];

    $scope.sampleData = [ 
    { 
      "key" : "Comments" , 
      "bar": true,
      "color": "#ccf",
      "values" : [ [1335758400000,514733],[1333166400000,514733],[1330491600000,690033],[1327986000000,690033],[1325307600000,690033],[1322629200000,475000],[1320033600000,475000],[1317355200000,475000],[1314763200000,1244525],[1312084800000,1194025],[1309406400000,1194025],[1306814400000,1194025],[1304136000000,1194025],[1301544000000,1194025],[1298869200000,1154695],[1296450000000,1154695],[1293771600000,1331875],[1291093200000,1331875],[1288497600000,1331875],[1285819200000,1331875],[1283227200000,1309915],[1280548800000,1309915],[1277870400000,1309915],[1275278400000,1543784],[1272600000000,1543784],[1270008000000,1543784],[1267333200000,1591444],[1264914000000,1591444],[1262235600000,1591444],[1259557200000,1519010],[1256961600000,1519010],[1254283200000,1519010],[1251691200000,1743470],[1249012800000,1743470],[1246334400000,1743470],[1243742400000,1756311],[1241064000000,1756311],[1238472000000,1756311],[1235797200000,1924387],[1233378000000,1924387],[1230699600000,1924387],[1228021200000,2599196],[1225425600000,2599196],[1222747200000,2599196],[1220155200000,2732646],[1217476800000,2732646],[1214798400000,2732646],[1212206400000,2287726],[1209528000000,2287726],[1206936000000,2287726],[1204261200000,2206761],[1201755600000,2206761],[1199077200000,2206761],[1196398800000,2906501],[1193803200000,2906501],[1191124800000,2906501],[1188532800000,2522993],[1185854400000,2522993],[1183176000000,2522993],[1180584000000,2648493]] } , 

    { 
      "key" : "Talkins" ,
      "color" : "#333",
      "values" : [ [ 1136005200000 , 71.89] , [ 1138683600000 , 75.51] , [ 1141102800000 , 68.49] , [ 1143781200000 , 62.72] , [ 1146369600000 , 70.39] , [ 1149048000000 , 59.77] , [ 1151640000000 , 57.27] , [ 1154318400000 , 67.96] , [ 1156996800000 , 67.85] , [ 1159588800000 , 76.98] , [ 1162270800000 , 81.08] , [ 1164862800000 , 91.66] , [ 1167541200000 , 84.84] , [ 1170219600000 , 85.73] , [ 1172638800000 , 84.61] , [ 1175313600000 , 92.91] , [ 1177905600000 , 99.8] , [ 1180584000000 , 121.191] , [ 1183176000000 , 122.04] , [ 1185854400000 , 131.76] , [ 1188532800000 , 138.48] , [ 1191124800000 , 153.47] , [ 1193803200000 , 189.95] , [ 1196398800000 , 182.22] , [ 1199077200000 , 198.08] , [ 1201755600000 , 135.36] , [ 1204261200000 , 125.02] , [ 1206936000000 , 143.5] , [ 1209528000000 , 173.95] , [ 1212206400000 , 188.75] , [ 1214798400000 , 167.44] , [ 1217476800000 , 158.95] , [ 1220155200000 , 169.53] , [ 1222747200000 , 113.66] , [ 1225425600000 , 107.59] , [ 1228021200000 , 92.67] , [ 1230699600000 , 85.35] , [ 1233378000000 , 90.13] , [ 1235797200000 , 89.31] , [ 1238472000000 , 105.12] , [ 1241064000000 , 125.83] , [ 1243742400000 , 135.81] , [ 1246334400000 , 142.43] , [ 1249012800000 , 163.39] , [ 1251691200000 , 168.21] , [ 1254283200000 , 185.35] , [ 1256961600000 , 188.5] , [ 1259557200000 , 199.91] , [ 1262235600000 , 210.732] , [ 1264914000000 , 192.063] , [ 1267333200000 , 204.62] , [ 1270008000000 , 235.0] , [ 1272600000000 , 261.09] , [ 1275278400000 , 256.88] , [ 1277870400000 , 251.53] , [ 1280548800000 , 257.25] , [ 1283227200000 , 243.1] , [ 1285819200000 , 283.75] , [ 1288497600000 , 300.98] , [ 1291093200000 , 311.15] ]
    }
  ];

    $scope.barChart = function() {
          return [{
              key: 'Product Ratings',
              values: [

              ]
            }];
        };
     
    $scope.trending = [];

    // if(pieChartProdle !== undefined)
    // {
    //   // console.log(pieChartProdle);
    //     if(pieChartProdle.error!==undefined && pieChartProdle.error.code==='AL001')
    //     {
    //       $rootScope.showModal();
    //     }
    //     else if(pieChartProdle.error)
    //     {
    //        // $rootScope.ProdoAppMessage(pieChartProdle.error.message,'error');
    //        //$rootScope.ProdoAppMessage('Dashboard chart data not available','error');
    //     }
    //     else
    //     {
    //         $scope.data = pieChartProdle.success.piechart_analytics;
    //         $scope.showPieChart = 1;
    //         $scope.dataForBarChart = pieChartProdle.success.barchart_analytics; 
    //         $scope.barChart = function() {
    //         return [{
    //           key: 'Product Ratings',
    //           values: $scope.dataForBarChart,
    //         }];
    //         };
    //          $scope.showBarChart = 1;
    //    }
    // };

    // if(pieChartProdle === undefined)
    // {
    //     $rootScope.ProdoAppMessage("There is some issue with the server! Please try again after some time",'error');
    // }
    $scope.chartType = ''; $scope.chartName = '';

    $scope.$on('showUniqueChart', function (event, name, query, type) {
          allChartsData.getContent(query); $scope.chartType = type; $scope.chartName = name;
    });

    var cleanupeventGotChartContent = $scope.$on("gotChartDataSuccessfully", function(event, data){
     if(data.error !== undefined && data.error.code === 'AL001' )
        {
          $rootScope.showModal();
        }
        if(data.success)
        {
            $scope.showPieChart = 0;
            $scope.showBarChart = 0;
           // $scope.showSampleDataFordualstack = 0;

            if($scope.chartType === 'Pie Chart')
            {
              $scope.data = pieChartProdle.success.piechart_analytics;
              $scope.showPieChart = 1;
            }
            else if($scope.chartType === 'Bar Chart')
            {
              $scope.dataForBarChart = pieChartProdle.success.barchart_analytics; 
              $scope.barChart = function() {
              return [{
                key: 'Product Ratings',
                values: $scope.dataForBarChart,
              }];
              };
             $scope.showBarChart = 1;

            }
            // else if($scope.chartType === 'Dual Stack')
            // {
            //          $scope.showSampleDataFordualstack = 1;
            // }
        }
        else {
          if (data.error.code== 'AU004') {     // enter valid data
              //$rootScope.ProdoAppMessage(data.error.message,'error');    //ShowAlert
              $rootScope.ProdoAppMessage('No data exists for '+$scope.chartName, 'error');
          } else {
             // $rootScope.ProdoAppMessage(data.error.message,'error');    //ShowError
             $rootScope.ProdoAppMessage('No data exists for '+$scope.chartName, 'error');
          }
        }
    });

    var cleanupeventNotGotChartContent = $scope.$on("notGotChartData", function(event, data){
           $rootScope.ProdoAppMessage("Some issues with server",'error');
    });

    // if(trendingChartContent !== undefined)
    // {
    //                   if(trendingChartContent.error!==undefined && trendingChartContent.error.code==='AL001')
    //                   {
    //                       $rootScope.showModal();
    //                   }
    //                   else if(trendingChartContent.error)
    //                   {
    //                        $rootScope.ProdoAppMessage(trendingChartContent.error.message,'error');
    //                   }
    //                   else
    //                   {
    //                      console.log(JSON.stringify(trendingChartContent));
    //                       if(trendingChartContent.success.commenttrending.length>0)
    //                       {
    //                        var date = '';
    //                        for(var i=0;i<trendingChartContent.success.commenttrending.length;i++)
    //                        {
    //                         var day = trendingChartContent.success.commenttrending[i].date.day;
    //                         var month = trendingChartContent.success.commenttrending[i].date.month;
    //                         var year = trendingChartContent.success.commenttrending[i].date.year;
    //                         var date = year + '-' + month +'-' + day;
    //                         $scope.commentData.push(Date.parse(date));
    //                         $scope.commentData.push(trendingChartContent.success.commenttrending[i].count);
    //                         $scope.commentContent.values.push($scope.commentData);
    //                         $scope.commentData = [];             
    //                        }
    //                       }
    //                       if(trendingChartContent.success.producttrending.length>0)
    //                       {
    //                         for(var i=0;i<trendingChartContent.success.producttrending.length;i++)
    //                         {
    //                                 if(trendingChartContent.success.producttrending[i].x !== null)
    //                                 {
    //                                         $scope.talkinData.push(Date.parse(trendingChartContent.success.producttrending[i].x) );
    //                                         $scope.talkinData.push(trendingChartContent.success.producttrending[i].y);
    //                                         $scope.talkinsContent.values.push($scope.talkinData);
    //                                         $scope.talkinData = [];
    //                                 }
    //                         }
    //                       }  
    //                       $scope.allTrendingContent.push($scope.commentContent);
    //                       $scope.allTrendingContent.push($scope.talkinsContent);
    //                       console.log(JSON.stringify($scope.allTrendingContent));
    //                   }

    // }

    // if(trendingChartContent === undefined)
    // {
    //     $rootScope.ProdoAppMessage("There is some issue with the server! Please try again after some time",'error');
    // }





  }
]);