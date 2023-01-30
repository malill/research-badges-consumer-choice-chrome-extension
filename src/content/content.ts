// This script gets injected into any opened page whose URL matches the pattern defined in the manifest
// (see "content_script" key). Several foreground scripts can be declared
// and injected into the same or different pages.

var $ = require("jquery");

// Remove Amazon highlights
const AMAZON_BAGE_CLASS = "a-badge"
const AMAZON_BAGE_REGION_CLASS = "a-badge-region"

$(`.${AMAZON_BAGE_CLASS}`).css("opacity", "0");
// $(`.${AMAZON_BAGE_REGION_CLASS}`).css("background-color", "#26c6da");


// Do other stuff
console.log("[pAI] Hello, I am pAI!!!!");
const url = window.location.href
console.log("[pAI]", "You are visiting:", url)
