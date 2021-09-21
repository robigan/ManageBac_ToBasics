const { app, BrowserWindow } = require("electron");
function createWindow() {
    const win = new BrowserWindow({ width: 800, height: 600});
    // win.loadFile("electronApp/index.html");
    win.loadURL("https://managebac.com", {userAgent: `Electron/${process.versions.electron}`});
}

app.whenReady().then(() => {
    createWindow();

    app.on("window-all-closed", async () => {
        app.quit();
    });
});