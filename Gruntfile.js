 module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      expanded: {
        options: { outputStyle: 'expanded' },
        files: { 'public/css/style.css': 'public/scss/style.scss' }
      },
      compressed: {
        options: { outputStyle: 'compressed' },
        files: { 'css/style.min.css': 'scss/style.scss' }
      }
    },
    watch: {
      configFiles: {
        files: ['Gruntfile.js', 'package.json'],
        options: { reload: true }
      },
      scss: {
        files: ['public/scss/**/*.scss'],
        tasks: ['sass'],
        options: { livereload: true }
      },
      index: {
        files: ['index.html'],
        options: { livereload: true }
      }
    }
  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('default', ['sass:expanded', 'watch']);
  // grunt.registerTask('deploy', ['jshint', 'sass:compressed', 'concat', 'uglify', 'replace:production']);
}; 