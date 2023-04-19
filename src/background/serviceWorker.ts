// This is the service worker script, which executes in its own context
// when the extension is installed or refreshed (or when you access its console).
// It would correspond to the background script in chrome extensions v2.

import { AMA_URL } from "../config/settings";


// If you want to import a file that is deeper in the file hierarchy of your
// extension, simply do `importScripts('path/to/file.js')`.
// The path should be relative to the file `manifest.json`.


// THIS IS ONLY FOR TESTING
// makeExtensionClickable();

// function makeExtensionClickable() {
//     // This needs "activeTab" and "scripting" permissions in the manifest.json

//     console.log("makeExtensionClickable()");

//     // Set the action badge to 'OFF' when the extension is installed
//     chrome.action.setBadgeText({
//         text: "ON",
//     });

//     chrome.action.onClicked.addListener(async (tab) => {
//         console.log(tab.url);
//         if ((tab.url != undefined) && (tab.url.startsWith(AMA_URL))) {
//             // We retrieve the action badge to check if the extension is 'ON' or 'OFF'
//             const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
//             // Next state will always be the opposite
//             const nextState = prevState === 'OFF' ? 'ON' : 'OFF'

//             // Set the action badge to the next state
//             await chrome.action.setBadgeText({
//                 tabId: tab.id,
//                 text: nextState,
//             });

//             if (nextState === "OFF") {
//                 // Insert the CSS file when the user turns the extension on
//                 chrome.scripting.insertCSS({
//                     files: ["style/amazon/platform.css"],
//                     target: { tabId: tab.id },
//                 });
//             } else if (nextState === "ON") {
//                 // Remove the CSS file when the user turns the extension off
//                 chrome.scripting.removeCSS({
//                     files: ["style/amazon/platform.css"],
//                     target: { tabId: tab.id },
//                 });
//             }
//         }
//     });
// }

chrome.runtime.onMessageExternal.addListener(
    // https://stackoverflow.com/questions/6293498/check-whether-user-has-a-chrome-extension-installed
    function (request, sender, sendResponse) {
        const manifestData = chrome.runtime.getManifest();
        if (request) {
            if (request.message) {
                if (request.message == "version") {
                    sendResponse({ version: manifestData.version });
                }
            }
        }
        return true;
    });
