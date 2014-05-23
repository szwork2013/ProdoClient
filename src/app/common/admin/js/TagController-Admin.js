angular.module('prodo.AdminApp').controller('prodoAdminTagInputController', [
  '$scope',
  '$log',
  '$rootScope',
  'UserSessionService',
  '$state',
  'tagAddService',
  'domainTagList', 
  'tagdata',
  'checkIfSessionExist',

  function ($scope, $log, $rootScope, UserSessionService, $state, tagAddService, domainTagList, tagdata, checkIfSessionExist) {

     if(checkIfSessionExist.error)
     {
      $state.transitionTo('prodo.landing.signin');
     }
     
     if(checkIfSessionExist.success)
     {
      if(checkIfSessionExist.success.user.isAdmin === false )
      {
        $state.transitionTo('prodo.home.wall');
      }
     }
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

    $scope.categoryDomain = '';

    $scope.allCategories = [];

    $scope.allTagsContain = [];
    if(tagdata.success !== undefined)
    {
      $scope.allTagsContain = tagdata.success.domain_tags.tags;   
    }
    //alert(JSON.stringify(tagdata));
    // domainTagList.getTags();   
     // alert(JSON.stringify(getAllTags)) ;


    var cleanupeventgetalltags = $scope.$on("gotAllDomainTags",function(event,data){
        if(data.error !== undefined && data.error.code === 'AL001' )
      {
        $state.go('prodo.landing.signin');
      }
      if(data.success)
      {

        
         $rootScope.ProdoAppMessage(data.success.message,'success');
      }
      else {
        if (data.error.code== 'AU004') {     // enter valid data
          $rootScope.ProdoAppMessage(data.error.message,'error');    //ShowAlert
        } else {
          $rootScope.ProdoAppMessage(data.error.message,'error');    //ShowError
        }
      }
          
     });

     var cleanupeventnotgotalltags = $scope.$on("notGotAllDomainTags",function(event,message){
      $rootScope.ProdoAppMessage("It looks as though we have broken something on our server system. Our support team is notified and will take immediate action to fix it." + data,'error');    //ShowAlert
   
     });
    

    $scope.addToCategory = function()
    { 
      $scope.allCategories.push($scope.categoryDomain);
    };

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
     
     var cleanupeventKeyTagAdded = $scope.$on("tagAddedSuccessfully",function(event,data){
        if(data.error !== undefined && data.error.code === 'AL001' )
      {
        $rootScope.showModal();
      }
      if(data.success)
      {
         $rootScope.ProdoAppMessage(data.success.message,'success');
         $scope.tagname = '';
         $scope.allCategories = [];
         $scope.category_selection= '';
         $scope.emotionvalueinsert = '';
         $scope.level = '';
         $scope.result = '';
         $scope.emotionvalueinsert = '';
      }
      else {
        if (data.error.code== 'AU004') {     // enter valid data
          $rootScope.ProdoAppMessage(data.error.message,'error');    //ShowAlert
        } else {
          $rootScope.ProdoAppMessage(data.error.message,'error');    //ShowError
        }
      }
          
     });

     var cleanupeventKeyTagNotAdded = $scope.$on("tagsNotAddedSuccessfully",function(event,message){
        $rootScope.ProdoAppMessage("It looks as though we have broken something on our server system. Our support team is notified and will take immediate action to fix it." + data,'error');    //ShowAlert
     });
    
    $scope.submitTag = function () {
        $scope.objectComponents.tagname = $scope.tagname;
        $scope.objectComponents.emotions = {};
        $scope.objectComponents.emotions.category = $scope.category_selection;
        $scope.objectComponents.emotions.emotion = $scope.emotion;
        $scope.objectComponents.emotions.level = $scope.level;
        $scope.objectComponents.emotions.result = $scope.result;
        $scope.objectComponents.domain_tag = $scope.allCategories;

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
        $scope.allCategories = [];

        // var cleanTagsAdded = $scope.$on('tagAddedSuccessfully', function (event, data) {
        //    if(data.error !== undefined && data.error.code === 'AL001' )
        //    {
        //        UserSessionService.resetSession();
        //        $state.go('prodo.landing.signin');
        //    }
        // });
        
        // var cleanEventGetSearchProductNotDone =  $scope.$on('getSearchProductNotDone', function (event, data) {
        // });
    };
     
    $scope.$on('$destroy', function(event, message) {
        // cleanTagsAdded();
        // cleanEventGetSearchProductNotDone();
        cleanupeventKeyTagAdded();
        cleanupeventKeyTagNotAdded();
        cleanupeventgetalltags();
        cleanupeventnotgotalltags();
    });
  }
]);