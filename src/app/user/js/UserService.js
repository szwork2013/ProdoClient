/**
*User service to get the user details from the REST service 
**/

angular.module('prodo.UserApp')
.factory('UserModel', ['$resource', function($resource) {
  return $resource('/api/user/:userid',
    {},
    {
        findAllUsers: { method: 'GET', isArray: true },
        findByUserId: { method: 'GET', params: { userId : 'id' }},
        saveUser: { method: 'POST'},
        updateUser: { method: 'PUT', params: { userid: '@userid' }, isArray: false},
        deleteUser: { method: 'DELETE', params: { userid: '@userid' }}
    });
    
}])
.factory('UserSigninService', ['$resource', function($resource) {
  return $resource('/api/signin',
    {},
    {
        signinUser: { method: 'POST'}
        // findAllUsers: { method: 'GET', isArray: true },
        // findByUserId: { method: 'GET', params: { userId : 'id' }},
        // updateUser: { method: 'PUT', params: { userid: '@userid' }, isArray: false},
        // deleteUser: { method: 'DELETE', params: { userid: '@userid' }}
    });
    
}])
 