/**
*User services to address user details from the REST service 
**/

angular.module('prodo.UserApp')
.factory('UserSignupService', ['$resource', function($resource) {
  return $resource('/api/user/:userid', {},
    {
      saveUser: { method: 'POST'},
      // findAllUsers: { method: 'GET', isArray: true },
      // findByUserId: { method: 'GET', params: { userId : 'id' }},
      // updateUser: { method: 'PUT', params: { userid: '@userid' }, isArray: false},
      // deleteUser: { method: 'DELETE', params: { userid: '@userid' }}
  });
}])

.factory('UserSigninService', ['$resource', function($resource) {
  return $resource('/api/signin', {},
    {
      signinUser: { method: 'POST'}

      // Services needs to be addressed later:
      // findAllUsers: { method: 'GET', isArray: true },
      // findByUserId: { method: 'GET', params: { userId : 'id' }},
      // updateUser: { method: 'PUT', params: { userid: '@userid' }, isArray: false},
      // deleteUser: { method: 'DELETE', params: { userid: '@userid' }}
  });
}]);
 