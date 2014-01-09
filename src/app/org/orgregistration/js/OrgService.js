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
 .factory('OrgRegistrationService', ['$rootScope', '$resource', '$log', function($rootScope, $resource, $log) {
    var OrgService = 
      {
        OrgRegistration: $resource('/api/organization/:orgid', {},
        {
          getAllOrgs: { method: 'GET', isArray: true },
          getOrgSettings: { method: 'GET', params: { orgid : '@orgid' }},
          saveOrg: { method: 'POST'},
          updateOrgSettings: { method: 'PUT', params: { orgid: '@orgid' }, isArray: false},
          deleteOrgSettings: { method: 'DELETE', params: { orgid: '@orgid' }}
        }),
        ManageOrgLocation: $resource('/api/orgaddress/:orgid/:orgaddressid', {},
        {
          getAllOrgAddress: { method: 'GET', params: { orgid: '@orgid' }},
          addOrgAddress: { method: 'POST', params: { orgid: '@orgid'}},
          updateOrgAddress: { method: 'PUT', params: { orgid: '@orgid', orgaddressid: '@orgaddressid'  }, isArray: false},
          deleteOrgAddressById: { method: 'DELETE', params: { orgid: '@orgid', orgaddressid: '@orgaddressid' }}
        })
      }

    var organization = {};

    organization.RegisterOrg= function (orgData) {
        OrgService.OrgRegistration.saveOrg(orgData,     // calling function of UserSigninService to make POST method call to signin user.
        function(success){
          $log.debug(success);
          $rootScope.$broadcast("orgRegistrationDone", success);
        },
        function(error){
          $log.debug(error);
          $rootScope.$broadcast("orgRegistrationNotDone", error.status);
        });
      }

    organization.saveOrgSettings= function (orgData) {
        OrgService.OrgRegistration.updateOrgSettings({orgid: $rootScope.usersession.currentUser.orgid}, orgData,     // calling function of UserSigninService to make POST method call to signin user.
        function(success){
          $log.debug(success);
          $rootScope.$broadcast("updateOrgDone", success);
        },
        function(error){
          $log.debug(error);
          $rootScope.$broadcast("updateOrgNotDone", error.status);
        });
      }

      organization.getAllOrgAddress= function () {
        OrgService.ManageOrgLocation.getAllOrgAddress({orgid: $rootScope.usersession.currentUser.orgid},     // calling function of UserSigninService to make POST method call to signin user.
        function(success){
          $log.debug(success);
          $rootScope.$broadcast("getOrgAddressDone", success);
        },
        function(error){
          $log.debug(error);
          $rootScope.$broadcast("getOrgAddressNotDone", error.status);
        });
      }

      organization.saveOrgAddress= function (orgAddData) {
        $log.debug($rootScope.organizationData.currentOrgAdd._id)
        if ($rootScope.organizationData.currentOrgAdd._id) {
          OrgService.ManageOrgLocation.updateOrgAddress({orgid: $rootScope.usersession.currentUser.orgid, orgaddressid: $rootScope.organizationData.currentOrgAdd.location}, orgAddData,     // calling function of UserSigninService to make POST method call to signin user.
            function(success){
              $log.debug(success);
              $rootScope.$broadcast("updateOrgAddressDone", success);
            },
            function(error){
              $log.debug(error);
              $rootScope.$broadcast("updateOrgAddressNotDone", error.status);
            });
        } else {
          OrgService.ManageOrgLocation.addOrgAddress({orgid: $rootScope.usersession.currentUser.orgid}, orgAddData,     // calling function of UserSigninService to make POST method call to signin user.
            function(success){
              $log.debug(success);
              $rootScope.$broadcast("addOrgAddressDone", success);
            },
            function(error){
              $log.debug(error);
              $rootScope.$broadcast("addOrgAddressNotDone", error.status);
            });
        }
        
      }

      organization.removeOrgAddress= function () {
        OrgService.ManageOrgLocation.deleteOrgAddressById({orgid: $rootScope.usersession.currentUser.orgid, orgaddressid: $rootScope.organizationData.currentOrgAdd.location},     // calling function of UserSigninService to make POST method call to signin user.
        function(success){
          $log.debug(success);
          $rootScope.$broadcast("deleteOrgAddressDone", success);
        },
        function(error){
          $log.debug(error);
          $rootScope.$broadcast("deleteOrgAddressNotDone", error.status);
        });
      }


      organization.removeOrgSettings= function () {
        OrgService.OrgRegistration.deleteOrgSettings({orgid: $rootScope.usersession.currentUser.orgid},     // calling function of UserSigninService to make POST method call to signin user.
        function(success){
          $log.debug(success);
          $rootScope.$broadcast("deleteOrgDone", success);
        },
        function(error){
          $log.debug(error);
          $rootScope.$broadcast("deleteOrgNotDone", error.status);
        });
      }

      organization.getOrgDetailSettings= function () {
        OrgService.OrgRegistration.getOrgSettings({orgid: $rootScope.usersession.currentUser.orgid},     // calling function of UserSigninService to make POST method call to signin user.
        function(success){
          $log.debug(success);
          $rootScope.$broadcast("getOrgDone", success);
        },
        function(error){
          $log.debug(error);
          $rootScope.$broadcast("getOrgNotDone", error.status);
        });
      }

      organization.updateOrgData = function(orgData, $scope){
          organization.currentOrgData = orgData;
      }

      organization.updateOrgAdd = function(orgAdd, $scope){

          organization.currentOrgAdd = orgAdd;
      }

    return organization;
  }]); 