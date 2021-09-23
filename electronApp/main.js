const { app, BrowserWindow } = require("electron");

const createWindow = async () => {
    const win = new BrowserWindow({ width: 800, height: 600});
    win.loadFile("electronApp/static/dist/index.html");
    //win.loadURL("https://managebac.com", {userAgent: `Electron/${process.versions.electron}`});
};

app.whenReady().then(async () => {
    await createWindow();

    app.on("window-all-closed", async () => {
        app.quit();
    });
});