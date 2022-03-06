import { getSubdomain } from "./domainDefaults";
import { webContentsOptions } from "./helper";

/**
 * A function that will handle new window opening behavior. Very hacky not gonna lie
 */
const setupLoadingRedirectHandler = async (webContents: Electron.WebContents) => {
    let lastURLVisited = `https://${await getSubdomain()}.managebac.com`;

    webContents.on("did-start-loading", async () => {
        if (!webContents.getURL()) return;
        const url = new URL(webContents.getURL());
        if (!url.host.endsWith("managebac.com") || !(url.host === "www.managebac.com" && url.pathname === "/login") || !url.host.endsWith(".managebac.com")) await webContents.loadURL(lastURLVisited, webContentsOptions);
        else lastURLVisited = webContents.getURL();
    });
};

export { setupLoadingRedirectHandler };