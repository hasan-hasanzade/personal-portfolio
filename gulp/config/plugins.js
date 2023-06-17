import replace from "gulp-replace";//Poisk i zamena
import plumber from "gulp-plumber";// Obrabotka owibok
import notify from "gulp-notify";// Soobweniya (podskazki)
import size from "gulp-size";
import browsersync from "browser-sync";// Lokalniy server
import newer from "gulp-newer"; // Proverka obnovleniya
import ifPlugin from "gulp-if"; // Uslovnoe vetvlenie

export const plugins = {
   replace: replace,
   plumber: plumber,
   notify: notify,
   size: size,
   browsersync: browsersync,
   newer: newer,
   if: ifPlugin
}