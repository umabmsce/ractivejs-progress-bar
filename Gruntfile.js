module.exports = function(grunt) {
    
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files: 'src/**/*.js',
            options: {
                asi: true,
                sub: true
            }
        },
        concat: {
            build: {
                src: 'src/**/*.js',
                dest: 'bin/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'dist/scripts/<%= pkg.name %>.js',
                dest: 'dist/scripts/<%= pkg.name %>.min.js'
            }
        },
        // Compiles Sass to CSS and generates necessary files if requested
        compass: {
          options: {
            sassDir: 'src/styles',
            cssDir: 'src/styles',
            imagesDir: 'src/images',
            javascriptsDir: 'src/scripts',
            importPath: 'bower_components',
            httpImagesPath: 'src/images',
            relativeAssets: true,
            assetCacheBuster: false,
            debugInfo: true,
            lineComments: false,
            raw: 'Sass::Script::Number.precision = 10\n'
          },
          dist: {
            options: {
              generatedImagesDir: 'bin/images/generated'
            }
          },
          server: {
            options: {
              debugInfo: true
            }
          }
        },
        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: 'src',
                        dest: 'dist',
                        src: [
                            '**/!templates.js',
                            '*.{ico,png,txt,xml}',
                            '.htaccess',
                            '*.html',
                            'views/{,**/*}*.html',
                            'bower_components/**/*',
                            'images/{,**/*}*.{webp,png,jpg,jpeg,gif,svg}',
                            'json/{,**/*}*.*',
                            'styles/fonts/*'
                        ]
                    },
                    {
                        expand: true,
                        cwd: '.tmp/images',
                        dest: 'dist/images',
                        src: ['generated/*']
                    }
                ]
            },
            styles: {
                expand: true,
                cwd: 'src/styles',
                dest: '.tmp/styles/',
                src: '{,**/*}*.css'
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compass')
    grunt.loadNpmTasks('grunt-contrib-copy');;

    grunt.registerTask('default', ['copy', 'jshint', 'concat', 'uglify', 'compass']);
};