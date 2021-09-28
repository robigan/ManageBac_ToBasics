const { resolve } = require("path");

const TO_HIDE = ["header#main-header", "div.secondary-nav.nav-learning-platform", "footer.et-l.et-l--footer"];
const TO_FIX = "div#page-container";

const patcher = () => {
    if (location.host === "www.managebac.com", location.pathname === "/login") {
        console.log("Applying patch script");
        TO_HIDE.forEach((query) => document.querySelector(query).style.display = "none");
        (async () => {
            setTimeout(() => document.querySelector(TO_FIX).style.paddingTop = "0px", 300);
        })().catch(console.error);
    }
};

window.addEventListener("load", patcher);

/** @type {import("../JSDoc.js").core} */
const cores = [(require(resolve(__dirname, "../core/themes.js")))];

cores.forEach((core) => {
    window.addEventListener(core.event, core.patch);
});