angular.module('prodo.OrgApp')
 .controller('OrgAccountController', ['$scope', '$rootScope', '$state', '$http', '$timeout', '$log', 'growl', 'UserSessionService', 'OrgRegistrationService', 'OrgService', 'currentorgdata', 'currentorgaddr', 'currentorgproduct', 'currentorggroup', function($scope, $rootScope, $state, $http, $timeout, $log, growl, UserSessionService, OrgRegistrationService, OrgService, currentorgdata, currentorgaddr, currentorgproduct, currentorggroup) {
    $scope.productlist = [];
    $scope.hasBroadcast = false;
    $scope.editorEnabled = false;
    $scope.form = {};
  
    $scope.enableEditor = function() {
      $scope.editorEnabled = true;
    };
  
    $scope.disableEditor = function() {
      $scope.editorEnabled = false;
      $scope.orggeneralsettingchange = '';
    };


    /***
    // Organisation Manage Account Settings function definitions
    ***/
    if (currentorgproduct.error) {
      console.log('no product available');
    } else {
      $scope.productlist = currentorgproduct.success.product;
    }
    $scope.org = currentorgdata.success.organization;
    
    $scope.groups = currentorggroup.success.usergrp;
    $scope.orgaddr = currentorgaddr.success.orgaddress;
    OrgRegistrationService.updateOrgData(currentorgdata.success.organization);
    
    $scope.password = '';
    $scope.jsonOrgAccountData = function()
      {
        var orgData = 
          {
            organization:
            {
            'name' : $scope.org.name,
            'description' : $scope.org.description,
            'password': $scope.password
            }
          };
        return JSON.stringify(orgData); 
      }
     

    // function to handle server side responses
    $scope.handleUpdateOrgResponse = function(data){
      if (data.success) {

        growl.addSuccessMessage(data.success.message);
      } else {
        if (data.error.code== 'AU004') {     // enter valid data
            $log.debug(data.error.code + " " + data.error.message);
            growl.addErrorMessage(data.error.message);
        } else {
            $log.debug(data.error.message);
            growl.addErrorMessage(data.error.message);
        }
      }
    };  

    $scope.updateOrgAccount = function() {
      if ($scope.form.orggeneralsettingform.$valid) {
        $scope.disableEditor();
        OrgRegistrationService.saveOrgSettings($scope.jsonOrgAccountData());
      } else {
        $scope.orggeneralsettingchange = 'Please enter valid data';
      }  
    }
    var cleanupEventUpdateOrgDone = $scope.$on("updateOrgDone", function(event, message){
      $scope.handleUpdateOrgResponse(message);    
    });
    var cleanupEventUpdateOrgNotDone = $scope.$on("updateOrgNotDone", function(event, message){
      growl.addErrorMessage("Server Error:" + message);    
    });    

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
              'contacts': 
                    [ 
                      {'customerhelpline' : $scope.org.contact.customerhelpline1 },
                      {'customerhelpline' : $scope.org.contact.customerhelpline2 },
                      {'customerhelpline' : $scope.org.contact.customerhelpline3 }
                    ],
              'locationtype': $scope.org.orgaddresstype
            }
          }
        return JSON.stringify(orgAddData); 
      }


    // function to handle server side responses
    $scope.handleAddOrgAddressResponse = function(data){
      if (data.success) {

        $scope.showAlert('alert-success', data.success.message);   
      } else {
        if (data.error.code== 'AU004') {     // enter valid data
            $log.debug(data.error.code + " " + data.error.message);
            $scope.showAlert('alert-danger', data.error.message);
        } else {
            $log.debug(data.error.message);
            $scope.showAlert('alert-danger', data.error.message);
        }
      }
    };  


    $scope.addOrgAddress = function() {
      OrgRegistrationService.saveOrgAddress($scope.jsonOrgAddressData());
    }
    var cleanupEventAddOrgAddressDone = $scope.$on("addOrgAddressDone", function(event, message){
      $scope.handleAddOrgAddressResponse(message);  
    });
    var cleanupEventAddOrgAddressNotDone = $scope.$on("addOrgAddressNotDone", function(event, message){
      $scope.showAlert('alert-danger', "Server Error:" + message);     
    });

    // function to handle server side responses
    $scope.handleUpdateOrgAddressResponse = function(data){
      if (data.success) {

        $scope.showAlert('alert-success', data.success.message);   
      } else {
        if (data.error.code== 'AU004') {     // enter valid data
            $log.debug(data.error.code + " " + data.error.message);
            $scope.showAlert('alert-danger', data.error.message);
        } else {
            $log.debug(data.error.message);
            $scope.showAlert('alert-danger', data.error.message);
        }
      }
    };  


    $scope.updateAddress = function(addressId) {
      console.log($scope.jsonOrgAddressData());
      OrgRegistrationService.updateOrgAddress($scope.jsonOrgAddressData(), addressId);
    }
    var cleanupEventUpdateOrgAddressDone = $scope.$on("updateOrgAddressDone", function(event, message){
      $scope.handleUpdateOrgAddressResponse(message); 
    });
    var cleanupEventUpdateOrgAddressNotDone = $scope.$on("updateOrgAddressNotDone", function(event, message){
      $scope.showAlert('alert-danger', "Server Error:" + message);     
    });    

    // function to handle server side responses
    $scope.handleDeleteOrgResponse = function(data){
      if (data.success) {
        $scope.showAlert('alert-success', data.success.message);   
      } else {
          $log.debug(data.error.message);
          $scope.showAlert('alert-danger', data.error.message);
        }
    };

    $scope.deleteOrgAccount = function() {
      OrgRegistrationService.removeOrgSettings();
    }
    var cleanupEventDeleteOrgDone = $scope.$on("deleteOrgDone", function(event, message){
      $scope.handleDeleteOrgResponse(message); 
    });
    var cleanupEventDeleteOrgNotDone = $scope.$on("deleteOrgNotDone", function(event, message){
      $scope.showAlert('alert-danger', "Server Error:" + message);
    });    

    // function to handle server side responses
    $scope.handleDeleteOrgAddressResponse = function(data){
      if (data.success) {
        $scope.showAlert('alert-success', data.success.message);   
      } else {
          $log.debug(data.error.message);
          $scope.showAlert('alert-danger', data.error.message);
        }
    };

    $scope.deleteOrgAddress = function(addressId) {
      OrgRegistrationService.removeOrgAddress(addressId);
    }
    var cleanupEventDeleteOrgAddressDone = $scope.$on("deleteOrgAddressDone", function(event, message){
      $scope.handleDeleteOrgResponse(message);   
    });
    var cleanupEventDeleteOrgAddressNotDone = $scope.$on("deleteOrgAddressNotDone", function(event, message){
      $scope.showAlert('alert-danger', "Server Error:" + message);   
    });

    // function to handle server side responses
    $scope.handleDeleteOrgGroupMemberResponse = function(data){
      if (data.success) {
        console.log(data.success.message);
        $scope.showAlert('alert-success', data.success.message);   
      } else {
        if (data.error.code== 'AU004') {     // enter valid data
            $log.debug(data.error.code + " " + data.error.message);
            $scope.showAlert('alert-danger', data.error.message);
        } else {
            $log.debug(data.error.message);
            $scope.showAlert('alert-danger', data.error.message);
        }
      }
    };

    $scope.deleteGroupMember = function(grpid, userid) {
      OrgRegistrationService.deleteMember(grpid, userid); 
    }
    var cleanupEventDeleteOrgGroupMemberDone = $scope.$on("deleteOrgGroupMemberDone", function(event, message){
      $scope.handleDeleteOrgGroupMemberResponse(message);  
    });
    var cleanupEventDeleteOrgGroupMemberNotDone = $scope.$on("deleteOrgGroupMemberNotDone", function(event, message){
      $scope.showAlert('alert-danger', "Server Error:" + message);      
    });    

    $scope.orginvites=[{
                        'name': '',
                        'orgname': '',
                        'email': ''
                      }];

    $scope.addMoreInvites = function() { 
      $scope.orginvites.push({'name': '', 'orgname': '', 'email': ''});
    };

    $scope.jsonOrgInvitesData = function()
      {
        var orgInvite = 
          {
            otherorginvites: $scope.orginvites
          }
        return JSON.stringify(orgInvite); 
      }

    // function to handle server side responses
    $scope.handleOrgInviteResponse = function(data){
      if (data.success) {
        $scope.showAlert('alert-success', data.success.message);   
      } else {
        if (data.error.code== 'AU004') {     // enter valid data
            $log.debug(data.error.code + " " + data.error.message);
            $scope.showAlert('alert-danger', data.error.message);
        } else {
            $log.debug(data.error.message);
            $scope.showAlert('alert-danger', data.error.message);
        }
      }
    };  


    $scope.sendOrgInvites = function() {
      console.log($scope.jsonOrgInvitesData());
      OrgRegistrationService.sendInvites($scope.jsonOrgInvitesData());
    }

    var cleanupEventSendOrgInvitesDone = $scope.$on("sendOrgInvitesDone", function(event, data){
      $scope.handleOrgInviteResponse(data);  
    });
    var cleanupEventSendOrgInvitesNotDone = $scope.$on("sendOrgInvitesNotDone", function(event, data){
      $scope.showAlert('alert-danger', "Server Error:" + data);    
    });

    $scope.customerinvites=[{
                        'name': '',
                        'email': ''
                      }];

    $scope.addCustomerInvites = function() { 
      $scope.customerinvites.push({'name': '', 'email': ''});
    };

    $scope.jsonOrgCustomerInvitesData = function()
      {
        var orgCustomerInvite = 
          {
            orgcustomerinvites: $scope.customerinvites
          }
        return JSON.stringify(orgCustomerInvite); 
      }

    // function to handle server side responses
    $scope.handleOrgCustomerInviteResponse = function(data){
      if (data.success) {

        $scope.showAlert('alert-success', data.success.message);   
      } else {
        if (data.error.code== 'AU004') {     // enter valid data
            $log.debug(data.error.code + " " + data.error.message);
            $scope.showAlert('alert-danger', data.error.message);
        } else {
            $log.debug(data.error.message);
            $scope.showAlert('alert-danger', data.error.message);
        }
      }
    };  


    $scope.orgCustomerInvites = function() {
      console.log($scope.jsonOrgInvitesData());
      OrgRegistrationService.sendCustomerInvites($scope.jsonOrgCustomerInvitesData());
    }

    var cleanupEventSendOrgCustomerInvitesDone = $scope.$on("sendOrgCustomerInvitesDone", function(event, data){
      $scope.handleOrgCustomerInviteResponse(data);   
    });
    var cleanupEventSendOrgCustomerInvitesNotDone = $scope.$on("sendOrgCustomerInvitesNotDone", function(event, data){
      $scope.showAlert('alert-danger', "Server Error:" + data);     
    });    

    $scope.showInvites = false;

    $scope.addInvites = function() {
      $scope.showInvites = true;
    }

    $scope.group = {
                      'grpname': '',
                      'invites': ''
    }

    $scope.jsonOrgGroupInvitesData = function()
      {
        var orgGroupInvite = 
          {
            usergrp:
            {
             'grpname': $scope.group.grpname,
             'invites': $scope.group.invites
            }
          }
        return JSON.stringify(orgGroupInvite); 
      }

    // function to handle server side responses
    $scope.handleOrgGroupInviteResponse = function(data){
      if (data.success) {
        growl.addSuccessMessage(data.success.message);  
      } else {
        if (data.error.code== 'AU004') {     // enter valid data
            $log.debug(data.error.code + " " + data.error.message);
            growl.addErrorMessage(data.error.message);
        } else {
            $log.debug(data.error.message);
            growl.addErrorMessage(data.error.message);
        }
      }
    };  

    $scope.addGroupInvite = function() {
      if ($scope.form.orggroupinvitesform.$valid) {
        $scope.orggroupinvitesettingchange = '';
        OrgRegistrationService.groupInvites($scope.jsonOrgGroupInvitesData());
      } else {
        $scope.orggroupinvitesettingchange = 'Please enter valid data';
      }
    }

    var cleanupEventSendOrgGroupInvitesDone = $scope.$on("sendOrgGroupInvitesDone", function(event, data){
      $scope.handleOrgGroupInviteResponse(data); 
    });
    var cleanupEventSendOrgGroupInvitesNotDone = $scope.$on("sendOrgGroupInvitesNotDone", function(event, data){
      growl.addErrorMessage("Server Error:" + message);           
    });

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
    });
}]);
 