/*
* Overview: comment Directive
* It is comments block , where it has user avatar, user name, company name, date and time difference from the time of posting that comment, tags and many more
* Dated: 28/10/2013.
* Author: Bhagyashri Jangam
* Copyright: Prodonus Software Private Limited and GiantLeap Systems Private Limited 2013
* Change History:
* ----------------------------------------------------------------------
* date | author | description 
* ----------------------------------------------------------------------
* 27-3/2013 | xyx | Add a new property
* 
*/

angular.module('prodo.CommonApp').directive('prodoComments', function () {
return {
  restrict: 'A',
  
  templateUrl: 'common/commentsDirective/views/prodo.comment.tpl.html',
  controller: [
  '$scope',
  '$log',
  'ProductService',
  '$rootScope',
  'UserSessionService',
  'CommentService',
  'growl',
  'CommentLoadMoreService',
  'TagReffDictionaryService',
  '$http',
  'ENV',
  function ($scope, $log, ProductService, $rootScope, UserSessionService, CommentService,growl,CommentLoadMoreService,TagReffDictionaryService,$http,ENV) {


$scope.likeaction="";
$scope.handleGetAllTagsSuccess=function(successData){
     for (var i = 0; i < successData.success.tags.length; i++) {
      $scope.pretags.push(successData.success.tags[i].tagname);
    }
};

$scope.handleGetAllTagsError=function(error){
   if(error.code=='AL001'){
        $rootScope.showModal();
      }else{
       $log.debug(error);
     }
};

//get predefined tags
TagReffDictionaryService.getAllTags(
function (successData) {
    if (successData.success == undefined) {
     $scope.handleGetAllTagsError(successData.error);
    } 
    else {
     $scope.handleGetAllTagsSuccess(successData);
   }
});
//get predefined tags

  //Load more comments handler
$scope.handleLoadMoreCommentResponse = function (result) {
  console.log(result);
  if (result.success != undefined) {
    $log.debug(result.success.comment);
    for (var i = 0; i < result.success.comment.length; i++) {
      $scope.productComments.push(result.success.comment[i]);
    };
    if((result.success.comment.length)%5 == 0 ){
      $scope.showLoadMore.status= true; 
    }
     else{
      // $("#load-more").css("display", "none");
     $scope.showLoadMore.status=   false;  
      }
  } else {
    $("#loadMoreCommentMsg").css("display", "block");
     setTimeout(function(){ $("#loadMoreCommentMsg").hide();},60000);
   
    // $("#load-more").css("display", "none");
    $scope.showLoadMore.status=   false;  
     if (result.error.code == 'AL001') {
      $rootScope.showModal();
    }
    else if (result.error.code == 'AC002') {
      $("#loadMoreCommentMsg").html(result.error.message);
      // $("#load-more").hide();
      $log.debug(result.error.message);
      } else if (result.error.code == 'AC001') {
      $log.debug(result.error.message);
      $("#loadMoreCommentMsg").html(result.error.message);
    } else {
      $log.debug(result.error.message);
      $("#loadMoreCommentMsg").html(result.error.message);
    }
  }
};
//Load more comments handler
//find last comment id
// $("#load-more").show();
$scope.getLastCommentId = function () {
  $log.debug($scope.productComments);
  $scope.productComments;
  if($scope.productComments){
  if ($scope.productComments.length !== 0) {
    var lengthComments = $scope.productComments.length;
    $log.debug(lengthComments)
    var lastComment = $scope.productComments[lengthComments - 1];
    $log.debug(lastComment.commentid);
    return lastComment.commentid;
  }
}
};
//find last comment id

$("#img-spinner").hide();

//if error adding comment retry function
$scope.showErrorIfCommentNotAdded = function (msg) {
  var retry = document.getElementById("responseCommentErr");
  retry.style.display = 'inline';

  retry.innerHTML = msg;
};
//if error adding comment retry function
//if error adding comment  show retry icon
$scope.showRetryIconIfCommentNotAdded = function () {
  var retryIcon = document.getElementById("retryIcon");
  retryIcon.style.display = 'inline';
};
//if error adding comment  show retry icon


  $scope.commentsLimit = function () {
    return $scope.pagesSize * $scope.pagesShown;
  };
  $scope.fromNow = function (time) {
    if (time != undefined) {
      return moment(time).calendar();
    }
  };
  $scope.toCamelCase = function (s) {
    if (s == undefined || s == '' || s == null) {
      s = '  ';
    } else {
      s = s.replace(/([^a-zA-Z0-9_\- ])|^[_0-9]+/g, '').trim();
      s = s.replace(/([ -]+)([a-zA-Z0-9])/g, function (a, b, c) {
        return c.toUpperCase();
      });
      s = s.replace(/([0-9]+)([a-zA-Z])/g, function (a, b, c) {
        return b + c.toUpperCase();
      });
    }
    return s;
  };
  
  $scope.handleDeleteProductCommentSuccess=function(success){
    $rootScope.ProdoAppMessage("Comment deleted successfully", 'success');

      if($scope.type=='product'){
         if ($scope.product.product_comments) {
                if ($scope.product.product_comments==0) {
                  // $("#load-more").css("display", "none");
                  $scope.showLoadMore.status=   false;  
                } 
            }
      }
      else  if($scope.type=='campaign'){
         if ($scope.campaign.campaign_comments) {
                if ($scope.campaign.campaign_comments==0) {
                  // $("#load-more").css("display", "none");
                  $scope.showLoadMore.status=   false;  
                } 
             }
      }
    

  };

   $scope.handleDeleteProductCommentError=function(error){
     if(error.code=='AL001'){
        $rootScope.showModal();
      }
      else{
        $log.debug(error.message);
        $rootScope.ProdoAppMessage(error.message, 'error');
      }
   };

     $scope.showFeature=function()
  {
    $scope.isCollapsed = false;
  };
   $scope.hideFeature=function()
  {
    $scope.isCollapsed = true;
  };

$scope.addFeatureToComment=function(data){
  if($scope.commenttextField.userComment == undefined){
   $scope.commenttextField.userComment = "" ;
  } 
  if($scope.commenttextField.userComment.length !== 300 ){
   $scope.commenttextField.userComment = $scope.commenttextField.userComment + " "+data+" ";
  }

  $scope.$watch('commenttextField.userComment', function () {

  if($scope.commenttextField.userComment){
  if($scope.commenttextField.userComment.length >300 || $scope.commenttextField.userComment.length < 0 ){
    document.getElementById('prodo-comment-Textbox').style.border ="1px solid #ff8080";
    $scope.commenttextField.userComment=$scope.commenttextField.userComment.substring(0,300);
   }
   else if($scope.commenttextField.userComment.length <=300) {
    document.getElementById('prodo-comment-Textbox').style.border ="solid 1px #5bc0de";
   }
  }
  })
};
//dont show delete comment icon if not comment owener
$scope.hideIfNotUser = function (userid) {
  if (userid) {
    if (userid !== $scope.userIDFromSession) {
      // $log.debug("Userid   "+userid);
      return {
        display: "none"
      }
    }
  }
};
//dont show delete comment icon if not comment owener
//show orgname if exists
$scope.hideIfNoOrg = function (orgname) {
  if ((orgname == "") || (orgname == " ") || (orgname == undefined) || (orgname == null)) {
    return {
      display: "none"
    }
  }
};
//show orgname if exists
//show group name if exists
$scope.hideIfNogrp = function (grpname) {
  if ((grpname == "") || (grpname == " ") || (grpname == undefined) || (grpname == null)) {
    return {
      display: "none"
    }
  }
};
//show group name if exists
//show comment image if exists
$scope.hideIfNotImage = function (image) {
  if ((image == "") || (image == " ") || (image == undefined) || (image == null)) {
    return {
      display: "none"
    }
  }
};
//show comment image if exists 

$scope.likedislike=function(likeaction,comment){
 $scope.message={};
$http({
  method: 'POST',
  url: ENV.apiEndpoint_notSocket + '/api/agreedisagreecomment/' + comment.commentid + '?action=' + likeaction,
}).success(function (data, status, headers, cfg) {
 if(data.success)  {
  $scope.handleLikeDislikeSuccess(data.success,comment);
  $scope.EditCommentLikeDislike(comment,likeaction);
}
else  if(data.error)  {
  $scope.handleLikeDislikeError(data.error,comment);
}
}).error(function (data, status, headers, cfg) {
  // $log.debug(status);
 $rootScope.ProdoAppMessage(status, 'error'); 
});
 $scope.likeaction='';



};

$scope.EditCommentLikeDislike=function(comment,likeaction){
  for(var i=0;i< $scope.productComments.length ; i++){
   if($scope.productComments[i].commentid==comment.commentid){

    if(likeaction=='agree'){
    $scope.productComments[i].agreecount=comment.agreecount+1;
    }
    else if(likeaction=='disagree'){
       $scope.productComments[i].disagreecount=comment.disagreecount+1;
    }
   }
  }
};

  $scope.message={
   
  }
 $scope.handleLikeDislikeSuccess=function(success,comment){
    $log.debug(success);
         // $(".agreesuccess"+comment.commentid).text(success.message);
         // $(".agreesuccess"+comment.commentid).show("slow").delay(4000).hide("slow");
         // $scope.message.success='';
  };


$scope.handleLikeDislikeError=function(error,comment){
  if(error.code=='AL001'){
        $rootScope.showModal();
      }
      else{
         $log.debug(error);
         $(".agreeError"+comment.commentid).text(error.message);
         $(".agreeError"+comment.commentid).show("slow").delay(4000).hide("slow");
        };
 };



}
]
};
});

angular.module('prodo.ProductApp').directive('altSrc', function() {
  return {
    link: function(scope, element, attrs) {
      var defaultSrc = attrs.src;
      element.bind('error', function() {
        if(attrs.errSrc) {
            element.attr('src', attrs.errSrc);
        }
        else if(attrs.src) {
            element.attr('src', defaultSrc);
        }
      });
    }
  }
});



angular.module('prodo.ProductApp').directive(
    'dateInput',
    function(dateFilter) {
        return {
            require: 'ngModel',
            template: '<input type="date"></input>',
            replace: true,
            link: function(scope, elm, attrs, ngModelCtrl) {
                ngModelCtrl.$formatters.unshift(function (modelValue) {
                    return dateFilter(modelValue, 'yyyy-MM-dd');
                });

                ngModelCtrl.$parsers.unshift(function(viewValue) {
                    return new Date(viewValue);
                });
            },
        };
});
