angular.module('prodo.CommonApp')
.factory('UserSubscriptionService', ['$rootScope', '$resource', '$http', '$state', '$log', function($rootScope, $resource, $http, $state, $log) {
		var SubscriptionService = 
      {
      GetSubscription:  $resource('/api/subscription', {},
      {
        getSubscriptionPlan: { method: 'GET'}
      }),
      ChangeSubscription:  $resource('/api/subscription/:plantype', {},
      {
        changeSubscriptionPlan: { method: 'GET', params: { plantype: '@plantype' }, isArray: false}
      }),
      MakePayment:  $resource('/api/makepayment', {},
      {
        getSubscriptionPayment: { method: 'POST'}
      }),
      GetSubscriptionDiscount:  $resource('/api/discount', {},
      {
        getSubscriptionDiscountPlan: { method: 'GET'}
      }),
    };

    var subscription = {};

    subscription.getPlan= function ($scope) {
      SubscriptionService.GetSubscription.getSubscriptionPlan(     // calling function of UserSigninService to make POST method call to signin user.
      function(data){
        $log.debug(data);
        $rootScope.$broadcast("getSubscriptionDone", data.success.subscription);
        
      },
      function(error){
        $log.debug(error);
        $rootScope.$broadcast("getSubscriptionNotDone", error.status);
        
      });
    }

    var cleanupEventGetSubscriptionDone = $rootScope.$on("getSubscriptionDone", function(event, data){
      $state.transitionTo('subscription.plans');
      subscription.updateSubscriptionData(data);
      cleanupEventGetSubscriptionDone();
    })

    subscription.changeSubscriptionPlan= function (plandata) {
      SubscriptionService.ChangeSubscription.changeSubscriptionPlan({plantype: plandata},     // calling function of UserSigninService to make POST method call to signin user.
      function(data){
        $log.debug(data);
        $rootScope.$broadcast("changeSubscriptionDone", data.success.subscription);
        
      },
      function(error){
        $log.debug(error);
        $rootScope.$broadcast("changeSubscriptionNotDone", error.status);
        
      });
    }

    var cleanupEventGetSubscriptionDone = $rootScope.$on("getSubscriptionDone", function(event, data){
      $state.transitionTo('subscription.plans');
      subscription.updateSubscriptionData(data);
      cleanupEventGetSubscriptionDone();
    })

    subscription.getDiscountCoupon= function ($scope) {
      SubscriptionService.GetSubscriptionDiscount.getSubscriptionDiscountPlan(     // calling function of UserSigninService to make POST method call to signin user.
      function(data){
        $log.debug(data);
        $rootScope.$broadcast("getSubscriptionDiscountDone", data.success.discount.discountcode);
        
      },
      function(error){
        $log.debug(error);
        $rootScope.$broadcast("getSubscriptionDiscountNotDone", error.status);
        
      });
    }

    subscription.makeSubscriptionPayment= function (subscriptionData) {
      SubscriptionService.MakePayment.getSubscriptionPayment( subscriptionData,    // calling function of UserSigninService to make POST method call to signin user.
      function(success){
        $log.debug(success);
        console.log(success);
        $rootScope.$broadcast("getSubscriptionPaymentDone", success);
        
      },
      function(error){
        $log.debug(error);
        $rootScope.$broadcast("getSubscriptionPaymentNotDone", error.status);
        
      });
    }

    subscription.updateSubscriptionData = function(subscriptionData){
      subscription.currentSubscriptionData = subscriptionData;
      $rootScope.$emit("passSubscriptionData", subscriptionData);

    }

    return subscription;
}]);
