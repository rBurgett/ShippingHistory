/*global module*/

module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        requirejs: {
            compile: {
                options: {
                    baseUrl: "public/js",
                    mainConfigFile: "public/js/main.js",
                    name: "main",
                    out: "public/js/mainCompiled.js"
                }
            }
        },
        uglify: {
            build: {
                src: 'public/js/bower/requirejs/require.js',
                dest: 'public/js/require.min.js'
            }
        },
        watch: {
            scripts: {
                files: ['js/*.js'],
                tasks: ['requirejs', 'uglify'],
                options: {
                    spawn: false
                }
            }
        }
    });

// 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

// 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['requirejs']);

};