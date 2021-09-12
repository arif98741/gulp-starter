var gulp = require('gulp'); 
var cssnano = require('gulp-cssnano'); 
//var sass = require('node-sass'); 
var concat = require('gulp-concat'); 
var uglify = require('gulp-uglify');
const sass = require('gulp-sass')(require('node-sass'));


gulp.task('sass', function(){    
    return gulp.src('app/style.scss')       
        .pipe(sass())       
        .pipe(cssnano())       
        .pipe(gulp.dest('dist/css')); 
});

gulp.task('js', function(){    
    return gulp.src(['app/js/plugins/*.js', 'app/js/*.js'])          
        .pipe(concat('all.js'))       
        .pipe(uglify())       
        .pipe(gulp.dest('dist')); 
});

gulp.task('watch', function () {
    gulp.watch('./app/*.scss', gulp.series('sass'));
    gulp.watch('./app/js/**/*.js', gulp.series('js'));
});

gulp.task('default', gulp.series('sass', 'js', 'watch'));