module.exports = function(grunt) {
  "use strict";

  // Config...
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
    },
    introspect: {
      configOne: 'config one',
      configTwo: [1, 2]
    },
    get: {
      'node-json': {
        'url': "http://nodejs.org/api/all.json",
        'name': 'node-docs.json'
      },
      'node-html': {
        'url': "http://nodejs.org/api/all.html",
        'name': 'node-docs.html'
      }
    },
    concat: {
      'one': {
        'src': ['downloads/*.json'],
        'dest': 'cat/one.cat',
      },
      'two': {
        'src': ['downloads/*'],
        'dest': 'cat/two.cat',
        'filter': function(filepath) {
          var stats = require('fs').statSync(filepath);
          return stats.size < 600000;
        }
      }
    }
  });


  // Load tasks...
  grunt.loadNpmTasks('grunt-jade');
  grunt.loadNpmTasks('grunt-contrib-sass');

  grunt.task.loadTasks('tasks');

  // Task aliases and tasks
  grunt.registerTask('default', 'Compile jade/sass into html/css', ['jade:dev', 'sass:dev']);

};