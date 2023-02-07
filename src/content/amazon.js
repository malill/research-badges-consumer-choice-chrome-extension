import { CORE_SHORT_NAME, AMA_CSS_BAGE_CLASS, REST_API_URL } from "../config/constants"

var $ = require("jquery");

const url = window.location.href
const ecm_API_url = REST_API_URL + "event/"

var badgeClasses = $(`.${AMA_CSS_BAGE_CLASS}`)

console.log(`[${CORE_SHORT_NAME}] Removed badges from ${badgeClasses.length} products`)

$.get(REST_API_URL + "info", (res) => {
    console.log(res);
})

if (url.includes("/s?k")) {
    // Search page
    // TODO: check if this is really a good condition
    const data = {
        user_id: 1,
        item_ids: [1, 2],
        type: 1,
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
} else if (url.includes("/ref=")) {
    // Product detail page
    // TODO: check if this is really a good condition
    console.log("PDP")
}
