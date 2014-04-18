/*global module:false*/
module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        meta: {
            version: '1.1.0'
        },
        banner: '/*! jQuery validate personnummer - v<%= meta.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '* https://github.com/montania/jQuery-validate-personnummer/\n' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> ' +
            'Montania System AB; Apache 2.0 License*/\n',
        // Task configuration.
        concat: {
            options: {
                banner: '<%= banner %>',
                stripBanners: true
            },
            dist: {
                src: ['bower_components/luhnar/dist/luhnar.js', 'src/validator.js'],
                dest: 'jquery.validate.personnummer.js'
            }
        },
        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            dist: {
                src: '<%= concat.dist.dest %>',
                dest: 'jquery.validate.personnummer.min.js'
            }
        },
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                unused: true,
                boss: true,
                eqnull: true,
                browser: true,
                globals: {
                    jQuery: true,
                    Luhnar: true
                }
            },
            gruntfile: {
                src: 'Gruntfile.js'
            },
            src: {
                src: ['src/*js']
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // Default task.
    grunt.registerTask('default', ['jshint', 'concat', 'uglify']);
    grunt.registerTask('build', ['jshint', 'concat', 'uglify']);

};
