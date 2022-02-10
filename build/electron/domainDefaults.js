"use strict";
const { ipcMain } = require("electron/main");
const Store = require("electron-store");
const store = new Store({
    defaults: {
        "manageBacDomainOverride": false,
        "manageBacDomain": "managebac.com",
        "manageBacSubdomainOverride": true,
        "manageBacSubdomain": "www"
    },
    schema: {
        manageBacDomainOverride: {
            type: "boolean",
            default: false
        },
        manageBacDomain: {
            type: "string",
            default: "managebac.com"
        },
        manageBacSubdomainOverride: {
            type: "boolean",
            default: true
        },
        manageBacSubdomain: {
            type: "string",
            default: "www"
        }
    },
    name: "domainDefaults"
});
const subdomainDefault = async (arg = "get", domain = "") => {
    if (arg === "update") {
        store.set("manageBacSubdomain", domain.toString());
        return true;
    }
    else if (arg === "get") {
        if (store.get("manageBacSubdomainOverride")) {
            return store.get("manageBacSubdomain").toString();
        }
        else {
            return false;
        }
    }
};
const setupRedirect = async () => {
    let toggleRedirect = true;
    ipcMain.on("toggleRedirect", (event, arg) => {
        if (arg === "get")
            event.returnValue = toggleRedirect;
        else if (arg === "toggle")
            toggleRedirect = !toggleRedirect;
        else if (arg === "false")
            toggleRedirect = false;
        else if (arg === "true")
            toggleRedirect = true;
    });
    ipcMain.on("subdomainDefault", async (event, arg, domain) => {
        event.returnValue = await subdomainDefault(arg, domain);
    });
};
module.exports = {
    setupRedirect,
    subdomainDefault
};
