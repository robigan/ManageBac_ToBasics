import { urlRe } from "./helper";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

/**
 * Function that handles the reading of CSS files and then applying them to the webContents
 */
const setupCssLoader = async (webContents: Electron.WebContents) => {
    // Load all css styles from file
    const style = readFile(resolve(__dirname, "../page/globalStyle.css"), { encoding: "utf-8", flag: "r" });

    webContents.on("did-start-loading", async () => {
        const match = webContents.getURL().match(urlRe);
        if (match !== null && match[1].endsWith(".managebac.com")) {
            webContents.insertCSS((await style).toString());
        }
    });
};

export { setupCssLoader };