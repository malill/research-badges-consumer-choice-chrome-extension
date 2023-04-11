// This is the service worker script, which executes in its own context
// when the extension is installed or refreshed (or when you access its console).
// It would correspond to the background script in chrome extensions v2.

import { AMA_URL } from "../../config/constants";

// If you want to import a file that is deeper in the file hierarchy of your
// extension, simply do `importScripts('path/to/file.js')`.
// The path should be relative to the file `manifest.json`.


// THIS IS ONLY FOR TESTING
// makeExtensionClickable();

function makeExtensionClickable() {
    chrome.action.onClicked.addListener(async (tab) => {
        if ((tab.url != undefined) && (tab.url.startsWith(AMA_URL))) {
            // We retrieve the action badge to check if the extension is 'ON' or 'OFF'
            const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
            // Next state will always be the opposite
            const nextState = prevState === 'OFF' ? 'ON' : 'OFF'

            // Set the action badge to the next state
            await chrome.action.setBadgeText({
                tabId: tab.id,
                text: nextState,
            });

            if (nextState === "OFF") {
                // Insert the CSS file when the user turns the extension on
                chrome.scripting.insertCSS({
                    files: ["style/amazon/platform.css"],
                    target: { tabId: tab.id },
                });
            } else if (nextState === "ON") {
                // Remove the CSS file when the user turns the extension off
                chrome.scripting.removeCSS({
                    files: ["style/amazon/platform.css"],
                    target: { tabId: tab.id },
                });
            }
        }
    });
}