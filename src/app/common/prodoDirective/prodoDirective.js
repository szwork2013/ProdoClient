angular.module('prodo.CommonApp').directive('prodonusPasswordCheck', [
  '$parse',
  function ($parse) {
    return {
      require: 'ngModel',
      link: function (scope, elem, attrs, ctrl) {
        scope.$watch(function () {
          return $parse(attrs.prodonusPasswordCheck)(scope) === ctrl.$modelValue;
        }, function (currentValue) {
          ctrl.$setValidity('mismatch', currentValue);
        });
      }
    };
  }
]).directive('prodonusPasswordValidate', function () {
  return {
    require: 'ngModel',
    link: function (scope, elm, attrs, ctrl) {
      ctrl.$parsers.unshift(function (viewValue) {
        scope.pwdValidLength = viewValue && viewValue.length >= 6 ? 'valid' : undefined;
        scope.pwdHasAlphabet = viewValue && /[A-z]/.test(viewValue) ? 'valid' : undefined;
        scope.pwdHasNumber = viewValue && /\d/.test(viewValue) ? 'valid' : undefined;
        scope.pwdHasSymbol = viewValue && /(?=(?:.*[!@#$%^&*-]){1})/.test(viewValue) ? 'valid' : undefined;
        if (scope.pwdValidLength && scope.pwdHasAlphabet && scope.pwdHasNumber && scope.pwdHasSymbol) {
          ctrl.$setValidity('pwd', true);
          return viewValue;
        } else {
          ctrl.$setValidity('pwd', false);
          return undefined;
        }
      });
    }
  };
}).directive('prodonusMultiEmailValidate', function () {
  return {
    require: 'ngModel',
    link: function (scope, elm, attrs, ctrl) {
      ctrl.$parsers.unshift(function (viewValue) {
        scope.emailHas = viewValue && /(([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)(\s*,\s*|\s*$)+)/.test(viewValue) ? 'valid' : undefined;
        if (scope.emailHas) {
          ctrl.$setValidity('email', true);
          return viewValue;
        } else {
          ctrl.$setValidity('email', false);
          return undefined;
        }
      });
    }
  };
}).directive('prodoAlertMessage', [
  '$timeout',
  function ($timeout) {
    return {
      restrict: 'EA',
      replace: true,
      template: '<div style="text-align:left; padding: 8px; margin: 10px;" class="alert {{mainAlert.alertType}}" ng-show="mainAlert.isShown">' + '<button type="button" class="close" ng-click="closeAlert()" aria-hidden="true">&times;</button>' + '{{mainAlert.message}}' + '<a href="#/{{mainAlert.linkpage}}" class="alert-link"> {{mainAlert.linkmessage}}</a>' + '</div>',
      controller: [
        '$scope',
        '$rootScope',
        function ($scope, $rootScope) {
          $scope.mainAlert = { isShown: false };
          $scope.showAlert = function (alertType, message, linkpage, linkmessage) {
            $scope.mainAlert.message = message;
            $scope.mainAlert.isShown = true;
            $scope.mainAlert.linkpage = linkpage;
            $scope.mainAlert.linkmessage = linkmessage;
            $scope.mainAlert.alertType = alertType;
          };
          $scope.showmessage = function (alertclass, msg, alertlink, linkmsg) {
            var alerttype = alertclass;
            var alertmessage = msg;
            var link = alertlink;
            var linkmessage = linkmsg;
            $scope.showAlert(alerttype, alertmessage, link, linkmessage);
            return true;
          };
          $scope.closeAlert = function () {
            $scope.mainAlert.isShown = false;
          };
          $scope.hideAlert = function () {
            $scope.mainAlert.isShown = false;
          };
        }
      ]
    };
}
]).directive('prodoSpinner', [
  '$timeout',
  function ($timeout) {
    return {
      restrict: 'EA',
      replace: true,
      template: '<span ng-show="spinner.isShown">' + '<i style="color:yellow;" class="fa fa-spinner fa-spin">' + '</i>' + '</span>',
      controller: [
        '$scope',
        '$rootScope',
        function ($scope, $rootScope) {
          $scope.spinner = { isShown: false };
          $scope.showSpinner = function () {
            $scope.spinner.isShown = true;
          };
          $scope.hideSpinner = function () {
            $scope.spinner.isShown = false;
          };
        }
      ]
    };
  }
]).directive('prodoSigninModal', [
  '$timeout', 'UserSessionService',
  function ($timeout, UserSessionService) {
    return {
      restrict: 'EA',
      replace: true,
      templateUrl: 'user/views/user.continue.login.modal.tpl.html', 
      controller: [
        '$scope',
        '$rootScope',
        function ($scope, $rootScope) {
          $rootScope.showModal = function () {
            $('#mySessionModal').modal({ 
              keyboard: false,
              backdrop: 'static',
              show: true
            });
          };

          $scope.sessionout = function() {
            UserSessionService.logoutUser();
            $('#mySessionModal').modal('hide');
          }
        }
      ]
    };
  }
]).directive('prodovideo', function () {
  return {
    restrict: 'EA',
    replace: true,
    transclude: true,
    scope: { video: '@' },
    template: '<div class="prodovideo">' + '<iframe ng-src="{{ video }}"></iframe>' + '</div>',
    link: function (scope, element, attrs) {
      var ratio = attrs.height / attrs.width * 100;
      element[0].style.paddingTop = ratio + '%';
    }
  };
}).directive('prodoSlider', function () {
  var sliderdef = {
      restrict: 'A',
      link: function (scope, ele, attrs, c) {
        $('#layerslider').layerSlider({
          skin                    : 'fullwidth',
          autoStart               : true,
          responsive              : true,
          responsiveUnder         : 0,
          sublayerContainer       : 0,
          keybNav                 : true,
          touchNav                : true,
          imgPreload              : true,
          navPrevNext             : true,
          navStartStop            : true,
          navButtons              : true,
          thumbnailNavigation     : 'hover',
          tnWidth                 : 100,
          tnHeight                : 60,
          tnContainerWidth        : '60%',
          tnActiveOpacity         : 35,
          tnInactiveOpacity       : 100,
          hoverPrevNext           : true,
          hoverBottomNav          : true,
          pauseOnHover            : true,
          autoPlayVideos          : true,
          autoPauseSlideshow      : 'auto',
          showBarTimer            : false,
          showCircleTimer         : false
        });
      }
    };
  return sliderdef;
})
.directive('prodoBroadcastCarousel', function () {
  var carouseldef = {
      restrict: 'A',
      link: function (scope, ele, attrs, c) {
        $('#myCarousel').carousel({
          interval: 10000
        });
      }
    };
  return carouseldef;
})
.directive('prodoNav', function () {
  var nav = {
      restrict: 'A',
      link: function (scope, ele, attrs, c) {
        $('document').ready(function () {
          $('ul.nav.nav-pills li a').click(function () {
            $(this).parent().addClass('active').siblings().removeClass('active');
          });
        });
      }
    };
  return nav;
}).directive('showtab',
    function () {
        return {
            link: function (scope, element, attrs) {
                element.click(function(e) {
                    e.preventDefault();
                    $(element).tab('show');
                });
            }
        };
}).directive('prodoUnique', [
  '$http',
  function ($http) {
    var username = {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, ele, attrs, ngModel) {
          $('#prodo-form-input-username-signup').on('keyup', function (e) {
            var value = $(this).val().trim();
            var req = { 'username': value };
            if (value.length > 2 && value.length < 15) {
              $http({
                method: 'GET',
                url: '/api/userunique/' + value,
                data: req
              }).success(function (data, status, headers, cfg) {
                if (data.success) {
                  console.log(data.success.message);
                  ngModel.$setValidity("nametaken",true); // username available
                } else {
                    if (data.error.code== 'AV001') { 
                        console.log(data.error.code + data.error.message); 
                        ngModel.$setValidity("namelength", false);
                        
                    } else if (data.error.code=='ED001') {
                        console.log(data.error.code + data.error.message);
                        ngModel.$setValidity("nametaken",false);
                    } else if (data.error.code=='ED003') {   
                        console.log(data.error.code + data.error.message);
                        ngModel.$setValidity("nametaken",false);
                    } 
                }
              }).error(function (data, status, headers, cfg) {
                console.log(data);
              });
            }
          });
        }
      };
    return username;
  }
]).directive('prodoBarchart', function () {
  var barchart = {
      restrict: 'EA',
      link: function (scope, element, a) {
        nv.addGraph(function () {
          var chart = nv.models.discreteBarChart().x(function (d) {
              return d.label;
            }).y(function (d) {
              return d.value;
            }).staggerLabels(true).tooltips(true).showValues(true);
          d3.select('#chart').datum(example()).transition().duration(50).call(chart);
          nv.utils.windowResize(chart.update);
          return chart;
        });
        function example() {
          return [{
              key: 'Product Ratings',
              values: [
                {
                  'label': 'Awsome ',
                  'value': 300
                },
                {
                  'label': 'Average',
                  'value': 600
                },
                {
                  'label': 'Good',
                  'value': 200
                },
                {
                  'label': 'Bad',
                  'value': 400
                },
                {
                  'label': 'Worst',
                  'value': 10
                },
                {
                  'label': 'Complaints',
                  'value': 20
                }
              ]
            }];
        }
      }
    };
  return barchart;
}).directive('prodoPiechart', function () {
  var piechart = {
      restrict: 'EA',
      link: function (scope, elem, attrs) {
        nv.addGraph(function () {
          var width = 500, height = 500;
          var chart = nv.models.pieChart().x(function (d) {
              return d.key;
            }).y(function (d) {
              return d.y;
            }).color(d3.scale.category10().range()).width(width).height(height);
          d3.select('#test1').datum(scope.data).transition().duration(1200).attr('width', width).attr('height', height).call(chart);
          chart.dispatch.on('stateChange', function (e) {
            nv.log('New State:', JSON.stringify(e));
          });
          return chart;
        });
      }
    };
  return piechart;
}).directive('prodoProductChart', function () {
  var prodoChart = {
      restrict: 'EA',
      link: function (scope, element, attr) {
        var tooltip = d3.select("#a").append("div")   
           .attr("class", "abc")               
           .style("opacity", 0);
        var z = d3.select('#a').style('background-image', 'url(http://s1.ibtimes.com/sites/www.ibtimes.com/files/styles/v2_article_large/public/2013/09/18/apple-iphone-5s-release.jpg) ').style('background-repeat', 'no-repeat' ).style('background-size', '78%');
        var zz = z.append('svg');




        var frontCameraCircle = zz.append('circle').attr('cx', 380 + 9).attr('cy', 54).attr('r', 5).style('fill', 'blue').style('position','relative');
        frontCameraCircle.on('mouseenter', function () {
          frontCameraCircle.attr('r', 10).style('fill', 'none').style('stroke', 'red').style('stroke-opacity', 0.000001).style('stroke-width', 3).transition().duration(500).attr('r', 5).style('fill', 'blue').style('stroke-opacity', 2);
          tooltip.text('Front Camera').style('opacity', 2).style("left","400px").style("bottom","265px");
          //.style("left", d3.select(this).attr("cx") + "px").style("top", d3.select(this).attr("cy") + "px");

          // .style('left', d3.event.pageX + 5 + 'px').style('top', d3.event.pageY + 5 + 'px');
        }).on('mouseout', function () {
          frontCameraCircle.attr('r', 5).style('stroke', 'none');
          tooltip.style('opacity', 0).style("left","0px").style("bottom","0px");
        });




      
        screenCircle = zz.append('circle').attr('cx', 192).attr('cy', 90).attr('r', 5).style('fill', 'blue').style('position','relative').on('mouseover', function () {
          screenCircle.attr('r', 10).style('fill', 'none').style('stroke', 'red').style('stroke-opacity', 0.000001).style('stroke-width', 3).transition().duration(500).attr('r', 5).style('fill', 'blue').style('stroke-opacity', 2);
          tooltip.text('Screen').style('opacity', 2).style("left","200px").style("bottom","220px");
          // .style('left', d3.event.pageX + 5 + 'px').style('top', d3.event.pageY + 5 + 'px');
        }).on('mouseout', function () {
          screenCircle.attr('r', 5).style('stroke', 'none');
          tooltip.style('opacity', 0).style("left","0px").style("bottom","0px");
        });



        // homekeyCircle = zz.append('circle').attr('cx', 160).attr('cy', 200).attr('r', 5).style('fill', 'blue').style('position','relative').on('mouseover', function () {
        //   homekeyCircle.attr('r', 10).style('fill', 'none').style('stroke', 'red').style('stroke-opacity', 0.000001).style('stroke-width', 3).transition().duration(500).attr('r', 5).style('fill', 'blue').style('stroke-opacity', 2);
        //   tooltip.text('Home Key').style('opacity', 2).style("left","200px").style("bottom","40px");
        //   // .style('left', d3.event.pageX + 5 + 'px').style('top', d3.event.pageY + 5 + 'px');
        // }).on('mouseout', function () {
        //   homekeyCircle.attr('r', 5).style('stroke', 'none');
        //   tooltip.style('opacity', 0).style("left","0px").style("bottom","0px");
        // });




        speakersCircle = zz.append('circle').attr('cx', 120).attr('cy', 300).attr('r', 4).style('fill', 'blue').style('position','relative').on('mouseover', function () {
          speakersCircle.attr('r', 10).style('fill', 'none').style('stroke', 'red').style('stroke-opacity', 0.000001).style('stroke-width', 3).transition().duration(500).attr('r', 4).style('fill', 'blue').style('stroke-opacity', 2);
          tooltip.text('Speakers').style('opacity', 2).style("left","122px").style("bottom","38px");
          //.style('left', d3.event.pageX + 5 + 'px').style('top', d3.event.pageY + 5 + 'px');
        }).on('mouseout', function () {
          speakersCircle.attr('r', 4).style('stroke', 'none').style("left","0px").style("bottom","0px");
          tooltip.style('opacity', 0);
        });
        // l5 = zz.append('circle').attr('cx', 280).attr('cy', 90).attr('r', 4).style('fill', 'blue').on('mouseover', function () {
        //   l5.attr('r', 10).style('fill', 'none').style('stroke', 'red').style('stroke-opacity', 0.000001).style('stroke-width', 3).transition().duration(500).attr('r', 4).style('fill', 'blue').style('stroke-opacity', 2);
        //   tooltip.text('Rear Main Camera').style('opacity', 2).style('left', d3.event.pageX + 5 + 'px').style('top', d3.event.pageY + 5 + 'px');
        // }).on('mouseout', function () {
        //   l5.attr('r', 4).style('stroke', 'none');
        //   tooltip.style('opacity', 0);
        // });
        // l6 = zz.append('circle').attr('cx', 305).attr('cy', 67).attr('r', 4).style('fill', 'blue').on('mouseover', function () {
        //   l6.attr('r', 7).style('fill', 'none').style('stroke', 'red').style('stroke-opacity', 0.000001).style('stroke-width', 3).transition().duration(500).attr('r', 4).style('fill', 'blue').style('stroke-opacity', 2);
        //   tooltip.text('Flash').style('opacity', 2).style('left', d3.event.pageX + 5 + 'px').style('top', d3.event.pageY + 5 + 'px');
        // }).on('mouseout', function () {
        //   l6.attr('r', 2).style('stroke', 'none');
        //   tooltip.style('opacity', 0);
        // });
        // l7 = zz.append('circle').attr('cx', 488).attr('cy', 140).attr('r', 4).style('fill', 'blue').on('mouseover', function () {
        //   l7.attr('r', 10).style('fill', 'none').style('stroke', 'red').style('stroke-opacity', 0.000001).style('stroke-width', 3).transition().duration(500).attr('r', 5).style('fill', 'blue').style('stroke-opacity', 2);
        //   tooltip.text('Volume Keys').style('opacity', 4).style('left', d3.event.pageX + 5 + 'px').style('top', d3.event.pageY + 5 + 'px');
        // }).on('mouseout', function () {
        //   l7.attr('r', 4).style('stroke', 'none');
        //   tooltip.style('opacity', 0);
        // });
      }
    };
  return prodoChart;
}).directive('prodoIndia', function () {
  var indiaData = {
      restrict: 'EA',
      link: function (scope, element, attr) {
        var proj = d3.geo.mercator();
        var path = d3.geo.path().projection(proj);
        var map = d3.select('#map').append('svg:svg').attr('class', 'maps').attr('width', 600).attr('height', 800).call(initialize);
        var india = map.append('svg:g').attr('id', 'india');
        var tooltip = d3.select('#map').append('div').attr('class', 'abctooltip').style('opacity', 0);
        var data;
        d3.json('../../dashboard/json/IndiaData.json', function (json) {
          india.selectAll('path').data(json.features).enter().append('path').attr('d', path);
        });
        d3.json('../../dashboard/json/Counties.json', function (json) {
          data = json.reduce(function (result, county) {
            result[county.id] = county;
            return result;
          }, {});
          india.selectAll('path').style('fill', function a(d) {
            if (d.amount < 2)
              return 'rgb(247,251,255)';
            else if (d.amount > 1 && d.amount < 3)
              return 'rgb(8,48,107)';
            else if (d.amount > 2 && d.amount < 4)
              return 'rgb(8,81,156)';
            else if (d.amount > 3 && d.amount < 5)
              return 'rgb(8,81,156)';
            else
              return 'rgb(8,48,107)';
          }).attr('d', path).on('mouseover', function (d) {
            var title = d3.select('#subtitle').text(d.id);
            tooltip.text('State: ' + d.id + '  ' + 'Number of Customers: ' + d.amount * 100000).style('opacity', 4).style('left', d3.event.pageX + 5 + 'px').style('top', d3.event.pageY + 5 + 'px');
            var subblurb = d3.select('#subblurb').text(d.comment);
            console.log('The amount is ' + d.amount);
          }).on('mouseout', function (d) {
            tooltip.style('opacity', 0);
          }).on('click', function () {
          });
        });
        function initialize() {
          proj.scale(6700);
          proj.translate([
            -1240,
            720
          ]);
        }
        function quantize(d) {
          console.log('q' + Math.min(8, ~~(d.amount * 9 / 12)) + '-9');
          return 'q' + Math.min(8, ~~(d.amount * 9 / 12)) + '-9';
        }
      }
    };
  return indiaData;
}).directive('generalSearch', [
  '$http','$rootScope',
  function ($http,$rootScope) {
    var search = {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, ele, attrs, ngModel , growl) {

          $('#searchText').on('keyup', function (e) { 
                      scope.errors="";
                      var value = $(this).val().trim();
                      var req = { 'name': value , 'orgid' : $rootScope.orgid};
                      if(value !=="")
                      {
                         $http({
                         method: 'POST',
                         url: '/api/allproduct/',
                         data: req
                         }).success(function (data) 
                         {
                         if(data.error)
                              {
                                  if(data.error.code==="AD001")                       
                                  {
                                      scope.errors="Please assign orgid";
                                   }
                              }
                         else if(data.success)
                               { 
                                   if(data.name.doc.length===0)
                                   { 
                                        if(value==="")
                                        {  
                                              scope.errors="";
                                        }
                                        else
                                        {                                
                                        scope.errors="No products found for \n '" + $rootScope.orgdata.name+"'";
                                           window.setTimeout(function() {                                            
                                           scope.toggleTitleForDiv();
                                           }, 1000);
                                        }
                                    }                                                                  
                                  }
                          scope.enhancement={};
                          scope.productNames=[];
                          scope.enhancement=data.name.doc;
                          scope.productNames=data.success.doc;                
                          }).error(function (data) {
                                   scope.errors="Server Error";                                 
                          });   
                       }
            });
          }
      };
    return search;
  }
]);