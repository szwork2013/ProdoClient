angular.module('prodo.BlogApp')
.factory('BlogGetService', [
  '$resource',
  function ($resource) {
    var BlogS = {
        All_Blog_Data: $resource('/api/blog/:authorid', {}, { getAllBlogs: { method: 'GET'} }),
        Unique_Blog_Data: $resource('/api/blog/:authorid/:blogid', {}, { getUniqueBlog: { method: 'GET' } }),
        Get_Product_For_Blog: $resource('/api/productname/:authorid', {}, { getBlogProduct: { method: 'GET'} }),
        Get_Wall_Blogs: $resource('/api/productblog/:prodle', {}, { getAllProductBlogs: { method: 'GET'} }),
        Get_Wall_Blog: $resource('/api/productblog/:prodle/:blogid', {}, { getBlog: { method: 'GET'} })
    }
    return BlogS;
  }
]).factory('BlogService', [
  '$rootScope',
  '$resource',
  '$http',
  '$state',
  '$log',
  function ($rootScope, $resource, $http, $state, $log) {
    var BlogService = {
      Add: $resource('/api/blog/:prodle', {}, { addBlog: { method: 'POST', params: { prodle: '@prodle' } } }),
      Publish: $resource('/api/blogpublish/:authorid/:blogid', {}, { publishBlog: { method: 'POST', params: { authorid: '@authorid', blogid: '@blogid' } } }),
      Update: $resource('/api/blog/:authorid/:blogid', {}, { updateBlog: { method: 'PUT', params: { authorid: '@authorid', blogid: '@blogid' } } }),
      Delete: $resource('/api/blog/:authorid/:blogid', {}, { deleteBlog: { method: 'DELETE', params: { authorid: '@authorid', blogid: '@blogid' } } }),
      Get: $resource('/api/blog/:authorid/:blogid', {}, { getBlog: { method: 'GET' } }),
      GetProductBlog: $resource('/api/productblog/:prodle/:blogid', {}, { getWallProductBlog: { method: 'GET', params: { prodle: '@prodle', blogid: '@blogid'}} }),
      Delete_Blog_Images: $resource('/api/blog/image/:authorid/:blogid?imageids=:data', {}, {
        deleteBlogImages: { 
          method: 'DELETE', 
          params: { authorid: '@authorid', blogid: '@blogid', data: '@data' }
        }
      })

    };
    var blog = {};

    blog.addUserBlog = function (blogdata, prodle) {
      BlogService.Add.addBlog({prodle: prodle}, blogdata, function (success) {
        $log.debug(success);
        $rootScope.$broadcast('addBlogDone', success);
      }, function (error) {
        $log.debug(error);
        $rootScope.$broadcast('addBlogNotDone', error.status);
      });
    };

    blog.publishUserBlog = function (authorid, blogid) {
      BlogService.Publish.publishBlog({ authorid: authorid, blogid: blogid }, function (success) {
        $log.debug(success);
        $rootScope.$broadcast('publishBlogDone', success);
      }, function (error) {
        $log.debug(error);
        $rootScope.$broadcast('publishBlogNotDone', error.status);
      });
    };

    blog.updateUserBlog = function (blogdata, authorid, blogid) {
      BlogService.Update.updateBlog({ authorid: authorid, blogid: blogid }, blogdata, function (success) {
        $log.debug(success);
        $rootScope.$broadcast('updateBlogDone', success);
      }, function (error) {
        $log.debug(error);
        $rootScope.$broadcast('updateBlogNotDone', error.status);
      });
    };

    blog.deleteUserBlog = function (authorid, blogid) {
      BlogService.Delete.deleteBlog({ authorid: authorid, blogid: blogid }, function (success) {
        $log.debug(success);
        $rootScope.$broadcast('deleteBlogDone', success);
      }, function (error) {
        $log.debug(error);
        $rootScope.$broadcast('deleteBlogNotDone', error.status);
      });
    };

    blog.getUserBlog = function (authorid, blogid) {
      BlogService.Get.getBlog({ authorid: authorid, blogid: blogid }, function (success) {
        $log.debug(success);
        $rootScope.$broadcast('getBlogDone', success);
      }, function (error) {
        $log.debug(error);
        $rootScope.$broadcast('getBlogNotDone', error.status);
      });
    };

    blog.getUniqueProductBlog = function (prodle, blogid) {
      BlogService.GetProductBlog.getWallProductBlog({ prodle: prodle, blogid: blogid }, function (success) {
        $log.debug(success);
        $rootScope.$broadcast('getUniqueProductBlogDone', success);
      }, function (error) {
        $log.debug(error);
        $rootScope.$broadcast('getUniqueProductBlogNotDone', error.status);
      });
    };

    blog.deleteImages = function (authorid, blogid, imageids) {
      BlogService.Delete_Blog_Images.deleteBlogImages({authorid: authorid, blogid: blogid, data: imageids }, function (success) {
        $log.debug(success);
        $rootScope.$broadcast('deleteBlogImagesDone', success, authorid, blogid);
      }, function (error) {
        $log.debug(error);
        $rootScope.$broadcast('deleteBlogImagesNotDone', error);
      });
    };
    return blog;
  }
])

 .factory('BlogCommentService', ['$resource', function($resource) {
  return $resource('/api/blogcomment/:commentid', {},
  {
    deleteComment: {method: 'DELETE', params: {commentid: "id"}}
  });
}])

 .factory('BlogCommentLoadMoreService', ['$resource', function($resource) {
  return $resource('/api/blog/nextcomments/:commentid', {},
  {
    loadMoreComments: {method: 'GET', params: {commentid: "id"}}
  });
}])