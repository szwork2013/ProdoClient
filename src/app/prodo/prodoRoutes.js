angular.module('prodo.ProdonusApp')
.config(['$stateProvider', '$urlRouterProvider', '$uiViewScrollProvider', function($stateProvider, $urlRouterProvider, $uiViewScrollProvider) {  
  $urlRouterProvider.rule(function ($injector, $location) {
        var path = $location.path(), normalized = path.toLowerCase();
        if (path != normalized) return normalized;
    });

  $uiViewScrollProvider.useAnchorScroll(); 

  $stateProvider
    .state('prodo', {
      templateUrl: 'prodo/prodo.main.container.html',
      url: '',
      abstract: true
    })

    /* ----Landing Routes---- */
    .state('prodo.landing', {
      abstract: true,
      templateUrl: 'user/views/user.registration.container.html',
      controller:'ProdoMarketingController',
      resolve: {
        marketingData: function(UserService, $rootScope) {
          console.log('marketing data..');
          var n = UserService.marketing.getMarketingData().$promise;
          console.log(n);
          return n;
        } 
      }
    })    
    .state('prodo.landing.signup', {
      views: {
        'marketing' : {
          templateUrl:  'prodo/landing/views/prodo.home.marketing.tpl.html'
        },
        'signup-signin' : {
          templateUrl:  'user/views/user.signup.tpl.html'
        }
      }
    }) 
    .state('prodo.landing.signin', {
      views: {
        'marketing' : {
          templateUrl:  'prodo/landing/views/prodo.home.marketing.tpl.html'
        },
        'signup-signin' : {
          templateUrl:  'user/views/user.signin.tpl.html'
        }
      }
    })
    .state('prodo.landing.forgotpassword', {
      views: {
        'marketing' : {
          templateUrl:  'prodo/landing/views/prodo.home.marketing.tpl.html'
        },
        'signup-signin' : {
          templateUrl:  'user/views/user.signin.forgotpassword.tpl.html',
          controller: 'UserSigninController'
        }
      }
    })
    .state('prodo.landing.resetpassword', {
      views: {
        'marketing' : {
          templateUrl:  'prodo/landing/views/prodo.home.marketing.tpl.html'
        },
        'signup-signin' : {
          templateUrl:  'user/views/user.signin.resetpassword.tpl.html',
          controller: 'UserSigninController'
        }
      }
    })

    /* ----User Account Routes---- */
    .state('prodo.account-user', {
      abstract: true,
      templateUrl: 'user/views/user.account.settings.container.html',
      resolve : {
        checkIfSessionExist: function(UserService, $rootScope) {
            return UserService.Is_user_loggedin.checkUserSession().$promise;
        } 
      },
      onEnter: function(UserSessionService, checkIfSessionExist, $state){
        if (checkIfSessionExist.success) {
          if (checkIfSessionExist.success.user.prodousertype == 'business' && checkIfSessionExist.success.user.org == undefined) {
            $state.transitionTo('prodo.orgregistration.company');
          } else if (checkIfSessionExist.success.user.isOtpPassword) {
            $state.transitionTo('prodo.landing.resetpassword');
          } 
        }
      }
    })    
    .state('prodo.account-user.user', {
      templateUrl:  'user/views/user.account.settings.tpl.html',
      controller: 'UserAccountController',
      resolve: {
          UserService: 'UserService',
          userdata: function(UserService, $rootScope) {
            return UserService.user_data.getUserSettings({userid: $rootScope.usersession.currentUser.userid}).$promise;
          }
        }
    })

    /* ----User Content Routes---- */
    .state('prodo.user-content', {
      url: '/user',
      abstract: true,
      templateUrl: 'user/views/user.content.container.html'
    }) 
    .state('prodo.user-content.emailverification', {
      url: '/verification',
      templateUrl: 'user/views/user.signup.verification.tpl.html',
      controller: 'UserRegistrationController'
    })  
    .state('prodo.user-content.activateaccount', {
      url: '/activateaccount',
      templateUrl: 'user/views/user.signup.activateaccount.tpl.html',
      controller: 'UserRegistrationController'
    }) 
    .state('prodo.user-content.regeneratetoken', {
      url: '/regeneratetoken',
      templateUrl: 'user/views/user.signup.regeneratetoken.tpl.html',
      controller: 'UserRegistrationController'
    })        
    .state('prodo.user-content.otp', {
      url: '/otp',
      templateUrl: 'user/views/user.signin.forgotpassword.otp.tpl.html',
      controller: 'UserSigninController'
    })
    .state('prodo.user-content.reactivate', {
      url: '/reactivate',
      templateUrl: 'user/views/user.signup.reactivate.tpl.html',
      controller: 'UserRegistrationController'
    })
    .state('prodo.user-content.activaterequest', {
      url: '/activaterequest',
      templateUrl: 'user/views/user.signup.activaterequestsent.tpl.html',
      controller: 'UserRegistrationController'
    })

    /* ----Footer Content Routes---- */
    .state('prodo.footer-content', {
      abstract: true,
      templateUrl: 'prodo/landing/views/prodo.footer.content.container.html'
    })    
    .state('prodo.footer-content.aboutus',{ 
      templateUrl: 'prodo/landing/views/prodo.aboutus.tpl.html' 
    })
    .state('prodo.footer-content.terms', {
      templateUrl: 'prodo/landing/views/prodo.general.terms.tpl.html' 
    })
    .state('prodo.footer-content.privacy',{ 
      templateUrl: 'prodo/landing/views/prodo.privacy.tpl.html'
    })
    .state('prodo.footer-content.business',{ 
      templateUrl: 'prodo/landing/views/prodo.business.tpl.html'
    })
    .state('prodo.footer-content.advertising', {
      templateUrl: 'prodo/landing/views/prodo.advertising.tpl.html'
    })
    .state('prodo.footer-content.application', {
      templateUrl: 'prodo/landing/views/prodo.application.tpl.html' 
    })
    .state('prodo.footer-content.support', {
      templateUrl: 'prodo/landing/views/prodo.support.tpl.html'
    })
    .state('prodo.footer-content.contactus', {
      templateUrl: 'prodo/landing/views/prodo.contactus.tpl.html'
    })

    /* ----Organization wizard Routes---- */
    .state('prodo.orgregistration', {
      templateUrl: 'org/orgregistration/views/orgregistration.container.html',
      abstract: true,
      resolve : {
        OrgService: 'OrgService',
        industrycategorydata: function(OrgService, $rootScope) {
          return  OrgService.GetOrg_Industry_Category.getAllIndustryCategory().$promise;
        }
      }
    })
    .state('prodo.orgregistration.company', {
      controller: 'OrgRegistrationController',
      templateUrl: 'org/orgregistration/views/orgregistration.company.tpl.html'
    }) 
    .state('prodo.orgregistration.address', {
      controller: 'OrgRegistrationController',
        templateUrl:  'org/orgregistration/views/orgregistration.address.tpl.html'
    })
    .state('prodo.orgregistration.groupuser', {
      controller: 'OrgRegistrationController',
        templateUrl: 'org/orgregistration/views/orgregistration.groupusers.tpl.html'
    })     
    .state('prodo.orgregistration.terms', {
      controller: 'OrgRegistrationController',
        templateUrl: 'org/orgregistration/views/orgregistration.terms.tpl.html'
    })        
    .state('prodo.orgregistration.finish', {
      controller: 'OrgRegistrationController',
        templateUrl: 'org/orgregistration/views/orgregistration.finish.tpl.html'
    })

     /* ----Organization Account Routes---- */
    .state('prodo.account-org', {
      abstract: true,
      templateUrl: 'org/manageorg/views/org.account.settings.container.html',
      resolve : {
        checkIfSessionExist: function(UserService, $rootScope) {
            return UserService.Is_user_loggedin.checkUserSession().$promise;
        } 
      },
      onEnter: function(UserSessionService, checkIfSessionExist, $state){
        if (checkIfSessionExist.success) {
          if (checkIfSessionExist.success.user.prodousertype == 'business' && checkIfSessionExist.success.user.org == undefined) {
            $state.transitionTo('prodo.orgregistration.company');
          } else if (checkIfSessionExist.success.user.isOtpPassword) {
            $state.transitionTo('prodo.landing.resetpassword');
          } 
        }
      }
    })    
    .state('prodo.account-org.org', {
      templateUrl:  'org/manageorg/views/org.account.settings.tpl.html',
      abstract: true
    })
    /* ----Organization Account Nested Routes---- */
    .state('prodo.account-org.org.detail', {
       templateUrl:  'org/manageorg/views/org.wall.orgDetails.tpl.html',
       controller: 'OrgAccountController',
       resolve: {
          OrgService: 'OrgService',
          currentorgdata: function(OrgService, $rootScope) {
            return  OrgService.org_data.getOrgSettings({orgid: $rootScope.usersession.currentUser.org.orgid}).$promise;
          },
          currentorgaddr: function(OrgService, $rootScope) {
            return  OrgService.ManageOrgLocation.getAllOrgAddress({orgid: $rootScope.usersession.currentUser.org.orgid}).$promise;
          },
          currentorgproduct: function(OrgService, $rootScope) {
            return  OrgService.GetOrgProducts.getAllOrgProducts({orgid: $rootScope.usersession.currentUser.org.orgid}).$promise;
          },
          currentorggroup: function(OrgService, $rootScope) {
            return OrgService.GetOrgGroupMembers.getGroupDetails({orgid: $rootScope.usersession.currentUser.org.orgid}).$promise;
          }
        }
      }) 
    .state('prodo.account-org.org.broadcast', {
       templateUrl:  'org/manageorg/views/org.wall.orgBroadcast.tpl.html',
       controller: 'ManageOrgBroadcastController',
       resolve: {
          OrgService: 'OrgService',
          getBroadcastData: function(OrgService, $rootScope) {
            return OrgService.GetOrg_Broadcast_Messages.getOrgBroadcastMessage({orgid: $rootScope.usersession.currentUser.org.orgid}).$promise;
          }
       }
      })
    .state('prodo.account-org.org.Productdetail', {
       templateUrl:  'product/views/prodo.wall.productFeatures.tpl.html',
       controller: 'ManageProductController',
       resolve: {
          OrgService: 'OrgService',
          allproductdata: function(OrgService, $rootScope) {
          return OrgService.GetOrgProducts.getAllOrgProducts({orgid: $rootScope.usersession.currentUser.org.orgid}).$promise;
           
          },
           allproductCategories: function(CategoryTags, $rootScope) {
           return CategoryTags.getCategoryTags().$promise;
        }
      }
      })

    /* ----ProdoHome Wall Routes---- */
    .state('prodo.home', {
      resolve: {
        orgdata: function(OrgService, $rootScope) {
          return OrgService.org_data.getOrgSettings({orgid: $rootScope.orgid}).$promise;
        },
        orgaddr: function(OrgService, $rootScope) {
          return OrgService.ManageOrgLocation.getAllOrgAddress({orgid: $rootScope.orgid}).$promise;
        },
        orgproduct: function(OrgService, $rootScope) {
          return OrgService.GetOrgProducts.getAllOrgProducts({orgid: $rootScope.orgid}).$promise;
        },
        productData: function(ProductService, orgproduct, $rootScope) {
          if (orgproduct.success) {
            var prodle = orgproduct.success.product[0].prodle;
            return ProductService.getProduct({orgid: $rootScope.orgid, prodle: prodle}).$promise;
          } else {
            var product = 'no product available';
            return orgproduct;
          }
          
        },
        broadcastData: function(OrgService, $rootScope) {
            return OrgService.GetOrg_Broadcast_Messages.getOrgBroadcastMessage({orgid: $rootScope.orgid}).$promise;
        },
        checkIfSessionExist: function(UserService, $rootScope) {
            return UserService.Is_user_loggedin.checkUserSession().$promise;
        } 
      },
      controller: 'ProdoWallController',
      onEnter: function(UserSessionService, checkIfSessionExist, $state){
        if (checkIfSessionExist.success) {
          if (checkIfSessionExist.success.user.prodousertype == 'business' && checkIfSessionExist.success.user.org == undefined) {
            $state.transitionTo('prodo.orgregistration.company');
          } else if (checkIfSessionExist.success.user.isOtpPassword) {
            $state.transitionTo('prodo.landing.resetpassword');
          } 
        }
      },
      templateUrl: 'prodo/home/views/prodo.container.html',
      abstract: true

    })    
    .state('prodo.home.wall-org', {
      views: {
        'prodo-content' : {
          templateUrl:  'org/manageorg/views/prodo.wall.org.tpl.html',
          controller: 'ProdoWallOrgController',
        },
        'prodo-advertisment' : {
          templateUrl:  'prodo/home/views/prodo.wall.advertisment.tpl.html'
        }
      }
    })    
    .state('prodo.home.wall-product', {
      resolve: {
        productData: function(ProductService, $rootScope) {
          return ProductService.getProduct({orgid: $rootScope.orgid, prodle: $rootScope.product_prodle}).$promise;
        }
      },
      views: {
        'prodo-content' : {
          templateUrl:  'product/views/prodo.wall.productTabs.tpl.html',
          controller: 'ProductController'
        },
        'prodo-advertisment' : {
          templateUrl:  'prodo/home/views/prodo.wall.advertisment.tpl.html'
        }
      }
    }) 
   .state('prodo.home.wall-warranty', {
      resolve: {
        warrantydata: function(WarrantyService, $rootScope) {
          return WarrantyService.get_latest5warranties.getLatestWarrantyDetails({userid: $rootScope.usersession.currentUser.userid}).$promise;
        }
      },
      views: {
        'prodo-content' : {
          templateUrl:  'warranty/views/prodo.wall.warranty.tpl.html',
          controller: 'ProdoWallWarrantyController',
        },
        'prodo-advertisment' : {
          templateUrl:  'prodo/home/views/prodo.wall.advertisment.tpl.html'
        }
      }
    }) 
    .state('prodo.home.wall-campaign', {
      views: {
        'prodo-content' : {
          templateUrl:  'campaign/views/prodo.wall.campaign.tpl.html',
          controller: 'ProdoWallCampaignController',
        },
        'prodo-advertisment' : {
          templateUrl:  'prodo/home/views/prodo.wall.advertisment.tpl.html'
        }
      }
    }) 
    .state('prodo.home.wall-blog', {
      views: {
        'prodo-content' : {
          templateUrl:  'blog/views/prodo.wall.blog.tpl.html'
        },
        'prodo-advertisment' : {
          templateUrl:  'prodo/home/views/prodo.wall.advertisment.tpl.html'
        }
      }
    }) 
    .state('prodo.home.wall-dashboard', {   
      views: {
        'prodo-content' : {
          templateUrl:  'dashboard/views/prodo.wall.dashboard.tpl.html',
          controller: 'ProdoDashboardController'
        },
        'prodo-advertisment' : {
          templateUrl:  'prodo/home/views/prodo.wall.advertisment.tpl.html'
        }
      } 
    })

    /* ----Warranty Account Routes---- */
    .state('prodo.account-warranty', {
      abstract: true,
      templateUrl: 'warranty/views/warranty.account.settings.container.html',
      resolve : {
        checkIfSessionExist: function(UserService, $rootScope) {
            return UserService.Is_user_loggedin.checkUserSession().$promise;
        } 
      },
      onEnter: function(UserSessionService, checkIfSessionExist, $state){
        if (checkIfSessionExist.success) {
          if (checkIfSessionExist.success.user.prodousertype == 'business' && checkIfSessionExist.success.user.org == undefined) {
            $state.transitionTo('prodo.orgregistration.company');
          } else if (checkIfSessionExist.success.user.isOtpPassword) {
            $state.transitionTo('prodo.landing.resetpassword');
          } 
        }
      }
    })    
    .state('prodo.account-warranty.warranty', {
            resolve: {
        orgnameData: function(OrgnameService, $rootScope) {
          return OrgnameService.getOrgname().$promise;
        }
        ,
        productnameData: function(ProductnameService, $rootScope) {
          return ProductnameService.getProductname().$promise;
        },
         warrantydata: function(WarrantyService, $rootScope) {
          return WarrantyService.get_allwarranties.getAllWarrantyDetails({userid: $rootScope.usersession.currentUser.userid}).$promise;
        }
      },
      templateUrl:  'warranty/views/warranty.account.settings.tpl.html'
    })
    /* ----Warranty Account Nested Routes---- */
    .state('prodo.account-warranty.warranty.detail', {
       templateUrl:  'warranty/views/warranty.account.details.tpl.html',
      controller: 'ManageWarrantyController'
    }) 
    .state('prodo.account-warranty.warranty.request', {
       templateUrl:  'warranty/views/warranty.account.service.request.tpl.html'
    })

    /* ----campaign Account Routes---- */
    .state('prodo.account-campaign', {
      abstract: true,
      templateUrl: 'campaign/views/campaign.account.settings.container.html',
      resolve : {
        checkIfSessionExist: function(UserService, $rootScope) {
            return UserService.Is_user_loggedin.checkUserSession().$promise;
        }
      },
      onEnter: function(UserSessionService, checkIfSessionExist, $state){
        if (checkIfSessionExist.success) {
          if (checkIfSessionExist.success.user.prodousertype == 'business' && checkIfSessionExist.success.user.org == undefined) {
            $state.transitionTo('prodo.orgregistration.company');
          } else if (checkIfSessionExist.success.user.isOtpPassword) {
            $state.transitionTo('prodo.landing.resetpassword');
          } 
        }
      }
    })    
    .state('prodo.account-campaign.campaign', {
      templateUrl:  'campaign/views/campaign.account.settings.tpl.html',
      resolve : {
            currentorgproducts: function(OrgService, $rootScope) {
            return  OrgService.GetOrgProducts.getAllOrgProducts({orgid: $rootScope.usersession.currentUser.org.orgid}).$promise;
          },
            campaigndata: function(getAllCampaigns, $rootScope){
            return getAllCampaigns.Product.getCampaignDetails({orgid:$rootScope.usersession.currentUser.org.orgid}).$promise;
          }
        },
      controller: 'ManageCampaignController'
    })
    /* ----campaign Account Nested Routes---- */
    .state('prodo.account-campaign.campaign.detail', {
       templateUrl:  'campaign/views/campaign.account.details.tpl.html'
      }) 
    .state('prodo.account-campaign.campaign.analytics', {
       templateUrl:  'campaign/views/campaign.account.analytics.tpl.html'
      })
 
  }]);
