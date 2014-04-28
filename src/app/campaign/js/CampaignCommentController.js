/* Overview: campaign comment Controller 
* Controller for campaign comments,product features etc
* Dated: 18/02/2014.
* Author: Bhagyashri Jangam
* Copyright: Prodonus Software Private Limited and GiantLeap Systems Private Limited 2013
* Change History:
*
* date | author | description 
*
* 28-04-2013 | xyx | Add a new property
* 
*/
angular.module('prodo.CampaignApp')
.controller('CampaignCommentController', ['$scope', '$log', '$rootScope', 'ProductService', 'UserSessionService', '$http', 'CommentLoadMoreService', 'ENV', 'TagReffDictionaryService', 'ProductFeatureService', 'isLoggedin','CampaignWallService',  function ($scope, $log, $rootScope, ProductService, UserSessionService, $http, CommentLoadMoreService, ENV, TagReffDictionaryService, ProductFeatureService ,isLoggedin,CampaignWallService) {

 $scope.count;
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
//Generate GUID for commentid


function S4() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

function guid() {
  return (S4() + "-" + S4() + "-" + Date.now().toString());
}
//Generate GUID commentid
//socket connect
localStorage.sid = $rootScope.usersession.currentUser.sessionid;
if ((localStorage.sid !== "") || (localStorage.sid !== " ") || (localStorage.sid !== undefined) || (localStorage.sid !== null)) {
  $log.debug("Socket = " + ENV.apiEndpoint);
  $scope.socket = io.connect(ENV.apiEndpoint + ENV.port + '/api/prodoapp', {
    // $scope.socket = io.connect('www.prodonus.com:8000/api/prodoapp', {
    // $scope.socket = io.connect('http://localhost/prodoapp', {
    query: 'session_id=' + localStorage.sid
  });
}
//socket connect
//socket response when for add comment
$scope.commentError="";
$scope.socket.removeAllListeners('addcommentResponse');
$scope.socket.on('addcommentResponse', function (error, result) {
  if (error) {
    $scope.commentError=error.error.message;
    $log.debug(error.error.message);
     $rootScope.ProdoAppMessage(error.error.message, 'error');
    $scope.showErrorIfCommentNotAdded(); //If error retry add comment 
    $scope.showRetryIconIfCommentNotAdded();
    // if(retry) retry.textContent("Error posting comment.. Please try again");
  } else if (result) {
    // $log.debug(result.success.message);
    $scope.ifErrorAddingComment = false;
    $scope.commentError=false;
    $log.debug("addcommentResponse success" + JSON.stringify( result.success.product_comment));
  }
  //   $scope.socket.removeAllListeners();
});
//socket response when for add comment
//productComment response -on the fly comment listener creation
$scope.productcommentResponseListener = "productcommentResponse" + $rootScope.product_prodle;
$scope.socket.removeAllListeners($scope.productcommentResponseListener);
$scope.socket.on($scope.productcommentResponseListener, function (error, result) {
  if (error) {
    $log.debug(error.error.message);
    $rootScope.ProdoAppMessage(error.error.message, 'error');
  } else if (result) {
    $log.debug("productcomment  Response success" + JSON.stringify(result.success.product_comment));
    //  $scope.productCommentResponsearray.push( JSON.stringify(result.success.product_comment));
    //comment info from server response
    $scope.newProductComment = {
      product_comment: {
        user: {
          userid: result.success.product_comment.user.userid,
          username: result.success.product_comment.user.username,
          orgname: result.success.product_comment.user.orgname,
          grpname: result.success.product_comment.user.grpname,
          profilepic: result.success.product_comment.user.profilepic
        },
        commentid: result.success.product_comment.commentid,
        type: result.success.product_comment.type,
        datecreated: result.success.product_comment.datecreated,
        commenttext: result.success.product_comment.commenttext,
        analytics: $scope.tagPairs

      }
    };

    // $scope.productCommentResponsearray.push($scope.newProductComment.product_comment);
    $rootScope.productCommentResponsearray.push($scope.newProductComment.product_comment);
    $log.debug($rootScope.productCommentResponsearray);
    $scope.count = $rootScope.productCommentResponsearray.length;
    $log.debug($scope.count);
    var a = document.getElementById("responseComment");
    a.style.display = 'inline';
    a.innerHTML = $scope.count + ' new comments'; //show new added comments to other users
    // a.textContent(JSON.stringify(result.success.product_comment).length + " new comments")
  }
  // $scope.socket.removeAllListeners();
});
//productComment response -on the fly comment listener creation
//get tags from comment text
$scope.commenttextField.userComment = "";
$scope.getTagsFromCommentText = function () {
  // $log.debug($scope.pretags);
  $scope.mytags = $scope.pretags;
  var commenttext = $scope.commenttextField.userComment;
  var new_arr = [];
  if ($scope.commenttextField.userComment) {
    var commenttextTags = commenttext.split(' ');
    for (var i = 0; i < commenttextTags.length; i++) {
      for (var j = 0; j < $scope.mytags.length; j++) {
        if (commenttextTags[i].toLowerCase() == $scope.mytags[j].toLowerCase()) {
           new_arr.push(commenttextTags[i]);
        }
      }
    }
  }
  $scope.mytags = new_arr; //tags from comment text
  //feature tags
  $scope.myFeaturetags = $scope.featuretags;
  var new_arr = [];
  if ($scope.commenttextField.userComment) {
    var commenttextTags = commenttext.split(' ');
    for (var i = 0; i < commenttextTags.length; i++) {
      for (var j = 0; j < $scope.myFeaturetags.length; j++) {
        if (commenttextTags[i].toLowerCase() == $scope.myFeaturetags[j].toLowerCase()) {
          new_arr.push(commenttextTags[i]);
        }
      }
    }
  }
  $scope.myFeaturetags = new_arr; //feature tags from comment text
  //feature tags
  $log.debug($scope.mytags);
  $log.debug($scope.myFeaturetags);

};
//get tags from comment text

//On the fly tags
$scope.$watch('commenttextField.userComment', function () {
   $scope.getTagsFromCommentText();
  if ($scope.mytags.length == 0) {
    $("#prodo-productTags").css("display", "none");
  } else {
    $("#prodo-productTags").css("display", "inline");
    // document.getElementById('prodo-comment-commentContainer').style.marginTop='80px';  
  }
});

$scope.$watch('mytags', function () {
  $scope.mytags;
  // $log.debug("tags "+$scope.mytags);
})
//make feature and its adjective's pairs
$scope.makeTagsPair = function (noun, adj) {
  for (var i = 0; i < adj.length; i++) {
    if (noun[i] == undefined) $scope.tagPairs.push({
      featureid: "1",
      featurename: $scope.features[0].featurename,
      tag: adj[i]
    });
    else $scope.tagPairs.push({
      featureid: "1",
      featurename: noun[i],
      tag: adj[i]
    });
  }

  for (var i = 0; i < $scope.features.length; i++) {
    for (j = 0; j < $scope.tagPairs.length; j++) {
      if ($scope.features[i].featurename == $scope.tagPairs[j].featurename) {
        $scope.tagPairs[j].featureid = $scope.features[i].featureid;
        $log.debug("fn2" + $scope.tagPairs[j].featurename + " " + $scope.tagPairs[j].tag + " " + $scope.tagPairs[j].featureid);
      }
    }
  }
};

 $scope.handleAddProductComment=function(error){
    if(error.code=='AL001'){
        $rootScope.showModal();
      }else{
      $log.debug(error);
      $rootScope.showModal();
    }
 };

//add comment
$scope.addProductComment = function () {
  

isLoggedin.checkUserSession(
function (successData) {
    if (successData.success == undefined) {
      if(successData.error)
      {
       $scope.handleAddProductComment(successData.error);
      } 
     }
    else { //add comment
   
  

   $scope.commentError=false;
  if ($scope.commenttextField.userComment == "" || $scope.commenttextField.userComment == undefined || $scope.commenttextField.userComment == null) {
   $rootScope.ProdoAppMessage("You can not add blank comment", 'error');
  }
  else{

    $log.debug("tags " + $scope.mytags);
    $log.debug("features " + $scope.myFeaturetags);
    $scope.makeTagsPair($scope.myFeaturetags, $scope.mytags);
    $log.debug("Pair : " + JSON.stringify($scope.tagPairs));
    $log.debug($rootScope.file_data);
    $log.debug($rootScope.comment_image_l);
    var uniquecommentid=guid();
    // if($rootScope.file_data==undefined){
    if (($rootScope.file_data == "") || ($rootScope.file_data == " ") || ($rootScope.file_data == undefined) || ($rootScope.file_data == null)) {
      $scope.newProductComment = {
        product_comment: {
          user: {
            userid: $scope.userIDFromSession,
            username: $scope.usernameFromSession,
            orgname: $scope.orgnameFromSession,
            grpname: $scope.grpnameFromSession,
            profilepic: $rootScope.usersession.currentUser.profile_pic.image
          },
          commentid: uniquecommentid,
          type: $scope.type,
          datecreated: Date.now(),
          tags: $scope.mytags,
          commenttext: $scope.commenttextField.userComment,
          analytics: $scope.tagPairs

        }
      };

      $scope.newProductComment_image = {
        product_comment: {
          user: {
            userid: $scope.userIDFromSession,
            username: $scope.usernameFromSession,
            orgname: $scope.orgnameFromSession,
            grpname: $scope.grpnameFromSession,
            profilepic: $rootScope.usersession.currentUser.profile_pic.image
          },
          commentid: uniquecommentid,
          type: $scope.type,
          datecreated: Date.now(),
          tags: $scope.mytags,
          commenttext: $scope.commenttextField.userComment,
          analytics: $scope.tagPairs

        }
      };

    } else {
      $scope.newProductComment = {
        product_comment: {
          user: {
            userid: $scope.userIDFromSession,
            username: $scope.usernameFromSession,
            orgname: $scope.orgnameFromSession,
            grpname: $scope.grpnameFromSession,
            profilepic: $rootScope.usersession.currentUser.profile_pic.image
          },
          commentid: uniquecommentid,
          type: $scope.type,
          datecreated: Date.now(),
          commenttext: $scope.commenttextField.userComment,
          tags: $scope.mytags,
          comment_image: $rootScope.file_data,
          analytics: $scope.tagPairs
        }
      };

      $scope.newProductComment_image = {
        product_comment: {
          user: {
            userid: $scope.userIDFromSession,
            username: $scope.usernameFromSession,
            orgname: $scope.orgnameFromSession,
            grpname: $scope.grpnameFromSession,
            profilepic: $rootScope.usersession.currentUser.profile_pic.image
          },
          commentid: uniquecommentid,
          type: $scope.type,
          datecreated: Date.now(),
          tags: $scope.mytags,
          commenttext: $scope.commenttextField.userComment,
          comment_image: $rootScope.comment_image_l,
          analytics: $scope.tagPairs
        }
      };
      $rootScope.file_data = "";

    }

    var follow;
    for (i = 0; i < $scope.ProductsFollowedFromSession.length; i++) {
      if ($scope.ProductsFollowedFromSession[i].prodle == $rootScope.product_prodle) {
        follow = true;
      }
    }
    if (follow == true) {
      $log.debug($scope.newProductComment.product_comment);
      $scope.socket.emit('addComment', $rootScope.product_prodle, $rootScope.campaignidWall, $scope.newProductComment.product_comment);
      if ($scope.productComments == undefined) {
        $scope.productComments = [];
        $scope.productComments.unshift($scope.newProductComment_image.product_comment);
      } else {
        $scope.productComments.unshift($scope.newProductComment_image.product_comment);
      }

      $scope.commenttextField.userComment = "";
      $scope.tagPairs = [];
      $rootScope.count = 0;
      document.getElementById('prodo-comment-commentContainer').style.marginTop = '0px';
      document.getElementById("crossButton").style.display = "none";
      $("#prodo-uploadedCommentImage").css("display", "none");
      $scope.mytags = "";
    } else {
      $rootScope.ProdoAppMessage("Please talkin this product to start commenting...", 'info');
    }
  
}

 }
});  // isLoggedin check end


};

$scope.addProductCommentretry = function (comment) {
isLoggedin.checkUserSession(
function (successData) {
    if (successData.success == undefined) {
      if(successData.error)
      {
       $scope.handleAddProductComment(successData.error);
      } 
     }
    else { //add comment

 
    // if($rootScope.file_data==undefined){
      var uniquecommentid=guid();
    if (($rootScope.file_data == "") || ($rootScope.file_data == " ") || ($rootScope.file_data == undefined) || ($rootScope.file_data == null)) {
      $scope.newProductComment = {
        product_comment: {
          user: {
            userid: $scope.userIDFromSession,
            username: $scope.usernameFromSession,
            orgname: $scope.orgnameFromSession,
            grpname: $scope.grpnameFromSession,
            profilepic: $rootScope.usersession.currentUser.profile_pic.image
          },
          commentid: uniquecommentid,
          type: $scope.type,
          datecreated: Date.now(),
          tags: $scope.mytags,
          commenttext: comment.commenttext,
          analytics: $scope.tagPairs

        }
      };

      $scope.newProductComment_image = {
        product_comment: {
          user: {
            userid: $scope.userIDFromSession,
            username: $scope.usernameFromSession,
            orgname: $scope.orgnameFromSession,
            grpname: $scope.grpnameFromSession,
            profilepic: $rootScope.usersession.currentUser.profile_pic.image
          },
          commentid:uniquecommentid,
          type: $scope.type,
          datecreated: Date.now(),
          tags: $scope.mytags,
           commenttext: comment.commenttext,
          analytics: $scope.tagPairs

        }
      };

    } else {
      $scope.newProductComment = {
        product_comment: {
          user: {
            userid: $scope.userIDFromSession,
            username: $scope.usernameFromSession,
            orgname: $scope.orgnameFromSession,
            grpname: $scope.grpnameFromSession,
            profilepic: $rootScope.usersession.currentUser.profile_pic.image
          },
          commentid: uniquecommentid,
          type: $scope.type,
          datecreated: Date.now(),
          commenttext: comment.commenttext,
          tags: $scope.mytags,
          comment_image: $rootScope.file_data,
          analytics: $scope.tagPairs
        }
      };

      $scope.newProductComment_image = {
        product_comment: {
          user: {
            userid: $scope.userIDFromSession,
            username: $scope.usernameFromSession,
            orgname: $scope.orgnameFromSession,
            grpname: $scope.grpnameFromSession,
            profilepic: $rootScope.usersession.currentUser.profile_pic.image
          },
          commentid: uniquecommentid,
          type: $scope.type,
          datecreated: Date.now(),
          tags: $scope.mytags,
          commenttext: comment.commenttext,
          comment_image: $rootScope.comment_image_l,
          analytics: $scope.tagPairs
        }
      };
      $rootScope.file_data = "";
    }

  
      $log.debug($scope.newProductComment);
      $scope.socket.emit('addComment', $rootScope.product_prodle, $rootScope.campaignidWall, $scope.newProductComment.product_comment);
      if ($scope.productComments == undefined) {
        $scope.productComments = [];
        $scope.productComments.unshift($scope.newProductComment_image.product_comment);
      } else {
         $scope.productComments.shift();
        $scope.productComments.unshift($scope.newProductComment_image.product_comment);
      }

      $scope.commenttextField.userComment = "";
      $scope.tagPairs = [];
      $rootScope.count = 0;
      document.getElementById('prodo-comment-commentContainer').style.marginTop = '0px';
      document.getElementById("crossButton").style.display = "none";
      $("#prodo-uploadedCommentImage").css("display", "none");
      $scope.mytags = "";
  
  
 }
});  // isLoggedin check end
};
//Add comment function
//get latest comments posted by others
$scope.getLatestComments = function () {
  if ($rootScope.productCommentResponsearray.length !== 0) {
    $log.debug($rootScope.productCommentResponsearray);
    $scope.reversecomments_l = $scope.productCommentResponsearray.reverse();
    $log.debug($scope.reversecomments_l);
    $scope.productComments = $scope.reversecomments_l.concat($scope.productComments);
    $log.debug($scope.productComments);
    var a = document.getElementById("responseComment");
    a.style.display = 'none';
    a.innerHTML = "";
    $scope.productCommentResponsearray.length = 0;
    $scope.reversecomments_l.length = 0;
    $scope.count = 0;
    //code to get latest comments
  }
};
//get latest comments posted by others

//if error adding comment retry function
$scope.showErrorIfCommentNotAdded = function () {
  var retry = document.getElementById("responseCommentErr");
  retry.style.display = 'inline';

  retry.innerHTML = 'Error adding comment please try again..';
};
//if error adding comment retry function
//if error adding comment  show retry icon
$scope.showRetryIconIfCommentNotAdded = function () {
  var retryIcon = document.getElementById("retryIcon");
  retryIcon.style.display = 'inline';
};
//if error adding comment  show retry icon


//Load more comments handler
$scope.handleLoadMoreCommentResponse = function (result) {
  console.log(result);
  if (result.success != undefined) {
    $log.debug(result.success.comment);
    for (var i = 0; i < result.success.comment.length; i++) {
      $scope.productComments.push(result.success.comment[i]);
    };
  } else {
    $("#loadMoreCommentMsg").css("display", "block");
    $("#load-more").css("display", "none");
     if (result.error.code == 'AL001') {
      $rootScope.showModal();
    }
    else if (result.error.code == 'AC002') {
      $("#loadMoreCommentMsg").html(result.error.message);
      $("#load-more").hide();
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
$("#load-more").show();
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
$scope.loadMoreComments = function () {
  $("#img-spinner").show();
  var lastCommentId = $scope.getLastCommentId();
  if ((lastCommentId !== "") || (lastCommentId !== " ") || (lastCommentId !== undefined) || (lastCommentId !== null)) {
    CommentLoadMoreService.loadMoreComments({
      commentid: lastCommentId
    }, function (result) {
      $scope.handleLoadMoreCommentResponse(result)
      $("#img-spinner").hide();
    }, function (error) {
      $log.debug(error);
      $("#loadMoreCommentMsg").html(error);
    });
  }
};
$("#img-spinner").hide();


// code for layerslider
$scope.commentImageShow;
$scope.captureCommentImageHere = function (params) {
  $scope.commentImageShow = params;
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
}

)
};
  


}])