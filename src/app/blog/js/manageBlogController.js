angular.module('prodo.BlogApp')
 .controller('ManageBlogController', ['$scope', '$rootScope', '$state', '$http', '$timeout', '$stateParams', '$log', 'growl', 'checkIfSessionExist', 'fileReader','ENV','isLoggedin', 'blogproductdata', 'BlogService', 'getAllblogdata', 'getblogdata', function($scope, $rootScope, $state, $http, $timeout, $stateParams, $log, growl, checkIfSessionExist, fileReader, ENV, isLoggedin, blogproductdata, BlogService, getAllblogdata, getblogdata) {
  $log.debug('initialising manage blog controller...');

  $scope.addNewBlog = false;

  $scope.blogs = [];

  $scope.displayblog = {};

  $scope.editblog = {};

  $scope.form = {};
  $scope.submitted = false;
  $scope.$state = $state;
  $scope.displaySelectedBlog = true;
  $scope.editSelectedBlog = false;

  console.log(blogproductdata);
  console.log(getblogdata);
  console.log(getAllblogdata);

  $scope.blogcategoryList = [];

  $scope.addBlog = function() {
    $scope.addNewBlog = true;
  }

  $scope.cancelAddBlog =function() {
    $scope.productname_err = false;
    $scope.message = '';
    $scope.contentmessage = '';
    $scope.contentblog_err = false;
    $scope.addNewBlog = false;
    $scope.form.addBlogForm.$setPristine();
    $scope.form.addBlogForm.submitted = false;
    $scope.blog = {
      title :  '',
      content: '',
      category: []
    },
    $scope.productname.name = ''
  };

  $scope.productname = {name:'', prodle:''};
  $scope.blog = {
    'title' :  '',
    'content': '',
    'category': []
  };

    $scope.$watch('$state.$current.locals.globals.getAllblogdata', function (getAllblogdata) {
    
      if (getAllblogdata.success && getAllblogdata.success.length !== 0) {
        console.log(getAllblogdata.success.blog);
        $scope.blogs = getAllblogdata.success.blog; 
      } else {
          if (getAllblogdata.error && getAllblogdata.error.code == 'AL001') {
            $rootScope.showModal();
          } else {
            $scope.blogs = []; 
            $log.debug(getAllblogdata.error.message);
          } 
      }
    });

    $scope.$watch('$state.$current.locals.globals.getblogdata', function (getblogdata) {
    
      if (getblogdata.success && getblogdata.success.blog) {
        console.log(getblogdata);
        angular.copy(getblogdata.success.blog, $scope.displayblog);
        angular.copy(getblogdata.success.blog, $scope.editblog);
      } else {
          if (getblogdata.error && getblogdata.error.code == 'AL001') {
            $rootScope.showModal();
          } else {
            console.log(getblogdata);
            $log.debug(getblogdata);
          } 
      }
    });

    $scope.$watch('$state.$current.locals.globals.blogproductdata', function (blogproductdata) {
      if (blogproductdata.success && blogproductdata.success.productname !== undefined) {
        if (blogproductdata.success.productname.length > 0) {
          $scope.productnames = blogproductdata.success.productname;
        } else {
          $scope.productname_err = true;
          $scope.message = "*As of now, there are no products for the category you have selected during author application. Its because the product does not exist or has been deleted. Please use 'User Account Settings' to change your blog category."
        }
      }
    });

  $scope.currentPage = 0;
  $scope.pageSize = 3;
  $scope.numberOfPages = function () {
    return Math.ceil($scope.blogs.length / $scope.pageSize);
  };

  // edit selected blog code starts.................................................

  $scope.imageids = [] ; 

  $scope.checkImage = function(value, imageid){
    if (value === 'true') {
      if ($scope.imageids.indexOf(imageid) < 0) {
        $scope.imageids.push(imageid);
      }      
    } else if (value === 'false') {
      var index = $scope.imageids.indexOf(imageid);
      if (index !== -1) {
        $scope.imageids.splice(index, 1);
      }
    }
  }

  $scope.editCurrentBlog = function(){
    $scope.displaySelectedBlog = false;
    $scope.editSelectedBlog = true;
  }

  $scope.cancelEditBlog = function(){
    $scope.contentmessage = '';
    $scope.contentblog_err = false;
    $scope.form.editBlogForm.$setPristine();
    $scope.form.editBlogForm.submitted = false;
    $scope.displaySelectedBlog = true;
    $scope.editSelectedBlog = false;
  }


    $scope.jsonUpdateBlogData = function()
    {
      var blogdata = 
        {
          blog:
          {
            'title' : $scope.editblog.title,
            'content' : $scope.editblog.content,
            'category' : $scope.editblog.category
          }            
        }
      return JSON.stringify(blogdata); 
    }

    // function to handle server side responses
    $scope.handleUpdateBlogResponse = function(data){
      if (data.success) {
        $scope.cancelEditBlog();
        $state.reload();
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
      $scope.hideSpinner();
    }; 


    // function to handle server side responses
    $scope.handleDeleteBlogImagesResponse = function(data, authorid, blogid){
      if (data.success) {
        BlogService.updateUserBlog($scope.jsonUpdateBlogData(), authorid, blogid);
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


    $scope.saveEditBlog = function(authorid, blogid) {
      if ($scope.form.editBlogForm.$valid) {
        if ($scope.editblog.content.length <= 3000) {
          $scope.showSpinner();
          if ($scope.imageids.length !== 0) {
            BlogService.deleteImages(authorid, blogid, $scope.imageids); 
          } else if ($scope.imageids.length === 0) {
            BlogService.updateUserBlog($scope.jsonUpdateBlogData(), authorid, blogid);
          }
        } else {
          $scope.contentmessage = '*Please enter blog content and should not exceed 3000 characters';
          $scope.contentblog_err = true;
        }
        
      } else {
        $scope.contentmessage = '*Please enter blog content and should not exceed 3000 characters';
        $scope.contentblog_err = true;
        $scope.form.editBlogForm.submitted = true;
      }
    };

    var cleanupEventDeleteBlogImagesDone = $scope.$on("deleteBlogImagesDone", function(event, data, authorid, blogid){
      $scope.handleDeleteBlogImagesResponse(data, authorid, blogid);  
    });

    var cleanupEventDeleteBlogImagesNotDone = $scope.$on("deleteBlogImagesNotDone", function(event, data){
      $rootScope.ProdoAppMessage("It looks as though we have broken something on our server system. Our support team is notified and will take immediate action to fix it." + data, 'error');    
    });

    var cleanupEventUpdateBlogDone = $scope.$on("updateBlogDone", function(event, data){
      $scope.handleUpdateBlogResponse(data);  
    });

    var cleanupEventUpdateBlogNotDone = $scope.$on("updateBlogNotDone", function(event, data){
      $rootScope.ProdoAppMessage("It looks as though we have broken something on our server system. Our support team is notified and will take immediate action to fix it." + data, 'error');    
    });
  
  // display selected blog code starts.................................................

  $scope.showSelectedBlog = function(authorid, blogid) {
    $scope.addNewBlog = false;
    $scope.displaySelectedBlog = true;
    $rootScope.blogid = blogid;
    BlogService.getUserBlog(authorid, blogid);
  };


  // function to handle server side responses
    $scope.handleGetBlogResponse = function(data){
      if (data.success) {
        angular.copy(data.success.blog, $scope.displayblog);
        angular.copy(data.success.blog, $scope.editblog);
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
  

  var cleanupEventGetBlogDone = $scope.$on("getBlogDone", function(event, data){
    $scope.handleGetBlogResponse(data);  
  });

  var cleanupEventGetBlogNotDone = $scope.$on("getBlogNotDone", function(event, data){
    $rootScope.ProdoAppMessage("It looks as though we have broken something on our server system. Our support team is notified and will take immediate action to fix it." + data, 'error');    
  });
  

  // delete selected blog code starts.................................................

  $scope.deleteSelectedBlogModal = function() {
    $('#bloglDeleteModal').modal('show');
  }

  $scope.deleteSelectedBlog = function(authorid, blogid) {
    $rootScope.blogid = blogid;
    BlogService.deleteUserBlog(authorid, blogid);
  };


  // function to handle server side responses
    $scope.handleDeleteBlogResponse = function(data){
      if (data.success) {
        $rootScope.ProdoAppMessage(data.success.message, 'success');
        $state.reload();
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
  

  var cleanupEventDeleteBlogDone = $scope.$on("deleteBlogDone", function(event, data){
    $scope.handleDeleteBlogResponse(data);  
  });

  var cleanupEventDeleteBlogNotDone = $scope.$on("deleteBlogNotDone", function(event, data){
    $rootScope.ProdoAppMessage("It looks as though we have broken something on our server system. Our support team is notified and will take immediate action to fix it." + data, 'error');    
  });
  

    // publish selected blog code starts.................................................

  $scope.publishBlog = function(authorid, blogid) {
    $scope.showSpinner();
    $rootScope.blogid = blogid;
    BlogService.publishUserBlog(authorid, blogid);
  };


  // function to handle server side responses
    $scope.handlePublishBlogResponse = function(data){
      if (data.success) {
        $rootScope.ProdoAppMessage(data.success.message, 'success');
        $state.reload();
      } else {
        if (data.error.code== 'AL001') {     // enter valid data
            $log.debug(data.error.code + " " + data.error.message);
            $rootScope.showModal();
        } else {
            $log.debug(data.error.message);
            $rootScope.ProdoAppMessage(data.error.message, 'error');
        }
      }
      $scope.hideSpinner();
    };  
  

  var cleanupEventPublishBlogDone = $scope.$on("publishBlogDone", function(event, data){
    $scope.handlePublishBlogResponse(data);  
  });

  var cleanupEventPublishBlogNotDone = $scope.$on("publishBlogNotDone", function(event, data){
    $rootScope.ProdoAppMessage("It looks as though we have broken something on our server system. Our support team is notified and will take immediate action to fix it." + data, 'error');    
  });
  

  // add blog code starts.................................................


  $scope.jsonAddBlogData = function()
  {
    var blogdata = 
      {
        blog:
        {
          'productname' : $scope.productname.name.name,
          'title' : $scope.blog.title,
          'content' : $scope.blog.content,
          'category' : $scope.blog.category
        }            
      }
    return JSON.stringify(blogdata); 
  }

  $scope.addBlogForProdle = function()
  {
    return $scope.productname.name.prodle; 
  };

    // function to handle server side responses
    $scope.handleAddBlogResponse = function(data){
      if (data.success) {
        $scope.cancelAddBlog();
        $state.reload();
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
      $scope.hideSpinner();
    };  


    $scope.postBlog = function(productname) {
      if ($scope.form.addBlogForm.$valid) {
        $scope.showSpinner();
        if ($scope.productnames.indexOf(productname) !== -1) {
          if ($scope.blog.content.length <= 3000) {
            $scope.contentblog_err = false;
            $scope.contentmessage = '';
            $scope.productname_err = false;
            $scope.message = '';
            BlogService.addUserBlog($scope.jsonAddBlogData(), $scope.addBlogForProdle());
          } else {
            $scope.contentblog_err = true;
            $scope.contentmessage = '*Please enter blog content and should not exceed 3000 characters';
            $scope.hideSpinner();
          }
        } else {
          $scope.productname_err = true;
          $scope.message = '*Please select product name from the given list only!';
          $scope.hideSpinner();

        }  
      } else {
        $scope.form.addBlogForm.submitted = true;
        $scope.message = '*Please select product name from the given list only!';
        $scope.contentblog_err = true;
        $scope.contentmessage = '*Please enter blog content and should not exceed 3000 characters';
        $scope.hideSpinner();
      }
    };

    var cleanupEventAddBlogDone = $scope.$on("addBlogDone", function(event, data){
      $scope.handleAddBlogResponse(data);  
    });

    var cleanupEventAddBlogNotDone = $scope.$on("addBlogNotDone", function(event, data){
      $rootScope.ProdoAppMessage("It looks as though we have broken something on our server system. Our support team is notified and will take immediate action to fix it." + data, 'error');    
    });


    var cleanupEventAddArtworkBlogDone = $scope.$on("blogUploadResponseSuccess", function(event, success){
      $state.reload();
    });

    $scope.$on('$destroy', function(event, message) {

      cleanupEventAddBlogDone(); 
      cleanupEventAddBlogNotDone();
      cleanupEventGetBlogDone();
      cleanupEventGetBlogNotDone();
      cleanupEventDeleteBlogDone();
      cleanupEventDeleteBlogNotDone();
      cleanupEventPublishBlogDone();
      cleanupEventPublishBlogNotDone();
      cleanupEventUpdateBlogDone();
      cleanupEventUpdateBlogNotDone();
      cleanupEventAddArtworkBlogDone();
      cleanupEventDeleteBlogImagesDone();
      cleanupEventDeleteBlogImagesNotDone();
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