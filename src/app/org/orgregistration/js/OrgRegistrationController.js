/**
*	Org Registration Controller
**/
angular.module('prodo.OrgApp')
	.controller('OrgRegistrationController', ['$scope', 'OrgModel', '$state', '$stateParams', '$log', 'OrgRegistrationService', function($scope, OrgModel, $state, $stateParams, $log, OrgRegistrationService) {
		
    $scope.org = OrgModel;   // assining OrgModel service to org to update org model data
    
    $scope.org.orgtype = $stateParams.plantype;

    $scope.countries = [ 'Afghanistan','Albania','Algeria','American Samoa','Andorra','Angola' ,'Anguilla' ,'Antigua and Barbuda', 'Argentina ca','Armenia','Aruba ','Austria','Azerbaijan','Bahamas' ,'Bahrain', 'India']

    $scope.goToState = function() {
      if ($stateParams.plantype == 'manufacturer') {
        $state.transitionTo('orgregistration.terms', {planid:  $stateParams.planid, plantype: $stateParams.plantype });
      } else {
        $state.transitionTo('orgregistration.finish', {planid:  $stateParams.planid, plantype: $stateParams.plantype });
      }
    }

    // function to clear org data on submit
    $scope.clearOrgData = function(){
      $scope.org.name = '';
      $scope.org.description = '';
      $scope.org.orgtype= '';
      $scope.org.contractid= '';
      $scope.org.address1= '';
      $scope.org.address2= '';
      $scope.org.address3= '';
      $scope.org.country= '';    
      $scope.org.city= '';
      $scope.org.state= '';
      $scope.org.zipcode= '';
      $scope.org.contact.customerhelpline1= '';
      $scope.org.contact.customerhelpline2= '';
      $scope.org.contact.customerhelpline3= '';
      $scope.org.contact.customerhelpline4= '';
      $scope.org.grpname= '';
      $scope.org.invites= '';  
    }

    // function to handle server side responses on org resgistration submit
		$scope.handleOrgResponse = function(data){
      if (data.success) {
        $log.debug(data.success);      
        $state.transitionTo('subscription.payment', {planid:  $stateParams.planid, plantype: $stateParams.plantype });
        $scope.showAlert('alert-success', data.success.message + "" + "Please make payment to continue with Prodonus");
      } 
      else {
        $log.debug(data.error);
        $scope.showAlert('alert-danger', data.error.message);
      }
    };

    // function to send user data n stringify in json format
    $scope.jsonOrgData = function() {
      var orgData = 
        {
          organization:
            { 
  	          'name':$scope.org.name,
  	          'description':$scope.org.description, 
  	          'orgtype':$stateParams.plantype,
  	          'contractid':$scope.org.contractid,
  	          'location': 
                [ {
                'locationtype': $scope.org.orgaddresstype,
                'address': 
                  {
                  'address1': $scope.org.address1,
      	          'address2': $scope.org.address2,
      	          'address3': $scope.org.address3,
      	          'country': $scope.org.country,
      	          'city': $scope.org.city,
      	          'state': $scope.org.state,
      	          'zipcode': $scope.org.zipcode 
                  }, 
                'contacts': 
                [ 
                 {'customerhelpline' : $scope.org.contact.customerhelpline1 },
                 {'customerhelpline' : $scope.org.contact.customerhelpline2 },
                 {'customerhelpline' : $scope.org.contact.customerhelpline3 }
                ]
              } ],
  	          'usergrp': 
                [ {
                  'grpname': $scope.org.grpname,
  	              'invites': $scope.org.invites
                } ],
              'terms': $scope.org.terms
            },
          subscription:
            {
              'plantype': $stateParams.plantype,
              'planid': $stateParams.planid
            }
        }
      return JSON.stringify(orgData); 
    }   
  
    // function to register Organisation on sumbit
    $scope.registerOrg = function() {
      OrgRegistrationService.RegisterOrg($scope.jsonOrgData()); // calling POST method REST APIs to save org data through OrgResgistrationService
        var cleanupEventOrgRegistrationDone = $scope.$on("orgRegistrationDone", function(event, message){
        $scope.handleOrgResponse(message);
        cleanupEventOrgRegistrationDone();   
      });
      var cleanupEventOrgRegistrationNotDone = $scope.$on("orgRegistrationNotDone", function(event, message){
        $scope.showAlert('alert-danger', "Server Error:" + message); 
        cleanupEventOrgRegistrationNotDone();     
      }); 
    }
  }]);