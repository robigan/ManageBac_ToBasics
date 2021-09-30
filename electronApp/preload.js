const { resolve } = require("path");
const development = process.env.NODE_ENV === "development" || false;

const TO_HIDE = ["header#main-header", "div.secondary-nav.nav-learning-platform", "footer.et-l.et-l--footer"];
const TO_FIX = "div#page-container";

const patcher = () => {
    if (location.host === "www.managebac.com", location.pathname === "/login") {
        development ? console.log("Applying patch script") : undefined;
        TO_HIDE.forEach((query) => document.querySelector(query).style.display = "none");
        (async () => {
            setTimeout(() => document.querySelector(TO_FIX).style.paddingTop = "0px", 300);
        })().catch(console.error);
    }
};

window.addEventListener("load", patcher);

require(resolve(__dirname, "../core/themes.js"));