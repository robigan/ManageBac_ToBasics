const { app, BrowserWindow, session, Menu, MenuItem } = require("electron");
const { readFile } = require("fs/promises");
const { resolve } = require("path");

const urlRe = /:\/\/(.[^/]+)/;

const createWindow = async () => {
    const win = new BrowserWindow({ 
        width: 1200, 
        height: 720, 
        webPreferences: { 
            nodeIntegration: false, 
            contextIsolation: true, 
            sandbox: true,
            preload: resolve(__dirname, "preload.js")
        },
        title: "ManageBack ToBasics",
        icon: resolve(__dirname, "ManageBacIcon.png"),
    });

    win.loadURL("https://www.managebac.com/login", {userAgent: `Electron/${process.versions.electron}`});

    // Set such that when opening a new window the action is denied, so as to give a more app like experience
    const webContents = win.webContents;
    webContents.setWindowOpenHandler((/* details */) => {
        return { action: "deny" };
    });

    // Load all css styles
    const style = readFile(resolve(__dirname, "../page/style.css"), { encoding: "utf-8", flag: "r" });
    webContents.on("did-finish-load", async () => {
        if (webContents.getURL().match(urlRe)[1].endsWith(".managebac.com")) {
            webContents.insertCSS((await style).toString());
        }
    });
};

const setMainMenu = async () => {
    const menu = Menu.getApplicationMenu();
    menu.append(new MenuItem(
        {
            label: "Manage",
            submenu: [
                {
                    label: "Flush cookies",
                    click: async () => {
                        await session.defaultSession.cookies.flushStore();
                    }
                }
            ]
        }
    ));
    console.log(Menu.getApplicationMenu());
};

const flushUnnecessaryCookies = async () => {
    console.log((await session.defaultSession.cookies.get({})).length);
    for (const cookie of await session.defaultSession.cookies.get({})) {
        if (!cookie.domain.endsWith(".managebac.com")) {
            console.log(cookie.domain);
            if (cookie.domain[0] === ".") {
                await session.defaultSession.cookies.remove(cookie.domain.substring(1), cookie.name);
            } else {
                await session.defaultSession.cookies.remove(cookie.domain, cookie.name);
            }
        }
    }
    console.log((await session.defaultSession.cookies.get({})).length);
};

app.whenReady().then(async () => {
    await createWindow();
    await setMainMenu();
    await flushUnnecessaryCookies();

    app.on("window-all-closed", async () => {
        app.quit();
    });
});