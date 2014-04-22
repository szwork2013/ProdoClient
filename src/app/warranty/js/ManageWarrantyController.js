/* Overview: ManageWarrantyController
 * ManageWarrantyController
 * Dated: 08/04/2014.
 * Author: Bhagyashri Jangam
 * Copyright: Prodonus Software Private Limited and GiantLeap Systems Private Limited 2013
 * Change History:
 *
 * date | author | description 
 *
 * 27-3/2013 | xyx | Add a new property
 * 
 */
 
angular.module('prodo.WarrantyApp')
 .controller('ManageWarrantyController', ['$scope', '$rootScope', '$state', '$http', '$timeout', '$log',  'WarrantyService', 'checkIfSessionExist','orgnameData','productnameData','warrantydata','fileReader','ENV','isLoggedin','dateFilter', function($scope, $rootScope, $state, $http, $timeout, $log,  WarrantyService, checkIfSessionExist,orgnameData,productnameData,warrantydata,fileReader,ENV,isLoggedin,dateFilter) {
   
$scope.$state = $state;
var setmaxPurchaseDateValue=moment().format("YYYY-MM-DD");
$("#prodo_warranty_purchase_date").attr('max', setmaxPurchaseDateValue);
$("#prodo_warranty_purchase_dateUpdate").attr('max', setmaxPurchaseDateValue);
$scope.newWarranty_Responsewarranty_id="";
   $scope.editMode = {
    // editorEnabled: false,
    editorEnabledWarranty : false,
    editorEnabledWarrantyUpdate : false
  };
  $scope.warranty={};
  $scope.type=['extended','standard']
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
   	 orgname:'',
   	 orgid:'',
   	 name:'',
   	 prodle:'',
  	 // model_name: '',
  	 serial_no: '',
  	 purchase_date: '',
  	 purchase_period: '',
  	 purchase_location:{
  	 	city:'',
  	 	country:''
  	 },
  	 description: '',
     disclaimer : '',
  	 coverage : '',
  	 warranty_type:''
  	
   };
 $scope.newWarranty ={
  warrantydata:{}
}
$scope.warranties=[];


//
  $scope.fileLength;
  $scope.uploadSrc;
  $scope.progressbar = 0;
  $scope.counter = 0;
  $scope.file;
  $rootScope.currentclient={name:''};
  $scope.file_data = {
        filetype: '',
        filename: '',
        filebuffer: ''
      };
 $scope.action={};
 $scope.isValidImage=false;
 $scope.invoiceimage;

  $scope.clearText = function () {
    // prodo-product-features_textfield
  $scope.productwarranty = {};
  $scope.purchase_location={};
  $scope.org={};
  $scope.product={};
  $scope.productOrgName.name="";
  $scope.productallProductName.name="";
  $scope.file_data={} ;
  $scope.file={};
  $scope.file1="";
  $scope.isValidImage=false;
  }
  
  $scope.formatDate = function (time) {
    return (moment(time).format('DD MMM YYYY'));
  };


  $scope.startsWith = function(list, viewValue) {
     return list.substr(0, viewValue.length).toLowerCase() == viewValue.toLowerCase();
  } 



   $scope.handleDeleteWarrantyError=function(error){
    if(error.code=='AL001'){
        $rootScope.showModal();
      }
      else{
        $rootScope.ProdoAppMessage(error.message, 'error');
         $log.debug(error.message);
      }
  };

    $scope.handleDeleteWarrantySuccess=function(success){
        $log.debug(JSON.stringify(success));
        $rootScope.ProdoAppMessage("Warranty deleted successfully...", 'success');
        $("#prodo-ProductDetails").css("display", "none");
        $state.reload();
    };
  


  //delete product
$scope.deleteWarranty=function(){
$log.debug("Deleting");


      if ($scope.warranty.userid==$rootScope.usersession.currentUser.userid) { //if owener of warranty
        WarrantyService.delete_warranty.deleteWarranty({
          userid: $rootScope.usersession.currentUser.userid,
          warrantyid: $scope.warranty.warranty_id
        }, function (success) {
          if(success.success){
           $scope.handleDeleteWarrantySuccess(success);   
          }else if(success.error){
            $scope.handleDeleteWarrantyError(success.error);
          }  
        }, function (error) {
          $log.debug(JSON.stringify(error));
          $rootScope.ProdoAppMessage(error, 'error');
         
        });
      }
      // }
      else{
          $rootScope.ProdoAppMessage("You dont have rights to delete this warranty...", 'error');
          
      }

};

   $scope.handleAllWarrantyDataError=function(error){
     $log.debug(JSON.stringify(error));
      if(error.code=='AL001'){
        $rootScope.showModal();
      }else{
     $("#prodo-ProductDetails").css("display", "none");
     $("#ErrMsging").css("display", "block");
     $scope.warranties=[];
     document.getElementById("ErrMsging").innerHTML = "<br>Warranty not available ... Add new Warranty<br><br>";
    }
  };

  $scope.handleAllWarrantyDataSuccess=function(warrantydata){
    
     $scope.warranties = warrantydata.success.Warranty;
      $log.debug( warrantydata.success.Warranty);
      if ($scope.warranties.length == 0) { //after deleting product, check for next product from product followed,if no product - display msg
         $("#prodo-ProductDetails").css("display", "none");
        $("#ErrMsging").css("display", "block");
        document.getElementById("ErrMsging").innerHTML = "<br>Warranty not available ... Add new Warranty<br><br>";
       
      }
      if ($scope.warranties.length !== 0) {

      
       $scope.currentWarrantyId = $scope.warranties[0].warranty_id;
         $("#ErrMsging").css("display", "none");
        if($scope.newWarranty_Responsewarranty_id!=="" ){
          $scope.getWarranty($scope.newWarranty_Responsewarranty_id);
          $scope.newWarranty_Responsewarranty_id="";
        }
        else{
          $scope.getWarranty($scope.currentWarrantyId);
        }
      }
  };



  $scope.$watch('$state.$current.locals.globals.warrantydata', function (warrantydata) {
  	if (warrantydata.error) {
      $scope.handleAllWarrantyDataError(warrantydata.error);
          
    } else {
       $scope.handleAllWarrantyDataSuccess(warrantydata);
    }
      // $scope.warranties = warrantydata.success.Warranty;
    });



//
 //warranties List pagination
  $scope.currentPage = 0;
  $scope.pageSize = 3;
  $scope.numberOfPages = function () {
    return Math.ceil($scope.warranties.length / $scope.pageSize);
  };
  //warranties List pagination
$log.debug(warrantydata);
$scope.getAllWarranties=function(){
	 // console.log(orgnameData.success.OrgNames);
	if(warrantydata.success){
     $scope.warranties=warrantydata.success.Warranty;
	 $log.debug("warranties: "+$scope.warranties);
	}
}
$scope.getAllWarranties();

$scope.getAllOrgNames=function(){
	 // console.log(orgnameData.success.OrgNames);
	if(orgnameData.success){
     $scope.allOrgNames=orgnameData.success.OrgNames;
	 // $log.debug("orgData: "+$scope.allOrgNames);
	}
}
$scope.getAllOrgNames();

$scope.getAllProductNames=function(){
	 // console.log(productnameData.success.product);
	if(productnameData.success){
     $scope.allProductNames=productnameData.success.product;
	 // $log.debug("ProdData: "+$scope.allProductNames);
	}
}
$scope.getAllProductNames();

 $scope.changeWarranty=function(warranty1){
  $scope.form.WarrantyForm.submitted=false;
  $scope.form.WarrantyFormUpdate.submitted=false;
   
    $scope.getWarranty($scope.currentWarrantyId);
    $scope.editMode.editorEnabledWarranty = false;
     $scope.editMode.editorEnabledWarrantyUpdate = false;
 
  };

  $scope.handleGetWarrantyError=function(error){
    //error code check here
    if(error.code=='AL001'){
      $rootScope.showModal();
    }
    else{
        $rootScope.ProdoAppMessage(error.message, 'error');
    }       
 };



$scope.setDatesValidations=function(){
var warrantyPeriod=$scope.warranty.purchase_date;
$("#prodo_warranty_periodUpdate").attr('min', warrantyPeriod);
}
$scope.handleGetWarrantySuccess=function(successData,l_warrantyid){
  if(successData.success)
    $log.debug(successData.success);
   $("#prodo-ProductDetails").css("display", "block");
        $scope.warranty=successData.success.Warranty;
        $scope.warranty.purchase_date = dateFilter($scope.warranty.purchase_date, 'yyyy-MM-dd');
        $scope.warranty.expirydate = dateFilter($scope.warranty.expirydate, 'yyyy-MM-dd');
        $scope.setDatesValidations();
        $rootScope.Upload_warranty_id=$scope.warranty.warranty_id;
        $scope.OpenInvoiceImage=false;
        
  };

    $scope.getWarranty = function (l_warrantyid) {
    	// for(var i=0; i<$scope.warranties.length-1 ; i++){
    	// 	if(l_warrantyid == $scope.warranties[i].warranty_id){
     //        $scope.warranty=$scope.warranties[i];
    	// 	}
    	// }
    //get l_warrantyid from $scope.warranties
    WarrantyService.get_warranty.getWarrantyDetail({
      userid: $rootScope.usersession.currentUser.userid,
      warrantyid:l_warrantyid 
    },
    function (successData) {
      if (successData.success == undefined) { //if not product
         $scope.handleGetWarrantyError(successData.error);
      } else {
        $scope.handleGetWarrantySuccess(successData,l_warrantyid); 
      }
    }, function (error) { //if error geting product
      $log.debug(error);
      $rootScope.ProdoAppMessage(error.status, 'error');
      
    });
   
  };

  $scope.getSelectedWarranty = function (warranty1) {
    // jQuery("#FileName").hide();
    if($scope.editMode.editorEnabledWarranty == true || $scope.editMode.editorEnabledWarrantyUpdate == true ){
      // $scope.enableProductErrorMsg();
      // ProdERRMsg.innerHTML = "Please add product first then view other products..."; 
         $('#changeWarrantyModal').modal('toggle');
      $('#changeWarrantyModal').modal('show');

      $('#ChangeWarrantyOkButton').on('click', function (event) {
        $scope.changeWarranty(warranty1)
      });


      //modal code here , if yes clear data and show product if cancel, prev state
    }else{
       $scope.currentWarrantyId=warranty1.warranty_id;
       if($scope.currentWarrantyId == $scope.warranty.warranty_id){
       
      }else{
         $scope.getWarranty($scope.currentWarrantyId);
      }

    }
  };





 $scope.getNextDateDiffMonths=function(date_l,months_l){
   $scope.nextdate=moment(date_l).add('M',months_l ).calendar();
   $log.debug($scope.nextdate);
   return $scope.nextdate;
 }
 $scope.getNewWarrantyData=function(){

    $scope.expdate=  $scope.getNextDateDiffMonths($scope.productwarranty.purchase_date,$scope.productwarranty.purchase_period);
   

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
  	// model_name: $scope.productwarranty.model_name,
  	serial_no: $scope.productwarranty.serial_no,
  	purchase_date: $scope.productwarranty.purchase_date,
  	expirydate:  $scope.expdate,
  	purchase_location:{
  		city:$scope.purchase_location.city,
  		country:$scope.purchase_location.country
  	} ,
   	userid:$rootScope.usersession.currentUser.userid,
  	description: $scope.productwarranty.description,
  	disclaimer: $scope.productwarranty.disclaimer ,
  	coverage: $scope.productwarranty.coverage ,
  	warranty_type:	$scope.productwarranty.type

  }
 };


   
 };

 $scope.addWarranty = function (editStatus) {
 isLoggedin.checkUserSession(
 function (successData) {

  if(successData.error){
   $scope.handleUploadError(successData.error);
  } 

 else{
  if($scope.form.WarrantyForm.$invalid){
      $scope.form.WarrantyForm.submitted=true;
    }
    else{
  $scope.getNewWarrantyData();
  $log.debug( $scope.newWarranty);

  if($scope.isValidImage==true){
      $scope.socket.emit('addWarranty', $rootScope.usersession.currentUser.userid, $scope.newWarranty.warrantydata,$scope.file_data);
      $log.debug("data emitted");
     
  }
  else{
  	$log.debug("Upload invoice image");
    $rootScope.ProdoAppMessage("Invoice is mandatory. Please upload the scanned image , digital or pdf of invoice...", 'error');
   }


  // WarrantyService.add_warranty.addWarrantyDetail(
  // 	{
  // 		userid:$rootScope.usersession.currentUser.userid
  // 	},
  // 	$scope.newWarranty,function(success){
  // 		if(success.success){
  // 	     $scope.handleAddWarrantySuccess(success);
  // 		}
  //      else if(success.error){
  //      	 $scope.handleAddWarrantyError(success.error);
  //      }

  // 	},function(error){
  //     $log.debug(error);
  // 	});
   }
 }
 }); 

};

  $scope.handleUpdateWarrantySuccess=function(success){
    if(success.success){
      $rootScope.ProdoAppMessage("Warranty updated successfully", 'success');
    	$log.debug(success.success);
      $scope.disableEditorFeatureUpdate ();
      $scope.newWarranty_Responsewarranty_id= $scope.warranty.warranty_id;
      $state.reload();
      // $scope.changeWarranty($scope.newWarranty_Responsewarranty_id)
      // $scope.getWarranty($scope.newWarranty_Responsewarranty_id);//pass warranty id here from success response
    }
   };
 
 $scope.handleUpdateWarrantyError=function(error){

 	if(error.code=='AL001'){
     $rootScope.showModal();
    }
    else{
       $scope.enableEditorFeatureUpdate ();
     $log.debug(error.message);
    }
 };

  $scope.org_l={
    orgnamefromUser:'',
    orgidfromUser:''
  };
  $scope.product_l={
   productnamefromUser:'',
   productidfromUser:''
  };
   $scope.updatedWarranty={};

$scope.getOrgProductDetailsForUpdate=function(){
 


 if($scope.warranty.orgname.name){
    $scope.org_l.orgnamefromUser=$scope.warranty.orgname.name;
    $scope.org_l.orgidfromUser=$scope.warranty.orgname.orgid;
  }
  else{
    $scope.org_l.orgnamefromUser=$scope.warranty.orgname;
    $scope.org_l.orgidfromUser="";
  }
  if($scope.warranty.name.name){
      $scope.product_l.productnamefromUser=$scope.warranty.name.name;
     $scope.product_l.productidfromUser=$scope.warranty.name.prodle;
  }
  else{
         $scope.product_l.productnamefromUser=$scope.warranty.name;
         $scope.product_l.productidfromUser="";
  } 

for(i=0; i<$scope.allOrgNames.length-1; i++){
   if($scope.warranty.orgname==$scope.allOrgNames[i].name){
      $scope.org_l.orgnamefromUser=$scope.allOrgNames[i].name;
      $scope.org_l.orgidfromUser=$scope.allOrgNames[i].orgid;
   }
}

for(i=0; i<$scope.allProductNames.length-1; i++){
   if($scope.warranty.name==$scope.allProductNames[i].name){
       $scope.product_l.productnamefromUser=$scope.allProductNames[i].name;
     $scope.product_l.productidfromUser=$scope.allProductNames[i].prodle;
     }
}
  

 $scope.updatedWarranty={
  warrantydata: {
    orgname:$scope.org_l.orgnamefromUser,
    orgid: $scope.org_l.orgidfromUser,
    name:  $scope.product_l.productnamefromUser,
    prodle: $scope.product_l.productidfromUser,
    model_no: $scope.warranty.model_no,
    // model_name: $scope.warranty.model_name,
    serial_no: $scope.warranty.serial_no,
    purchase_date: $scope.warranty.purchase_date,
    expirydate:  $scope.warranty.expirydate,
    purchase_location:{
      city:$scope.warranty.purchase_location.city,
      country:$scope.warranty.purchase_location.country
    } ,
    description: $scope.warranty.description,
    disclaimer: $scope.warranty.disclaimer ,
    coverage: $scope.warranty.coverage ,
    warranty_type:  $scope.warranty.warranty_type

  }
  };



};


$scope.updateWarranty=function(){

$log.debug($scope.warranty);
  if($scope.form.WarrantyFormUpdate.$invalid){
      $scope.form.WarrantyFormUpdate.submitted=true;
    }
    else{

$scope.getOrgProductDetailsForUpdate();

 
 $log.debug($scope.updatedWarranty);

  WarrantyService.update_warranty.updateWarranty(
   {
     userid:$rootScope.usersession.currentUser.userid,
     warrantyid:$scope.warranty.warranty_id
   },  $scope.updatedWarranty,
   function(success){
     if(success.success){
        $scope.handleUpdateWarrantySuccess(success);
     }
       else if(success.error){
          $scope.handleUpdateWarrantyError(success.error);
       }

   },function(error){
      $log.debug(error);
   });
   }
 };



 $scope.disableEditorFeatureUpdate = function () {
    $scope.editMode.editorEnabledWarrantyUpdate = false;
       $scope.form.WarrantyFormUpdate.submitted=false;
         if($scope.warranty.warranty_id ){
        $scope.getWarranty($scope.warranty.warranty_id);
     }
      
 };

 $scope.enableEditorFeatureUpdate = function () {
  $scope.form.WarrantyFormUpdate.$setPristine();
  $scope.editMode.editorEnabledWarrantyUpdate = true;
  // $rootScope.ProdoAppMessage(" Updating warranty data ", 'success');
   
  };



 $scope.disableEditorFeature = function () {
    $scope.editMode.editorEnabledWarranty = false;
    $scope.form.WarrantyForm.submitted=false;
    if($scope.warranty.warranty_id ){
        $scope.getWarranty($scope.warranty.warranty_id);
     }
    $scope.clearText();
  };

 $scope.enableEditorFeature = function () {

    if($scope.editMode.editorEnabledWarranty == true || $scope.editMode.editorEnabledWarrantyUpdate == true ){
      // $scope.enableProductErrorMsg();
      // ProdERRMsg.innerHTML = "Please add product first then view other products..."; 
         $('#addWarrantyModal').modal('toggle');
      $('#addWarrantyModal').modal('show');

      $('#addWarrantyOkButton').on('click', function (event) {
         $scope.form.WarrantyForm.$setPristine();
         $scope.editMode.editorEnabledWarranty = true;
          $scope.disableEditorFeatureUpdate();
         // $rootScope.ProdoAppMessage("Adding warranty data.....", 'success');       
      });


      //modal code here , if yes clear data and show product if cancel, prev state
    }else{
     $scope.form.WarrantyForm.$setPristine();
     $scope.editMode.editorEnabledWarranty = true;
     // $rootScope.ProdoAppMessage("Adding warranty data.....", 'success');
   }
  };

// upload


 $scope.socket = io.connect(ENV.apiEndpoint + ENV.port + '/api/prodoupload', {
    query: 'session_id=' + $rootScope.usersession.currentUser.sessionid
  });
  //socket connect 

 
  $scope.handleUploadError=function(error){
   $("#bar").hide();
   if(error.code=='AL001'){
        $rootScope.showModal();
      }else{
      $log.debug(error);
      $rootScope.showModal();
    }
  };

$scope.getFile = function (a) {
 isLoggedin.checkUserSession(
 function (successData) {
 if (successData.success == undefined) {
  if(successData.error)
  {
   $scope.handleUploadError(successData.error);
  } 
 }
 else { //add comment

    $scope.progressbar = 0;
    // $log.debug("source: " + $scope.uploadSrc);
    $log.debug("getFile called ... " + a);
    fileReader.readAsBinaryString(a, $scope).then(function (result) {
      $log.debug("reader called ... " + a);
      var action;
      $scope.imageBfr = result;
      $scope.file = a;
      $scope.file_data = {
        filetype: $scope.file.type,
        filename: $scope.file.name,
        filebuffer: $scope.imageBfr
      };
      if (($scope.file.type == 'image/jpg') || ($scope.file.type == 'image/png') || ($scope.file.type == 'image/gif') || ($scope.file.type == 'image/jpeg') || ($scope.file.type == 'application/pdf')) {

   // if ($scope.uploadSrc == "warranty") { // upload product
        if (($scope.file.size / 1024 < 2048)) {
            $scope.isValidImage=true;
            // $scope.form.WarrantyForm.file.$invalid=false;
          } else {
            
             $log.debug( 'Image size must ne less than 2MB');
             $rootScope.ProdoAppMessage("Image size must ne less than 2MB", 'error');       
         
          }
         // }  
     } 
     else{
       $rootScope.ProdoAppMessage("Please upload invoice of correct format ", 'error'); 
     }
  
    });
 
  }
 });  
};

  $scope.socket.removeAllListeners('addWarrantyResponse');
  $scope.socket.on('addWarrantyResponse', function (error, imagelocation) {
   $scope.warrantyResponseHandler(error, imagelocation);
  });


$scope.warrantyResponseHandler=function(error, imagelocation){
	 $scope.disableEditorFeature ();
    // $("#spinner").hide();
 if (error) {
      // $("#bar").hide();
       $scope.enableEditorFeature ();
      if (error.error.code == 'AP003') { // user already exist
        $log.debug(error.error.code + " " + error.error.message);
        $rootScope.ProdoAppMessage(error.error.message, 'error');
        
      } else if (error.error.code == 'AV001') { // user data invalid
        $log.debug(error.error.code + " " + error.error.message);
        $rootScope.ProdoAppMessage(error.error.message, 'error');
       
      } else {
        $log.debug(error.error.message);
        $rootScope.ProdoAppMessage(error.error.message, 'error');
        
      }

    } else {
      
      	     $scope.clearText();
      
      
      $scope.imageSrc = JSON.stringify(imagelocation.success.invoiceimage);
      $log.debug(JSON.stringify(imagelocation.success));
      $log.debug("Emit");
      // var temp1=imagelocation.success.filename.replace(/ /g,'');
      // document.getElementById('check'+temp1).style.color="#01DF74";
      $rootScope.$broadcast("productUploadResponseSuccess", "success");
      // $log.debug("getting response for product upload  " + $scope.imageSrc);
      $rootScope.ProdoAppMessage("Warranty added successfully", 'success');
      $state.reload();
      $scope.newWarranty_Responsewarranty_id= imagelocation.success.warranty_id
      // $scope.changeWarranty($scope.newWarranty_Responsewarranty_id)
      // $scope.getWarranty($scope.newWarranty_Responsewarranty_id);//pass warranty id here from success response
      $scope.counter++;
      $log.debug($scope.counter);
      if ($scope.counter < $scope.fileLength) {
        // $log.debug("emitting image " + $scope.counter);
        //    $scope.getFile($scope.counter);
      } else $scope.counter = 0;

    }

};


// upload


   var cleanupEventwarrantyUploadLogoResponseSuccess = $scope.$on("warrantyUploadLogoResponseSuccess",function(event,message){
       // $log.debug("Listening");
       $scope.newWarranty_Responsewarranty_id= $scope.warranty.warranty_id;
        $scope.OpenInvoiceImage=true;
      $state.reload();
   });











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
}])







angular.module('prodo.WarrantyApp').filter('startFrom', function () {
  return function (input, start) {
    if (input !== undefined || start !== undefined) {
      start = +start;
      return input.slice(start);
    }
  }
})