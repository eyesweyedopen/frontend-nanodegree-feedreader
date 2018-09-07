const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const sass = require('gulp-sass');
const eslint = require('gulp-eslint');
const jasmine = require('gulp-jasmine-phantom');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');

gulp.task('default', [], function() {
    gulp.watch('app/sass/**/*.scss', []);
    gulp.watch('app/js/**/*/js', []);
    gulp.watch('app/docs/index.html', []);
    gulp.watch('dist/img/*', []);
    gulp.watch('dist/index.html').on('change', browserSync.reload);

    browserSync.init({
        server: './dist'
    });
});

gulp.task('dist', [
    'copy-html',
    'crunch-images',
    'styles',
    'lint',
    'scripts-dist'
]);

gulp.task('scripts', function() {
    gulp.src('js/**/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('scripts-dist', function() {
    gulp.src('js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('copy-html', function() {
    gulp.src('app/docs/index.html')
        .pipe(gulp.dest('./dist'));
});

gulp.task('crunch-images', function() {
    gulp.src('app/img/*')
        .pipe(imagemin({
            progressive: true,
            use: [pngquant()]
        }))
        .pipe(gulp.dest('dist/img'));
});

gulp.task('styles', function() {
    gulp.src('app/sass/**/*.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
});

gulp.task('lint', function() {
    return gulp.src(['app/js/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('tests', function() {
    gulp.src('jasmine/spec/feedreader.js')
        .pipe(jasmine({
            integration: true,
            vendor: 'app/js/**/*.js'
        }));
});