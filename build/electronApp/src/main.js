"use strict";
const { app, BrowserWindow, shell } = require("electron/main");
const { readFile } = require("node:fs/promises");
const { resolve } = require("node:path");
const { setupRedirect, subdomainDefault } = require("./domainDefaults.js");
const { setMainMenu } = require("./menuBar.js");
const { setupContextMenu } = require("./contextMenu.js");
const urlRe = /:\/\/(.[^/]+)/;
const webContentsOptions = {
    userAgent: `Electron/${process.versions.electron}`
};
const { development } = require("./helper.js");
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
    setupContextMenu(win);
    // Set such that when opening a new window the action is denied, so as to give a more app like experience
    const webContents = win.webContents;
    webContents.setWindowOpenHandler((details) => {
        if (details.url.match(urlRe)[1].endsWith(".managebac.com") && !(details.url.match(urlRe)[1] === "www.managebac.com")) {
            webContents.loadURL(details.url, webContentsOptions);
        }
        else if (!details.url.match(urlRe)[1].endsWith(".managebac.com")) {
            shell.openExternal(details.url);
        }
        return { action: "deny" };
    });
    // Load all css styles
    const style = readFile(resolve(__dirname, "../page/globalStyle.css"), { encoding: "utf-8", flag: "r" });
    webContents.on("did-finish-load", async () => {
        if (webContents.getURL().match(urlRe)[1].endsWith(".managebac.com")) {
            webContents.insertCSS((await style).toString());
        }
    });
};
app.whenReady().then(async () => {
    development ? console.log("Running in development") : undefined;
    await setupRedirect();
    await createWindow();
    await setMainMenu();
    app.on("window-all-closed", async () => {
        app.quit();
    });
});
