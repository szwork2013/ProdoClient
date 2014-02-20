angular.module('prodo.SubscriptionApp').controller('PaymentController', [
  '$rootScope',
  '$scope',
  '$state',
  '$stateParams',
  '$log',
  'UserSubscriptionService',
  'UserSessionService',
  function ($rootScope, $scope, $state, $stateParams, $log, UserSubscriptionService, UserSessionService) {
    $scope.subscriptionpayment = {
      planid: $stateParams.planid,
      plantype: $stateParams.plantype
    };
    $scope.subscriptionpayment.price = '0.00';
    $scope.getdiscount = function () {
      UserSubscriptionService.getDiscountCoupon();
      var cleanupEventGetSubscriptionDiscountDone = $scope.$on('getSubscriptionDiscountDone', function (event, data) {
          $scope.subscriptionpayment.discountcode = data;
          cleanupEventGetSubscriptionDiscountDone();
        });
    };
    console.log($stateParams.planid);
    console.log($stateParams.plantype);
    $scope.changesubscription = function () {
      UserSubscriptionService.changeSubscriptionPlan($stateParams.plantype);
      var cleanupEventChangeSubscriptionDone = $scope.$on('changeSubscriptionDone', function (event, data) {
          $scope.subscriptionplandata = data;
          cleanupEventChangeSubscriptionDone();
        });
    };
    $scope.jsonSubscriptionPaymentData = function () {
      var userSubscriptionData = {
          payment: {
            'usertype': $stateParams.plantype,
            'discountcode': '',
            'planid': $stateParams.planid
          }
        };
      return JSON.stringify(userSubscriptionData);
    };
    $scope.handleSubscriptionPaymentResponse = function (data) {
      if (data.success) {
        UserSessionService.checkUser();
        $scope.showAlert('alert-success', data.success.message);
      } else {
        if (data.error.code == 'AV001') {
          $log.debug(data.error.code + ' ' + data.error.message);
          $scope.showAlert('alert-danger', 'You are not a registered user, please signup first');
        } else if (data.error.code == 'AD001') {
          $log.debug(data.error.code + ' ' + data.error.message);
          $scope.showAlert('alert-danger', data.error.message);
        } else if (data.error.code == 'AD002') {
          $log.debug(data.error.code + ' ' + data.error.message);
          $scope.showAlert('alert-danger', data.error.message);
        } else {
          $log.debug(data.error.message);
          $scope.showAlert('alert-danger', data.error.message);
        }
      }
    };
    $scope.makePayment = function () {
      UserSubscriptionService.makeSubscriptionPayment($scope.jsonSubscriptionPaymentData());
      var cleanupEventgetSubscriptionPaymentDone = $scope.$on('getSubscriptionPaymentDone', function (event, message) {
          $scope.handleSubscriptionPaymentResponse(message);
          cleanupEventgetSubscriptionPaymentDone();
        });
      var cleanupEventgetSubscriptionPaymentNotDone = $scope.$on('getSubscriptionPaymentNotDone', function (event, message) {
          $scope.showAlert('alert-danger', 'Server Error:' + message);
          cleanupEventgetSubscriptionPaymentNotDone();
        });
    };
  }
]);