//....................................code snippet for password check directive.............................
/*overview:
* parameters:
*
*/


angular.module("prodo.CommonApp")

  .directive('prodonusPasswordCheck', function($parse) {
  return {
    require: 'ngModel',
    link: function(scope, elem, attrs, ctrl) {
      scope.$watch(function() {        
        return $parse(attrs.prodonusPasswordCheck)(scope) === ctrl.$modelValue;
      }, function(currentValue) {
        ctrl.$setValidity('mismatch', currentValue);
         
      });
    }
  };
})
  .directive('prodonusPasswordValidate', function() {
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function(viewValue) {

                scope.pwdValidLength = (viewValue && viewValue.length >= 8 ? 'valid' : undefined);
                scope.pwdHasAlphabet = (viewValue && /[A-z]/.test(viewValue)) ? 'valid' : undefined;
                scope.pwdHasNumber = (viewValue && /\d/.test(viewValue)) ? 'valid' : undefined;
                scope.pwdHasSymbol = (viewValue && /(?=(?:.*[!@#$%^&*-]){1})/.test(viewValue)) ? 'valid' : undefined;

                if(scope.pwdValidLength && scope.pwdHasAlphabet && scope.pwdHasNumber && scope.pwdHasSymbol) {
                    ctrl.$setValidity('pwd', true);
                    return viewValue;
                } else {
                    ctrl.$setValidity('pwd', false);                    
                    return undefined;
                }

            });
        }
    };
})

  .directive('prodonusMultiEmailValidate', function() {
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function(viewValue) {

                 
                scope.emailHas = (viewValue && /(([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)(\s*,\s*|\s*$)+)/.test(viewValue)) ? 'valid' : undefined;
                if(scope.emailHas) {
                    ctrl.$setValidity('email', true);
                    return viewValue;
                } else {
                    ctrl.$setValidity('email', false);                    
                    return undefined;
                }

            });
        }
    };
})

   .directive('notification', function($timeout){
  return {
    restrict: 'E',
    replace: true,
    scope: {
      ngModel: '='
    },
    template: '<div class="alert alert-info fade" bs-alert="ngModel"></div>',
    link: function(scope, element, attrs) {
      $timeout(function(){
        element.hide();
      }, 600000);
    }
  }
})

   .directive('ensureUnique', ['$http', function($http) {
  return {
    require: 'ngModel',
    link: function(scope, ele, attrs, c) {
      scope.$watch(attrs.ngModel, function() {
        $http({
          method: 'POST',
          url: '/api/check/' + attrs.ensureUnique,
          data: {'field': attrs.ensureUnique}
        }).success(function(data, status, headers, cfg) {
          c.$setValidity('unique', data.isUnique);
        }).error(function(data, status, headers, cfg) {
          c.$setValidity('unique', false);
        });
      });
    }
  }
}]);
////// ensureUnique with timeout

//    app.directive('ensureUnique', ['$http', '$timeout', function($http, $timeout) {
//   var checking = null;
//   return {
//     require: 'ngModel',
//     link: function(scope, ele, attrs, c) {
//       scope.$watch(attrs.ngModel, function(newVal) {
//         if (!checking) {
//           checking = $timeout(function() {
//             $http({
//               method: 'POST',
//               url: '/api/check/' + attrs.ensureUnique,
//               data: {'field': attrs.ensureUnique}
//             }).success(function(data, status, headers, cfg) {
//               c.$setValidity('unique', data.isUnique);
//               checking = null;
//             }).error(function(data, status, headers, cfg) {
//               checking = null;
//             });
//           }, 500);
//         }
//       });
//     }
//   }
// }]);
    
