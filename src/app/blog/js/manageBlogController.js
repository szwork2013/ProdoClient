angular.module('prodo.BlogApp')
 .controller('ManageBlogController', ['$scope', '$rootScope', '$state', '$http', '$timeout', '$stateParams', '$log', 'growl', 'checkIfSessionExist', 'fileReader','ENV','isLoggedin', 'blogproductdata', 'BlogService', 'getAllblogdata', function($scope, $rootScope, $state, $http, $timeout, $stateParams, $log, growl, checkIfSessionExist, fileReader, ENV, isLoggedin, blogproductdata, BlogService, getAllblogdata) {
 	$log.debug('initialising manage blog controller...');

 	$scope.addNewBlog = false;

 	$scope.blogs = [];

  $scope.form = {};
  $scope.submitted = false;
  $scope.$state = $state;

  console.log(blogproductdata);
  // console.log(getblogdata);
  console.log(getAllblogdata);

  $scope.blogcategoryList = [];

 	$scope.addBlog = function() {
 		$scope.addNewBlog = true;
 	}

 	$scope.cancelAddBlog =function() {
 		$scope.addNewBlog = false;
    $scope.form.addBlogForm.$setPristine();
    $scope.blog = {
      productname :  '',
      title :  '',
      content: '',
      category: []
    }
 	};


  $scope.blog = {
    'productname' :  '',
    'title' :  '',
    'content': '',
    'category': []
  };

  if (checkIfSessionExist.success && getAllblogdata.success) { 
    $scope.$watch('$state.$current.locals.globals.getAllblogdata', function (getAllblogdata) {
    
      if (getAllblogdata.success) {
        $scope.blogs = getAllblogdata.success.blog; 
        console.log($scope.blogs);
      } else {
          if (getAllblogdata.error && getAllblogdata.error.code == 'AL001') {
            $rootScope.showModal();
          } else {
            $log.debug(getAllblogdata.error.message);
          } 
      }
    });
  }

    if (blogproductdata.success) {
      $scope.productnames = blogproductdata.success.productname;
    }
 
    $scope.currentPage = 0;
    $scope.pageSize = 3;
    $scope.numberOfPages = function () {
      return Math.ceil($scope.blogs.length / $scope.pageSize);
    };
  
  $scope.jsonAddBlogData = function()
      {
        var blogdata = 
          {
            blog:
            {
              'productname' : $scope.blog.productname,
              'title' : $scope.blog.title,
              'content' : $scope.blog.content,
              'category' : $scope.blog.category
            }            
          }
        return JSON.stringify(blogdata); 
      }

    // function to handle server side responses
    $scope.handleAddBlogResponse = function(data){
      if (data.success) {
        $scope.cancelAddBlog();
        $rootScope.ProdoAppMessage(data.success.message, 'success');
      } else {
        if (data.error.code== 'AL001') {     // enter valid data
            $log.debug(data.error.code + " " + data.error.message);
            $rootScope.showModal();
        } else {
            $log.debug(data.error.message);
            $rootScope.ProdoAppMessage(data.error.message, 'error');
        }
      }
    };  


    $scope.postBlog = function() {
      console.log($scope.jsonAddBlogData());
      if ($scope.form.addBlogForm.$valid) {
        BlogService.addUserBlog($scope.jsonAddBlogData());
      } else {
        $scope.form.addBlogForm.submitted = true;
      }
    };

    var cleanupEventAddBlogDone = $scope.$on("addBlogDone", function(event, data){
      $scope.handleAddBlogResponse(data);  
    });

    var cleanupEventAddBlogNotDone = $scope.$on("addBlogNotDone", function(event, data){
      $rootScope.ProdoAppMessage("It looks as though we have broken something on our server system. Our support team is notified and will take immediate action to fix it." + data, 'error');    
    });

    















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

    $scope.$on('$destroy', function(event, message) {

      cleanupEventAddBlogDone(); 
      cleanupEventAddBlogNotDone();
    });



}]);


angular.module('prodo.BlogApp').filter('startFrom', function () {
  return function (input, start) {
    if (input !== undefined || start !== undefined) {
      start = +start;
      return input.slice(start);
    }
  }
})
