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
            $(this).height(75);
            txtheight=$( "#prodo-comment-Textbox" ).height();
            txtwidth=$( "#prodo-comment-Textbox" ).width();

          });
          $('#prodo-comment-Textbox').blur(function () {
            $(this).height(26);
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

  // var itemsTemplate = "<ul class='unstyled'><li ng-repeat='item in items'>
     //     <input type='checkbox' value='{{item}}' ng-click='getProductFeatureFromList(item)' />  
     //    {{item}} </li></ul>";
  angular.module('prodo.CommonApp').directive('popOver', function ($compile) {
  
        var itemsTemplate = "<ul class='unstyled'><li ng-repeat='item in items'>{{item}} </li></ul>";
        var getTemplate = function (contentType) {
            var template = '';
            switch (contentType) {
                case 'items':
                    template = itemsTemplate;
                    break;
            }
            return template;
        }
        return {
            restrict: "A",
            transclude: true,
            template: "<span ng-transclude></span>",
            link: function (scope, element, attrs) {
                var popOverContent;
                if (scope.items) {
                    var html = getTemplate("items");
                    popOverContent = $compile(html)(scope);                    
                }
                var options = {
                    content: popOverContent,
                    placement: "right",
                    html: true,
                    title: scope.title
                };
                $(element).popover(options);
                        scope.featuresList=[];
              scope.getProductFeatureFromList = function (f) {
               if (scope.featuresList.indexOf(f) === -1) {
                 scope.featuresList.push(f);
               }
               else {
                 scope.featuresList.splice(scope.featuresList.indexOf(f), 1);
               }
               console.debug(scope.featuresList);
              
               $('#prodo-comment-Textbox').val(function(index, value) {
                  return value +" "+ scope.featuresList;
              });
             } 
            },
     
            scope: {
                items: '=',
                title: '@'
            }
        };
    });