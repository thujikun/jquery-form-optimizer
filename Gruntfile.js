/**
 * @fileoverview Gruntfile.js
 * @author thujikun
 * @version 1.0.0
 */

'use strict';

module.exports = function(grunt) {
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    grunt.initConfig({
        path: {
            'src':   'src',
            'js':    'src/js',
            'views': 'src/_views',
            'css':   'src/_styl',
            'data':  'src/_data',
            'bower': 'bower_components',
            'dist':  'dist',
            'tmp':   '.tmp',
            'demo':  'demo',
            'doc':   'docs'
        },
        esteWatch: {
            options: {
                dirs: ['<%= path.src %>/**'],
                livereload: {
                    enabled: true,
                    extensions: [
                        'html',
                        'jade',
                        'json',
                        'styl',
                        'js'
                    ],
                    port: 35742
                }
            },
            html: function() {
                return ['copy:doc'];
            },
            jade: function() {
                return ['jade'];
            },
            json: function() {
                return ['jade'];
            },
            styl: function() {
                return ['stylus', 'autoprefixer'];
            },
            js: function() {
                return ['uglify', 'copy:doc', 'copy:demo'];
            }
        },
        uglify: {
            options: {
                ascii_only: true,
                preserveComments: 'some',
                banner: '/**' + '\n' +
                     '* @fileOverview optimize form' + '\n' +
                     '* @description depend on jQuery' + '\n' +
                     '* @name jquery-form-optimizer.js' + '\n' +
                     '* @author thujikun' + '\n' +
                     '* @version 1.0.0' + '\n' +
                     '* Copyright (c) 2015 "thujikun" Ryosuke Tsuji' + '\n' +
                     '* Licensed under the MIT license.' + '\n' +
                    '*/'
            },
            core: {
                files: {
                    '<%= path.dist %>/jquery-form-optimizer.min.js': [
                        '<%= path.bower %>/jquery-input-helper/dist/jquery-input-helper.js',
                        '<%= path.bower %>/jquery-validator/dist/jquery-validator.js'
                    ]
                }
            },
            demo: {
                files: {
                    '<%= path.demo %>/jquery-form-optimizer.min.js': [
                        '<%= path.bower %>/jquery-input-helper/dist/jquery-input-helper.js',
                        '<%= path.bower %>/jquery-validator/dist/jquery-validator.js'
                    ]
                }
            },
            doc: {
                files: {
                    '<%= path.doc %>/js/jquery-form-optimizer.min.js': [
                        '<%= path.bower %>/jquery-input-helper/dist/jquery-input-helper.js',
                        '<%= path.bower %>/jquery-validator/dist/jquery-validator.js'
                    ]
                }
            },
        },
        jade: {
            src: {
                files: [{
                    expand: true,
                    cwd: '<%= path.views %>',
                    src: ['{,**/}*.jade', '!**/_*'],
                    dest: '<%= path.demo %>',
                    ext: '.html'
                }],
                options: {
                    client: false,
                    pretty: true,
                    basedir: '<%= path.views %>',
                    data: function(dest, src) {
                        var page = src[0].replace(/drc\/_views\/(.*)\/index.jade/, '$1');
                        var validationConfig = require('./' + grunt.config.data.path.data + '/validator.json');
                        var inputHelperConfig = require('./' + grunt.config.data.path.data + '/input-helper.json');

                        if (page == src[0]) {
                            page = 'index';
                        }

                        return {
                            page: page,
                            validationConfig: validationConfig,
                            inputHelperConfig: inputHelperConfig
                        };
                    }
                }
            }
        },
        stylus: {
            demo: {
                files: [{
                    expand: true,
                    cwd: '<%= path.css %>',
                    src: ['{,**/}*.styl', '!**/_*'],
                    dest: '<%= path.tmp %>/css',
                    ext: '.css'
                }],
                options: {
                    compress: false,
                    urlfunc: 'url'
                }
            },
            doc: {
                files: [{
                    expand: true,
                    cwd: '<%= path.src %>/docs/_styl',
                    src: ['{,**/}*.styl', '!**/_*'],
                    dest: '<%= path.tmp %>/css',
                    ext: '.css'
                }],
                options: {
                    compress: false,
                    urlfunc: 'url'
                }
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= path.css %>',
                    src: ['{,**/}efo.styl'],
                    dest: '<%= path.dist %>/css',
                    ext: '.css'
                }],
                options: {
                    compress: false,
                    urlfunc: 'url'
                }
            },
        },
        autoprefixer: {
            options: {
                browsers: ['last 2 version']
            },
            demo: {
                files: [{
                    expand: true,
                    cwd: '<%= path.tmp %>',
                    src: ['css/{,**/}*.css'],
                    dest: '<%= path.demo %>'
                }]
            },
            doc: {
                files: [{
                    expand: true,
                    cwd: '<%= path.tmp %>',
                    src: ['css/{,**/}*.css'],
                    dest: '<%= path.doc %>'
                }],
            },
        },
        copy: {
            demo: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= path.src %>',
                    src: ['{,**/}*.*', '!**/_*/{,**/}*.*'],
                    dest: '<%= path.demo %>'
                }]
            },
            doc: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= path.src %>/docs',
                    src: ['{,**/}*.*', '!**/_*/{,**/}*.*'],
                    dest: '<%= path.doc %>'
                }]
            },
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= path.js %>',
                    src: ['{,**/}execute.js'],
                    dest: '<%= path.dist %>'
                }]
            },
            jquery: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= path.bower %>/jquery/dist/',
                    src: ['jquery.min.js'],
                    dest: '<%= path.demo %>/js/vendor/jquery'
                }]
            },
            jquerydoc: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= path.bower %>/jquery/dist/',
                    src: ['jquery.min.js'],
                    dest: '<%= path.doc %>/js/vendor/jquery'
                }]
            }
        },
        clean: {
            tmp: '<%= path.tmp %>',
            dist: '<%= path.dist %>',
            demo: '<%= path.demo %>',
            doc: '<%= path.doc %>'
        },
        connect: {
            options: {
                port: 9292,
                hostname: '0.0.0.0',
                livereload: 35742,
            },
            demo: {
                options: {
                    open: 'http://localhost:9292/',
                    base: [
                        '<%= path.demo %>',
                        '<%= path.bower %>'
                    ]
                }
            },
            doc: {
                options: {
                    open: 'http://localhost:9292/',
                    base: '<%= path.doc %>'
                }
            }
        },
        'sftp-deploy': {
            demo: {
                auth: {
                    host: '119.81.12.94',
                    port: 22,
                    authKey: 'webfaction'
                },
                src: '<%= path.demo %>',
                dest: '/home/thujikun/webapps/form_optimizer/demo'
            },
            docs: {
                auth: {
                    host: '119.81.12.94',
                    port: 22,
                    authKey: 'webfaction'
                },
                src: '<%= path.doc %>',
                dest: '/home/thujikun/webapps/form_optimizer/docs'
            },
            spec: {
                auth: {
                    host: '119.81.12.94',
                    port: 22,
                    authKey: 'webfaction'
                },
                src: 'jsdoc/jquery-form-optimizer',
                dest: '/home/thujikun/webapps/form_optimizer/spec'
            },
        },
        jsdoc: {
            source: {
                src: [
                    '<%= path.bower %>/jquery-validator/src/js/jquery-validator.js',
                    '<%= path.bower %>/jquery-input-helper/src/js/jquery-input-helper.js',
                ],
                options: {
                    destination: 'jsdoc/jquery-form-optimizer/',
                    configure: 'jsdoc/template/jsdoc.conf.json',
                    template: 'jsdoc/template'
                },
            },
        },
    });

    grunt.registerTask('serve', [
        'clean:tmp',
        'clean:demo',
        'stylus:demo',
        'autoprefixer:demo',
        'jade',
        'copy:demo',
        'copy:jquery',
        'uglify:demo',
        'connect:demo',
        'esteWatch'
    ]);

    grunt.registerTask('doc', [
        'clean:tmp',
        'clean:doc',
        'copy:doc',
        'copy:jquerydoc',
        'stylus',
        'autoprefixer:doc',
        'uglify:doc',
        'connect:doc',
        'esteWatch'
    ]);

    grunt.registerTask('preview', [
        'clean:tmp',
        'clean:demo',
        'stylus:demo',
        'autoprefixer:demo',
        'jade',
        'copy:demo',
        'copy:jquery',
        'uglify:demo',
        'sftp-deploy:demo'
    ]);

    grunt.registerTask('document', [
        'clean:tmp',
        'clean:doc',
        'copy:doc',
        'copy:jquerydoc',
        'stylus',
        'autoprefixer:doc',
        'uglify:doc',
        'jsdoc',
        'sftp-deploy:docs',
        'sftp-deploy:spec',
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'uglify',
        'copy:dist',
        'stylus:dist'
    ]);
};
