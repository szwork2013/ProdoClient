angular.module('prodo.CommonApp').controller('prodoUserProfileDataController', [
  '$scope',
  '$log',
  '$rootScope',
  'UserSessionService',
  function ($scope, $log, $rootScope, UserSessionService) 
  {

    $scope.modaluser = {products_followed:""};

    $scope.ProductsFollowedMessage="";

    $scope.ProductsRecommendedMessage="";

    $scope.regularExpressionForProdonus = /^prodonus/i;

    $scope.userProfileModal = function (data) 
    {                              
        UserSessionService.getUserProfileData(data);
    };

    var clearEventGetUserDataNotDone = $scope.$on('getUserDataNotDone', function (event, data) {
    });

    var clearEventGetUserDataDone = $scope.$on('getUserDataDone', function (event, data) {  
        $scope.modaluser = data.success.user;
        if($scope.modaluser.products_followed.length === 0)
        {
          $scope.ProductsFollowedMessage = "NO PRODUCTS FOLLOWED";
        }
        else if($scope.modaluser.products_followed.length === 1 && $scope.modaluser.products_followed[0].name === "Prodonus Software")
        {   
          $scope.ProductsFollowedMessage = "NO PRODUCTS FOLLOWED";
        }
        else
        {
          $scope.ProductsFollowedMessage = "PRODUCTS FOLLOWED";
        }
        if($scope.modaluser.products_recommends.length===0)
        {
          $scope.ProductsRecommendedMessage = "";
        }
        else
        {
          $scope.ProductsRecommendedMessage = "RECOMMENDED PRODUCTS";
        }
    });

    $scope.emitProductData = function(prodle,orgid)
    {
        $rootScope.product_prodle = prodle;
        $rootScope.orgid = orgid;
        $('#profileInfoModal').modal('hide');
        $('.modal-backdrop').remove(); 
    };
  
    $scope.$on('$destroy', function(event, message) {
        clearEventGetUserDataNotDone();  
        clearEventGetUserDataDone(); 
    });

  }

]);



