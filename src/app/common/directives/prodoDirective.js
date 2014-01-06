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
    template: '<div style="min-width:250px; text-align:left; margin: 5px auto;" class="alert {{mainAlert.alertType}}" ng-show="mainAlert.isShown">' +
  '<button type="button" class="close" ng-click="closeAlert()" aria-hidden="true">&times;</button>' +
  '{{mainAlert.message}}' + '<a href="#/{{mainAlert.linkpage}}" class="alert-link"> {{mainAlert.linkmessage}}</a>' +
'</div>',
    controller: function($scope, $rootScope){
      $scope.mainAlert = {
       isShown: false
      };

    $scope.showAlert = function (alertType, message, linkpage, linkmessage ) {
       $scope.mainAlert.message = message;
       $scope.mainAlert.isShown = true;
       $scope.mainAlert.linkpage = linkpage;
       $scope.mainAlert.linkmessage = linkmessage;
       $scope.mainAlert.alertType = alertType;
      
      // return $scope.mainAlert.message;
    }   

    
    $scope.showmessage = function(alertclass, msg,  alertlink, linkmsg ) {
        var alerttype=alertclass;
        var alertmessage=msg; 
        var link = alertlink; 
        var linkmessage= linkmsg;      
        $scope.showAlert(alerttype, alertmessage, link, linkmessage);
        return true;
    };
     
    
     $scope.closeAlert = function() {        
       $scope.mainAlert.isShown = false;
    };
    
    $scope.hideAlert = function() {
       $scope.mainAlert.isShown = false;
    }  

    }
    };
})

.directive('prodoSpinner', function($timeout) {
  return {
    restrict: 'EA',
    replace: true,
    template: '<span ng-show="spinner.isShown">' + '<i style="color:blue;" class="fa fa-spinner fa-spin fa-2x">' + '</i>' + '</span>',
    controller: function($scope, $rootScope){
      $scope.spinner ={ isShown: false};

      $scope.showSpinner = function() {
        $scope.spinner.isShown = true;
      }

      $scope.hideSpinner = function() {
        $scope.spinner.isShown = false;
      }
  
    }

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
.directive ('prodoSlider', function() {
    var sliderdef = {
        restrict: 'A',
        link: function(scope, ele, attrs, c) {
           $(ele).layerSlider();
        }
    };
    return sliderdef;
})

.directive ('prodoNav', function() {
    var nav = {
        restrict: 'A',
        link: function(scope, ele, attrs, c) {
          $('document').ready(function(){
            $('ul.nav.nav-pills li a').click(function() {           
            $(this).parent().addClass('active').siblings().removeClass('active');
            });
          }); 
        }
    };
    return nav;
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
}])

  .directive('prodoBarchart',function() {
    var barchart = {
      restrict:'EA',
      link : function(scope,element,a) {
        nv.addGraph(function() {
          var chart = nv.models.discreteBarChart()
           .x(function(d) { return d.label })
           .y(function(d) { return d.value })
            .staggerLabels(true)
            .tooltips(true)
            .showValues(true);
    
          d3.select('#chart')
             .datum(example())
             .transition().duration(50)
             .call(chart);
   
          nv.utils.windowResize(chart.update);
          return chart;
        });

        function example() {
          return  [ {
             key: "Product Ratings",
             values: [
               { 
                 "label" : "Awsome " ,
                 "value" : 300
               } , 
               { 
                 "label" : "Average" , 
                 "value" : 600
               } , 
               { 
                 "label" : "Good" , 
                 "value" : 200
               } , 
               { 
                 "label" : "Bad" , 
                 "value" : 400
               } , 
               { 
                 "label" : "Worst" ,
                 "value" : 10
               } , 
               { 
                 "label" : "Complaints" , 
                 "value" : 20
               } 
              
             ]
           }
          ];
        }
    }};

    return barchart;
 })

  .directive('prodoPiechart',function() {
    var piechart = {
      restrict : 'EA',
      link : function(scope,elem,attrs) {
                 
        nv.addGraph(function() {
          var width = 500,
          height = 500;
          
           var chart = nv.models.pieChart()
          .x(function(d) { return d.key })
          .y(function(d) { return d.y })
          .color(d3.scale.category10().range())
          .width(width)
          .height(height);
          d3.select("#test1")
          .datum(scope.data)
          .transition().duration(1200)
          .attr('width', width)
          .attr('height', height)
          .call(chart);
          
          chart.dispatch.on('stateChange', function(e) { nv.log('New State:', JSON.stringify(e)); });
            
          return chart;
        });
      }
    };
    return piechart;
  });
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
    
