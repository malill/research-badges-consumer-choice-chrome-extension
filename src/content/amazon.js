import { PLATFORM_DICT, LOCATION_AMA_DICT, TYPES_AMA_DICT, AMA_CSS_BAGE_CLASS, REST_API_EVENTS_URL } from "../config/constants"
import { cl } from "./util";

var $ = require("jquery");
const URL = window.location.href

let item_id = ""
const platform = PLATFORM_DICT["AMA"]
let location = 0

var badgeClasses = $(`.${AMA_CSS_BAGE_CLASS}`)

cl(`Removed badges from ${badgeClasses.length} products`)

if (URL.includes("/s?k")) {
    // Search page
    // TODO: check if this is really a good condition
    cl("AMAZON SEARCH PAGE")

    // TODO: distinguish grid and list layout
    location = LOCATION_AMA_DICT["SEARCH_GRID"]

} else if (URL.includes("/ref=")) {
    // Product detail page
    // TODO: check if this is really a good condition
    cl("AMAZON PDP")
    location = LOCATION_AMA_DICT["PDP"]

    // Item ID
    const i_dp = URL.indexOf("/dp/")
    let asin = URL.substring(i_dp + 4)
    asin = asin.substring(0, asin.indexOf("/"))
    item_id = asin

    // Item name
    // name = $("#productTitle").textContent.trim() // slow, jQuery needs page content
    // name = document.title // fast, no need to wait for page to be loaded
}

cl(item_id)
cl(document.title)

const data = {
    user_id: 1,
    item_id: item_id,
    type: TYPES_AMA_DICT["VISIT"],
    platform: PLATFORM_DICT["AMA"],
    location: location,
    url: URL,
    timestamp: Date.now()
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