// const { resolve } = require("node:path");
import { resolve } from "node:path";
import jQueryStatic from "jquery";
window.addEventListener("DOMContentLoaded", () => {
    // const jQuery = require("jquery");
    const jQuery = jQueryStatic(window, true);
    window.jQuery = jQuery;
    window.$ = jQuery;
});
require(resolve(__dirname, "./login.js"));
require(resolve(__dirname, "../core/themes.js"));
require(resolve(__dirname, "../core/globalCss.js"));
// require(resolve(__dirname, "./contextMenu.js"));
