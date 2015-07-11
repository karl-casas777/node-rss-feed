module.exports = function(grunt) {
    grunt.initConfig({
        jshint: {
            all: ['Gruntfile.js', 'modules/*.js', 'public/javascripts/*.js'],
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
};