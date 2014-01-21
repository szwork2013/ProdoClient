angular.module('prodo.ProductApp')
        .controller('DragImageController', ['$scope', '$rootScope', '$log', function($scope, $rootScope, $log) {

   var fx=function()
    {
      document.getElementById("holder").setAttribute('class', 'holderx');
    };
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
      var reader = new FileReader();
      reader.onload = function (event) {
      var image = new Image();
      image.src = event.target.result; 
      $rootScope.comment_image_l=[{image:image.src}];
      image.width = 250; // a fake resize
      holder.appendChild(image);
    };

    reader.readAsDataURL(file);
    } 
      else {
        holder.innerHTML += ' Uploaded ' + file.name + ' ' + (file.size ? (file.size/1024|0) + 'K' : '');

    }
     //get buffer
      var reader1 = new FileReader();
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
    this.className = '';
    e.preventDefault();
    readfiles(e.dataTransfer.files);
  }

}

//drag comment image



}]);
