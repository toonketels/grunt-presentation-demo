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
    }
  });


  // Load tasks...
  grunt.loadNpmTasks('grunt-jade');
  grunt.loadNpmTasks('grunt-contrib-sass');

  // Task aliases and tasks
  grunt.registerTask('default', 'Compile jade/sass into html/css', ['jade:dev', 'sass:dev']);

    grunt.registerTask('introspect', 'Dummy task to view the kind of data we have access to', function(argOne, argTwo) {
    var config,
        pkg,
        env;

    // Arguments
    console.log('Arguments object:');
    console.log(arguments);

    console.log('Named arguments variables:');
    console.log(argOne);
    console.log(argTwo);

    // This
    console.log('this:');
    console.log(this);

    // Configuration
    console.log('Configuration:');
    config = grunt.config.get(this.name);
    console.log(config);

    // Package info
    console.log('Package:');
    pkg = grunt.config.get('pkg');
    console.log(pkg);

    // Option parameters
    console.log('Option parameters: ');
    env = grunt.option('env') || 'staging';
    console.log(env);
    
    console.log(grunt.option.flags());
  });



  grunt.registerMultiTask('get', 'Perform get request', function() {

    var http = require('http'),
        fs = require('fs'),
        config = grunt.config.get(this.name)[this.target],
        url =  config.url,
        name = config.name,
        prefix =  grunt.template.today('yyyy-mm-dd-hh-MM-ss'),
        dir =  'downloads',
        file = grunt.template.process("<%= dir %>/<%= prefix %>-<%= name %>",{ data: {dir: dir, prefix: prefix, name: name }}),
        done = this.async(),
        fd;
    
    http.get(url, function(res) {

      grunt.log.writeln("Got response: " + res.statusCode);
      grunt.log.writeln("Downloading...");

      res.setEncoding('utf8');
      fd = fs.openSync(file, 'w');
      
      res.on('data', function (chunk) {
        fs.writeSync(fd, chunk);
        grunt.verbose.writeln("Wrote chunk...");
      });
      
      res.on('end', function() {
          grunt.log.ok("Loaded");
          fs.closeSync(fd);
          done();
      });
    }).on('error', function(e) {
      grunt.fail.fatal("Got error: " + e.message);
    });
  });

};