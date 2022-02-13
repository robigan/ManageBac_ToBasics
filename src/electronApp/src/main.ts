import { app, BrowserWindow } from "electron/main";
import { resolve } from "node:path";

import { setupRedirect, subdomainDefault } from "./domainDefaults";
import { setupContextMenu } from "./contextMenu";
import { setupMainMenu } from "./menuBar";
import { setupWindowOpenHandler } from "./windowOpenHandler";
import { setupCssLoader } from "./cssLoader";

import { development, webContentsOptions } from "./helper";

// const electronRemoteMain = require("@electron/remote/main");
// electronRemoteMain.initialize();

const createWindow = async () => {
    const win = new BrowserWindow({
        width: 1200,
        height: 720,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            // sandbox: true, // Causes issues with the preload script
            preload: resolve(__dirname, "preload.js")
        },
        title: "ManageBack ToBasics",
        icon: resolve(__dirname, "ManageBacIcon.png"),
    });

    const subdomain = await subdomainDefault("get");
    win.loadURL(subdomain && (subdomain !== "www") ? `https://${subdomain}.managebac.com` : "https://www.managebac.com/login", webContentsOptions);

    // Set such that when opening a new window the action is denied, so as to give a more app like experience
    const webContents = win.webContents;

    await setupContextMenu(win);
    await setupWindowOpenHandler(webContents);
    await setupCssLoader(webContents);
};

await app.whenReady();
development ? console.log("Running in development") : undefined;

await setupRedirect();
await createWindow();
await setupMainMenu();