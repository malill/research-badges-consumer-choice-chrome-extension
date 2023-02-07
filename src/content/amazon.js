import { PLATFORM_DICT, LOCATION_AMA_DICT, TYPES_AMA_DICT, AMA_CSS_BAGE_CLASS, REST_API_EVENTS_URL } from "../config/constants"
import { cl } from "./util";

var $ = require("jquery");
const URL = window.location.href


var badgeClasses = $(`.${AMA_CSS_BAGE_CLASS}`)

cl(`Removed badges from ${badgeClasses.length} products`)

if (URL.includes("/s?k")) {
    // Search page
    // TODO: check if this is really a good condition
    // TODO: distinguish grid and list layout
    cl("AMAZON SEARCH PAGE")
} else if (URL.includes("/ref=")) {
    // Product detail page
    // TODO: check if this is really a good condition
    cl("AMAZON PDP")
}

const data = {
    user_id: 1,
    item_id: 1,
    type: TYPES_AMA_DICT["VISIT"],
    platform: PLATFORM_DICT["AMA"],
    location: LOCATION_AMA_DICT["SEARCH_GRID"],
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