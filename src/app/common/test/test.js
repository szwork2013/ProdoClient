.factory('emailService', function($http, $q) {

    return {
       signup: function() {
        var d = $q.defer();
        var method = 'POST';
        var inserturl = 'http://localhost/api/signup'; // URL where the Node.js server is running
        var $scope.codeStatus = ""; 
        var formData = {'fullname' : $scope.fullname};

     $scope.fullname = '';

      var jdata = 'mydata='+JSON.stringify(formData); // The data is to be string.

      $http({ // Accessing the Angular $http Service to send data via REST Communication to Node Server.
             method: method,
             url: inserturl,
             data:  jdata ,
             headers: {'Content-Type': 'application/x-www-form-urlencoded'},
       
         }).
         success(function(response) {
                console.log("success"); // Getting Success Response in Callback
                 $scope.codeStatus = response.data;
                console.log($scope.codeStatus);
                d.resolve(response);
                 // customService.list($scope);

         }).
         error(function(response) {
        console.log("error");  //Getting Error Response in Callback
        console.log($scope.codeStatus);
         d.reject();
         });
   }; 
           

        signup: function() {
       var d = $q.defer();
       $http.get('http://localhost/api/emailTemplate').success(function(data) {
          console.log('success');
          console.log('data')
          d.resolve(data);
       }).error(function(){
          console.log('error');
          d.reject();
       });
       return d.promise;
     }
 }     
 
})

	.controller('UserRegistrationController', ['$scope', '$state', 'emailService', function($scope, $state, emailService, userModel) {
		$scope.user = userModel;
       
      // emailService.getEmail().then(function(data) {
      $scope.templates = emailService.getEmail();
     // });
  

 }]);

  app.factory('myCustomService', [ '$http', function($http, $scope) {
        var customService= {};
         
         
          customService.list = function($scope) {
            var url = 'http://localhost:3000/wines'; //URL where the Node.js server is running  
            
            $http.get(url).then(function(response) {
            $scope.users = response.data;
            console.log("success");
            console.log(JSON.stringify(response.data));
            return response.data ;
           },
            function(response){
              console.log("error");
  });
             
             };  
         
        return customService;
  }]);


 app.controller("PostsCtrl", [ '$scope', 'myCustomService', 'vcRecaptchaService', '$http', function($scope, myCustomService, vcRecaptchaService, $http) {
 
       $scope.save = function(){
        myCustomService.postdata($scope, console.log($scope));
          // $scope.save();
       }
        
     }]);
    
..........................................................................................................
app.factory('myCustomService', [ '$http', function($http, $scope) {
        var customService= {};
         
        customService.postdata = function($scope) {
        var method = 'POST';
        var inserturl = 'http://localhost:3000/wines'; // URL where the Node.js server is running
        $scope.codeStatus = ""; 
        var formData = {'fname' : $scope.user.fname};

     $scope.user.fname = '';

      var jdata = 'mydata='+JSON.stringify(formData); // The data is to be string.

      $http({ // Accessing the Angular $http Service to send data via REST Communication to Node Server.
             method: method,
             url: inserturl,
             data:  jdata ,
             headers: {'Content-Type': 'application/x-www-form-urlencoded'},
       
         }).
         success(function(response) {
                console.log("success"); // Getting Success Response in Callback
                 $scope.codeStatus = response.data;
                console.log($scope.codeStatus);
                 // customService.list($scope);

         }).
         error(function(response) {
        console.log("error");  //Getting Error Response in Callback
        console.log($scope.codeStatus);
         });
          
          customService.list($scope);// Calling the list function in Angular Controller to show all current data in HTML
         return false;
   }; 
           
          customService.list = function($scope) {
            var url = 'http://localhost:3000/wines'; //URL where the Node.js server is running  
            
            $http.get(url).then(function(response) {
            $scope.users = response.data;
            console.log("success");
            console.log(JSON.stringify(response.data));
            return response.data ;
           },
            function(response){
              console.log("error");
  });
             
             };  
         
        return customService;
  }]);


 app.controller("PostsCtrl", [ '$scope', 'myCustomService', 'vcRecaptchaService', '$http', function($scope, myCustomService, vcRecaptchaService, $http) {

      console.log("this is your app's controller");   
      $scope.submit = function () {
                    var valid;
                    $scope.codeStatus="";
                    
                    console.log('sending the captcha response to the server', vcRecaptchaService.data());
                    var jdata={
                      privatekey : '6Lcuz-gSAAAAAD8fRiwUQtNYYi__MRHpaI9KudQM',
                      remoteip: "192.168.1.6",
                      response: vcRecaptchaService.data().response,
                      challenge: vcRecaptchaService.data().challenge
                    };
                    // You need to implement your server side validation here.
                    // Send the model.captcha object to the server and use some of the server side APIs to validate it
                    // See https://developers.google.com/recaptcha/docs/
                    $http({ // Accessing the Angular $http Service to send data via REST Communication to Node Server.
             method: 'POST',
             url: 'http://www.google.com/recaptcha/api/verify',
             data:  JSON.stringify(jdata) ,
             dataType: "json",
             headers: {'Content-Type': 'application/x-www-form-urlencoded'},
             header:('Access-Control-Allow-Origin: *'),
             header:('Access-Control-Allow-Methods: POST, GET, OPTIONS'),
             header:('Access-Control-Max-Age: 1000'),
       
         }).
         success(function(data) {
                console.log("success"); // Getting Success Response in Callback
                 $scope.codeStatus = response.data;
                console.log($scope.codeStatus);
                 // customService.list($scope);

         }).
         error(function(response) {
        console.log("error");  //Getting Error Response in Callback
        console.log($scope.codeStatus);
         });
                //     if (valid) {
                //         console.log('Success');

                //     } else {
                //         console.log('Failed validation');

                //         // In case of a failed validation you need to reload the captcha because each challenge can be checked just once
                //         vcRecaptchaService.reload();
                //     }
                };    
 
       $scope.save = function(){
        myCustomService.postdata($scope, console.log($scope));
          // $scope.save();
       }
        
     }]);
    