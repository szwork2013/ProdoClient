var UploadController = function($scope, fileReader) {

  $scope.socket = io.connect('http://ec2-54-254-210-45.ap-southeast-1.compute.amazonaws.com:8000/prodoupload', {
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
              var action = {user: {userid: "uxkfzVj7or"}};
              if ($scope.uploadSrc == "user")//it should be user
                var action = {org: {userid: "uxkfzVj7or", orgid: "orge1LSosNiS"}};
              else if ($scope.uploadSrc == "product")
                var action = {product: {userid: $scope.userIDFromSession, orgid: $scope.orgidFromSession, prodle: $scope.product_prodle}};

              $scope.socket.emit('uploadFiles', file_data, action);
              console.log("pic emitted");
              //  $scope.uploadSrc = "";

            });
//            fileReader.readAsBinaryString($scope.file[a], $scope);


  };
//  $scope.socket.removeAllListeners('productUploadResponse');
  $scope.socket.on('productUploadResponse', function(error, imagelocation) {
    if (error) {
      console.log("Error " + error);
    }
    else {
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
    }
  });
  $scope.socket.removeAllListeners('orgUploadResponse');
  $scope.socket.on('orgUploadResponse', function(imagelocation) {
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
  $scope.socket.removeAllListeners('userUploadResponse');
  $scope.socket.on('userUploadResponse', function(imagelocation) {
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


//  var cleanupEventFileProgress=
  $scope.$on("fileProgress", function(e, progress) {

    $scope.progressbar = progress.loaded / progress.total;
    // cleanupEventFileProgress();
  });

  $(document).ready(function() {

    var progress = setInterval(function() {
      var $bar = $('.bar');

      if ($bar.width() == 400) {
        clearInterval(progress);

      } else {
        $bar.width($bar.width() + 40);
      }
      $bar.text($bar.width() / 4 + "%");
    }, 800);

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

                  if ($scope.uploadSrc == "user")
                    $scope.getFile($scope.file[0]);



                  var addUploads = function(i) {

                    //Create an input type dynamically.   
                    var FileName = document.createElement("label");

                    FileName.type = 'label';
                    var title = document.createTextNode("File " + i.name);
                    FileName.appendChild(title);
//                       element.text =  i; // Really? You want the default value to be the type string?
                    FileName.name = 'label';  // And the name too?
                    FileName.setAttribute("style", "text-align:left");
                    var fn = document.getElementById("FileName");
                    fn.appendChild(FileName);

                    var progressbarc = document.createElement("div");
                    progressbarc.className = ' progress progress-info progress-striped active';
                    progressbarc.id = "a2" + i.name;
                    fn.appendChild(progressbarc);

                    var progressbar = document.createElement("div");
                    progressbar.className = 'bar';
                    var a = document.getElementById("a2" + i.name);
                    a.appendChild(progressbar);

                  FileName="";
                  title="";
                  fn="";
                  progressbarc="";
                  progressbar="";
                  a="";

                    
                   
                  }



//                  $scope.$watch(function() {
                  for (var i = 0; i <= $scope.file.length; i++) {
                    addUploads($scope.file[i]);
                    $scope.getFile($scope.file[i]);
                  }
//                  }, true);

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