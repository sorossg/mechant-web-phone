/**
 * Created by kevin on 2/9/15.
 */
module.exports = function (grunt) {
    return {
        'less': {
            files: 'assets/less/**/*.less',
            tasks: ['less:compile'],
            options: {
                livereload: true
            }
        }
    };
};