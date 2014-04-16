angular.module('prodo.ProductApp')
.controller('DragImageController', ['$scope', '$rootScope', '$log','growl', 'notify' , function($scope, $rootScope, $log,growl, notify) {
 var reader;
 var reader1;
 $rootScope.count=0;

//Comment Image error handling
// var UploadErrMsg = document.getElementById('UploadCommentIMGErrMsg');
// $scope.enableErrorMsg=function(){
//    $(".spanCommentIMGErr").css("display", "block");
//    $(".alert-danger").removeClass("in").show();
//    $(".alert-danger").delay(5000).addClass("in").fadeOut(2000);
// };
  
 //Comment Image error handling

var holder = document.getElementById('holder'),
tests = {
  filereader: typeof FileReader != 'undefined',
  dnd: 'draggable' in document.createElement('span'),
  formdata: !!window.FormData,
}, 
support = {
  filereader: document.getElementById('filereader'),
  formdata: document.getElementById('formdata'),
  progress: document.getElementById('progress')
},
acceptedTypes = {
 'image/png': true,
 'image/jpeg': true,
 'image/gif': true
},
fileupload = document.getElementById('upload');

function previewfile(file) {
  if (tests.filereader === true && acceptedTypes[file.type] === true && $rootScope.count===1) {
   reader = new FileReader();
   reader.onload = function (event) {
     $("#prodo-uploadedCommentImage").css("display", "inline");   
    document.getElementById("crossButton").style.display="inline";
    $("#prodo-uploadedCommentImage").attr('src', event.target.result);
    $rootScope.comment_image_l=[{image:event.target.result}];
    };

    reader.readAsDataURL(file);
  } 
  else {
    holder.innerHTML += ' Uploaded ' + file.name + ' ' + (file.size ? (file.size/1024|0) + 'K' : '');

  }
     //get buffer
     reader1 = new FileReader();
     reader1.onload = function (event) {
      var buffer=event.target.result; 
      $rootScope.file_data = {filetype: file.type, filename: file.name, filebuffer: buffer};

    };
    reader1.readAsBinaryString(file);  
}

function readfiles(files) {
  var formData = tests.formdata ? new FormData() : null;   
  for (var i = 0; i < files.length; i++) 
  {
    if (tests.formdata) formData.append('file', files[i]);
    previewfile(files[i]);
    $log.debug(files[i].name);
  }
}

if (tests.dnd) { 
  holder.ondragover = function () { this.className = 'hover'; return false; };
  holder.ondragend = function () { this.className = ''; return false; };
  holder.ondragleave = function () { this.className = ''; return false; };
  holder.ondrop = function (e) 
  { 
    $scope.validImageContent = 0;
   $rootScope.count++;
   this.className = '';
   e.preventDefault();
   
   if(e.dataTransfer.files[0].size/1024>500)
    { 
           $scope.ProdoAppMessage("Please drag image of size upto 500KB","error")  ; 
           $rootScope.count =0; 
           e.dataTransfer.files = [];
           $scope.validImageContent = 1; 
    }
    if(e.dataTransfer.files[0].type !== "image/png" && e.dataTransfer.files[0].type !== "image/jpeg" && e.dataTransfer.files[0].type !== "image/jpg" && e.dataTransfer.files[0].type !== "image/gif")
    {
           $scope.ProdoAppMessage("Please verify extension of image dragged","error")  ;
           $rootScope.count =0; 
           e.dataTransfer.files = []; 
           $scope.validImageContent = 1;
    }
    if($rootScope.count>1)
    { 
          $scope.ProdoAppMessage("You can only drag one image for a comment","error"); 
          $scope.validImageContent = 1; 
    }
  else if($rootScope.count==1 && $scope.validImageContent === 0)
    readfiles(e.dataTransfer.files ); console.log("Here its finally set");
  
}

}

//drag comment image
$scope.ProdoAppMessage = function(message,flag)
    {
          if(flag==='success')
          {
            //growl.addSuccessMessage(message);
            notify({message:message,template:'common/notification/views/notification-success.html',position:'center'})
          }
          else
          {
             notify({message:message,template:'common/notification/views/notification-error.html',position:'center'});   
          }
         // $scope.resetGrowlMessages();
    };


$scope.clearReader=function()
{
  $log.debug("Clear called");
  document.getElementById('prodo-comment-commentContainer').style.marginTop='0px';
  document.getElementById("crossButton").style.display="none";
  document.getElementById("prodo-uploadedCommentImage").style.display="none";
  reader.abort();
  reader1.abort();
  reader=new FileReader();
  reader1=new FileReader();
  $rootScope.file_data ="";
  $rootScope.count=0;
  var element=document.getElementById('prodo-uploadedCommentImage');
};


}]);
