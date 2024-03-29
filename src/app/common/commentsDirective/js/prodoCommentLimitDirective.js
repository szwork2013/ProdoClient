/*
 * Overview: commentLimit Directive
 * It allows user to enter 300 characters only , 
 * it will intimate user how many characters are remaining,
 * and after it reach to 300 characters , it will not allow to enter more text.
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

angular.module('prodo.ProdoCommentApp').directive('commentLimit', function () {
  return {
    require: 'ngModel',
    link: function (scope, element, attrs, CommentController) {
      var maxlength = Number(attrs.commentLimit);
      function fromUser(text) {
        if (text) {
          if (text.length > maxlength) {
            var transformedInput = text.substring(0, maxlength);
            CommentController.$setViewValue(transformedInput);
            CommentController.$render();
            return transformedInput;
          }
          return text;
        }
      }
      CommentController.$parsers.push(fromUser);
    }
  };
});
