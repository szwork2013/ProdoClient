angular.module('prodo.OrgApp')
.factory('orgModel', function(){
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
          invites:""  
        }
});

//   [
//   {
//     "contractid": "",
//     "description": "",
//     "name": "",
//     "orgtype": "",
//     "orginvites": [],
//     "subscription": [],
//     "status": "active",
//     "usergrp": [
//       {
         
//         "grpname": "",
//         "invites": "",
//         "grpmembers": []
//       } 
//     ],
//     "location": [ { 

//       "address":{
//           "address1":"",
//           "address2":"",
//           "address3":"",
//           "country":"",
//           "state":"",
//           "city":"",
//           "zipcode" : ""

//       },
//           "timezone" : "",
//           "region": "",
//           "geo": {latitude: 2 , longitude: 1}
//         } ],
//     "contact_number": [{
//           "customerhelpline" :
//     }],
    
// ]