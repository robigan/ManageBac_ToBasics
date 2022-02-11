"use strict";
const { app, Menu, shell, session } = require("electron/main");
const { isMac, development } = require("./helper.js");
const template = [
    // { role: 'appMenu' }
    ...(isMac ? [{
            label: app.name,
            role: "appMenu",
            submenu: [
                { role: "about" },
                { type: "separator" },
                { role: "services" },
                { type: "separator" },
                { role: "hide" },
                { role: "hideOthers" },
                { role: "unhide" },
                { type: "separator" },
                { role: "quit" }
            ]
        }] : []),
    {
        label: "File",
        role: "fileMenu",
        submenu: [
            {
                label: "Flush Data Stores",
                click: async () => {
                    await session.defaultSession.cookies.flushStore();
                    session.defaultSession.flushStorageData();
                    development ? console.log(await session.defaultSession.cookies.get({})) : undefined;
                }
            },
            ...(isMac ? [] : [{ role: "quit" }])
        ]
    },
    {
        label: "Edit",
        role: "editMenu",
        submenu: [
            { role: "undo" },
            { role: "redo" },
            { type: "separator" },
            { role: "cut" },
            { role: "copy" },
            { role: "paste" },
            ...(isMac ? [
                { role: "pasteAndMatchStyle" },
                { role: "delete" },
                { role: "selectAll" },
                { type: "separator" },
                {
                    label: "Speech",
                    submenu: [
                        { role: "startSpeaking" },
                        { role: "stopSpeaking" }
                    ]
                }
            ] : [
                { role: "delete" },
                { type: "separator" },
                { role: "selectAll" }
            ])
        ]
    },
    {
        label: "View",
        role: "viewMenu",
        submenu: [
            { role: "reload" },
            { role: "forceReload" },
            ...(development ? [
                { role: "toggleDevTools" }
            ] : []),
            { type: "separator" },
            {
                role: "resetZoom",
                label: "Reset Zoom"
            },
            // { role: "zoomIn" },
            // { role: "zoomOut" },
            { type: "separator" },
            { role: "togglefullscreen" },
            { type: "separator" },
            ...(development ? [
                {
                    label: "Back",
                    click: async () => {
                    }
                },
                {
                    label: "Forward",
                    click: async () => {
                    }
                }
            ] : [])
        ]
    },
    {
        label: "Window",
        role: "windowMenu",
        submenu: [
            { role: "minimize" },
            { role: "zoom" },
            ...(isMac ? [
                { type: "separator" },
                { role: "front" },
                // { type: "separator" },
                // { role: "window" }
            ] : [
            // { role: "close" }
            ])
        ]
    },
    {
        role: "help",
        submenu: [
            {
                label: "Project Page",
                click: async () => {
                    await shell.openExternal("https://github.com/robigan/ManageBack_ToBasics");
                }
            },
            {
                label: "File a Bug Report",
                click: async () => {
                    await shell.openExternal("https://github.com/robigan/ManageBack_ToBasics/issues");
                }
            }
        ]
    }
];
const setMainMenu = async () => {
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
};
module.exports = {
    setMainMenu
};
