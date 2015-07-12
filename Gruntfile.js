module.exports = function(grunt) {
    grunt.initConfig({
        jshint: {
            all: [
                'bin/**/*',
                'modules/**/*.js',
                'public/javascripts/**/*.js',
                'app.js',
                'Gruntfile.js',
            ],
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
};