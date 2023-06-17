import fileInclude from 'gulp-file-include';
import webpHtmlNosvg from 'gulp-webp-html-nosvg';
import versionNumber from 'gulp-version-number';
import htmlMin from "gulp-htmlmin"
import gulp from 'gulp-pug';

export const html = () => {
   return app.gulp.src(app.path.src.html)
      .pipe(app.plugins.plumber(
         app.plugins.notify.onError({
            title: "HTML",
            message: "Error: <%= error.message %>"
         }))
      )
      .pipe(fileInclude())
      .pipe(
         app.plugins.if(
            app.isBuild,
            app.plugins.size({
               title: "Before compression"
               })
         )     
      )
      .pipe(
         app.plugins.if(
            app.isBuild,
            htmlMin()
         )     
      )
      // .pipe(pug({
      //    // sjatie html fayla
      //    pretty: true,
      //    // Pokazivat v terminale kakoy fayl obrabotan
      //    verbose: true
      // }))
      .pipe(app.plugins.replace(/@img\//g, 'img/'))
      .pipe(
         app.plugins.if(
            app.isBuild,
            webpHtmlNosvg()
         )
      )
      .pipe(
         app.plugins.if(
            app.isBuild,
            versionNumber({
               'value': '%DT%',
               'append': {
                  'key': '_v',
                  'cover': 0,
                  'to': [
                     'css',
                     'js',
                  ]
               },
               'output': {
                  'file': 'gulp/version.json'
               }
            })
         )       
      )
      .pipe(
         app.plugins.if(
            app.isBuild,
            app.plugins.size({
               title: "After compression"
               })
         )     
      )
      .pipe(app.gulp.dest(app.path.build.html))
      .pipe(app.plugins.browsersync.stream())
}