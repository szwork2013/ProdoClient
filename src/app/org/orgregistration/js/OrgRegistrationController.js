/**
*	Org Registration Controller
**/
angular.module('prodo.OrgApp')
	.controller('OrgRegistrationController', ['$scope', 'OrgModel', '$state', 'OrgRegistrationService', function($scope, OrgModel, $state, OrgRegistrationService) {
		$scope.org = OrgModel;
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
      $scope.org.contact_numbers.customerhelpline1= '';
      $scope.org.contact_numbers.customerhelpline2= '';
      $scope.org.contact_numbers.customerhelpline3= '';
      $scope.org.contact_numbers.customerhelpline4= '';
      $scope.org.grpname= '';
      $scope.org.invites= '';  
  }

		$scope.handleOrgResponse = function(data){
            if (data.success) {
                  console.log(data.success);
                  $state.transitionTo('prodo.wall');
                } 
                else

                {
                $state.transitionTo('subscription.company');
                console.log(data.error)

              }
          };
  $scope.jsonOrgData = function(){
      var orgData = 
      {
        organization:
          {
	          'name':$scope.org.name,
	          'description':$scope.org.description, 
	          'orgtype':$scope.org.orgtype,
	          'contractid':$scope.org.contractid,
	          'location': [ {
              'address': {
                'address1': $scope.org.address1,
    	          'address2': $scope.org.address2,
    	          'address3': $scope.org.address3,
    	          'country': $scope.org.country,
    	          'city': $scope.org.city,
    	          'state': $scope.org.state,
    	          'zipcode': $scope.org.zipcode } }],
	          'contact_numbers': [ 
	                           {'customerhelpline' : $scope.org.contact_numbers.customerhelpline1 },
	                           {'customerhelpline' : $scope.org.contact_numbers.customerhelpline2 },
	                           {'customerhelpline' : $scope.org.contact_numbers.customerhelpline3 },
	                           {'customerhelpline' : $scope.org.contact_numbers.customerhelpline4 } ],
	          'usergrp': [ {
                'grpname': $scope.org.grpname,
	              'invites': $scope.org.invites
          } ],
          'terms': true
      }

    }
      // console.log(userData);
    return JSON.stringify(orgData); 


  }   
  
  $scope.registerOrg = function(){
        OrgRegistrationService.saveOrg($scope.jsonOrgData(), 
        function(success){
          console.log(success);
          $scope.handleOrgResponse(success);
    	},
        function(error){
          console.log(error);
      });
        $scope.clearOrgData();
      
    
  }

 }]);