import { PLATFORM_DICT, LOCATION_AMA_DICT, TYPES_AMA_DICT, CORE_SHORT_NAME, AMA_CSS_BAGE_CLASS, REST_API_URL } from "../config/constants"
import { cl } from "./util";

var $ = require("jquery");

const url = window.location.href
const ecm_API_url = REST_API_URL + "event/"

var badgeClasses = $(`.${AMA_CSS_BAGE_CLASS}`)

cl(`Removed badges from ${badgeClasses.length} products`)

$.get(REST_API_URL + "info", (res) => {
    console.log(res);
})

if (url.includes("/s?k")) {
    // Search page
    // TODO: check if this is really a good condition
    cl("AMAZON SEARCH PAGE")
} else if (url.includes("/ref=")) {
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
    url: url,
    timestamp: Date.now()
}

$.ajax({
    url: ecm_API_url,
    type: "POST",
    data: JSON.stringify(data),
    contentType: "application/json",
    dataType: "json"
});