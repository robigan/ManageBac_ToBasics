/**
 * @typedef {{event: string, patch: function(): void, id: string}[]} core
 */

/** @type {core} */
module.exports.coreExample = {
    "event": "load",
    "patch": () => {return undefined;},
    "id": "example"
};