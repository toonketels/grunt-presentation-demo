module.exports = function(grunt) {
  "use strict";

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
    console.log('Option parameters');
    env = grunt.option('env') || 'staging';
    console.log(env);
    
    console.log(grunt.option.flags());

  });

};