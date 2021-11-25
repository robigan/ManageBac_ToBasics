// Some of the code is of copyright holder Sindre Sorhus (MIT License)

const { Menu } = require("electron/main");

const { development } = require("./helper.js");

/**
 * @param {import("electron/main").BrowserWindow} browserWindow 
 */
const setupContextMenu = (browserWindow) => {
    const webContents = browserWindow.webContents;

    webContents.on("context-menu", (event, params) => {
        const hasText = params.selectionText.trim().length > 0;
        const isLink = !!params.linkURL;
        const can = type => params.editFlags[`can${type}`] && hasText;

        /**
         * @type {...[import("electron/main").MenuItemConstructorOptions]}
         */
        const template = [
            {
                label: "Do Something",
                click: async () => {
                    development ? console.trace("I have been clicked!") : undefined;
                }
            },
            {
                label: "Cu&t",
                enabled: can("Cut"),
                visible: params.isEditable,
                click() {
                    webContents.cut();
                }
            },
            {
                label: "&Copy",
                enabled: can("Copy"),
                visible: params.isEditable || hasText,
                click() {
                    webContents.copy();
                }
            },
            {
                label: "&Paste",
                enabled: can("Paste"),
                visible: params.isEditable,
                click() {
                    webContents.paste();
                }
            },
            {
                label: "Save I&mage",
                visible: params.mediaType === "image",
                click() {
                    // I am lazy af
                    const srcURLLastSlash = params.srcURL.split("/");
                    const srcURLFilename = srcURLLastSlash[srcURLLastSlash.length - 1].split("?")[0];

                    webContents.executeJavaScriptInIsolatedWorld(100, [
                        {
                            code: `fetch("${params.srcURL}", {
    method: 'GET'
})
    .then(response => response.blob())
    .then(blob => {
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = "${srcURLFilename}";
        a.click();    
        a.remove();  //afterwards we remove the element again         
    });`
                        }
                    ]);
                }
            }
        ];

        const menu = Menu.buildFromTemplate(template);
        menu.popup(browserWindow);
    });
};

module.exports = {
    setupContextMenu
};