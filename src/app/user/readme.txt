// UserModel.update($scope.jsonUserData());
      // UserModel.saveUser({}, $scope.jsonUserData());
      // UserModel.update({userid: 'u35'}, $scope.jsonUserData(), function(success){
      //   console.log(success);
      // }, function(error){
      //   console.log(error);
      // });
      // $scope.clearformData();
      // UserModel.saveUser($scope.jsonUserData(), function(success){
      //   console.log(success);
      // }, function(error){
      //   console.log(error);
      // });
      // $scope.clearformData();
//   $scope.user = userModel.;
    //     $scope.message = [{
    //       "type": "info",
    //       "content": "Please check your email for verification link and activate your account with Prodonus."
    // },{
    //     "type": "danger",
    //     "content": "User already exists. Please signup with a different user account."
    // }];

// // .factory('signupService', ['$http', '$state', 'userModel', function( $http, $state, userModel, $scope) {
//         var signupService= {};

//         
         
//         signupService.postdata = function($scope) {
//         var method = 'POST';
//         var inserturl = 'http://localhost/api/signup'; // URL where the Node.js server is running
//         // $scope.user=userModel;
//         // console.log(userModel);
//         var userFormData = {'fullname' : $scope.user.fullname,
//                         'email' : $scope.user.email,
//                         'password' : $scope.user.password
                         
//                       };
//      //    $scope.fullname = '';
//      // $scope.email = '';
//      // $scope.password = '';
     
//       var userRegistrationData = JSON.stringify(userFormData); 
      

//       $http({ // Accessing the Angular $http Service to send data via REST Communication to Node Server.
//              method: method,
//              url: inserturl,
//              data:  userRegistrationData ,
//              headers: {'Content-Type': 'application/json'},
       
//          }).
//          success(function(data) {
//                 console.log("success"); 
//                 console.log("This is my data: " + data);
//                 console.log(data);
//                  signupService.verifyUser(data);// Getting Success Response in Callback
                
//           }).
//         error(function(data) {
//         console.log("error");  //Getting Error Response in Callback

//          });
          
//           // customService.list($scope);// Calling the list function in Angular Controller to show all current data in HTML
//          return false;
//    };   
//          return signupService;
//   }])	