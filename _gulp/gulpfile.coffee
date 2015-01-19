bower       = require 'bower'
gulp        = require 'gulp'
uglify      = require 'gulp-uglifyjs'

javascripts = [
  'jquery/dist/jquery.js'
  'vue/dist/vue.js'
  'page/page.js'
  'marked/lib/marked.js'
  'jquery-timeago/jquery.timeago.js'
  'bootstrap/dist/js/bootstrap.js'
  'highlightjs/highlight.pack.js'
]

gulp.task 'default', ['lib']

gulp.task 'lib', ->
  bower.commands.install().on 'end', -> gulp.start 'lib:pack'

gulp.task 'lib:pack', ->
  gulp.src javascripts.map (e) -> "bower_components/#{e}"
    .pipe uglify 'lib.js', outSourceMap: true
    .pipe gulp.dest '../public'
