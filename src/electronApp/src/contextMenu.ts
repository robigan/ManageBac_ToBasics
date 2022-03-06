// Some of the code is of copyright holder Sindre Sorhus (MIT License)

import { } from "electron"; // Ts complains if I don't have this import statement
import { clipboard } from "electron/common";
import { BrowserWindow, Menu, MenuItemConstructorOptions } from "electron/main";

import { EditFlagsContext } from "../types/contextMenu";
import { download } from "electron-dl";
import { development } from "./helper";

/**
 * Handle setting up the context menu that appears when right clicking
 */
const setupContextMenu = async (browserWindow: BrowserWindow) => {
    const webContents = browserWindow.webContents;

    webContents.on("context-menu", (event, params) => {
        const hasText = params.selectionText.trim().length > 0;
        // const isLink = !!params.linkURL;
        const can = (type: EditFlagsContext) => params.editFlags[`can${type}`] && hasText;

        /**
         * @type {...[import("electron/main").MenuItemConstructorOptions]}
         */
        const template: MenuItemConstructorOptions[] = [
            {
                id: "cut",
                label: "Cut",
                enabled: can("Cut"),
                visible: params.isEditable,
                async click() {
                    webContents.cut();
                }
            },
            {
                id: "copy",
                label: "Copy",
                enabled: can("Copy"),
                visible: params.isEditable || hasText,
                async click() {
                    webContents.copy();
                }
            },
            {
                id: "paste",
                label: "Paste",
                enabled: can("Paste"),
                visible: params.isEditable,
                async click() {
                    webContents.paste();
                }
            },
            {
                type: "separator"
            },
            {
                id: "copyLink",
                label: "Copy Link",
                visible: params.linkURL.length > 0 && params.mediaType === "none",
                async click() {
                    clipboard.write({
                        bookmark: params.linkText,
                        text: params.linkURL
                    });
                }
            },
            {
                id: "copyImage",
                label: "Copy Image",
                visible: params.mediaType === "image",
                async click() {
                    webContents.copyImageAt(params.x, params.y);
                }
            },
            {
                id: "copyImageAddress",
                label: "Copy Image Address",
                visible: params.mediaType === "image",
                async click() {
                    clipboard.writeText(params.srcURL);
                }
            },
            {
                type: "separator"
            },
            {
                id: "saveImage",
                label: "Save Image",
                visible: params.mediaType === "image",
                async click() {
                    await download(browserWindow, params.srcURL, {saveAs: true});
                }
            },
            { // Simple design choice, rest of managebac shows a save prompt when downloading downloadable content
                id: "saveImageAs",
                label: "Save Image Immediately",
                visible: params.mediaType === "image",
                async click() {
                    await download(browserWindow, params.srcURL);
                }
            }
        ];

        const menu = Menu.buildFromTemplate(template);
        menu.popup({ window: browserWindow });
    });
};

export { setupContextMenu };