const gulp = require("gulp");
const { series, parallel } = require("gulp");
const csso = require("gulp-csso");
const ejs = require("gulp-ejs");
const rename = require("gulp-rename");
const fs = require("fs");
const htmlmin = require("gulp-htmlmin");
const uglify = require("gulp-uglify");
const autoprefixer = require("gulp-autoprefixer");

function removePreviousBuild(cb) {
  fs.stat("../include/wwwfront.h", function (err, stats) {
    if (!err) {
      fs.unlinkSync("../include/wwwfront.h");
    }
    cb();
  });
}

function removeDistBuildFolder(cb) {
  fs.rmSync("./dist", { recursive: true, force: true });
  cb();
}

function confirmDistAndParentIncludeFolder(cb) {
  if (!fs.existsSync("../include")) {
    fs.mkdirSync("../include");
  }
  if (!fs.existsSync("./dist")) {
    fs.mkdirSync("./dist");
  }
  cb();
}

function minifyHtml() {
  return gulp
    .src("src/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("dist"));
}

function minifyCss() {
  return gulp
    .src("src/css/*.css")
    .pipe(autoprefixer())
    .pipe(csso())
    .pipe(gulp.dest("dist/css"));
}

function minifyJs() {
  return gulp.src("src/js/*.js").pipe(uglify()).pipe(gulp.dest("dist/js"));
}

function generateHeaderFile() {
  return gulp
    .src("./templates/*.ejs")
    .pipe(
      ejs({
        cssFile: fs.readFileSync("./dist/css/style.css", "utf8"),
        jsFile: fs.readFileSync("./dist/js/main.js", "utf8"),
        htmlFile: fs.readFileSync("./dist/index.html", "utf8"),
      })
    )
    .pipe(rename({ extname: ".hpp" }))
    .pipe(gulp.dest("../include"));
}

exports.build = series(
  confirmDistAndParentIncludeFolder,
  removePreviousBuild,
  parallel(minifyHtml, minifyCss, minifyJs),
  generateHeaderFile,
  removeDistBuildFolder
);
