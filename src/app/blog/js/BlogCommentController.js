/* Overview: Blog comment Controller 
* Controller for campaign comments,product features etc
* Dated: 28/05/2014.
* Author: Bhagyashri Jangam
* Copyright: Prodonus Software Private Limited and GiantLeap Systems Private Limited 2013
* Change History:
*
* date | author | description 
*
* 28-04-2013 | xyx | Add a new property
* 
*/
angular.module('prodo.BlogApp')
.controller('BlogCommentController', ['$scope', '$log', '$rootScope',  'UserSessionService', '$http',  'ENV', 'TagReffDictionaryService',  'isLoggedin','BlogCommentService','BlogCommentLoadMoreService',  function ($scope, $log, $rootScope, UserSessionService, $http, ENV, TagReffDictionaryService, isLoggedin,BlogCommentService,BlogCommentLoadMoreService) {

$scope.prelikedislike=function(likeaction,comment){

     $scope.likedislike(likeaction,comment);
 
};

  $scope.deleteProductComment = function (comment) {
    if (comment.user.userid == $scope.userIDFromSession ) {
      BlogCommentService.deleteComment({ commentid: comment.commentid },
       function (success) {
          if(success.success){
            var index = $scope.productComments.indexOf(comment);
            if (index != -1){
               $scope.productComments.splice(index, 1);
            }
           $scope.handleDeleteProductCommentSuccess(success);   
          }else if(success.error){
            $scope.handleDeleteProductCommentError(success.error);
          }  
        }, function (error) {
          $log.debug(JSON.stringify(error));
        });
      $log.debug(comment.commentid);
    }
  };

$scope.loadMoreComments = function () {
  $("#img-spinner").show();
  var lastCommentId = $scope.getLastCommentId();
  if ((lastCommentId !== "") || (lastCommentId !== " ") || (lastCommentId !== undefined) || (lastCommentId !== null)) {
    BlogCommentLoadMoreService.loadMoreComments({
      commentid: lastCommentId
    }, function (result) {
      $scope.handleLoadMoreCommentResponse(result)
      $("#img-spinner").hide();
    }, function (error) {
      $log.debug(error);
      $("#loadMoreCommentMsg").css("display", "block");
      $("#loadMoreCommentMsg").html(error);
    });
  }
};

    $(document).ready(function () {
      var txtheight;
      var txtwidth;

      $("#prodo-comment-Textbox").on('blur mouseleave', function() {
       $(this).height(30);
       txtheight=$( "#prodo-comment-Textbox" ).height();
       txtwidth=$( "#prodo-comment-Textbox" ).width();
      });   

      $("#prodo-comment-Textbox").on('focus change keyup paste keypress click', function() {
       $(this).height(85);
       txtheight=$( "#prodo-comment-Textbox" ).height();
       txtwidth=$( "#prodo-comment-Textbox" ).width();
      });    

      $('#holder').hover(
        function() {
        txtheight=$( "#prodo-comment-Textbox" ).height();
        txtwidth=$( "#prodo-comment-Textbox" ).width();
         document.getElementById("holder").style.height=txtheight;
         document.getElementById("holder").style.width=txtwidth;
         txtwidth="";
         txtheight="";



       }, 
       function() {

         $log.debug( 'hovering out' , $(this).attr('id') );
          txtheight=$( "#prodo-comment-Textbox" ).height();
          txtwidth=$( "#prodo-comment-Textbox" ).width();

         document.getElementById("holder").style.height=txtheight;
         document.getElementById("holder").style.width=txtwidth;
         txtwidth="";
         txtheight="";

       }
       );

       txtwidth="";
        txtheight="";


    });

$scope.count;

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
 });

$scope.$watch('mytags', function () {
  $scope.mytags;
  // $log.debug("tags "+$scope.mytags);
})
//make feature and its adjective's pairs
// $scope.makeTagsPair = function (noun, adj) {
//   for (var i = 0; i < adj.length; i++) {
//     if (noun[i] == undefined) $scope.tagPairs.push({
//       // featureid: "1",
//       featurename: $scope.features[0].featurename,
//       tag: adj[i]
//     });
//     else $scope.tagPairs.push({
//       // featureid: "1",
//       featurename: noun[i],
//       tag: adj[i]
//     });
//   }
// };

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
    // $log.debug("features " + $scope.myFeaturetags);
    // $scope.makeTagsPair($scope.myFeaturetags, $scope.mytags);
    // $log.debug("Pair : " + JSON.stringify($scope.tagPairs));
    $log.debug($rootScope.file_data);
    $log.debug($rootScope.comment_image_l);
    var uniquecommentid=guid();
    // if($rootScope.file_data==undefined){
    if (($rootScope.file_data == "") || ($rootScope.file_data == " ") || ($rootScope.file_data == undefined) || ($rootScope.file_data == null)) {
      $scope.newProductComment = {
        blog_comments: {
          user: {
            userid: $scope.userIDFromSession,
            username: $scope.usernameFromSession,
            orgname: $scope.orgnameFromSession,
            grpname: $scope.grpnameFromSession,
             profilepic:($rootScope.usersession.currentUser.profile_pic==undefined) ? "../assets/images/avatar.jpg":$rootScope.usersession.currentUser.profile_pic.image 
          },
          commentid: uniquecommentid,
          type: $scope.type,
          datecreated: Date.now(),
          tags: $scope.mytags,
          commenttext: $scope.commenttextField.userComment
          // analytics: $scope.tagPairs,
          // agreecount:0,
          // disagreecount:0

        }
      };

      $scope.newProductComment_image = {
        blog_comments: {
          user: {
            userid: $scope.userIDFromSession,
            username: $scope.usernameFromSession,
            orgname: $scope.orgnameFromSession,
            grpname: $scope.grpnameFromSession,
             profilepic:($rootScope.usersession.currentUser.profile_pic==undefined) ? "../assets/images/avatar.jpg":$rootScope.usersession.currentUser.profile_pic.image 
          },
          commentid: uniquecommentid,
          type: $scope.type,
          datecreated: Date.now(),
          tags: $scope.mytags,
          commenttext: $scope.commenttextField.userComment
          // analytics: $scope.tagPairs,
          // agreecount:0,
          // disagreecount:0

        }
      };

    } else {
      $scope.newProductComment = {
        blog_comments: {
          user: {
            userid: $scope.userIDFromSession,
            username: $scope.usernameFromSession,
            orgname: $scope.orgnameFromSession,
            grpname: $scope.grpnameFromSession,
             profilepic:($rootScope.usersession.currentUser.profile_pic==undefined) ? "../assets/images/avatar.jpg":$rootScope.usersession.currentUser.profile_pic.image 
          },
          commentid: uniquecommentid,
          type: $scope.type,
          datecreated: Date.now(),
          commenttext: $scope.commenttextField.userComment,
          tags: $scope.mytags,
          comment_image: $rootScope.file_data
          // analytics: $scope.tagPairs,
          // agreecount:0,
          // disagreecount:0
        }
      };

      $scope.newProductComment_image = {
        blog_comments: {
          user: {
            userid: $scope.userIDFromSession,
            username: $scope.usernameFromSession,
            orgname: $scope.orgnameFromSession,
            grpname: $scope.grpnameFromSession,
            profilepic:($rootScope.usersession.currentUser.profile_pic==undefined) ? "../assets/images/avatar.jpg":$rootScope.usersession.currentUser.profile_pic.image 
          },
          commentid: uniquecommentid,
          type: $scope.type,
          datecreated: Date.now(),
          tags: $scope.mytags,
          commenttext: $scope.commenttextField.userComment,
          comment_image: $rootScope.comment_image_l
          // analytics: $scope.tagPairs,
          // agreecount:0,
          // disagreecount:0
        }
      };
      $rootScope.file_data = "";

    }
  
      $log.debug($scope.newProductComment.blog_comments);
      $scope.socket.emit('addBlogComment', $rootScope.product_prodle, $scope.viewblog.blogid, $scope.newProductComment.blog_comments);
      if ($scope.productComments == undefined) {
        $scope.productComments = [];
        $scope.productComments.unshift($scope.newProductComment_image.blog_comments);
      } else {
        $scope.productComments.unshift($scope.newProductComment_image.blog_comments);
      }

      $scope.commenttextField.userComment = "";
      $scope.tagPairs = [];
      $rootScope.count = 0;
      document.getElementById('prodo-comment-commentContainer').style.marginTop = '0px';
      document.getElementById("crossButton").style.display = "none";
      $("#prodo-uploadedCommentImage").css("display", "none");
      $scope.mytags = "";
     
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
        blog_comments: {
          user: {
            userid: $scope.userIDFromSession,
            username: $scope.usernameFromSession,
            orgname: $scope.orgnameFromSession,
            grpname: $scope.grpnameFromSession,
            profilepic:($rootScope.usersession.currentUser.profile_pic==undefined) ? "../assets/images/avatar.jpg":$rootScope.usersession.currentUser.profile_pic.image 
          },
          commentid: uniquecommentid,
          type: $scope.type,
          datecreated: Date.now(),
          tags: $scope.mytags,
          commenttext: comment.commenttext
          // analytics: $scope.tagPairs,
          // agreecount:0,
          // disagreecount:0

        }
      };

      $scope.newProductComment_image = {
        blog_comments: {
          user: {
            userid: $scope.userIDFromSession,
            username: $scope.usernameFromSession,
            orgname: $scope.orgnameFromSession,
            grpname: $scope.grpnameFromSession,
            profilepic:($rootScope.usersession.currentUser.profile_pic==undefined) ? "../assets/images/avatar.jpg":$rootScope.usersession.currentUser.profile_pic.image 
          },
          commentid:uniquecommentid,
          type: $scope.type,
          datecreated: Date.now(),
          tags: $scope.mytags,
           commenttext: comment.commenttext
          // analytics: $scope.tagPairs,
          // agreecount:0,
          // disagreecount:0

        }
      };

    } else {
      $scope.newProductComment = {
        blog_comments: {
          user: {
            userid: $scope.userIDFromSession,
            username: $scope.usernameFromSession,
            orgname: $scope.orgnameFromSession,
            grpname: $scope.grpnameFromSession,
            profilepic:($rootScope.usersession.currentUser.profile_pic==undefined) ? "../assets/images/avatar.jpg":$rootScope.usersession.currentUser.profile_pic.image 
          },
          commentid: uniquecommentid,
          type: $scope.type,
          datecreated: Date.now(),
          commenttext: comment.commenttext,
          tags: $scope.mytags,
          comment_image: $rootScope.file_data
          // analytics: $scope.tagPairs,
          // agreecount:0,
          // disagreecount:0
        }
      };

      $scope.newProductComment_image = {
        blog_comments: {
          user: {
            userid: $scope.userIDFromSession,
            username: $scope.usernameFromSession,
            orgname: $scope.orgnameFromSession,
            grpname: $scope.grpnameFromSession,
            profilepic:($rootScope.usersession.currentUser.profile_pic==undefined) ? "../assets/images/avatar.jpg":$rootScope.usersession.currentUser.profile_pic.image 
          },
          commentid: uniquecommentid,
          type: $scope.type,
          datecreated: Date.now(),
          tags: $scope.mytags,
          commenttext: comment.commenttext,
          comment_image: $rootScope.comment_image_l
          // analytics: $scope.tagPairs,
          // agreecount:0,
          // disagreecount:0
        }
      };
      $rootScope.file_data = "";
    }

  
      $log.debug($scope.newProductComment);
      $scope.socket.emit('addCampaignComment', $rootScope.product_prodle, $rootScope.campaignidWall, $scope.newProductComment.blog_comments);
      if ($scope.productComments == undefined) {
        $scope.productComments = [];
        $scope.productComments.unshift($scope.newProductComment_image.blog_comments);
      } else {
         $scope.productComments.shift();
        $scope.productComments.unshift($scope.newProductComment_image.blog_comments);
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




//socket response when for add comment
$scope.commentError="";
$scope.socket.removeAllListeners('addBlogCommentResponse');
$scope.socket.on('addBlogCommentResponse', function (error, result) {
  if (error) {
    $scope.commentError=error.error.message;
    $log.debug(error.error.message);
    $rootScope.ProdoAppMessage(error.error.message, 'error');
    $scope.showErrorIfCommentNotAdded(error.error.message); //If error retry add comment 
    $scope.showRetryIconIfCommentNotAdded();
    // if(retry) retry.textContent("Error posting comment.. Please try again");

  } else if (result) {
    // $log.debug(result.success.message);
    $scope.ifErrorAddingComment = false;
    $scope.commentError=false;
    $log.debug("addBlogCommentResponse success" + JSON.stringify( result.success.blog_comments));
  }
  //   $scope.socket.removeAllListeners();
});
//socket response when for add comment
//productComment response -on the fly comment listener creation
$scope.blogCommentResponseListener = "blogCommentResponse" + $scope.viewblog.blogid;
$log.debug("campaign id   "+$rootScope.campaignidWall );
$scope.socket.removeAllListeners($scope.blogCommentResponseListener);
$scope.socket.on($scope.blogCommentResponseListener, function (error, result) {
  if (error) {
    $log.debug(error.error.message);
    $rootScope.ProdoAppMessage(error.error.message, 'error');
  } else if (result) {
    $log.debug("blogCommentResponse  Response success" + JSON.stringify(result.success.blog_comments));
    //  $scope.productCommentResponsearray.push( JSON.stringify(result.success.product_comment));
    //comment info from server response
    $scope.newProductComment = {
      blog_comments: {
        user: {
          userid: result.success.blog_comments.user.userid,
          username: result.success.blog_comments.user.username,
          orgname: result.success.blog_comments.user.orgname,
          grpname: result.success.blog_comments.user.grpname,
          profilepic:($rootScope.usersession.currentUser.profile_pic==undefined) ? "../assets/images/avatar.jpg":result.success.product_comment.user.profilepic
        },
        commentid: result.success.blog_comments.commentid,
        type: result.success.blog_comments.type,
        datecreated: result.success.blog_comments.datecreated,
        commenttext: result.success.blog_comments.commenttext
        // analytics: $scope.tagPairs
        // agreecount:result.success.blog_comments.agreecount
        // disagreecount:result.success.blog_comments.disagreecount

      }
    };

    // $scope.productCommentResponsearray.push($scope.newProductComment.blog_comments);
    $rootScope.productCommentResponsearray.push($scope.newProductComment.blog_comments);
    $log.debug($rootScope.productCommentResponsearray);
    $scope.count = $rootScope.productCommentResponsearray.length;
    $log.debug($scope.count);
    var a = document.getElementById("responseComment");
    a.style.display = 'inline';
    a.innerHTML = $scope.count + ' new comments'; //show new added comments to other users
    // a.textContent(JSON.stringify(result.success.blog_comments).length + " new comments")
  }
  // $scope.socket.removeAllListeners();
});
//productComment response -on the fly comment listener creation



}])