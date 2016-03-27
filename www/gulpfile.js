var gulp = require( 'gulp' );
// SASS
var sass = require( 'gulp-sass' );
var minifycss = require( 'gulp-minify-css' );
var rename = require( 'gulp-rename' );
// JS
var babel = require( 'gulp-babel' );
var concat = require( 'gulp-concat' );
var uglify = require( 'gulp-uglify' );
// for Non Stop
var plumber = require( 'gulp-plumber' );
var notifier = require( 'node-notifier' );
// for webserver
var gulp = require( 'gulp' ),
    webserver = require( 'gulp-webserver' );

gulp.task( 'sass', function () {
    gulp.src( './css/sass/**/*.scss' )
        .pipe( plumber( {
            errorHandler: function ( error ) {
                console.log( error );
                this.emit( 'end' );
                notifier.notify( {
                    title: error.plugin,
                    message: JSON.stringify( error.loc ),
                    sound: true,
                    wait: true
                } );
            }
        } ) )
        .pipe( concat( 'application.scss' ) )
        .pipe( sass() )
        .pipe( gulp.dest( './css' ) );
} );

gulp.task( 'js', function () {
    return gulp.src( './js/src/*.js' )
        .pipe( plumber( {
            errorHandler: function ( error ) {
                console.log( error );
                this.emit( 'end' );
                notifier.notify( {
                    title: error.plugin,
                    message: JSON.stringify( error.loc ),
                    sound: true,
                    wait: true
                } );
            }
        } ) )
        .pipe( babel( {
            presets: [ 'es2015' ]
        } ) )
        .pipe( concat( 'application.js' ) )
        .pipe( gulp.dest( './js' ) );
} );

gulp.task( 'watch', function () {
    gulp.watch( './css/sass/**/*.scss', [ 'sass' ] );
    gulp.watch( './js/src/**/*.js', [ 'js' ] );
} );

gulp.task( 'webserver', function () {
    gulp.src( './' )
        .pipe( webserver( {
            livereload: true,
            //directoryListing: true
        } ) );
} );

gulp.task( 'lib-css', function () {
    return gulp.src( [
    'node_modules/materialize-css/dist/css/materialize.min.css',
    'node_modules/animate.css/animate.css',
    'node_modules/jquery-colorbox/example1/colorbox.css'
  ] )
        .pipe( concat( 'lib.min.css' ) )
        .pipe( minifycss() )
        .pipe( gulp.dest( './css/' ) );
} );

gulp.task( 'lib-images', function () {
    return gulp.src( [
      'node_modules/jquery-colorbox/example1/images/*'
    ] )
        .pipe( gulp.dest( './css/images/' ) );
} );

gulp.task( 'lib-font', function () {
    return gulp.src( [
      'node_modules/materialize-css/dist/font/*'
    ] )
        .pipe( gulp.dest( './font/' ) );
} );

gulp.task( 'lib-js', function () {
    return gulp.src( [
    'node_modules/angular/angular.min.js',
    'node_modules/angular-route/angular-route.min.js',
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/jquery-colorbox/jquery.colorbox-min.js',
    'node_modules/materialize-css/dist/js/materialize.min.js',
    'node_modules/xdate/src/xdate.js'
  ] )
        .pipe( concat( 'lib.min.js' ) )
        .pipe( uglify() )
        .pipe( gulp.dest( './js/' ) );
} );

gulp.task( 'default', [ 'sass', 'js', 'lib-css', 'lib-images', 'lib-font', 'lib-js', 'webserver', 'watch' ] );