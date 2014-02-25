angular.module('prodo.ProdoWallApp').controller('ProdoDashboardController', [
  '$scope',
  '$state',
  'dataFromService',
  function ($scope, $state,dataFromService) {
    console.log("data received from resolve"+ JSON.stringify(dataFromService));
    $scope.data = [
      {
        key: 'Awesome',
        y: 500
      },
      {
        key: 'Good',
        y: 200
      },
      {
        key: 'Average',
        y: 900
      },
      {
        key: 'Bad',
        y: 700
      },
      {
        key: 'Worst',
        y: 400
      }
    ];
  }
]);