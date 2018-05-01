module.exports = function (grunt) {
    grunt.initConfig({
        copy: {
            public: {
                cwd: 'public',
                src: '**',
                dest: 'dist',
                expand: true
            }
        },
        clean: {
            dist: {
                src: 'dist'
            }
        },
        useminPrepare: {
            html: 'dist/**/*.html'
        },
        usemin: {
            html: ' dist/**/*.html'
        },
        imagemin: {
            public: {
                expand: true,
                cwd: 'dist/img',
                src: '**/*.{png,jpg,gif}',
                dest: 'dist/img'
            }
        },
        rev: {
            options: {
                encoding: 'utf8',
                algorithm: 'md5',
                lenght: 8
            },
            imagens: {
                src: ['dist/img/**/*.{png,jpg,gif}']
            },
            minificados: {
                src: ['dist/js/**/*.min.js', 'dist/css/**/*.min.css']
            }
        },
        watch: {
            files: ['public/**'],
            tasks: ['default']
        },
        jshint: {
            js: {
                src : ['public/static/js/**/*.js']
            }
        },
        browserSync: {
            public: {
                bsFiles: {
                  watchTask : true,
                  src : ['public/**/*']
                }
            },
            options : {
                server : {
                    baseDir: 'public'
                }
            }
      }

    });
    
    grunt.registerTask('server', ['browserSync', 'watch']);
    grunt.registerTask('dist', ['clean', 'jshint', 'copy']);
    grunt.registerTask('minifica', ['useminPrepare', 'concat', 'uglify', 'cssmin', 'rev', 'usemin', 'imagemin']);
    grunt.registerTask('default', ['dist', 'minifica', 'server']);

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-rev');
    grunt.loadNpmTasks('grunt-usemin');
};