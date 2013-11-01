/*
* Overview: Getcomment Directive
* It  takes comments input
* Dated: 31/10/2013.
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


.directive('prodoGetcomment', function () {
    return {
        restrict: 'A', 
        templateUrl: 'home/prodo/views/prodo.commentgetText.tpl.html',
        
        link: function(scope) {
          
     scope.addProductComment = function () {
      if(!scope.textField) return;
     
      scope.comments.unshift({
       userName:"Shree",
       companyName:"Srujan Systems",
       time: Date.now(),
       text: $scope.textField,
       tags: "hiii",
        group:"Admin",
        dp:"http://placehold.it/64x64",
        upvotecount:0
      });
       scope.textField = "";
     
    }

           }

    };


})
