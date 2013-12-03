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

                scope.pwdValidLength = (viewValue && viewValue.length >= 6 ? 'valid' : undefined);
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
   .directive('popdown', function() {
    return {
        restrict: 'E',
        scope: {},
        replace: true,
        controller: function($scope, PopdownAPI) {
            $scope.show = false;
            $scope.api = PopdownAPI;
            
            $scope.$watch('api.status', toggledisplay)
            $scope.$watch('api.message', toggledisplay)
            
            $scope.hide = function() {
                $scope.show = false;
                $scope.api.clear();
            };
            
            function toggledisplay() {
                $scope.show = !!($scope.api.status && $scope.api.message);               
            }
        },
        template: '<div class="alert alert-{{api.status}}" ng-show="show">' +
                  '  <button type="button" class="close" ng-click="hide()">&times;</button>' +
                  '  {{api.message}}' +
                  '</div>'
    }
})

  .directive('prodoAlertMessage', function($timeout) {
  return {
    restrict: 'EA',
    replace: true,
    template: '<div style="min-width:250px; text-align:left; margin: 0px auto;" class="alert {{mainAlert.alertType}}" ng-show="mainAlert.isShown">' +
  '<button type="button" class="close" ng-click="closeAlert()" aria-hidden="true">&times;</button>' +
  '{{mainAlert.message}}' + '<a href="#/{{mainAlert.linkpage}}" class="alert-link"> {{mainAlert.linkmessage}}</a>' +
'</div>'
    };
})

/* Directive to implement video
<prodovideo video="//player.vimeo.com/video/23919731" height="181" width="200"></prodovideo>
    <div prodovideo video="http://www.youtube.com/embed/JMl8cQjBfqk" width="560" height="315"></div>


 **/   

   .directive('prodovideo', function () {
    return {
        restrict: 'EA',
        replace: true,
        transclude: true,
        scope: {
            video: '@'
        },
        template: '<div class="prodovideo">' +
                    '<iframe ng-src="{{ video }}"></iframe>' +
                  '</div>',
        link: function (scope, element, attrs) {
            var ratio = (attrs.height / attrs.width) * 100;
            element[0].style.paddingTop = ratio + '%';
        }
    };
})
.directive ('prodslider', function() {
    var sliderdef = {
        restrict: 'A',
        link: function(scope, ele, attrs, c) {
           $(ele).layerSlider();
        }
    };
    return sliderdef;
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
    
