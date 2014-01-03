/**
*Org services to make calls to REST APIs 
**/
angular.module('prodo.OrgApp')

// factory service to update org model
 .factory('OrgModel', function(){
    return {
      name:"",
      description:"", 
      orgtype:"",
      contractid:"",
      orginvites: [],
      subscription: [],
      grpname: "",
      invites: "",
      grpmembers: [],
      orgaddresstype:"",
      address1:"",
      address2:"",
      address3:"",
      country:"",
      city:"",
      state:"",
      zipcode:"",
      timezone : "",
      region: "",
      geo: {latitude: 2 , longitude: 1},
      contact_numbers: {
                       customerhelpline1 : "",
                       customerhelpline2 : "",
                       customerhelpline3 : ""},
      grpname:"",
      invites:"",
      terms: "" 
    }
  })
 
// factory service to make call to REST APIs using $resource
 .factory('OrgRegistrationService', ['$rootScope', '$resource', function($rootScope, $resource) {
    var OrgService = 
      {
        OrgRegistration: $resource('/api/organization/:orgid', {},
        {
          getAllOrgs: { method: 'GET', isArray: true },
          getOrgSettings: { method: 'GET', params: { orgid : '@orgid' }},
          saveOrg: { method: 'POST'},
          updateOrgSettings: { method: 'PUT', params: { orgid: '@orgid' }, isArray: false},
          deleteOrgSettings: { method: 'DELETE', params: { orgid: '@orgid' }}
        })
      }

    var organization = {};

    organization.RegisterOrg= function (orgData) {
        OrgService.OrgRegistration.saveOrg(orgData,     // calling function of UserSigninService to make POST method call to signin user.
        function(success){
          console.log(success);
          $rootScope.$broadcast("orgRegistrationDone", success);
        },
        function(error){
          console.log(error);
        });
      }

    organization.saveOrgSettings= function (orgData) {
        OrgService.OrgRegistration.updateOrgSettings({orgid: $rootScope.usersession.currentUser.orgid}, userdata,     // calling function of UserSigninService to make POST method call to signin user.
        function(success){
          console.log(success);
          $rootScope.$broadcast("updateOrgDone", success);
        },
        function(error){
          console.log(error);
        });
      }

      organization.removeOrgSettings= function () {
        OrgService.OrgRegistration.deleteOrgSettings({orgid: $rootScope.usersession.currentUser.orgid},     // calling function of UserSigninService to make POST method call to signin user.
        function(success){
          console.log(success);
          $rootScope.$broadcast("deleteOrgDone", success);
        },
        function(error){
          console.log(error);
        });
      }

      organization.getOrgDetailSettings= function () {
        OrgService.OrgRegistration.getOrgSettings({orgid: $rootScope.usersession.currentUser.orgid},     // calling function of UserSigninService to make POST method call to signin user.
        function(success){
          console.log(success);
          $rootScope.$broadcast("getOrgDone", success);
        },
        function(error){
          console.log(error);
        });
      }

      organization.updateOrgData = function(orgData, $scope){
          organization.currentOrgData = orgData;
          console.log(organization.currentOrgData.location[0].address)
        }

      // function to handle server side responses
      organization.handleGetOrgResponse = function(data){
      if (data.success) {
        organization.updateOrgData(data.success.organization);
        // $scope.showAlert('alert-success', data.success.message);   
      } else {
            console.log(data.error.message);
            $scope.showAlert('alert-danger', data.error.message);
        }
    };

      $rootScope.$on("getOrgDone", function(event, message){
        organization.handleGetOrgResponse(message);   
      });


    return organization;
  }]); 