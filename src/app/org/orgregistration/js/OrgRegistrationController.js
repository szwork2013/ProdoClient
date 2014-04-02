/**
*	Org Registration Controller
**/
angular.module('prodo.OrgApp')
	.controller('OrgRegistrationController', ['$scope', '$rootScope', 'OrgModel', '$state', '$stateParams', '$log', 'OrgRegistrationService', 'UserSessionService', function($scope, $rootScope, OrgModel, $state, $stateParams, $log, OrgRegistrationService, UserSessionService) {

    $scope.errmessage = '';
    $scope.mobileRegex = "/^\(?[+]([0-9]{2,5})\)?[-]?([0-9]{10})$/";
    $scope.org = OrgModel;   // assining OrgModel service to org to update org model data
    
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
//Validation
$scope.selected_country="";
$scope.errorOrgName ='';
$scope.errOrgDesc ='';
$scope.submitted = false;   
$scope.optionErrorMessage = '';

    $scope.goToAddress = function() { 
        
        $scope.errorOrgName ='';
        $scope.errOrgDesc =''; 
        $scope.optionErrorMessage = '';
        if ($scope.OrgCompanyForm.$valid){     
                $scope.errmessage = '';$('#reg-companyDetails').css('color','#2EB373');
                $state.transitionTo('prodo.orgregistration.address');
        } else {
                $scope.submitted = true;
                if($scope.OrgCompanyForm.companyname.$valid===false || $scope.org.name==='')
                {
                    $scope.errorOrgName = 'Please enter valid company name';
                }
                if($scope.OrgCompanyForm.description.$valid===false || $scope.org.description==='')
                {
                    $scope.errOrgDesc = 'Please enter valid description';
                }
                if($scope.OrgCompanyForm.orgtype.$valid===false)
                {
                     $scope.optionErrorMessage = 'Please select atleast one option';
                }

        }
    };

//End of block
//Validation error messages variable declaration 
$scope.addressErrorMessage = '';
$scope.invalidCountryError = '';

$scope.invalidStateError = '';
$scope.invalidCityError = '';
$scope.invalidZipcodeError = '';
$scope.invalidContact1 = '';
$scope.invalidContact2 = '';
$scope.invalidContact3 = '';
//$scope.org.contact={customerhelpline1:'',customerhelpline2:'',customerhelpline3:''};
    $scope.goToGroupuser = function() {  

        
        $scope.addressErrorMessage = '';
        $scope.invalidCountryError = '';
        $scope.invalidStateError = '';
        $scope.invalidCityError = '';
        $scope.invalidZipcodeError = '';
        $scope.invalidContact1 = '';
        $scope.invalidContact2 = '';
        $scope.invalidContact3 = '';
        if ($scope.OrgAddressForm.$valid){
                    $scope.errmessage = ''; $('#reg-address').css('color','#2EB373')   
                    $state.transitionTo('prodo.orgregistration.groupuser'); 
        } else {
            if($scope.org.address1 === '' || $scope.OrgAddressForm.address1.$valid === false)
            {
                  $scope.addressErrorMessage = "Please enter valid address "; 
            }
            if($scope.OrgAddressForm.country.$valid===false || $scope.org.country === '')
            {
                   $scope.invalidCountryError = 'Please enter correct country';
            }
            if($scope.OrgAddressForm.state.$valid === false || $scope.org.country === '' )
            {        
                   $scope.invalidStateError = 'Please enter valid state';
            }
            if($scope.OrgAddressForm.city.$valid === false || $scope.org.city === '' )
            {        
                   $scope.invalidCityError = 'Please enter valid city';
            }
            if($scope.OrgAddressForm.zipcode.$valid === false || $scope.org.zipcode === '' )
            {
                   
                   $scope.invalidZipcodeError = 'Please enter valid Zipcode';
            }
            if($scope.OrgAddressForm.contact1.$valid === false)
            {
                   $scope.invalidContact1 = 'Please enter valid phone number';
            }
            if($scope.OrgAddressForm.contact2.$valid === false  )
            {
                   $scope.invalidContact2 = 'Please enter valid phone number';
            }
            if($scope.OrgAddressForm.contact3.$valid === false  )
            {
                   $scope.invalidContact3 = 'Please enter valid phone number';
            }
            $scope.submitted = true;   
         }
    };
    

    $scope.emailErrorMessage = '' ;

    $scope.goToState = function() {
        $scope.emailErrorMessage = '';
      if ($scope.OrgGroupuserForm.$valid || ($scope.org.grpname === "" && $scope.org.invites === "")) { 
          $scope.errmessage = '';$('#reg-groupUsers').css('color','#2EB373');
          $state.transitionTo('prodo.orgregistration.terms');
      } else {
        if($scope.OrgGroupuserForm.invites.$dirty === true && $scope.OrgGroupuserForm.invites.$valid  === false)
        {    
                $scope.emailErrorMessage = 'Please enter valid email addresses' ;
        }
      }
    };

    $scope.goToSummary = function() { 
      if ($scope.org.terms){$('#reg-terms').css('color','#2EB373');
        $state.transitionTo('prodo.orgregistration.finish'); 
      }
    };

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
      console.log(data);
      if (data.success) {
        $log.debug(data.success);      
        $rootScope.usersession.checkUser();
      } 
      else {
        $log.debug(data.error);
        $scope.showAlert('alert-danger', data.error.message);
      }
    };

    var cleanupEventSessionDone = $rootScope.$on('session', function (event, data) {
        $log.debug(data);
        if ($rootScope.usersession.isLoggedIn) {
          if (data.prodousertype == 'business' && data.hasDonePayment) {
            if (data.products_followed == null && data.products_followed == undefined) {
              $log.debug('There is some problem with the database. Please contact support.')
            } else if (data.products_followed.length > 0) {
                var n = data.products_followed.length - 1;
                console.log(n);
                $rootScope.orgid= data.products_followed[n].orgid;
                $rootScope.product_prodle= data.products_followed[n].prodle;
                for (var i=0;i<data.products_followed.length;i++){
                  if(data.products_followed[i] && data.products_followed[i].prodle){
                    var prodle = data.products_followed[i].prodle;
                  }
                  $scope.prodlesfollowed.push(prodle);
                }
                  UserSessionService.getProductFollowed($scope.prodlesfollowed);
                }
                  $rootScope.orgid = data.org.orgid;
                  $state.transitionTo('prodo.home.wall-org');
            } 
          } 
      });
$scope.org.orgaddresstype="Company Address";
    // function to send user data n stringify in json format
    $scope.jsonOrgData = function() {
      var orgData = 
        { 
          organization:
            { 
  	          'name':$scope.org.name,
  	          'description':$scope.org.description, 
  	          'orgtype':$scope.org.orgtype,
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
            }
        }
      return JSON.stringify(orgData); 
    }   
  
    // function to register Organisation on sumbit
    $scope.registerOrg = function() {    $('#reg-finish').css('color','#2EB373');
      OrgRegistrationService.RegisterOrg($scope.jsonOrgData()); // calling POST method REST APIs to save org data through OrgResgistrationService 
    }

    var cleanupEventOrgRegistrationDone = $scope.$on("orgRegistrationDone", function(event, message){
       if(message.error !== undefined && message.error.code === 'AL001' )
       {
           UserSessionService.resetSession();
           $state.go('prodo.landing.signin');
       }
       else
       {
          console.log(message);
          $scope.handleOrgResponse(message);}

    });
    var cleanupEventOrgRegistrationNotDone = $scope.$on("orgRegistrationNotDone", function(event, message){
      $scope.showAlert('alert-danger', "It looks as though we have broken something on our server system. Our support team is notified and will take immediate action to fix it." + message);  
    });  
    
    $scope.$on('$destroy', function(event, message) {
      cleanupEventSessionDone();      
      cleanupEventOrgRegistrationDone();         
      cleanupEventOrgRegistrationNotDone();  
    });

  }]);