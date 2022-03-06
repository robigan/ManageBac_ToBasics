// import { ipcMain } from "electron/main";
import Store from "electron-store";
import { development } from "./helper";
import { DomainDefaultsStore } from "../types/domainDefaults";

const store = new Store<DomainDefaultsStore>({
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

// /**
//  * @deprecated Use either subdomainDefaultOverride or getSubdomain
//  */
// const subdomainDefault = async (arg: "get" | "update" = "get", domain = "") => {
//     if (arg === "update") {
//         store.set("manageBacSubdomain", domain.toString());
//         return true;
//     } else if (arg === "get") {
//         if (store.get("manageBacSubdomainOverride")) {
//             return store.get("manageBacSubdomain").toString();
//         } else {
//             return false;
//         }
//     }
// };

/**
 * A function to override the store's default subdomain
 * @param domain The subdomain to override with
 */
const subdomainDefaultOverride = async (domain: string) => {
    store.set("manageBacSubdomain", domain);
};

/**
 * Gets the default subdomain
 * @returns The subdomain default currently set
 */
const getSubdomain = async () => {
    return store.get("manageBacSubdomain").toString();
};

// /**
//  * Setup function that handles the legacy setupRedirect system [Deprecated]
//  * @deprecated
//  */
// const legacySetupRedirect = async () => {
//     // let toggleRedirect = true;
    
//     ipcMain.on("toggleRedirect", (event, arg) => {
//         // if (arg === "get") event.returnValue = toggleRedirect;
//         // else if (arg === "toggle") toggleRedirect = !toggleRedirect;
//         // /* else */ if (arg === "false") toggleRedirect = false;
//         // else if (arg === "true") toggleRedirect = true;
//     });

//     ipcMain.on("subdomainDefault", async (event, arg, domain) => {
//         event.returnValue = await subdomainDefault(arg, domain);
//     });
// };

/**
 * Setup function that handles the legacy setupRedirect system
 * @property {Promise<void>} promisedLoader The promisedLoader is a promise to be resolved passed to this function that waits for the electron .loadUrl() function to be complete, if not present will execute immediately
 */
const setupRedirect = async (webContents: Electron.WebContents, promisedLoader?: Promise<void>) => {
    const handler = async () => {
        development && console.log("setupRedirect > did-start-loading", toggleRedirect);
        if (!webContents.getURL()) return;
        const url = new URL(webContents.getURL());
        if (url.host.endsWith(".managebac.com") && !(url.host === "www.managebac.com") && url.pathname === "/login") {
            if (toggleRedirect) {
                await webContents.loadURL("https://www.managebac.com/login");
            } else {
                toggleRedirect = true;
                const subdomains = url.hostname.split(".");
                subdomains.pop();
                subdomains.pop();
                const subdomain = subdomains.join("");
                if (subdomain !== store.get("manageBacSubdomain")) store.set("manageBacSubdomain", subdomain);
            }
        } else if (url.host === "www.managebac.com" && url.pathname === "/login") {
            toggleRedirect = false;
        }
    };

    let toggleRedirect = true;

    webContents.on("did-start-loading", handler);
    if (promisedLoader !== undefined) promisedLoader.then(handler);
};

export { /* legacySetupRedirect, */ /* subdomainDefault, */ getSubdomain, subdomainDefaultOverride, setupRedirect };