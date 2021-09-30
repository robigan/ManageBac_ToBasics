window.addEventListener("DOMContentLoaded", async () => {
    if (location.host.endsWith(".managebac.com") && !(location.host === "www.managebac.com") && (location.pathname === "/student/theme" || location.pathname === "/student/profile")) {
        const jQuery = require("jquery");
        const $ = jQuery;
        const studentProfileNavbar = $("#action-show > main > div.content-wrapper > div > div > div > ul");
        const customThemes = $("<li id='customThemes'><a>Custom Themes</a></li>");
        studentProfileNavbar.append(customThemes);
        customThemes.on("click", function() {
            const UI = $("<div><h3>ManageBack ToBasics Custom Themes</h3><p class='help-block'>Configure a preferable colour theme style inside of ManageBack ToBasics.</p></div>");

            studentProfileNavbar.children().each((index, el) => {
                el.classList = "";
            });
            customThemes.addClass("active");

            if (location.pathname === "/student/theme") {
                $("form#edit_user_14052645").remove();
                $($("div.content-block")[0]).append(UI);
            } else if (location.pathname === "/student/profile") {
                $("#action-show > main > div.content-wrapper > div > div > .section").remove();
                $("#action-show > main > div.content-wrapper > div > div > hr.divider").remove();
                $($("div.content-block")[0]).append(UI);
            }
        });
        //#edit_user_14052645
    }
});