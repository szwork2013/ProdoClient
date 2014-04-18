
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

.controller('UploadController', ['$scope', '$log', '$rootScope', 'fileReader', 'ENV', 'growl','isLoggedin','notify', function ($scope, $log, $rootScope, fileReader, ENV, growl,isLoggedin,notify) {

  $scope.socket = io.connect(ENV.apiEndpoint + ENV.port + '/api/prodoupload', {
    query: 'session_id=' + $rootScope.usersession.currentUser.sessionid
  });
  //socket connect 
  $scope.fileLength;
  $scope.uploadSrc;
  $scope.progressbar = 0;
  $scope.counter = 0;
  $rootScope.currentclient={name:''};

  // var UploadErrMsg = document.getElementById('UploadErrMsg');
  //  var UploadSuccessMsg=document.getElementById('UploadSuccessMsg');
  
  // $scope.enableErrorMsg=function(){
  //    $(".spanErr").css("display", "block");
  //    $(".spanProdERR").css("display", "none");
  //    $(".spanProdFERR").css("display", "none");
  //    $(".spanProdIMGERR").css("display", "none");
  //    $(".alert-danger").removeClass("in").show();
  //    $(".alert-danger").delay(5000).addClass("in").fadeOut(2000);
    
  // };
  // $scope.enableSuccessMsg=function(){
  //   $(".spanSuccess").css("display", "block");
  //   $(".spanProdSuccess").css("display", "none");
  //   $(".spanProdFSuccess").css("display", "none");
  //   $(".spanProdIMGSuccess").css("display", "none");
  //   $(".alert-success").removeClass("in").show();
  //   $(".alert-success").delay(5000).addClass("in").fadeOut(2000);
    
  // };
  $scope.handleUploadError=function(error){
   $("#bar").hide();
   if(error.code=='AL001'){
        $rootScope.showModal();
      }else{
      $log.debug(error);
      $rootScope.showModal();
    }
  };

$scope.getFile = function (a) {
 isLoggedin.checkUserSession(
 function (successData) {
 if (successData.success == undefined) {
  if(successData.error)
  {
   $scope.handleUploadError(successData.error);
  } 
 }
 else { //add comment

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
             // $scope.enableErrorMsg();
             // UploadErrMsg.innerHTML = 'Image size must ne less than 500KB';
            notify({message:" Image size must ne less than 500KB",template:'common/notification/views/notification-error.html',position:'center'});
            // growl.addErrorMessage("Image size must ne less than 500KB");
            $("#bar").hide();
            setTimeout(function(){ jQuery("#FileName").hide(); },1000);
          }
        } else if ($scope.uploadSrc == "product") { // upload product

          // if($scope.file.type !== 'image/png' ){
           if (($scope.file.size / 1024 < 2048)) {
            action = {
              product: {
                userid: $rootScope.usersession.currentUser.userid,
                orgid: $rootScope.usersession.currentUser.org.orgid,
                prodle: $rootScope.currentProdleRoot
              }
            };
          } else {
             // $scope.enableErrorMsg();
             // UploadErrMsg.innerHTML = 'Image size must ne less than 2MB';
           notify({message:" Image size must ne less than 2MB",template:'common/notification/views/notification-error.html',position:'center'});
            // growl.addErrorMessage("Image size must ne less than 2MB");
            $("#bar").hide();
            setTimeout(function(){ jQuery("#FileName").hide(); },1000);
          }
          // }
          // else{
          //    $scope.enableErrorMsg();
          //    UploadErrMsg.innerHTML = 'Please select image other than png';
          //   // growl.addErrorMessage("Image size must ne less than 2MB");
          //   $("#bar").hide();
          //   setTimeout(function(){ jQuery("#FileName").hide(); },1000);
          // }
     


        }else if ($scope.uploadSrc == "orgkeyclient") { // upload product

          // if($scope.file.type !== 'image/png' ){

           if (($scope.file.size / 1024 < 2048)) {
            if($rootScope.currentclient.name){
            action = {
              orgkeyclient: {
                userid: $rootScope.usersession.currentUser.userid,
                orgid: $rootScope.usersession.currentUser.org.orgid,
                clientname: $rootScope.currentclient.name
              }
            };
          }
          else{
              notify({message:" Please enter key client name",template:'common/notification/views/notification-error.html',position:'center'});
              $("#spinner").hide();
              $("#bar").hide();
              setTimeout(function(){ jQuery("#FileName").hide(); },1000);
          }
          } else {
             // $scope.enableErrorMsg();
             // UploadErrMsg.innerHTML = 'Image size must ne less than 2MB';
             notify({message:" Image size must ne less than 2MB",template:'common/notification/views/notification-error.html',position:'center'});
            // growl.addErrorMessage("Image size must ne less than 2MB");
            $("#bar").hide();
            setTimeout(function(){ jQuery("#FileName").hide(); },1000);
          }
          // }
          // else{
          //    $scope.enableErrorMsg();
          //    UploadErrMsg.innerHTML = 'Please select image other than png';
          //   // growl.addErrorMessage("Image size must ne less than 2MB");
          //   $("#bar").hide();
          //   setTimeout(function(){ jQuery("#FileName").hide(); },1000);
          // }
     


        }  
        else if ($scope.uploadSrc == "campaign") { // upload product

          // if($scope.file.type !== 'image/png' ){

           if (($scope.file.size / 1024 < 2048)) {
        
            action = {
              campaign: {
                userid: $rootScope.usersession.currentUser.userid,
                 campaign_id:$rootScope.campaign_id
              }
            };
                 
          } else {
             // $scope.enableErrorMsg();
             // UploadErrMsg.innerHTML = 'Image size must ne less than 2MB';
             notify({message:" Image size must ne less than 2MB",template:'common/notification/views/notification-error.html',position:'center'});
            // growl.addErrorMessage("Image size must ne less than 2MB");
            $("#bar").hide();
            setTimeout(function(){ jQuery("#FileName").hide(); },1000);
          }
      
        }  
        else if ($scope.uploadSrc == "warranty") { // upload product

          // if($scope.file.type !== 'image/png' ){
           if (($scope.file.size / 1024 < 2048)) {
            action = {
              warranty: {
                userid: $rootScope.usersession.currentUser.userid,
                warranty_id: $rootScope.Upload_warranty_id
              }
            };
          } else {
             // $scope.enableErrorMsg();
             // UploadErrMsg.innerHTML = 'Image size must ne less than 2MB';
             notify({message:" Image size must ne less than 2MB",template:'common/notification/views/notification-error.html',position:'center'});
            // growl.addErrorMessage("Image size must ne less than 2MB");
            $("#bar").hide();
            setTimeout(function(){ jQuery("#FileName").hide(); },1000);
          }
          // }
          // else{
          //    $scope.enableErrorMsg();
          //    UploadErrMsg.innerHTML = 'Please select image other than png';
          //   // growl.addErrorMessage("Image size must ne less than 2MB");
          //   $("#bar").hide();
          //   setTimeout(function(){ jQuery("#FileName").hide(); },1000);
          // }
     


        }  
        else if ($scope.uploadSrc == "org") { // upload org
        // if($scope.file.type !== 'image/png' ){
          if (($scope.file.size / 1024 < 2048)) {
            action = {
              org: {
                userid: $rootScope.usersession.currentUser.userid,
                orgid: $rootScope.usersession.currentUser.org.orgid
              }
            };
          } else {
            // $scope.enableErrorMsg();
             // UploadErrMsg.innerHTML = 'Image size must ne less than 2MB';
             notify({message:" Image size must ne less than 2MB",template:'common/notification/views/notification-error.html',position:'center'});
            // growl.addErrorMessage("Image size must ne less than 2MB");
            $("#bar").hide();
            setTimeout(function(){ jQuery("#FileName").hide(); },1000);
          }
        // }
         // else{
         //     $scope.enableErrorMsg();
         //     UploadErrMsg.innerHTML = 'Please select image other than png';
         //    // growl.addErrorMessage("Image size must ne less than 2MB");
         //    $("#bar").hide();
         //    setTimeout(function(){ jQuery("#FileName").hide(); },1000);
         //  }

        } else if ($scope.uploadSrc == "productlogo") { // upload product logo
          if (($scope.file.size / 1024 < 1024)) {
            action = {
              productlogo: {
                userid: $rootScope.usersession.currentUser.userid,
                orgid: $rootScope.usersession.currentUser.org.orgid,
                prodle: $rootScope.currentProdleRoot
              }
            };
          } else {
            // growl.addErrorMessage("Image size must ne less than 1MB");
             // $scope.enableErrorMsg();
             // UploadErrMsg.innerHTML = 'Image size must ne less than 1MB';
             notify({message:" Image size must ne less than 1MB",template:'common/notification/views/notification-error.html',position:'center'});
            $("#bar").hide();
            setTimeout(function(){ jQuery("#FileName").hide(); },1000);
          }
        } else if ($scope.uploadSrc == "orglogo") { // upload org logo
          if (($scope.file.size / 1024 < 1024)) {
            action = {
              orglogo: {
                userid: $rootScope.usersession.currentUser.userid,
                orgid: $rootScope.usersession.currentUser.org.orgid
              }
            };
          } else {
            // $scope.enableErrorMsg();
             // UploadErrMsg.innerHTML = 'Image size must ne less than 1MB';
             notify({message:" Image size must ne less than 1MB",template:'common/notification/views/notification-error.html',position:'center'});
            // growl.addErrorMessage("Image size must ne less than 1MB");
            $("#bar").hide();
            setTimeout(function(){ jQuery("#FileName").hide(); },1000);
          }
        }
   

      } else { //data 
        if ($scope.uploadSrc == "product") { // upload product
          if (($scope.file.size / 1024 < 10240)) {
            action = {
              product: {
                userid: $rootScope.usersession.currentUser.userid,
                orgid: $rootScope.usersession.currentUser.org.orgid,
                prodle: $rootScope.currentProdleRoot
              }
            };
          } else {
            // $scope.enableErrorMsg();
             // UploadErrMsg.innerHTML = 'Image size must ne less than 10MB';
           notify({message:" Image size must ne less than 10MB",template:'common/notification/views/notification-error.html',position:'center'});
            // growl.addErrorMessage("Image size must ne less than 10MB");
            $("#bar").hide();
            setTimeout(function(){ jQuery("#FileName").hide(); },1000);
          }
        } else if ($scope.uploadSrc == "org") { // upload org
          if (($scope.file.size / 1024 < 10240)) {
            action = {
              org: {
                userid: $rootScope.usersession.currentUser.userid,
                orgid: $rootScope.usersession.currentUser.org.orgid
              }
            };
          } else {
             // $scope.enableErrorMsg();
             // UploadErrMsg.innerHTML = 'Image size must ne less than 10MB';
             notify({message:" Image size must ne less than 10MB",template:'common/notification/views/notification-error.html',position:'center'});
            // growl.addErrorMessage("Image size must ne less than 10MB");
            $("#bar").hide();
            setTimeout(function(){ jQuery("#FileName").hide(); },1000);
          }
        } else {
           // $scope.enableErrorMsg();
           //  UploadErrMsg.innerHTML = 'Please upload file of images type...';
           notify({message:"Please upload file of images type...",template:'common/notification/views/notification-error.html',position:'center'});
          // growl.addErrorMessage("Please upload file of images type...");
          $("#bar").hide();
          setTimeout(function(){ jQuery("#FileName").hide(); },1000);
        }

      }
       // growl.addSuccessMessage("Uploading data");
      $scope.socket.emit('uploadFiles', file_data, action);
      $log.debug("pic emitted");
    });
    //            fileReader.readAsBinaryString($scope.file[a], $scope);

     }
  });  // isLoggedin check end
};

  $scope.socket.removeAllListeners('productUploadResponse');
  $scope.socket.on('productUploadResponse', function (error, imagelocation) {
   $scope.productUploadResponseHandler(error, imagelocation);
  });
  $scope.socket.removeAllListeners('orgKeyClientResponse');
  $scope.socket.on('orgKeyClientResponse', function (error, imagelocation) {
   $scope.orgKeyClientResponseHandler(error, imagelocation);
  });

  $scope.socket.removeAllListeners('campaignUploadResponse');
  $scope.socket.on('campaignUploadResponse', function (error, imagelocation) {
   $scope.campaignUploadResponseHandler(error, imagelocation);
  });

   $scope.socket.removeAllListeners('warrantyUploadResponse');
  $scope.socket.on('warrantyUploadResponse', function (error, imagelocation) {
   $scope.warrantyUploadResponseHandler(error, imagelocation);
  });

    $scope.socket.removeAllListeners('productUploadLogoResponse');
  $scope.socket.on('productUploadLogoResponse', function (error, imagelocation) {
     $scope.productUploadLogoResponseHandler(error, imagelocation);
  });
   $scope.socket.removeAllListeners('orgUploadResponse');
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
    $("#spinner").hide();
 if (error) {
      // $("#bar").hide();
      
      if (error.error.code == 'AP003') { // user already exist
        $log.debug(error.error.code + " " + error.error.message);
        // $scope.enableErrorMsg();
        // UploadErrMsg.innerHTML = "Error while uploading " + $scope.file.name + " " + error.error.message;
        notify({message:"Error while uploading " + $scope.file.name + " " + error.error.message,template:'common/notification/views/notification-error.html',position:'center'});
        // growl.addErrorMessage("Error while uploading " + $scope.file.name + " " + error.error.message);
      } else if (error.error.code == 'AV001') { // user data invalid
        $log.debug(error.error.code + " " + error.error.message);
        // $scope.enableErrorMsg();
        // UploadErrMsg.innerHTML = "Error while uploading "+ $scope.file.name + " " + error.error.message;
         notify({message:"Error while uploading " + $scope.file.name + " " + error.error.message,template:'common/notification/views/notification-error.html',position:'center'});
        // growl.addErrorMessage(" Error while uploading " + $scope.file.name + " " + error.error.message);
      } else {
        $log.debug(error.error.message);
        // $scope.enableErrorMsg();
        // UploadErrMsg.innerHTML = "Error while uploading "+ $scope.file.name + " " + error.error.message;
         notify({message:"Error while uploading " + $scope.file.name + " " + error.error.message,template:'common/notification/views/notification-error.html',position:'center'});
        // growl.addErrorMessage("Error while uploading " + $scope.file.name + " " + error.error.message);
      }

    } else {
      $scope.imageSrc = JSON.stringify(imagelocation);
      $log.debug(JSON.stringify(imagelocation.success.filename));
      $log.debug("Emit");
      var temp1=imagelocation.success.filename.replace(/ /g,'');
      document.getElementById('check'+temp1).style.color="#01DF74";
      $rootScope.$broadcast("productUploadResponseSuccess", "success");
      $log.debug("getting response for product upload  " + $scope.imageSrc);
      // $scope.enableSuccessMsg();
      // UploadSuccessMsg.innerHTML = 'File Uploaded successfully...';
       notify({message:temp1+"  uploaded successfully...",template:'common/notification/views/notification-success.html',position:'center'});
      // growl.addSuccessMessage("File Uploaded successfully...");
      $scope.counter++;
      $log.debug($scope.counter);
      if ($scope.counter < $scope.fileLength) {
        $log.debug("emitting image " + $scope.counter);
        //    $scope.getFile($scope.counter);
      } else $scope.counter = 0;
    }
  setTimeout(function(){ jQuery("#FileName").hide(); },1000);
};

$scope.campaignUploadResponseHandler=function(error, imagelocation){
    $("#spinner").hide();
 if (error) {
      // $("#bar").hide();
      
      if (error.error.code == 'AP003') { // user already exist
        $log.debug(error.error.code + " " + error.error.message);
        // $scope.enableErrorMsg();
        // UploadErrMsg.innerHTML = "Error while uploading " + $scope.file.name + " " + error.error.message;
        notify({message:"Error while uploading " + $scope.file.name + " " + error.error.message,template:'common/notification/views/notification-error.html',position:'center'});
        // growl.addErrorMessage("Error while uploading " + $scope.file.name + " " + error.error.message);
      } else if (error.error.code == 'AV001') { // user data invalid
        $log.debug(error.error.code + " " + error.error.message);
        // $scope.enableErrorMsg();
        // UploadErrMsg.innerHTML = "Error while uploading "+ $scope.file.name + " " + error.error.message;
         notify({message:"Error while uploading " + $scope.file.name + " " + error.error.message,template:'common/notification/views/notification-error.html',position:'center'});
        // growl.addErrorMessage(" Error while uploading " + $scope.file.name + " " + error.error.message);
      } else {
        $log.debug(error.error.message);
        // $scope.enableErrorMsg();
        // UploadErrMsg.innerHTML = "Error while uploading "+ $scope.file.name + " " + error.error.message;
         notify({message:"Error while uploading " + $scope.file.name + " " + error.error.message,template:'common/notification/views/notification-error.html',position:'center'});
        // growl.addErrorMessage("Error while uploading " + $scope.file.name + " " + error.error.message);
      }

    } else {
      $scope.imageSrc = JSON.stringify(imagelocation);
      $log.debug(JSON.stringify(imagelocation.success.filename));
      $log.debug("Emit");
      var temp1=imagelocation.success.filename.replace(/ /g,'');
      document.getElementById('check'+temp1).style.color="#01DF74";
      $rootScope.$broadcast("campaignUploadResponseSuccess", "success");
      $log.debug("getting response for campaign upload  " + $scope.imageSrc);
      // $scope.enableSuccessMsg();
      // UploadSuccessMsg.innerHTML = 'File Uploaded successfully...';
       notify({message:temp1+"  uploaded successfully...",template:'common/notification/views/notification-success.html',position:'center'});
      // growl.addSuccessMessage("File Uploaded successfully...");
      $scope.counter++;
      $log.debug($scope.counter);
      if ($scope.counter < $scope.fileLength) {
        $log.debug("emitting image " + $scope.counter);
        //    $scope.getFile($scope.counter);
      } else $scope.counter = 0;
    }
  setTimeout(function(){ jQuery("#FileName").hide(); },1000);
};

$scope.warrantyUploadResponseHandler=function(error, imagelocation){
    $("#spinner").hide();
 if (error) {
      // $("#bar").hide();
      
      if (error.error.code == 'AP003') { // user already exist
        $log.debug(error.error.code + " " + error.error.message);
        // $scope.enableErrorMsg();
        // UploadErrMsg.innerHTML = "Error while uploading " + $scope.file.name + " " + error.error.message;
        notify({message:"Error while uploading " + $scope.file.name + " " + error.error.message,template:'common/notification/views/notification-error.html',position:'center'});
        // growl.addErrorMessage("Error while uploading " + $scope.file.name + " " + error.error.message);
      } else if (error.error.code == 'AV001') { // user data invalid
        $log.debug(error.error.code + " " + error.error.message);
        // $scope.enableErrorMsg();
        // UploadErrMsg.innerHTML = "Error while uploading "+ $scope.file.name + " " + error.error.message;
         notify({message:"Error while uploading " + $scope.file.name + " " + error.error.message,template:'common/notification/views/notification-error.html',position:'center'});
        // growl.addErrorMessage(" Error while uploading " + $scope.file.name + " " + error.error.message);
      } else {
        $log.debug(error.error.message);
        // $scope.enableErrorMsg();
        // UploadErrMsg.innerHTML = "Error while uploading "+ $scope.file.name + " " + error.error.message;
         notify({message:"Error while uploading " + $scope.file.name + " " + error.error.message,template:'common/notification/views/notification-error.html',position:'center'});
        // growl.addErrorMessage("Error while uploading " + $scope.file.name + " " + error.error.message);
      }

    } else {
      $scope.imageSrc = JSON.stringify(imagelocation);
      $log.debug(JSON.stringify(imagelocation.success.filename));
      $log.debug("Emit");
      var temp1=imagelocation.success.filename.replace(/ /g,'');
      document.getElementById('check'+temp1).style.color="#01DF74";
      $rootScope.$broadcast("warrantyUploadLogoResponseSuccess", "success");
      $log.debug("getting response for warranty upload  " + $scope.imageSrc);
      // $scope.enableSuccessMsg();
      // UploadSuccessMsg.innerHTML = 'File Uploaded successfully...';
       notify({message:temp1+" uploaded successfully...",template:'common/notification/views/notification-success.html',position:'center'});
      // growl.addSuccessMessage("File Uploaded successfully...");
      $scope.counter++;
      $log.debug($scope.counter);
      if ($scope.counter < $scope.fileLength) {
        $log.debug("emitting image " + $scope.counter);
        //    $scope.getFile($scope.counter);
      } else $scope.counter = 0;
    }
  setTimeout(function(){ jQuery("#FileName").hide(); },1000);
};

$scope.orgKeyClientResponseHandler=function(error, imagelocation){
    $("#spinner").hide();
 if (error) {
      // $("#bar").hide();
      
      if (error.error.code == 'AP003') { // user already exist
        $log.debug(error.error.code + " " + error.error.message);
        // $scope.enableErrorMsg();
        // UploadErrMsg.innerHTML = "Error while uploading " + $scope.file.name + " " + error.error.message;
        notify({message:"Error while uploading " + $scope.file.name + " " + error.error.message,template:'common/notification/views/notification-error.html',position:'center'});
        // growl.addErrorMessage("Error while uploading " + $scope.file.name + " " + error.error.message);
      } else if (error.error.code == 'AV001') { // user data invalid
        $log.debug(error.error.code + " " + error.error.message);
        // $scope.enableErrorMsg();
        // UploadErrMsg.innerHTML = "Error while uploading "+ $scope.file.name + " " + error.error.message;
        notify({message:"Error while uploading " + $scope.file.name + " " + error.error.message,template:'common/notification/views/notification-error.html',position:'center'});
        // growl.addErrorMessage(" Error while uploading " + $scope.file.name + " " + error.error.message);
      } else {
        $log.debug(error.error.message);
        // $scope.enableErrorMsg();
        // UploadErrMsg.innerHTML = "Error while uploading "+ $scope.file.name + " " + error.error.message;
        notify({message:"Error while uploading " + $scope.file.name + " " + error.error.message,template:'common/notification/views/notification-error.html',position:'center'});
        // growl.addErrorMessage("Error while uploading " + $scope.file.name + " " + error.error.message);
      }

    } else {
      $scope.imageSrc = JSON.stringify(imagelocation);
      $log.debug(JSON.stringify(imagelocation.success.filename));
      $log.debug("Emit");
      var temp1=imagelocation.success.filename.replace(/ /g,'');
      document.getElementById('check'+temp1).style.color="#01DF74";
      $rootScope.$broadcast("orgKeyClientResponseSuccess", "success");
      $log.debug("getting response for orgKeyClient upload  " + $scope.imageSrc);
      // $scope.enableSuccessMsg();
      // UploadSuccessMsg.innerHTML = 'File Uploaded successfully...';
      notify({message:temp1+" key Client added successfully...",template:'common/notification/views/notification-success.html',position:'center'});
      // growl.addSuccessMessage("File Uploaded successfully...");
      $scope.counter++;
      $log.debug($scope.counter);
      if ($scope.counter < $scope.fileLength) {
        $log.debug("emitting image " + $scope.counter);
        //    $scope.getFile($scope.counter);
      } else $scope.counter = 0;
    }
  setTimeout(function(){ jQuery("#FileName").hide(); },1000);
};


$scope.productUploadLogoResponseHandler=function(error, imagelocation){
         // growl.addSuccessMessage("after uploading");
           $("#spinner").hide();
    if (error) {
      // $("#bar").hide();
     if (error.error.code == 'AP003') { // user already exist
        $log.debug(error.error.code + " " + error.error.message);
         // $scope.enableErrorMsg();
        // UploadErrMsg.innerHTML = "Error while uploading "+ $scope.file.name + " " + error.error.message;
        notify({message:"Error while uploading " + $scope.file.name + " " + error.error.message,template:'common/notification/views/notification-error.html',position:'center'});
        // growl.addErrorMessage("Error while uploading " + $scope.file.name + " " + error.error.message);
      } else if (error.error.code == 'AV001') { // user data invalid
        $log.debug(error.error.code + " " + error.error.message);
        // $scope.enableErrorMsg();
        // UploadErrMsg.innerHTML = "Error while uploading "+ $scope.file.name + " " + error.error.message;
        notify({message:"Error while uploading " + $scope.file.name + " " + error.error.message,template:'common/notification/views/notification-error.html',position:'center'});
        // growl.addErrorMessage("Error while uploading " + $scope.file.name + " " + error.error.message);
      } else {
        $log.debug(error.error.message);
         // $scope.enableErrorMsg();
        // UploadErrMsg.innerHTML = "Error while uploading "+ $scope.file.name + " " + error.error.message;
        notify({message:"Error while uploading " + $scope.file.name + " " + error.error.message,template:'common/notification/views/notification-error.html',position:'center'});
        // growl.addErrorMessage("Error while uploading " + $scope.file.name + " " + error.error.message);

      }
    } else {
      $scope.imageSrc = JSON.stringify(imagelocation);
      $log.debug("Emit");
      var temp1=imagelocation.success.filename.replace(/ /g,'');
      document.getElementById('check'+temp1).style.color="#01DF74";
      $rootScope.$broadcast("productUploadLogoResponseSuccess", "success");
      $log.debug("getting response for logo upload  " + $scope.imageSrc);
      // growl.addSuccessMessage("File Uploaded successfully...");
      // $scope.enableSuccessMsg();
      // UploadSuccessMsg.innerHTML = 'File Uploaded successfully...';
      notify({message:temp1+" uploaded successfully...",template:'common/notification/views/notification-success.html',position:'center'});
      $scope.imageSrc = imagelocation;
      $scope.counter++;
      $log.debug($scope.counter);
      if ($scope.counter < $scope.fileLength) {
        $log.debug("emitting image " + $scope.counter);
        //    $scope.getFile($scope.counter);
      } else $scope.counter = 0;
     }
      setTimeout(function(){ jQuery("#FileName").hide(); },1000);
};
 
  $scope.orgUploadResponseHandler=function(error, imagelocation){
      $("#spinner").hide();
   if (error) {
      // $("#bar").hide();

          if (error.error.code == 'AP003') { // user already exist
        $log.debug(error.error.code + " " + error.error.message);
         // $scope.enableErrorMsg();
        // UploadErrMsg.innerHTML = "Error while uploading "+ $scope.file.name + " " + error.error.message;
        notify({message:"Error while uploading " + $scope.file.name + " " + error.error.message,template:'common/notification/views/notification-error.html',position:'center'});
        // growl.addErrorMessage("Error while uploading " + $scope.file.name + " " + error.error.message);
      } else if (error.error.code == 'AV001') { // user data invalid
        $log.debug(error.error.code + " " + error.error.message);
        // $scope.enableErrorMsg();
        // UploadErrMsg.innerHTML = "Error while uploading "+ $scope.file.name + " " + error.error.message;
        notify({message:"Error while uploading " + $scope.file.name + " " + error.error.message,template:'common/notification/views/notification-error.html',position:'center'});
        // growl.addErrorMessage("Error while uploading " + $scope.file.name + " " + error.error.message);
      } else {
        $log.debug(error.error.message);
         // $scope.enableErrorMsg();
        // UploadErrMsg.innerHTML = "Error while uploading "+ $scope.file.name + " " + error.error.message;
        notify({message:"Error while uploading " + $scope.file.name + " " + error.error.message,template:'common/notification/views/notification-error.html',position:'center'});
        // growl.addErrorMessage("Error while uploading " + $scope.file.name + " " + error.error.message);

      }

    } else {
      
      $log.debug("getting response for org upload  " + imagelocation);
      $rootScope.$broadcast("orgUploadResponseSuccess", "success");
      // $scope.enableSuccessMsg();
      // UploadSuccessMsg.innerHTML = 'File Uploaded successfully...';
      notify({message:" File Uploaded successfully...",template:'common/notification/views/notification-success.html',position:'center'});
      var temp1=imagelocation.success.filename.replace(/ /g,'');
      document.getElementById('check'+temp1).style.color="#01DF74";
      $scope.imageSrc = imagelocation;
      $scope.counter++;
      $log.debug($scope.counter);
      if ($scope.counter < $scope.fileLength) {
        $log.debug("emitting image " + $scope.counter);
        //    $scope.getFile($scope.counter);
      } else $scope.counter = 0;
     }
      setTimeout(function(){ jQuery("#FileName").hide(); },1000);
  };

   $scope.orgUploadLogoResponseHandler=function(error, imagelocation){
      $("#spinner").hide();
       if (error) {
      // $("#bar").hide();

          if (error.error.code == 'AP003') { // user already exist
        $log.debug(error.error.code + " " + error.error.message);
         // $scope.enableErrorMsg();
        // UploadErrMsg.innerHTML = "Error while uploading "+ $scope.file.name + " " + error.error.message;
        notify({message:"Error while uploading " + $scope.file.name + " " + error.error.message,template:'common/notification/views/notification-error.html',position:'center'});
        // growl.addErrorMessage("Error while uploading " + $scope.file.name + " " + error.error.message);
      } else if (error.error.code == 'AV001') { // user data invalid
        $log.debug(error.error.code + " " + error.error.message);
        // $scope.enableErrorMsg();
        // UploadErrMsg.innerHTML = "Error while uploading "+ $scope.file.name + " " + error.error.message;
        notify({message:"Error while uploading " + $scope.file.name + " " + error.error.message,template:'common/notification/views/notification-error.html',position:'center'});
        // growl.addErrorMessage("Error while uploading " + $scope.file.name + " " + error.error.message);
      } else {
        $log.debug(error.error.message);
         // $scope.enableErrorMsg();
        // UploadErrMsg.innerHTML = "Error while uploading "+ $scope.file.name + " " + error.error.message;
        notify({message:"Error while uploading " + $scope.file.name + " " + error.error.message,template:'common/notification/views/notification-error.html',position:'center'});
        // growl.addErrorMessage("Error while uploading " + $scope.file.name + " " + error.error.message);

      }

    } else {
      $log.debug("getting response for org upload logo " + imagelocation);
      console.log("Emitting")
      $rootScope.$broadcast("orgUploadLogoResponseSuccess", "success");
      // growl.addSuccessMessage("File uploaded");
      var temp1=imagelocation.success.filename.replace(/ /g,'');
      document.getElementById('check'+temp1).style.color="#01DF74";
      // $scope.enableSuccessMsg();
      // UploadSuccessMsg.innerHTML = 'File Uploaded successfully...';
      notify({message:" File Uploaded successfully...",template:'common/notification/views/notification-success.html',position:'center'});
      $scope.imageSrc = imagelocation;
      $scope.counter++;
      $log.debug($scope.counter);
      if ($scope.counter < $scope.fileLength) {
        $log.debug("emitting image " + $scope.counter);
        //    $scope.getFile($scope.counter);
      } else $scope.counter = 0;
    }
    setTimeout(function(){ jQuery("#FileName").hide(); },1000);
  };

     $scope.userUploadResponseHandler=function(error, imagelocation){
        $("#spinner").hide();
     if (error) {
      // $("#bar").hide();

          if (error.error.code == 'AP003') { // user already exist
        $log.debug(error.error.code + " " + error.error.message);
         // $scope.enableErrorMsg();
        // UploadErrMsg.innerHTML = "Error while uploading "+ $scope.file.name + " " + error.error.message;
        notify({message:"Error while uploading " + $scope.file.name + " " + error.error.message,template:'common/notification/views/notification-error.html',position:'center'});
        // growl.addErrorMessage("Error while uploading " + $scope.file.name + " " + error.error.message);
      } else if (error.error.code == 'AV001') { // user data invalid
        $log.debug(error.error.code + " " + error.error.message);
        // $scope.enableErrorMsg();
        // UploadErrMsg.innerHTML = "Error while uploading "+ $scope.file.name + " " + error.error.message;
        notify({message:"Error while uploading " + $scope.file.name + " " + error.error.message,template:'common/notification/views/notification-error.html',position:'center'});
        // growl.addErrorMessage("Error while uploading " + $scope.file.name + " " + error.error.message);
      } else {
        $log.debug(error.error.message);
         // $scope.enableErrorMsg();
        // UploadErrMsg.innerHTML = "Error while uploading "+ $scope.file.name + " " + error.error.message;
        notify({message:"Error while uploading " + $scope.file.name + " " + error.error.message,template:'common/notification/views/notification-error.html',position:'center'});
        // growl.addErrorMessage("Error while uploading " + $scope.file.name + " " + error.error.message);

      }

    } else {
      $log.debug("getting response for user upload  " + imagelocation);
       $rootScope.$broadcast("userUploadResponseSuccess", "success");
      // $scope.enableSuccessMsg();
      // UploadSuccessMsg.innerHTML = 'File Uploaded successfully...';
      notify({message:" File Uploaded successfully...",template:'common/notification/views/notification-success.html',position:'center'});
      var temp1=imagelocation.success.filename.replace(/ /g,'');
      document.getElementById('check'+temp1).style.color="#01DF74";
      $scope.imageSrc = imagelocation;
      $scope.counter++;
      $log.debug($scope.counter);
      if ($scope.counter < $scope.fileLength) {
        $log.debug("emitting image " + $scope.counter);
        //    $scope.getFile($scope.counter);
      } else $scope.counter = 0;
    }
     setTimeout(function(){ jQuery("#FileName").hide(); },1000);
  };

}]);

angular.module('prodo.UploadApp')
.directive('ngFileSelect', ['fileReader', function( ) {
  return {
    link: function ($scope, el) {
      el.bind("change", function (e) {
        $scope.file = (e.srcElement || e.target).files;
        //console.log($scope.file);
         document.getElementById("FileName").innerHTML="";
        $scope.fileLength = (e.srcElement || e.target).files;
        //console.log("counter= " + $scope.counter);
        $scope.file = (e.srcElement || e.target).files;
        // if ($scope.uploadSrc == "user") $scope.getFile($scope.file[0]);
        var addUploads = function (i) {
          var fn = document.getElementById("FileName");
            $("#FileName").show();
            
            var spanSuccess=document.createElement("span");
            // spanSuccess.setAttribute("style", "border:5px solid orange");
            spanSuccess.className='prodo-right-check glyphicon glyphicon-ok';
            var temp1='check'+i.name.replace(/ /g,'');
            spanSuccess.id = temp1;

            fn.appendChild(spanSuccess);

            var FileName = document.createElement("label");
            FileName.type = 'label';
            var title = document.createTextNode(" " + i.name);
            FileName.appendChild(title);
            FileName.name = 'label';
            FileName.setAttribute("style", "text-align:left");
            fn.appendChild(FileName);
            fn.setAttribute("style", "text-align:left");
            fn.style.width = '500px';
            

            var spinnerContainer = document.createElement("span");
            spinnerContainer.id="spinner";
            
            
             fn.appendChild(spinnerContainer);
             var spinner = document.createElement("i");
             spinner.className = 'prodo-loadmoreUpload fa fa-spinner fa-spin ';
             spinner.id="spinnerChild";
             spinnerContainer.appendChild(spinner);
             $("#spinner").show();




             var breakline=document.createElement("br");
             fn.appendChild(breakline);
 // <span id="img-spinner" > <i  class=" prodo-loadmoreColor fa fa-spinner fa-spin "> </i></span>
            // $("#img-spinner").show();

           //  var progressbarc = document.createElement("div");
           //  progressbarc.className = ' progress progress-info  active';
           //  progressbarc.id = "a2" + i.name;
           //  progressbarc.style.textAlign = "left";
           //  fn.appendChild(progressbarc);
           //  var progressbar = document.createElement("div");
           //  progressbar.className = 'bar';
           //  progressbar.id = 'bar';
           //  var a = document.getElementById("a2" + i.name);
           //  progressbar.style.width = '300px';
           //  var $bar = $('.bar');
           //  a.appendChild(progressbar);
           //  $('.bar').css('width','0%');
                   
           //  var perc =  '100';
           //  var userInput = (i.size/1024)/100;  // in seconds
           //  var speed = userInput * 1;
           //  var currentPerc = 0;
        
           
           // var progress = setInterval(function() {
           //     var $bar = $('.bar');
           //     if (currentPerc >= perc) {
           //      clearInterval(progress);
           //       $('.progress').removeClass('active');
           //      } else {
           //       currentPerc += 1;
           //       $bar.css('width', (currentPerc) + '%');
           //      }
           //       // $bar.text((currentPerc) + '%');

           //         if(currentPerc==100){
           //          // setTimeout(function(){ jQuery("#FileName").hide(); },1000);
           //          // currentPerc=0;
           //         }

           //  }, speed);

            FileName = "";
            title = "";
            fn = "";
            // progressbarc = "";
            // progressbar = "";
            // progress = "";
            a = "";
            // perc="";
            // userInput="";
            // speed="";
             // currentPerc="";
          
              
          }
            
        for (var i = 0; i < $scope.file.length; i++) {
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
              // document.getElementById('FileName').innerHTML="";
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