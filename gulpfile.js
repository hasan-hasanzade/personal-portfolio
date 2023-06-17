// Osnovnoy Modul
import gulp from "gulp";
// Import putey
import { path } from "./gulp/config/path.js";
//Import obwix plaginov
import { plugins } from "./gulp/config/plugins.js"

// Peredaem znaceniya v qlobalnuyu peremennuyu
global.app = {
   isBuild: process.argv.includes('--build'),
	isDev: !process.argv.includes('--build'),
   path: path,
   gulp: gulp,
   plugins: plugins
}

// Import zadac
import { copy } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js";
import { images } from "./gulp/tasks/images.js";
import { otfToTtf, ttfToWoff, fonstStyle} from "./gulp/tasks/fonts.js";
import { svgSprive } from "./gulp/tasks/svgSprive.js";
import { zip } from "./gulp/tasks/zip.js";
import { ftp } from "./gulp/tasks/ftp.js";

// nabludatel za izmeneniyami v faylax

function watcher() {
   gulp.watch(path.watch.files, copy);
   gulp.watch(path.watch.html, html);
   gulp.watch(path.watch.scss, scss);
   gulp.watch(path.watch.js, js);
   gulp.watch(path.watch.images, images);
}

export { svgSprive }

const fonts = gulp.series(otfToTtf, ttfToWoff, fonstStyle);

const mainTasks = gulp.series(fonts, gulp.parallel(copy, html, scss, js, images));

// Postroeniye scenariyev vipolneniya zadac
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks);
const deployZIP = gulp.series(reset, mainTasks, zip);
const deployFTP = gulp.series(reset, mainTasks, ftp);

//export scenariev
export { dev }
export { build }
export { deployZIP }
export { deployFTP }

// Vpolnenie scenariya po umolcaniyu
gulp.task('default', dev);