angular.module('prodo.BlogApp')
 .controller('ManageBlogController', ['$scope', '$rootScope', '$state', '$http', '$timeout', '$stateParams', '$log', 'growl', 'checkIfSessionExist', 'fileReader','ENV','isLoggedin', function($scope, $rootScope, $state, $http, $timeout, $stateParams, $log, growl, checkIfSessionExist, fileReader, ENV, isLoggedin) {
 	$log.debug('initialising manage blog controller...');

 	$scope.addNewBlog = false;

 	$scope.blogs = [];


 	$scope.addBlog = function() {
 		$scope.addNewBlog = true;
 	}

 	$scope.socket = io.connect(ENV.apiEndpoint + ENV.port + '/api/prodoupload', {
        query: 'session_id=' + $rootScope.usersession.currentUser.sessionid
      });
    
      $scope.handleUploadError=function(error){
       $("#bar").hide();
       if(error.code=='AL001'){
            $rootScope.showModal();
          }else{
          $log.debug(error);
          $rootScope.showModal();
        }
      };

    $scope.getFile = function (a) {
         isLoggedin.checkUserSession(
         function (successData) {
                 if (successData.success == undefined) {
                      if(successData.error)
                      {
                         $scope.handleUploadError(successData.error);
                      } 
                 }
                 else { 
                          fileReader.readAsBinaryString(a, $scope).then(function (result) {
                          var action;
                          $scope.imageBfr = result;
                          $scope.file = a;
                          $scope.file_data = {
                            filetype: $scope.file.type,
                            filename: $scope.file.name,
                            filebuffer: $scope.imageBfr
                          };
                          if (($scope.file.type == 'image/jpg') || ($scope.file.type == 'image/png') || ($scope.file.type == 'image/gif') || ($scope.file.type == 'image/jpeg')) {
                            if (($scope.file.size / 1024 < 2048)) {
                                $scope.isValidImage=true;
                              } else {
                                 $rootScope.ProdoAppMessage("Image size must ne less than 2MB", 'error');  
                                 $('#addCampaignForm')[0].reset();      
                              }
                         } 
                         else{
                           $rootScope.ProdoAppMessage("Please upload image only", 'error'); 
                            //$scope.campaign = {productName: '',Name:'',Description:'',startDate:'',endDate:'',category:[], campaignBannerText:'', campaignTags : [],prodle:''};

                           // $('#addCampaignForm')[0].reset();      
                           }
                        
                          });
                    }
           });  
      };

      $scope.socket.removeAllListeners('addProductCampaignResponse');

      $scope.socket.on('addProductCampaignResponse', function (error, imagelocation) {
                     $scope.addProductCampaignResponseHandler(error, imagelocation);
      });

      $scope.addProductCampaignResponseHandler=function(error, imagelocation){
       //$('#addCampaignForm')[0].reset();      
       if (error) {      
            if (error.error.code == 'AP003') { // user already exist
              $log.debug(error.error.code + " " + error.error.message);
              $rootScope.ProdoAppMessage(error.error.message, 'error');
              
            } else if (error.error.code == 'AV001') { // user data invalid
              $scope.ProdoAppMessage(error.error.message, 'error');
              $log.debug('response from server');
              //notify({ message:error.error.message, template:'campaign/js/abc.html'} );
            } else {
              $rootScope.ProdoAppMessage(error.error.message, 'error');  
              if(error.error.code === 'AP001')
              {
                 $scope.campaign.productName = '';
              }
              else
              {
                $scope.campaign = {productName: '',Name:'',Description:'',startDate:'',endDate:'',category:[], campaignBannerText:'', campaignTags : [],prodle:''};
              }
            }
          } else{
            $scope.imageSrc = JSON.stringify(imagelocation.success.invoiceimage);
            $rootScope.$broadcast("campaignUploadResponseSuccess", "success");
            $rootScope.ProdoAppMessage("Campaign added successfully", 'success'); 
            $state.enableEditing = 0;
            $state.transitionTo($state.current, $stateParams, { reload: true, inherit: false, notify: true });
            $scope.counter++;
            //$log.debug($scope.counter);
            if ($scope.counter < $scope.fileLength) {
            } else
            { 
              $scope.counter = 0;
            }
          }
      };

}]);


angular.module('prodo.BlogApp').filter('startFrom', function () {
  return function (input, start) {
    if (input !== undefined || start !== undefined) {
      start = +start;
      return input.slice(start);
    }
  }
})
