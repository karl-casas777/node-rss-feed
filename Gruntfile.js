module.exports = function(grunt) {
    grunt.initConfig({
        jshint: {
            all: [
                'bin/**/*',
                'modules/**/*.js',
                'public/javascripts/**/*.js',
                'test/**/*.js',
                'app.js',
                'Gruntfile.js',
            ],
        },
        mochaTest: {
            test: {
                src: ['test/**/*.js']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha-test');

    grunt.registerTask('test', ['mochaTest']);
};