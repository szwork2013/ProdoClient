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
angular.module('prodo.ProdoCommentApp')


.directive('prodoComments', function () {
    return {
        restrict: 'A', 
        templateUrl: 'home/prodo/views/prodo.comment.tpl.html',
        scope: { comments: '=', pagesSize:'=', pagesShown:'=' },
        link: function(scope) {
            scope.commentsLimit = function() {
                return scope.pagesSize*scope.pagesShown;
            }
            
          scope.deleteProductComment = function (comment) {
             console.log("deleting....");
             var index = scope.comments.indexOf(comment);
             if (index != -1)  scope.comments.splice(index, 1);
             }


            scope.fromNow = function(time) {
              console.log(moment);
              return moment(time).fromNow();
            }

            scope.toCamelCase = function(s) {
   
              s = s.replace(/([^a-zA-Z0-9_\- ])|^[_0-9]+/g, "").trim().toLowerCase();
  
              s = s.replace(/([ -]+)([a-zA-Z0-9])/g, function(a,b,c) {
              return c.toUpperCase();
              });
 
               s = s.replace(/([0-9]+)([a-zA-Z])/g, function(a,b,c) {
               return b + c.toUpperCase();
               });  
                return s;
            }
        }
    };
})
