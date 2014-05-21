angular.module('prodo.BlogApp')
.factory('BlogGetService', [
  '$resource',
  function ($resource) {
    var BlogS = {
        All_Blog_Data: $resource('/api/blog/:authorid', {}, { getAllBlogs: { method: 'GET'} }),
        Unique_Blog_Data: $resource('/api/blog/:authorid/:blogid', {}, { getUniqueBlog: { method: 'GET' } }),
        Get_Product_For_Blog: $resource('/api/productname/:authorid', {}, { getBlogProduct: { method: 'GET'} })
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
      Get: $resource('/api/blog/:authorid/:blogid', {}, { getBlog: { method: 'GET' } })
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
    return blog;
  }
]);