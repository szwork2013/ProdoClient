angular.module('prodo.CommonApp').controller('prodoUserProfileDataController', [
  '$scope',
  '$log',
  '$rootScope',
  'UserSessionService',
  '$http',
  function ($scope, $log, $rootScope, UserSessionService, $http) 
  {
    $rootScope.modaluser = {products_followed:""};
    $rootScope.ProductsFollowedMessage="";
    $rootScope.ProductsRecommendedMessage="";
    $scope.userProfileModal = function (data) 
    {                              
              UserSessionService.getUserProfileData(data);
              //$rootScope.modaluser = {};
              $scope.$on('getUserDataNotDone', function (event, data) {
              });


              var clearresponse = $scope.$on('getUserDataDone', function (event, data) {  
              $rootScope.modaluser = data.success.user;
              if($rootScope.modaluser.products_followed.length===0)
              {
                $rootScope.ProductsFollowedMessage="NO PRODUCTS FOLLOWED";
              }
              else if($rootScope.modaluser.products_followed.length===1 && $rootScope.modaluser.products_followed[0].name==="Prodonus Software")
              {    console.log("here");
                $rootScope.ProductsFollowedMessage="NO PRODUCTS FOLLOWED";
              }
              else
              {
                $rootScope.ProductsFollowedMessage="PRODUCTS FOLLOWED";
              }
              if($rootScope.modaluser.products_recommends.length===0)
              {
                $rootScope.ProductsRecommendedMessage="";
              }
              else
              {
                $rootScope.ProductsRecommendedMessage="RECOMMENDED PRODUCTS";
              }
              clearresponse(); 
            });


    };
    $scope.emitProductData=function(prodle,orgid)
    {
        // data9 = {prodle: prodle,orgid:orgid};
        $rootScope.product_prodle=prodle;
        $rootScope.orgid=orgid;
        // $rootScope.$emit('product', data9);
        // console.log("Emit" +data9.prodle); 
        $('#profileInfoModal').modal('hide');
        $('.modal-backdrop').remove(); 
    };
  




  }
]);



