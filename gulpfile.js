var gulp = require("gulp");
var plumber = require("gulp-plumber");
var scss = require("gulp-sass");
var sourcemap = require("gulp-sourcemaps");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var cssnano = require("gulp-cssnano");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var htmlmin = require("gulp-htmlmin");
var uglify = require("gulp-uglify");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var svgstore = require("gulp-svgstore");
var rename = require("gulp-rename");
var del = require("del");
var server = require("browser-sync").create();

gulp.task("css", function() {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(scss())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(cssnano())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"));
});

gulp.task("images", function() {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({ optimizationLevel: 3 }),
      imagemin.jpegtran({ progressive: true }),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("source/img"));
});

gulp.task("webp", function() {
  return gulp.src("source/img/**/*.{png,jpg}")
    .pipe(webp({ quality: 85 }))
    .pipe(gulp.dest("source/img"));
});

gulp.task("sprite", function() {
  return gulp.src("source/img/**/*.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"))
});


gulp.task("html", function() {
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("build"))
});

gulp.task("js", function() {
  return gulp.src("source/js/*.js")
    .pipe(uglify())
    .pipe(rename(function(path) {
      path.basename += ".min";
      path.extname = ".js";
    }))
    .pipe(gulp.dest("build/js"))
});

gulp.task("copy", function() {
  return gulp.src([
      "source/manifest/site.webmanifest",
      "source/fonts/**/*.{woff,woff2}",
      "source/img/**",
      "!source/img/sprite/**",
      "!source/img/bg-triangle.svg",
      "!source/img/bg-intro-triangle-*.svg"
    ], {
      base: "source"
    })
    .pipe(gulp.dest("build"))
});

gulp.task("clean", function() {
  return del("build");
});

gulp.task("server", function() {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.scss", gulp.series("css", "refresh"));
  gulp.watch("source/img/*.svg", gulp.series("sprite", "html", "refresh"));
  gulp.watch("source/*.html", gulp.series("html", "refresh"));
  gulp.watch("source/js/*.js", gulp.series("js", "refresh"));
});

gulp.task("refresh", function(done) {
  server.reload();
  done();
});

gulp.task("build", gulp.series("clean", "copy", "css", "sprite", "html", "js"));
gulp.task("start", gulp.series("build", "server"));
