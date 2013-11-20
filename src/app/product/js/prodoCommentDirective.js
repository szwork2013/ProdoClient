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
        require: '?ngModel',
        templateUrl: 'product/views/prodo.comment.tpl.html',
        scope: { comments: '=', pagesSize:'=', pagesShown:'='  },
        controller: function($scope)
        {
                $scope.pretags = ['addition','aggregate','all','bad news','budget','cost','damage','entirety',
'expense','extent','list','lot','net','outlay','output','price tag','product','quantum','score',
'set-back','sum','tab','tidy sum','whole','article','asset','belonging','chattel','goods','line',
'material','object','produce', 'property','specialty','stock','thing', 'ware','good'];

             $scope.comments = [
            {
              userName:"Bhagyashri",
              companyName:"Giant Leap Systems",
              time:Date.now(),
              text:"I like this web site",
              tags:['great','some','cool','bad'],
              group:"Support",
              dp:"http://placehold.it/64x64",
              upvotecount:0
            },{
              userName:"Neha",
              companyName:"Giant Leap Systems",
              time:Date.now(),
              text:"Prodonus is really cool :)",
              tags:['great','bad'],
              group:"Developer",
              dp:"http://placehold.it/64x64",
              upvotecount:0
         }];

    
     $scope.addProductComment = function () {
         
      
     
        //get tags from comment text and compare with predefined tags and add to tags
       var commenttext =  $scope.textField ;
       var   mytags = $scope.pretags;
       var new_arr = [];
       var commenttextTags=commenttext.split(" ");

       for (var i=0; i < commenttextTags.length; i++) {
         for (var j=0; j < mytags.length; j++) {
           if ( commenttextTags[i] == mytags[j] ) {
            new_arr.push( commenttextTags[i] );
           }
         }
       }

     mytags = new_arr;

  
   $scope.comments.unshift({
       userName:"Shree",
       companyName:"Srujan Systems",
       time: Date.now(),
      text:$scope.textField,
      tags:  mytags,
        group:"Admin",
        dp:"http://placehold.it/64x64",
        upvotecount:0

      });



  $scope.textField = "";
    };

 
        },

        link: function(scope,element,attrs,ngModel,controller) {

       scope.commentsLimit = function() {
         return scope.pagesSize*scope.pagesShown;
       }

       
     scope.replyProductComment = function () {
     
      
      scope.comments.push({
       userName:"Shree",
       companyName:"Srujan Systems",
       time: Date.now(),
       text:scope.replytextField,
        tags: "hiii",
        group:"Admin",
        dp:"http://placehold.it/64x64",
        upvotecount:0

      });
       scope.replytextField = "";

    }
 
      scope.deleteProductComment = function (comment) {
             console.log("deleting....");
             var index = scope.comments.indexOf(comment);
             if (index != -1)  scope.comments.splice(index, 1); 
             }

      scope.fromNow = function(time) {
               console.log(moment);
              // return moment(time).fromNow();
               return moment(time).calendar();
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
