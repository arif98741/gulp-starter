var gulp = require('gulp'); 
var cssnano = require('gulp-cssnano'); 
//var sass = require('node-sass'); 
var concat = require('gulp-concat'); 
var uglify = require('gulp-uglify');
const sass = require('gulp-sass')(require('node-sass'));
var browserSync = require('browser-sync').create();


// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("app/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("app/css"))
        .pipe(browserSync.stream());
});

gulp.task('js', function(){    
    return gulp.src(['app/js/plugins/*.js', 'app/js/*.js'])          
        .pipe(concat('all.js'))       
        .pipe(uglify())       
        .pipe(gulp.dest('dist')); 
});

// Static Server + watching scss/html files
gulp.task('serve', gulp.series('sass', function() {

    browserSync.init({
        server: "./app/"
    });

    gulp.watch("app/scss/*.scss", gulp.series('sass'));
    gulp.watch('app/js/**/*.js', ['js']); 
    gulp.watch("app/*.html").on('change', browserSync.reload);

}));

gulp.task('default', gulp.series('serve'));