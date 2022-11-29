// This script gets injected into any opened page
// whose URL matches the pattern defined in the manifest
// (see "content_script" key).
// Several foreground scripts can be declared
// and injected into the same or different pages.

var $ = require("jquery");

console.log("[pAI] Hello, I am pAI.");

const url = window.location.href
console.log(url)
if (url.includes("https://")) {
    console.log("Your data is safe!");
} else {
    console.log("Be careful! Your data won't be encrypted!")
}

// $("body").css("background-color", "red");