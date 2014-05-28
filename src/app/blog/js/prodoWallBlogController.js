angular.module('prodo.BlogApp')
 .controller('ProdoWallBlogController', ['$scope', '$rootScope', '$state', '$http', '$timeout', '$stateParams', '$log', 'growl', 'checkIfSessionExist', 'blogSliderData', 'getProductBlogData', 'BlogService', function($scope, $rootScope, $state, $http, $timeout, $stateParams, $log, growl, checkIfSessionExist, blogSliderData, getProductBlogData, BlogService) {
 	$log.debug('initialising wall blog controller...');

 	console.log(getProductBlogData);

  $scope.viewblog = {};
  $scope.selected_image = {};
  $scope.blog_images = [];
  $scope.$state = $state;
  var gridsize = 12;
  $scope.size = '';
  $scope.oddsize = '';
  $scope.upperpartition = '';

  $scope.myInterval = 5000;

  $scope.$watch('$state.$current.locals.globals.getProductBlogData', function (getProductBlogData) {
    
    if (getProductBlogData.success && getProductBlogData.success.doc !== undefined) {
      $scope.viewblog = angular.copy(getProductBlogData.success.doc); 
      if (getProductBlogData.success.doc.blog_images.length !== 0) {
        $scope.blog_images = getProductBlogData.success.doc.blog_images;
        $scope.selected_image = getProductBlogData.success.doc.blog_images[0].image; 
      }      
      if (getProductBlogData.success.doc.blog_images.length >= 1) {
        var length = getProductBlogData.success.doc.blog_images.length;
        $scope.result = length % 2;
        if ($scope.result == 0) {
          $scope.size = (gridsize/length)* 2;
        } else if ($scope.result != 0 && length != 1) {
          $scope.upperpartition = Math.floor( length/2 );
          var lowerpartition = length - $scope.upperpartition;
          $scope.size = (gridsize/lowerpartition);
          $scope.oddsize = (gridsize/$scope.upperpartition);
        }
      }
    } else {
        if (getProductBlogData.error && getProductBlogData.error.code == 'AL001') {
          $rootScope.showModal();
        } else {
          $scope.viewblog = {}; 
          console.log($scope.viewblog);
          $log.debug(getProductBlogData);
        } 
    }
  });

  $scope.checkObj = function(obj) {
    for(var key in obj) {
      if(obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }
  
  $scope.isEmpty = function(){
    if($scope.checkObj($scope.viewblog)) {
      // console.log('object is empty');
      return true;
    } else {
      // console.log('object is not empty');
      return false;
    }
  };
  //Display selected image.................................................

  $scope.showSelectedImage = function(image){
    $scope.selected_image = image;
  }

  $scope.openModal = function(){
    $('#blogImageModal').modal('show');
  };  

  // Display selected blog in product wall.................................

  // function to handle server side responses
    $scope.handleGetUniqueProductBlogResponse = function(data){
      if (data.success) {
        if (data.success.doc !== undefined) {
          angular.copy(data.success.doc, $scope.viewblog);
          if (data.success.doc.blog_images.length !== 0) {
            $scope.blog_images = [];
            $scope.blog_images = data.success.doc.blog_images;
            $scope.selected_image = data.success.doc.blog_images[0].image;
          }
        }
        if (data.success.doc.blog_images.length >= 1) {
          var length = data.success.doc.blog_images.length;
          $scope.result = length % 2;
          if ($scope.result == 0) {
            $scope.size = (gridsize/length)* 2;
          } else if ($scope.result != 0 && length != 1) {
            $scope.upperpartition = Math.floor( length/2 );
            var lowerpartition = length - $scope.upperpartition;
            $scope.size = (gridsize/lowerpartition);
            $scope.oddsize = (gridsize/$scope.upperpartition);
          }
        }
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

  var cleanupEventViewProductBlog = $scope.$on("showUniqueProductBlog", function(event, prodle,blogid) {
    BlogService.getUniqueProductBlog(prodle, blogid);
  });
  

  var cleanupEventUniqueProductBlogDone = $scope.$on("getUniqueProductBlogDone", function(event, data){
    $scope.handleGetUniqueProductBlogResponse(data);
  });

  var cleanupEventUniqueProductBlogNotDone = $scope.$on("getUniqueProductBlogNotDone", function(event, data){
    $rootScope.ProdoAppMessage("It looks as though we have broken something on our server system. Our support team is notified and will take immediate action to fix it." + data, 'error');    
  });

  $scope.$on('$destroy', function(event, data) {
  	cleanupEventUniqueProductBlogDone();
		cleanupEventUniqueProductBlogNotDone();    
    cleanupEventViewProductBlog(); 
  });
  
}]);