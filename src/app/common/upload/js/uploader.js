
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

.controller('UploadController', ['$scope', '$log', '$rootScope', 'fileReader', 'ENV', 'isLoggedin', function ($scope, $log, $rootScope, fileReader, ENV, isLoggedin) {

  $scope.socket = io.connect(ENV.apiEndpoint + ENV.port + '/api/prodoupload', {
    query: 'session_id=' + $rootScope.usersession.currentUser.sessionid
  });
  //socket connect 
  $scope.fileLength;
  $scope.uploadSrc;
  $scope.progressbar = 0;
  $scope.counter = 0;
  $rootScope.currentclient={name:''};

  
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
            $rootScope.ProdoAppMessage(" Image size must ne less than 500KB", 'error');
            $("#bar").hide();
            setTimeout(function(){ jQuery("#FileName").hide(); },1000);
            $('#fileInputsUploaduser')[0].reset();
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
            $rootScope.ProdoAppMessage(" Image size must ne less than 2MB", 'error');
            $("#bar").hide();
            setTimeout(function(){ jQuery("#FileName").hide(); },1000);
             $('#fileInputsUploadproduct')[0].reset();
          }
          // }
          // else{
          //    $scope.enableErrorMsg();
          //    UploadErrMsg.innerHTML = 'Please select image other than png';
          //   // growl.addErrorMessage("Image size must ne less than 2MB");
          //   $("#bar").hide();
          //   setTimeout(function(){ jQuery("#FileName").hide(); },1000);
          // }
     


        }else if ($scope.uploadSrc == "blog") { // upload product

          // if($scope.file.type !== 'image/png' ){
           if (($scope.file.size / 1024 < 2048)) {
            action = {
              blog: {
                userid: $rootScope.usersession.currentUser.userid,
                authorid: $rootScope.usersession.currentUser.author.authorid,
                blogid: $rootScope.blogid
              }
            };
          } else {
            $rootScope.ProdoAppMessage(" Image size must ne less than 2MB", 'error');
            $("#bar").hide();
            setTimeout(function(){ jQuery("#FileName").hide(); },1000);
             $('#fileInputsUploadblog')[0].reset();
          }
        }
        else if ($scope.uploadSrc == "orgkeyclient") { // upload product

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
            $rootScope.ProdoAppMessage("Please enter key client name", 'error');
            $("#spinner").hide();
            $("#bar").hide();
            setTimeout(function(){ jQuery("#FileName").hide(); },1000);
            $('#fileInputsUploadorgkeyclient')[0].reset();
          }
          } else {
            $rootScope.ProdoAppMessage("Image size must ne less than 2MB", 'error');
            $("#bar").hide();
            setTimeout(function(){ jQuery("#FileName").hide(); },1000);
            $('#fileInputsUploadorgkeyclient')[0].reset();
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
            $rootScope.ProdoAppMessage("Image size must ne less than 2MB", 'error');
            $("#bar").hide();
            setTimeout(function(){ jQuery("#FileName").hide(); },1000);
            $('#fileInputsUploadcampaign')[0].reset();
          }
      
        }  
          else if ($scope.uploadSrc == "campaignBannerUpdate") { // upload product

          // if($scope.file.type !== 'image/png' ){

           if (($scope.file.size / 1024 < 2048)) {
        
            action = {
              campaign: {
                userid: $rootScope.usersession.currentUser.userid,
                campaign_id:$rootScope.campaign_id,
                orgid: $rootScope.usersession.currentUser.org.orgid,
                prodle: $rootScope.campaign_prodle,
                campaignbanner:''

              }
            };
                 
          } else {
            $rootScope.ProdoAppMessage("Image size must ne less than 2MB", 'error');
            $("#bar").hide();
            setTimeout(function(){ jQuery("#FileName").hide(); },1000);
            $('#fileInputsUploadcampaignBannerUpdate')[0].reset();
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
            $rootScope.ProdoAppMessage("Image size must ne less than 2MB", 'error');
            $("#bar").hide();
            setTimeout(function(){ jQuery("#FileName").hide(); },1000);
              $('#fileInputsUploadwarranty')[0].reset();
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
            $rootScope.ProdoAppMessage("Image size must ne less than 2MB", 'error');
            $("#bar").hide();
            setTimeout(function(){ jQuery("#FileName").hide(); },1000);
            $('#fileInputsUploadorg')[0].reset();
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
            $rootScope.ProdoAppMessage("Image size must ne less than 1MB", 'error');
            $("#bar").hide();
            setTimeout(function(){ jQuery("#FileName").hide(); },1000);
              $('#fileInputsUploadproductlogo')[0].reset();
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
             $rootScope.ProdoAppMessage("Image size must ne less than 1MB", 'error');
            $("#bar").hide();
            setTimeout(function(){ jQuery("#FileName").hide(); },1000);
            $('#fileInputsUploadorglogo')[0].reset();
         }
        }
   

      } else { //data 
        if ($scope.uploadSrc == "productdata") { // upload product
          if (($scope.file.size / 1024 < 10240)) {
            action = {
              product: {
                userid: $rootScope.usersession.currentUser.userid,
                orgid: $rootScope.usersession.currentUser.org.orgid,
                prodle: $rootScope.currentProdleRoot
              }
            };
          } else {
             $rootScope.ProdoAppMessage("Image size must ne less than 10MB", 'error');
            $("#bar").hide();
            setTimeout(function(){ jQuery("#FileName").hide(); },1000);
             $('#fileInputsUploadproductdata')[0].reset();
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
            $rootScope.ProdoAppMessage("Image size must ne less than 1MB", 'error');
            $("#bar").hide();
            setTimeout(function(){ jQuery("#FileName").hide(); },1000);
            $('#fileInputsUploadorg')[0].reset();
          }
        } 
        else if ($scope.uploadSrc == "warranty") { // upload org
          if (($scope.file.type =='application/pdf')) {
            action = {
              warranty: {
                userid: $rootScope.usersession.currentUser.userid,
                warranty_id: $rootScope.Upload_warranty_id
              }
            };
          } else {
            $rootScope.ProdoAppMessage("Invoive can be image or pdf only", 'error');
            $("#bar").hide();
            setTimeout(function(){ jQuery("#FileName").hide(); },1000);
            $('#fileInputsUploadorg')[0].reset();
          }
        }
        else {
          $rootScope.ProdoAppMessage("Please upload file of images type...", 'error');
          $("#bar").hide();
          setTimeout(function(){ jQuery("#FileName").hide(); },1000);
          if($scope.uploadSrc == "org"){
            $('#fileInputsUploadorg')[0].reset();
          }
          if($scope.uploadSrc == "orglogo"){
            $('#fileInputsUploadorglogo')[0].reset();
          }
          if($scope.uploadSrc == "productlogo"){
            $('#fileInputsUploadproductlogo')[0].reset();
          }
          if($scope.uploadSrc == "product"){
            $('#fileInputsUploadproduct')[0].reset();
          }
          if($scope.uploadSrc == "blog"){
            $('#fileInputsUploadblog')[0].reset();
          }
          if($scope.uploadSrc == "productdata"){
            $('#fileInputsUploadproductdata')[0].reset();
          }
          if($scope.uploadSrc == "warranty"){
            $('#fileInputsUploadwarranty')[0].reset();
          }
          if($scope.uploadSrc == "campaign"){
            $('#fileInputsUploadcampaign')[0].reset();
          }
          if($scope.uploadSrc == "orgkeyclient"){
            $('#fileInputsUploadorgkeyclient')[0].reset();
          }
          if($scope.uploadSrc == "user"){
            $('#fileInputsUploaduser')[0].reset();
          }
          if($scope.uploadSrc == "campaignBannerUpdate"){
            $('#fileInputsUploadcampaignBannerUpdate')[0].reset();
          }
        }

      }
    
      $scope.socket.emit('uploadFiles', file_data, action);
      $log.debug("pic emitted");
    });
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
  $scope.socket.removeAllListeners('campaignBannerUploadResponse');
  $scope.socket.on('campaignBannerUploadResponse', function (error, imagelocation) {
    $scope.campaignBannerUploadResponseHandler(error, imagelocation);
  });
  $scope.socket.removeAllListeners('blogUploadResponse');
  $scope.socket.on('blogUploadResponse', function (error, imagelocation) {
   $scope.blogUploadResponseHandler(error, imagelocation);
  });

$scope.productUploadResponseHandler=function(error, imagelocation){
    // $('#fileInputsUploadproductdata')[0].reset();
    $('#fileInputsUploadproduct')[0].reset();
    $("#spinner").hide();
 if (error) {
      // $("#bar").hide();
      
      if (error.error.code == 'AP003') { // user already exist
        $log.debug(error.error.code + " " + error.error.message);
        $rootScope.ProdoAppMessage("Error while uploading " + $scope.file.name + " " + error.error.message, 'error');
        
     
      } else if (error.error.code == 'AV001') { // user data invalid
        $log.debug(error.error.code + " " + error.error.message);
        $rootScope.ProdoAppMessage("Error while uploading " + $scope.file.name + " " + error.error.message, 'error');
       
      } else {
        $log.debug(error.error.message);
        $rootScope.ProdoAppMessage("Error while uploading " + $scope.file.name + " " + error.error.message, 'error');
       
      }

    } else {
      $scope.imageSrc = JSON.stringify(imagelocation);
      $log.debug(JSON.stringify(imagelocation.success.filename));
      $log.debug("Emit");
      var temp1=imagelocation.success.filename.replace(/ /g,'');
      document.getElementById('check'+temp1).style.color="#01DF74";
      $rootScope.$broadcast("productUploadResponseSuccess", "success");
      $log.debug("getting response for product upload  " + $scope.imageSrc);
      $rootScope.ProdoAppMessage(temp1+"  uploaded successfully...", 'success');
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
 $('#fileInputsUploadcampaign')[0].reset();
 $("#spinner").hide();
 if (error) {
      // $("#bar").hide();
      
      if (error.error.code == 'AP003') { // user already exist
        $log.debug(error.error.code + " " + error.error.message);
        $rootScope.ProdoAppMessage("Error while uploading " + $scope.file.name + " " + error.error.message, 'error');
        
      } else if (error.error.code == 'AV001') { // user data invalid
        $log.debug(error.error.code + " " + error.error.message);
        $rootScope.ProdoAppMessage("Error while uploading " + $scope.file.name + " " + error.error.message, 'error');
       
      } else {
        $log.debug(error.error.message);
        $rootScope.ProdoAppMessage("Error while uploading " + $scope.file.name + " " + error.error.message, 'error');
       
      }

    } else {
      $scope.imageSrc = JSON.stringify(imagelocation);
      $log.debug(JSON.stringify(imagelocation.success.filename));
      $log.debug("Emit");
      var temp1=imagelocation.success.filename.replace(/ /g,'');
      document.getElementById('check'+temp1).style.color="#01DF74";
      $rootScope.$broadcast("campaignUploadResponseSuccess", "success");
      $log.debug("getting response for campaign upload  " + $scope.imageSrc);
      $rootScope.ProdoAppMessage(temp1+"  uploaded successfully...", 'success');
      $scope.counter++;
      $log.debug($scope.counter);
      if ($scope.counter < $scope.fileLength) {
        $log.debug("emitting image " + $scope.counter);
        //    $scope.getFile($scope.counter);
      } else $scope.counter = 0;
    }
  setTimeout(function(){ jQuery("#FileName").hide(); },1000);
};

$scope.campaignBannerUploadResponseHandler=function(error, imagelocation){
 $('#fileInputsUploadcampaignBannerUpdate')[0].reset();
 $("#spinner").hide();
 if (error) {
      // $("#bar").hide();
      
      if (error.error.code == 'AP003') { // user already exist
        $log.debug(error.error.code + " " + error.error.message);
        $rootScope.ProdoAppMessage("Error while uploading " + $scope.file.name + " " + error.error.message, 'error');
        
      } else if (error.error.code == 'AV001') { // user data invalid
        $log.debug(error.error.code + " " + error.error.message);
        $rootScope.ProdoAppMessage("Error while uploading " + $scope.file.name + " " + error.error.message, 'error');
       
      } else {
        $log.debug(error.error.message);
        $rootScope.ProdoAppMessage("Error while uploading " + $scope.file.name + " " + error.error.message, 'error');
       
      }

    } else {
      $scope.imageSrc = JSON.stringify(imagelocation);
      $log.debug(JSON.stringify(imagelocation.success.filename));
      $log.debug("Emit");
      var temp1=imagelocation.success.filename.replace(/ /g,'');
      document.getElementById('check'+temp1).style.color="#01DF74";
      $rootScope.$broadcast("campaignBannerUploadResponseSuccess", "success");
      $log.debug("getting response for campaign upload  " + $scope.imageSrc);
      $rootScope.ProdoAppMessage(temp1+"  uploaded successfully...", 'success');
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
 $('#fileInputsUploadwarranty')[0].reset();
 $("#spinner").hide();
 if (error) {
      // $("#bar").hide();
      
      if (error.error.code == 'AP003') { // user already exist
        $log.debug(error.error.code + " " + error.error.message);
        $rootScope.ProdoAppMessage("Error while uploading " + $scope.file.name + " " + error.error.message, 'error');
       
      } else if (error.error.code == 'AV001') { // user data invalid
        $log.debug(error.error.code + " " + error.error.message);
        $rootScope.ProdoAppMessage("Error while uploading " + $scope.file.name + " " + error.error.message, 'error');
       
      } else {
        $log.debug(error.error.message);
        $rootScope.ProdoAppMessage("Error while uploading " + $scope.file.name + " " + error.error.message, 'error');
        
      }

    } else {
      $scope.imageSrc = JSON.stringify(imagelocation);
      $log.debug(JSON.stringify(imagelocation.success.filename));
      $log.debug("Emit");
      var temp1=imagelocation.success.filename.replace(/ /g,'');
      document.getElementById('check'+temp1).style.color="#01DF74";
      $rootScope.$broadcast("warrantyUploadLogoResponseSuccess", "success");
      $log.debug("getting response for warranty upload  " + $scope.imageSrc);
      $rootScope.ProdoAppMessage(temp1+"  uploaded successfully...", 'success');
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
 $('#fileInputsUploadorgkeyclient')[0].reset();
 $("#spinner").hide();
 if (error) {
      // $("#bar").hide();
      
      if (error.error.code == 'AP003') { // user already exist
        $log.debug(error.error.code + " " + error.error.message);
        $rootScope.ProdoAppMessage("Error while uploading " + $scope.file.name + " " + error.error.message, 'error');
       
      } else if (error.error.code == 'AV001') { // user data invalid
        $log.debug(error.error.code + " " + error.error.message);
        $rootScope.ProdoAppMessage("Error while uploading " + $scope.file.name + " " + error.error.message, 'error');
       
      } else {
        $log.debug(error.error.message);
        $rootScope.ProdoAppMessage("Error while uploading " + $scope.file.name + " " + error.error.message, 'error');
        
      }

    } else {
      $scope.imageSrc = JSON.stringify(imagelocation);
      $log.debug(JSON.stringify(imagelocation.success.filename));
      $log.debug("Emit");
      var temp1=imagelocation.success.filename.replace(/ /g,'');
      document.getElementById('check'+temp1).style.color="#01DF74";
      $rootScope.$broadcast("orgKeyClientResponseSuccess", "success");
      $log.debug("getting response for orgKeyClient upload  " + $scope.imageSrc);
      $rootScope.ProdoAppMessage(temp1+"  uploaded successfully...", 'success');
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
   $('#fileInputsUploadproductlogo')[0].reset();
   $("#spinner").hide();
    if (error) {
      // $("#bar").hide();
     if (error.error.code == 'AP003') { // user already exist
        $log.debug(error.error.code + " " + error.error.message);
        $rootScope.ProdoAppMessage("Error while uploading " + $scope.file.name + " " + error.error.message, 'error');
       
      } else if (error.error.code == 'AV001') { // user data invalid
        $log.debug(error.error.code + " " + error.error.message);
        $rootScope.ProdoAppMessage("Error while uploading " + $scope.file.name + " " + error.error.message, 'error');
        
      } else {
        $log.debug(error.error.message);
        $rootScope.ProdoAppMessage("Error while uploading " + $scope.file.name + " " + error.error.message, 'error');
        

      }
    } else {
      $scope.imageSrc = JSON.stringify(imagelocation);
      $log.debug("Emit");
      var temp1=imagelocation.success.filename.replace(/ /g,'');
      document.getElementById('check'+temp1).style.color="#01DF74";
      $rootScope.$broadcast("productUploadLogoResponseSuccess", "success");
      $log.debug("getting response for logo upload  " + $scope.imageSrc);
      $rootScope.ProdoAppMessage(temp1+"  uploaded successfully...", 'success');
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
   $('#fileInputsUploadorg')[0].reset();
   $("#spinner").hide();
   if (error) {
      // $("#bar").hide();

          if (error.error.code == 'AP003') { // user already exist
        $log.debug(error.error.code + " " + error.error.message);
        $rootScope.ProdoAppMessage("Error while uploading " + $scope.file.name + " " + error.error.message, 'error');
      
      } else if (error.error.code == 'AV001') { // user data invalid
        $log.debug(error.error.code + " " + error.error.message);
        $rootScope.ProdoAppMessage("Error while uploading " + $scope.file.name + " " + error.error.message, 'error');
      
      } else {
        $log.debug(error.error.message);
        $rootScope.ProdoAppMessage("Error while uploading " + $scope.file.name + " " + error.error.message, 'error');
     }

    } else {
      
      $log.debug("getting response for org upload  " + imagelocation);
      $rootScope.$broadcast("orgUploadResponseSuccess", "success");
      $rootScope.ProdoAppMessage(" File uploaded successfully...", 'success');
     
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
      $('#fileInputsUploadorglogo')[0].reset();
      $("#spinner").hide();
       if (error) {
      // $("#bar").hide();

          if (error.error.code == 'AP003') { // user already exist
        $log.debug(error.error.code + " " + error.error.message);
        $rootScope.ProdoAppMessage("Error while uploading " + $scope.file.name + " " + error.error.message, 'error');
      
      } else if (error.error.code == 'AV001') { // user data invalid
        $log.debug(error.error.code + " " + error.error.message);
        $rootScope.ProdoAppMessage("Error while uploading " + $scope.file.name + " " + error.error.message, 'error');
      
      } else {
        $log.debug(error.error.message);
        $rootScope.ProdoAppMessage("Error while uploading " + $scope.file.name + " " + error.error.message, 'error');
       

      }

    } else {
      $log.debug("getting response for org upload logo " + imagelocation);
      console.log("Emitting")
      $rootScope.$broadcast("orgUploadLogoResponseSuccess", "success");
      // growl.addSuccessMessage("File uploaded");
      var temp1=imagelocation.success.filename.replace(/ /g,'');
      document.getElementById('check'+temp1).style.color="#01DF74";
      $rootScope.ProdoAppMessage("File uploaded successfully...", 'success');
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
        $('#fileInputsUploaduser')[0].reset();
        $("#spinner").hide();
     if (error) {
      // $("#bar").hide();

          if (error.error.code == 'AP003') { // user already exist
        $log.debug(error.error.code + " " + error.error.message);
        $rootScope.ProdoAppMessage("Error while uploading " + $scope.file.name + " " + error.error.message, 'error');
     
      } else if (error.error.code == 'AV001') { // user data invalid
        $log.debug(error.error.code + " " + error.error.message);
        $rootScope.ProdoAppMessage("Error while uploading " + $scope.file.name + " " + error.error.message, 'error');
      
      } else {
        $log.debug(error.error.message);
        $rootScope.ProdoAppMessage("Error while uploading " + $scope.file.name + " " + error.error.message, 'error');
      

      }

    } else {
      $log.debug("getting response for user upload  " + imagelocation);
       $rootScope.$broadcast("userUploadResponseSuccess", "success");
      $rootScope.ProdoAppMessage("File uploaded successfully...", 'success');
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

  $scope.blogUploadResponseHandler=function(error, imagelocation){
    // $('#fileInputsUploadproductdata')[0].reset();
    $('#fileInputsUploadblog')[0].reset();
    $("#spinner").hide();
 if (error) {
      // $("#bar").hide();
      
      if (error.error.code == 'AP003') { // user already exist
        $log.debug(error.error.code + " " + error.error.message);
        $rootScope.ProdoAppMessage("Error while uploading " + $scope.file.name + " " + error.error.message, 'error');
        
     
      } else if (error.error.code == 'AV001') { // user data invalid
        $log.debug(error.error.code + " " + error.error.message);
        $rootScope.ProdoAppMessage("Error while uploading " + $scope.file.name + " " + error.error.message, 'error');
       
      } else {
        $log.debug(error.error.message);
        $rootScope.ProdoAppMessage("Error while uploading " + $scope.file.name + " " + error.error.message, 'error');
       
      }

    } else {
      $scope.imageSrc = JSON.stringify(imagelocation);
      $log.debug(JSON.stringify(imagelocation.success.filename));
      $log.debug("Emit");
      var temp1=imagelocation.success.filename.replace(/ /g,'');
      document.getElementById('check'+temp1).style.color="#01DF74";
      $rootScope.$broadcast("blogUploadResponseSuccess", "success");
      $log.debug("getting response for blog upload  " + $scope.imageSrc);
      $rootScope.ProdoAppMessage(temp1+"  uploaded successfully...", 'success');
      $scope.counter++;
      $log.debug($scope.counter);
      if ($scope.counter < $scope.fileLength) {
        $log.debug("emitting image " + $scope.counter);
        //    $scope.getFile($scope.counter);
      } else $scope.counter = 0;
    }
  setTimeout(function(){ jQuery("#FileName").hide(); },1000);
};



$scope.filess=[];
}]);

angular.module('prodo.UploadApp')
.directive('ngFileSelect', ['fileReader', function( ) {

  return {
    link: function ($scope, el) {
      el.bind("change", function (e) {
        $scope.file = (e.srcElement || e.target).files;
        $scope.filess=$scope.file;
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

            FileName = "";
            title = "";
            fn = "";
            a = "";
           
             
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