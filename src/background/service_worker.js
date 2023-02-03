// This is the service worker script, which executes in its own context
// when the extension is installed or refreshed (or when you access its console).
// It would correspond to the background script in chrome extensions v2.

import { myText } from "./service_worker_utils"

console.log("[pAI] This prints to the console of the service worker (background script)")

// Importing and using functionality from external files is also possible.
console.log("[pAI]", myText)

// If you want to import a file that is deeper in the file hierarchy of your
// extension, simply do `importScripts('path/to/file.js')`.
// The path should be relative to the file `manifest.json`.

chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeText({
        text: "OFF",
    });
});

const extensions = 'https://www.amazon.'

// When the user clicks on the extension action
chrome.action.onClicked.addListener(async (tab) => {
    if (tab.url != undefined) {
        if (tab.url.startsWith(extensions)) {
            // We retrieve the action badge to check if the extension is 'ON' or 'OFF'
            const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
            // Next state will always be the opposite
            const nextState = prevState === 'ON' ? 'OFF' : 'ON'

            // Set the action badge to the next state
            await chrome.action.setBadgeText({
                tabId: tab.id,
                text: nextState,
            });

            if (nextState === "ON") {
                // Insert the CSS file when the user turns the extension on
                chrome.scripting.insertCSS({
                    files: ["style/amazon-rmv-badges.css"],
                    target: { tabId: tab.id },
                });
            } else if (nextState === "OFF") {
                // Remove the CSS file when the user turns the extension off
                chrome.scripting.removeCSS({
                    files: ["style/amazon-rmv-badges.css"],
                    target: { tabId: tab.id },
                });
            }
        }
    }
});
