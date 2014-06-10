angular.module('prodo.BlogApp')
 .controller('ProdoWallBlogController', ['$scope', '$rootScope', '$state', '$http', '$timeout', '$stateParams', '$log', 'growl', 'checkIfSessionExist', 'blogSliderData', 'getProductBlogData', 'BlogService','UserSessionService', function($scope, $rootScope, $state, $http, $timeout, $stateParams, $log, growl, checkIfSessionExist, blogSliderData, getProductBlogData, BlogService,UserSessionService) {
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
      $scope.handleBlogComment($scope.viewblog);
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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

  $scope.searchCommentBy;
  $scope.searchBySelected={
      type:'general'
    }
  $scope.searchfields = {};
  $scope.searchfields = [
    {
      name: 'general',
      value: 'commenttext'
    }
  ];
  $scope.commenttagSelected={
     tag:'general'
  };
  $scope.productComments = {
    comments: [{}]
  };
  $scope.tabForComment={
    tabComment:'true',
    tabSearch:'false'
  };
  $scope.type="blog";
  $scope.newProductComment = [];
  $rootScope.productCommentResponsearray = [];
  $scope.mytags;
  $scope.myFeaturetags;
  $scope.count = 0;
  $scope.commenttextField = {
    userComment: ''
  };
  $scope.pretags = [];
  $scope.featuretags = [];
  $scope.productcommentResponseListener;
  $scope.tagPairs = [];
  $scope.ErrMsging=0;   
  $scope.pimgs=[];  
  $rootScope.comment_image_l=[];
  $rootScope.file_data ="";
  $rootScope.count=0;
  $scope.features=[];
  $scope.featuretags=[];
  $scope.showLoadMore={status:false};


  //get login details
  $scope.getUserDetails = function () {
    $scope.userIDFromSession = $rootScope.usersession.currentUser.userid;
    $scope.usernameFromSession = $rootScope.usersession.currentUser.username;
    // $scope.ProductsFollowedFromSession = $rootScope.usersession.currentUser.products_followed;
    $scope.ProductsFollowedFromSession = UserSessionService.productfollowlist
    // $log.debug("Products  f.. "+JSON.stringify( $scope.ProductsFollowedFromSession));
    if ($rootScope.usersession.currentUser.org) {
      $scope.grpnameFromSession = $rootScope.usersession.currentUser.org.grpname;
      $scope.orgidFromSession = $rootScope.usersession.currentUser.org.orgid;
      $scope.orgnameFromSession = $rootScope.usersession.currentUser.org.orgname;
    } else {
      $scope.grpnameFromSession = "";
      $scope.orgnameFromSession = "";
      $scope.orgidFromSession = "";
    }
  }
     $scope.getUserDetails();
  $scope.handleBlogComment=function(viewblog){
    $scope.productComments.length=0;
    console.log(viewblog);

    if(viewblog.blog_comments){

          $scope.productComments=viewblog.blog_comments;
    }
    if ($scope.productComments!==undefined){   
         $("#prodo-comment-media-list").css("display", "block");
    }
    $("#loadMoreCommentMsg").css("display", "none");
    if ( $scope.productComments) {  
       if ( $scope.productComments.length > 4) {
           $scope.showLoadMore.status=true; 
        } 
        else{
            $scope.showLoadMore.status=false; 
        }
      } 
       console.log($scope.productComments);
  }
///////////////////////////////////////////////////////////////////////////////////////////  
}]);