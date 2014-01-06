var UploadController = function($scope, fileReader,fileReaderUrl) {
  console.log(fileReader);
  //socket connect
  $scope.socket = io.connect('http://ec2-54-254-210-45.ap-southeast-1.compute.amazonaws.com:8000', {
    query: 'session_id=' + localStorage.sid
  });
  //socket connect 

  $scope.getFile = function() {
    $scope.progress = 0;
    fileReader.readAsBinaryString($scope.file, $scope)
            .then(function(result) {
              $scope.imageBfr = result;
              var file_data = {filetype: $scope.file.type, filename: $scope.file.name, filebuffer: $scope.imageBfr};
              //var action={user:{userid:"uxkfzVj7or" }};
              var action = {org: {userid: "uxkfzVj7or", orgid: "orge1LSosNiS"}};
              $scope.socket.emit('uploadFiles', file_data, action);
              console.log("pic emitted");


            });

    fileReaderUrl.readAsDataURL($scope.file, $scope)
            .then(function(result) {
              $scope.imageSrc = result;
            });


  };

  $scope.socket.on('uploadFileResponse', function(imagelocation) {
    console.log("getting response for product upload  " + imagelocation);

  });

  $scope.$on("fileProgress", function(e, progress) {
    $scope.progress = progress.loaded / progress.total;
  });

};
angular.module('upload')
        .directive('ngFileSelect', function() {


          return {
            link: function($scope, el) {

              el.bind("change", function(e) {

                $scope.file = (e.srcElement || e.target).files[0];
                $scope.getFile();
              })

            }

          }


        });



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

 var fileReaderUrl = function($q, $log) {

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
 

    var readAsDataURL = function(file, scope) {
      var deferred = $q.defer();

      var reader = getReader(deferred, scope);
      reader.readAsDataURL(file);

      return deferred.promise;
    };

    return {
      readAsDataURL: readAsDataURL
    };
  };




  module.factory("fileReaderUrl",
          ["$q", "$log", fileReaderUrl]);

}(angular.module("upload")));