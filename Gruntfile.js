module.exports = function (grunt) {
    grunt.initConfig({





    // define source files and their destinations
    // uglify: {
    //     files: { 
    //         src: 'src/app/product/js/*.js',  // source files mask
    //         dest: 'src/app/product/js/',    // destination folder
    //         expand: true,    // allow dynamic building
    //         flatten: true,   // remove all unnecessary nesting
    //         ext: '.min.js'   // replace .js to .min.js
    //     }
    // },

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
      'src/app/common/directives/prodoDirective.js',
     'src/app/product/js/DragImageController.js',
     'src/app/product/js/ProductController.js',
     'src/app/product/js/ProductService.js',
     'src/app/warranty/js/WarrantyController.js',
     'src/app/warranty/js/WarrantyService.js',
     'src/app/common/upload/js/uploader.js',
     'src/app/common/comments/js/prodoCommentEnterKeyDirective.js',
     'src/app/common/comments/js/prodoCommentLimitDirective.js',
     'src/app/common/comments/js/prodoCommentScrollDirective.js'


   // 'src/app/common/comments/js/prodoCommentDirective.js'
    ],
     // uglify: { tests: { src: [ 'src/app/test.js' ],
     dest: 'src/app/home/min/Prodo.min.js' } },
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
}

});

// load plugins
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-ngmin');

// register at least this one task
grunt.registerTask('default', [ 'uglify'  ]);


};