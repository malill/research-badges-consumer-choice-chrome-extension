var $ = require("jquery");

// Remove Amazon highlights
const AMAZON_BAGE_CLASS = "a-badge"
const AMAZON_BAGE_REGION_CLASS = "a-badge-region"

var badgeClasses = $(`.${AMAZON_BAGE_CLASS}`)
// badgeClasses.css("opacity", "0");
// $(`.${AMAZON_BAGE_REGION_CLASS}`).css("background-color", "#26c6da");

console.log(`Removed badges from ${badgeClasses.length} products`)