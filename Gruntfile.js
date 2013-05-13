module.exports = function(grunt) {
  "use strict";

  // Configure tasks
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jade: {
      dev: {
        files: {
          'www/': ['jade/*.jade']
        },
        options: {
          client: false,
          pretty: true
        }
      },
      prod: {
        files: {
          'www/': ['jade/*.jade']
        },
        options: {
          client: false,
          pretty: false
        }
      }
    },
    sass: {
      dev: {
        options: {
          style: 'expanded'
        },
        files: {
          'www/css/main.css': 'sass/main.sass'
        }
      }
    }
  });


  // Load tasks / plugins
  grunt.loadNpmTasks('grunt-jade');
  grunt.loadNpmTasks('grunt-contrib-sass');

  // Define task aliases and tasks
  grunt.registerTask('default', 'Compile jade/sass into html/css', ['jade:dev', 'sass:dev']);
};