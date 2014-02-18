angular.module('prodo.CommonApp').controller('prodoUserProfileDataController', [
  '$scope',
  '$log',
  '$rootScope',
  'UserSessionService',
  '$http',
  function ($scope, $log, $rootScope, UserSessionService, $http) {
    $scope.modaluser = {};
    $scope.userProfileModal = function (data) {
      UserSessionService.getUserProfileData(data);
      console.log(data);
      $scope.$on('getUserDataNotDone', function (event, data) {
      });
    };
    $scope.$on('getUserDataDone', function (event, data) {
      $scope.modaluser = data.success.user;
    });


    $scope.emitProductData=function(prodle,orgid)
    {
        // data9 = {prodle: prodle,orgid:orgid};
        $rootScope.product_prodle=prodle;
        $rootScope.orgid=orgid;
        // $rootScope.$emit('product', data9);
        // console.log("Emit" +data9.prodle); 
        $('#testmodal1').modal('hide');
        $('.modal-backdrop').remove(); 
    };






  }
]);



