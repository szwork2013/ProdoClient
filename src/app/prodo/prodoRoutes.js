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

    /* ----------------------------Landing Routes-------------------------- */
    .state('prodo.landing', {
      abstract: true,
      templateUrl: 'user/views/user.registration.container.html',
      controller:'ProdoMarketingController',
      resolve: {
        marketingData: function(UserService, $rootScope) {
          return UserService.marketing.getMarketingData().$promise;
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
    /* -------------------------------Landing Routes------------------------- */


    /* --------------------------Prodo Inbox Routes-------------------------- */
    .state('prodo.inbox', {
      templateUrl: 'inbox/views/prodo.inbox.container.html',
      controller:'ProdoInboxController',
      resolve: {
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
    .state('prodo.inbox.content', {
      views: {
        'inbox' : {
          templateUrl:  'inbox/views/prodo.inbox.wall.tpl.html'
        }
      }
    }) 
    .state('prodo.inbox.content.primary', {
      templateUrl:  'inbox/views/prodo.inbox.wall.primary.tpl.html',
      controller:'ProdoPrimaryInboxController',
      resolve: {
        primarymessage  : function(InboxGetService, $rootScope) {
          console.log('Primary');
          var ntype = 'normal';
          return InboxGetService.All_Inbox_Message.getAllMessages({userid: $rootScope.usersession.currentUser.userid, data: ntype}).$promise;
        }
      }  
    })
    .state('prodo.inbox.content.enquiry', {
      templateUrl:  'inbox/views/prodo.inbox.wall.enquiry.tpl.html',
      controller:'ProdoEnquiryInboxController',
      resolve: {
        enquirymessage  : function(InboxGetService, $rootScope) {
          console.log('enquiry');
          var etype = 'enquiry';
          return InboxGetService.All_Inbox_Message.getAllMessages({userid: $rootScope.usersession.currentUser.userid, data: etype}).$promise;
        }
      }
    }) 
    .state('prodo.inbox.content.testimonial', {
      templateUrl:  'inbox/views/prodo.inbox.wall.testimonial.tpl.html',
      controller:'ProdoTestimonialInboxController',
      resolve: {
        testimonialmessage  : function(InboxGetService, $rootScope) {
          console.log('testimonial');
          var type = 'testimonial';
          return InboxGetService.All_Inbox_Message.getAllMessages({userid: $rootScope.usersession.currentUser.userid, data: type}).$promise;
        }
      }
    })  
    .state('prodo.inbox.content.draft', {
      templateUrl:  'inbox/views/prodo.inbox.wall.draft.tpl.html'
    }) 

    .state('prodo.inbox.readcontent', {
      views: {
        'inbox' : {
          templateUrl:  'inbox/views/prodo.inbox.wall.read.tpl.html'
        }
      }
    }) 
    .state('prodo.inbox.readcontent.primary', {
      templateUrl:  'inbox/views/prodo.inbox.wall.primary.read.tpl.html'
    }) 
    .state('prodo.inbox.readcontent.enquiry', {
      templateUrl:  'inbox/views/prodo.inbox.wall.enquiry.read.tpl.html'
    }) 
    .state('prodo.inbox.readcontent.testimonial', {
      templateUrl:  'inbox/views/prodo.inbox.wall.testimonial.read.tpl.html'
    }) 
    /* --------------------------Prodo Inbox Routes-------------------------- */


    /* -----------------------------Prodo Home Routes--------------------- */
    .state('prodo.home', {
      abstract: true,
      templateUrl: 'prodo/home/views/prodo.home.container.html',
      controller:'ProdoHomeController',
      resolve: {
        allOrgData: function(OrgService, $rootScope) {
          return OrgService.all_org_data.getAllOrgAnalytics().$promise;
        },
        allCampaignData: function(HomeService, $rootScope) {
          return HomeService.all_campaign_data.getAllCampaigns().$promise;
        },
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
        } else {
          $state.transitionTo('prodo.landing.signup');
        }
      }
    })
    .state('prodo.home.wall', {
      views: {
        'prodo-home-walladvertising': {
          templateUrl: 'prodo/home/views/prodo.home.walladvertising.tpl.html'
        },
        'prodo-home-wallsearch' : {
          templateUrl:  'prodo/home/views/prodo.home.wallsearchbar.tpl.html'
        },
        'prodo-home-wall' : {
          templateUrl:  'prodo/home/views/prodo.home.wall.tpl.html'
        }
      }
    }) 
    /* -----------------------------Prodo Home Routes--------------------- */


    /* -----------------------------User Account Routes------------------- */
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
        },
        authorcategorydata: function(UserService, $rootScope) {
          return UserService.author.getAuthorCategoryData().$promise;
        }
      }
    })
    /* -----------------------------User Account Routes------------------- */


    /* ------------------------User Content Routes------------------------ */
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
    /* ------------------------User Content Routes------------------------ */


    /* -----------------------Footer Content Routes----------------------- */
    .state('prodo.footer-content', {
      abstract: true,
      templateUrl: 'prodo/landing/views/prodo.footer.content.container.html',
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
    .state('prodo.footer-content.aboutus',{ 
      templateUrl: 'prodo/landing/views/prodo.aboutus.tpl.html' 
    })
    .state('prodo.footer-content.terms', {
      templateUrl: 'prodo/landing/views/prodo.general.terms.tpl.html' 
    })
    .state('prodo.footer-content.privacy',{ 
      url: '/prodo-privacy',
      templateUrl: 'prodo/landing/views/prodo.privacy.tpl.html'
    })
    .state('prodo.footer-content.business',{ 
      templateUrl: 'prodo/landing/views/prodo.business.tpl.html'
    })
    .state('prodo.footer-content.advertising', {
      templateUrl: 'prodo/landing/views/prodo.advertising.tpl.html'
    })
    .state('prodo.footer-content.application', {
      templateUrl: 'prodo/landing/views/prodo.application.tpl.html',
      resolve: {
        UserService: 'UserService',
          authorcategorydata: function(UserService, $rootScope) {
            return UserService.author.getAuthorCategoryData().$promise;
        }
      },
      controller: 'ProdoFooterController'
    })
    .state('prodo.footer-content.support', {
      templateUrl: 'prodo/landing/views/prodo.support.tpl.html'
    })
    .state('prodo.footer-content.contactus', {
      templateUrl: 'prodo/landing/views/prodo.contactus.tpl.html'
    })

    /* -----------------------Footer Content Routes----------------------- */


    /* ---------------------Organization wizard Routes--------------------- */
    .state('prodo.orgregistration', {
      templateUrl: 'org/orgregistration/views/orgregistration.container.html',
      abstract: true,
      resolve : {
        OrgService: 'OrgService',
        industrycategorydataarray: function(OrgService, $rootScope) {
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
    /* ---------------------Organization wizard Routes--------------------- */


    /* ---------------------Organization Account Routes--------------------- */
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
          },
          industrycategorydata: function(OrgService, $rootScope) {
            return  OrgService.GetOrg_Industry_Category.getAllIndustryCategory().$promise;
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
        },
        allCommentTags: function(CommentTags, $rootScope) {
           return CommentTags.getCommentTags().$promise;
        }
      }
    })
    /* ---------------------Organization Account Routes--------------------- */


    /* -----------------------Prodo ProductWall Routes----------------------- */
    .state('prodo.productwall', {
      resolve: {
        checkIfSessionExist: function(UserService, $rootScope) {
            return UserService.Is_user_loggedin.checkUserSession().$promise;
        }, 
        orgdata: function(OrgService, checkIfSessionExist, $rootScope) {
          return OrgService.org_data.getOrgSettings({orgid: $rootScope.orgid}).$promise;
        },
        orgaddr: function(OrgService, $rootScope) {
          return OrgService.ManageOrgLocation.getAllOrgAddress({orgid: $rootScope.orgid}).$promise;
        },
        orgAllproducts: function(OrgService, $rootScope) {
          return OrgService.GetOrgProducts.getAllOrgProducts({orgid: $rootScope.orgid}).$promise;
        },
        orgproduct: function(OrgService, $rootScope) {
          return OrgService.GetSpecificOrgProduct.getOrgProduct({orgid: $rootScope.orgid, prodle: $rootScope.product_prodle}).$promise;
        },
        broadcastData: function(OrgService, $rootScope) {
          return OrgService.GetOrg_Broadcast_Messages.getOrgBroadcastMessage({orgid: $rootScope.orgid}).$promise;
        },
        dashboardSliderData: function(prodoDashboardService, $rootScope) {    
          return prodoDashboardService.get_ProductCharts.getProductCharts().$promise;
        },
        blogSliderData: function(BlogGetService, $rootScope) {    
          return BlogGetService.Get_Wall_Blogs.getAllProductBlogs({prodle: $rootScope.product_prodle}).$promise;
        },
        productData: function(ProductService, $rootScope) { 
          return ProductService.getProduct({orgid: $rootScope.orgid, prodle: $rootScope.product_prodle}).$promise;
        }
      },
      controller: 'ProdoWallController',
      onEnter: function(UserSessionService, checkIfSessionExist, $state, $rootScope){
        if (checkIfSessionExist.success) {
          if (checkIfSessionExist.success.user.prodousertype == 'business' && checkIfSessionExist.success.user.org == undefined) {
            $state.transitionTo('prodo.orgregistration.company');
          } else if (checkIfSessionExist.success.user.isOtpPassword) {
            $state.transitionTo('prodo.landing.resetpassword');
          } 
        } else {
          $state.transitionTo('prodo.landing.signup');
        }
      },
      templateUrl: 'prodo/productwall/views/prodo.container.html',
      abstract: true

    }) 
    .state('prodo.productwall.wall-unified', {
      templateUrl: 'prodo/productwall/views/prodo.wall.social.unified.completeview.tpl.html',
      controller: 'ProdoWallOrgController'
    })    
    .state('prodo.productwall.wall-org', {
      templateUrl: 'prodo/productwall/views/prodo.wall.social.unified.organalysisview.tpl.html',
      controller: 'ProdoWallOrgController'
    })   

    /*-------------------------nested routes for wall-org start-------------------*/
    
    .state('prodo.productwall.wall-org.info', {
      templateUrl:  'org/manageorg/views/prodo.wall.social.unified.organalysisview.info.tpl.html'
    })
    .state('prodo.productwall.wall-org.analytics', {
      templateUrl:  'org/manageorg/views/prodo.wall.social.unified.organalysisview.analytics.tpl.html'
    }) 

    /*-------------------------nested routes for wall-org end---------------------*/
 
    .state('prodo.productwall.wall-product', {
      templateUrl:  'prodo/productwall/views/prodo.wall.social.unified.productview.tpl.html',
      controller: 'ProductController'
    }) 

    /*-------------------------nested routes for wall-product start-------------------*/
    
    .state('prodo.productwall.wall-product.info', {
      templateUrl:  'product/views/prodo.wall.social.unified.productview.info.tpl.html'
    }) 
    .state('prodo.productwall.wall-product.conversation', {
      templateUrl:  'product/views/prodo.wall.social.unified.productview.conversation.tpl.html'
    }) 
    .state('prodo.productwall.wall-product.enquiry', {
      templateUrl:  'product/views/prodo.wall.social.unified.productview.enquiry.tpl.html'
    }) 
    .state('prodo.productwall.wall-product.analytics', {
      templateUrl:  'product/views/prodo.wall.social.unified.productview.analytics.tpl.html',
      controller : 'ProdoProductDashboardController',
    })
    .state('prodo.productwall.wall-product.analytics.details', {
      templateUrl:  'product/views/prodo.wall.social.unified.productview.detailanalytics.tpl.html'
    }) 

    .state('prodo.productwall.wall-campaign', {
      resolve: {
        campaignWalldata: function(CampaignWallService, $rootScope) {    
          return CampaignWallService.get_All_ProductCampaigns.getAllProductCampaigns({prodle: $rootScope.product_prodle}).$promise;
        },
        assignCampaignId: function(campaignWalldata, $rootScope){
          console.log(campaignWalldata);
           if(campaignWalldata.success){
            if(campaignWalldata.success.Product_Campaigns.length > 0){
               if($rootScope.campaign_idwall ){console.log('idfirst' +$rootScope.campaign_idwall ) }
                else{

                 $rootScope.campaignidWall=campaignWalldata.success.Product_Campaigns[0].campaign_id;
                 console.log('idsecond' +$rootScope.campaignidWall)
                }
              
               
            }
           }
        }
      },
      templateUrl:  'prodo/productwall/views/prodo.wall.social.unified.campaignview.tpl.html',
      controller: 'ProdoWallCampaignController'
    })

    /*-------------------------nested routes for wall-campaign start-------------------*/
    
    .state('prodo.productwall.wall-campaign.campaign', {
      templateUrl:  'campaign/views/prodo.wall.social.unified.campaignview.campaign.tpl.html'
    })  
    .state('prodo.productwall.wall-campaign.analytics', {
      templateUrl:  'campaign/views/prodo.wall.social.unified.campaignview.analytics.tpl.html',
      controller : 'ProdoCampaignDashboardController'
    }) 
    .state('prodo.productwall.wall-campaign.analytics.charts',
    {
      templateUrl : 'campaign/views/prodo.wall.social.unified.campaignview.analytics.chart.tpl.html'
    })

    /*-------------------------nested routes for wall-campaign end---------------------*/
 
    .state('prodo.productwall.wall-blog', {
      templateUrl:  'prodo/productwall/views/prodo.wall.social.unified.blogview.tpl.html'
    })

    .state('prodo.productwall.wall-blogdetail', {
      resolve: {
        getProductBlogData: function(blogSliderData, BlogGetService, $rootScope){
          if (blogSliderData.success && blogSliderData.success.doc)  {
            if (blogSliderData.success.doc.length !== 0) {
              console.log(blogSliderData);
              return BlogGetService.Get_Wall_Blog.getBlog({prodle: $rootScope.product_prodle, blogid: $rootScope.product_blogid}).$promise;
            } 
          } else {
              return blogSliderData.error.message;
          }
        }
      },
      templateUrl:  'prodo/productwall/views/prodo.wall.social.unified.blogdetailview.tpl.html',
      controller: 'ProdoWallBlogController'
    })

    /*-------------------------nested routes for wall-blog start-------------------*/
    
    .state('prodo.productwall.wall-blog.blog', {
      templateUrl:  'blog/views/prodo.wall.social.unified.blogview.blog.tpl.html'
    }) 
    .state('prodo.productwall.wall-blogdetail.detailview', {
      templateUrl:  'blog/views/prodo.wall.social.unified.blogview.blogdetail.tpl.html'
    })  
    .state('prodo.productwall.wall-blog.analytics', {
      templateUrl:  'blog/views/prodo.wall.social.unified.blogview.analytics.tpl.html'
    })

    /*-------------------------nested routes for wall-blog end---------------------*/

    .state('prodo.productwall.wall-warranty', {
      resolve: {
        warrantydata: function(WarrantyService, $rootScope) {
          return WarrantyService.get_latest5warranties.getLatestWarrantyDetails({userid: $rootScope.usersession.currentUser.userid}).$promise;
        }
      },
      templateUrl:  'prodo/productwall/views/prodo.wall.social.unified.warrantyview.tpl.html',
      controller: 'ProdoWallWarrantyController'
    })

    /*-------------------------nested routes for wall-warranty start-------------------*/
    
    .state('prodo.productwall.wall-warranty.warranty', {
      templateUrl:  'warranty/views/prodo.wall.social.unified.warrantyview.warranty.tpl.html'
    })  
    .state('prodo.productwall.wall-warranty.analytics', {
      templateUrl:  'warranty/views/prodo.wall.social.unified.warrantyview.analytics.tpl.html'
    })

    /*-------------------------nested routes for wall-warranty end---------------------*/

    .state('prodo.productwall.wall-media', {
      templateUrl:  'prodo/productwall/views/prodo.wall.social.unified.mediaview.tpl.html'
    })

    .state('prodo.productwall.wall-competitiveanalysis', {
      templateUrl:  'prodo/productwall/views/prodo.wall.social.unified.competitiveanalysisview.tpl.html'
    })

    .state('prodo.productwall.wall-customeropportunity', {
      templateUrl:  'prodo/productwall/views/prodo.wall.social.unified.customeropportunityview.tpl.html'
    })
    .state('prodo.productwall.wall-rrt', {
      templateUrl:  'prodo/productwall/views/prodo.wall.social.unified.rrtview.tpl.html',
      controller:'ProductController'
    })

    /*-------------------------nested routes for wall-rrt start-------------------*/
    
    .state('prodo.productwall.wall-rrt.recommendation', {
      templateUrl:  'rrt/views/prodo.wall.social.unified.rrtview.recommendation.tpl.html'
    }) 
    .state('prodo.productwall.wall-rrt.rating', {
      templateUrl:  'rrt/views/prodo.wall.social.unified.rrtview.rating.tpl.html',
      controller:'ProductRatingController'
    }) 
    .state('prodo.productwall.wall-rrt.testimonial', {
      templateUrl:  'rrt/views/prodo.wall.social.unified.rrtview.testimonial.tpl.html',
      controller:'ProductTestimonialController'
    }) 
    .state('prodo.productwall.wall-rrt.analytics', {
      templateUrl:  'rrt/views/prodo.wall.social.unified.rrtview.analytics.tpl.html'
    }) 

    /*-------------------------nested routes for wall-rrt end---------------------*/


    .state('prodo.productwall.wall-realtime', {
      templateUrl:  'prodo/productwall/views/prodo.wall.social.unified.realtimeview.tpl.html'
    })

    .state('prodo.productwall.wall-video', {
      templateUrl:  'prodo/productwall/views/prodo.wall.social.unified.videoview.tpl.html'
    })
    .state('prodo.productwall.wall-photo', {
      templateUrl:  'prodo/productwall/views/prodo.wall.social.unified.photoview.tpl.html'
    })

    /* -----------------------Prodo ProductWall Routes End----------------------- */


    /* ------------------------Warranty Account Routes------------------------ */
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
    /* ------------------------Warranty Account Routes------------------------ */


    /* ------------------------campaign Account Routes------------------------ */
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
    /* ------------------------campaign Account Routes------------------------ */


    /* ------------------------------Blog Account Routes------------------------------ */
    .state('prodo.account-blog', {
      abstract: true,
      templateUrl: 'blog/views/blog.account.settings.container.html',
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
    .state('prodo.account-blog.blog', {
      templateUrl:  'blog/views/blog.account.settings.tpl.html',
      resolve: {
        blogproductdata: function(BlogGetService, $rootScope) {
          return BlogGetService.Get_Product_For_Blog.getBlogProduct({authorid: $rootScope.usersession.currentUser.author.authorid}).$promise;
        },
        getAllblogdata: function(BlogGetService, $rootScope) {
          return BlogGetService.All_Blog_Data.getAllBlogs({authorid: $rootScope.usersession.currentUser.author.authorid}).$promise;
        },
        getblogdata: function(BlogGetService, getAllblogdata, $rootScope) {
          if (getAllblogdata.success && getAllblogdata.success.blog)  {
            if (getAllblogdata.success.blog.length !== 0) {
                console.log(getAllblogdata);
                $rootScope.blogid = getAllblogdata.success.blog[0].blogid;
             
              return BlogGetService.Unique_Blog_Data.getUniqueBlog({authorid: $rootScope.usersession.currentUser.author.authorid, blogid: $rootScope.blogid}).$promise;
            } 
          } else {
              console.log(getAllblogdata.error.message);
              var message  = 'No blogs exist.'
              return message;
          }
        } 
      },
      controller: 'ManageBlogController'
    })
    /* ------------------------------Blog Account Routes------------------------------ */
 
  }]);
