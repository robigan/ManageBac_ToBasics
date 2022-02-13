declare global { // Some weird global flags managebac implements which seems to patch shit
    interface Window {
        et_is_transparent_nav: boolean;
        et_is_vertical_nav: boolean;
    }
}

import { ipcRenderer } from "electron/renderer";

const TO_HIDE = ["header#main-header", "div.secondary-nav.nav-learning-platform", "footer.et-l.et-l--footer"];
const TO_FIX = "div#page-container";

const development = process.env.NODE_ENV === "development" || false;

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

window.addEventListener("DOMContentLoaded", async () => {
    if (location.host === "www.managebac.com" && location.pathname === "/login") {
        $("body").addClass("et_hide_nav"); // This will hide the nav bar
        $(TO_FIX).attr({ "data-fix-page-container": "off" }); // This starts to disable certain functionalities
        // $("body").removeClass("et_fixed_nav");

        window.et_is_transparent_nav = true; // These 2 lines do some weird shit, that makes stuff work, should just disable an if check or 2
        window.et_is_vertical_nav = true;
        development ? console.log($("body").hasClass("et_fixed_nav")) : undefined;

        TO_HIDE.forEach((query) => {
            const el = document.querySelector(query) as HTMLElement; // Would be much more efficient to use document.querySelectorAll(), I am too lazy
            if (el !== null && el.style !== undefined) { // Typescript is right that the returned element can be of type Element, so assert that it has the style property to assert it's an HTMLElement
                el.style.display = "none";
            } else if (el !== null && el.style === undefined) {
                console.warn("Passed element for TO_HIDE in login.ts doesn't have a style property");
            }
        });

        ipcRenderer.send("toggleRedirect", "false");
    }
});

window.addEventListener("load", async () => {
    if (location.host === "www.managebac.com" && location.pathname === "/login") setTimeout(() => {
        const el = document.querySelector(TO_FIX) as HTMLElement;
        if (el !== null && el.style !== undefined) { // See the above code with the same sample
            el.style.paddingTop = "0px";
        } else if (el !== null && el.style === undefined) {
            console.warn("Passed element for TO_FIX in login.ts doesn't have a style property");
        }
    }, 300);
});