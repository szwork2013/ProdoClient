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

$scope.orgaddr = currentorgaddr.success.orgaddress;

$scope.orgImages = currentorgdata.success.organization.org_images;

$scope.orgKeyClients = currentorgdata.success.organization.keyclients;

var indexOfOrgAddress = 0 ; 

$scope.validateError=false;

$scope.regexForText = /^[a-zA-Z\s]*$/;

$scope.regexForNumbers = /[0-9]/;

$scope.regexForEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

$scope.regexForPhno = /^\(?[+]([0-9]{2,5})\)?[-]?([0-9]{10,15})$/;

$scope.regexForMultipleEmail = /(([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)(\s*,\s*|\s*$)+)/;

$scope.regularExpressionForManufactuter = /^manufacturer/i;

$scope.regularExpressionForCompany = /^company/i;
// The following function is written to calculate total number of addresses  for an organization.
// The purpose behing writing this function is to restrict user from deleting all addresses from the list
//
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
//OrgRegistrationService.updateOrgData(currentorgdata.success.organization);
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
$scope.states.india=  [
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
}; 
//This function is called whenever users enters data in state textbox
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
};
//This function is actually to fetch cities in states
//Currently due to unavailability of data
//List of all cities from india will be displayed irrespective to state selected
//This needs to be modified when data is available
//This function is called when user enters data in cities text box

//End of code
$scope.deleteOrgArtworImages = function()
{ 
    $scope.imageids=[];   
    for(var i=0;i<$scope.orgImages.length;i++)  
    { 
        if(document.getElementById(i).checked === true)
        {    
                  $scope.imageids.push($scope.orgImages[i].imageid); 
        }      
    }
    if($scope.imageids.length !==0 )
    {
              OrgRegistrationService.singleOrgImageDelete($scope.imageids);
     }
};
// Changed organisation delete functionality [Needs to be removed]
$scope.handleDeleteOrgRequestResponse = function(data){
    $scope.deleteOrgRequestResponse = true;
      if (data.success) 
      {
        $rootScope.ProdoAppMessage(data.success.message,'success');  //ShowAlert
      } 
      else 
      {
        $log.debug(data.error.message);
        $rootScope.ProdoAppMessage(data.error.message,'error');  //ShowAlert
      }
};

$scope.deleteOrgAccountRequest = function() {
      OrgRegistrationService.removeOrgSettings();
};

var cleanupEventDeleteOrgDone = $scope.$on("deleteOrgRequestSent", function(event, message){

   if(message.error !== undefined && message.error.code === 'AL001' )
       {
           $rootScope.showModal();
       }
       else
       {
          $scope.handleDeleteOrgRequestResponse(message); 
       }
});

var cleanupEventDeleteOrgNotDone = $scope.$on("deleteOrgRequestNotSent", function(event, message){
      $scope.deleteOrgRequestResponse = true;
      $rootScope.ProdoAppMessage("It looks as though we have broken something on our server system. Our support team is notified and will take immediate action to fix it." + message,'error');    //ShowAlert
});  

// function to handle server side responses
$scope.handleUpdateOrgAccountResponse = function(data){
    $scope.changedOrgDetails = true;
    if (data.success) {
        $scope.editorEnabled=false;
        $state.reload();
        $rootScope.ProdoAppMessage(data.success.message, 'success');     //Growl
    } else {
        if (data.error.code== 'AU004') {     // enter valid data
          $rootScope.ProdoAppMessage(data.error.message, 'error');    //Growl
        } else {
          $rootScope.ProdoAppMessage(data.error.message,'error');          //Growl
        }
    }
};  
// Update org account details//
$scope.invalidOrgName='';

$scope.invalidDesc='';

$scope.invalidPassword='';

$scope.updateOrgAccount = function() {

      $scope.invalidOrgName='';

      $scope.invalidDesc='';

      $scope.invalidPassword='';

      if ($scope.form.orggeneralsettingform.$valid) {
        $scope.form.orggeneralsettingform.submitted= true;
        OrgRegistrationService.saveOrgSettings($scope.jsonOrgAccountData());
      } else {
        if($scope.form.orggeneralsettingform.orgname.$valid===false)
        {
            $scope.invalidOrgName = "Please enter valid Org name";
        }
        if($scope.form.orggeneralsettingform.description.$valid===false)
        {
            $scope.invalidDesc = "Please enter valid description";
        }
        if($scope.form.orggeneralsettingform.password.$valid===false)
        {
            $scope.invalidPassword = "Please enter valid password";
        }
        //$scope.form.orggeneralsettingform.submitted= true;
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
           $rootScope.showModal();
       }
       else
       {
          $scope.handleUpdateOrgAccountResponse(message);  
       }  
});

var cleanupEventUpdateOrgNotDone = $scope.$on("updateOrgNotDone", function(event, message){
      $scope.changedOrgDetails = true;
      $rootScope.ProdoAppMessage("It looks as though we have broken something on our server system. Our support team is notified and will take immediate action to fix it." + message,'error');   
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
};

$scope.addressErrorMessage = '';

$scope.invalidCountryError = '';

$scope.invalidStateError = '';

$scope.invalidCityError = '';

$scope.invalidZipcodeError = '';

$scope.invalidContact1 = '';

$scope.invalidContact2 = '';

$scope.invalidContact3 = '';

$scope.handleAddOrgAddressResponse = function(data){
     $scope.addedOrgLocation = false;
      if (data.success) {        
        $scope.reset();
        $rootScope.ProdoAppMessage(data.success.message,'success');          //ShowAlert
      } else {
        if (data.error.code== 'AU004') {     // enter valid data
            $log.debug(data.error.code + " " + data.error.message);
            $rootScope.ProdoAppMessage(data.error.message,'error');          //ShowAlert
        } else {
            $log.debug(data.error.message);
            $rootScope.ProdoAppMessage(data.error.message,'error');          //ShowAlert
        }
         
      }
};  

$scope.addOrgAddress = function() { 
    $scope.addressErrorMessage = '';
    $scope.invalidCountryError = '';
    $scope.invalidStateError = '';
    $scope.invalidCityError = '';
    $scope.invalidZipcodeError = '';$scope.emptyOrgtypeSelection = '';
    $scope.invalidContact1 = '';
    $scope.invalidContact2 = '';
    $scope.invalidContact3 = '';
    $scope.orgaddresstype = document.getElementById('orgAddressType').value;

    if ($scope.form.orgaddlocationform.$valid && ($scope.orgaddresstype==="Company Address" || $scope.orgaddresstype === "Service Centers")) {
    $scope.form.orgaddlocationform.submitted= true;   
    OrgRegistrationService.saveOrgAddress($scope.jsonOrgAddressData());
    } else {
        if($scope.org.address1 === '' || $scope.form.orgaddlocationform.address1.$valid === false)
        {
              $scope.addressErrorMessage = "Please enter valid address "; 
        }
        if($scope.form.orgaddlocationform.country.$valid===false || $scope.org.country === '')
        {
               $scope.invalidCountryError = 'Please enter correct country';
        }
        if($scope.form.orgaddlocationform.state.$valid === false || $scope.org.country === '' )
        {        
               $scope.invalidStateError = 'Please enter valid state';
        }
        if($scope.form.orgaddlocationform.city.$valid === false || $scope.org.city === '' )
        {        
               $scope.invalidCityError = 'Please enter valid city';
        }
        if($scope.form.orgaddlocationform.zipcode.$valid === false || $scope.org.zipcode === '' )
        {         
               $scope.invalidZipcodeError = 'Please enter valid Zipcode';
        }
        if($scope.form.orgaddlocationform.contact1.$valid === false || $scope.form.orgaddlocationform.contact1.$dirty===false)
        {
               $scope.invalidContact1 = 'Please enter valid phone number';
        }
        if($scope.form.orgaddlocationform.contact2.$valid === false  )
        {
               $scope.invalidContact2 = 'Please enter valid phone number';
        }
        if($scope.form.orgaddlocationform.contact3.$valid === false  )
        {
               $scope.invalidContact3 = 'Please enter valid phone number';
        }
        if($scope.form.orgaddlocationform.loctype.$valid === false || $scope.form.orgaddlocationform.loctype.$dirty === false )
        {
            $scope.emptyOrgtypeSelection = "Please select option from above field";
        }
    
    $scope.form.orgaddlocationform.submitted= true;
   } 
};

$scope.jsonOrgAddressUpdate = function(addr, loctype)
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
          'contacts': $scope.contacts,
          'locationtype' : loctype
        }
      }
  return JSON.stringify(orgAddData); 
};

var cleanupEventAddOrgAddressDone = $scope.$on("addOrgAddressDone", function(event, message){
    if(message.error !== undefined && message.error.code === 'AL001' )
    {
           // UserSessionService.resetSession();
           // $state.go('prodo.landing.signin');
           $rootScope.showModal();
    }
    else
    {
          $scope.handleAddOrgAddressResponse(message);  
          $state.reload();
    }
});

var cleanupEventAddOrgAddressNotDone = $scope.$on("addOrgAddressNotDone", function(event, message){
         $scope.addedOrgLocation = false;
         $rootScope.ProdoAppMessage("It looks as though we have broken something on our server system. Our support team is notified and will take immediate action to fix it." + message,'error');    //ShowAlert
});
//End of block
// function to handle server side responsesIt looks as though we have broken something on our server system. Our support team is notified and will take immediate action to fix it." + message
$scope.handleUpdateOrgAddressResponse = function(data){
   $scope.changedOrgLocation = false;
   if (data.success) {
        $rootScope.ProdoAppMessage(data.success.message,'success');    //ShowAlert
        $scope.reset();
        $state.reload();
   } else {
        if (data.error.code== 'AU004') {     // enter valid data
            $log.debug(data.error.code + " " + data.error.message);
            $rootScope.ProdoAppMessage(data.error.message,'error');    //ShowAlert
        } else {
            $log.debug(data.error.message);
            $rootScope.ProdoAppMessage(data.error.message,'error');  //ShowAlert
        }
  }
};  

$scope.regexForZipcode = /^[0-9]{5,7}$/;

$scope.updateAddress = function(addr,loctype) { 
      $scope.errorOfValidation = 'Please enter valid ';
      $scope.errorsForEdit  = '';
      if(addr.address.address1 === undefined || addr.address.address1 ==='')
      {
        $scope.errorsForEdit = $scope.errorsForEdit+"'address1' ";
      }
      if(addr.address.city === undefined || $scope.regexForText.test(addr.address.city) !== true )
      {
        $scope.errorsForEdit = $scope.errorsForEdit+"'city' ";
      }
      if(addr.address.state === undefined || $scope.regexForText.test(addr.address.state) !== true)
      {
        $scope.errorsForEdit = $scope.errorsForEdit + "'state' ";
      }
      if(addr.address.country === undefined || $scope.regexForText.test(addr.address.country) !== true)
      {
        $scope.errorsForEdit = $scope.errorsForEdit + "'country' ";
      }
      if(addr.address.zipcode === undefined || $scope.regexForZipcode.test(addr.address.zipcode) !== true)
      {
        $scope.errorsForEdit = $scope.errorsForEdit + "'zipcode' ";
      }
      if(addr.contacts[0].customerhelpline === undefined || addr.contacts[0].customerhelpline === '' || $scope.regexForPhno.test(addr.contacts[0].customerhelpline) !== true)
      {
          $scope.errorsForEdit = $scope.errorsForEdit + "'contact 1' ";
      }
      if(addr.contacts[1].customerhelpline !== undefined && addr.contacts[1].customerhelpline !=='' && $scope.regexForPhno.test(addr.contacts[1].customerhelpline) !== true)
      {
          $scope.errorsForEdit = $scope.errorsForEdit + "'contact 2' ";
      }
      if(addr.contacts[2].customerhelpline !== undefined && addr.contacts[2].customerhelpline!=='' && $scope.regexForPhno.test(addr.contacts[2].customerhelpline) !== true)
      {
          $scope.errorsForEdit = $scope.errorsForEdit + "'contact 3' ";
      } 
      if($scope.errorsForEdit!=='')
      {
          $scope.errorOfValidation = $scope.errorOfValidation+$scope.errorsForEdit;
      }
      else
      {
          addr.editing = false;  
          OrgRegistrationService.updateOrgAddress($scope.jsonOrgAddressUpdate(addr,loctype),addr.locid);
      }

};

var cleanupEventUpdateOrgAddressDone = $scope.$on("updateOrgAddressDone", function(event, message){
   if(message.error !== undefined && message.error.code === 'AL001' )
   {
       // UserSessionService.resetSession();
       // $state.go('prodo.landing.signin');
       $rootScope.showModal();
   }
   else
   {
       $scope.handleUpdateOrgAddressResponse(message);
   } 
});

var cleanupEventUpdateOrgAddressNotDone = $scope.$on("updateOrgAddressNotDone", function(event, message){
      $scope.changedOrgLocation = true;
      $rootScope.ProdoAppMessage("It looks as though we have broken something on our server system. Our support team is notified and will take immediate action to fix it." + message,'error');    //ShowAlert
});    

//End of block

// The following block changes org address 

$scope.handleDeleteOrgAddressResponse = function(data){
     $scope.changedOrgLocation = true;
     if (data.success) {    
        $state.reload();     
        $rootScope.ProdoAppMessage(data.success.message,'success');
     } else {
          $log.debug(data.error.message);
          $rootScope.ProdoAppMessage(data.error.message,'error');  //ShowAlert
     }
};

$scope.deleteOrgAddress = function(addr,addressId) { 
      $scope.changedOrgLocation = true; 
      NumberOfOrgAddresses = $scope.calcNumberOfOrgAddresses(); 
      NumberOfOrgAddresses--; 
      if(NumberOfOrgAddresses>0)
      {
                OrgRegistrationService.removeOrgAddress(addr.locid);              
      }
      else
      {
        //$rootScope.ProdoAppMessage("You cannot delete this address!",'error');


        $rootScope.ProdoAppMessage("You cannot delete all company addresses!",'error');
      }

};

var cleanupEventDeleteOrgAddressDone = $scope.$on("deleteOrgAddressDone", function(event, message){
       if(message.error !== undefined && message.error.code === 'AL001' )
       {
           $rootScope.showModal();
       }  
       else
       {
           $scope.handleDeleteOrgAddressResponse(message);   
       }
});

var cleanupEventDeleteOrgAddressNotDone = $scope.$on("deleteOrgAddressNotDone", function(event, message){
     $scope.changedOrgLocation = true;
     $rootScope.ProdoAppMessage("It looks as though we have broken something on our server system. Our support team is notified and will take immediate action to fix it." + 'message,error');    //ShowAlert
});

//end of block
//  The following code removes org group member
$scope.handleDeleteOrgGroupMemberResponse = function(data){
      $scope.manageOrgGroup = true;
      if (data.success) {
         $state.reload();
        $rootScope.ProdoAppMessage(data.success.message,'success');  //ShowAlert
      } else {
        if (data.error.code== 'AU004') {     // enter valid data
            $log.debug(data.error.code + " " + data.error.message);
            $rootScope.ProdoAppMessage(data.error.message,'error');    //ShowAlert
        } else {
            $log.debug(data.error.message);
            $rootScope.ProdoAppMessage(data.error.message,'error');    //ShowAlert
        }
      }
};

$scope.deleteGroupMember = function(member, userid, index , mail) { 
            if(member.grpname === 'admin')
            {
                var lengthOfAdminMembers = $scope.groups[index].grpmembers.length;
                if(lengthOfAdminMembers===1)
                {
                    $rootScope.ProdoAppMessage("You cannot delete all members of admin group",'error');
                }
                else if($rootScope.usersession.currentUser.email === mail)
                {
                    $rootScope.ProdoAppMessage("You cannot delete your own account",'error');
                }
                else 
                {
                    OrgRegistrationService.deleteMember(member.grpid, userid);
                } 
            }
            // else if( $rootScope.UserSessionService.)
            else 
            {
              OrgRegistrationService.deleteMember(member.grpid, userid); 
            }
};

var cleanupEventDeleteOrgGroupMemberDone = $scope.$on("deleteOrgGroupMemberDone", function(event, message){
     // $scope.handleDeleteOrgGroupMemberResponse(message);  
    
       if(message.error !== undefined && message.error.code === 'AL001' )
       {
           $rootScope.showModal();
       }
       else
       {
           $scope.handleDeleteOrgGroupMemberResponse(message);  
       }
});

var cleanupEventDeleteOrgGroupMemberNotDone = $scope.$on("deleteOrgGroupMemberNotDone", function(event, message){
        $scope.manageOrgGroup = true;
      $rootScope.ProdoAppMessage("It looks as though we have broken something on our server system. Our support team is notified and will take immediate action to fix it." + message,'error');    //ShowAlert
});  
//End of block
$scope.resetInvites = function()
{
    $scope.orginvites=[{'name': '','orgname': '','email': ''}];
    $scope.customerinvites=[{'name': '','email': ''}];
}

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
  if (data.success) { $scope.orginvites=[{'name': '','orgname': '','email': ''}];
    $rootScope.ProdoAppMessage(data.success.message,'success');    //ShowAlert
  } else {
    if (data.error.code== 'AU004') {     // enter valid data
        $log.debug(data.error.code + " " + data.error.message);
        $rootScope.ProdoAppMessage(data.error.message,'error');    //ShowAlert
    } else {
        $log.debug(data.error.message);
        $rootScope.ProdoAppMessage(data.error.message,'error');    //ShowAlert
    }
  }
}; 
// $scope.resetOrgInvites = function()
// {    
//      $scope.orginvites.length = 1;
//      $scope.orginvites[0].name = '';
//      $scope.orginvites[0].orgname = '';
//      $scope.orginvites[0].email = '';
// };

// $scope.resetCustomerInvites = function()
// {
//     $scope.customerinvites.length = 1;
//     $scope.customerinvites[0].name = '';
//     $scope.customerinvites[0].email = '';
// }; 
 $scope.orgInvitesNameError='';

 $scope.orgInvitesOrgnameError=''; 

 $scope.orgInvitesEmailError=''; 

 var allInviteDataValid = 0;

$scope.sendOrgInvites = function() { 
  $scope.orgInvitesNameError='';
  $scope.orgInvitesOrgnameError=''; 
  $scope.orgInvitesEmailError='';   

  for(var i=0;i<$scope.orginvites.length;i++)
  {
    if($scope.regexForText.test($scope.orginvites[i].name) === false )
    {
        if($scope.orginvites.length===1)
        {
          $scope.orgInvitesNameError='Names can have only characters! Please verify from above field';

          allInviteDataValid = 0;
        }
        else
        {
          $scope.orgInvitesNameError='Names can have only characters! Please verify from the list';
          allInviteDataValid = 0;
        }
        
    }
    if($scope.regexForText.test($scope.orginvites[i].orgname) === false )
    {
        if($scope.orginvites.length===1)
        {
            $scope.orgInvitesOrgnameError='Organization Name can have only characters! Please verify from above field';
            allInviteDataValid = 0;
        }
        else
        {
          $scope.orgInvitesOrgnameError='Organization Name can have only characters! Please verify from the list';
          allInviteDataValid = 0;
        }
        
    }
    if($scope.regexForEmail.test($scope.orginvites[i].email) === false )
    {  
        if($scope.orginvites.length===1)
        {
             $scope.orgInvitesEmailError='Please verify your email id from above field';
             allInviteDataValid = 0;
        }
        else
        {
             $scope.orgInvitesEmailError='Please verify your email id from above list';
             allInviteDataValid = 0;
        }  
    }
    if($scope.orginvites[i].name=== '' )
    {
        if($scope.orginvites.length===1)
        {
          $scope.orgInvitesNameError='Name cant be empty! Please verify from above field';
          allInviteDataValid = 0;
        }
        else
        {
          $scope.orgInvitesNameError='Names cant be empty! Please verify from the list';
          allInviteDataValid = 0;
        }
        
    }
    if($scope.orginvites[i].orgname=== '' )
    {
        if($scope.orginvites.length===1)
        {
           $scope.orgInvitesOrgnameError='Organization names cant be empty! Please verify from above field';
           allInviteDataValid = 0;
        }
        else
        {
           $scope.orgInvitesOrgnameError='Organization name cant be empty! Please verify from the list';
           allInviteDataValid = 0;
        }
        
    }
    if($scope.orgInvitesEmailError==='' && $scope.orgInvitesOrgnameError==='' && $scope.orgInvitesNameError ==='')
    {
           allInviteDataValid=1;
    }
   }
   if(allInviteDataValid===1)
   {
     OrgRegistrationService.sendInvites($scope.jsonOrgInvitesData());
   }
  };
     

var cleanupEventSendOrgInvitesDone = $scope.$on("sendOrgInvitesDone", function(event, data){
  if(data.error !== undefined && data.error.code === 'AL001' )
  {
     // UserSessionService.resetSession();
     // $state.go('prodo.landing.signin');
     $rootScope.showModal();
  }
  else
  {
     $scope.handleOrgInviteResponse(data);  
  }
});

var cleanupEventSendOrgInvitesNotDone = $scope.$on("sendOrgInvitesNotDone", function(event, data){
    $scope.addOrgInvites= true;
  $rootScope.ProdoAppMessage("It looks as though we have broken something on our server system. Our support team is notified and will take immediate action to fix it." + data,'error');    //ShowAlert
});

//End of block
//Block managing org group invites
$scope.handleOrgGroupInviteResponse = function(data){
    $scope.manageOrgGroup = true;
  if (data.success) {
    $state.reload();
    $scope.showExistingInvites = false;
    $scope.showNewInvites = false;
    $scope.group = {'newgroupname': '', 'grouppname': '', 'invites': '', 'newinvites': ''};
    $rootScope.ProdoAppMessage(data.success.message,'success'); 
  } else {
    if (data.error.code== 'AU004') {     // enter valid data
        $log.debug(data.error.code + " " + data.error.message);
        $rootScope.ProdoAppMessage(data.error.message,'error');    //Growl
    } else {
        $log.debug(data.error.message);
         $rootScope.ProdoAppMessage(data.error.message,'error');    //Growl
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


$scope.addExistingInvites = function() {
  $scope.addInvitesList = 'existing';
  $scope.showExistingInvites = true;
};

$scope.errorForInvites = 'Please check emails ';

$scope.newInvitesValidate = '';

$scope.errorForExistinginvites = 'Please check emails ';

$scope.prevInvitesValidate = '';

$scope.errorForEmptyGroupName = '';

$scope.errorForEmptyExistingGroupname = '';

$scope.clearErrorMessages = function()
{ 
      $scope.errorForInvites='';
      $scope.errorForEmptyGroupName = '';
      $scope.errorForExistinginvites = '';
      $scope.errorForEmptyExistingGroupname = '';
}; 

$scope.addGroupInvite = function() {
    $scope.errorForEmptyGroupName = '';
    $scope.errorForInvites = 'Please check emails ';
    $scope.newInvitesValidate = '';
    var invalid = 0;
        var multipleEmails = $scope.group.newinvites;
        if(multipleEmails!==undefined && multipleEmails !== '' )
        {
            var array = multipleEmails.split(',');
            for(var k = 0 ;k<array.length ; k++)
            {
                if(array[k]!=='')
                {
                    if($scope.regexForEmail.test(array[k]) === false)
                    {
                        $scope.newInvitesValidate = $scope.newInvitesValidate + "'" +array[k]+"'"+ " ";

                    }
                }
            }
        }
        if($scope.newInvitesValidate !=='')
        {
            $scope.errorForInvites = $scope.errorForInvites + $scope.newInvitesValidate;
            invalid = 1;
        }
        if($scope.group.newgroupname === undefined || $scope.group.newgroupname === '')
        {
            $scope.errorForEmptyGroupName = 'Please enter valid group name';
            invalid = 1;
        }
        if($scope.group.newgroupname !== '')
        {
            for(var i=0;i<$scope.groups.length;i++)
            {
                if($scope.group.newgroupname === $scope.groups[i].grpname)
                {
                    $scope.errorForEmptyGroupName = 'Group name already exist! Please use "Existing groups" feature';
                      invalid = 1;// invalid=1; 


                }
            }
        }
        if($scope.group.newinvites==='' || $scope.group.newinvites === undefined)
        {
            $scope.errorForInvites = "Email List cant be empty";
            invalid=1;
        }

        if(invalid===0)
        {
                OrgRegistrationService.groupInvites($scope.jsonOrgNewGroupInvitesData());
                $scope.clearErrorMessages();
        }   

};

$scope.addExistingGroupInvite=function()
{
        $scope.prevInvitesValidate = '';
        $scope.errorForExistinginvites="Please check emails ";
        $scope.errorForEmptyExistingGroupname = '';
        var invalidCheck = 0;
            var multipleEmails = $scope.group.invites;
            if(multipleEmails!==undefined && multipleEmails !== '')
            {
                var array = multipleEmails.split(',');
                for(var k = 0 ;k<array.length ; k++)
                {
                    if(array[k]!=='')
                    {
                        if($scope.regexForEmail.test(array[k]) === false)
                        {
                            $scope.prevInvitesValidate = $scope.prevInvitesValidate + "'"+array[k]+"'" + " ";
                        }
                    }
                }
            }
            if($scope.prevInvitesValidate !=='')
            {
                $scope.errorForExistinginvites = $scope.errorForExistinginvites + $scope.prevInvitesValidate;
                invalidCheck = 1;
            }
            if($scope.group.groupname === undefined)
            {
                 $scope.errorForEmptyExistingGroupname = 'Please select valid groupname from the list';invalidCheck = 1; }
             if($scope.group.invites === '' || $scope.group.invites === undefined)
            {
                $scope.errorForExistinginvites = "Email list cant be empty";
                invalidCheck = 1;
            }
            
            if(invalidCheck === 0 ){
               OrgRegistrationService.groupInvites($scope.jsonOrgExistingGroupInvitesData());
               $scope.clearErrorMessages();
            }
             //End of validation  
};

var cleanupEventSendOrgGroupInvitesDone = $scope.$on("sendOrgGroupInvitesDone", function(event, data){
   if(data.error !== undefined && data.error.code === 'AL001' )
   {
     
     $rootScope.showModal();
   }
   else
   {
     $scope.handleOrgGroupInviteResponse(data); 
   }
});

var cleanupEventSendOrgGroupInvitesNotDone = $scope.$on("sendOrgGroupInvitesNotDone", function(event, data){
    $scope.manageOrgGroup = true;
  $rootScope.ProdoAppMessage("It looks as though we have broken something on our server system. Our support team is notified and will take immediate action to fix it." + message,'error');    //growl
});
//End of block
//  The following block is used to send invites to org customer
$scope.handleOrgCustomerInviteResponse = function(data){
// $scope.addCustomerInvites = true;
  if (data.success) {  $scope.customerinvites=[{'name': '','email': ''}];
    $rootScope.ProdoAppMessage(data.success.message,'success');    //ShowAlert
  } else {
    if (data.error.code== 'AU004') {     // enter valid data
        $log.debug(data.error.code + " " + data.error.message);
        $rootScope.ProdoAppMessage(data.error.message,'error');    //ShowAlert
    } else {
        $log.debug(data.error.message);
        $rootScope.ProdoAppMessage(data.error.message,'error');    //ShowError
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


$scope.orgCustNameError = '';

$scope.orgCustEmailError = '';

var allCustDataValid = 0;

$scope.orgCustomerInvites = function() 
{
        $scope.orgCustNameError = '';
        $scope.orgCustEmailError = '';
            for(var i=0;i<$scope.customerinvites.length;i++)
              {
                if($scope.regexForText.test($scope.customerinvites[i].name) === false )
                {
                    if($scope.customerinvites.length===1)
                    {
                      $scope.orgCustNameError='Names can have only characters! Please verify from the field';
                      allCustDataValid = 0;
                    }
                    else
                    {
                      $scope.orgCustNameError='Names can have only characters! Please verify from the list';
                       allCustDataValid = 0;
                    }
                    
                }
                if($scope.regexForEmail.test($scope.customerinvites[i].email) === false )
                {  
                     if($scope.customerinvites.length===1)
                     {
                            $scope.orgCustEmailError='Please verify your email ids from above field'; 
                             allCustDataValid = 0; 
                     }
                      else
                      { 
                             $scope.orgCustEmailError='Please verify your email ids from above list'; 
                              allCustDataValid = 0; 
                      }
                }
                if($scope.customerinvites[i].name === undefined || $scope.customerinvites[i].name === '' )
                {
                    if($scope.customerinvites.length === 1)
                    {
                        $scope.orgCustNameError = "Customer name can't be empty!";
                         allCustDataValid = 0;
                    }
                    else
                    {
                        $scope.orgCustNameError = "Customer name can't be empty! Please verify from above list";
                         allCustDataValid = 0;
                    }

                }
                if($scope.orgCustEmailError=== '' &&  $scope.orgCustNameError ==='')
                {
                       allCustDataValid = 1;
                }
               }
       if(allCustDataValid === 1)
       {
             OrgRegistrationService.sendCustomerInvites($scope.jsonOrgCustomerInvitesData());
       }
};

var cleanupEventSendOrgCustomerInvitesDone = $scope.$on("sendOrgCustomerInvitesDone", function(event, data){
  if(data.error !== undefined && data.error.code === 'AL001' )
  {
    // UserSessionService.resetSession();
    // $state.go('prodo.landing.signin');
    $rootScope.showModal();
  }
  else
  {
  $scope.handleOrgCustomerInviteResponse(data); 
  }  
});

var cleanupEventSendOrgCustomerInvitesNotDone = $scope.$on("sendOrgCustomerInvitesNotDone", function(event, data){
   //  $scope.addCustomerInvites = true;
  $rootScope.ProdoAppMessage("It looks as though we have broken something on our server system. Our support team is notified and will take immediate action to fix it." ,'error');    //ShowAlert
}); 
   
var cleanupEventremoveOrgImageDone = $scope.$on("orgImageDeleted",function(event,data){
  if(data.error !== undefined && data.error.code === 'AL001' )
  {
    // UserSessionService.resetSession();
    // $state.go('prodo.landing.signin');
    $rootScope.showModal();
  }
  if(data.success)
  {
     $rootScope.ProdoAppMessage(data.success.message,'success');
     $state.reload();
  }
  else {
    if (data.error.code== 'AU004') {     // enter valid data
        $rootScope.ProdoAppMessage(data.error.message,'error');    //ShowAlert
    } else {
        $rootScope.ProdoAppMessage(data.error.message,'error');    //ShowError
    }
  }
});

var cleanupEventremoveOrgImageNotDone = $scope.$on("orgImageDeleteNotDone",function(event,data){
        $rootScope.ProdoAppMessage("It looks as though we have broken something on our server system. Our support team is notified and will take immediate action to fix it." ,'error');    //ShowAlert
});

//  End of block
$scope.$watch('$state.$current.locals.globals.currentorggroup', function (currentorggroup) {
           $scope.groups = currentorggroup.success.usergrp; 
    
});

$scope.$watch('$state.$current.locals.globals.currentorgdata', function (currentorgdata) {
  $scope.orgImages = currentorgdata.success.organization.org_images;
  $scope.org = currentorgdata.success.organization; 

  $scope.orgKeyClients = currentorgdata.success.organization.keyclients;
});

$scope.$watch('$state.$current.locals.globals.currentorgaddr', function (currentorgaddr) {
  $scope.orgaddr = currentorgaddr.success.orgaddress;
});

if (currentorgproduct.error) 
{
  //No products available
} 
else {
  $scope.productlist = currentorgproduct.success.product;
}

$scope.removeKeyClientsPermenantly = function()
{
     
       $scope.clientids=[];
        for(var i=0;i<$scope.orgKeyClients.length;i++)
        { 
            if(document.getElementById('keyClient'+i).checked===true)
            {
                      $scope.clientids.push($scope.orgKeyClients[i].clientid); 
            }      
        }
        if($scope.clientids.length !==0 )
        {
                  OrgRegistrationService.keyClientDelete($scope.clientids);
        }
};

 var cleanupEventOrgUploadLogoResponseSuccess = $scope.$on("orgUploadLogoResponseSuccess",function(event,message){
  //$rootScope.ProdoAppMessage("Organization logo uploaded successfully!",'success');  
  $state.reload();
 });

 var cleanupEventOrgUploadResponseSuccess = $scope.$on("orgUploadResponseSuccess",function(event,message){
    //$rootScope.ProdoAppMessage("Organization artwork images uploaded successfully",'success');
  $state.reload();
 });

 var cleanupeventKeyClientDelete = $scope.$on("clientsDeletesSuccessfully",function(event,data){
    if(data.error !== undefined && data.error.code === 'AL001' )
  {
    // UserSessionService.resetSession();
    // $state.go('prodo.landing.signin');
    $rootScope.showModal();
  }
  if(data.success)
  {
     $rootScope.ProdoAppMessage(data.success.message,'success');
     $state.reload();
  }
  else {
    if (data.error.code== 'AU004') {     // enter valid data
        $rootScope.ProdoAppMessage(data.error.message,'error');    //ShowAlert
    } else {
        $rootScope.ProdoAppMessage(data.error.message,'error');    //ShowError
    }
  }    
 });

 var cleanupeventKeyClientDeleteFails = $scope.$on("clientsNotDeletedSuccessfully",function(event,message){
           $rootScope.ProdoAppMessage("It looks as though we have broken something on our server system. Our support team is notified and will take immediate action to fix it." + data,'error');    //ShowAlert

 });
 
var cleanupeventKeyClientSuccess = $scope.$on("orgKeyClientResponseSuccess",function(event,message){
    // $rootScope.ProdoAppMessage('Key Client Added Successfully!','success');
    $state.reload();
});

//Other functions for editing; needs to be variefied
$scope.enableEditing = function(addr) {
  addr.editing=true;
};

$scope.disableEditing= function(addrs) {
  addrs.editing = !addrs.editing;
  $scope.errorOfValidation = 'Please enter valid ';
  $state.reload();
};

$scope.addLocation = function() {
  $scope.reset();
  $scope.islocation = true;      
};

$scope.showKeyClient = 0;

$scope.showOrgArtworkImages = 0;

$scope.invokeKeyClients = function()
{
    $scope.showKeyClient = 1;
    $scope.showOrgArtworkImages = 0; 
};

$scope.invokeOrgArtwork = function()
{
   $scope.showKeyClient = 0;
   $scope.showOrgArtworkImages = 1;
};

$scope.reset = function() {
$scope.addressErrorMessage = '';
$scope.invalidCountryError = '';
$scope.invalidStateError = '';
$scope.invalidCityError = '';
$scope.invalidZipcodeError = '';$scope.emptyOrgtypeSelection = '';
$scope.invalidContact1 = '';
$scope.invalidContact2 = '';
$scope.invalidContact3 = '';
$scope.user.password='';
$scope.invalidPassword = '';
$scope.invalidDesc = '';
$scope.invalidOrgName = '';
$scope.islocation = false;
$scope.org.orgaddresstype = '';
$scope.org.address1= '';
$scope.org.address2= '';
$scope.org.address3= '';
$scope.org.country= '';    
$scope.org.city= '';
$scope.org.state= '';
$scope.org.zipcode = '';
$scope.contacts= [{'customerhelpline': ''},{'customerhelpline': ''},{'customerhelpline': ''}];
};

$scope.addInvitesList='';

    $scope.addMoreInvites = function() { 
      var noOfInvites=$scope.orginvites.length;
      if($scope.orginvites[noOfInvites-1].name!=='' && $scope.orginvites[noOfInvites-1].orgname!=='' && $scope.orginvites[noOfInvites-1].email!=='')
      {
          $scope.orginvites.push({'name': '', 'orgname': '', 'email': ''});    
      }  
    };

$scope.addCustomerInvites = function() { 
  var noOfInvites=$scope.customerinvites.length;  
  if($scope.customerinvites[noOfInvites-1].name!=='' && $scope.customerinvites[noOfInvites-1].email!=='')
  {
      $scope.customerinvites.push({'name': '', 'email': ''});
      allCustDataValid = 0;
  }
};
  
$scope.addNewInvites = function() {
  $scope.addInvitesList='new';
  $scope.showNewInvites = true;
};

$scope.disableEditor = function() {
  $scope.editorEnabled = false;
  $scope.user = { password: ''};
  $state.reload();
};

$scope.enableEditor = function(addr) {
    $scope.reset();
  $scope.editorEnabled = true;
};

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
      cleanupEventremoveOrgImageDone();
      cleanupEventOrgUploadResponseSuccess();
      cleanupeventKeyClientDelete();
      cleanupeventKeyClientDeleteFails();
    });

}]);