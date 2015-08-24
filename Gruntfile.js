module.exports = function (grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		browserify: {
			build: {
				options: {
					banner: '/* screen-inspector v<%= pkg.version %> by luobotang build <%= grunt.template.date("yyyy-mm-dd") %> */\n'
				},
				src: 'build.js',
				dest: 'build/screen-inspector.js'
			}
		}
	})

	grunt.loadNpmTasks('grunt-browserify')

	grunt.registerTask('default', ['browserify'])
}