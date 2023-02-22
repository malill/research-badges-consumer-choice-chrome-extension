// This is the service worker script, which executes in its own context
// when the extension is installed or refreshed (or when you access its console).
// It would correspond to the background script in chrome extensions v2.

import { myText } from "./service_worker_utils"
import { CORE_SHORT_NAME, AMA_URL } from "../config/constants"

console.log(`[${CORE_SHORT_NAME}] This prints to the console of the service worker (background script)`)

// Importing and using functionality from external files is also possible.
console.log(`[${CORE_SHORT_NAME}]`, myText)

// If you want to import a file that is deeper in the file hierarchy of your
// extension, simply do `importScripts('path/to/file.js')`.
// The path should be relative to the file `manifest.json`.


chrome.runtime.onInstalled.addListener(() => {
    // Get the user ID (and group for ProLific participants) from backend
    const userInfo = { userId: 1, userGroup: 1, environment: 1 } // Should come from backend

    // userGroup values
    // 1:   Blank style (default CE style)
    // 2:   Platform style
    // 3-x: Custom style

    // environment values
    // 1:   Productive
    // 2-x: Lab Experiment

    chrome.storage.local.set(userInfo).then(() => {
        console.log("Values are set to " + userInfo);
    });


    chrome.action.setBadgeText({
        text: "ON",
    });

});

// When the user clicks on the extension action
chrome.action.onClicked.addListener(async (tab) => {
    if (tab.url != undefined) {
        if (tab.url.startsWith(AMA_URL)) {
            // We retrieve the action badge to check if the extension is 'ON' or 'OFF'
            const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
            // Next state will always be the opposite
            const nextState = prevState === 'ON' ? 'OFF' : 'ON'

            // Set the action badge to the next state
            await chrome.action.setBadgeText({
                tabId: tab.id,
                text: nextState,
            });

            if (nextState === "OFF") {
                // Insert the CSS file when the user turns the extension on
                chrome.scripting.insertCSS({
                    files: ["style/amazon/platform/core.css"],
                    target: { tabId: tab.id },
                });
            } else if (nextState === "ON") {
                // Remove the CSS file when the user turns the extension off
                chrome.scripting.removeCSS({
                    files: ["style/amazon/platform/core.css"],
                    target: { tabId: tab.id },
                });
            }
        }
    }
});
