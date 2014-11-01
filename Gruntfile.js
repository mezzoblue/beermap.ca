module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['script/functions/jqueryish.js', 'script/functions/json.js', 'script/functions/map.js', 'script/functions/ui.js', 'script/base.js'],
        dest: 'script/build.js',
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'script/build.js',
        dest: 'script/build.min.js'
      }
    },

  });

  // Load the concatenation plugin
  grunt.loadNpmTasks('grunt-contrib-concat');

  // Load the uglify plugin
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Register tasks
  grunt.registerTask('default', ['concat']);
  grunt.registerTask('min', ['uglify']);

};