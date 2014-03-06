angular.module('prodo.ProdonusApp')
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {  
  $urlRouterProvider.rule(function ($injector, $location) {
        var path = $location.path(), normalized = path.toLowerCase();
        if (path != normalized) return normalized;
    });

  $stateProvider
    .state('prodo', {
      templateUrl: 'prodo/prodo.main.container.html',
      url: '',
      abstract: true
    })

    /* ----Landing Routes---- */
    .state('prodo.landing', {
      abstract: true,
      templateUrl: 'user/views/user.registration.container.html'
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
      url: '/signin',
      views: {
        'marketing' : {
          templateUrl:  'prodo/landing/views/prodo.home.marketing.tpl.html'
        },
        'signup-signin' : {
          templateUrl:  'user/views/user.signin.tpl.html'
        }
      }
    })

    /* ----User Account Routes---- */
    .state('prodo.account-user', {
      abstract: true,
      templateUrl: 'user/views/user.account.settings.container.html'
    })    
    .state('prodo.account-user.user', {
      templateUrl:  'user/views/user.account.settings.tpl.html',
      controller: 'UserAccountController'
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
    .state('prodo.user-content.forgotpassword', {
      url: '/forgotpassword',
      templateUrl: 'user/views/user.signin.forgotpassword.tpl.html',
      controller: 'UserSigninController'
    })    
    .state('prodo.user-content.resetpassword', {
      url: '/resetpassword',
      templateUrl: 'user/views/user.signin.resetpassword.tpl.html',
      controller: 'UserSigninController'
    }) 
    .state('prodo.user-content.passwordregeneratetoken', {
      url: '/passwordregeneratetoken',
      templateUrl: 'user/views/user.signin.forgotpassword.regeneratetoken.tpl.html',
      controller: 'UserSigninController'
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
      abstract: true
    })
    .state('prodo.orgregistration.company', {
      templateUrl: 'org/orgregistration/views/orgregistration.company.tpl.html',
      controller: 'OrgRegistrationController'
    }) 
    .state('prodo.orgregistration.address', {
        templateUrl:  'org/orgregistration/views/orgregistration.address.tpl.html',
        controller: 'OrgRegistrationController'
    })
    .state('prodo.orgregistration.groupuser', {
        templateUrl: 'org/orgregistration/views/orgregistration.groupusers.tpl.html',
        controller: 'OrgRegistrationController'
    })     
    .state('prodo.orgregistration.terms', {
        templateUrl: 'org/orgregistration/views/orgregistration.terms.tpl.html',
        controller: 'OrgRegistrationController'
    })        
    .state('prodo.orgregistration.finish', {
        templateUrl: 'org/orgregistration/views/orgregistration.finish.tpl.html',
        controller: 'OrgRegistrationController'
    })

     /* ----Organization Account Routes---- */
    .state('prodo.account-org', {
      abstract: true,
      templateUrl: 'org/manageorg/views/org.account.settings.container.html'
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
       templateUrl:  'org/manageorg/views/org.wall.orgBroadcast.tpl.html'
      })
    .state('prodo.account-org.org.Productdetail', {
       templateUrl:  'product/views/prodo.wall.productFeatures.tpl.html',
       controller: 'ProductController'
      })

    /* ----ProdoHome Wall Routes---- */
      .state('prodo.home', {
      templateUrl: 'prodo/home/views/prodo.container.html',
      abstract: true
    })    
    .state('prodo.home.wall', {
      views: {
        'prodo-sidebar' : {
          templateUrl:  'prodo/home/views/prodo.wall.sidebar.tpl.html',
          controller: 'prodoSearchController'
        },
        'prodo-slider' : {
          templateUrl:  'prodo/home/views/prodo.wall.slider.tpl.html'
        },
        'prodo-navbar' : {
          templateUrl:  'prodo/home/views/prodo.wall.navbar.tpl.html'
        },
        'prodo-content' : {
          abstract: true,
          templateUrl:  'prodo/home/views/prodo.wall.content.container.html'
        },
        'prodo-advertisment' : {
          templateUrl:  'prodo/home/views/prodo.wall.advertisment.tpl.html'
        }
      }
    })
    .state('prodo.home.wall.org', { 
       templateUrl:  'org/manageorg/views/prodo.wall.org.tpl.html',
       controller: 'ProdoWallController',
       resolve: {
          orgdata: function(OrgService, $rootScope) {
            return OrgService.org_data.getOrgSettings({orgid: $rootScope.orgid}).$promise;
          },
          orgaddr: function(OrgService, $rootScope) {
            return OrgService.ManageOrgLocation.getAllOrgAddress({orgid: $rootScope.orgid}).$promise;
          },
          orgproduct: function(OrgService, $rootScope) {
            return OrgService.GetOrgProducts.getAllOrgProducts({orgid: $rootScope.orgid}).$promise;
          }
        }
      }) 
    .state('prodo.home.wall.product', {
       templateUrl:  'product/views/prodo.wall.productTabs.tpl.html',
      }) 
     .state('prodo.home.wall.warranty', {
       templateUrl:  'warranty/views/prodo.wall.warrantyTabs.tpl.html',
      }) 
    .state('prodo.home.wall.blog', {
       templateUrl:  'blog/views/prodo.wall.blog.tpl.html',
      }) 
    .state('prodo.home.wall.dashboard', {
      resolve : 
      { 
        dataFromService : function($http) 
         {
            return $http({
                          method: 'GET',
                          url: '/api/trendingproducts'
                        });
         },
      },    
       templateUrl:  'dashboard/views/prodo.wall.dashboard.tpl.html',
       controller: 'ProdoDashboardController'
      })     
 

  }]);
