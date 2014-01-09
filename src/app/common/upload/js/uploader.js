var UploadController = function($scope, fileReader) {

  $scope.socket = io.connect('http://ec2-54-254-210-45.ap-southeast-1.compute.amazonaws.com:8000', {
    query: 'session_id=' + localStorage.sid
  });
  //socket connect 

  $scope.fileLength;
  $scope.progressbar = 0;
  $scope.counter = 0;
  $scope.getFile = function(a) {
    $scope.progressbar = 0;
    console.log("source: " + $scope.uploadSrc);
    console.log("getFile called ... " + a);

    fileReader.readAsBinaryString(a, $scope)
            .then(function(result) {
              console.log("reader called ... " + a);
              $scope.imageBfr = result;
              $scope.file = a;
              var file_data = {filetype: $scope.file.type, filename: $scope.file.name, filebuffer: $scope.imageBfr};
              //var action={user:{userid:"uxkfzVj7or" }};
              if ($scope.uploadSrc == "user")//it should be user
                var action = {org: {userid: "uxkfzVj7or", orgid: "orge1LSosNiS"}};
              else if ($scope.uploadSrc == "product")
                var action = {product: {userid: $scope.userIDFromSession, orgid: $scope.orgidFromSession, prodle: $scope.product_prodle}};

              $scope.socket.emit('uploadFiles', file_data, action);
              console.log("pic emitted");
//              $scope.uploadSrc = "";

            });
//            fileReader.readAsBinaryString($scope.file[a], $scope);


  };
  $scope.socket.removeAllListeners('uploadFileResponse');
  $scope.socket.on('uploadFileResponse', function(imagelocation) {
    console.log("getting response for product upload  " + imagelocation);
    $scope.imageSrc = imagelocation;
    $scope.counter++;
    console.log($scope.counter);
    if ($scope.counter < $scope.fileLength) {
      console.log("emitting image " + $scope.counter);
//    $scope.getFile($scope.counter);
    }
    else
      $scope.counter = 0;
    ;
  });



  $scope.$on("fileProgress", function(e, progress) {
    $scope.progressbar = progress.loaded / progress.total;
  });



};
angular.module('upload')
        .directive('ngFileSelect', ['fileReader', function( ) {
            return {
              link: function($scope, el) {
                el.bind("change", function(e) {
                  $scope.file = (e.srcElement || e.target).files;
                  console.log($scope.file);
                  $scope.fileLength = (e.srcElement || e.target).files;
                  console.log("counter= " + $scope.counter);
                  $scope.file = (e.srcElement || e.target).files;
//                  $scope.getFile($scope.counter);



                  var addUploads = function(i) {

                    //Create an input type dynamically.   
                    var FileName = document.createElement("label");
                    //Assign different attributes to the element. 
                    FileName.type = 'label';
                    var t = document.createTextNode("File " + i.name);
                    FileName.appendChild(t);
//                       element.text =  i; // Really? You want the default value to be the type string?
                    FileName.name = 'label';  // And the name too?

                    //  var foo = document.getElementById("FileName");
                    //Append the element in page (in span).  





                    //Create an input type dynamically.   
                    var element = document.createElement("button");
                    //Assign different attributes to the element. 
                    element.type = 'button';
                    var t = document.createTextNode("  " + i.name + "  ");
                    element.appendChild(t);
                    //   element.value =  $scope.counter; // Really? You want the default value to be the type string?
                    element.name = 'button';  // And the name too?
                    element.onclick = function() { // Note this is a function
                      $scope.getFile(i);
                    };


//                    var img = document.createElement("img");
//                    img.src =  imageSrc;
//                    img.setAttribute("height", "50");
//                    img.setAttribute("width", "50");
//                    img.setAttribute("alt",  i.name);


                    var newline = document.createElement("br");
                    var foo = document.getElementById("uploadButtons");
                    //Append the element in page (in span). 
                    foo.appendChild(FileName);
                    foo.appendChild(element);
                //     foo.appendChild(img);
                    
                    foo.appendChild(newline);
                  }



                  $scope.$watch(function() {
//                    for (i=0;i<$scope.fileLength;i++){
                    addUploads($scope.file[0]);
                    addUploads($scope.file[1]);



//                    }                    



                  }, true);

                })
              }
            }
          }]);

(function(module) {
  var fileReader = function($q, $log) {
    var onLoad = function(reader, deferred, scope) {
      return function() {
        scope.$apply(function() {
          deferred.resolve(reader.result);
        });
      };
    };
    var onError = function(reader, deferred, scope) {
      return function() {
        scope.$apply(function() {
          deferred.reject(reader.result);
        });
      };
    };
    var onProgress = function(reader, scope) {
      return function(event) {
        scope.$broadcast("fileProgress",
                {
                  total: event.total,
                  loaded: event.loaded
                });
      };
    };

    var getReader = function(deferred, scope) {
      var reader = new FileReader();
      reader.onload = onLoad(reader, deferred, scope);
      reader.onerror = onError(reader, deferred, scope);
      reader.onprogress = onProgress(reader, scope);
      return reader;
    };
    var readAsBinaryString = function(file, scope) {
      var deferred = $q.defer();
      var reader = getReader(deferred, scope);
      reader.readAsBinaryString(file);
      return deferred.promise;
    };
    return {
      readAsBinaryString: readAsBinaryString
    };
  };
  module.factory("fileReader",
          ["$q", "$log", fileReader]);
}(angular.module("upload")));