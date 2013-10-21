angular.module('prodo.OrgApp')
  .factory('orgModel', function(){
    return {
      companyname:"",
      description:"", 
      name:"",
      contractid:"",
      address1:"",
      address2:"",
      address3:"",
      country:"",
      city:"",
      state:"",
      zipcode:"",
      value:"",
      groupname:"",
      domain:"",
      invites:"",
      planid:"",
      plantype:""  
    }
});