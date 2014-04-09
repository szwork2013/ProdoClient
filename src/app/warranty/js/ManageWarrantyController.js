angular.module('prodo.WarrantyApp')
 .controller('ManageWarrantyController', ['$scope', '$rootScope', '$state', '$http', '$timeout', '$log', 'growl', 'WarrantyService', 'checkIfSessionExist','orgnameData','productnameData', function($scope, $rootScope, $state, $http, $timeout, $log, growl, WarrantyService, checkIfSessionExist,orgnameData,productnameData) {
   


   $scope.editMode = {
    // editorEnabled: false,
    editorEnabledWarranty : false
  };
  $scope.type=['extended','standerd']
  $scope.editStatus;
  $scope.allOrgNames=[];
   $scope.allProductNames=[];
  $scope.form={};
  $scope.org={
  	orgnamefromUser:'',
  	orgidfromUser:''
  };
  $scope.product={
   productnamefromUser:'',
   productidfromUser:''
  };

 $scope.purchase_location={
  		city: '',
  		country: ''
  		};
   $scope.productOrgName={
   	name:'',
   	orgid:''
   };

   $scope.productallProductName={
   	name:'',
   	prodle:''
   };

   $scope.productwarranty = {
   	 model_no: '',
  	 model_name: '',
  	 serial_no: '',
  	 purchase_date: '',
  	 purchase_date: '',
  	 description: '',
     disclaimer : '',
  	 coverage : '',
  	 warranty_type:'',
  	 invoice_image:''
   }
 $scope.newWarranty ={
  warrantydata:{}
}
$scope.getAllOrgNames=function(){
	 // console.log(orgnameData.success.OrgNames);
	if(orgnameData.success){
     $scope.allOrgNames=orgnameData.success.OrgNames;
	 $log.debug("orgData: "+$scope.allOrgNames);
	}
}
$scope.getAllOrgNames();

$scope.getAllProductNames=function(){
	 // console.log(productnameData.success.product);
	if(productnameData.success){
     $scope.allProductNames=productnameData.success.product;
	 $log.debug("ProdData: "+$scope.allProductNames);
	}
}
$scope.getAllProductNames();

 $scope.getNewWarrantyData=function(){
 	$scope.orgnamefromUser;
 	if($scope.productOrgName.name.name){
 		$scope.org.orgnamefromUser=$scope.productOrgName.name.name;
 		$scope.org.orgidfromUser=$scope.productOrgName.name.orgid;
 	}
 	else{
 		$scope.org.orgnamefromUser=$scope.productOrgName.name;
 		$scope.org.orgidfromUser="";
 	}
 	if($scope.productallProductName.name.name){
 	    $scope.product.productnamefromUser=$scope.productallProductName.name.name;
 	   $scope.product.productidfromUser=$scope.productallProductName.name.prodle;
 	}
 	else{
         $scope.product.productnamefromUser=$scope.productallProductName.name;
         $scope.product.productidfromUser="";
 	} 
   $scope.newWarranty ={
   warrantydata:{
  	orgname: $scope.org.orgnamefromUser,
  	orgid: $scope.org.orgidfromUser,
  	name:  $scope.product.productnamefromUser,
  	prodle: $scope.product.productidfromUser,
  	model_no: $scope.productwarranty.model_no,
  	model_name: $scope.productwarranty.model_name,
  	serial_no: $scope.productwarranty.serial_no,
  	purchase_date: $scope.productwarranty.purchase_date,
  	expirydate: $scope.productwarranty.purchase_date,
  	purchase_location:{
  		city: $scope.purchase_location.city,
  		country: $scope.purchase_location.country
  		},
  	userid:$rootScope.usersession.currentUser.userid,
  	description: $scope.productwarranty.description,
  	disclaimer: $scope.productwarranty.disclaimer ,
  	coverage: $scope.productwarranty.coverage ,
  	warranty_type:	$scope.productwarranty.type,
  	invoice_image: $scope.productwarranty.invoiceUpload
  }
 };


   
 };

 $scope.addWarranty = function (editStatus) {
  if($scope.form.WarrantyForm.$invalid){
      $scope.form.WarrantyForm.submitted=true;
    }
    else{
  $scope.getNewWarrantyData();
  $log.debug( $scope.newWarranty);

  WarrantyService.add_warranty.addWarrantyDetail(
  	{
  		userid:$rootScope.usersession.currentUser.userid
  	},
  	$scope.newWarranty,function(success){
  		if(success.success){
  	     $scope.handleAddWarrantySuccess(success);
  		}
       else if(success.error){
       	 $scope.handleAddWarrantyError(success.error);
       }

  	},function(error){
      $log.debug(error);
  	});
   }
};

  $scope.handleAddWarrantySuccess=function(success){
    if(success.success){
    	$log.debug(success.success);
    }
   };
 
 $scope.handleAddWarrantyError=function(error){
 	if(error.code=='AL001'){
     $rootScope.showModal();
    }
    else{
     $log.debug(error.message);
    }
 };
    



 $scope.disableEditorFeature = function () {
    $scope.editMode.editorEnabledWarranty = false;
   
  };

 $scope.enableEditorFeature = function () {
 	$scope.form.WarrantyForm.$setPristine();
    $scope.editMode.editorEnabledWarranty = true;
    growl.addInfoMessage("   Adding warranty data.....");
  };




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

 $scope.cities= [        'Port Blair', 
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
}]);
 