
/* Overview: Upload Controller 
* Controller for all uploads
* Dated: 18/02/2014.
* Author: Bhagyashri Jangam
* Copyright: Prodonus Software Private Limited and GiantLeap Systems Private Limited 2013
* Change History:
*
* date | author | description 
*
* 27-3/2013 | xyx | Add a new property
* 
*/
angular.module('prodo.UploadApp')

.controller('UploadController', ['$scope', '$log', '$rootScope', 'fileReader', 'ENV', 'growl', function ($scope, $log, $rootScope, fileReader, ENV, growl) {

  $scope.socket = io.connect(ENV.apiEndpoint + ENV.port + '/api/prodoupload', {
    query: 'session_id=' + $rootScope.usersession.currentUser.sessionid
  });
  //socket connect 
  $scope.fileLength;
  $scope.uploadSrc;
  $scope.progressbar = 0;
  $scope.counter = 0;

  var UploadErrMsg = document.getElementById('UploadErrMsg');
   var UploadSuccessMsg=document.getElementById('UploadSuccessMsg');
  
  $scope.enableErrorMsg=function(){
     $(".spanErr").css("display", "block");
     $(".alert-danger").removeClass("in").show();
     $(".alert-danger").delay(5000).addClass("in").fadeOut(2000);
    
  };
  $scope.enableSuccessMsg=function(){
    $(".spanSuccess").css("display", "block");
    $(".alert-success").removeClass("in").show();
    $(".alert-success").delay(5000).addClass("in").fadeOut(2000);
    
  };

  $scope.getFile = function (a) {
    $scope.progressbar = 0;
    $log.debug("source: " + $scope.uploadSrc);
    $log.debug("getFile called ... " + a);
    fileReader.readAsBinaryString(a, $scope).then(function (result) {
      $log.debug("reader called ... " + a);
      var action;
      $scope.imageBfr = result;
      $scope.file = a;
      var file_data = {
        filetype: $scope.file.type,
        filename: $scope.file.name,
        filebuffer: $scope.imageBfr
      };
      if (($scope.file.type == 'image/jpg') || ($scope.file.type == 'image/png') || ($scope.file.type == 'image/gif') || ($scope.file.type == 'image/jpeg')) {

        if ($scope.uploadSrc == "user") { // upload user
          if (($scope.file.size / 1024) < 500) {
            action = {
              user: {
                userid: $rootScope.usersession.currentUser.userid
              }
            };
          } else {
             $scope.enableErrorMsg();
             UploadErrMsg.innerHTML = 'Image size must ne less than 500KB';
            // growl.addErrorMessage("Image size must ne less than 500KB");
            $("#bar").hide();
          }
        } else if ($scope.uploadSrc == "product") { // upload product
          if (($scope.file.size / 1024 < 2048)) {
            action = {
              product: {
                userid: $rootScope.usersession.currentUser.userid,
                orgid: $rootScope.usersession.currentUser.org.orgid,
                prodle: $scope.product_prodle
              }
            };
          } else {
             $scope.enableErrorMsg();
             UploadErrMsg.innerHTML = 'Image size must ne less than 2MB';
            // growl.addErrorMessage("Image size must ne less than 2MB");
            $("#bar").hide();
          }
        } else if ($scope.uploadSrc == "org") { // upload org
          if (($scope.file.size / 1024 < 2048)) {
            action = {
              org: {
                userid: $rootScope.usersession.currentUser.userid,
                orgid: $rootScope.usersession.currentUser.org.orgid
              }
            };
          } else {
            $scope.enableErrorMsg();
             UploadErrMsg.innerHTML = 'Image size must ne less than 2MB';
            // growl.addErrorMessage("Image size must ne less than 2MB");
            $("#bar").hide();
          }
        } else if ($scope.uploadSrc == "productlogo") { // upload product logo
          if (($scope.file.size / 1024 < 1024)) {
            action = {
              productlogo: {
                userid: $rootScope.usersession.currentUser.userid,
                orgid: $rootScope.usersession.currentUser.org.orgid,
                prodle: $scope.product_prodle
              }
            };
          } else {
            // growl.addErrorMessage("Image size must ne less than 1MB");
             $scope.enableErrorMsg();
             UploadErrMsg.innerHTML = 'Image size must ne less than 1MB';
            $("#bar").hide();
          }
        } else if ($scope.uploadSrc == "orglogo") { // upload product logo
          if (($scope.file.size / 1024 < 1024)) {
            action = {
              orglogo: {
                userid: $rootScope.usersession.currentUser.userid,
                orgid: $rootScope.usersession.currentUser.org.orgid
              }
            };
          } else {
            $scope.enableErrorMsg();
             UploadErrMsg.innerHTML = 'Image size must ne less than 1MB';
            // growl.addErrorMessage("Image size must ne less than 1MB");
            $("#bar").hide();
          }
        }


      } else { //data 
        if ($scope.uploadSrc == "product") { // upload product
          if (($scope.file.size / 1024 < 10240)) {
            action = {
              product: {
                userid: $rootScope.usersession.currentUser.userid,
                orgid: $rootScope.usersession.currentUser.org.orgid,
                prodle: $scope.product_prodle
              }
            };
          } else {
            $scope.enableErrorMsg();
             UploadErrMsg.innerHTML = 'Image size must ne less than 10MB';
            // growl.addErrorMessage("Image size must ne less than 10MB");
            $("#bar").hide();
          }
        } else if ($scope.uploadSrc == "org") { // upload product
          if (($scope.file.size / 1024 < 10240)) {
            action = {
              org: {
                userid: $rootScope.usersession.currentUser.userid,
                orgid: $rootScope.usersession.currentUser.org.orgid
              }
            };
          } else {
             $scope.enableErrorMsg();
             UploadErrMsg.innerHTML = 'Image size must ne less than 10MB';
            // growl.addErrorMessage("Image size must ne less than 10MB");
            $("#bar").hide();
          }
        } else {
           $scope.enableErrorMsg();
            UploadErrMsg.innerHTML = 'Please upload file of images type...';
          // growl.addErrorMessage("Please upload file of images type...");
          $("#bar").hide();
        }

      }
       // growl.addSuccessMessage("Uploading data");
      $scope.socket.emit('uploadFiles', file_data, action);
      $log.debug("pic emitted");
    });
    //            fileReader.readAsBinaryString($scope.file[a], $scope);
  };

  $scope.socket.removeAllListeners('productUploadResponse');
  $scope.socket.on('productUploadResponse', function (error, imagelocation) {
   $scope.productUploadResponseHandler(error, imagelocation);
  });
    $scope.socket.removeAllListeners('productUploadLogoResponse');
  $scope.socket.on('productUploadLogoResponse', function (error, imagelocation) {
     $scope.productUploadLogoResponseHandler(error, imagelocation);
  });
   $scope.socket.removeAllListeners('orgUploadsResponse');
  $scope.socket.on('orgUploadResponse', function (error, imagelocation) {
    $scope.orgUploadResponseHandler(error, imagelocation);
  });
   $scope.socket.removeAllListeners('orgUploadLogoResponse');
  $scope.socket.on('orgUploadLogoResponse', function (error, imagelocation) {
  $scope.orgUploadLogoResponseHandler(error, imagelocation);
  });
   $scope.socket.removeAllListeners('userUploadResponse');
  $scope.socket.on('userUploadResponse', function (error, imagelocation) {
    $scope.userUploadResponseHandler(error, imagelocation);
  });

$scope.productUploadResponseHandler=function(error, imagelocation){
 if (error) {
      $("#bar").hide();

      if (error.error.code == 'AP003') { // user already exist
        $log.debug(error.error.code + " " + error.error.message);
        $scope.enableErrorMsg();
        UploadErrMsg.innerHTML = "Error while uploading " + $scope.file.name + " " + error.error.message;
        // growl.addErrorMessage("Error while uploading " + $scope.file.name + " " + error.error.message);
      } else if (error.error.code == 'AV001') { // user data invalid
        $log.debug(error.error.code + " " + error.error.message);
        $scope.enableErrorMsg();
        UploadErrMsg.innerHTML = "Error while uploading "+ $scope.file.name + " " + error.error.message;
        // growl.addErrorMessage(" Error while uploading " + $scope.file.name + " " + error.error.message);
      } else {
        $log.debug(error.error.message);
        $scope.enableErrorMsg();
        UploadErrMsg.innerHTML = "Error while uploading "+ $scope.file.name + " " + error.error.message;
        // growl.addErrorMessage("Error while uploading " + $scope.file.name + " " + error.error.message);
      }

    } else {
      $scope.imageSrc = JSON.stringify(imagelocation);
      $log.debug("getting response for product upload  " + $scope.imageSrc);
      $scope.enableSuccessMsg();
      UploadSuccessMsg.innerHTML = 'File Uploaded successfully...';
      // growl.addSuccessMessage("File Uploaded successfully...");
      $scope.counter++;
      $log.debug($scope.counter);
      if ($scope.counter < $scope.fileLength) {
        $log.debug("emitting image " + $scope.counter);
        //    $scope.getFile($scope.counter);
      } else $scope.counter = 0;
    }
    
};

$scope.productUploadLogoResponseHandler=function(error, imagelocation){
         // growl.addSuccessMessage("after uploading");
    if (error) {
      $("#bar").hide();
     if (error.error.code == 'AP003') { // user already exist
        $log.debug(error.error.code + " " + error.error.message);
         $scope.enableErrorMsg();
        UploadErrMsg.innerHTML = "Error while uploading "+ $scope.file.name + " " + error.error.message;
        // growl.addErrorMessage("Error while uploading " + $scope.file.name + " " + error.error.message);
      } else if (error.error.code == 'AV001') { // user data invalid
        $log.debug(error.error.code + " " + error.error.message);
        $scope.enableErrorMsg();
        UploadErrMsg.innerHTML = "Error while uploading "+ $scope.file.name + " " + error.error.message;
        // growl.addErrorMessage("Error while uploading " + $scope.file.name + " " + error.error.message);
      } else {
        $log.debug(error.error.message);
         $scope.enableErrorMsg();
        UploadErrMsg.innerHTML = "Error while uploading "+ $scope.file.name + " " + error.error.message;
        // growl.addErrorMessage("Error while uploading " + $scope.file.name + " " + error.error.message);

      }
    } else {
      $scope.imageSrc = JSON.stringify(imagelocation);
      $log.debug("getting response for logo upload  " + $scope.imageSrc);
      // growl.addSuccessMessage("File Uploaded successfully...");
      $scope.enableSuccessMsg();
      UploadSuccessMsg.innerHTML = 'File Uploaded successfully...';
      
      $scope.imageSrc = imagelocation;
      $scope.counter++;
      $log.debug($scope.counter);
      if ($scope.counter < $scope.fileLength) {
        $log.debug("emitting image " + $scope.counter);
        //    $scope.getFile($scope.counter);
      } else $scope.counter = 0;
    }
};
 
  $scope.orgUploadResponseHandler=function(error, imagelocation){
   if (error) {
      $("#bar").hide();

      if (error.error.code == 'AP003') { // user already exist
        $log.debug(error.error.code + " " + error.error.message);
        $scope.enableErrorMsg();
        UploadErrMsg.innerHTML = "Error while uploading "+ $scope.file.name + " " + error.error.message;
        // growl.addErrorMessage("Error while uploading " + $scope.file.name + " " + error.error.message);
      } else if (error.error.code == 'AV001') { // user data invalid
        $log.debug(error.error.code + " " + error.error.message);
        $scope.enableErrorMsg();
        UploadErrMsg.innerHTML = "Error while uploading "+ $scope.file.name + " " + error.error.message;
        // growl.addErrorMessage("Error while uploading " + $scope.file.name + " " + error.error.message);
      } else {
        $log.debug(error.error.message);
        $scope.enableErrorMsg();
        UploadErrMsg.innerHTML = "Error while uploading "+ $scope.file.name + " " + error.error.message;
        // growl.addErrorMessage("Error while uploading " + $scope.file.name + " " + error.error.message);
      }

    } else {
      $log.debug("getting response for org upload  " + imagelocation);
      $scope.enableSuccessMsg();
      UploadSuccessMsg.innerHTML = 'File Uploaded successfully...';
      $scope.imageSrc = imagelocation;
      $scope.counter++;
      $log.debug($scope.counter);
      if ($scope.counter < $scope.fileLength) {
        $log.debug("emitting image " + $scope.counter);
        //    $scope.getFile($scope.counter);
      } else $scope.counter = 0;
    }
  };

   $scope.orgUploadLogoResponseHandler=function(error, imagelocation){
       if (error) {
      $("#bar").hide();

      if (error.error.code == 'AP003') { // user already exist
        $log.debug(error.error.code + " " + error.error.message);
        $scope.enableErrorMsg();
        UploadErrMsg.innerHTML = "Error while uploading "+ $scope.file.name + " " + error.error.message;
        // growl.addErrorMessage("Error while uploading " + $scope.file.name + " " + error.error.message);
      } else if (error.error.code == 'AV001') { // user data invalid
        $log.debug(error.error.code + " " + error.error.message);
        $scope.enableErrorMsg();
        UploadErrMsg.innerHTML = "Error while uploading "+ $scope.file.name + " " + error.error.message;
        // growl.addErrorMessage("Error while uploading " + $scope.file.name + " " + error.error.message);
      } else {
        $log.debug(error.error.message);
        $scope.enableErrorMsg();
        UploadErrMsg.innerHTML = "Error while uploading "+ $scope.file.name + " " + error.error.message;
        // growl.addErrorMessage("Error while uploading " + $scope.file.name + " " + error.error.message);
      }

    } else {
      $log.debug("getting response for org upload logo " + imagelocation);
      // growl.addSuccessMessage("File uploaded");
      $scope.enableSuccessMsg();
      UploadSuccessMsg.innerHTML = 'File Uploaded successfully...';
      $scope.imageSrc = imagelocation;
      $scope.counter++;
      $log.debug($scope.counter);
      if ($scope.counter < $scope.fileLength) {
        $log.debug("emitting image " + $scope.counter);
        //    $scope.getFile($scope.counter);
      } else $scope.counter = 0;
    }
  };

     $scope.userUploadResponseHandler=function(error, imagelocation){
     if (error) {
      $("#bar").hide();

      if (error.error.code == 'AP003') { // user already exist
        $log.debug(error.error.code + " " + error.error.message);
        $scope.enableErrorMsg();
        UploadErrMsg.innerHTML = "Error while uploading "+ $scope.file.name + " " + error.error.message;
        // growl.addErrorMessage("Error while uploading " + $scope.file.name + " " + error.error.message);
      } else if (error.error.code == 'AV001') { // user data invalid
        $log.debug(error.error.code + " " + error.error.message);
        $scope.enableErrorMsg();
        UploadErrMsg.innerHTML = "Error while uploading "+ $scope.file.name + " " + error.error.message;
        // growl.addErrorMessage("Error while uploading " + $scope.file.name + " " + error.error.message);
      } else {
        $log.debug(error.error.message);
        $scope.enableErrorMsg();
        UploadErrMsg.innerHTML = "Error while uploading "+ $scope.file.name + " " + error.error.message;
        // growl.addErrorMessage("Error while uploading " + $scope.file.name + " " + error.error.message);
      }

    } else {
      $log.debug("getting response for user upload  " + imagelocation);
      $scope.enableSuccessMsg();
      UploadSuccessMsg.innerHTML = 'File Uploaded successfully...';
      $scope.imageSrc = imagelocation;
      $scope.counter++;
      $log.debug($scope.counter);
      if ($scope.counter < $scope.fileLength) {
        $log.debug("emitting image " + $scope.counter);
        //    $scope.getFile($scope.counter);
      } else $scope.counter = 0;
    }
  };

}]);

angular.module('prodo.UploadApp')
.directive('ngFileSelect', ['fileReader', function( ) {
  return {
    link: function ($scope, el) {
      el.bind("change", function (e) {
        $scope.file = (e.srcElement || e.target).files;
        //console.log($scope.file);
        $scope.fileLength = (e.srcElement || e.target).files;
        //console.log("counter= " + $scope.counter);
        $scope.file = (e.srcElement || e.target).files;
        if ($scope.uploadSrc == "user") $scope.getFile($scope.file[0]);
        var addUploads = function (i) {
            var FileName = document.createElement("label");
            FileName.type = 'label';
            var title = document.createTextNode("File " + i.name);
            FileName.appendChild(title);
            FileName.name = 'label';
            FileName.setAttribute("style", "text-align:left");
            var fn = document.getElementById("FileName");
            fn.appendChild(FileName);
            fn.style.width = '400px';
            var progressbarc = document.createElement("div");
            progressbarc.className = ' progress progress-info progress-striped active';
            progressbarc.id = "a2" + i.name;
            progressbarc.style.textAlign = "left";
            fn.appendChild(progressbarc);
            var progressbar = document.createElement("div");
            progressbar.className = 'bar';
            progressbar.id = 'bar';
            var a = document.getElementById("a2" + i.name);
            progressbar.style.width = '300px';
            a.appendChild(progressbar);
            var progress = setInterval(function () {
              var $bar = $('.bar');
              if ($bar.width() == 400) {
                clearInterval(progress);
                $('.progress').removeClass('active');
              } else {
                $bar.width($bar.width() + 40);
              }
              //    $bar.text($bar.width() / 4 + "%");
            }, 800);

            FileName = "";
            title = "";
            fn = "";
            progressbarc = "";
            progressbar = "";
            progress = "";
            a = "";
          }

        for (var i = 0; i <= $scope.file.length; i++) {
          addUploads($scope.file[i]);
          $scope.getFile($scope.file[i]);
        }
     })
    }
  }
}]);

(function (module) {
  var fileReader = function ($q, $log) {
      var onLoad = function (reader, deferred, scope) {
          return function () {
            scope.$apply(function () {
              deferred.resolve(reader.result);
            });
          };
        };
      var onError = function (reader, deferred, scope) {
          return function () {
            scope.$apply(function () {
              deferred.reject(reader.result);
            });
          };
        };
      var onProgress = function (reader, scope) {
          return function (event) {

            scope.$broadcast("fileProgress", {
              total: event.total,
              loaded: event.loaded
            });
          };
        };
      var getReader = function (deferred, scope) {
          var reader = new FileReader();
          reader.onload = onLoad(reader, deferred, scope);
          reader.onerror = onError(reader, deferred, scope);
          reader.onprogress = onProgress(reader, scope);
          return reader;
        };
      var readAsBinaryString = function (file, scope) {
          var deferred = $q.defer();
          var reader = getReader(deferred, scope);
          reader.readAsBinaryString(file);
          return deferred.promise;
        };
      return {
        readAsBinaryString: readAsBinaryString
      };
    };
  module.factory("fileReader", ["$q", "$log", fileReader]);
}(angular.module("prodo.UploadApp")));