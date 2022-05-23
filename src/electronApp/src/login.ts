export {}; // https://stackoverflow.com/a/59499895

const TO_HIDE = ["#main-header", "#et-main-area > footer", "#intercom-frame", "#intercom-container", "#intercom-css-container"];
const TO_FIX = "#page-container";

const development = process.env.NODE_ENV === "development" || false;

window.addEventListener("DOMContentLoaded", async () => {
    if (location.host === "www.managebac.com" && location.pathname === "/login") {
        TO_HIDE.forEach((query) => {
            $(query).remove();
        });

        $(TO_FIX).css("paddingTop", "0px");
    }
});