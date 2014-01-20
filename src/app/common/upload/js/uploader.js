var UploadController = function($scope,$log,$rootScope, fileReader) {

  $scope.socket = io.connect('http://ec2-54-254-210-45.ap-southeast-1.compute.amazonaws.com:8000/prodoupload', {
    query: 'session_id=' + localStorage.sid
  });
  //socket connect 

  $scope.fileLength;
  $scope.uploadSrc;
  $scope.progressbar = 0;
  $scope.counter = 0;
  $scope.getFile = function(a) {
    $scope.progressbar = 0;
    $log.debug("source: " + $scope.uploadSrc);
    $log.debug("getFile called ... " + a);

    fileReader.readAsBinaryString(a, $scope)
            .then(function(result) {
              $log.debug("reader called ... " + a);
              $scope.imageBfr = result;
              $scope.file = a;
              var file_data = {filetype: $scope.file.type, filename: $scope.file.name, filebuffer: $scope.imageBfr};
              if ($scope.uploadSrc == "user")//it should be user
              var action = {user: {userid: $rootScope.usersession.currentUser.userid}};
             else if ($scope.uploadSrc == "org")//it should be org
                var action = {org: {userid: $rootScope.usersession.currentUser.userid, orgid:  $rootScope.usersession.currentUser.org.orgid}};
              else if ($scope.uploadSrc == "product")
                var action = {product: {userid: $rootScope.usersession.currentUser.userid, orgid:  $rootScope.usersession.currentUser.org.orgid, prodle: $scope.product_prodle}};

              $scope.socket.emit('uploadFiles', file_data, action);
              $log.debug("pic emitted");
              //  $scope.uploadSrc = "";

            });
//            fileReader.readAsBinaryString($scope.file[a], $scope);


  };
  $scope.socket.removeAllListeners('productUploadResponse');
  $scope.socket.on('productUploadResponse', function(error, imagelocation) {
    if (error) {
      $log.debug("Error " + error);
    }
    else {
      $log.debug("getting response for product upload  " + imagelocation);
      $scope.imageSrc = imagelocation;
      $scope.counter++;
      $log.debug($scope.counter);
      if ($scope.counter < $scope.fileLength) {
        $log.debug("emitting image " + $scope.counter);
//    $scope.getFile($scope.counter);
      }
      else
        $scope.counter = 0;
    }
  });

  $scope.socket.removeAllListeners('orgUploadResponse');
  $scope.socket.on('orgUploadResponse', function(error, imagelocation) {
    if (error) {
      $log.debug("Error " + error);
    }
    else {
      $log.debug("getting response for org upload  " + imagelocation);
      $scope.imageSrc = imagelocation;
      $scope.counter++;
      $log.debug($scope.counter);
      if ($scope.counter < $scope.fileLength) {
        $log.debug("emitting image " + $scope.counter);
//    $scope.getFile($scope.counter);
      }
      else
        $scope.counter = 0;
    }
  });

  $scope.socket.removeAllListeners('userUploadResponse');
  $scope.socket.on('userUploadResponse', function(error, imagelocation) {
    if (error) {
      $log.debug("Error " + error);
    }
    else {
      $log.debug("getting response for user upload  " + imagelocation);
      $scope.imageSrc = imagelocation;
      $scope.counter++;
      $log.debug($scope.counter);
      if ($scope.counter < $scope.fileLength) {
        $log.debug("emitting image " + $scope.counter);
//    $scope.getFile($scope.counter);
      }
      else
        $scope.counter = 0;
    }
  });


//  var cleanupEventFileProgress=
  $scope.$on("fileProgress", function(e, progress) {

    //  $scope.progressbar = progress.loaded / progress.total;
    // cleanupEventFileProgress();
  });



};
angular.module('prodo.UploadApp')
        .directive('ngFileSelect', ['fileReader', function( ) {
            return {
              link: function($scope,el) {
                el.bind("change", function(e) {
                  $scope.file = (e.srcElement || e.target).files;
                  //console.log($scope.file);
                  $scope.fileLength = (e.srcElement || e.target).files;
                  //console.log("counter= " + $scope.counter);
                  $scope.file = (e.srcElement || e.target).files;

                  if ($scope.uploadSrc == "user")
                    $scope.getFile($scope.file[0]);



                  var addUploads = function(i) {


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
                    var a = document.getElementById("a2" + i.name);
                    progressbar.style.width = '300px';

                    a.appendChild(progressbar);



                    var progress = setInterval(function() {
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
}(angular.module("prodo.UploadApp")));