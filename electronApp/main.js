const { app, BrowserWindow, session, Menu, MenuItem } = require("electron");
const { readFile } = require("fs/promises");
const { resolve } = require("path");

const urlRe = /:\/\/(.[^/]+)/;
const webContentsOptions = {
    userAgent: `Electron/${process.versions.electron}`
};
const development = process.env.NODE_ENV === "development" || false;

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

    // win.loadURL("https://www.managebac.com/login", webContentsOptions);
    win.loadURL("https://hinternationalschool.managebac.com/", webContentsOptions);

    // Set such that when opening a new window the action is denied, so as to give a more app like experience
    const webContents = win.webContents;
    webContents.setWindowOpenHandler((details) => {
        if (details.url.match(urlRe)[1].endsWith(".managebac.com") && !(details.url.match(urlRe)[1] === "www.managebac.com")) {
            webContents.loadURL(details.url, webContentsOptions);
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

// eslint-disable-next-line no-unused-vars
const setMainMenu = async () => { // Add more menus to the menu bar
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
    development ? console.log(Menu.getApplicationMenu()) : undefined;
};

// eslint-disable-next-line no-unused-vars
const flushUnnecessaryCookies = async () => { // Will flush any cookies that are not of the managebac.com domain
    development ? console.log((await session.defaultSession.cookies.get({})).length) : undefined;
    for (const cookie of await session.defaultSession.cookies.get({})) {
        if (!cookie.domain.endsWith(".managebac.com")) {
            development ? console.log(cookie.domain) : undefined;
            if (cookie.domain[0] === ".") {
                await session.defaultSession.cookies.remove(cookie.domain.substring(1), cookie.name);
            } else {
                await session.defaultSession.cookies.remove(cookie.domain, cookie.name);
            }
        }
    }
    development ? console.log((await session.defaultSession.cookies.get({})).length) : undefined;
};

app.whenReady().then(async () => {
    development ? console.log("Running in development") : undefined;
    await createWindow();
    // await setMainMenu();
    // await flushUnnecessaryCookies();

    app.on("window-all-closed", async () => {
        app.quit();
    });
});