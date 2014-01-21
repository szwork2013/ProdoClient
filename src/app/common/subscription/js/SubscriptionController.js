/**
*	Subscription Controller
**/
angular.module('prodo.CommonApp')
	.controller('SubscriptionController', ['$rootScope', '$scope', '$state', '$stateParams', '$log', 'UserSessionService', 'UserSubscriptionService',  function($rootScope, $scope, $state, $stateParams, $log, UserSessionService, UserSubscriptionService) {
		// $scope.user = userModel;
		$scope.makeTransition = function(planId, planType) {
			if (planType == 'individual') {
				$scope.makeTransitionToState('subscription.payment', planId, planType)
			} else {
					if ($rootScope.usersession.currentUser.org && (planType == 'manufacturer' || planType == 'company' )) {
						$scope.makeTransitionToState('subscription.payment', planId, planType);
					} else if (planType == 'manufacturer' || planType == 'company' ) {
						$scope.makeTransitionToState('subscription.company', planId, planType)
					}
				}
		}

		$scope.makeTransitionToState = function(stateToGo, planId, planType) {
			$state.transitionTo(stateToGo, {planid: planId, plantype: planType });
		}

		var cleanupEventPassSubscriptionData = $rootScope.$on("passSubscriptionData", function(event, data){
      $scope.subscription = data;
      cleanupEventPassSubscriptionData();
    })

		$scope.subscription = UserSubscriptionService.currentSubscriptionData;

	}]);
