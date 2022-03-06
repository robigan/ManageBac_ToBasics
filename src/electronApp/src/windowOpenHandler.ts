import { shell } from "electron/common";
import { webContentsOptions, urlRe } from "./helper";

/**
 * A function that will handle new window opening behavior
 */
const setupWindowOpenHandler = async (webContents: Electron.WebContents) => {
    webContents.setWindowOpenHandler((details) => {
        const match = details.url.match(urlRe);
        if (match !== null) {
            if (match[1].endsWith(".managebac.com") && !(match[1] === "www.managebac.com")) {
                webContents.loadURL(details.url, webContentsOptions);
            } else if (!match[1].endsWith(".managebac.com")) {
                shell.openExternal(details.url);
            }
        }
        return { action: "deny" };
    });
};

export { setupWindowOpenHandler };