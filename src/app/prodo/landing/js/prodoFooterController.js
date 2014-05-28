angular.module('prodo.ProdonusApp')
	.controller('ProdoFooterController', ['$rootScope', '$scope', '$state', '$log','$stateParams', 'growl', 'UserSessionService', 'authorcategorydata', function($rootScope, $scope, $state, $log, $stateParams, growl, UserSessionService, authorcategorydata) {
		
    console.log(authorcategorydata);
    $scope.form = {};
    $scope.submitted = false;
    $scope.category_msg = false;
    $scope.$state = $state;

    $scope.author = 
    {
      'fname' :  '',
      'lname' :  '',
      'country': '',
      'category': [],
      'aboutu': ''

    };

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

    $scope.categoriesList = [];

    $scope.handles=[{
      'type': '',
      'url': ''
    }];

    $scope.addMoreHandles = function() { 
      $scope.handles.push({'type': '', 'url': ''});
    };

    $scope.options = [
    {
      name: 'Twitter'
    }, 
    {
      name: 'Facebook'
    }, 
    {
      name: 'linkedin'
    }, 
    {
      name: 'Google+'
    }, 
    {
      name: 'Other'
    }
  ];
  
  $scope.handles[0].type = $scope.options[0];

  if (authorcategorydata.success) {
    $scope.categoriesList = authorcategorydata.success.categorytags;
  } else {
    $scope.categoriesList = ['software', 'IT', 'automobiles'];
  }

  $scope.clearAuthorApp = function() {
    $scope.form.authorForm.$setPristine();
    $scope.form.authorForm.submitted = false;
    $scope.category_msg = false;
      $scope.author = {
        fname: '',
        lname: '',
        country: '',
        category: [],
        aboutu: ''
      },
      $scope.handles=[{
        'type': $scope.options[0],
        'url': ''
      }]
  };

  $scope.jsonAuthorAppData = function()
      {
        var authordata = 
          {
            author:
            {
              'firstname' : $scope.author.fname,
              'lastname' : $scope.author.lname,
              'category' : $scope.author.category,
              'aboutu' : $scope.author.aboutu,
              'country' : $scope.author.country,
              'portfolio': $scope.handles
            }            
          }
        return JSON.stringify(authordata); 
      }

    // function to handle server side responses
    $scope.handleAuthorRequestResponse = function(data){
      if (data.success) {
        $scope.clearAuthorApp();
        $rootScope.ProdoAppMessage('Your request has been successfully sent.', 'success');
      } else {
        if (data.error.code== 'AL001') {     // enter valid data
            $log.debug(data.error.code + " " + data.error.message);
            $rootScope.showModal();
        } else {
            $log.debug(data.error.message);
            $rootScope.ProdoAppMessage(data.error.message, 'error');
        }
      }
      $scope.hideSpinner();
    };  


    $scope.sendAuthorRequest = function(category) {
      if ($scope.form.authorForm.$valid) {
        $scope.showSpinner();
        if (category.length !== 0) {
          var isValidCategory = category.every(function (val) {
            return $scope.categoriesList.indexOf(val) >= 0;
          });
          if (isValidCategory === true) {
            $scope.category_msg = false;
            UserSessionService.sendAuthorAppRequest($scope.jsonAuthorAppData());
          } else {
            $scope.hideSpinner();
            $scope.category_msg = true;
          }
        } else if (category.length === 0) {
          $scope.hideSpinner();
          $scope.category_msg = true;
        }        
      } else {
        $scope.hideSpinner();
        $scope.category_msg = true;
        $scope.form.authorForm.submitted = true;
      }
    }

    var cleanupEventSendAuthorRequestDone = $scope.$on("sendAuthorRequestDone", function(event, data){
      $scope.handleAuthorRequestResponse(data);  
    });

    var cleanupEventSendAuthorRequestNotDone = $scope.$on("sendAuthorRequestNotDone", function(event, data){
      $rootScope.ProdoAppMessage("It looks as though we have broken something on our server system. Our support team is notified and will take immediate action to fix it." + data, 'error');    
    });

    $scope.$on('$destroy', function(event, message) {

      cleanupEventSendAuthorRequestDone();
      cleanupEventSendAuthorRequestNotDone();
    });

}]);
