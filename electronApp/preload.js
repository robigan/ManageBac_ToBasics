const { resolve } = require("node:path");

window.addEventListener("DOMContentLoaded", () => {
    const jQuery = require("jquery");
    
    window.jQuery = jQuery;
    window.$ = jQuery;
});

require(resolve(__dirname, "./login.js"));
require(resolve(__dirname, "../core/themes.js"));