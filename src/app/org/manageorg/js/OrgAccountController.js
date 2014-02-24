angular.module('prodo.OrgApp')
 .controller('OrgAccountController', ['$scope', '$rootScope', '$state', '$http', '$timeout', '$log', 'growl', 'UserSessionService', 'OrgRegistrationService', function($scope, $rootScope, $state, $http, $timeout, $log, growl, UserSessionService, OrgRegistrationService) {

    $scope.org = OrgRegistrationService.currentOrgData;
    $scope.hasBroadcast = false;
    // $scope.orgaddr = OrgRegistrationService.currentOrgAdd;
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

    var cleanupEventGetOrgAddData = $rootScope.$on("getOrgAddData", function(event, data){
        $scope.orgaddr = data;
        cleanupEventGetOrgAddData();  
    });
    
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
        $scope.orggeneralsettingchange = 'Please pass valid data';
      }
        var cleanupEventUpdateOrgDone = $scope.$on("updateOrgDone", function(event, message){
          $scope.handleUpdateOrgResponse(message);
          cleanupEventUpdateOrgDone();  
        });
        var cleanupEventUpdateOrgNotDone = $scope.$on("updateOrgNotDone", function(event, message){
          growl.addErrorMessage("Server Error:" + message);
          cleanupEventUpdateOrgNotDone();     
        });
  
    }

    // function to handle server side responses
    $scope.handleOrgAddressResponse = function(data){
      if (data.success) {
        OrgRegistrationService.updateOrgAdd(data.success.orgaddress);
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



    $scope.getOrgAddress = function() {
      OrgRegistrationService.getAllOrgAddress();
      var cleanupEventGetOrgAddressDone = $scope.$on("getOrgAddressDone", function(event, message){
        $scope.handleOrgAddressResponse(message);
        cleanupEventGetOrgAddressDone();   
      });
      var cleanupEventGetOrgAddressNotDone = $scope.$on("getOrgAddressNotDone", function(event, message){
        $scope.showAlert('alert-danger', "Server Error:" + message);
        cleanupEventGetOrgAddressNotDone();      
      });
  
    }

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
      var cleanupEventAddOrgAddressDone = $scope.$on("addOrgAddressDone", function(event, message){
        $scope.handleAddOrgAddressResponse(message);
        cleanupEventAddOrgAddressDone();   
      });
      var cleanupEventAddOrgAddressNotDone = $scope.$on("addOrgAddressNotDone", function(event, message){
        $scope.showAlert('alert-danger', "Server Error:" + message);
        cleanupEventAddOrgAddressNotDone();      
      });
  
    }

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
      var cleanupEventUpdateOrgAddressDone = $scope.$on("updateOrgAddressDone", function(event, message){
        $scope.handleUpdateOrgAddressResponse(message); 
        cleanupEventUpdateOrgAddressDone();  
      });
      var cleanupEventUpdateOrgAddressNotDone = $scope.$on("updateOrgAddressNotDone", function(event, message){
        $scope.showAlert('alert-danger', "Server Error:" + message); 
        cleanupEventUpdateOrgAddressNotDone();     
      });
    }

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
      var cleanupEventDeleteOrgDone = $scope.$on("deleteOrgDone", function(event, message){
        $scope.handleDeleteOrgResponse(message);
        cleanupEventDeleteOrgDone();   
      });
      var cleanupEventDeleteOrgNotDone = $scope.$on("deleteOrgNotDone", function(event, message){
        $scope.showAlert('alert-danger', "Server Error:" + message);
        cleanupEventDeleteOrgNotDone();  
      });
  
    }

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
      var cleanupEventDeleteOrgAddressDone = $scope.$on("deleteOrgAddressDone", function(event, message){
        $scope.handleDeleteOrgResponse(message);   
        cleanupEventDeleteOrgAddressDone();
      });
      var cleanupEventDeleteOrgAddressNotDone = $scope.$on("deleteOrgAddressNotDone", function(event, message){
        $scope.showAlert('alert-danger', "Server Error:" + message);   
        cleanupEventDeleteOrgAddressNotDone();
      });
  
    }

    // function to handle server side responses
    $scope.handleGetOrgProductResponse = function(data){
      if (data.success) {
        console.log(data.success);
        $scope.productlist = data.success.product;
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


    $scope.getproduct = function() {
      OrgRegistrationService.getAllProducts();
      var cleanupEventGetOrgProductDone = $scope.$on("getOrgProductDone", function(event, message){
        $scope.handleGetOrgProductResponse(message);
        cleanupEventGetOrgProductDone();   
      });
      var cleanupEventGetOrgProductNotDone = $scope.$on("getOrgProductNotDone", function(event, message){
        $scope.showAlert('alert-danger', "Server Error:" + message);
        cleanupEventGetOrgProductNotDone();      
      });
  
    }


    // function to handle server side responses
    $scope.handleGetOrgGroupResponse = function(data){
      if (data.success) {
        console.log(data.success);
        $scope.groups = data.success.usergrp;
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


    $scope.getGroupMembers = function() {
        OrgRegistrationService.getAllGroups();
        var cleanupEventGetOrgGroupDone = $scope.$on("getOrgGroupDone", function(event, message){
          $scope.handleGetOrgGroupResponse(message);
          cleanupEventGetOrgGroupDone();   
        });
        var cleanupEventGetOrgGroupNotDone = $scope.$on("getOrgGroupNotDone", function(event, message){
          growl.addErrorMessage("Server Error:" + message);
          cleanupEventGetOrgGroupNotDone();      
        });
  
    }

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
      var cleanupEventDeleteOrgGroupMemberDone = $scope.$on("deleteOrgGroupMemberDone", function(event, message){
        $scope.handleDeleteOrgGroupMemberResponse(message);
        cleanupEventDeleteOrgGroupMemberDone();   
      });
      var cleanupEventDeleteOrgGroupMemberNotDone = $scope.$on("deleteOrgGroupMemberNotDone", function(event, message){
        $scope.showAlert('alert-danger', "Server Error:" + message);
        cleanupEventDeleteOrgGroupMemberNotDone();      
      });
  
    }

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
      var cleanupEventSendOrgInvitesDone = $scope.$on("sendOrgInvitesDone", function(event, data){
        $scope.handleOrgInviteResponse(data); 
        cleanupEventSendOrgInvitesDone();  
      });
      var cleanupEventSendOrgInvitesNotDone = $scope.$on("sendOrgInvitesNotDone", function(event, data){
        $scope.showAlert('alert-danger', "Server Error:" + data); 
        cleanupEventSendOrgInvitesNotDone();     
      });
    }

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
      var cleanupEventSendOrgCustomerInvitesDone = $scope.$on("sendOrgCustomerInvitesDone", function(event, data){
        $scope.handleOrgCustomerInviteResponse(data); 
        cleanupEventSendOrgCustomerInvitesDone();  
      });
      var cleanupEventSendOrgCustomerInvitesNotDone = $scope.$on("sendOrgCustomerInvitesNotDone", function(event, data){
        $scope.showAlert('alert-danger', "Server Error:" + data); 
        cleanupEventSendOrgCustomerInvitesNotDone();     
      });
    }


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
        $scope.orggroupinvitesettingchange = 'Please pass valid data';
      }
      
      var cleanupEventSendOrgGroupInvitesDone = $scope.$on("sendOrgGroupInvitesDone", function(event, data){
        $scope.handleOrgGroupInviteResponse(data); 
        cleanupEventSendOrgGroupInvitesDone();  
      });
      var cleanupEventSendOrgGroupInvitesNotDone = $scope.$on("sendOrgGroupInvitesNotDone", function(event, data){
        growl.addErrorMessage("Server Error:" + message); 
        cleanupEventSendOrgGroupInvitesNotDone();     
      });
    }

$scope.getOrgAddress();
    $scope.getproduct();

}]);
 