  var dirname = (new Date()).toISOString();
  module.exports = function (grunt) {
    grunt.initConfig({



      cssmin: {
        build: {
          files: {
            'build/production/app/prodonus.min.css': [ 'src/app/assets/css/prodonus.css' ]
          }
        }
      },

      uglify: { tests: { src: [ 
        'src/app/home/prodoApp.js', 
        'src/app/user/js/UserRegistrationController.js',
        'src/app/user/js/UserSigninController.js',
        'src/app/user/js/UserService.js',
        'src/app/org/orgregistration/js/OrgRegistrationController.js',
        'src/app/org/orgregistration/js/OrgService.js',
        'src/app/common/accounts/js/ManageAccountController.js',
        'src/app/dashboard/js/ProdoDashboardController.js',
        'src/app/common/subscription/js/SubscriptionModel.js',
        'src/app/common/subscription/js/SubscriptionController.js',
        'src/app/common/subscription/js/PaymentController.js',
        'src/app/common/subscription/js/SubscriptionService.js',
        'src/app/common/directives/prodoDirective.js',
        'src/app/common/admin/js/tagService.js',
         'src/app/common/admin/js/TagController-Admin.js',
        'src/app/product/js/DragImageController.js',
        'src/app/product/js/ProductController.js',
        'src/app/product/js/ProductService.js',
        'src/app/warranty/js/WarrantyController.js',
        'src/app/warranty/js/WarrantyService.js',
        'src/app/common/upload/js/uploader.js',
        'src/app/common/comments/js/prodoCommentEnterKeyDirective.js',
        'src/app/common/comments/js/prodoCommentLimitDirective.js',
        'src/app/common/comments/js/prodoUserProfileDataController.js',
        'src/app/common/comments/js/prodoCommentService.js',
        'src/app/common/search/js/prodoSearchController.js',
        'src/app/common/search/js/searchService.js'




     // 'src/app/common/comments/js/prodoCommentDirective.js'
     ],
       // uglify: { tests: { src: [ 'src/app/test.js' ],
       dest: 'build/production/app/prodo.min.js' } },
       watch: {
        js:  { files: 'js/*.js', tasks: [ 'uglify' ] },
      },


      ngmin: {
      // controllers: {
      // src: ['src/app/home/prodo/ProdoWallApp.js'],
      // dest: 'src/app/Premin/prodoAppPre.js'
    // }
    
    directives: {
      expand: true,
      
      src: ['src/app/common/subscription/js/PaymentController.js'],
      dest: 'build/production/app/Premin'
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
      dest: 'src/app/scripts/config.js',
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
      dest: 'build/production/app/scripts/config.js',
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
        {expand: true, flatten: true, src: ['src/app/assets/css/*'], dest: 'build/production/app/assets/css/' , filter: 'isFile'},
        {expand: true, flatten: true, src: ['src/app/assets/images/*'], dest: 'build/production/app/assets/images/' , filter: 'isFile'},
        {expand: true, flatten: true, src: ['src/app/assets/images/Prodonus_PNG/*'], dest: 'build/production/app/assets/images/Prodonus_PNG' , filter: 'isFile'},
        {expand: true, flatten: true, src: ['src/app/assets/ico/*'], dest: 'build/production/app/assets/ico/' , filter: 'isFile'},
        {expand: true, flatten: true, src: ['src/app/assets/js/*'], dest: 'build/production/app/assets/js/' , filter: 'isFile'},
        {expand: true, flatten: true, src: ['src/app/blog/views/*'], dest: 'build/production/app/blog/views/' , filter: 'isFile'},
        {expand: true, flatten: true, src: ['src/app/common/accounts/views/*'], dest: 'build/production/app/common/accounts/views/' , filter: 'isFile'},
        {expand: true, flatten: true, src: ['src/app/common/comments/js/prodoCommentDirective.js'], dest: 'build/production/app/common/comments/js/' , filter: 'isFile' },
        // {expand: true, flatten: true, src: ['src/app/common/comments/js/prodoUserProfileDataController.js'], dest: 'build/production/app/common/comments/js/' , filter: 'isFile' },
        // {expand: true, flatten: true, src: ['src/app/common/comments/js/prodoCommentService.js'], dest: 'build/production/app/common/comments/js/' , filter: 'isFile'},
        {expand: true, flatten: true, src: ['src/app/common/comments/views/*'], dest: 'build/production/app/common/comments/views/' , filter: 'isFile'},
        {expand: true, flatten: true, src: ['src/app/common/admin/views/*'], dest: 'build/production/app/common/admin/views/' , filter: 'isFile'},
        {expand: true, flatten: true, src: ['src/app/common/search/views/*'], dest: 'build/production/app/common/search/views/' , filter: 'isFile'},
        {expand: true, flatten: true, src: ['src/app/common/slider/gallery/*'], dest: 'build/production/app/common/slider/gallery/' , filter: 'isFile'},
        {expand: true, flatten: true, src: ['src/app/common/slider/views/*'], dest: 'build/production/app/common/slider/views/' , filter: 'isFile'},
        {expand: true, flatten: true, src: ['src/app/common/subscription/views/*'], dest: 'build/production/app/common/subscription/views/' , filter: 'isFile'},
        {expand: true, flatten: true, src: ['src/app/common/CommonRoutes.js'], dest: 'build/production/app/common/' , filter: 'isFile'},
        {expand: true, flatten: true, src: ['src/app/dashboard/json/*'], dest: 'build/production/app/dashboard/json/' , filter: 'isFile'},
        {expand: true, flatten: true, src: ['src/app/dashboard/views/*'], dest: 'build/production/app/dashboard/views/' , filter: 'isFile'},
        {expand: true, flatten: true, src: ['src/app/home/landing/views/*'], dest: 'build/production/app/home/landing/views/' , filter: 'isFile'},
        {expand: true, flatten: true, src: ['src/app/home/prodo/js/*'], dest: 'build/production/app/home/prodo/js/' , filter: 'isFile'},
        {expand: true, flatten: true, src: ['src/app/home/prodo/views/*'], dest: 'build/production/app/home/prodo/views/' , filter: 'isFile'},
        {expand: true, flatten: true, src: ['src/app/home/prodoMainAppRoutes.js'], dest: 'build/production/app/home/' , filter: 'isFile'},
        {expand: true, flatten: true, src: ['src/app/org/manageorg/views/*'], dest: 'build/production/app/org/manageorg/views/' , filter: 'isFile'},
        {expand: true, flatten: true, src: ['src/app/org/orgregistration/views/*'], dest: 'build/production/app/org/orgregistration/views/' , filter: 'isFile'},
        {expand: true, flatten: true, src: ['src/app/org/orgregistration/js/OrgRoutes.js'], dest: 'build/production/app/org/orgregistration/js/' , filter: 'isFile'},
        {expand: true, flatten: true, src: ['src/app/product/views/*'], dest: 'build/production/app/product/views/' , filter: 'isFile'},
        {expand: true, flatten: true, src: ['src/app/user/views/*'], dest: 'build/production/app/user/views/' , filter: 'isFile'},
        {expand: true, flatten: true, src: ['src/app/user/js/UserRoutes.js'], dest: 'build/production/app/user/js/' , filter: 'isFile'},
        {expand: true, cwd: 'src/app/vendor/', src: ['**'], dest: 'build/production/app/vendor/'},
        {expand: true, flatten: true, src: ['src/app/warranty/views/*'], dest: 'build/production/app/warranty/views/' , filter: 'isFile'}
        // {expand: true, cwd: 'src/app/assets/**', src: ['**'], dest: 'build/production/app/assets'}

        // // includes files within path and its sub-directories
        // {expand: true, src: ['path/**'], dest: 'dest/'},

        // // makes all src relative to cwd
        // {expand: true, cwd: 'path/', src: ['**'], dest: 'dest/'},

        // // flattens results to a single level
        // {expand: true, flatten: true, src: ['path/**'], dest: 'dest/', filter: 'isFile'}
        ]
      }
    }



  });

  // load plugins
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
    if (target === 'build/production/app/scripts/config.js') {
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
    // 'clean:dist',
    // 'ngmin',
    'copy',
    'uglify',
    'cssmin',
    'ngconstant:production', // ADD THIS
    // 'bower-install' 
    ]);
};