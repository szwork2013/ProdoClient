angular.module('prodo.OrgApp')
 .controller('OrgAccountController', ['$scope', '$rootScope', '$state', '$http', '$timeout', '$log','$modal', 'growl', 'UserSessionService', 'OrgRegistrationService', 'OrgService', 'currentorgdata', 'currentorgaddr', 'currentorgproduct', 'currentorggroup','ENV', function($scope, $rootScope, $state, $http, $timeout, $log, $modal, growl, UserSessionService, OrgRegistrationService, OrgService, currentorgdata, currentorgaddr, currentorgproduct, currentorggroup, ENV) {
    
$scope.submitted= false;    
$scope.form = {};
$scope.productlist = [];
$scope.islocation = false;
$scope.user = { password: '' };
$scope.$state=$state;
$scope.contacts= [{'customerhelpline': ''},{'customerhelpline': ''},{'customerhelpline': ''}];
$scope.orginvites=[{'name': '','orgname': '','email': ''}];
$scope.customerinvites=[{'name': '','email': ''}];
$scope.group = { 'newgroupname': '','grouppname': '','invites': '','newinvites': ''};
$scope.groups = currentorggroup.success.usergrp; 
$scope.orgaddr = currentorgaddr.success.orgaddress; console.log('9999'+ JSON.stringify(currentorgdata.success.organization.org_images));
$scope.orgImages = currentorgdata.success.organization.org_images;
var indexOfOrgAddress = 0;

$scope.validateError=false;
$scope.regexForText = /[a-z,A-Z]/;
$scope.regexForNumbers = /[0-9]/;
$scope.regexForEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

$scope.changedOrgDetails = false;
$scope.changedOrgLocation = false;
$scope.addedOrgLocation = false;
$scope.manageOrgGroup = false;
$scope.addOrgInvites = false;
$scope.addCustomerInvites = false;
$scope.deleteOrgResponse = false;

    $scope.resetGrowlMessages = function()
    {
            $scope.changedOrgDetails = false;
            $scope.changedOrgLocation = false;
            $scope.addedOrgLocation = false;
            $scope.manageOrgGroup = false;
            $scope.addOrgInvites = false;
            $scope.addCustomerInvites = false;
            $scope.deleteOrgResponse = false;
    };

$scope.calcNumberOfOrgAddresses = function()
{
  if($scope.orgaddr[1] === undefined && $scope.orgaddr[0] !== undefined)
  {
    return $scope.orgaddr[0].location.length;
  }
  else if($scope.orgaddr[1] !== undefined && $scope.orgaddr[0] === undefined)
  {
    return $scope.orgaddr[1].location.length;
  }
  else
  {
   return $scope.orgaddr[1].location.length + $scope.orgaddr[0].location.length; 
  }
};

var NumberOfOrgAddresses = $scope.calcNumberOfOrgAddresses();
OrgRegistrationService.updateOrgData(currentorgdata.success.organization);
$scope.editorEnabled = false;
$scope.orgaddresstype='';
$scope.showGrowlMessage=0;
//Omkars code //
$scope.countries=[ 'Afghanistan', 
                        'Albania', 
                        'Algeria', 
                        'American Samoa', 
                        'Andorra', 
                        'Angola', 
                        'Anguilla', 
                        'Antigua and Barbuda', 
                        'Argentina', 
                        'Armenia', 
                        'Aruba', 
                        'Australia', 
                        'Austria', 
                        'Azerbaijan', 
                        'Bahamas', 
                        'Bahrain', 
                        'Bangladesh', 
                        'Barbados', 
                        'Belarus', 
                        'Belgium', 
                        'Belize', 
                        'Benin', 
                        'Bermuda', 
                        'Bhutan', 
                        'Bolivia', 
                        'Bosnia-Herzegovina', 
                        'Botswana', 
                        'Bouvet Island', 
                        'Brazil', 
                        'Brunei', 
                        'Bulgaria', 
                        'Burkina Faso', 
                        'Burundi', 
                        'Cambodia', 
                        'Cameroon', 
                        'Canada', 
                        'Cape Verde', 
                        'Cayman Islands', 
                        'Central African Republic', 
                        'Chad', 
                        'Chile', 
                        'China', 
                        'Christmas Island', 
                        'Cocos (Keeling) Islands', 
                        'Colombia', 
                        'Comoros', 
                        'Congo, Democratic Republic of the (Zaire)', 
                        'Congo, Republic of', 
                        'Cook Islands', 
                        'Costa Rica', 
                        'Croatia', 
                        'Cuba', 
                        'Cyprus', 
                        'Czech Republic', 
                        'Denmark', 
                        'Djibouti', 
                        'Dominica', 
                        'Dominican Republic', 
                        'Ecuador', 
                        'Egypt', 
                        'El Salvador', 
                        'Equatorial Guinea', 
                        'Eritrea', 
                        'Estonia', 
                        'Ethiopia', 
                        'Falkland Islands', 
                        'Faroe Islands', 
                        'Fiji', 
                        'Finland', 
                        'France', 
                        'French Guiana', 
                        'Gabon', 
                        'Gambia', 
                        'Georgia', 
                        'Germany', 
                        'Ghana', 
                        'Gibraltar', 
                        'Greece', 
                        'Greenland', 
                        'Grenada', 
                        'Guadeloupe (French)', 
                        'Guam (USA)', 
                        'Guatemala', 
                        'Guinea', 
                        'Guinea Bissau', 
                        'Guyana', 
                        'Haiti', 
                        'Holy See', 
                        'Honduras', 
                        'Hong Kong', 
                        'Hungary', 
                        'Iceland', 
                        'India', 
                        'Indonesia', 
                        'Iran', 
                        'Iraq', 
                        'Ireland', 
                        'Israel', 
                        'Italy', 
                        'Ivory Coast (Cote D`Ivoire)', 
                        'Jamaica', 
                        'Japan', 
                        'Jordan', 
                        'Kazakhstan', 
                        'Kenya', 
                        'Kiribati', 
                        'Kuwait', 
                        'Kyrgyzstan', 
                        'Laos', 
                        'Latvia', 
                        'Lebanon', 
                        'Lesotho', 
                        'Liberia', 
                        'Libya', 
                        'Liechtenstein', 
                        'Lithuania', 
                        'Luxembourg', 
                        'Macau', 
                        'Macedonia', 
                        'Madagascar', 
                        'Malawi', 
                        'Malaysia', 
                        'Maldives', 
                        'Mali', 
                        'Malta', 
                        'Marshall Islands', 
                        'Martinique (French)', 
                        'Mauritania', 
                        'Mauritius', 
                        'Mayotte', 
                        'Mexico', 
                        'Micronesia', 
                        'Moldova', 
                        'Monaco', 
                        'Mongolia', 
                        'Montenegro', 
                        'Montserrat', 
                        'Morocco', 
                        'Mozambique', 
                        'Myanmar', 
                        'Namibia', 
                        'Nauru', 
                        'Nepal', 
                        'Netherlands', 
                        'Netherlands Antilles', 
                        'New Caledonia (French)', 
                        'New Zealand', 
                        'Nicaragua', 
                        'Niger', 
                        'Nigeria', 
                        'Niue', 
                        'Norfolk Island', 
                        'North Korea', 
                        'Northern Mariana Islands', 
                        'Norway', 
                        'Oman', 
                        'Pakistan', 
                        'Palau', 
                        'Panama', 
                        'Papua New Guinea', 
                        'Paraguay', 
                        'Peru', 
                        'Philippines', 
                        'Pitcairn Island', 
                        'Poland', 
                        'Polynesia (French)', 
                        'Portugal', 
                        'Puerto Rico', 
                        'Qatar', 
                        'Reunion', 
                        'Romania', 
                        'Russia', 
                        'Rwanda', 
                        'Saint Helena', 
                        'Saint Kitts and Nevis', 
                        'Saint Lucia', 
                        'Saint Pierre and Miquelon', 
                        'Saint Vincent and Grenadines', 
                        'Samoa', 
                        'San Marino', 
                        'Sao Tome and Principe', 
                        'Saudi Arabia', 
                        'Senegal', 
                        'Serbia', 
                        'Seychelles', 
                        'Sierra Leone', 
                        'Singapore', 
                        'Slovakia', 
                        'Slovenia', 
                        'Solomon Islands', 
                        'Somalia', 
                        'South Africa', 
                        'South Georgia and South Sandwich Islands', 
                        'South Korea', 
                        'South Sudan', 
                        'Spain', 
                        'Sri Lanka', 
                        'Sudan', 
                        'Suriname', 
                        'Svalbard and Jan Mayen Islands', 
                        'Swaziland', 
                        'Sweden', 
                        'Switzerland', 
                        'Syria', 
                        'Taiwan', 
                        'Tajikistan', 
                        'Tanzania', 
                        'Thailand', 
                        'Timor-Leste (East Timor)', 
                        'Togo', 
                        'Tokelau', 
                        'Tonga', 
                        'Trinidad and Tobago', 
                        'Tunisia', 
                        'Turkey', 
                        'Turkmenistan', 
                        'Turks and Caicos Islands', 
                        'Tuvalu', 
                        'Uganda', 
                        'Ukraine', 
                        'United Arab Emirates', 
                        'United Kingdom', 
                        'United States', 
                        'Uruguay', 
                        'Uzbekistan', 
                        'Vanuatu', 
                        'Venezuela', 
                        'Vietnam', 
                        'Virgin Islands', 
                        'Wallis and Futuna Islands', 
                        'Yemen', 
                        'Zambia', 
                        'Zimbabwe' ];

    //$scope.countries holds array of list of countries
    //$scope.states is an array of objects where each object will represent states of selected country
    //For time being only india is considered                    
    $scope.states={};                    
    $scope.states.india=     [
                          'Andhra Pradesh', 
                          'Arunachal Pradesh', 
                          'Assam', 
                          'Bihar ', 
                          'Chhattisgarh ', 
                          'Goa', 
                          'Gujarat', 
                          'Haryana', 
                          'Himachal Pradesh', 
                          'Jammu and Kashmir', 
                          'Jharkhand', 
                          'Kerala ', 
                          'Madhya Pradesh', 
                          'Maharashtra', 
                          'Manipur', 
                          'Meghalaya', 
                          'Mizoram', 
                          'Nagaland', 
                          'Orissa ', 
                          'Punjab', 
                          'Rajasthan', 
                          'Sikkim', 
                          'Tamil Nadu', 
                          'Tripura', 
                          'Uttar Pradesh', 
                          'Uttarakhand', 
                          'West Bengal' ]                       
                        ;    
    //$scope.cities will store data regarding cities in the states
    //Currently due to unavailability of data, we are resrticting our scope to india
    //So when india is selected from the country list
    //All cities in Indial will be displayed irrespective of states
    //This needs to be modified later.                     
    $scope.india={};
    $scope.india.major_cities= [        'Port Blair', 
                            'Hyderabad', 
                            'Itanagar', 
                            'Dispur', 
                            'Patna', 
                            'Silvassa', 
                            'Daman', 
                            'Delhi', 
                            'Gandhinagar', 
                            'Chandigarh', 
                            'Ranchi', 
                            'Bengaluru', 
                            'Thiruvananthapuram', 
                            'Kavaratti', 
                            'Bhopal', 
                            'Imphal', 
                            'Shillong', 
                            'Aizwal', 
                            'Kohima', 
                            'Bhubaneshwar', 
                            'Puducherry', 
                            'Chandigarh', 
                            'Jaipur', 
                            'Agartala', 
                            'Mumbai',
                            'Lucknow', 
                            'Kolkata', 
                            'Panaji', 
                            'Pune'] ;                          
$scope.selected_country="";
  $scope.return_states=function()
    {    
      if($scope.org.country==="India")
      {
          return $scope.states.india;
      }
      else
      {
          return "";
      }
    }; //This function is called whenever users enters data in state textbox
    //This is for fetching states within selected country
    //Currentyl only india is considered
    //If any other country is selected; the list will not show any states 

    $scope.return_cities=function()
    { 
      if($scope.org.country==="India")
      {
       return $scope.india.major_cities;
      }
      else
      {
          return "";
      }
    };//This function is actually to fetch cities in states
    //Currently due to unavailability of data
    //List of all cities from india will be displayed irrespective to state selected
    //This needs to be modified when data is available
    //This function is called when user enters data in cities text box

//End of code





// function to handle server side responses
    $scope.handleUpdateOrgAccountResponse = function(data){
     $scope.changedOrgDetails = true;
      if (data.success) {
        $scope.editorEnabled=false;
          $scope.ProdoAppMessage(data.success.message, 'success');     //Growl
      } else {
        if (data.error.code== 'AU004') {     // enter valid data
          $scope.ProdoAppMessage(data.error.message, 'error');    //Growl
        } else {
          $scope.ProdoAppMessage(data.error.message,'error');          //Growl
        }
      }
    };  
// Update org account details//
            $scope.updateOrgAccount = function() {
         
                      if ($scope.form.orggeneralsettingform.$valid) {
                        $scope.form.orggeneralsettingform.submitted= true;
                        OrgRegistrationService.saveOrgSettings($scope.jsonOrgAccountData());
                      } else {
                        $scope.form.orggeneralsettingform.submitted= true;
                      }  
                
            };
       //The following object is passed to    
            $scope.jsonOrgAccountData = function()
            {
              var orgData = 
                {
                  organization:
                  {
                  'name' : $scope.org.name,
                  'description' : $scope.org.description,
                  'password': $scope.user.password
                  }
                };
              return JSON.stringify(orgData); 
            };
//End of block


    var cleanupEventUpdateOrgDone = $scope.$on("updateOrgDone", function(event, message){
       if(message.error !== undefined && message.error.code === 'AL001' )
       {
           UserSessionService.resetSession();
           $state.go('prodo.landing.signin');
       }
       else
       {
          $scope.handleUpdateOrgAccountResponse(message);  
       }  
    });

    var cleanupEventUpdateOrgNotDone = $scope.$on("updateOrgNotDone", function(event, message){
      $scope.changedOrgDetails = true;
      $scope.ProdoAppMessage("It looks as though we have broken something on our server system. Our support team is notified and will take immediate action to fix it." + message,'error');   
    }); 


// The following block adds organisation address 

     $scope.jsonOrgAddressData = function()
      {
        var orgAddData = 
          {
            location:
            {
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
              'contacts': $scope.contacts,
              'locationtype': $scope.orgaddresstype
            }
          }  
        return JSON.stringify(orgAddData); 
      }


    $scope.handleAddOrgAddressResponse = function(data){
     $scope.addedOrgLocation = false;
      if (data.success) {        
        $scope.reset();
        $scope.ProdoAppMessage(data.success.message,'success');          //ShowAlert
      } else {
        if (data.error.code== 'AU004') {     // enter valid data
            $log.debug(data.error.code + " " + data.error.message);
            $scope.ProdoAppMessage(data.error.message,'error');          //ShowAlert
        } else {
            $log.debug(data.error.message);
            $scope.ProdoAppMessage(data.error.message,'error');          //ShowAlert
        }
      }
    };  

    $scope.addOrgAddress = function() { 
       $scope.orgaddresstype = document.getElementById('orgAddressType').value;
      if ($scope.form.orgaddlocationform.$valid) {
        $scope.form.orgaddlocationform.submitted= true;   
        OrgRegistrationService.saveOrgAddress($scope.jsonOrgAddressData());
      } else {
        $scope.form.orgaddlocationform.submitted= true;
      } 
    };

    $scope.jsonOrgAddressUpdate = function(addr)
    {
          $scope.contacts[0].customerhelpline=addr.contacts[0].customerhelpline;
          $scope.contacts[1].customerhelpline=addr.contacts[1].customerhelpline;
          $scope.contacts[2].customerhelpline=addr.contacts[2].customerhelpline;
          var orgAddData = 
          {
            location:
            {
             'address': 
                    {
                    'address1': addr.address.address1,
                    'address2': addr.address.address2,
                    'address3': addr.address.address3,
                    'country': addr.address.country,
                    'city': addr.address.city,
                    'state': addr.address.state,
                    'zipcode': addr.address.zipcode 
                    }, 
              'contacts': $scope.contacts
            }
          }
      return JSON.stringify(orgAddData); 
    };

    var cleanupEventAddOrgAddressDone = $scope.$on("addOrgAddressDone", function(event, message){
       if(message.error !== undefined && message.error.code === 'AL001' )
       {
           UserSessionService.resetSession();
           $state.go('prodo.landing.signin');
       }
       else
       {
          $scope.handleAddOrgAddressResponse(message);  
          $state.reload();
       }
    });
    var cleanupEventAddOrgAddressNotDone = $scope.$on("addOrgAddressNotDone", function(event, message){
         $scope.addedOrgLocation = false;
         $scope.ProdoAppMessage("It looks as though we have broken something on our server system. Our support team is notified and will take immediate action to fix it." + message,'error');    //ShowAlert
    });
//End of block


// function to handle server side responsesIt looks as though we have broken something on our server system. Our support team is notified and will take immediate action to fix it." + message
    $scope.handleUpdateOrgAddressResponse = function(data){
      $scope.changedOrgLocation = false;
      if (data.success) {
        $scope.ProdoAppMessage(data.success.message,'success');    //ShowAlert
      } else {
        if (data.error.code== 'AU004') {     // enter valid data
            $log.debug(data.error.code + " " + data.error.message);
            $scope.ProdoAppMessage(data.error.message,'error');    //ShowAlert
        } else {
            $log.debug(data.error.message);
            $scope.ProdoAppMessage(data.error.message,'error');  //ShowAlert
        }
      }
    };  

    $scope.updateAddress = function(addr) {
      addr.editing = false; 
      OrgRegistrationService.updateOrgAddress($scope.jsonOrgAddressUpdate(addr),addr.locid);
    }
    var cleanupEventUpdateOrgAddressDone = $scope.$on("updateOrgAddressDone", function(event, message){
       if(message.error !== undefined && message.error.code === 'AL001' )
       {
           UserSessionService.resetSession();
           $state.go('prodo.landing.signin');
       }
       else
       {
           $scope.handleUpdateOrgAddressResponse(message);
       } 
    });
    var cleanupEventUpdateOrgAddressNotDone = $scope.$on("updateOrgAddressNotDone", function(event, message){
      $scope.changedOrgLocation = true;
      $scope.ProdoAppMessage("It looks as though we have broken something on our server system. Our support team is notified and will take immediate action to fix it." + message,'error');    //ShowAlert
    });    

//End of block

// The following block deletes org 
    $scope.handleDeleteOrgResponse = function(data){
      $scope.deleteOrgResponse = true;
      if (data.success) {
        $scope.ProdoAppMessage(data.success.message,'success');  //ShowAlert
      } else {
          $log.debug(data.error.message);
          $scope.ProdoAppMessage(data.error.message,'error');  //ShowAlert
        }
    };

    $scope.deleteOrgAccount = function() {
      OrgRegistrationService.removeOrgSettings();
    };

    var cleanupEventDeleteOrgDone = $scope.$on("deleteOrgDone", function(event, message){
      //$scope.handleDeleteOrgResponse(message); 
       if(message.error !== undefined && message.error.code === 'AL001' )
       {
           UserSessionService.resetSession();
           $state.go('prodo.landing.signin');
       }
       else
       {
          $scope.handleDeleteOrgResponse(message); 
       }
    });

    var cleanupEventDeleteOrgNotDone = $scope.$on("deleteOrgNotDone", function(event, message){
        $scope.deleteOrgResponse = true;
      $scope.ProdoAppMessage("It looks as though we have broken something on our server system. Our support team is notified and will take immediate action to fix it." + message,'error');    //ShowAlert
    });  

//End of block


// The following block changes org address 

    $scope.handleDeleteOrgAddressResponse = function(data){
        $scope.changedOrgLocation = true;
      if (data.success) {         
        $state.$reload();
        $scope.ProdoAppMessage(data.success.message,'success');
        $scope.orgaddr.splice(indexOfOrgAddress, 1);
      } else {
          $log.debug(data.error.message);
          $scope.ProdoAppMessage(data.error.message,'error');  //ShowAlert
        }
    };

    $scope.deleteOrgAddress = function(addr,addressId) { 
      $scope.changedOrgLocation = true;
      NumberOfOrgAddresses--; 
      if(NumberOfOrgAddresses>0)
      {
                OrgRegistrationService.removeOrgAddress(addr.locid);              
                indexOfOrgAddress = $rootScope.usersession.productfollowlist.indexOf(addressId);
                alert(indexOfOrgAddress);
      }
      else
      {
        $scope.ProdoAppMessage("You cannot delete this address!",'error');
      }

    };

    var cleanupEventDeleteOrgAddressDone = $scope.$on("deleteOrgAddressDone", function(event, message){
       if(message.error !== undefined && message.error.code === 'AL001' )
       {
           UserSessionService.resetSession();
           $state.go('prodo.landing.signin');
       }  
       else
       {
           $scope.handleDeleteOrgResponse(message);   
       }
    });

    var cleanupEventDeleteOrgAddressNotDone = $scope.$on("deleteOrgAddressNotDone", function(event, message){
        $scope.changedOrgLocation = true;
      $scope.ProdoAppMessage("It looks as though we have broken something on our server system. Our support team is notified and will take immediate action to fix it." + 'message,error');    //ShowAlert
    });

//end of block

//  The following code removes org group member
    $scope.handleDeleteOrgGroupMemberResponse = function(data){
        $scope.manageOrgGroup = true;
      if (data.success) {
        $scope.ProdoAppMessage(data.success.message,'success');  //ShowAlert
      } else {
        if (data.error.code== 'AU004') {     // enter valid data
            $log.debug(data.error.code + " " + data.error.message);
            $scope.ProdoAppMessage(data.error.message,'error');    //ShowAlert
        } else {
            $log.debug(data.error.message);
            $scope.ProdoAppMessage(data.error.message,'error');    //ShowAlert
        }
      }
    };

    $scope.deleteGroupMember = function(grpid, userid) { console.log(grpid,userid);
      OrgRegistrationService.deleteMember(grpid, userid); 
    };

    var cleanupEventDeleteOrgGroupMemberDone = $scope.$on("deleteOrgGroupMemberDone", function(event, message){console.log("message-----"+message);
     // $scope.handleDeleteOrgGroupMemberResponse(message);  
    
       if(message.error !== undefined && message.error.code === 'AL001' )
       {
           UserSessionService.resetSession();
           $state.go('prodo.landing.signin');
       }
       else
       {
           $scope.handleDeleteOrgGroupMemberResponse(message);  
       }
    });

    var cleanupEventDeleteOrgGroupMemberNotDone = $scope.$on("deleteOrgGroupMemberNotDone", function(event, message){
        $scope.manageOrgGroup = true;
      $scope.ProdoAppMessage("It looks as though we have broken something on our server system. Our support team is notified and will take immediate action to fix it." + message,'error');    //ShowAlert
    });  
//End of block


// The following block manages org invites
   $scope.jsonOrgInvitesData = function(){
     var orgInvite = 
     {
        otherorginvites: $scope.orginvites
     }
     return JSON.stringify(orgInvite); 
   };

    $scope.handleOrgInviteResponse = function(data){
        $scope.addOrgInvites = true;
      if (data.success) {
        $scope.ProdoAppMessage(data.success.message,'success');    //ShowAlert
      } else {
        if (data.error.code== 'AU004') {     // enter valid data
            $log.debug(data.error.code + " " + data.error.message);
            $scope.ProdoAppMessage(data.error.message,'error');    //ShowAlert
        } else {
            $log.debug(data.error.message);
            $scope.ProdoAppMessage(data.error.message,'error');    //ShowAlert
        }
      }
    };  
    
    $scope.sendOrgInvites = function() { 
      OrgRegistrationService.sendInvites($scope.jsonOrgInvitesData());
    }

    var cleanupEventSendOrgInvitesDone = $scope.$on("sendOrgInvitesDone", function(event, data){
      if(data.error !== undefined && data.error.code === 'AL001' )
      {
         UserSessionService.resetSession();
         $state.go('prodo.landing.signin');
      }
      else
      {
         $scope.handleOrgInviteResponse(data);  
      }
    });

    var cleanupEventSendOrgInvitesNotDone = $scope.$on("sendOrgInvitesNotDone", function(event, data){
        $scope.addOrgInvites= true;
      $scope.ProdoAppMessage("It looks as though we have broken something on our server system. Our support team is notified and will take immediate action to fix it." + data,'error');    //ShowAlert
    });

//End of block

//Block managing org group invites
    $scope.handleOrgGroupInviteResponse = function(data){
        $scope.manageOrgGroup = true;
      if (data.success) {
        $scope.showExistingInvites = false;
        $scope.showNewInvites = false;
        $scope.group = {'newgroupname': '', 'grouppname': '', 'invites': '', 'newinvites': ''};
        $scope.ProdoAppMessage(data.success.message,'success'); 
      } else {
        if (data.error.code== 'AU004') {     // enter valid data
            $log.debug(data.error.code + " " + data.error.message);
            $scope.ProdoAppMessage(data.error.message,'error');    //Growl
        } else {
            $log.debug(data.error.message);
             $scope.ProdoAppMessage(data.error.message,'error');    //Growl
        }
      }
    };  

    $scope.jsonOrgNewGroupInvitesData = function() {
      var orgGroupInvite = 
        {
          usergrp:
          {
           'grpname': $scope.group.newgroupname,
           'invites': $scope.group.newinvites
          }
        }
         return JSON.stringify(orgGroupInvite); 
       };

    $scope.jsonOrgExistingGroupInvitesData = function() {
      var orgGroupInvite = 
        {
          usergrp:
          {
           'grpname': $scope.group.groupname,
           'invites': $scope.group.invites
          }
        }
      return JSON.stringify(orgGroupInvite); 
    };

    $scope.addGroupInvite = function() {
      // if ($scope.form.orggroupinvitesform) {
        // if ($scope.form.orggroupinvitesform.$valid) {
        //   $scope.form.orggroupinvitesform = true;
        if($scope.addInvitesList==='existing')
        {
          OrgRegistrationService.groupInvites($scope.jsonOrgExistingGroupInvitesData());
        }
        // } else{
        //   $scope.form.orggroupinvitesform.submitted = true;
        // }
      // } else if ($scope.form.orgnewgroupinvitesform) {
          // if ($scope.form.orgnewgroupinvitesform.$valid) {
            else if($scope.addInvitesList==='new'){
            OrgRegistrationService.groupInvites($scope.jsonOrgNewGroupInvitesData());}
          //   $scope.form.orgnewgroupinvitesform = true;
          // } else {
          //   $scope.form.orgnewgroupinvitesform = true;
          // }
      
    };

    var cleanupEventSendOrgGroupInvitesDone = $scope.$on("sendOrgGroupInvitesDone", function(event, data){
       if(data.error !== undefined && data.error.code === 'AL001' )
       {
           UserSessionService.resetSession();
           $state.go('prodo.landing.signin');
       }
       else
       {
         $scope.handleOrgGroupInviteResponse(data); 
       }
    });
    var cleanupEventSendOrgGroupInvitesNotDone = $scope.$on("sendOrgGroupInvitesNotDone", function(event, data){
        $scope.manageOrgGroup = true;
      $scope.ProdoAppMessage("It looks as though we have broken something on our server system. Our support team is notified and will take immediate action to fix it." + message,'error');    //growl
    });
 
//End of block


//  The following block is used to send invites to org customer

   $scope.handleOrgCustomerInviteResponse = function(data){
    $scope.addCustomerInvites = true;
      if (data.success) {
        $scope.ProdoAppMessage(data.success.message,'success');    //ShowAlert
      } else {
        if (data.error.code== 'AU004') {     // enter valid data
            $log.debug(data.error.code + " " + data.error.message);
            $scope.ProdoAppMessage(data.error.message,'error');    //ShowAlert
        } else {
            $log.debug(data.error.message);
            $scope.ProdoAppMessage(data.error.message,'error');    //ShowError
        }
      }
    };  
   
   $scope.jsonOrgCustomerInvitesData = function()
      {
        var orgCustomerInvite = 
          {
            orgcustomerinvites: $scope.customerinvites
          }
        return JSON.stringify(orgCustomerInvite); 
      };

    $scope.orgCustomerInvites = function() {
      OrgRegistrationService.sendCustomerInvites($scope.jsonOrgCustomerInvitesData());
    }

    var cleanupEventSendOrgCustomerInvitesDone = $scope.$on("sendOrgCustomerInvitesDone", function(event, data){
      if(data.error !== undefined && data.error.code === 'AL001' )
      {
        UserSessionService.resetSession();
        $state.go('prodo.landing.signin');
      }
      else
      {
      $scope.handleOrgCustomerInviteResponse(data); 
      }  
    });

    var cleanupEventSendOrgCustomerInvitesNotDone = $scope.$on("sendOrgCustomerInvitesNotDone", function(event, data){
         $scope.addCustomerInvites = true;
      $scope.ProdoAppMessage("It looks as though we have broken something on our server system. Our support team is notified and will take immediate action to fix it." ,'error');    //ShowAlert
    }); 

//  End of block

    $scope.$watch('$state.$current.locals.globals.currentorgdata', function (currentorgdata) {
      $scope.org = currentorgdata.success.organization;
    });

    if (currentorgproduct.error) {
      //No products available
    } else {
      $scope.productlist = currentorgproduct.success.product;
    }

     var cleanupEventOrgUploadLogoResponseSuccess = $scope.$on("orgUploadLogoResponseSuccess",function(event,message){
      $state.reload();
     })


//Other functions for editing; needs to be variefied
    $scope.enableEditing = function(addr) {
      addr.editing=true;
    };

    $scope.disableEditing= function(addrs) {
      addrs.editing = !addrs.editing;
    };


    $scope.addLocation = function() {
      $scope.islocation = true;      
    };
    
    $scope.reset = function() {
      $scope.islocation = false;
      $scope.org.orgaddresstype = '';
      $scope.org.address1= '';
      $scope.org.address2= '';
      $scope.org.address3= '';
      $scope.org.country= '';    
      $scope.org.city= '';
      $scope.org.state= '';
      $scope.zipcode = '';
      $scope.contacts= [{'customerhelpline': ''},{'customerhelpline': ''},{'customerhelpline': ''}];
      $state.transitionTo($state.current, $stateParams, { reload: true, inherit: false, notify: true });
    };
    $scope.addInvitesList='';

    $scope.addMoreInvites = function() { 
      var noOfInvites=$scope.orginvites.length;
      if($scope.orginvites[noOfInvites-1].name!=='')
      {
          $scope.orginvites.push({'name': '', 'orgname': '', 'email': ''});    
      }  
    };

    $scope.addCustomerInvites = function() { 
      var noOfInvites=$scope.customerinvites.length;  
      if($scope.customerinvites[noOfInvites-1].name!=='')
      {
          $scope.customerinvites.push({'name': '', 'email': ''});
      }
    };

    $scope.addExistingInvites = function() {
      $scope.addInvitesList = 'existing';
      $scope.showExistingInvites = true;
    };
    
    $scope.addNewInvites = function() {
      $scope.addInvitesList='new';
      $scope.showNewInvites = true;
    };

    $scope.disableEditor = function() {
      $scope.editorEnabled = false;
      $scope.user = { password: ''};
    };

    $scope.enableEditor = function(addr) {
      $scope.editorEnabled = true;
    };

    $scope.ProdoAppMessage = function(message,flag)
    {
          if(flag==='success')
          {
            growl.addSuccessMessage(message);
          }
          else
          {
            growl.addErrorMessage(message);
          }
         // $scope.resetGrowlMessages();
    };
//   Org images display Bhagyashry 
  $scope.chckedIndexs = [];
  $scope.checkAdminProductImagesDelete = function () {

    if ($rootScope.isAdminCheck == true) {
      return {
        display: "inline"
      }
    } else {
      return {
        display: "none"
      }
    }
  };

    $scope.selectAllImages = function (imgs) {
    if ($('.imgToggles').is(':checked')) {
      $('.imgToggles').prop('checked', false);
      // $scope.chckedIndexs=[];
      $scope.chckedIndexs.length=0;
      // $scope.checked=0;
      $log.debug("1"+$scope.chckedIndexs);
    } else {
      $('.imgToggles').prop('checked', true);
       for (i = 0; i < imgs.length; i++) {
      $scope.chckedIndexs.push(imgs[i]);
    }
      $log.debug("2"+$scope.chckedIndexs);
       // $scope.checked=1;
    }
  };

    $scope.checkImageSelectedToDelete = function () {
    $log.debug("Delete images.......");
     $log.debug("5"+$scope.chckedIndexs);
    if ($scope.chckedIndexs.length > 0) { //if image selected to delete,show modal
      $('#imgDelModal').modal('toggle');
      $('#imgDelModal').modal('show');
    } else { //if no image selected to delete
       $scope.enableIMGErrorMsg();
       ProdIMGERRMsg.innerHTML = "Select atlest 1 image to delete ";
      // growl.addErrorMessage("Select atlest 1 image to delete");
    }
  };

  $scope.checkedIndex = function (img) {
    if ($scope.chckedIndexs.indexOf(img) === -1) {
      $scope.chckedIndexs.push(img);
      $log.debug("3"+$scope.chckedIndexs);
    } else {
      $scope.chckedIndexs.splice($scope.chckedIndexs.indexOf(img), 1);
      }
    $log.debug("4"+$scope.chckedIndexs);
  };

   $scope.deleteProductImages = function (index) {
    if ($rootScope.isAdminCheck == true) {
      //get selected ids to delete images
      // growl.addInfoMessage("Deleting product images ...");
      $scope.imgIds = [{}];
      $scope.ids;
      $(':checkbox:checked').each(function (i) {
        $scope.imgIds[i] = $(this).val();
        $scope.ids = $(this).val();
      });
      angular.forEach($scope.chckedIndexs, function (value, index) {
        // $log.debug("value= "+value);
        var index = $scope.pImages_l.indexOf(value);
        $scope.pImages_l.splice($scope.pImages_l.indexOf(value), 1);
      });
      $scope.chckedIndexs = [];
      $scope.temp = {
        prodleimageids: $scope.imgIds
      }
      $http({
        method: 'DELETE',
        url: ENV.apiEndpoint_notSocket + '/api/image/org/' + $scope.orgidFromSession + '/' + $scope.currentProdle + '?prodleimageids=' + $scope.imgIds,
      }).success(function (data, status, headers, cfg) {
        // $log.debug(data);
      //$scope.enableIMGSuccessMsg(); 
      alert('hello');
     // ProdIMGSuccessMsg.innerHTML = "Images deleted successfully...";
       
        // growl.addSuccessMessage("Images deleted successfully...");

      }).error(function (data, status, headers, cfg) {
        // $log.debug(status);
        //$scope.enableIMGErrorMsg();
      // ProdIMGERRMsg.innerHTML = status;
        // growl.addErrorMessage(status);
      });
    } else {
      //$scope.enableIMGErrorMsg();
      // ProdIMGERRMsg.innerHTML = "You dont have rights to delete images";
    }
    
    // growl.addErrorMessage("You dont have rights to delete images");
  };
//

//
    $scope.$on('$destroy', function(event, message) {
      cleanupEventUpdateOrgDone();      
      cleanupEventUpdateOrgNotDone();       
      cleanupEventAddOrgAddressDone();  
      cleanupEventAddOrgAddressNotDone();       
      cleanupEventUpdateOrgAddressDone();        
      cleanupEventUpdateOrgAddressNotDone();      
      cleanupEventDeleteOrgDone();        
      cleanupEventDeleteOrgNotDone();        
      cleanupEventDeleteOrgAddressDone();      
      cleanupEventDeleteOrgAddressNotDone();      
      cleanupEventDeleteOrgGroupMemberDone();       
      cleanupEventDeleteOrgGroupMemberNotDone();      
      cleanupEventSendOrgInvitesDone();       
      cleanupEventSendOrgInvitesNotDone();        
      cleanupEventSendOrgCustomerInvitesDone();
      cleanupEventSendOrgCustomerInvitesNotDone();       
      cleanupEventSendOrgGroupInvitesDone();        
      cleanupEventSendOrgGroupInvitesNotDone();
      cleanupEventOrgUploadLogoResponseSuccess();
    });



}]);