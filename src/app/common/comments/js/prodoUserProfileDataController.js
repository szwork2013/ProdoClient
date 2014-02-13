angular.module('prodo.CommonApp').controller('prodoUserProfileDataController', [
  '$scope',
  '$log',
  '$rootScope',
  'prodoCommentService',
  'UserSessionService',
  '$http',
  function ($scope, $log, $rootScope, prodoCommentService, UserSessionService, $http) {
    $scope.modaluser = {};
    $scope.hello = 'hello';
    $scope.userProfileModal = function (data1) {
      prodoCommentService.searchUserData(data1);
      console.log(data1);
      $scope.$on('getUserDataNotDone', function (event, data) {
      });
    };
    $scope.$on('getUserDataDone', function (event, data) {
      $scope.modaluser = data.success.user;
    });


    $scope.emitProductData=function(prodle,orgid)
    {
        data9 = {prodle: prodle,orgid:orgid};
        $rootScope.product_prodle=prodle;
        $rootScope.orgid=orgid;
        $rootScope.$emit('product', data9);
        console.log("Emit" +data9.prodle); 
        $('#testmodal1').modal('hide');
        $('.modal-backdrop').remove(); 
    };






  }
]);



