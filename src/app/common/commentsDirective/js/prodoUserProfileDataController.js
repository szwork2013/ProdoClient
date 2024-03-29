angular.module('prodo.CommonApp').controller('prodoUserProfileDataController', [
  '$scope',
  '$log',
  '$rootScope',
  'UserSessionService',
  '$state',
  function ($scope, $log, $rootScope, UserSessionService, $state) 
  {

    $scope.modaluser = {products_followed:""};

    $scope.ProductsFollowedMessage="";

    $scope.ProductsRecommendedMessage="";

    $scope.regularExpressionForProdonus = /^prodonus/i;

    $scope.profilePicDeleteduser = '';

    var profileUserName = '';

    $scope.errorIfUserDoesNotExist = '';

    $scope.userProfileModal = function (data,profilePict,profileName) 
    {   
        $scope.modaluser = {products_followed:""}; 
        $scope.profilePicDeleteduser = '';
        $scope.profileUserName = '';                       
        UserSessionService.getUserProfileData(data,profileName);
        $scope.profilePicDeleteduser = profilePict;
    };

    var clearEventGetUserDataNotDone = $scope.$on('getUserDataNotDone', function (event, data) {
    });

    var clearEventGetUserDataDone = $scope.$on('getUserDataDone', function (event, data , profileUserName) {  
      $scope.errorIfUserDoesNotExist = '';
      if(data.error !== undefined && data.error.code==='AL001')
      {
        $rootScope.showModal();
      }
      else if(data.error !== undefined && data.error.code === "AU003")
      {
           $scope.modaluser = {username:''};
           $scope.modaluser.username = profileUserName;
           $scope.ProductsFollowedMessage="";
           $scope.errorIfUserDoesNotExist = 'This user is deactivated'; 
           $scope.modaluser.profilepic = undefined;
           $('#profileInfoModal').modal('show');
      }
      else
      { 

        $scope.modaluser = data.success.user;
        if($scope.modaluser.products_followed.length === 0)
        {
          $scope.ProductsFollowedMessage = "NO PRODUCTS FOLLOWED";
        }
        else if($scope.modaluser.products_followed.length === 1 && $scope.regularExpressionForProdonus.test("prodonus") === true)
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
        $('#profileInfoModal').modal({ 
              keyboard: false,
              backdrop: 'static',
              show: true
            });
      }
    });
    
 
    $scope.emitProductData = function(prodle,orgid)
    {
        $rootScope.product_prodle = prodle;
        $rootScope.orgid = orgid;
        $('#profileInfoModal').modal('hide');
        $rootScope.$broadcast('emittingOrgidByUserProfile', 'success');
    };
  
    $scope.$on('$destroy', function(event, message) {
        clearEventGetUserDataNotDone();  
        clearEventGetUserDataDone(); 
    });

  }

]);



