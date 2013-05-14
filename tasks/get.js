module.exports = function(grunt) {
  "use strict";

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