angular.module('prodo.AdminApp').controller('prodoAdminTagInputController', [
  '$scope',
  '$log',
  '$rootScope',
  'UserSessionService',
  '$http',
  'tagAddService',
  function ($scope, $log, $rootScope, UserSessionService, $http, tagAddService) {

    $scope.category_selection;

    $scope.option1;

    $scope.option2;

    $scope.objectComponents = {};

    $scope.tagInfo = {};

    $scope.tagid;

    $scope.tagname;

    $scope.result;

    $scope.level;

    $scope.emotion;

    $scope.urls;

    $scope.emotionvalueinsert;

    $scope.trimmedURL;

    $scope.setEmotion = function () {

      if ($scope.category_selection === 'Love') {
        $scope.option1 = 'Serenity [10]';
        $scope.option2 = 'Joy [20]';
        $scope.option3 = 'Ecstasy [30]';
      } else if ($scope.category_selection === 'Optimism') {
        $scope.option1 = 'Interest [10]';
        $scope.option2 = 'Anticipation [20]';
        $scope.option3 = 'Vigilance [30]';
      } else if ($scope.category_selection === 'Aggressiveness') {
        $scope.option1 = 'Annoyance [10]';
        $scope.option2 = 'Anger [20]';
        $scope.option3 = 'Rage [30]';
      } else if ($scope.category_selection === 'Contempt') {
        $scope.option1 = 'Boredom [10]';
        $scope.option2 = 'Disgust [20]';
        $scope.option3 = 'Loathing [30]';
      } else if ($scope.category_selection === 'Remorse') {
        $scope.option1 = 'Pensiveness [10]';
        $scope.option2 = 'Sadness [20]';
        $scope.option3 = 'Grief [30]';
      } else if ($scope.category_selection === 'Disapproval') {
        $scope.option1 = 'Distraction [10]';
        $scope.option2 = 'Surprise [20]';
        $scope.option3 = 'Amazement [30]';  
      } else if ($scope.category_selection === 'Awe') {
        $scope.option1 = 'Apprehension [10]';
        $scope.option2 = 'Fear [20]';
        $scope.option3 = 'Terror [30]';
      } else if ($scope.category_selection === 'Submission') {
        $scope.option1 = 'Acceptance [10]';
        $scope.option2 = 'Trust [20]';
        $scope.option3 = 'Adoration [30]';
      }
    };

    $scope.submitTag = function () {
        $scope.objectComponents.tagname = $scope.tagname;
        $scope.objectComponents.emotions = {};
        $scope.objectComponents.emotions.category = $scope.category_selection;
        $scope.objectComponents.emotions.emotion = $scope.emotion;
        $scope.objectComponents.emotions.level = $scope.level;
        $scope.objectComponents.emotions.result = $scope.result;

        var fullPath = document.getElementById('4').value;
        if (fullPath) {
          var startIndex = fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/');
          var filename = fullPath.substring(startIndex);
          if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
            filename = filename.substring(1);
          }
          $scope.trimmedURL = filename;
        }

        $scope.objectComponents.emotions.emotion_url = $scope.trimmedURL;
        $scope.tagInfo.tagreffdicdata = {};
        $scope.tagInfo.tagreffdicdata = $scope.objectComponents;
        tagAddService.addTagFunction($scope.tagInfo);

        // var cleanEventGetSearchProductDone = $scope.$on('getSearchProductDone', function (event, data) {
        // });
        
        // var cleanEventGetSearchProductNotDone =  $scope.$on('getSearchProductNotDone', function (event, data) {
        // });
    };

    $scope.$on('$destroy', function(event, message) {
        // cleanEventGetSearchProductDone();
        // cleanEventGetSearchProductNotDone();
    });
  }
]);