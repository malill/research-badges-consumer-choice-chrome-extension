import { CORE_SHORT_NAME, AMA_CSS_BAGE_CLASS, REST_API_URL } from "../config/constants"

var $ = require("jquery");

const url = window.location.href

var badgeClasses = $(`.${AMA_CSS_BAGE_CLASS}`)

console.log(`[${CORE_SHORT_NAME}] Removed badges from ${badgeClasses.length} products`)

$.get(REST_API_URL + "info", (res) => {
    console.log(res);
})

// Search events
const data = {
    user_id: 1,
    item_ids: [1, 2],
    type: 1,
    url: url,
    timestamp: Date.now()
}

const ecm_API = REST_API_URL + "event/"

$.ajax({
    url: ecm_API,
    type: "POST",
    data: JSON.stringify(data),
    contentType: "application/json",
    dataType: "json"
});

// Product detail pages events
