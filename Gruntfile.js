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
      'src/app/common/subscription/js/SubscriptionController.js',
      'src/app/common/accounts/js/ManageAccountController.js',
      'src/app/dashboard/js/ProdoDashboardController.js',
      'src/app/common/subscription/js/PaymentController.js',
      'src/app/common/subscription/js/SubscriptionService.js',
      'src/app/common/directives/prodoDirective.js',
      'src/app/product/js/DragImageController.js',
      'src/app/product/js/ProductController.js',
      'src/app/product/js/ProductService.js',
      'src/app/warranty/js/WarrantyController.js',
      'src/app/warranty/js/WarrantyService.js',
      'src/app/common/upload/js/uploader.js',
      'src/app/common/comments/js/prodoCommentEnterKeyDirective.js',
     'src/app/common/comments/js/prodoCommentLimitDirective.js'
     


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
    
    src: ['src/app/common/directives/prodoDirective.js'],
    dest: 'src/app/Premin'
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
        apiEndpoint: 'http://ec2-54-254-210-45.ap-southeast-1.compute.amazonaws.com:8000'
      }
    }
  }],
  production: [{
    dest: 'build/production/app/scripts/config.js',
    wrap: '"use strict";\n\n <%= __ngModule %>',
    name: 'config',
    constants: {
      ENV: 'production',
      apiEndpoint: 'http://www.prodonus.com:8000'
    }
  }]
},

});

// load plugins
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
  'ngconstant:production' // ADD THIS
  // 'bower-install' 
]);
};