/// <reference path="../typings/index.d.ts" />

const patcher = async () => {
    if (location.host.endsWith(".managebac.com") && !(location.host === "www.managebac.com") && (location.pathname === "/student/theme" || location.pathname === "/student/profile")) {
        console.log("Running themes patcher");
        const studentProfileNavbar = $("ul.nav.nav-tabs");
        const customThemes = $("<li><a>Custom Themes</a></li>");
        studentProfileNavbar.append(customThemes);
        customThemes.on("click", () => {
            studentProfileNavbar.children().each((index, el) => {
                el.classList = "";
            });
            customThemes.addClass("active");
        });
    }
};

module.exports = {
    "event": "DOMContentLoad",
    "patch": patcher,
    "id": "themes"
};