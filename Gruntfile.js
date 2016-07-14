module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      expanded: {
        options: { outputStyle: 'expanded' },
        files: { '../frontend/css/style.css' : '../frontend/scss/style.scss' }
      }
    },
    watch: {
      configFiles: {
        files: ['Gruntfile.js', 'package.json'],
        options: { reload: true }
      },
      scss: {
        files: ['scss/scss/**/*.scss'],
        tasks: ['sass'],
        options: { livereload: true }
      }
    }
  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('default', ['sass:expanded', 'watch']);
}