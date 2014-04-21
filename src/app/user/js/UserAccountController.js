angular.module('prodo.UserApp')
 .controller('UserAccountController', ['$scope', '$rootScope', '$state', '$http', '$timeout', '$log', 'growl', 'UserSessionService', 'OrgRegistrationService', 'userdata', 'checkIfSessionExist', '$stateParams', function($scope, $rootScope, $state, $http, $timeout, $log, growl, UserSessionService, OrgRegistrationService, userdata, checkIfSessionExist, $stateParams) {

    $scope.user ={};
    $scope.form = {};
    $scope.products_followed = [];
    $scope.submitted = false;
    $scope.$state = $state;
    
    $scope.editEmail = false;
    $scope.hasAddress = false;
    $scope.hasPersonalDetail = false;
    $scope.editAddress = false;
    $scope.isInvites = false;
    $scope.isUnfollowed = false;
    $scope.editorEnabled = false;

    $scope.countries=[ 
      'Afghanistan', 
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
      'Zimbabwe'
    ];

    //$scope.countries holds array of list of countries
    //$scope.states is an array of objects where each object will represent states of selected country
    //For time being only india is considered                    
    $scope.states={};                    
    $scope.states.india =  [
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
      'West Bengal'
    ];    
    //$scope.cities will store data regarding cities in the states
    //Currently due to unavailability of data, we are resrticting our scope to india
    //So when india is selected from the country list
    //All cities in Indial will be displayed irrespective of states
    //This needs to be modified later.                     
    $scope.india={};
    $scope.india.major_cities = [       
      'Port Blair', 
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
      'Pune'
    ] ;  

    $scope.selected_country="";

    $scope.return_states=function()
    {    
          if($scope.user.address.country==="India")
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
          if($scope.user.address.country==="India")
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

    $scope.$watch('$state.$current.locals.globals.checkIfSessionExist', function (checkIfSessionExist) {
      if (checkIfSessionExist.error) {
        $rootScope.showModal();
      };
    });

    if (checkIfSessionExist.success && userdata.success) { 
      $scope.$watch('$state.$current.locals.globals.userdata', function (userdata) {
      
        if (userdata.success) {
          $scope.user = userdata.success.user;
          if (userdata.success.user.firstname != null) {
            $scope.hasPersonalDetail = true;
          }
          if (userdata.success.user.address.address1 != null) {
            $scope.hasAddress = true;
          }
          if (userdata.success.user.dob != null) {
            var d=new Date(userdata.success.user.dob);
            var year=d.getFullYear();
            var month=d.getMonth()+1;
            if (month<10){
              month="0" + month;
            }
            var day=d.getDate();
            $scope.user.dob = year + "-" + month + "-" + day;
          }

          UserSessionService.updateUserData(userdata.success.user);  
        } else {
            if (userdata.error && userdata.error.code == 'AL001') {
              $rootScope.showModal();
            } else {
              $log.debug(userdata.error.message);
            } 
        }
      });
    }


    if (UserSessionService.productfollowlist.length !== 0) {
      $scope.products_followed = UserSessionService.productfollowlist;
    } else {
      $log.debug('no products followed');
    }
    
    var cleanupEventUserUploadResponseSuccess = $scope.$on("userUploadResponseSuccess",function(event,message){
      if(message.error !== undefined && message.error.code === 'AL001' ) {
        $rootScope.showModal();
      } else {
        $log.debug("Listenig ")
        $state.reload();
      }
    });

    // Update Email for user start........................................

    $scope.emailEditor = function() {
      if ($scope.editEmail) {
        $scope.form.usergeneralsettingform.submitted = false;
        $scope.form.usergeneralsettingform.$setPristine();
        $scope.editEmail = false;
      } else {
        $scope.editEmail = true;
      }
    };

    $scope.jsonUpdateEmailData = function() {
      var userData = 
        {
          user:
          {
          'email' : $scope.user.email,
          'currentpassword' : $scope.user.password
          }
        };

      return JSON.stringify(userData); 
    }

    // function to handle server side responses
    $scope.handleUpdateUserEmailResponse = function(data){
      if (data.success) {
        $scope.emailEditor();
        $state.transitionTo($state.current, $stateParams, { reload: true, inherit: false, notify: true });
        $rootScope.ProdoAppMessage(data.success.message, 'success');   
      } else {
        if (data.error.code== 'AL001') {     // enter valid data
            $log.debug(data.error.code + " " + data.error.message);
            $rootScope.showModal();
        } else {
            $log.debug(data.error.message);
            $rootScope.ProdoAppMessage(data.error.message, 'error');
        }
      }
    };  

    
    $scope.updateUserEmail = function() {
      if ($scope.form.usergeneralsettingform.$valid) {
        UserSessionService.updateEmail($scope.jsonUpdateEmailData());
      } else {
        $scope.form.usergeneralsettingform.submitted = true;
      }
    }

    var cleanupEventUpdateUserEmailDone = $scope.$on("updateUserEmailDone", function(event, message){
      $scope.handleUpdateUserEmailResponse(message); 
    });

    var cleanupEventUpdateUserEmailNotDone = $scope.$on("updateUserEmailNotDone", function(event, message){
      $rootScope.ProdoAppMessage("It looks as though we have broken something on our server system. Our support team is notified and will take immediate action to fix it." + message, 'error');   
    });
  
		// Update Email for user ends........................................

    // Update Password for user start........................................
    
    $scope.clear = function() {
      $scope.form.userpasswordsettingform.$setPristine();
      $scope.form.userpasswordsettingform.submitted = false;
      $scope.user.currentpassword = '';
      $scope.user.newpassword = '';
      $scope.user.confirmpassword = '';
    }

    $scope.jsonUpdatePasswordData = function()
      {
        var userData = 
          {
            user:
            {
            'currentpassword' : $scope.user.currentpassword,
            'newpassword' : $scope.user.newpassword,
            'confirmnewpassword' : $scope.user.confirmpassword,            
            }
          };
      return JSON.stringify(userData); 
    }

    // function to handle server side responses
    $scope.handleUpdateUserPasswordResponse = function(data){
      if (data.success) {
        $scope.clear();  
        $state.transitionTo($state.current, $stateParams, { reload: true, inherit: false, notify: true });
        $rootScope.ProdoAppMessage(data.success.message,'success');  
      } else {
        if (data.error.code== 'AL001') {     // enter valid data
            $log.debug(data.error.code + " " + data.error.message);
            $rootScope.showModal();
        } else {
            $log.debug(data.error.message);
            $rootScope.ProdoAppMessage(data.error.message, 'error');
        }
      }
    };  

    $scope.changePassword = function() {
      if ($scope.form.userpasswordsettingform.$valid) {
        UserSessionService.updatePassword($scope.jsonUpdatePasswordData());
      } else {
        $scope.form.userpasswordsettingform.submitted = true;
      }
    }

    var cleanupEventUpdateUserPasswordDone = $scope.$on("updateUserPasswordDone", function(event, message){
      $scope.handleUpdateUserPasswordResponse(message); 
    });

    var cleanupEventUpdateUserPasswordNotDone = $scope.$on("updateUserPasswordNotDone", function(event, message){
      $rootScope.ProdoAppMessage("It looks as though we have broken something on our server system. Our support team is notified and will take immediate action to fix it." + message, 'error');
    });

    // Update Password for user ends........................................

    // Update Personal settings for user start........................................

    $scope.disableEditor = function() {
      $scope.form.userpersonalsettingform.submitted = false;
      $scope.form.userpersonalsettingform.$setPristine();
      $scope.editorEnabled = false;
    };

    $scope.enableEditor = function() {
      $scope.editorEnabled = true;
    };


    
    // function to send and stringify user email to Rest APIs for user account update
    $scope.jsonUserAccountData = function()
      {
        var userData = 
          {
            user:
            {
            'firstname' : $scope.user.firstname,
            'lastname' : $scope.user.lastname,
            'dob' : $scope.user.dob,
            'gender' : $scope.user.gender,
            'phone' : $scope.user.phone,
            'mobile' : $scope.user.mobile
            }
          };

        return JSON.stringify(userData); 
      }

    // function to handle server side responses
    $scope.handleUpdateUserResponse = function(data){
      if (data.success) {
       $state.transitionTo($state.current, $stateParams, { reload: true, inherit: false, notify: true });
       $rootScope.ProdoAppMessage(data.success.message, 'success');   
      } else {
        if (data.error.code== 'AL001') {     // enter valid data
            $log.debug(data.error.code + " " + data.error.message);
            $rootScope.showModal();
        } else {
            $log.debug(data.error.message);
            $rootScope.ProdoAppMessage(data.error.message,'error'); 
        }
      }
    };  

    $scope.updateUserAccount = function() {
      if ($scope.form.userpersonalsettingform.$valid) {
        $scope.disableEditor();
        UserSessionService.saveUserSettings($scope.jsonUserAccountData());
      } else {
        $scope.form.userpersonalsettingform.submitted = true;
      }
    }

    var cleanupEventUpdateUserDone = $scope.$on("updateUserDone", function(event, message){
      $scope.handleUpdateUserResponse(message);
    });

    var cleanupEventUpdateUserNotDone = $scope.$on("updateUserNotDone", function(event, message){
      $rootScope.ProdoAppMessage("It looks as though we have broken something on our server system. Our support team is notified and will take immediate action to fix it." + message, 'error');
    });


    // Update Personal settings for user ends........................................

    // Update Location settings for user start........................................

    $scope.addrEditor = function() {
      $scope.form.userlocationsettingform.submitted = false;
      $scope.form.userlocationsettingform.$setPristine();
      if ($scope.editAddress) {
        $scope.editAddress = false;
      } else {
        $scope.editAddress = true;
      }
      
    };

    // function to send and stringify user email to Rest APIs for user account update
    $scope.jsonUserAddressData = function()
      {
        var userData = 
          {
            user:
            {
            'address':
              {
                'address1':$scope.user.address.address1,
                'address2':$scope.user.address.address2,
                'address3':$scope.user.address.address3,
                'city':$scope.user.address.city,
                'state':$scope.user.address.state,
                'country':$scope.user.address.country,
                'zipcode':$scope.user.address.zipcode
              }
            }
          };

        return JSON.stringify(userData); 
      }

    $scope.updateUserAddress = function() {
      if ($scope.form.userlocationsettingform.$valid) {
        $scope.addrEditor();
        UserSessionService.saveUserSettings($scope.jsonUserAddressData());
      } else {
        $scope.form.userlocationsettingform.submitted = true;
      } 
    }

    // Update Location settings for user ends........................................

    // Update invites for user start.......................................

    $scope.userinvites=[{
                        'name': '',
                        'email': ''
                      }];

    $scope.addUserInvites = function() { 
      if ($scope.form.userinvitesform.$valid) {
        $scope.invitesettingchange = '';
        $scope.userinvites.push({'name': '', 'email': ''});
      } else {
        $scope.invitesettingchange = 'New fields will only visible once you enter data here.';
      }
    };

    $scope.clearInvites = function() { 
        $scope.form.userinvitesform.submitted = false;
        $scope.invitesettingchange = "";
        $scope.form.userinvitesform.$setPristine();
        $scope.userinvites = [{'name': '', 'email': ''}];
    };

    $scope.removeInvites = function(invite) {
      var invites = $scope.userinvites;
      for (var i = 0, ii = invites.length; i < ii; i++) {
        if (invite === invites[i]) { 
          invites.splice(i, 1); 
        }
        else {
          invites.splice(i,0);
        } 
      }
    };

    $scope.jsonUserInvitesData = function()
      {
        var userInvite = 
          {
            userinvites: $scope.userinvites
          }
        return JSON.stringify(userInvite); 
      }

    // function to handle server side responses
    $scope.handleUserInviteResponse = function(data){
      if (data.success) {
        $scope.clearInvites();
        $rootScope.ProdoAppMessage('Your invites has been successfully sent.', 'success');
      } else {
        if (data.error.code== 'AL001') {     // enter valid data
            $log.debug(data.error.code + " " + data.error.message);
            $rootScope.showModal();
        } else {
            $log.debug(data.error.message);
            $rootScope.ProdoAppMessage(data.error.message, 'error');
        }
      }
    };  


    $scope.sendUserInvites = function() {
      if ($scope.form.userinvitesform.$valid) {
        UserSessionService.sendInvites($scope.jsonUserInvitesData());
      } else {
        $scope.form.userinvitesform.submitted = true;
      }
    }

    var cleanupEventSendUserInvitesDone = $scope.$on("sendUserInvitesDone", function(event, data){
      $scope.handleUserInviteResponse(data);  
    });

    var cleanupEventSendUserInvitesNotDone = $scope.$on("sendUserInvitesNotDone", function(event, data){
      $rootScope.ProdoAppMessage("It looks as though we have broken something on our server system. Our support team is notified and will take immediate action to fix it." + data, 'error');    
    });


    // Update invites for user ends........................................

    // Unfollow product start........................................

    $scope.handleUnfollowProductResponse = function(data, product){
      if (data.success) {
        $state.reload();
        var products_followed = UserSessionService.productfollowlist;
        for (var i = 0, ii = products_followed.length; i < ii; i++) {
          if (product === products_followed[i]) { products_followed.splice(i, 1); }
        } 
        $rootScope.ProdoAppMessage('You have left your product conversation for' + ' ' + product.name, 'success');    
      } else {
        if (data.error.code== 'AL001') {     // enter valid data
            $log.debug(data.error.code + " " + data.error.message);
            $rootScope.showModal();
        } else {
            $log.debug(data.error.message);
            $rootScope.ProdoAppMessage(data.error.message, 'error');
        }
      }
    }; 

    $scope.unfollow = function (product) {
      UserSessionService.unfollowProduct(product.prodle, product);
    };
    
    var cleanupEventUnfollowProductDone = $scope.$on("unfollowProductDone", function(event, data, product){
      $scope.handleUnfollowProductResponse(data, product);    
    });

    var cleanupEventUnfollowProductNotDone = $scope.$on("unfollowProductNotDone", function(event, data){
      $rootScope.ProdoAppMessage("It looks as though we have broken something on our server system. Our support team is notified and will take immediate action to fix it." + data, 'error');   
    });

    // Unfollow product ends........................................

    // Delete user account start........................................

    // function to handle server side responses
    $scope.handleDeleteUserResponse = function(data){
      if (data.success) {
        UserSessionService.logoutUser();
        $rootScope.ProdoAppMessage(data.success.message, 'success'); 
      } else {
        if (data.error.code== 'AL001') {     // enter valid data
            $log.debug(data.error.code + " " + data.error.message);
            $rootScope.showModal();
        } else {
            $log.debug(data.error.message);
            $rootScope.ProdoAppMessage(data.error.message, 'error');
        }
      }
    };

    var cleanupEventLogoutDone = $scope.$on("logoutDone", function(event, message){
      $state.transitionTo('prodo.landing.signin');
      $rootScope.ProdoAppMessage(message, 'success'); 
    });

    $scope.deleteUserAccount = function() {
      UserSessionService.removeUserSettings();
    }

    var cleanupEventDeleteUserDone = $scope.$on("deleteUserDone", function(event, message){
      $scope.handleDeleteUserResponse(message);
    });
    var cleanupEventDeleteUserNotDone = $scope.$on("deleteUserNotDone", function(event, message){
      $rootScope.ProdoAppMessage("It looks as though we have broken something on our server system. Our support team is notified and will take immediate action to fix it." + message, 'error');
    });

    // Delete user account ends........................................


    $scope.$on('$destroy', function(event, message) {

      cleanupEventUpdateUserEmailDone(); 
      cleanupEventUpdateUserEmailNotDone();
      cleanupEventUpdateUserPasswordDone();
      cleanupEventUpdateUserPasswordNotDone();  
      cleanupEventUpdateUserDone(); 
      cleanupEventUpdateUserNotDone(); 
      cleanupEventDeleteUserDone();   
      cleanupEventDeleteUserNotDone();
      cleanupEventLogoutDone();                            
      cleanupEventSendUserInvitesDone();      
      cleanupEventSendUserInvitesNotDone();      
      cleanupEventUnfollowProductDone(); 
      cleanupEventUnfollowProductNotDone();  
      cleanupEventUserUploadResponseSuccess();
    });
}]);
 