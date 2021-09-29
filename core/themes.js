window.addEventListener("DOMContentLoaded", async () => {
    if (location.host.endsWith(".managebac.com") && !(location.host === "www.managebac.com") && (location.pathname === "/student/theme" || location.pathname === "/student/profile")) {
        const jQuery = require("jquery");
        const studentProfileNavbar = jQuery("ul.nav.nav-tabs");
        const customThemes = jQuery("<li><a>Custom Themes</a></li>");
        studentProfileNavbar.append(customThemes);
        customThemes.on("click", () => {
            studentProfileNavbar.children().each((index, el) => {
                el.classList = "";
            });
            customThemes.addClass("active");
        });
    }
});