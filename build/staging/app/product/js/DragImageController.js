angular.module('prodo.ProductApp')
        .controller('DragImageController', ['$scope', '$rootScope', '$log', function($scope, $rootScope, $log) {
   var reader;
   var reader1;
   $rootScope.count=0;
   function clearBorder()
    {
        document.getElementById("holder").setAttribute('class', 'holderx');
    }
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
      if (tests.filereader === true && acceptedTypes[file.type] === true) {
       reader = new FileReader();
      reader.onload = function (event) {
      var image = new Image();
      image.src = event.target.result; 
      image.id="prodo-uploadedCommentImage";
      document.getElementById("crossButton").style.display="inline";
      $rootScope.comment_image_l=[{image:image.src}];
      image.width = 250; // a fake resize
      holder.appendChild(image);
      document.getElementById('prodo-comment-commentContainer').style.marginTop='60px';
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
//getbuffer
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
        holder.ondrop = function (e) 
      { 
                               $rootScope.count++;
                              this.className = '';
                              e.preventDefault();
                               if(acceptedTypes[e.dataTransfer.files[0].type] === false)
                                {document.getElementById('CommentImg').innerHTML="Add image only"}
                              else if(e.dataTransfer.files[0].size/1024>500)
                                {document.getElementById('CommentImg').innerHTML="Image size must ne less than 500kb"}
                             else if($rootScope.count>1)
                              {document.getElementById('CommentImg').innerHTML="Add only one image at a time"}
                              else if($rootScope.count==1 && acceptedTypes[e.dataTransfer.files[0].type] === true && e.dataTransfer.files[0].size/1024<500)
                              readfiles(e.dataTransfer.files );
                              
  }

}

//drag comment image
 $scope.clearReader=function()
                              {
                                $log.debug("Clear called");
                                 document.getElementById('prodo-comment-commentContainer').style.marginTop='0px';
                                document.getElementById("crossButton").style.display="none";
                                 reader.abort();
                                  reader1.abort();
                                  reader=new FileReader();
                                  reader1=new FileReader();
                                  $rootScope.file_data ="";
                                  $rootScope.count--;
                                 var element=document.getElementById('prodo-uploadedCommentImage');
                                 if (typeof(element) != 'undefined' && element != null)
                                  {
                                    element.parentNode.removeChild(element);
                                    // exists.
                                  }
                              }


}]);
