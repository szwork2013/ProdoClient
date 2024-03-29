/* Overview: Product Controller 
* Controller for product comments,product features etc
* Dated: 18/02/2014.
* Author: Bhagyashri Jangam
* Copyright: Prodonus Software Private Limited and GiantLeap Systems Private Limited 2013
* Change History:
*
* date | author | description 
*
* 27-3/2013 | xyx | Add a new property
* 
*/
angular.module('prodo.ProductApp')
.controller('ProductCommentController', ['$scope', '$log', '$rootScope', 'ProductService', 'UserSessionService', '$http', 'CommentLoadMoreService', 'ENV', 'TagReffDictionaryService', 'ProductFeatureService', 'isLoggedin','CommentService',  function ($scope, $log, $rootScope, ProductService, UserSessionService, $http, CommentLoadMoreService, ENV, TagReffDictionaryService, ProductFeatureService ,isLoggedin,CommentService) {
    
    $scope.mytags=[];
$scope.prelikedislike=function(likeaction,comment){
    var follow;
    for (i = 0; i < $scope.ProductsFollowedFromSession.length; i++) {
      if ($scope.ProductsFollowedFromSession[i].prodle == $rootScope.product_prodle) {
        follow = true;
      }
    }
    if(follow==true){
     $scope.likedislike(likeaction,comment);
    }
    else{
     $rootScope.ProdoAppMessage("Please talkin this product to start agree or disagree ...", 'error');
    }
};
  $scope.deleteProductComment = function (comment) {
    if (comment.user.userid == $scope.userIDFromSession ) {
      CommentService.deleteComment({ commentid: comment.commentid },
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
    CommentLoadMoreService.loadMoreComments({
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

//socket response when for add comment
$scope.commentError="";
$scope.socket.removeAllListeners('addcommentResponse');
$scope.socket.on('addcommentResponse', function (error, result) {
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
          profilepic:($rootScope.usersession.currentUser.profile_pic==undefined) ? "../assets/images/avatar.jpg":result.success.product_comment.user.profilepic
        },
        commentid: result.success.product_comment.commentid,
        type: result.success.product_comment.type,
        datecreated: result.success.product_comment.datecreated,
        commenttext: result.success.product_comment.commenttext,
        analytics: result.success.product_comment.analytics,
        commentcategory:result.success.product_comment.commentcategory,
        agreecount:result.success.product_comment.agreecount,
        disagreecount:result.success.product_comment.disagreecount

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
 });

$scope.$watch('mytags', function () {
  $scope.mytags;
  // $log.debug("tags "+$scope.mytags);
})
//make feature and its adjective's pairs
$scope.makeTagsPair = function (noun, adj) {
  for (var i = 0; i < adj.length; i++) {
    if (noun[i] == undefined) $scope.tagPairs.push({
      // featureid: "1",
      featurename: $scope.features[0].featurename,
      tag: adj[i]
    });
    else $scope.tagPairs.push({
      // featureid: "1",
      featurename: noun[i],
      tag: adj[i]
    });
  }

  // for (var i = 0; i < $scope.features.length; i++) {
  //   for (j = 0; j < $scope.tagPairs.length; j++) {
  //     if ($scope.features[i].featurename == $scope.tagPairs[j].featurename) {
  //       $scope.tagPairs[j].featureid = $scope.features[i].featureid;
  //       $log.debug("fn2" + $scope.tagPairs[j].featurename + " " + $scope.tagPairs[j].tag + " " + $scope.tagPairs[j].featureid);
  //     }
  //   }
  // }
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
            profilepic:($rootScope.usersession.currentUser.profile_pic==undefined) ? "../assets/images/avatar.jpg":$rootScope.usersession.currentUser.profile_pic.image 

          },
          commentid: uniquecommentid,
          type: $scope.type,
          datecreated: Date.now(),
          tags: $scope.mytags,
          commenttext: $scope.commenttextField.userComment,
          analytics: $scope.tagPairs,
          commentcategory:$scope.commenttagSelected.tag,
          agreecount:0,
          disagreecount:0

        }
      };

      $scope.newProductComment_image = {
        product_comment: {
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
          analytics: $scope.tagPairs,
          commentcategory:$scope.commenttagSelected.tag,
          agreecount:0,
          disagreecount:0

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
             profilepic:($rootScope.usersession.currentUser.profile_pic==undefined) ? "../assets/images/avatar.jpg":$rootScope.usersession.currentUser.profile_pic.image 
          },
          commentid: uniquecommentid,
          type: $scope.type,
          datecreated: Date.now(),
          commenttext: $scope.commenttextField.userComment,
          tags: $scope.mytags,
          comment_image: $rootScope.file_data,
          analytics: $scope.tagPairs,
          commentcategory:$scope.commenttagSelected.tag,
          agreecount:0,
          disagreecount:0
        }
      };

      $scope.newProductComment_image = {
        product_comment: {
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
          comment_image: $rootScope.comment_image_l,
          analytics: $scope.tagPairs,
          commentcategory:$scope.commenttagSelected.tag,
          agreecount:0,
          disagreecount:0
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
      $scope.socket.emit('addComment', $rootScope.product_prodle, $scope.newProductComment.product_comment);
      if ($scope.productComments == undefined) {
        $scope.productComments = [];
        $scope.productComments.unshift($scope.newProductComment_image.product_comment);
      } else {
        $scope.productComments.unshift($scope.newProductComment_image.product_comment);
      }

      $scope.commenttextField.userComment = "";
      $scope.commenttagSelected.tag="general";
      $scope.tagPairs = [];
      $rootScope.count = 0;
      document.getElementById('prodo-comment-commentContainer').style.marginTop = '0px';
      document.getElementById("crossButton").style.display = "none";
      $("#prodo-uploadedCommentImage").css("display", "none");
      $scope.mytags=[] ;
    } else {
      $rootScope.ProdoAppMessage("Please talkin this product to start commenting...", 'error');
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
             profilepic:($rootScope.usersession.currentUser.profile_pic==undefined) ? "../assets/images/avatar.jpg":$rootScope.usersession.currentUser.profile_pic.image 
          },
          commentid: uniquecommentid,
          type: $scope.type,
          datecreated: Date.now(),
          tags: $scope.mytags,
          commenttext: comment.commenttext,
          analytics: $scope.tagPairs,
          commentcategory:comment.commentcategory,
          agreecount:0,
          disagreecount:0

        }
      };

      $scope.newProductComment_image = {
        product_comment: {
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
          commenttext: comment.commenttext,
          analytics: $scope.tagPairs,
          commentcategory:comment.commentcategory,
          agreecount:0,
          disagreecount:0

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
             profilepic:($rootScope.usersession.currentUser.profile_pic==undefined) ? "../assets/images/avatar.jpg":$rootScope.usersession.currentUser.profile_pic.image 
          },
          commentid: uniquecommentid,
          type: $scope.type,
          datecreated: Date.now(),
          commenttext: comment.commenttext,
          tags: $scope.mytags,
          comment_image: $rootScope.file_data,
          analytics: $scope.tagPairs,
          commentcategory:comment.commentcategory,
          agreecount:0,
          disagreecount:0
        }
      };

      $scope.newProductComment_image = {
        product_comment: {
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
          comment_image: $rootScope.comment_image_l,
          analytics: $scope.tagPairs,
          commentcategory:comment.commentcategory,
          agreecount:0,
          disagreecount:0
        }
      };
      $rootScope.file_data = "";
    }

  
      $log.debug($scope.newProductComment);
      $scope.socket.emit('addComment', $rootScope.product_prodle, $scope.newProductComment.product_comment);
      if ($scope.productComments == undefined) {
        $scope.productComments = [];
        $scope.productComments.unshift($scope.newProductComment_image.product_comment);
      } else {
         $scope.productComments.shift();
        $scope.productComments.unshift($scope.newProductComment_image.product_comment);
      }

      $scope.commenttextField.userComment = "";
      $scope.commenttagSelected.tag="general";

      $scope.tagPairs = [];
      $rootScope.count = 0;
      document.getElementById('prodo-comment-commentContainer').style.marginTop = '0px';
      document.getElementById("crossButton").style.display = "none";
      $("#prodo-uploadedCommentImage").css("display", "none");
      $scope.mytags = [];
  
  
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









}])