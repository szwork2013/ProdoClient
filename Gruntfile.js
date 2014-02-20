  var dirname = (new Date()).toISOString();
  module.exports = function (grunt) {
    grunt.initConfig({

     clean: {
      build: {
        src: [ 'build' ]
      }
      },
      
      shell: {
        pullLatestProdo: {
          // options: { stdout: true },
            command: 
               'git clone  https://github.com/GiantLeapSystems/prodonus-client-app.git'
                   },
         cleanProdo: {
          // options: { stdout: true },
            command: 
                'rm -rf prodonus-client-app'
                },
         pushBuild: {
          // options: { stdout: true },
            command: 
                'git push -u origin production'
                }       
    },

      cssmin: {
        build: {
          files: {
            'build/production/app/prodonus.min.css': [ 'prodonus-client-app/src/app/assets/css/prodonus.css' ]
          }
        }
      },

      uglify: { tests: { src: [ 
        'premin/src/app/prodo/prodoApp.js', 
        'premin/src/app/user/js/UserRegistrationController.js',
        'premin/src/app/user/js/UserAccountController.js', 
        'premin/src/app/user/js/UserSigninController.js',
        'premin/src/app/user/js/UserService.js',
        'premin/src/app/org/manageorg/js/OrgAccountController.js',
        'premin/src/app/org/orgregistration/js/OrgRegistrationController.js',
        'premin/src/app/org/orgregistration/js/OrgService.js',
        'premin/src/app/dashboard/js/ProdoDashboardController.js',
        'premin/src/app/subscription/js/SubscriptionController.js',
        'premin/src/app/subscription/js/PaymentController.js',
        'premin/src/app/subscription/js/SubscriptionService.js',
        'premin/src/app/common/prodoDirective/prodoDirective.js',
        'premin/src/app/common/admin/js/tagService.js',
        'premin/src/app/common/admin/js/TagController-Admin.js',
        'premin/src/app/product/js/DragImageController.js',
        'premin/src/app/product/js/ProductController.js',
        'premin/src/app/product/js/ProductCommentController.js',
        'premin/src/app/product/js/ProductService.js',
        'premin/src/app/warranty/js/WarrantyController.js',
        'premin/src/app/warranty/js/WarrantyService.js',
        'premin/premin/src/app/common/upload/js/uploader.js',
        'premin/src/app/common/commentsDirective/js/prodoCommentEnterKeyDirective.js',
        'premin/src/app/common/commentsDirective/js/prodoCommentLimitDirective.js',
        'premin/src/app/common/commentsDirective/js/prodoUserProfileDataController.js',
        'premin/src/app/common/search/js/prodoSearchController.js',
        'premin/src/app/common/search/js/searchService.js'


        ],
       // uglify: { tests: { src: [ 'src/app/test.js' ],
       dest: 'build/production/app/prodo.min.js' } },
       watch: {
        js:  { files: 'js/*.js', tasks: [ 'uglify' ] },
      },


      ngmin: {
      // controllers: {
      // src: ['prodonus-client-app/src/app/home/prodo/ProdoWallApp.js'],
      // dest: 'src/app/Premin/prodoAppPre.js'
    // }
    
    directives: {
      expand: true,
      
      src: [ 
      'prodonus-client-app/src/app/prodo/prodoApp.js', 
      'prodonus-client-app/src/app/user/js/UserRegistrationController.js',
      'prodonus-client-app/src/app/user/js/UserAccountController.js', 
      'prodonus-client-app/src/app/user/js/UserSigninController.js',
      'prodonus-client-app/src/app/user/js/UserService.js',
      'prodonus-client-app/src/app/org/manageorg/js/OrgAccountController.js',
      'prodonus-client-app/src/app/org/orgregistration/js/OrgRegistrationController.js',
      'prodonus-client-app/src/app/org/orgregistration/js/OrgService.js',
      'prodonus-client-app/src/app/dashboard/js/ProdoDashboardController.js',
      'prodonus-client-app/src/app/subscription/js/SubscriptionController.js',
      'prodonus-client-app/src/app/subscription/js/PaymentController.js',
      'prodonus-client-app/src/app/subscription/js/SubscriptionService.js',
      'prodonus-client-app/src/app/common/prodoDirective/prodoDirective.js',
      'prodonus-client-app/src/app/common/admin/js/tagService.js',
      'prodonus-client-app/src/app/common/admin/js/TagController-Admin.js',
      'prodonus-client-app/src/app/product/js/DragImageController.js',
      'prodonus-client-app/src/app/product/js/ProductController.js',
      'prodonus-client-app/src/app/product/js/ProductCommentController.js',
      'prodonus-client-app/src/app/product/js/ProductService.js',
      'prodonus-client-app/src/app/warranty/js/WarrantyController.js',
      'prodonus-client-app/src/app/warranty/js/WarrantyService.js',
      'prodonus-client-app/src/app/common/upload/js/uploader.js',
      'prodonus-client-app/src/app/common/commentsDirective/js/prodoCommentEnterKeyDirective.js',
      'prodonus-client-app/src/app/common/commentsDirective/js/prodoCommentLimitDirective.js',
      'prodonus-client-app/src/app/common/commentsDirective/js/prodoUserProfileDataController.js',
      'prodonus-client-app/src/app/common/search/js/prodoSearchController.js',
      'prodonus-client-app/src/app/common/search/js/searchService.js'


      ],
      dest: 'premin'
    }
  },

  //  deploy: {
  //     liveservers: {
  //       options:{
  //         servers: [{
  //            host: '192.168.1.20',
  //           port:   22,
  //            username: 'prodo',
  //           password: 'prodo123'

  //         }],
  //         deploy_path: 'prodonus-client-app/build/production',
  //         message:'deploy done'
  //       },
  //       error:function(e){
  //    console.log("Error: " + host + "\n" + e.message);
  //    console.log( e.stack );
  // }
  //     }
  //   },

  'ftp-deploy': {
    build: {
      auth: {
        host: '54.254.193.109',
        port: 21,
        username: "prodo-ftp",
        password: "prodo12345"
      },
      src: 'build/production/app',
      dest: 'home/ubantu/ptojects/prodonus-client-app/app'

    }
  },


  ngconstant: {
    options: {
      space: '  '
    },
    // Environment targets
    development: [{
      dest: 'prodonus-client-app/src/app/config/config.js',
      wrap: '"use strict";\n\n <%= __ngModule %>',
      name: 'config',
      constants: {
        ENV: {
          name: 'development',
          apiEndpoint: 'http://ec2-54-254-210-45.ap-southeast-1.compute.amazonaws.com',
          apiEndpoint_notSocket: 'http://localhost',
          port: ':8000'
        }
      }
    }],
    production: [{
      dest: 'build/production/app/config/config.js',
      wrap: '"use strict";\n\n <%= __ngModule %>',
      name: 'config',
      constants: {
        ENV: 'production',
        apiEndpoint: 'http://www.prodonus.com',
        apiEndpoint_notSocket: 'http://www.prodonus.com',
        port:':8000'
      }
    }]
  },

  copy: {
    main: {
      files: [
        // includes files within path
        {expand: true, cwd: 'prodonus-client-app/src/app/assets/', src: ['**'], dest: 'build/production/app/assets/'},
        {expand: true, flatten: true, src: ['preIndex/*'], dest: 'build/production/app/' , filter: 'isFile'},
        {expand: true, flatten: true, src: ['prodonus-client-app/src/app/blog/views/*'], dest: 'build/production/app/blog/views/' , filter: 'isFile'},
        {expand: true, flatten: true, src: ['prodonus-client-app/src/app/common/commentsDirective/js/prodoCommentDirective.js'], dest: 'build/production/app/common/commentsDirective/js/' , filter: 'isFile' },
        {expand: true, flatten: true, src: ['prodonus-client-app/src/app/common/commentsDirective/views/*'], dest: 'build/production/app/common/commentsDirective/views/' , filter: 'isFile'},
        {expand: true, flatten: true, src: ['prodonus-client-app/src/app/common/admin/views/*'], dest: 'build/production/app/common/admin/views/' , filter: 'isFile'},
        {expand: true, flatten: true, src: ['prodonus-client-app/src/app/common/admin/js/adminRoutes.js'], dest: 'build/production/app/common/admin/js/' , filter: 'isFile'},
        {expand: true, flatten: true, src: ['prodonus-client-app/src/app/subscription/views/*'], dest: 'build/production/app/subscription/views/' , filter: 'isFile'},
        {expand: true, flatten: true, src: ['prodonus-client-app/src/app/subscription/js/subscriptionRoutes.js'], dest: 'build/production/app/subscription/js/' , filter: 'isFile'},
        {expand: true, flatten: true, src: ['prodonus-client-app/src/app/dashboard/json/*'], dest: 'build/production/app/dashboard/json/' , filter: 'isFile'},
        {expand: true, flatten: true, src: ['prodonus-client-app/src/app/dashboard/views/*'], dest: 'build/production/app/dashboard/views/' , filter: 'isFile'},
        {expand: true, flatten: true, src: ['prodonus-client-app/src/app/prodo/landing/views/*'], dest: 'build/production/app/prodo/landing/views/' , filter: 'isFile'},
        {expand: true, flatten: true, src: ['prodonus-client-app/src/app/prodo/home/js/*'], dest: 'build/production/app/prodo/home/js/' , filter: 'isFile'},
        {expand: true, flatten: true, src: ['prodonus-client-app/src/app/prodo/home/views/*'], dest: 'build/production/app/prodo/home/views/' , filter: 'isFile'},
        {expand: true, flatten: true, src: ['prodonus-client-app/src/app/prodo/prodoMainAppRoutes.js'], dest: 'build/production/app/prodo/' , filter: 'isFile'},
        {expand: true, flatten: true, src: ['prodonus-client-app/src/app/org/manageorg/views/*'], dest: 'build/production/app/org/manageorg/views/' , filter: 'isFile'},
        {expand: true, flatten: true, src: ['prodonus-client-app/src/app/org/orgregistration/views/*'], dest: 'build/production/app/org/orgregistration/views/' , filter: 'isFile'},
        {expand: true, flatten: true, src: ['prodonus-client-app/src/app/org/orgregistration/js/OrgRoutes.js'], dest: 'build/production/app/org/orgregistration/js/' , filter: 'isFile'},
        {expand: true, flatten: true, src: ['prodonus-client-app/src/app/product/views/*'], dest: 'build/production/app/product/views/' , filter: 'isFile'},
        {expand: true, flatten: true, src: ['prodonus-client-app/src/app/user/views/*'], dest: 'build/production/app/user/views/' , filter: 'isFile'},
        {expand: true, flatten: true, src: ['prodonus-client-app/src/app/user/js/UserRoutes.js'], dest: 'build/production/app/user/js/' , filter: 'isFile'},
        {expand: true, cwd: 'prodonus-client-app/src/app/vendor/', src: ['**'], dest: 'build/production/app/vendor/'},
        {expand: true, flatten: true, src: ['prodonus-client-app/src/app/warranty/views/*'], dest: 'build/production/app/warranty/views/' , filter: 'isFile'}

        ]
      }
      // ,
      // staging: {
      //   files: [
      //   {expand: true, cwd: 'build/production/app/', src: ['**'], dest: 'build/staging/app/'}
      //   ]
      // }
    }
    



  });

  // load plugins
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-ftp-deploy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-deploy');
  grunt.loadNpmTasks('grunt-ngmin');
  grunt.loadNpmTasks('grunt-s3');
  grunt.loadNpmTasks('grunt-ssh');
  grunt.loadNpmTasks('grunt-ng-constant');

  // register at least this one task
  grunt.registerTask('default', [ 'uglify','cssmin' ]);
  grunt.registerTask('deploy', [ 'ftp-deploy' ]);

  // grunt.registerTask('production', [ 'uglify','cssmin','deploy','s3']);

   // grunt.registerTask('deploy', [

   //    'sftp:deploy'

   //  ]);
  grunt.registerTask('serve', function (target) {
    if (target === 'build/production/app/config/config.js') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      // 'clean:server',
      'ngconstant:development' // ADD THIS
      // 'bower-install',
      // 'concurrent:server',
      // 'autoprefixer',
      // 'connect:livereload',
      // 'watch'
      ]);
  });
  grunt.registerTask('build', [
    'shell:cleanProdo',
    'shell:pullLatestProdo',
    'clean',
    'ngmin',
    'copy:main',
    'uglify',
    'cssmin',
    'ngconstant:production',
    'shell:pushBuild'
    // 'copy:staging'
    
    ]);
};