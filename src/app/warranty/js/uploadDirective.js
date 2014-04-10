angular.module('prodo.WarrantyApp')
.directive('ngFileSelectdata', ['fileReader', function( ) {
  return {
    link: function ($scope, el) {
      el.bind("change", function (e) {
        $scope.file = (e.srcElement || e.target).files;
        //console.log($scope.file);
      
        $scope.fileLength = (e.srcElement || e.target).files;
        //console.log("counter= " + $scope.counter);
        $scope.file = (e.srcElement || e.target).files;
        // if ($scope.uploadSrc == "warranty")
         $scope.getFile($scope.file[0]);
                 
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
}(angular.module('prodo.WarrantyApp')));