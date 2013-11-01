
/*
* Overview: commentScroll Directive
* It will load previous comments when we scroll 
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
.directive('hboTabs', function() {
    return {
        restrict: 'A',
        link: function(scope, elm, attrs) {
        	for (var i = 0; i<comments.length ; i++) {
        		 var jqueryElm = $(elm[i]);
                s $(jqueryElm).tabs()
        	};
           
        }
    };
})