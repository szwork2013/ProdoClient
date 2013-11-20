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
                       customerhelpline3 : "",
                       customerhelpline4 : "" },
      grpname:"",
      invites:"",
      terms: "" 
    }
  })
 
// factory service to make call to REST APIs using $resource
 .factory('OrgRegistrationService', function($resource) {
    return $resource('/api/organization/:orgid', {},
      {
        findAllOrgs: { method: 'GET', isArray: true },
        findByOrgId: { method: 'GET', params: { orgid : '@orgid' }},
        saveOrg: { method: 'POST'},
        updateOrg: { method: 'PUT', params: { orgid: '@orgid' }, isArray: false},
        deleteOrg: { method: 'DELETE', params: { orgid: '@orgid' }}
    });
  }); 