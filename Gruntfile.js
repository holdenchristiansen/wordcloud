module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {
      options: {
        port: process.env.PORT || 8000
      },
      prod: {
        options: {
          keepalive: true
        }
      },
      dev: {},
    },

    watch: {
      css: {
        files: ['Gruntfile.js', 'src/css/*', 'src/js/*', 'src/js/vendor/*'],
        tasks: ['less', 'jshint', 'uglify'],
      }
    },

    less: {
      files: {
        src: ['src/css/app.less'],
        dest: 'build/app.min.css',
        options: {
          compress: true,
        }
      }
    },

    jshint: {
      all: ['Gruntfile.js', 'src/js/*.js']
    },

    uglify: {
      files: {
        src: [
          'src/js/vendor/*.js',
          'src/js/*.js'
        ],
        dest: 'build/app.min.js'
      }
    }

  });

  grunt.registerTask('default', [
    'less',
    'jshint',
    'uglify',
    'connect:dev',
    'watch:css',
  ]);

  grunt.registerTask('prod', [
    'less',
    'uglify',
    'connect:prod',
  ]);
};
