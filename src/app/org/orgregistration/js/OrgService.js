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
          findAllOrgs: { method: 'GET', isArray: true },
          findByOrgId: { method: 'GET', params: { orgid : '@orgid' }},
          saveOrg: { method: 'POST'},
          updateOrg: { method: 'PUT', params: { orgid: '@orgid' }, isArray: false},
          deleteOrg: { method: 'DELETE', params: { orgid: '@orgid' }}
        })
      }

    var organization = {};

    organization.RegisterOrg= function (userdata) {
        OrgService.OrgRegistration.saveOrg(userdata,     // calling function of UserSigninService to make POST method call to signin user.
        function(success){
          console.log(success);
          $rootScope.$broadcast("orgRegistrationDone", success);
        },
        function(error){
          console.log(error);
        });
      }

    return organization;
  }]); 