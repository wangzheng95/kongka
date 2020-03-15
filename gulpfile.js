const gulp = require("gulp");

// html
gulp.task("copy-html", function() {
        return gulp.src("*.html")
            .pipe(gulp.dest("dist/"))
            .pipe(connect.reload())
    })
    // images
gulp.task("images", function() {
        return gulp.src("images/**/*")
            .pipe(gulp.dest("dist/images"))
            .pipe(connect.reload())
    })
    // js
gulp.task("scripts", function() {
        return gulp.src(["*.js", "!gulpfile.js"])
            .pipe(gulp.dest("dist/js"))
            .pipe(connect.reload())
    })
    // data
gulp.task("data", function() {
    return gulp.src(["*.json", "!package.json"])
        .pipe(gulp.dest("dist/data"))
        .pipe(connect.reload())
})

// css
const scss = require("gulp-sass")
const minify = require("gulp-minify")
const rename = require("gulp-rename")
gulp.task("scss", function() {
    return gulp.src("scss/index.scss")
        .pipe(scss())
        .pipe(gulp.dest("dist/css"))
        .pipe(minify())
        .pipe(rename("index.min.css"))
        .pipe(gulp.dest("dist/css"))
        .pipe(connect.reload())
})

// 一次性执行多个任务
gulp.task("build", ["copy-html", "images", "scripts", "data", "scss"], function() {
    console.log("项目建立成功");
})

// 启动监听
gulp.task("watch", function() {
        gulp.watch("*.html", ["copy-html"])
        gulp.watch("images/**/*", ["images"])
        gulp.watch(["*.js", "!gulpfile.js"], ["scripts"])
        gulp.watch(["*.json", "!package.json"], ["data"])
        gulp.watch("scss/index.scss", ["scss"])
    })
    // 启动一个服务器
const connect = require("gulp-connect")
gulp.task("server", function() {
        connect.server({
            root: "dist",
            port: 8888,
            livereload: true
        })
    })
    // 同时启动服务和监听
gulp.task("default", ["watch", "server"])