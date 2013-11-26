/**
*User services to address user details from the REST service 
**/

angular.module('prodo.UserApp')
.factory('UserSignupService', ['$resource', function($resource) {
  return $resource('/api/user/signup', {},
    {
      saveUser: { method: 'POST'},
      // findAllUsers: { method: 'GET', isArray: true },
      // findByUserId: { method: 'GET', params: { userId : 'id' }},
      // updateUser: { method: 'PUT', params: { userid: '@userid' }, isArray: false},
      // deleteUser: { method: 'DELETE', params: { userid: '@userid' }}
  });
}])

.factory('UserSigninService', ['$resource', function($resource) {
  return $resource('/api/user/signin', {},
    {
      signinUser: { method: 'POST'}

      // Services needs to be addressed later:
      // findAllUsers: { method: 'GET', isArray: true },
      // findByUserId: { method: 'GET', params: { userId : 'id' }},
      // updateUser: { method: 'PUT', params: { userid: '@userid' }, isArray: false},
      // deleteUser: { method: 'DELETE', params: { userid: '@userid' }}
  });
}])

.factory('UserRecaptchaService', ['$http', 'vcRecaptchaService', function($http, vcRecaptchaService) {
  var recaptchaService= {};
     
  recaptchaService.validate = function($scope) {
    var method = 'POST';
    var inserturl =  '/api/recaptcha'; // URL where the Node.js server is running
    var recaptchadata = 
    { 
      recaptcha: 
              {
              response:  Recaptcha.get_response(),
              challenge: Recaptcha.get_challenge()
              }
    }; 

    var jdata = JSON.stringify(recaptchadata); // The data is to be string.
    
    $http({ 
           method: method,
           url: inserturl,
           data:  jdata ,
           headers: {'Content-Type': 'application/json'},
          }).
       success(function(data) {
              console.log("success"); 
              console.log(data); 
              recaptchaService.handleRecaptchaResponse($scope, data);                      
        }).
       error(function(data) {
            console.log('Failed validation'); 
            vcRecaptchaService.reload(); 
        });
  }; 
  
  recaptchaService.handleRecaptchaResponse = function($scope, data){
    if (data.success) {
      console.log(data.success);
      $scope.$emit("recaptchaDone", "Success");
    } else {
        if (data.error.code== 'AR001') {     // Google recaptcha server down
          console.log(data.error.code + " " + data.error.message);

          $state.transitionTo('home.start');
        }
        else {
        console.log(data.error.message);
         $scope.$emit("recaptchaNotDone", "Failure");
        vcRecaptchaService.reload(); 
        }
        // on error in signup transition occurs to error notification page
      }
  }  
  
  return recaptchaService;
}]);
     
    
    