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
      function ($scope, $log, ProductService, $rootScope, UserSessionService, CommentService) {
        $(document).ready(function () {
          var txtheight;
          var txtwidth;
          $('#prodo-comment-Textbox').focus(function () {
            $(this).height(85);
            txtheight=$( "#prodo-comment-Textbox" ).height();
            txtwidth=$( "#prodo-comment-Textbox" ).width();

          });
          $('#prodo-comment-Textbox').blur(function () {
            $(this).height(26);
            txtheight=$( "#prodo-comment-Textbox" ).height();
            txtwidth=$( "#prodo-comment-Textbox" ).width();


          });

          $('#prodo-comment-Textbox').mouseleave(function () {
            $(this).height(26);
            txtheight=$( "#prodo-comment-Textbox" ).height();
            txtwidth=$( "#prodo-comment-Textbox" ).width();


          });
           $('#prodo-comment-Textbox').click(function () {
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

  $scope.deleteProductComment = function (comment) {
    if (comment.user.userid == $scope.userIDFromSession ) {
      var index = $scope.productComments.indexOf(comment);
      if (index != -1)
        $scope.productComments.splice(index, 1);
      CommentService.deleteComment({ commentid: comment.commentid });
      $log.debug(comment.commentid);
    }
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