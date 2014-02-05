angular.module('prodo.AdminApp')
        .controller('prodoAdminTagInputController', ['$scope','$log', '$rootScope', 'prodoCommentService', 'UserSessionService','$http', function($scope, $log,$rootScope, prodoCommentService, UserSessionService,$http) {
  

  $scope.category_selection;
  $scope.option1;
  $scope.option2;
  $scope.query={};
  $scope.tagid;
  $scope.tagname;
  $scope.result;
  $scope.level;
  $scope.emotion; $scope.urls;
  $scope.emotionvalueinsert;
  $scope.urll;

  $scope.setEmotion=function()
  {
  if($scope.category_selection==="Love")
  {
    $scope.option1="Serenity [10]"; 
    $scope.option2="Joy [20]";
    $scope.option3="Ecstasy [30]";
  }
  else if ($scope.category_selection==="Optimism")
  {
    $scope.option1="Interest [10]";
    $scope.option2="Anticipation [20]";
    $scope.option3="Vigilance [30]"; 
  }
  else if($scope.category_selection==="Aggressiveness") 
  {
    $scope.option1="Annoyance [10]";
    $scope.option2="Anger [20]";
    $scope.option3="Rage [30]";
  }
  else if($scope.category_selection==="Contempt")
  {
    $scope.option1="Boredom [10]";
    $scope.option2="Disgust [20]";
    $scope.option3="Loathing [30]";
  }
  else if($scope.category_selection==="Remorse")
  {
    $scope.option1="Pensiveness [10]";
    $scope.option2="Sadness [20]";
    $scope.option3="Grief [30]";
    
  }
  else if($scope.category_selection==="Disapproval")
  {
    $scope.option1="Distraction [10]";
    $scope.option2="Surprise [20]";
    $scope.option3="Amazement [30]";
  }
  else if($scope.category_selection==="Awe")
  {
    $scope.option1="Apprehension [10]";
    $scope.option2="Fear [20]";
    $scope.option3="Terror [30]";
  }
  else if($scope.category_selection==="Submission")
  {
    $scope.option1="Acceptance [10]";
    $scope.option2="Trust [20]"; 
    $scope.option3="Adoration [30]";
  } 
 

    
}; 
				  $scope.func=function()  
				  {
				 
				    $scope.query.Tag_ID=$scope.tagid;
				    $scope.query.Tag_Name=$scope.tagname;
				    $scope.query.Emotions={};
				    $scope.query.Emotions.Category=$scope.category_selection;
				    $scope.query.Emotions.Emotion=$scope.emotion;
				    $scope.query.Emotions.Level=$scope.level;
				    $scope.query.Emotions.Result=$scope.result;
				             var fullPath = document.getElementById('4').value;
				                if (fullPath) {
				                	var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
				                	var filename = fullPath.substring(startIndex);
				                	if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
				                		filename = filename.substring(1);
				                	}
				                	$scope.urll=filename;
				                }
				   // $scope.query.Emotions.Emotion_URL=document.getElementById("4").files;
				$scope.query.Emotions.Emotion_URL=$scope.urll;
				 
				  }; 
  
				  $scope.funct=function()
				  {
				    var e = document.getElementById("1");
				    var strUser = e.options[e.selectedIndex].text;
				    $scope.emotion=strUser;
				    

				  };

}]);