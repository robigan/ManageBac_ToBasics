/// <reference path="../typings/index.d.ts" />

const patcher = async () => {
    if (!(window.location.pathname === "/student/theme")) return;
    const studentProfileNavbar = $("ul.nav.nav-tabs");
    const customThemes = $("<li><a>Custom Themes</a></li>");
    studentProfileNavbar.append(customThemes);
    customThemes.on("click", () => {
        studentProfileNavbar.children().each((index, el) => {
            el.classList = "";
        });
        customThemes.addClass("active");
    });
};

module.exports = {
    "event": "DOMContentLoaded",
    "patch": patcher,
    "id": "themes"
};