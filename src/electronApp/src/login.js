// eslint-disable-next-line no-unused-vars
const development = process.env.NODE_ENV === "development" || false;
const { ipcRenderer } = require("electron/renderer");

window.addEventListener("DOMContentLoaded", async () => {
    if (location.host.endsWith(".managebac.com") && !(location.host === "www.managebac.com") && location.pathname === "/login") {
        if (ipcRenderer.sendSync("toggleRedirect", "get")) { // Ik it's blocking, but it's the only way I could think of that was efficient
            window.open("https://www.managebac.com/login", "_self");
            ipcRenderer.send("subdomainDefault", "update", "www");
        } else {
            ipcRenderer.send("toggleRedirect", "true");
            const subdomains = window.location.hostname.split(".");
            subdomains.pop();
            subdomains.pop();
            ipcRenderer.send("subdomainDefault", "update", subdomains.join(""));
        }
    }
});

const TO_HIDE = ["header#main-header", "div.secondary-nav.nav-learning-platform", "footer.et-l.et-l--footer"];
const TO_FIX = "div#page-container";
window.addEventListener("DOMContentLoaded", async () => {
    if (location.host === "www.managebac.com" && location.pathname === "/login") {
        $("body").addClass("et_hide_nav"); // This will hide the nav bar
        $(TO_FIX).attr({ "data-fix-page-container": "off" }); // This starts to disable certain functionalities
        // $("body").removeClass("et_fixed_nav");

        window.et_is_transparent_nav = true; // These 2 lines do some weird shit, that makes stuff work, should just disable an if check or 2
        window.et_is_vertical_nav = true;
        development ? console.log($("body").hasClass("et_fixed_nav")) : undefined;

        TO_HIDE.forEach((query) => document.querySelector(query).style.display = "none");

        // (async () => {
        //     setTimeout(() => document.querySelector(TO_FIX).style.paddingTop = "0px", 300);
        // })().catch(console.error);
        // document.querySelector(TO_FIX).style.paddingTop = "0px";

        ipcRenderer.send("toggleRedirect", "false");
    }
});
window.addEventListener("load", async () => {
    if (location.host === "www.managebac.com" && location.pathname === "/login") setTimeout(() => document.querySelector(TO_FIX).style.paddingTop = "0px", 300);
});