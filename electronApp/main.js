const { app, BrowserWindow } = require("electron");
const { readFile } = require("fs/promises");
const { resolve } = require("path");

const urlRe = /:\/\/(.[^/]+)/;

const createWindow = async () => {
    const win = new BrowserWindow({ 
        width: 800, 
        height: 600, 
        webPreferences: { 
            nodeIntegration: false, 
            contextIsolation: true, 
            sandbox: true 
        },
        title: "ManageBac ToBasics",
        icon: resolve(__dirname, "ManageBacIcon.png")
    });
    await win.loadFile("electronApp/static/dist/index.html");

    const webContents = win.webContents;
    webContents.setWindowOpenHandler((/* details */) => {
        // if (details.url.match(urlRe)[1].endsWith(".managebac.com")) {
        //     return { action: "allow" };
        // } else {
        //     return { action: "deny" };
        // }
        return { action: "deny" };
    });

    const style = readFile(resolve(__dirname, "../page/style.css"), { encoding: "utf-8", flag: "r" });
    webContents.on("did-finish-load", async () => {
        if (webContents.getURL().match(urlRe)[1].endsWith(".managebac.com")) {
            webContents.insertCSS((await style).toString());
        }
    });
    //win.loadURL("https://managebac.com", {userAgent: `Electron/${process.versions.electron}`});
};

app.whenReady().then(async () => {
    await createWindow();

    app.on("window-all-closed", async () => {
        app.quit();
    });
});