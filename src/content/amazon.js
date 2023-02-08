import { LOCATION_AMA_DICT, TYPES_AMA_DICT, AMA_CSS_BAGE_CLASS, REST_API_EVENTS_URL } from "../config/constants"
import { cl } from "./util";

var $ = require("jquery"); // only use for $.ajax(...)
const URL = window.location.href

let data = {}

var badgeClasses = $(`.${AMA_CSS_BAGE_CLASS}`)

cl(`Removed badges from ${badgeClasses.length} products`)

if (URL.includes("/s?k")) {
    // Search page
    // TODO: check if this is really a good condition
    // TODO: distinguish grid and list layout

    data = {
        user_id: 1,
        hostname: window.location.hostname,
        group: 1,
        event_type: TYPES_AMA_DICT["VISIT"],
        location: LOCATION_AMA_DICT["SEARCH_GRID"],
        timestamp: Date.now()
    }

} else if (URL.includes("/ref=")) {
    // Product detail page
    // TODO: check if this is really a good condition

    // Item ID
    const i_dp = URL.indexOf("/dp/")
    let asin = URL.substring(i_dp + 4)
    asin = asin.substring(0, asin.indexOf("/"))

    // Avg. Rating
    let ratingTitle = document.getElementById("acrPopover").getAttribute("title")
    let ratingStr = ratingTitle.slice(0, 3)
    let ratingInt = parseInt(ratingStr.replaceAll(',', ''))

    // Item name
    // name = $("#productTitle").textContent.trim() // slow, jQuery needs page content
    // name = document.title // fast, no need to wait for page to be loaded

    data = {
        user_id: 1,
        item_id: asin,
        hostname: window.location.hostname,
        group: 1,
        event_type: TYPES_AMA_DICT["VISIT"],
        location: LOCATION_AMA_DICT["PDP"],
        price: parseInt(document.getElementById("twister-plus-price-data-price").getAttribute("value")),
        avg_rating: ratingInt,
        timestamp: Date.now()
    }
}

$.ajax({
    url: REST_API_EVENTS_URL,
    headers: {
        'ecm-bot-req-url': URL
    },
    type: "POST",
    data: JSON.stringify(data),
    contentType: "application/json",
    dataType: "json"
});