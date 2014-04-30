angular.module('prodo.ProdoWallApp').controller('ProdoDashboardController', [
  '$scope',
  '$state',
  function ($scope, $state) {
    $scope.data = [
      {
        key: 'Awesome',
        count: 500
      },
      {
        key: 'Good',
        count: 200
      },
      {
        key: 'Average',
        count: 900
      },
      {
        key: 'Bad',
        count: 700
      },
      {
        key: 'Worst',
        count: 400
      }
    ];
  }
]);