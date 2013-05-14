module.exports = function(grunt) {
  "use strict";

  grunt.registerMultiTask('concat', 'Concatenate files', function() {

    var files = this.files;

    this.files.forEach(function(file) {
      var output = file.src.map(function(filepath) {
        return grunt.file.read(filepath);
      }).join('\n');
      grunt.file.write(file.dest, output);
    });

  });

};