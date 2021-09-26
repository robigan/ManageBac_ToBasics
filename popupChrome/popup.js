/* eslint-disable no-undef */
chrome.tabs.query({active: true, currentWindow: true}, (tabs) =>  {
    chrome.tabs.insertCSS(
        tabs[0].id,
        {file: "page/globalStyle.css"});
    // chrome.tabs.executeScript(
    //     tabs[0].id,
    //     {file: "page/script.js"});
});
